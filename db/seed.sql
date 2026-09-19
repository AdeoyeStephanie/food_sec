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

-- 1. Beans & Bread Center (St. Vincent de Paul) — Fells Point
-- (SVDP's flagship comprehensive day center offering morning meals and emergency pantry groceries)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000001',
    'Beans & Bread Center (St. Vincent de Paul)',
    '400 S Bond St, Baltimore, MD 21231',
    'Fells Point',
    ST_SetSRID(ST_MakePoint(-76.5940, 39.2835), 4326)::geography,
    '(410) 732-1892',
    'client_choice',
    '{"mon": {"open": "08:30", "close": "13:00"}, "tue": {"open": "08:30", "close": "13:00"}, "wed": {"open": "08:30", "close": "13:00"}, "thu": {"open": "08:30", "close": "13:00"}, "fri": {"open": "08:30", "close": "13:00"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Morning meal 8:30-10am, emergency pantry and resource services 10:30am-1pm. Bring your own bags.'
);

-- 2. GEDCO CARES Food Pantry — Govans / North Baltimore
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000002',
    'GEDCO CARES Food Pantry',
    '5500 York Rd, Baltimore, MD 21212',
    'Govans',
    ST_SetSRID(ST_MakePoint(-76.6095, 39.3565), 4326)::geography,
    '(410) 433-2442',
    'list',
    '{"tue": {"open": "09:00", "close": "12:00"}, "thu": {"open": "09:00", "close": "12:00"}}',
    false, true, ARRAY['English'],
    'Pick from our grocery list and our volunteers pack fresh bags for you.'
);

-- 3. 40 West Assistance Center — Edmondson Village (Real MFB Partner)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000003',
    '40 West Assistance Center',
    '4711 Edmondson Ave, Baltimore, MD 21229',
    'Edmondson Village',
    ST_SetSRID(ST_MakePoint(-76.6946, 39.2945), 4326)::geography,
    '(410) 233-4357',
    'client_choice',
    '{"mon": {"open": "10:00", "close": "13:00"}, "wed": {"open": "10:00", "close": "13:00"}, "fri": {"open": "10:00", "close": "13:00"}}',
    false, true, ARRAY['English'],
    'Maryland Food Bank partner providing emergency food assistance, produce, and shelf staples to West Baltimore neighbors.'
);

-- 4. Bea Gaddy Family Centers — Patterson Park / Middle East
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000004',
    'Bea Gaddy Family Centers',
    '425 N Chester St, Baltimore, MD 21231',
    'Middle East',
    ST_SetSRID(ST_MakePoint(-76.5845, 39.2965), 4326)::geography,
    '(410) 563-2749',
    'client_choice',
    '{"mon": {"open": "09:00", "close": "12:00"}, "tue": {"open": "09:00", "close": "12:00"}, "wed": {"open": "09:00", "close": "12:00"}, "thu": {"open": "09:00", "close": "12:00"}}',
    false, true, ARRAY['English'],
    'Walk-in pantry, fresh groceries, baby formula, and diapers. You pick your own items.'
);

-- 5. Benedict''s Pantry (St. Benedict Church) — Mill Hill / Southwest Baltimore (Real MFB Partner)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000005',
    'Benedict''s Pantry (St. Benedict)',
    '2612 Wilkens Ave, Baltimore, MD 21223',
    'Mill Hill',
    ST_SetSRID(ST_MakePoint(-76.6575, 39.2818), 4326)::geography,
    '(410) 947-4988',
    'client_choice',
    '{"wed": {"open": "17:00", "close": "19:00"}, "sat": {"open": "09:30", "close": "11:30"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Southwest Baltimore community pantry and soup kitchen. Evening hours on Wednesdays.'
);

-- 6. Franciscan Center of Baltimore — Charles North (Real MFB Partner)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000006',
    'Franciscan Center of Baltimore',
    '101 W 23rd St, Baltimore, MD 21218',
    'Charles North',
    ST_SetSRID(ST_MakePoint(-76.6186, 39.3160), 4326)::geography,
    '(410) 467-5340',
    'client_choice',
    '{"mon": {"open": "10:00", "close": "13:00"}, "tue": {"open": "10:00", "close": "13:00"}, "wed": {"open": "10:00", "close": "13:00"}, "thu": {"open": "10:00", "close": "13:00"}, "fri": {"open": "10:00", "close": "13:00"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Comprehensive food pantry, fresh pantry pantry items, and daily hot lunch. Walk-ins welcome.'
);

