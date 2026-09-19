const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../frontend/lib/pantryData.ts');
const outPath = path.join(__dirname, '../data/pantries.json');

const content = fs.readFileSync(srcPath, 'utf8');

// Find BALTIMORE_PANTRIES = [ ... ];
const startIdx = content.indexOf('export const BALTIMORE_PANTRIES: Pantry[] = [');
if (startIdx === -1) {
  console.error("Could not find BALTIMORE_PANTRIES");
  process.exit(1);
}

const jsonStart = content.indexOf('[', startIdx);
const lastSemicolon = content.lastIndexOf('];');
const jsonText = content.substring(jsonStart, lastSemicolon + 1);

let pantries = [];
try {
  pantries = eval(jsonText);
} catch (e) {
  console.error("Eval error, trying JSON parse:", e);
}

console.log(`Parsed ${pantries.length} pantries.`);

// Enrich with volunteer_code and demo status
const enriched = pantries.map((p, idx) => {
  const volunteer_code = (idx < 5 || p.id === 'c1000000-0000-0000-0000-000000000001') ? '2026' : String(1000 + (idx * 37) % 8999);
  return {
    ...p,
    volunteer_code,
    is_demo: idx < 2
  };
});

// Prepend a dedicated "Hackathon HQ Demo Food Pantry"
const demoPantry = {
  id: "demo-hub-0001",
  name: "Pantry Pulse Demo Hub (Hackathon HQ)",
  address: "100 Light St, Baltimore, MD 21202",
  neighborhood: "Downtown / Inner Harbor",
  lat: 39.2865,
  lng: -76.6134,
  distance_miles: 0.1,
  walk_minutes: 2,
  hours_text: "Open today 9:00 AM – 6:00 PM",
  open_today: true,
  open_tonight: true,
  open_hours_display: "9:00 AM – 6:00 PM",
  requires_id: false,
  allows_walkins: true,
  languages: ["English", "Spanish"],
  notes: "Live Demo Pantry for Judges & Evaluators. Test shipment intake, kiosk check-in, and closing checks here.",
  distribution_model: "client_choice",
  phone: "(410) 737-8282",
  volunteer_code: "2026",
  is_demo: true,
  specialty_tags: ["produce", "halal", "baby_essentials"],
  shelf_items: [
    { category_name: "Produce", category_emoji: "🥕", band: "plenty", minutes_ago: 5, confidence: 0.95, estimated_qty: 90, capacity: 100 },
    { category_name: "Protein", category_emoji: "🥩", band: "plenty", minutes_ago: 5, confidence: 0.95, estimated_qty: 65, capacity: 75 },
    { category_name: "Dairy", category_emoji: "🥛", band: "low", minutes_ago: 12, confidence: 0.90, estimated_qty: 15, capacity: 50 },
    { category_name: "Grains", category_emoji: "🍞", band: "plenty", minutes_ago: 8, confidence: 0.95, estimated_qty: 70, capacity: 80 },
    { category_name: "Canned Goods", category_emoji: "🥫", band: "plenty", minutes_ago: 15, confidence: 0.95, estimated_qty: 110, capacity: 120 },
    { category_name: "Diapers", category_emoji: "👶", band: "low", minutes_ago: 20, confidence: 0.88, estimated_qty: 8, capacity: 35 },
    { category_name: "Hygiene", category_emoji: "🧼", band: "plenty", minutes_ago: 25, confidence: 0.92, estimated_qty: 35, capacity: 40 },
    { category_name: "Halal items", category_emoji: "🌙", band: "plenty", minutes_ago: 10, confidence: 0.94, estimated_qty: 50, capacity: 60 }
  ]
};

const fullList = [demoPantry, ...enriched];

fs.writeFileSync(outPath, JSON.stringify(fullList, null, 2), 'utf8');
console.log(`Saved ${fullList.length} pantries to ${outPath}`);
