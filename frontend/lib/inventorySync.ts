import { Pantry, ShelfItem } from './pantryData';

export interface CategoryConfig {
  name: string;
  emoji: string;
  capacity: number; // Initial full stock in lbs or units
  ratePerPerson: number; // Consumed per person per household visit
  lowThreshold: number; // Remaining stock where item drops to 'low' (yellow)
  outThreshold: number; // Remaining stock where item drops to 'out' (red)
}

export const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  Produce: { name: 'Produce', emoji: '🥕', capacity: 100, ratePerPerson: 2.5, lowThreshold: 30, outThreshold: 8 },
  Protein: { name: 'Protein', emoji: '🥩', capacity: 75, ratePerPerson: 1.8, lowThreshold: 22, outThreshold: 6 },
  Dairy: { name: 'Dairy', emoji: '🥛', capacity: 50, ratePerPerson: 0.5, lowThreshold: 15, outThreshold: 4 },
  Grains: { name: 'Grains', emoji: '🍞', capacity: 80, ratePerPerson: 2.0, lowThreshold: 25, outThreshold: 6 },
  'Canned Goods': { name: 'Canned Goods', emoji: '🥫', capacity: 120, ratePerPerson: 3.0, lowThreshold: 35, outThreshold: 10 },
  Diapers: { name: 'Diapers', emoji: '👶', capacity: 35, ratePerPerson: 0.4, lowThreshold: 10, outThreshold: 3 },
  Hygiene: { name: 'Hygiene', emoji: '🧼', capacity: 40, ratePerPerson: 0.5, lowThreshold: 12, outThreshold: 4 },
};

const STORAGE_KEY = 'BALTIMORE_PANTRIES_DATA_V1';
const CHECKINS_LOG_KEY = 'BALTIMORE_CHECKINS_LOG_V1';

export interface CheckInRecord {
  id: string;
  pantryId: string;
  pantryName: string;
  householdSize: number;
  timestamp: string;
  dateString: string;
}

/**
 * Predict-and-Correct Depletion Engine
 * Deducts food quantities based on household size and transitions bands (Plenty -> Low -> Out)
 */
export function calculateDepletedInventory(
  currentItems: ShelfItem[],
  householdSize: number
): { updatedItems: ShelfItem[]; deductionsSummary: string } {
  const deductions: string[] = [];

  const updatedItems = currentItems.map((item) => {
    const config = CATEGORY_CONFIGS[item.category_name] || {
      name: item.category_name,
      emoji: item.category_emoji || '📦',
      capacity: 60,
      ratePerPerson: 1.5,
      lowThreshold: 18,
      outThreshold: 5,
    };

    const deducted = Math.round(householdSize * config.ratePerPerson * 10) / 10;
    
    // Estimate current numerical stock if not present
    let currentQty = item.estimated_qty;
    if (typeof currentQty !== 'number') {
      if (item.band === 'plenty') currentQty = config.capacity * 0.75;
      else if (item.band === 'low') currentQty = config.lowThreshold * 0.8;
      else currentQty = 0;
    }

    const newQty = Math.max(0, Math.round((currentQty - deducted) * 10) / 10);

    let newBand: 'plenty' | 'low' | 'out' = 'plenty';
    if (newQty <= config.outThreshold) {
      newBand = 'out';
    } else if (newQty <= config.lowThreshold) {
      newBand = 'low';
    }

    if (item.band !== newBand && (newBand === 'low' || newBand === 'out')) {
      deductions.push(`${config.emoji} ${config.name} now ${newBand.toUpperCase()}`);
    }

    const currentConf = typeof item.confidence === 'number' ? item.confidence : 0.95;
    const newConf = Math.max(0.65, Math.round((currentConf - 0.015) * 100) / 100);

    return {
      ...item,
      band: newBand,
      estimated_qty: newQty,
      capacity: config.capacity,
      minutes_ago: 0,
      confidence: newConf,
    };
  });

  const deductionsSummary = deductions.length > 0
    ? deductions.join(', ')
    : `Household of ${householdSize} logged (~${householdSize * 2} lbs distributed)`;

  return { updatedItems, deductionsSummary };
}

/**
 * Load pantries from localStorage or fallback to defaults
 */
export function getStoredPantries(fallback: Pantry[]): Pantry[] {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read stored pantries from localStorage:', err);
  }
  return fallback;
}

/**
 * Save updated pantries and broadcast real-time storage event across all tabs and windows
 */
export function saveAndBroadcastPantries(pantries: Pantry[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pantries));
    window.dispatchEvent(new CustomEvent('inventory-sync', { detail: pantries }));
  } catch (err) {
    console.warn('Could not persist pantries to localStorage:', err);
  }
}

/**
 * Record an anonymous household check-in for TEFAP compliance reporting
 */
export function recordCheckIn(pantryId: string, pantryName: string, householdSize: number) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(CHECKINS_LOG_KEY);
    const list: CheckInRecord[] = raw ? JSON.parse(raw) : [];
    list.push({
      id: `chk-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      pantryId,
      pantryName,
      householdSize,
      timestamp: new Date().toISOString(),
      dateString: new Date().toLocaleDateString('en-US'),
    });
    localStorage.setItem(CHECKINS_LOG_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn('Could not log check-in:', err);
  }
}

/**
 * Retrieve check-in records for reports
 */
export function getCheckInRecords(pantryId?: string): CheckInRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CHECKINS_LOG_KEY);
    if (!raw) return [];
    const list: CheckInRecord[] = JSON.parse(raw);
    if (pantryId) {
      return list.filter((r) => r.pantryId === pantryId);
    }
    return list;
  } catch {
    return [];
  }
}
