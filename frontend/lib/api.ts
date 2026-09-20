// Thin typed client for the FastAPI backend.
// Base URL comes from NEXT_PUBLIC_API_BASE (see .env.local); defaults to local dev.
import { Pantry } from './pantryData';
import { evaluateRealTimeSchedule } from './realTimeSchedule';

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

export interface Category {
  id: number;
  name: string;
  emoji: string;
  is_default?: boolean;
}

export interface CorrectionItem {
  category_id?: number;
  category_name?: string;
  band: 'plenty' | 'low' | 'out';
  estimated_qty?: number;
  capacity?: number;
  confidence?: number;
}

// ---- Backend response shapes (GET /api/pantries -> PantryWithShelf) ----
interface BackendShelfItem {
  category_name: string;
  category_emoji: string;
  band: 'plenty' | 'low' | 'out';
  minutes_ago?: number | null;
  confidence?: number | null;
  estimated_qty?: number | null;
  capacity?: number | null;
  source?: string | null;
}

interface BackendPantry {
  id: string;
  name: string;
  address: string;
  neighborhood?: string | null;
  lat: number;
  lng: number;
  phone?: string | null;
  distribution_model?: string | null;
  hours?: Record<string, { open: string; close: string }> | null;
  hours_text?: string | null;
  open_today?: boolean | null;
  open_tonight?: boolean | null;
  open_hours_display?: string | null;
  requires_id?: boolean | null;
  allows_walkins?: boolean | null;
  languages?: string[] | null;
  notes?: string | null;
  specialty_tags?: string[] | null;
  volunteer_code?: string | null;
  is_demo?: boolean | null;
  distance_miles?: number | null;
  walk_minutes?: number | null;
  shelf_items?: BackendShelfItem[] | null;
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
 * Map a backend pantry onto the frontend Pantry type.
 */
export function normalizePantry(b: BackendPantry): Pantry {
  let hours_text = b.hours_text || 'Open Mon-Fri 9:00 AM – 5:00 PM';
  if (b.hours && typeof b.hours === 'object') {
    const todayKey = DAY_KEYS[new Date().getDay()];
    const today = (b.hours as Record<string, { open: string; close: string }>)[todayKey];
    if (today) {
      hours_text = `Open today ${to12h(today.open)} – ${to12h(today.close)}`;
    }
  }

  const schedule = evaluateRealTimeSchedule(hours_text, b.is_demo ?? false);
  const open_today = schedule.isOpenToday;
  const open_tonight = schedule.isOpenTonight;
  const open_hours_display = schedule.todayHoursDisplay;

  return {
    id: b.id,
    name: b.name,
    address: b.address,
    neighborhood: b.neighborhood || 'Baltimore',
    lat: b.lat,
    lng: b.lng,
    distance_miles: b.distance_miles ?? 0.5,
    walk_minutes: b.walk_minutes ?? 10,
    hours_text,
    open_today,
    open_tonight,
    open_hours_display,
    requires_id: b.requires_id ?? false,
    allows_walkins: b.allows_walkins ?? true,
    languages: b.languages && b.languages.length > 0 ? b.languages : ['English'],
    notes: b.notes || '',
    distribution_model:
      (b.distribution_model as Pantry['distribution_model']) || 'client_choice',
    phone: b.phone || '(410) 737-8282',
    specialty_tags: b.specialty_tags || [],
    shelf_items: (b.shelf_items || []).map((s) => ({
      category_name: s.category_name,
      category_emoji: s.category_emoji || '📦',
      band: s.band,
      minutes_ago: s.minutes_ago ?? 0,
      confidence: s.confidence ?? 0.95,
      estimated_qty: s.estimated_qty ?? undefined,
      capacity: s.capacity ?? undefined,
    })),
  };
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/api/categories`);
  if (!res.ok) throw new Error(`fetchCategories failed: ${res.status}`);
  return res.json();
}

/**
 * Fetch pantries from the backend. If lat/lng given, sorts by distance.
 * If no coordinates given, returns all pantries in the registry.
 */
export async function fetchPantries(
  lat?: number,
  lng?: number,
  radiusMiles?: number
): Promise<Pantry[]> {
  const query = lat !== undefined && lng !== undefined
    ? `?lat=${lat}&lng=${lng}&radius_miles=${radiusMiles || 50}`
    : '';
  const url = `${API_BASE}/api/pantries${query}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetchPantries failed: ${res.status}`);
  const data: BackendPantry[] = await res.json();
  return data.map(normalizePantry);
}

export async function registerPantry(pantryData: Partial<Pantry>): Promise<Pantry> {
  const res = await fetch(`${API_BASE}/api/pantries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pantryData),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`registerPantry failed: ${res.status} ${detail}`);
  }
  const created: BackendPantry = await res.json();
  return normalizePantry(created);
}

export async function verifyPin(pantryId: string, pin: string): Promise<{ valid: boolean; pantry_name?: string }> {
  const res = await fetch(`${API_BASE}/api/pantries/${pantryId}/verify-pin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin }),
  });
  if (!res.ok) {
    throw new Error(`verifyPin failed: ${res.status}`);
  }
  return res.json();
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
