// Category canonicalization + band thresholds for donation intake.
//
// The AI scanner (/api/scan-donation) and its presets emit category strings that
// don't all match the DB `food_categories` names exactly (e.g. "Halal items" vs
// "Halal Items"), and some have no DB category at all (e.g. "General"). We map
// what we can and let callers skip + report the rest rather than dropping silently.

// Exact DB category names — keep in sync with db/seed.sql food_categories.
export const DB_CATEGORIES = [
  'Produce',
  'Protein',
  'Dairy',
  'Grains',
  'Diapers',
  'Hygiene',
  'Canned Goods',
  'Halal Items',
  'Baby Essentials',
] as const;

// lowercase -> canonical DB name. Built from DB_CATEGORIES, plus explicit aliases.
const LOOKUP: Record<string, string> = {};
DB_CATEGORIES.forEach((c) => {
  LOOKUP[c.toLowerCase()] = c;
});
// Aliases for strings the scanner/presets produce that aren't exact matches.
// ("Halal items" already resolves via the DB_CATEGORIES lowercasing above.)
LOOKUP['halal'] = 'Halal Items';
LOOKUP['baby'] = 'Baby Essentials';
LOOKUP['formula'] = 'Baby Essentials';

/**
 * Resolve a raw scanner/preset category string to an exact DB category name,
 * or null when it maps to nothing known (caller should skip it and report).
 */
export function canonicalCategory(raw: string): string | null {
  if (!raw) return null;
  return LOOKUP[raw.trim().toLowerCase()] ?? null;
}

// Band thresholds (units of donated items). Tune here.
// total <= OUT_AT -> 'out', total < LOW_AT -> 'low', else 'plenty'.
export const OUT_AT = 0;
export const LOW_AT = 5;

export function countToBand(total: number): 'plenty' | 'low' | 'out' {
  if (total <= OUT_AT) return 'out';
  if (total < LOW_AT) return 'low';
  return 'plenty';
}

/**
 * Aggregate raw donation counts (keyed by item name) into totals per canonical
 * DB category, returning the list of raw category strings that couldn't be mapped.
 */
export function aggregateDonations(
  donationCounts: Record<string, { count: number; category: string }>
): { totals: Record<string, number>; skipped: string[] } {
  const totals: Record<string, number> = {};
  const skipped = new Set<string>();

  Object.values(donationCounts).forEach(({ count, category }) => {
    const canon = canonicalCategory(category);
    if (!canon) {
      skipped.add(category || '(unknown)');
      return;
    }
    totals[canon] = (totals[canon] || 0) + count;
  });

  return { totals, skipped: [...skipped] };
}