-- 7. Paul''s Place — Washington Village / Pigtown (Real MFB Partner)
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
    'Client-choice marketplace, warm meals, shower and laundry services available.'
);

-- 8. The Door Inc. Food Pantry — Patterson Park (Real MFB Partner)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000008',
    'The Door Inc. Food Pantry',
    '219 N Chester St, Baltimore, MD 21231',
    'Patterson Park',
    ST_SetSRID(ST_MakePoint(-76.5840, 39.2940), 4326)::geography,
    '(410) 563-3033',
    'pre_packed',
    '{"tue": {"open": "11:00", "close": "13:00"}, "thu": {"open": "11:00", "close": "13:00"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Food baskets with fresh produce, canned food, bread, and meat. While supplies last.'
);

-- 9. South Baltimore Emergency Relief — Federal Hill (Real MFB Partner)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000009',
    'South Baltimore Emergency Relief',
    '1231 Light St, Baltimore, MD 21230',
    'Federal Hill',
    ST_SetSRID(ST_MakePoint(-76.6125, 39.2748), 4326)::geography,
    '(410) 727-4663',
    'pre_packed',
    '{"tue": {"open": "09:30", "close": "12:30"}, "thu": {"open": "09:30", "close": "12:30"}}',
    false, true, ARRAY['English'],
    'Serving South Baltimore families with shelf-stable groceries, meat, and emergency supplies.'
);

-- 10. Hampden Family Center — Hampden (Real MFB Partner)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'a1000000-0000-0000-0000-000000000010',
    'Hampden Family Center',
    '1104 W 36th St, Baltimore, MD 21211',
    'Hampden',
    ST_SetSRID(ST_MakePoint(-76.6364, 39.3312), 4326)::geography,
    '(410) 467-8710',
    'client_choice',
    '{"mon": {"open": "09:00", "close": "16:00"}, "tue": {"open": "09:00", "close": "16:00"}, "wed": {"open": "09:00", "close": "16:00"}, "thu": {"open": "09:00", "close": "16:00"}, "fri": {"open": "09:00", "close": "15:00"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Community center offering emergency food assistance, fresh produce, and family support resources in partnership with the Maryland Food Bank. Walk-ins welcome.'
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
-- We'll create va-- Pantry 1: Beans & Bread Center (St. Vincent de Paul) (well stocked except hygiene)
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000001', 1, 'plenty',    35, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000001', 2, 'low',        12, 'volunteer_correction', 0.90),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000001', 3, 'plenty',     28, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000001', 4, 'plenty',     40, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000001', 5, 'low',         8, 'volunteer_correction', 0.90),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000001', 6, 'out',         2, 'volunteer_correction', 0.85),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000001', 7, 'plenty',     45, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000001', 8, 'low',        10, 'volunteer_correction', 0.85);

-- Pantry 2: GEDCO CARES Food Pantry (moderate stock)
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000002', 1, 'low',      15, 'volunteer_correction', 0.80),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000002', 2, 'plenty',   30, 'volunteer_correction', 0.80),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000002', 3, 'low',      10, 'volunteer_correction', 0.80),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000002', 4, 'plenty',   35, 'volunteer_correction', 0.80),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000002', 5, 'out',       0, 'volunteer_correction', 0.80),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000002', 6, 'low',       8, 'volunteer_correction', 0.80),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000002', 7, 'plenty',   40, 'volunteer_correction', 0.80),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000002', 8, 'out',       0, 'volunteer_correction', 0.75);

-- Pantry 3: 40 West Assistance Center (well stocked, recent update)
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '15 minutes', 'a1000000-0000-0000-0000-000000000003', 1, 'plenty', 50, 'intake_photo', 0.98),
    (now() - interval '15 minutes', 'a1000000-0000-0000-0000-000000000003', 2, 'plenty', 40, 'intake_photo', 0.98),
    (now() - interval '15 minutes', 'a1000000-0000-0000-0000-000000000003', 3, 'plenty', 35, 'intake_photo', 0.98),
    (now() - interval '15 minutes', 'a1000000-0000-0000-0000-000000000003', 4, 'plenty', 60, 'intake_photo', 0.98),
    (now() - interval '15 minutes', 'a1000000-0000-0000-0000-000000000003', 5, 'plenty', 25, 'intake_photo', 0.98),
    (now() - interval '15 minutes', 'a1000000-0000-0000-0000-000000000003', 6, 'plenty', 20, 'intake_photo', 0.98),
    (now() - interval '15 minutes', 'a1000000-0000-0000-0000-000000000003', 7, 'plenty', 55, 'intake_photo', 0.98),
    (now() - interval '15 minutes', 'a1000000-0000-0000-0000-000000000003', 8, 'plenty', 30, 'intake_photo', 0.98);

