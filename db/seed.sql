-- ============================================================
-- Find Food Baltimore — Seed Data
-- 10 real Baltimore pantries + realistic shelf state
-- ============================================================

-- ============================================================
-- Default food categories (matching the mockups)
-- ============================================================
INSERT INTO food_categories (name, emoji, is_default) VALUES
    ('Produce',     '🥕', true),
    ('Protein',     '🥩', true),
    ('Dairy',       '🥛', true),
    ('Grains',      '🍞', true),
    ('Diapers',     '🧒', true),
    ('Hygiene',     '🧴', true),
    ('Canned Goods','🥫', true),
    ('Halal Items', '🌙', true),
    ('Baby Essentials', '🍼', true);

-- ============================================================
-- 10 Baltimore pantries with real names and coordinates
-- ============================================================

-- 1. Beans and Bread (Our Daily Bread) — Fells Point
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000001',
    'Beans and Bread',
    '402 S Bond St, Baltimore, MD 21231',
    'Fells Point',
    ST_SetSRID(ST_MakePoint(-76.5925, 39.2830), 4326)::geography,
    '(410) 732-6834',
    'client_choice',
    '{"mon": {"open": "10:00", "close": "14:00"}, "tue": {"open": "10:00", "close": "14:00"}, "wed": {"open": "10:00", "close": "14:00"}, "thu": {"open": "10:00", "close": "14:00"}, "fri": {"open": "10:00", "close": "14:00"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Bring your own bags. Two or three sturdy bags is usually enough.'
);

-- 2. GEDCO CARES — Charles Village
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000002',
    'GEDCO CARES Pantry',
    '5765 N Charles St, Baltimore, MD 21210',
    'Charles Village',
    ST_SetSRID(ST_MakePoint(-76.6131, 39.3490), 4326)::geography,
    '(410) 243-0855',
    'list',
    '{"tue": {"open": "09:00", "close": "12:00"}, "thu": {"open": "09:00", "close": "12:00"}}',
    false, true, ARRAY['English'],
    'Pick from our list and we pack it for you.'
);

-- 3. St. Vincent de Paul — Jonestown
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000003',
    'St. Vincent de Paul Food Pantry',
    '120 N Front St, Baltimore, MD 21202',
    'Jonestown',
    ST_SetSRID(ST_MakePoint(-76.6050, 39.2920), 4326)::geography,
    '(410) 962-5078',
    'pre_packed',
    '{"wed": {"open": "10:00", "close": "13:00"}, "sat": {"open": "09:00", "close": "12:00"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Pre-packed bags ready to go. No appointment needed.'
);

-- 4. Bea Gaddy Family Centers — Patterson Park
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000004',
    'Bea Gaddy Family Centers',
    '413 E Federal St, Baltimore, MD 21202',
    'Patterson Park',
    ST_SetSRID(ST_MakePoint(-76.5960, 39.2960), 4326)::geography,
    '(410) 563-2749',
    'client_choice',
    '{"mon": {"open": "09:00", "close": "15:00"}, "wed": {"open": "09:00", "close": "15:00"}, "fri": {"open": "09:00", "close": "15:00"}}',
    false, true, ARRAY['English'],
    'You pick your own items, like a small store.'
);

-- 5. Northside Family Pantry — Hampden (from the mockups)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000005',
    'Northside Family Pantry',
    '1100 W 36th St, Baltimore, MD 21211',
    'Hampden',
    ST_SetSRID(ST_MakePoint(-76.6362, 39.3310), 4326)::geography,
    '(410) 555-0105',
    'client_choice',
    '{"mon": {"open": "17:00", "close": "20:00"}, "wed": {"open": "17:00", "close": "20:00"}, "fri": {"open": "17:00", "close": "20:00"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Bring your own bags. Walk in, no appointment. You pick your own items.'
);

-- 6. Riverside Community Table — Riverside (from the mockups)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000006',
    'Riverside Community Table',
    '1234 E Fort Ave, Baltimore, MD 21230',
    'Riverside',
    ST_SetSRID(ST_MakePoint(-76.5960, 39.2720), 4326)::geography,
    '(410) 555-0106',
    'pre_packed',
    '{"tue": {"open": "16:00", "close": "19:00"}, "thu": {"open": "16:00", "close": "19:00"}, "sat": {"open": "10:00", "close": "13:00"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Pre-packed bags. Drive-through available on Saturdays.'
);

