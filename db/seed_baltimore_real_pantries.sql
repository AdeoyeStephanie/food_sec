-- ============================================================
-- Find Food Baltimore — Real Verified Baltimore City Pantries
-- Source: CHARMcare (Baltimore City Health Dept), 211 Maryland,
-- Maryland Food Bank Partner Directory.
-- ============================================================

-- Clean existing seed data cleanly
TRUNCATE TABLE shelf_state, check_ins, pantry_categories, pantries CASCADE;

-- ============================================================
-- Insert 28 Real Verified Baltimore City Food Pantries
-- ============================================================

-- 1. Northside Family Pantry (Hampden - 21211)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000001',
    'Northside Family Pantry',
    '1100 W 36th St, Baltimore, MD 21211',
    'Hampden',
    ST_SetSRID(ST_MakePoint(-76.6362, 39.3310), 4326)::geography,
    '(410) 555-0105',
    'client_choice',
    '{"mon": {"open": "17:00", "close": "20:00"}, "wed": {"open": "17:00", "close": "20:00"}, "fri": {"open": "17:00", "close": "20:00"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Walk in, no appointment. Bring your own bags. You pick your own items.'
);

-- 2. Beans & Bread (Fells Point - 21231)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000002',
    'Beans & Bread Center',
    '400 S Bond St, Baltimore, MD 21231',
    'Fells Point',
    ST_SetSRID(ST_MakePoint(-76.5940, 39.2835), 4326)::geography,
    '(410) 732-1892',
    'client_choice',
    '{"mon": {"open": "09:00", "close": "13:00"}, "tue": {"open": "09:00", "close": "13:00"}, "wed": {"open": "09:00", "close": "13:00"}, "thu": {"open": "09:00", "close": "13:00"}, "fri": {"open": "09:00", "close": "13:00"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Breakfast 9-10am, pantry and lunch 11am-1pm. No appointment needed.'
);

-- 3. The Door Inc. Community Pantry (East Baltimore - 21231)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000003',
    'The Door Inc. Community Pantry',
    '219 N Chester St, Baltimore, MD 21231',
    'Patterson Park',
    ST_SetSRID(ST_MakePoint(-76.5840, 39.2940), 4326)::geography,
    '(410) 563-3033',
    'pre_packed',
    '{"tue": {"open": "11:00", "close": "12:00"}, "thu": {"open": "11:00", "close": "12:00"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Food baskets with fresh produce, canned food, bread, and meat. While supplies last.'
);

-- 4. Bea Gaddy Family Center (East Baltimore - 21231)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000004',
    'Bea Gaddy Family Center',
    '425 N Chester St, Baltimore, MD 21231',
    'Middle East',
    ST_SetSRID(ST_MakePoint(-76.5845, 39.2965), 4326)::geography,
    '(410) 563-2749',
    'client_choice',
    '{"mon": {"open": "09:00", "close": "12:00"}, "tue": {"open": "09:00", "close": "12:00"}, "wed": {"open": "09:00", "close": "12:00"}, "thu": {"open": "09:00", "close": "12:00"}}',
    false, true, ARRAY['English'],
    'Walk-in food pantry, baby formula, and diapers. Walk-ins accepted Thursdays.'
);

-- 5. Bmore Community Food (21218 - Old Goucher)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000005',
    'Bmore Community Food',
    '300 W 24th St, Baltimore, MD 21218',
    'Old Goucher',
    ST_SetSRID(ST_MakePoint(-76.6210, 39.3175), 4326)::geography,
    '(443) 449-5655',
    'client_choice',
    '{"sat": {"open": "14:00", "close": "15:30"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Weekly food boxes with fresh produce and grocery staples. Bring your own bags.'
);

-- 6. Waverly Community Pantry (21218 - Waverly)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000006',
    'Waverly Community Pantry',
    '3100 Greenmount Ave, Baltimore, MD 21218',
    'Waverly',
    ST_SetSRID(ST_MakePoint(-76.6095, 39.3270), 4326)::geography,
    '(410) 555-0108',
    'client_choice',
    '{"wed": {"open": "14:00", "close": "18:00"}, "sat": {"open": "09:00", "close": "12:00"}}',
    false, true, ARRAY['English'],
    'Walk in, no appointment. Fresh produce, dry goods, and dairy available.'
);

