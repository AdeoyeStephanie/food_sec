// Category canonicalization for donation intake.
//
// Single source of truth = the backend's category list (GET /api/categories,
// served from store.CANONICAL_CATEGORIES). Callers pass those names in as `known`
// so the frontend can't drift from the backend. A small synonym map handles
// scanner/preset strings that aren't exact matches; anything unmapped is reported
// by aggregateDonations (via `skipped`) rather than dropped silently.

// Fallback list, mirrors backend store.CANONICAL_CATEGORIES. Used only before the
// backend category list has loaded.
export const DEFAULT_CATEGORIES = [
  'Produce',
  'Protein',
  'Dairy',
  'Grains',
  'Canned Goods',
  'Diapers',
  'Hygiene',
  'Halal items',
  'Baby Essentials',
];

// Synonyms: raw scanner/preset string -> a canonical name (still resolved against
// `known`, so a synonym only maps if the backend actually has that category).
const SYNONYMS: Record<string, string> = {
  halal: 'Halal items',
  baby: 'Baby Essentials',
  formula: 'Baby Essentials',
};

/**
 * Resolve a raw scanner/preset category string to a backend category name
 * (case-insensitive), or null when it maps to nothing the backend knows.
 */
export function canonicalCategory(
  raw: string,
  known: string[] = DEFAULT_CATEGORIES
): string | null {
  if (!raw) return null;
  const key = raw.trim().toLowerCase();
  const exact = known.find((n) => n.toLowerCase() === key);
  if (exact) return exact;
  const syn = SYNONYMS[key];
  if (syn) {
    const hit = known.find((n) => n.toLowerCase() === syn.toLowerCase());
    if (hit) return hit;
  }
  return null;
}

/**
 * Aggregate raw donation counts (keyed by item name) into totals per canonical
 * category, returning the raw category strings that couldn't be mapped.
 */
export function aggregateDonations(
  donationCounts: Record<string, { count: number; category: string }>,
  known: string[] = DEFAULT_CATEGORIES
): { totals: Record<string, number>; skipped: string[] } {
  const totals: Record<string, number> = {};
  const skipped = new Set<string>();

  Object.values(donationCounts).forEach(({ count, category }) => {
    const canon = canonicalCategory(category, known);
    if (!canon) {
      skipped.add(category || '(unknown)');
      return;
    }
    totals[canon] = (totals[canon] || 0) + count;
  });

  return { totals, skipped: [...skipped] };
}