-- 7. Paul's Place — Washington Village/Pigtown
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000007',
    'Paul''s Place',
    '1118 Ward St, Baltimore, MD 21230',
    'Pigtown',
    ST_SetSRID(ST_MakePoint(-76.6350, 39.2790), 4326)::geography,
    '(410) 625-0775',
    'client_choice',
    '{"mon": {"open": "08:30", "close": "12:30"}, "tue": {"open": "08:30", "close": "12:30"}, "wed": {"open": "08:30", "close": "12:30"}, "thu": {"open": "08:30", "close": "12:30"}, "fri": {"open": "08:30", "close": "12:30"}}',
    false, true, ARRAY['English'],
    'Shower and laundry services also available.'
);

-- 8. Waverly Community Pantry — Waverly
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000008',
    'Waverly Community Pantry',
    '3100 Greenmount Ave, Baltimore, MD 21218',
    'Waverly',
    ST_SetSRID(ST_MakePoint(-76.6095, 39.3270), 4326)::geography,
    '(410) 555-0108',
    'client_choice',
    '{"wed": {"open": "14:00", "close": "18:00"}, "sat": {"open": "09:00", "close": "12:00"}}',
    false, true, ARRAY['English'],
    'Walk in, no appointment. Bring your own bags.'
);

-- 9. Cherry Hill Community Pantry — Cherry Hill
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000009',
    'Cherry Hill Community Pantry',
    '601 Cherry Hill Rd, Baltimore, MD 21225',
    'Cherry Hill',
    ST_SetSRID(ST_MakePoint(-76.6230, 39.2460), 4326)::geography,
    '(410) 555-0109',
    'pre_packed',
    '{"fri": {"open": "10:00", "close": "14:00"}, "sat": {"open": "10:00", "close": "14:00"}}',
    true, true, ARRAY['English'],
    'ID required for first visit only. Pre-packed family boxes.'
);

-- 10. Sandtown Community Pantry — Sandtown-Winchester
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000010',
    'Sandtown Community Pantry',
    '1400 N Mount St, Baltimore, MD 21217',
    'Sandtown-Winchester',
    ST_SetSRID(ST_MakePoint(-76.6420, 39.3060), 4326)::geography,
    '(410) 555-0110',
    'client_choice',
    '{"mon": {"open": "11:00", "close": "15:00"}, "thu": {"open": "11:00", "close": "15:00"}}',
    false, true, ARRAY['English'],
    'You pick your own items. No ID needed.'
);

-- ============================================================
-- Link all pantries to default categories
-- with realistic per-category allocation rates (lbs/person)
-- ============================================================
INSERT INTO pantry_categories (pantry_id, category_id, lbs_per_person)
SELECT p.id, c.id,
    CASE c.name
        WHEN 'Produce'      THEN 2.0
        WHEN 'Protein'      THEN 1.5
        WHEN 'Dairy'        THEN 1.0
        WHEN 'Grains'       THEN 1.5
        WHEN 'Diapers'      THEN 0.5  -- packs, not lbs
        WHEN 'Hygiene'      THEN 0.3
        WHEN 'Canned Goods' THEN 2.0
        WHEN 'Halal Items'  THEN 1.5
        ELSE 1.0
    END
FROM pantries p
CROSS JOIN food_categories c
WHERE c.is_default = true;

-- ============================================================
-- Seed shelf state — give each pantry realistic current stock
-- (as if data was captured over the last few hours)
-- ============================================================

-- Helper: insert a shelf state row at a recent timestamp
-- We'll create varied stock levels to make the demo interesting

-- Pantry 1: Beans and Bread (well stocked except hygiene)
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000001', 1, 'plenty',    35, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000001', 2, 'low',        12, 'volunteer_correction', 0.90),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000001', 3, 'plenty',     28, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000001', 4, 'plenty',     40, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000001', 5, 'low',         8, 'volunteer_correction', 0.90),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000001', 6, 'out',         2, 'volunteer_correction', 0.85),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000001', 7, 'plenty',     45, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000001', 8, 'low',        10, 'volunteer_correction', 0.85);

