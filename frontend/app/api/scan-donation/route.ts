import { NextRequest, NextResponse } from 'next/server';

export interface ScannedItem {
  name: string;
  category: string;
  count: number;
  weight_lbs?: number;
  packaging_type?: 'can' | 'box' | 'crate' | 'pallet' | 'bag' | 'case';
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File | null;
    const preset = formData.get('preset') as string | null;
    const mode = (formData.get('mode') as string | null) || 'donation'; // 'donation' or 'shipment'

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    // Preset Fallbacks for rapid demoing
    const PRESET_RESULTS: Record<string, ScannedItem[]> = {
      // Small box / drop-off donations
      canned_box: [
        { name: 'Canned green beans & corn', category: 'Produce', count: 4, weight_lbs: 4, packaging_type: 'can' },
        { name: 'Canned black beans', category: 'Protein', count: 3, weight_lbs: 3, packaging_type: 'can' },
        { name: 'Chicken noodle soup', category: 'Protein', count: 2, weight_lbs: 2, packaging_type: 'can' },
        { name: 'Rolled oats / cereal', category: 'Grains', count: 2, weight_lbs: 2, packaging_type: 'box' },
      ],
      produce_crate: [
        { name: 'Fresh apples', category: 'Produce', count: 12, weight_lbs: 6, packaging_type: 'bag' },
        { name: 'Carrots (1lb bags)', category: 'Produce', count: 5, weight_lbs: 5, packaging_type: 'bag' },
        { name: 'Potatoes (5lb bags)', category: 'Produce', count: 2, weight_lbs: 10, packaging_type: 'bag' },
        { name: 'Whole wheat bread', category: 'Grains', count: 4, weight_lbs: 4, packaging_type: 'bag' },
      ],
      baby_essentials: [
        { name: 'Baby diapers (Size 3)', category: 'Diapers', count: 3, weight_lbs: 5, packaging_type: 'box' },
        { name: 'Infant formula powder (cans)', category: 'Baby Essentials', count: 4, weight_lbs: 6, packaging_type: 'can' },
        { name: 'Baby wipes (packs)', category: 'Hygiene', count: 6, weight_lbs: 6, packaging_type: 'box' },
      ],

      // Bulk shipment / pallet deliveries (e.g. Maryland Food Bank partner drop)
      mfb_pallet_delivery: [
        { name: 'Pallet of Fresh Potatoes & Carrots', category: 'Produce', count: 1, weight_lbs: 250, packaging_type: 'pallet' },
        { name: 'Cases of Canned Tuna & Chicken', category: 'Protein', count: 8, weight_lbs: 160, packaging_type: 'case' },
        { name: 'Pallet of Whole Grain Rice & Oats', category: 'Grains', count: 1, weight_lbs: 180, packaging_type: 'pallet' },
        { name: 'Cases of Mixed Vegetables & Soups', category: 'Canned Goods', count: 10, weight_lbs: 220, packaging_type: 'case' }
      ],
      farm_produce_crates: [
        { name: 'Crates of Apples, Greens & Squash', category: 'Produce', count: 12, weight_lbs: 320, packaging_type: 'crate' },
        { name: 'Crates of Dairy & Cheddar Blocks', category: 'Dairy', count: 4, weight_lbs: 90, packaging_type: 'crate' }
      ],
      emergency_relief_load: [
        { name: 'Bulk Produce Crates', category: 'Produce', count: 15, weight_lbs: 400, packaging_type: 'crate' },
        { name: 'Cases of Canned Protein & Beans', category: 'Protein', count: 12, weight_lbs: 280, packaging_type: 'case' },
        { name: 'Flats of Cereal & Pasta', category: 'Grains', count: 10, weight_lbs: 200, packaging_type: 'case' },
        { name: 'Pallet of Canned Goods', category: 'Canned Goods', count: 1, weight_lbs: 350, packaging_type: 'pallet' },
        { name: 'Bulk Diaper Cases (Sizes 2-5)', category: 'Diapers', count: 6, weight_lbs: 75, packaging_type: 'case' }
      ]
    };