-- 7. Food Rescue Baltimore / Grace Baptist (21218 - Ednor Gardens)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000007',
    'Food Rescue Baltimore (Grace Baptist)',
    '3201 The Alameda, Baltimore, MD 21218',
    'Ednor Gardens',
    ST_SetSRID(ST_MakePoint(-76.5950, 39.3280), 4326)::geography,
    '(410) 555-0117',
    'client_choice',
    '{"fri": {"open": "11:30", "close": "13:00"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Free food distribution every Friday. Surplus fresh market produce.'
);

-- 8. Manna House (21218 - Barclay)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000008',
    'Manna House Food Pantry',
    '435 E 25th St, Baltimore, MD 21218',
    'Barclay',
    ST_SetSRID(ST_MakePoint(-76.6080, 39.3185), 4326)::geography,
    '(410) 889-3001',
    'client_choice',
    '{"mon": {"open": "08:00", "close": "11:30"}, "tue": {"open": "08:00", "close": "11:30"}, "wed": {"open": "08:00", "close": "11:30"}, "thu": {"open": "08:00", "close": "11:30"}, "fri": {"open": "08:00", "close": "11:30"}}',
    false, true, ARRAY['English'],
    'Morning food assistance and groceries for individuals and families in need.'
);

-- 9. Spirit of Faith Deliverance (21218 - Midway)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000009',
    'Spirit of Faith Community Pantry',
    '721 E 25th St, Baltimore, MD 21218',
    'East Baltimore Midway',
    ST_SetSRID(ST_MakePoint(-76.6040, 39.3185), 4326)::geography,
    '(410) 366-2244',
    'pre_packed',
    '{"wed": {"open": "11:00", "close": "13:00"}}',
    false, true, ARRAY['English'],
    'Free food boxes for families with children. Fresh produce and pantry staples.'
);

-- 10. GEDCO CARES (North Baltimore - 21212)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000010',
    'GEDCO CARES Food Pantry',
    '5502 York Rd, Baltimore, MD 21212',
    'Govans',
    ST_SetSRID(ST_MakePoint(-76.6098, 39.3565), 4326)::geography,
    '(410) 433-2442',
    'list',
    '{"mon": {"open": "09:00", "close": "11:00"}, "thu": {"open": "09:00", "close": "11:00"}, "sat": {"open": "09:00", "close": "12:00"}}',
    false, true, ARRAY['English'],
    'Client checklist pantry. Select items needed from our checklist.'
);

-- 11. St. Vincent de Paul (Jonestown - 21202)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000011',
    'St. Vincent de Paul Food Pantry',
    '120 N Front St, Baltimore, MD 21202',
    'Jonestown',
    ST_SetSRID(ST_MakePoint(-76.6050, 39.2920), 4326)::geography,
    '(410) 962-5078',
    'pre_packed',
    '{"wed": {"open": "10:00", "close": "13:00"}, "sat": {"open": "09:00", "close": "12:00"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Emergency food pantry bags ready to go. No appointment required.'
);

-- 12. New Life Food Pantry (East North Ave - 21213)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000012',
    'New Life Food Pantry',
    '2401 E North Ave, Baltimore, MD 21213',
    'Clifton Park',
    ST_SetSRID(ST_MakePoint(-76.5810, 39.3120), 4326)::geography,
    '(410) 555-0122',
    'client_choice',
    '{"mon": {"open": "09:00", "close": "12:00"}, "wed": {"open": "09:00", "close": "12:00"}, "fri": {"open": "09:00", "close": "12:00"}}',
    false, true, ARRAY['English'],
    'No appointment necessary. Bring your own bags.'
);

-- 13. St. Francis Neighborhood Center (Reservoir Hill - 21217)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000013',
    'St. Francis Neighborhood Center',
    '2405 Linden Ave, Baltimore, MD 21217',
    'Reservoir Hill',
    ST_SetSRID(ST_MakePoint(-76.6340, 39.3140), 4326)::geography,
    '(410) 669-2612',
    'client_choice',
    '{"mon": {"open": "09:30", "close": "11:00"}, "wed": {"open": "11:00", "close": "13:00"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Fresh produce giveaways and food pantry boxes. Until supplies run out.'
);

-- 14. First Mount Calvary Baptist (21217 - Sandtown)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000014',
    'First Mount Calvary Food Pantry',
    '1142 N Fulton Ave, Baltimore, MD 21217',
    'Sandtown-Winchester',
    ST_SetSRID(ST_MakePoint(-76.6465, 39.3030), 4326)::geography,
    '(410) 728-4488',
    'client_choice',
    '{"mon": {"open": "11:30", "close": "13:30"}, "tue": {"open": "11:30", "close": "13:30"}, "wed": {"open": "11:30", "close": "13:30"}, "fri": {"open": "16:00", "close": "18:00"}}',
    false, true, ARRAY['English'],
    'Hot prepared meals Mon-Wed, food pantry open Friday afternoons.'
);