-- Pantry 2: GEDCO CARES (moderate stock)
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000002', 1, 'low',      15, 'volunteer_correction', 0.80),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000002', 2, 'plenty',   30, 'volunteer_correction', 0.80),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000002', 3, 'low',      10, 'volunteer_correction', 0.80),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000002', 4, 'plenty',   35, 'volunteer_correction', 0.80),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000002', 5, 'out',       0, 'volunteer_correction', 0.80),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000002', 6, 'low',       8, 'volunteer_correction', 0.80),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000002', 7, 'plenty',   40, 'volunteer_correction', 0.80),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000002', 8, 'out',       0, 'volunteer_correction', 0.75);

-- Pantry 3: St. Vincent de Paul (well stocked, recent update)
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '15 minutes', 'a1000000-0000-0000-0000-000000000003', 1, 'plenty', 50, 'intake_photo', 0.98),
    (now() - interval '15 minutes', 'a1000000-0000-0000-0000-000000000003', 2, 'plenty', 40, 'intake_photo', 0.98),
    (now() - interval '15 minutes', 'a1000000-0000-0000-0000-000000000003', 3, 'plenty', 35, 'intake_photo', 0.98),
    (now() - interval '15 minutes', 'a1000000-0000-0000-0000-000000000003', 4, 'plenty', 60, 'intake_photo', 0.98),
    (now() - interval '15 minutes', 'a1000000-0000-0000-0000-000000000003', 5, 'plenty', 25, 'intake_photo', 0.98),
    (now() - interval '15 minutes', 'a1000000-0000-0000-0000-000000000003', 6, 'plenty', 20, 'intake_photo', 0.98),
    (now() - interval '15 minutes', 'a1000000-0000-0000-0000-000000000003', 7, 'plenty', 55, 'intake_photo', 0.98),
    (now() - interval '15 minutes', 'a1000000-0000-0000-0000-000000000003', 8, 'plenty', 30, 'intake_photo', 0.98);

-- Pantry 4: Bea Gaddy (running low on several items)
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '90 minutes', 'a1000000-0000-0000-0000-000000000004', 1, 'low',     8, 'prediction', 0.70),
    (now() - interval '90 minutes', 'a1000000-0000-0000-0000-000000000004', 2, 'out',     3, 'prediction', 0.65),
    (now() - interval '90 minutes', 'a1000000-0000-0000-0000-000000000004', 3, 'low',    10, 'prediction', 0.70),
    (now() - interval '90 minutes', 'a1000000-0000-0000-0000-000000000004', 4, 'plenty', 25, 'prediction', 0.75),
    (now() - interval '90 minutes', 'a1000000-0000-0000-0000-000000000004', 5, 'low',     6, 'prediction', 0.65),
    (now() - interval '90 minutes', 'a1000000-0000-0000-0000-000000000004', 6, 'out',     1, 'prediction', 0.60),
    (now() - interval '90 minutes', 'a1000000-0000-0000-0000-000000000004', 7, 'low',    12, 'prediction', 0.70),
    (now() - interval '90 minutes', 'a1000000-0000-0000-0000-000000000004', 8, 'out',     0, 'prediction', 0.55);

-- Pantry 5: Northside Family Pantry — the mockup pantry (plenty of diapers, low halal)
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000005', 1, 'plenty', 40, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000005', 2, 'low',    14, 'volunteer_correction', 0.90),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000005', 3, 'plenty', 30, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000005', 4, 'plenty', 35, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000005', 5, 'plenty', 22, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000005', 6, 'out',     2, 'volunteer_correction', 0.85),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000005', 7, 'plenty', 38, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000005', 8, 'low',     9, 'volunteer_correction', 0.85);