-- Pantry 4: Bea Gaddy Family Centers (running low on several items)
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '90 minutes', 'a1000000-0000-0000-0000-000000000004', 1, 'low',     8, 'prediction', 0.70),
    (now() - interval '90 minutes', 'a1000000-0000-0000-0000-000000000004', 2, 'out',     3, 'prediction', 0.65),
    (now() - interval '90 minutes', 'a1000000-0000-0000-0000-000000000004', 3, 'low',    10, 'prediction', 0.70),
    (now() - interval '90 minutes', 'a1000000-0000-0000-0000-000000000004', 4, 'plenty', 25, 'prediction', 0.75),
    (now() - interval '90 minutes', 'a1000000-0000-0000-0000-000000000004', 5, 'low',     6, 'prediction', 0.65),
    (now() - interval '90 minutes', 'a1000000-0000-0000-0000-000000000004', 6, 'out',     1, 'prediction', 0.60),
    (now() - interval '90 minutes', 'a1000000-0000-0000-0000-000000000004', 7, 'low',    12, 'prediction', 0.70),
    (now() - interval '90 minutes', 'a1000000-0000-0000-0000-000000000004', 8, 'out',     0, 'prediction', 0.55);

-- Pantry 5: Benedict's Pantry (St. Benedict)
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000005', 1, 'plenty', 40, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000005', 2, 'low',    14, 'volunteer_correction', 0.90),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000005', 3, 'plenty', 30, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000005', 4, 'plenty', 35, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000005', 5, 'plenty', 22, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000005', 6, 'out',     2, 'volunteer_correction', 0.85),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000005', 7, 'plenty', 38, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000005', 8, 'low',     9, 'volunteer_correction', 0.85);

-- Pantry 6: Franciscan Center of Baltimore (Charles North / 21218)
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '3 hours', 'a1000000-0000-0000-0000-000000000006', 1, 'plenty', 60, 'volunteer_correction', 0.85),
    (now() - interval '3 hours', 'a1000000-0000-0000-0000-000000000006', 2, 'plenty', 45, 'volunteer_correction', 0.85),
    (now() - interval '3 hours', 'a1000000-0000-0000-0000-000000000006', 3, 'plenty', 35, 'volunteer_correction', 0.85),
    (now() - interval '3 hours', 'a1000000-0000-0000-0000-000000000006', 4, 'plenty', 50, 'volunteer_correction', 0.85),
    (now() - interval '3 hours', 'a1000000-0000-0000-0000-000000000006', 5, 'low',    12, 'volunteer_correction', 0.80),
    (now() - interval '3 hours', 'a1000000-0000-0000-0000-000000000006', 6, 'plenty', 20, 'volunteer_correction', 0.85),
    (now() - interval '3 hours', 'a1000000-0000-0000-0000-000000000006', 7, 'plenty', 65, 'volunteer_correction', 0.85),
    (now() - interval '3 hours', 'a1000000-0000-0000-0000-000000000006', 8, 'out',     0, 'volunteer_correction', 0.75);

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

-- Pantry 8: The Door Inc. Food Pantry (Patterson Park)
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '55 minutes', 'a1000000-0000-0000-0000-000000000008', 1, 'low',    15, 'prediction', 0.75),
    (now() - interval '55 minutes', 'a1000000-0000-0000-0000-000000000008', 2, 'low',    10, 'prediction', 0.70),
    (now() - interval '55 minutes', 'a1000000-0000-0000-0000-000000000008', 3, 'plenty', 22, 'prediction', 0.80),
    (now() - interval '55 minutes', 'a1000000-0000-0000-0000-000000000008', 4, 'plenty', 30, 'prediction', 0.80),
    (now() - interval '55 minutes', 'a1000000-0000-0000-0000-000000000008', 5, 'plenty', 18, 'prediction', 0.80),
    (now() - interval '55 minutes', 'a1000000-0000-0000-0000-000000000008', 6, 'low',     6, 'prediction', 0.70),
    (now() - interval '55 minutes', 'a1000000-0000-0000-0000-000000000008', 7, 'plenty', 35, 'prediction', 0.80),
    (now() - interval '55 minutes', 'a1000000-0000-0000-0000-000000000008', 8, 'low',     8, 'prediction', 0.70);