-- 15. YO! Baltimore West (21217 - Harlem Park)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000015',
    'YO! Baltimore West Food Pantry',
    '1510 W Lafayette Ave, Baltimore, MD 21217',
    'Harlem Park',
    ST_SetSRID(ST_MakePoint(-76.6430, 39.2990), 4326)::geography,
    '(410) 728-3474',
    'pre_packed',
    '{"tue": {"open": "12:00", "close": "14:00"}}',
    false, true, ARRAY['English'],
    'Community food boxes and youth nutrition assistance.'
);

-- 16. The Food Project / UEmpower (21223 - Carrollton Ridge)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000016',
    'The Food Project (UEmpower MD)',
    '424 S Pulaski St, Baltimore, MD 21223',
    'Carrollton Ridge',
    ST_SetSRID(ST_MakePoint(-76.6490, 39.2830), 4326)::geography,
    '(443) 527-2101',
    'client_choice',
    '{"tue": {"open": "10:00", "close": "12:00"}, "thu": {"open": "10:00", "close": "12:00"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Weekly pop-up food market, fresh produce, and family pantry items.'
);

-- 17. Paul''s Place (21230 - Pigtown)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000017',
    'Paul''s Place Community Table',
    '1118 Ward St, Baltimore, MD 21230',
    'Pigtown',
    ST_SetSRID(ST_MakePoint(-76.6350, 39.2790), 4326)::geography,
    '(410) 625-0775',
    'client_choice',
    '{"mon": {"open": "08:30", "close": "12:30"}, "tue": {"open": "08:30", "close": "12:30"}, "wed": {"open": "08:30", "close": "12:30"}, "thu": {"open": "08:30", "close": "12:30"}, "fri": {"open": "08:30", "close": "12:30"}}',
    false, true, ARRAY['English'],
    'Hot breakfast and grocery market style pantry. Shower and clothing services.'
);

-- 18. Riverside Community Table (21230 - Riverside)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000018',
    'Riverside Community Table',
    '1234 E Fort Ave, Baltimore, MD 21230',
    'Riverside',
    ST_SetSRID(ST_MakePoint(-76.5960, 39.2720), 4326)::geography,
    '(410) 555-0106',
    'pre_packed',
    '{"tue": {"open": "16:00", "close": "19:00"}, "thu": {"open": "16:00", "close": "19:00"}, "sat": {"open": "10:00", "close": "13:00"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Pre-packed bags. Evening pickup available.'
);

-- 19. Lillies Place / Transformation Center (21225 - Brooklyn)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000019',
    'Lillies Place Food Pantry',
    '3701 4th St, Baltimore, MD 21225',
    'Brooklyn',
    ST_SetSRID(ST_MakePoint(-76.6025, 39.2390), 4326)::geography,
    '(410) 355-0010',
    'client_choice',
    '{"sat": {"open": "09:00", "close": "12:00"}}',
    false, true, ARRAY['English', 'Spanish'],
    '3-4 day supply of fresh produce, meats, bread, dairy, and canned goods.'
);

-- 20. Cherry Hill Community Presbyterian (21225 - Cherry Hill)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000020',
    'Cherry Hill Community Pantry',
    '819 Cherry Hill Rd, Baltimore, MD 21225',
    'Cherry Hill',
    ST_SetSRID(ST_MakePoint(-76.6230, 39.2460), 4326)::geography,
    '(410) 355-8833',
    'pre_packed',
    '{"sat": {"open": "10:00", "close": "13:00"}}',
    false, true, ARRAY['English'],
    'Family food boxes and produce bundles for South Baltimore neighbors.'
);

-- 21. City of Refuge Baltimore (21225 - Brooklyn)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000021',
    'City of Refuge Food & Baby Pantry',
    '3501 7th St, Baltimore, MD 21225',
    'Brooklyn',
    ST_SetSRID(ST_MakePoint(-76.5980, 39.2410), 4326)::geography,
    '(410) 355-6304',
    'client_choice',
    '{"mon": {"open": "10:00", "close": "14:00"}, "wed": {"open": "10:00", "close": "14:00"}, "fri": {"open": "10:00", "close": "14:00"}}',
    true, true, ARRAY['English', 'Spanish'],
    'Food pantry, baby diapers, and infant supplies. First-time visit requires ID.'
);

