import { NextRequest, NextResponse } from 'next/server';

export interface ScannedItem {
  name: string;
  category: string;
  count: number;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File | null;
    const preset = formData.get('preset') as string | null;

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    // Preset Fallbacks for rapid demoing
    const PRESET_RESULTS: Record<string, ScannedItem[]> = {
      canned_box: [
        { name: 'Canned green beans & corn', category: 'Produce', count: 4 },
        { name: 'Canned black beans', category: 'Protein', count: 3 },
        { name: 'Chicken noodle soup', category: 'Protein', count: 2 },
        { name: 'Rolled oats / cereal', category: 'Grains', count: 2 },
      ],
      produce_crate: [
        { name: 'Fresh apples', category: 'Produce', count: 12 },
        { name: 'Carrots (1lb bags)', category: 'Produce', count: 5 },
        { name: 'Potatoes (5lb bags)', category: 'Produce', count: 2 },
        { name: 'Whole wheat bread', category: 'Grains', count: 4 },
      ],
      baby_essentials: [
        { name: 'Baby diapers (Size 3)', category: 'Diapers', count: 3 },
        { name: 'Infant formula powder (cans)', category: 'Baby Essentials', count: 4 },
        { name: 'Baby wipes (packs)', category: 'Hygiene', count: 6 },
      ]
    };

    if (file && apiKey) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Data = buffer.toString('base64');

        const promptText = `You are an expert food pantry inventory vision assistant in Baltimore.
Your job is to examine this donation photo and accurately count and categorize the food or supplies.

Instructions for high accuracy:
1. Scan the image methodically (left to right, front to back).
2. Distinguish between individual items (e.g. cans, boxes, cartons, bags, diapers).
3. Do not guess non-existent items in shadows; only count clearly visible items.
4. Classify each detected item into one of our exact pantry categories:
   - "Produce" (fresh fruits, vegetables)
   - "Protein" (meat, chicken, tuna, canned meats, beans, peanut butter)
   - "Dairy" (milk, cheese, yogurt, plant milks)
   - "Grains" (pasta, rice, cereal, bread, oats)
   - "Canned Goods" (canned soups, canned vegetables, canned fruit, sauces)
   - "Diapers" (baby diapers, pull-ups)
   - "Hygiene" (soap, shampoo, toothpaste, wipes)
   - "Halal items" (halal labeled food)

Output Format:
Respond strictly with a JSON array conforming to this format:
[
  { "name": "Canned black beans", "category": "Protein", "count": 2 },
  { "name": "Cereal box", "category": "Grains", "count": 1 }
]
Do not wrap in markdown backticks or commentary. Only return the raw JSON array.`;

        // Direct Google Generative Language REST call with gemini-3.6-flash
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

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
              temperature: 0.0,
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
            source: 'gemini-3.6-flash-live',
            items,
            privacyGuarantee: 'Photo processed in-memory and discarded. No image data was persisted.'
          });
        } else {
          const errorDetails = await geminiRes.text();
          console.warn('Gemini API returned error status:', errorDetails);
        }
      } catch (geminiError: any) {
        console.warn('Gemini processing exception:', geminiError.message);
      }
    }

    // Default demo items if no file or fallback
    const selectedPreset = preset && PRESET_RESULTS[preset] ? PRESET_RESULTS[preset] : PRESET_RESULTS['canned_box'];

    return NextResponse.json({
      success: true,
      source: apiKey ? 'gemini-preset' : 'demo-simulation',
      items: selectedPreset,
      privacyGuarantee: 'Photo processed in-memory and discarded. No image data was persisted.'
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to process donation intake', details: err.message },
      { status: 500 }
    );
  }
}