-- Pantry 6: Riverside Community Table
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '3 hours', 'a1000000-0000-0000-0000-000000000006', 1, 'plenty', 30, 'volunteer_correction', 0.75),
    (now() - interval '3 hours', 'a1000000-0000-0000-0000-000000000006', 2, 'low',    10, 'volunteer_correction', 0.70),
    (now() - interval '3 hours', 'a1000000-0000-0000-0000-000000000006', 3, 'plenty', 25, 'volunteer_correction', 0.75),
    (now() - interval '3 hours', 'a1000000-0000-0000-0000-000000000006', 4, 'plenty', 35, 'volunteer_correction', 0.75),
    (now() - interval '3 hours', 'a1000000-0000-0000-0000-000000000006', 5, 'low',     7, 'volunteer_correction', 0.70),
    (now() - interval '3 hours', 'a1000000-0000-0000-0000-000000000006', 6, 'low',     5, 'volunteer_correction', 0.70),
    (now() - interval '3 hours', 'a1000000-0000-0000-0000-000000000006', 7, 'plenty', 42, 'volunteer_correction', 0.75),
    (now() - interval '3 hours', 'a1000000-0000-0000-0000-000000000006', 8, 'out',     0, 'volunteer_correction', 0.65);

-- Pantry 7: Paul's Place
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '30 minutes', 'a1000000-0000-0000-0000-000000000007', 1, 'plenty', 45, 'intake_photo', 0.95),
    (now() - interval '30 minutes', 'a1000000-0000-0000-0000-000000000007', 2, 'plenty', 35, 'intake_photo', 0.95),
    (now() - interval '30 minutes', 'a1000000-0000-0000-0000-000000000007', 3, 'low',    12, 'intake_photo', 0.90),
    (now() - interval '30 minutes', 'a1000000-0000-0000-0000-000000000007', 4, 'plenty', 50, 'intake_photo', 0.95),
    (now() - interval '30 minutes', 'a1000000-0000-0000-0000-000000000007', 5, 'out',     0, 'intake_photo', 0.95),
    (now() - interval '30 minutes', 'a1000000-0000-0000-0000-000000000007', 6, 'plenty', 18, 'intake_photo', 0.95),
    (now() - interval '30 minutes', 'a1000000-0000-0000-0000-000000000007', 7, 'plenty', 55, 'intake_photo', 0.95),
    (now() - interval '30 minutes', 'a1000000-0000-0000-0000-000000000007', 8, 'plenty', 20, 'intake_photo', 0.90);

-- Pantry 8: Waverly Community Pantry (in 21218 — important for demo)
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '55 minutes', 'a1000000-0000-0000-0000-000000000008', 1, 'low',    15, 'prediction', 0.75),
    (now() - interval '55 minutes', 'a1000000-0000-0000-0000-000000000008', 2, 'low',    10, 'prediction', 0.70),
    (now() - interval '55 minutes', 'a1000000-0000-0000-0000-000000000008', 3, 'plenty', 22, 'prediction', 0.80),
    (now() - interval '55 minutes', 'a1000000-0000-0000-0000-000000000008', 4, 'plenty', 30, 'prediction', 0.80),
    (now() - interval '55 minutes', 'a1000000-0000-0000-0000-000000000008', 5, 'plenty', 18, 'prediction', 0.80),
    (now() - interval '55 minutes', 'a1000000-0000-0000-0000-000000000008', 6, 'low',     6, 'prediction', 0.70),
    (now() - interval '55 minutes', 'a1000000-0000-0000-0000-000000000008', 7, 'plenty', 35, 'prediction', 0.80),
    (now() - interval '55 minutes', 'a1000000-0000-0000-0000-000000000008', 8, 'low',     8, 'prediction', 0.70);

-- Pantry 9: Cherry Hill (limited stock, older data)
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '5 hours', 'a1000000-0000-0000-0000-000000000009', 1, 'low',    10, 'manual', 0.50),
    (now() - interval '5 hours', 'a1000000-0000-0000-0000-000000000009', 2, 'low',     8, 'manual', 0.50),
    (now() - interval '5 hours', 'a1000000-0000-0000-0000-000000000009', 3, 'out',     2, 'manual', 0.45),
    (now() - interval '5 hours', 'a1000000-0000-0000-0000-000000000009', 4, 'low',    12, 'manual', 0.50),
    (now() - interval '5 hours', 'a1000000-0000-0000-0000-000000000009', 5, 'out',     0, 'manual', 0.45),
    (now() - interval '5 hours', 'a1000000-0000-0000-0000-000000000009', 6, 'out',     0, 'manual', 0.45),
    (now() - interval '5 hours', 'a1000000-0000-0000-0000-000000000009', 7, 'low',    15, 'manual', 0.50),
    (now() - interval '5 hours', 'a1000000-0000-0000-0000-000000000009', 8, 'out',     0, 'manual', 0.40);