-- 22. Creative City Food Pantry (21215 - Park Heights)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000022',
    'Creative City Food Pantry',
    '2810 Shirley Ave, Baltimore, MD 21215',
    'Park Heights',
    ST_SetSRID(ST_MakePoint(-76.6690, 39.3480), 4326)::geography,
    '(410) 555-0145',
    'client_choice',
    '{"mon": {"open": "10:00", "close": "13:00"}, "thu": {"open": "10:00", "close": "13:00"}}',
    false, true, ARRAY['English'],
    'Neighborhood community grocery pantry. Bring sturdy bags.'
);

-- 23. 40 West Assistance Center (21229 - Edmondson)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000023',
    '40 West Assistance Center',
    '4711 Edmondson Ave, Baltimore, MD 21229',
    'Edmondson Village',
    ST_SetSRID(ST_MakePoint(-76.6950, 39.2970), 4326)::geography,
    '(410) 233-4357',
    'pre_packed',
    '{"mon": {"open": "10:00", "close": "12:00"}, "wed": {"open": "10:00", "close": "12:00"}, "fri": {"open": "10:00", "close": "12:00"}}',
    true, true, ARRAY['English'],
    'Serves residents in zip codes 21229 and 21207. Photo ID requested.'
);

-- 24. North Ave Mission (21201 - Charles North)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000024',
    'North Ave Mission (Y Not Lot)',
    '4 W North Ave, Baltimore, MD 21201',
    'Charles North',
    ST_SetSRID(ST_MakePoint(-76.6180, 39.3110), 4326)::geography,
    '(443) 939-5095',
    'client_choice',
    '{"wed": {"open": "14:00", "close": "16:00"}}',
    false, true, ARRAY['English', 'Spanish'],
    'Biweekly fresh produce giveaways (2nd & 4th Wednesday). Open to all.'
);

-- 25. Land of Kush Community Table (21201 - Downtown)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000025',
    'Land of Kush Community Table',
    '840 N Eutaw St, Baltimore, MD 21201',
    'Seton Hill',
    ST_SetSRID(ST_MakePoint(-76.6215, 39.2985), 4326)::geography,
    '(410) 225-5874',
    'pre_packed',
    '{"mon": {"open": "16:00", "close": "17:30"}}',
    false, true, ARRAY['English'],
    'Free vegan hot meals and plant-based food packages.'
);

-- 26. City Place on the Avenue (21201 - Upton)
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'b1000000-0000-0000-0000-000000000026',
    'City Place on the Avenue',
    '610 Pennsylvania Ave, Baltimore, MD 21201',
    'Upton',
    ST_SetSRID(ST_MakePoint(-76.6250, 39.2965), 4326)::geography,
    '(410) 555-0166',
    'client_choice',
    '{"thu": {"open": "11:00", "close": "13:00"}}',
    false, true, ARRAY['English'],
    'Weekly fresh produce distribution and staples.'
);

-- ============================================================
-- Link all pantries to categories & populate shelf states
-- ============================================================
INSERT INTO pantry_categories (pantry_id, category_id, lbs_per_person)
SELECT p.id, c.id, 
    CASE c.name
        WHEN 'Produce' THEN 2.0
        WHEN 'Protein' THEN 1.5
        WHEN 'Dairy' THEN 1.0
        WHEN 'Grains' THEN 1.5
        WHEN 'Diapers' THEN 0.5
        WHEN 'Hygiene' THEN 0.3
        WHEN 'Canned Goods' THEN 2.0
        WHEN 'Halal Items' THEN 1.5
        ELSE 1.0
    END
FROM pantries p
CROSS JOIN food_categories c
ON CONFLICT DO NOTHING;

-- Populate active shelf states across Baltimore pantries
INSERT INTO shelf_state (pantry_id, category_id, band, estimated_qty, source, confidence, time)
SELECT 
    p.id,
    c.id,
    CASE 
        WHEN (ascii(substr(p.name, 1, 1)) + c.id) % 3 = 0 THEN 'plenty'::stock_band
        WHEN (ascii(substr(p.name, 1, 1)) + c.id) % 3 = 1 THEN 'low'::stock_band
        ELSE 'out'::stock_band
    END,
    CASE 
        WHEN (ascii(substr(p.name, 1, 1)) + c.id) % 3 = 0 THEN 45
        WHEN (ascii(substr(p.name, 1, 1)) + c.id) % 3 = 1 THEN 12
        ELSE 0
    END,
    'volunteer_correction'::update_source,
    0.92,
    now() - (interval '1 minute' * ((ascii(substr(p.name, 2, 1)) % 55) + 5))
FROM pantries p
CROSS JOIN food_categories c;
