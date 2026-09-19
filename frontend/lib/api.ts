// Thin typed client for the FastAPI backend.
// Base URL comes from NEXT_PUBLIC_API_BASE (see .env.local); defaults to local dev.
import { Pantry } from './pantryData';

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

export interface Category {
  id: number;
  name: string;
  emoji: string;
  is_default?: boolean;
}

export interface CorrectionItem {
  category_id: number;
  band: 'plenty' | 'low' | 'out';
}

// ---- Backend response shapes (GET /api/pantries -> PantryWithShelf) ----
interface BackendShelfItem {
  category_name: string;
  category_emoji: string;
  band: 'plenty' | 'low' | 'out';
  minutes_ago: number | null;
  confidence: number | null;
  source: string | null;
}

interface BackendPantry {
  id: string;
  name: string;
  address: string;
  neighborhood: string | null;
  lat: number;
  lng: number;
  phone: string | null;
  distribution_model: string | null;
  hours: Record<string, { open: string; close: string }> | null;
  requires_id: boolean | null;
  allows_walkins: boolean | null;
  languages: string[] | null;
  notes: string | null;
  distance_miles: number | null;
  walk_minutes: number | null;
  shelf_items: BackendShelfItem[];
}

const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function to12h(t: string): string {
  // "14:00" -> "2:00 PM"
  const [hStr, m = '00'] = t.split(':');
  let h = parseInt(hStr, 10);
  if (Number.isNaN(h)) return t;
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
}

/**
 * Map a backend pantry onto the frontend Pantry type. The backend does NOT
 * return the UI's derived display fields (open_today, open_tonight, hours_text,
 * open_hours_display), so we compute them here from the raw `hours` JSONB.
 */
export function normalizePantry(b: BackendPantry): Pantry {
  const hours = b.hours || {};
  const todayKey = DAY_KEYS[new Date().getDay()];
  const today = hours[todayKey];
  const open_today = !!today;
  const open_hours_display = today
    ? `${to12h(today.open)} – ${to12h(today.close)}`
    : 'Closed today';
  // "Tonight" heuristic: open today and closes at or after 5pm.
  const open_tonight =
    !!today && parseInt(today.close.split(':')[0], 10) >= 17;
  const hours_text = today ? `Open today ${open_hours_display}` : 'Closed today';

  return {
    id: b.id,
    name: b.name,
    address: b.address,
    neighborhood: b.neighborhood || 'Baltimore',
    lat: b.lat,
    lng: b.lng,
    distance_miles: b.distance_miles ?? 0,
    walk_minutes: b.walk_minutes ?? 0,
    hours_text,
    open_today,
    open_tonight,
    open_hours_display,
    requires_id: b.requires_id ?? false,
    allows_walkins: b.allows_walkins ?? true,
    languages: b.languages || ['English'],
    notes: b.notes || '',
    distribution_model:
      (b.distribution_model as Pantry['distribution_model']) || 'client_choice',
    phone: b.phone || '',
    shelf_items: (b.shelf_items || []).map((s) => ({
      category_name: s.category_name,
      category_emoji: s.category_emoji,
      band: s.band,
      minutes_ago: s.minutes_ago ?? 0,
      confidence: s.confidence ?? 1,
    })),
  };
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/api/categories`);
  if (!res.ok) throw new Error(`fetchCategories failed: ${res.status}`);
  return res.json();
}

/**
 * Fetch pantries near a point. Defaults to Baltimore center with a wide radius
 * so the whole seeded set comes back with valid DB UUIDs.
 */
export async function fetchPantries(
  lat = 39.2904,
  lng = -76.6122,
  radiusMiles = 50
): Promise<Pantry[]> {
  const url = `${API_BASE}/api/pantries?lat=${lat}&lng=${lng}&radius_miles=${radiusMiles}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetchPantries failed: ${res.status}`);
  const data: BackendPantry[] = await res.json();
  return data.map(normalizePantry);
}

export async function postCorrection(
  pantryId: string,
  corrections: CorrectionItem[]
): Promise<void> {
  const res = await fetch(`${API_BASE}/api/inventory/correction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pantry_id: pantryId, corrections }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`postCorrection failed: ${res.status} ${detail}`);
  }
}

export async function postCheckin(
  pantryId: string,
  householdSize: number
): Promise<void> {
  const res = await fetch(`${API_BASE}/api/inventory/checkin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pantry_id: pantryId, household_size: householdSize }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`postCheckin failed: ${res.status} ${detail}`);
  }
}