-- Pantry 9: South Baltimore Emergency Relief (Federal Hill)
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000009', 1, 'plenty', 35, 'volunteer_correction', 0.85),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000009', 2, 'low',    12, 'volunteer_correction', 0.80),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000009', 3, 'low',     8, 'volunteer_correction', 0.80),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000009', 4, 'plenty', 40, 'volunteer_correction', 0.85),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000009', 5, 'out',     0, 'volunteer_correction', 0.80),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000009', 6, 'low',     5, 'volunteer_correction', 0.80),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000009', 7, 'plenty', 45, 'volunteer_correction', 0.85),
    (now() - interval '2 hours', 'a1000000-0000-0000-0000-000000000009', 8, 'out',     0, 'volunteer_correction', 0.75);

-- Pantry 10: Hampden Family Center (Hampden community center)
INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence) VALUES
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000010', 1, 'plenty', 40, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000010', 2, 'low',    14, 'volunteer_correction', 0.90),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000010', 3, 'plenty', 30, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000010', 4, 'plenty', 35, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000010', 5, 'plenty', 22, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000010', 6, 'out',     2, 'volunteer_correction', 0.85),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000010', 7, 'plenty', 38, 'volunteer_correction', 0.95),
    (now() - interval '46 minutes', 'a1000000-0000-0000-0000-000000000010', 8, 'low',     9, 'volunteer_correction', 0.85);

-- ============================================================
-- Seed check-in history for Hampden Family Center (pantry 10)
-- to demo the predict-and-correct engine
-- ============================================================
INSERT INTO check_ins (time, pantry_id, household_size) VALUES
    (now() - interval '4 hours',   'a1000000-0000-0000-0000-000000000010', 3),
    (now() - interval '3.5 hours', 'a1000000-0000-0000-0000-000000000010', 2),
    (now() - interval '3 hours',   'a1000000-0000-0000-0000-000000000010', 5),
    (now() - interval '2.5 hours', 'a1000000-0000-0000-0000-000000000010', 1),
    (now() - interval '2 hours',   'a1000000-0000-0000-0000-000000000010', 4),
    (now() - interval '1.5 hours', 'a1000000-0000-0000-0000-000000000010', 3),
    (now() - interval '1 hour',    'a1000000-0000-0000-0000-000000000010', 2),
    (now() - interval '50 min',    'a1000000-0000-0000-0000-000000000010', 6),
    (now() - interval '45 min',    'a1000000-0000-0000-0000-000000000010', 2),
    (now() - interval '40 min',    'a1000000-0000-0000-0000-000000000010', 3),
    (now() - interval '35 min',    'a1000000-0000-0000-0000-000000000010', 4),
    (now() - interval '30 min',    'a1000000-0000-0000-0000-000000000010', 1),
    (now() - interval '25 min',    'a1000000-0000-0000-0000-000000000010', 2),
    (now() - interval '20 min',    'a1000000-0000-0000-0000-000000000010', 3),
    (now() - interval '15 min',    'a1000000-0000-0000-0000-000000000010', 5),
    (now() - interval '10 min',    'a1000000-0000-0000-0000-000000000010', 2),
    (now() - interval '8 min',     'a1000000-0000-0000-0000-000000000010', 4),
    (now() - interval '6 min',     'a1000000-0000-0000-0000-000000000010', 3),
    (now() - interval '4 min',     'a1000000-0000-0000-0000-000000000010', 1),
    (now() - interval '2 min',     'a1000000-0000-0000-0000-000000000010', 2),
    (now() - interval '1 min',     'a1000000-0000-0000-0000-000000000010', 3),
    (now() - interval '30 sec',    'a1000000-0000-0000-0000-000000000010', 2),
    (now() - interval '15 sec',    'a1000000-0000-0000-0000-000000000010', 4);
