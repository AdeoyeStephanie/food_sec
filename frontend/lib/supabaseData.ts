import { supabase } from './supabaseClient';
import { Pantry, ShelfItem } from './pantryData';
import geoLookup from './pantryGeoLookup.json';

export interface SupabaseCategory {
  id: number;
  name: string;
  emoji: string;
  is_default?: boolean;
}

interface GeoRecord {
  lat?: number;
  lng?: number;
  dist?: number;
  walk?: number;
  tags?: string[];
  demo?: boolean;
  model?: 'client_choice' | 'pre_packed' | 'list';
}

interface ShelfRow {
  pantry_id: string;
  category_id: number;
  band?: 'plenty' | 'low' | 'out';
  estimated_qty?: number;
  confidence?: number;
  time?: string;
}

/**
 * Fetch all categories from Supabase
 */
export async function fetchCategoriesFromSupabase(): Promise<SupabaseCategory[]> {
  const { data, error } = await supabase
    .from('food_categories')
    .select('id, name, emoji, is_default')
    .order('id');
  if (error) {
    console.error('Error fetching categories from Supabase:', error);
    return [];
  }
  return data || [];
}

/**
 * Fetch pantries from Supabase, combined with latest shelf state
 */
export async function fetchPantriesFromSupabase(): Promise<Pantry[]> {
  try {
    const [pantriesRes, shelfRes, catRes] = await Promise.all([
      supabase.from('pantries').select('*').eq('is_active', true),
      supabase.from('shelf_state').select('*').order('time', { ascending: false }),
      supabase.from('food_categories').select('*'),
    ]);

    if (pantriesRes.error) throw pantriesRes.error;

    const categoriesMap = new Map<number, SupabaseCategory>();
    (catRes.data || []).forEach((c) => categoriesMap.set(c.id, c));

    // Map latest shelf item per pantry and category
    const latestShelfByPantry = new Map<string, Map<number, ShelfRow>>();
    (shelfRes.data || []).forEach((row) => {
      if (!latestShelfByPantry.has(row.pantry_id)) {
        latestShelfByPantry.set(row.pantry_id, new Map());
      }
      const pMap = latestShelfByPantry.get(row.pantry_id)!;
      if (!pMap.has(row.category_id)) {
        pMap.set(row.category_id, row);
      }
    });

    return (pantriesRes.data || []).map((row): Pantry => {
      const pShelfMap = latestShelfByPantry.get(row.id);
      const shelf_items: ShelfItem[] = [];

      if (pShelfMap) {
        pShelfMap.forEach((sRow, catId) => {
          const cat = categoriesMap.get(catId);
          shelf_items.push({
            category_name: cat?.name || 'General',
            category_emoji: cat?.emoji || '📦',
            band: sRow.band || 'plenty',
            minutes_ago: sRow.time ? Math.max(0, Math.floor((Date.now() - new Date(sRow.time).getTime()) / 60000)) : 10,
            confidence: sRow.confidence ?? 0.95,
            estimated_qty: sRow.estimated_qty,
          });
        });
      }

      // Accurate coordinates, tags, and distances lookup
      const geo = (geoLookup as Record<string, GeoRecord>)[row.id] || {};
      const lat = typeof geo.lat === 'number' ? geo.lat : 39.2904;
      const lng = typeof geo.lng === 'number' ? geo.lng : -76.6122;

      return {
        id: row.id,
        name: row.name,
        address: row.address,
        neighborhood: row.neighborhood || 'Baltimore',
        lat,
        lng,
        distance_miles: geo.dist ?? 0.8,
        walk_minutes: geo.walk ?? 15,
        hours_text: typeof row.hours === 'string' ? row.hours : 'Open today 9:00 AM – 4:00 PM',
        open_today: true,
        open_tonight: false,
        open_hours_display: '9:00 AM – 4:00 PM',
        requires_id: row.requires_id ?? false,
        allows_walkins: row.allows_walkins ?? true,
        languages: row.languages || ['English'],
        notes: row.notes || '',
        distribution_model: (row.distribution_model || geo.model || 'client_choice') as 'client_choice' | 'pre_packed' | 'list',
        phone: row.phone || '(410) 737-8282',
        specialty_tags: geo.tags || [],
        shelf_items,
        is_demo: geo.demo ?? false,
      };
    });
  } catch (err) {
    console.error('Failed to fetch from Supabase:', err);
    return [];
  }
}

/**
 * Log anonymous checkin directly to Supabase table
 */
export async function logCheckinToSupabase(pantryId: string, householdSize: number) {
  const { error } = await supabase.from('check_ins').insert({
    pantry_id: pantryId,
    household_size: householdSize,
  });
  if (error) console.error('Supabase checkin error:', error);
}

/**
 * Log volunteer closing check to Supabase shelf_state table
 */
export async function updateShelfInSupabase(
  pantryId: string,
  categoryId: number,
  band: 'plenty' | 'low' | 'out',
  estimatedQty?: number,
  confidence: number = 0.95
) {
  const { error } = await supabase.from('shelf_state').insert({
    pantry_id: pantryId,
    category_id: categoryId,
    band,
    estimated_qty: estimatedQty,
    confidence,
    source: 'volunteer_correction',
  });
  if (error) console.error('Supabase shelf update error:', error);
}

/**
 * Subscribe to realtime updates across all devices via Supabase WebSockets
 */
export function subscribeToShelfRealtime(onUpdate: () => void) {
  const channel = supabase
    .channel('pantree-realtime-shelf')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'shelf_state' },
      () => {
        onUpdate();
      }
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'check_ins' },
      () => {
        onUpdate();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