    if (file && apiKey) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Data = buffer.toString('base64');

        const promptText = mode === 'shipment'
          ? `You are an expert food logistics and food bank delivery intake vision assistant in Baltimore.
Your job is to examine this food delivery or shipment load (pallets, crates, truckload, or bulk cases).
For each food category visible:
1. Classify into one of our exact categories:
   - "Produce" (bulk potatoes, carrots, apples, squash, leafy greens)
   - "Protein" (frozen poultry, canned tuna flats, bulk bean cases, peanut butter)
   - "Dairy" (milk crates, cheese blocks, yogurt cases)
   - "Grains" (bulk rice sacks, oats, cereal flats, pasta cases)
   - "Canned Goods" (heavy cases of soups, canned vegetables, sauces)
   - "Diapers" (cases of diapers/pull-ups)
   - "Hygiene" (cases of soap, wipes)
   - "Halal items" (halal certified food cases)
2. Estimate the approximate total weight in pounds (weight_lbs) and packaging_type ('pallet', 'crate', 'case', 'bag').
3. Count how many crates/pallets/cases are visible.

Respond strictly with a JSON array:
[
  { "name": "Pallet of Fresh Potatoes", "category": "Produce", "count": 1, "weight_lbs": 250, "packaging_type": "pallet" },
  { "name": "Cases of Canned Tuna", "category": "Protein", "count": 6, "weight_lbs": 120, "packaging_type": "case" }
]
Do not wrap in markdown backticks or commentary. Only return the raw JSON array.`
          : `You are an expert food pantry inventory vision assistant in Baltimore.
Your job is to examine this donation photo and accurately count and categorize the food or supplies.

Instructions:
1. Scan the image methodically (left to right, front to back).
2. Distinguish between individual items (e.g. cans, boxes, cartons, bags, diapers).
3. Classify each detected item into one of our exact pantry categories:
   - "Produce", "Protein", "Dairy", "Grains", "Canned Goods", "Diapers", "Hygiene", "Halal items"

Respond strictly with a JSON array:
[
  { "name": "Canned black beans", "category": "Protein", "count": 2, "weight_lbs": 2, "packaging_type": "can" }
]
Do not wrap in markdown backticks or commentary. Only return the raw JSON array.`;

        // Direct Google Generative Language REST call with gemini-2.5-flash
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const geminiRes = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: promptText },
                  {
                    inlineData: {
                      mimeType: file.type || 'image/jpeg',
                      data: base64Data
                    }
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.1,
              responseMimeType: 'application/json'
            }
          })
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '[]';
          const cleanedJson = rawText.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
          const items: ScannedItem[] = JSON.parse(cleanedJson);

          return NextResponse.json({
            success: true,
            source: 'gemini-live',
            mode,
            items,
            privacyGuarantee: 'Photo processed in-memory and discarded. No image data was persisted.'
          });
        } else {
          const errorDetails = await geminiRes.text();
          console.warn('Gemini API returned error status:', errorDetails);
        }
      } catch (geminiError) {
        console.warn(
          'Gemini processing exception:',
          geminiError instanceof Error ? geminiError.message : geminiError
        );
      }
    }

    // Default demo items if no file or fallback
    const defaultKey = mode === 'shipment' ? 'mfb_pallet_delivery' : 'canned_box';
    const selectedPreset = preset && PRESET_RESULTS[preset] ? PRESET_RESULTS[preset] : PRESET_RESULTS[defaultKey];

    return NextResponse.json({
      success: true,
      source: apiKey ? 'gemini-preset' : 'demo-simulation',
      mode,
      items: selectedPreset,
      privacyGuarantee: 'Photo processed in-memory and discarded. No image data was persisted.'
    });

  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to process intake', details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
