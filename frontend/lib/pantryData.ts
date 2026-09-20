import { getOpenState, formatMinutes, dayName } from './hours';

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

const BADGE_STYLES: Record<UrgencyInfo['status'], Pick<UrgencyInfo, 'badgeClass' | 'dotClass'>> = {
  open_tonight: {
    badgeClass: 'bg-indigo-50 text-indigo-900 border border-indigo-200',
    dotClass: 'bg-indigo-600 animate-pulse',
  },
  closing_soon: {
    badgeClass: 'bg-amber-50 text-amber-900 border border-amber-300',
    dotClass: 'bg-amber-600 animate-ping',
  },
  open: {
    badgeClass: 'bg-emerald-50 text-emerald-900 border border-emerald-300',
    dotClass: 'bg-emerald-600 animate-pulse',
  },
  closed: {
    badgeClass: 'bg-slate-100 text-slate-700 border border-slate-200',
    dotClass: 'bg-slate-400',
  },
};

/**
 * Legacy fallback used only when the hours text can't be parsed into a
 * schedule. Relies on the frozen open_today/open_tonight flags (not time-aware).
 */
function legacyUrgency(pantry: Pantry): UrgencyInfo {
  if (pantry.open_tonight) {
    return { status: 'open_tonight', label: '🌙 Open Tonight · Check Hours', ...BADGE_STYLES.open_tonight };
  }
  if (pantry.open_today) {
    return { status: 'open', label: '🟢 Open Today · Walk-ins Welcome', ...BADGE_STYLES.open };
  }
  return {
    status: 'closed',
    label: pantry.hours_text ? `Closed · ${pantry.hours_text}` : 'Closed Today',
    ...BADGE_STYLES.closed,
  };
}

/**
 * Live open/closed indicator computed from the pantry's hours text against the
 * current day and time (viewer's local timezone). Pass a `now` to drive
 * re-renders as the clock advances; defaults to the current moment.
 */
export function getUrgencyIndicator(pantry: Pantry, now: Date = new Date()): UrgencyInfo {
  const state = getOpenState(pantry.hours_text || pantry.open_hours_display, now);
  if (!state) return legacyUrgency(pantry);

  if (state.status === 'closed') {
    let label = 'Closed';
    if (state.nextOpen) {
      const isToday = state.nextOpen.dayIndex === now.getDay();
      const when = isToday ? formatMinutes(state.nextOpen.open) : `${dayName(state.nextOpen.dayIndex)} ${formatMinutes(state.nextOpen.open)}`;
      label = `Closed · Opens ${when}`;
    }
    return { status: 'closed', label, ...BADGE_STYLES.closed };
  }

  if (state.uncertain) {
    return { status: 'closing_soon', label: '⚠️ Open some weeks · Check hours', ...BADGE_STYLES.closing_soon };
  }

  const closesAt = state.current ? formatMinutes(state.current.close) : '';
  if (state.status === 'closing_soon') {
    return { status: 'closing_soon', label: `⚠️ Closes soon · ${closesAt}`, ...BADGE_STYLES.closing_soon };
  }
  if (state.status === 'open_tonight') {
    return { status: 'open_tonight', label: `🌙 Open now · Closes ${closesAt}`, ...BADGE_STYLES.open_tonight };
  }
  return { status: 'open', label: `🟢 Open now · Closes ${closesAt}`, ...BADGE_STYLES.open };
}

/**
 * Empty fallback array. Pantries are dynamically retrieved from the backend API
 * (/api/pantries) or synced via localStorage.
 */
export const BALTIMORE_PANTRIES: Pantry[] = [];