-- Pantry 10: Sandtown Community Pantry
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '70 minutes', 'a1000000-0000-0000-0000-000000000010', 1, 'plenty', 28, 'volunteer_correction', 0.85),
    (now() - interval '70 minutes', 'a1000000-0000-0000-0000-000000000010', 2, 'plenty', 22, 'volunteer_correction', 0.85),
    (now() - interval '70 minutes', 'a1000000-0000-0000-0000-000000000010', 3, 'low',    10, 'volunteer_correction', 0.80),
    (now() - interval '70 minutes', 'a1000000-0000-0000-0000-000000000010', 4, 'plenty', 32, 'volunteer_correction', 0.85),
    (now() - interval '70 minutes', 'a1000000-0000-0000-0000-000000000010', 5, 'low',     5, 'volunteer_correction', 0.75),
    (now() - interval '70 minutes', 'a1000000-0000-0000-0000-000000000010', 6, 'out',     1, 'volunteer_correction', 0.70),
    (now() - interval '70 minutes', 'a1000000-0000-0000-0000-000000000010', 7, 'plenty', 40, 'volunteer_correction', 0.85),
    (now() - interval '70 minutes', 'a1000000-0000-0000-0000-000000000010', 8, 'low',     7, 'volunteer_correction', 0.75);

-- ============================================================
-- Seed some check-in history for Northside (pantry 5)
-- to demo the predict-and-correct engine
-- ============================================================
INSERT INTO check_ins (time, pantry_id, household_size) VALUES
    (now() - interval '4 hours',   'a1000000-0000-0000-0000-000000000005', 3),
    (now() - interval '3.5 hours', 'a1000000-0000-0000-0000-000000000005', 2),
    (now() - interval '3 hours',   'a1000000-0000-0000-0000-000000000005', 5),
    (now() - interval '2.5 hours', 'a1000000-0000-0000-0000-000000000005', 1),
    (now() - interval '2 hours',   'a1000000-0000-0000-0000-000000000005', 4),
    (now() - interval '1.5 hours', 'a1000000-0000-0000-0000-000000000005', 3),
    (now() - interval '1 hour',    'a1000000-0000-0000-0000-000000000005', 2),
    (now() - interval '50 min',    'a1000000-0000-0000-0000-000000000005', 6),
    (now() - interval '45 min',    'a1000000-0000-0000-0000-000000000005', 2),
    (now() - interval '40 min',    'a1000000-0000-0000-0000-000000000005', 3),
    (now() - interval '35 min',    'a1000000-0000-0000-0000-000000000005', 4),
    (now() - interval '30 min',    'a1000000-0000-0000-0000-000000000005', 1),
    (now() - interval '25 min',    'a1000000-0000-0000-0000-000000000005', 2),
    (now() - interval '20 min',    'a1000000-0000-0000-0000-000000000005', 3),
    (now() - interval '15 min',    'a1000000-0000-0000-0000-000000000005', 5),
    (now() - interval '10 min',    'a1000000-0000-0000-0000-000000000005', 2),
    (now() - interval '8 min',     'a1000000-0000-0000-0000-000000000005', 4),
    (now() - interval '6 min',     'a1000000-0000-0000-0000-000000000005', 3),
    (now() - interval '4 min',     'a1000000-0000-0000-0000-000000000005', 1),
    (now() - interval '2 min',     'a1000000-0000-0000-0000-000000000005', 2),
    (now() - interval '1 min',     'a1000000-0000-0000-0000-000000000005', 3),
    (now() - interval '30 sec',    'a1000000-0000-0000-0000-000000000005', 2),
    (now() - interval '15 sec',    'a1000000-0000-0000-0000-000000000005', 4);
