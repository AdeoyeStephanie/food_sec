import { evaluateRealTimeSchedule } from './realTimeSchedule';

export interface ShelfItem {
  category_name: string;
  category_emoji: string;
  band: 'plenty' | 'low' | 'out';
  minutes_ago: number;
  confidence: number;
  estimated_qty?: number;
  capacity?: number;
  updated_at?: string;
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
  updated_at?: string;
}

export interface UrgencyInfo {
  status: 'open' | 'closing_soon' | 'open_tonight' | 'closed';
  label: string;
  badgeClass: string;
  dotClass: string;
}

export function getUrgencyIndicator(pantry: Pantry, language: 'en' | 'es' = 'en'): UrgencyInfo {
  const schedule = evaluateRealTimeSchedule(pantry.hours_text, pantry.is_demo, language);
  return {
    status: schedule.status,
    label: schedule.label,
    badgeClass: schedule.badgeClass,
    dotClass: schedule.dotClass,
  };
}

/**
 * Empty fallback array. Pantries are dynamically retrieved from the backend API
 * (/api/pantries) or synced via localStorage.
 */
export const BALTIMORE_PANTRIES: Pantry[] = [];
