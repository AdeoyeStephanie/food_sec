export interface ShelfItem {
  category_name: string;
  category_emoji: string;
  band: 'plenty' | 'low' | 'out';
  minutes_ago: number;
  confidence: number;
  estimated_qty?: number;
  capacity?: number;
}

export interface Pantry {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  lat: number;
  lng: number;
  distance_miles: number;
  walk_minutes: number;
  hours_text: string;
  open_today: boolean;
  open_tonight: boolean;
  open_hours_display: string;
  requires_id: boolean;
  allows_walkins: boolean;
  languages: string[];
  notes: string;
  distribution_model: 'client_choice' | 'pre_packed' | 'list';
  shelf_items: ShelfItem[];
  phone: string;
  specialty_tags?: string[];
  is_demo?: boolean;
}

export interface UrgencyInfo {
  status: 'open' | 'closing_soon' | 'open_tonight' | 'closed';
  label: string;
  badgeClass: string;
  dotClass: string;
}

export function getUrgencyIndicator(pantry: Pantry): UrgencyInfo {
  // Check if open tonight
  if (pantry.open_tonight) {
    return {
      status: 'open_tonight',
      label: '🌙 Open Tonight · 5:00 PM – 8:00 PM',
      badgeClass: 'bg-indigo-50 text-indigo-900 border border-indigo-200',
      dotClass: 'bg-indigo-600 animate-pulse',
    };
  }

  // Check if open today
  if (pantry.open_today) {
    const hours = (pantry.hours_text || '').toLowerCase();
    if (hours.includes('1pm') || hours.includes('1:00 pm') || hours.includes('12pm')) {
      return {
        status: 'closing_soon',
        label: '⚠️ Closes Soon · Check Hours',
        badgeClass: 'bg-amber-50 text-amber-900 border border-amber-300',
        dotClass: 'bg-amber-600 animate-ping',
      };
    }

    return {
      status: 'open',
      label: '🟢 Open Today · Walk-ins Welcome',
      badgeClass: 'bg-emerald-50 text-emerald-900 border border-emerald-300',
      dotClass: 'bg-emerald-600 animate-pulse',
    };
  }

  // Closed today
  return {
    status: 'closed',
    label: pantry.hours_text ? `Closed Today · ${pantry.hours_text}` : 'Closed Today',
    badgeClass: 'bg-slate-100 text-slate-700 border border-slate-200',
    dotClass: 'bg-slate-400',
  };
}

/**
 * Empty fallback array. Pantries are dynamically retrieved from the backend API
 * (/api/pantries) or synced via localStorage.
 */
export const BALTIMORE_PANTRIES: Pantry[] = [];
