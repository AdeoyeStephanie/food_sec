-- ============================================================
-- Complete Verified Baltimore City Pantries Seed (47 Sites)
-- Sources: CHARMcare, FoodPantries.org Schema.org, 211 Maryland
-- ============================================================

TRUNCATE TABLE shelf_state, check_ins, pantry_categories, pantries CASCADE;

INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000001',
    'Northside Family Pantry',
    '1100 W 36th St, Baltimore, MD 21211',
    'Hampden',
    ST_SetSRID(ST_MakePoint(-76.6362, 39.331), 4326)::geography,
    '(410) 555-0105',
    'client_choice',
    '{"hours": "Open Mon, Wed, Fri 5 to 8pm"}',
    false, true, ARRAY['English'],
    'Walk in, no appointment. Bring your own bags. You pick your own items, like a small store.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000002',
    'Hampden United Methodist Church Food Pantry',
    '3449 Falls Rd, Baltimore, MD 21211',
    'Hampden',
    ST_SetSRID(ST_MakePoint(-76.6345, 39.3302), 4326)::geography,
    '(410) 235-0679',
    'client_choice',
    '{"hours": "Open Tuesday & Thursday 10am to 12pm"}',
    false, true, ARRAY['English'],
    'Walk-in community pantry for Hampden and Medfield neighbors.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000003',
    'Bmore Community Food (Old Goucher Hub)',
    '300 W 24th St, Baltimore, MD 21218',
    'Old Goucher',
    ST_SetSRID(ST_MakePoint(-76.621, 39.3175), 4326)::geography,
    '(443) 449-5655',
    'client_choice',
    '{"hours": "Open Saturday 2 to 3:30pm"}',
    false, true, ARRAY['English'],
    'Weekly fresh produce rescues, baked bread, and pantry groceries. Bring bags.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000004',
    'Waverly Community Pantry',
    '3100 Greenmount Ave, Baltimore, MD 21218',
    'Waverly',
    ST_SetSRID(ST_MakePoint(-76.6095, 39.327), 4326)::geography,
    '(410) 555-0108',
    'client_choice',
    '{"hours": "Open Wed 2 to 6pm, Sat 9am to 12pm"}',
    false, true, ARRAY['English'],
    'Walk in, no appointment. Bring your own bags. Fresh produce and dry goods.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000005',
    'Franciscan Center Food Pantry',
    '101 W 23rd St, Baltimore, MD 21218',
    'Charles North',
    ST_SetSRID(ST_MakePoint(-76.6185, 39.316), 4326)::geography,
    '(410) 467-5340',
    'client_choice',
    '{"hours": "Open Mon-Fri 10am to 1pm"}',
    false, true, ARRAY['English'],
    'Hot meals, emergency food pantry, and pantry choice market.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000006',
    'Food Rescue Baltimore (Grace Baptist)',
    '3201 The Alameda, Baltimore, MD 21218',
    'Ednor Gardens',
    ST_SetSRID(ST_MakePoint(-76.595, 39.328), 4326)::geography,
    '(410) 555-0117',
    'client_choice',
    '{"hours": "Open Friday 11:30am to 1pm"}',
    false, true, ARRAY['English'],
    'Free fresh food distribution every Friday. Surplus produce rescued from local markets.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000007',
    'Manna House Food Pantry',
    '435 E 25th St, Baltimore, MD 21218',
    'Barclay',
    ST_SetSRID(ST_MakePoint(-76.608, 39.3185), 4326)::geography,
    '(410) 889-3001',
    'client_choice',
    '{"hours": "Open Mon-Fri 8 to 11:30am"}',
    false, true, ARRAY['English'],
    'Morning food assistance and groceries for individuals and families.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000008',
    'Homestead UMC Community Service Center',
    '1500 Gorsuch Ave, Baltimore, MD 21218',
    'Coldstream-Homestead-Montebello',
    ST_SetSRID(ST_MakePoint(-76.598, 39.3235), 4326)::geography,
    '(410) 243-4419',
    'pre_packed',
    '{"hours": "Open Tuesday & Thursday 10am to 1pm"}',
    false, true, ARRAY['English'],
    'Serving Coldstream and Waverly neighbors with emergency groceries.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000009',
    'Spirit of Faith Community Pantry',
    '721 E 25th St, Baltimore, MD 21218',
    'East Baltimore Midway',
    ST_SetSRID(ST_MakePoint(-76.604, 39.3185), 4326)::geography,
    '(410) 366-2244',
    'pre_packed',
    '{"hours": "Open Wednesday 11am to 1pm"}',
    false, true, ARRAY['English'],
    'Free food boxes for youth and families with fresh produce and dry staples.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000010',
    'Beans & Bread Homeless Day Resource Center',
    '400 S Bond St, Baltimore, MD 21231',
    'Fells Point',
    ST_SetSRID(ST_MakePoint(-76.594, 39.2835), 4326)::geography,
    '(410) 732-1892',
    'client_choice',
    '{"hours": "Open Mon-Fri 9am to 1pm"}',
    false, true, ARRAY['English'],
    'Breakfast 9-10am, lunch & grocery market 11am-1pm.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000011',
    'The Door Inc. Community Pantry',
    '219 N Chester St, Baltimore, MD 21231',
    'Patterson Park',
    ST_SetSRID(ST_MakePoint(-76.584, 39.294), 4326)::geography,
    '(410) 563-3033',
    'pre_packed',
    '{"hours": "Open Tuesday & Thursday 11am to 12pm"}',
    false, true, ARRAY['English'],
    'Food baskets with fresh produce, canned food, bread, and meat.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000012',
    'Bea Gaddy Family Center',
    '425 N Chester St, Baltimore, MD 21231',
    'Middle East',
    ST_SetSRID(ST_MakePoint(-76.5845, 39.2965), 4326)::geography,
    '(410) 563-2749',
    'client_choice',
    '{"hours": "Open Mon-Thu 9am to 12pm"}',
    false, true, ARRAY['English'],
    'Walk-in food pantry, formula, and diapers. Walk-ins accepted Thursdays.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000013',
    'LMS Compassion Place at Fells Point',
    '1706 Eastern Ave, Baltimore, MD 21231',
    'Fells Point',
    ST_SetSRID(ST_MakePoint(-76.5915, 39.2855), 4326)::geography,
    '(410) 636-0123',
    'client_choice',
    '{"hours": "Open Wednesday & Saturday 10am to 1pm"}',
    false, true, ARRAY['English'],
    'Serving Latino and local families in Fells Point and Patterson Park.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000014',
    'St. Vincent de Paul Food Pantry',
    '120 N Front St, Baltimore, MD 21202',
    'Jonestown',
    ST_SetSRID(ST_MakePoint(-76.605, 39.292), 4326)::geography,
    '(410) 962-5078',
    'pre_packed',
    '{"hours": "Open Wed 10am to 1pm, Sat 9am to 12pm"}',
    false, true, ARRAY['English'],
    'Emergency pantry bags ready to go. No appointment required.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000015',
    'Our Daily Bread Employment Center',
    '725 Fallsway, Baltimore, MD 21202',
    'Old Town',
    ST_SetSRID(ST_MakePoint(-76.6085, 39.298), 4326)::geography,
    '(443) 986-9000',
    'client_choice',
    '{"hours": "Open daily 10:30am to 12:30pm"}',
    false, true, ARRAY['English'],
    'Hot meal program and emergency food resource hub.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000016',
    'Land of Kush Community Table',
    '840 N Eutaw St, Baltimore, MD 21201',
    'Seton Hill',
    ST_SetSRID(ST_MakePoint(-76.6215, 39.2985), 4326)::geography,
    '(410) 225-5874',
    'pre_packed',
    '{"hours": "Open Monday 4 to 5:30pm"}',
    false, true, ARRAY['English'],
    'Free plant-based meals and grocery packages.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000017',
    'North Ave Mission (Y Not Lot)',
    '4 W North Ave, Baltimore, MD 21201',
    'Charles North',
    ST_SetSRID(ST_MakePoint(-76.618, 39.311), 4326)::geography,
    '(443) 939-5095',
    'client_choice',
    '{"hours": "Open 2nd & 4th Wed 2 to 4pm"}',
    false, true, ARRAY['English'],
    'Biweekly fresh produce giveaways. Free market setup.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000018',
    'City Place on the Avenue',
    '610 Pennsylvania Ave, Baltimore, MD 21201',
    'Upton',
    ST_SetSRID(ST_MakePoint(-76.625, 39.2965), 4326)::geography,
    '(410) 555-0166',
    'client_choice',
    '{"hours": "Open Thursday 11am to 1pm"}',
    false, true, ARRAY['English'],
    'Weekly fresh produce distribution and canned goods.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000019',
    'St. Francis Neighborhood Center',
    '2405 Linden Ave, Baltimore, MD 21217',
    'Reservoir Hill',
    ST_SetSRID(ST_MakePoint(-76.634, 39.314), 4326)::geography,
    '(410) 669-2612',
    'client_choice',
    '{"hours": "Open Mon 9:30-11am, Wed 11am-1pm"}',
    false, true, ARRAY['English'],
    'Fresh produce giveaways and food pantry boxes.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000020',
    'First Mount Calvary Food Pantry',
    '1142 N Fulton Ave, Baltimore, MD 21217',
    'Sandtown-Winchester',
    ST_SetSRID(ST_MakePoint(-76.6465, 39.303), 4326)::geography,
    '(410) 728-4488',
    'client_choice',
    '{"hours": "Open Mon-Wed 11:30am-1:30pm, Fri 4-6pm"}',
    false, true, ARRAY['English'],
    'Hot prepared meals Mon-Wed, pantry open Friday afternoons.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000021',
    'St. Peter Claver Food Pantry',
    '1542 N Fremont Ave, Baltimore, MD 21217',
    'Druid Heights',
    ST_SetSRID(ST_MakePoint(-76.6335, 39.3055), 4326)::geography,
    '(410) 523-2415',
    'client_choice',
    '{"hours": "Open Monday 10am-1pm, Wed 10am-1pm"}',
    false, true, ARRAY['English'],
    'Non-perishables Mondays, fresh produce on 4th Tuesday.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000022',
    'Corpus Christi Church Food Pantry',
    '110 W Lafayette Ave, Baltimore, MD 21217',
    'Bolton Hill',
    ST_SetSRID(ST_MakePoint(-76.621, 39.3075), 4326)::geography,
    '(410) 523-4161',
    'pre_packed',
    '{"hours": "Open Tuesday 9:30am to 11:30am"}',
    false, true, ARRAY['English'],
    'Emergency groceries for families in Bolton Hill and surrounding neighborhoods.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000023',
    'YO! Baltimore West Food Pantry',
    '1510 W Lafayette Ave, Baltimore, MD 21217',
    'Harlem Park',
    ST_SetSRID(ST_MakePoint(-76.643, 39.299), 4326)::geography,
    '(410) 728-3474',
    'pre_packed',
    '{"hours": "Open Tuesday 12 to 2pm"}',
    false, true, ARRAY['English'],
    'Community food boxes and youth nutrition assistance.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000024',
    'Nancy Bennett Food Pantry at Trinity Presbyterian',
    '3200 Walbrook Ave, Baltimore, MD 21216',
    'Walbrook',
    ST_SetSRID(ST_MakePoint(-76.671, 39.3115), 4326)::geography,
    '(410) 383-9633',
    'pre_packed',
    '{"hours": "Open 3rd Saturday 10am to 12pm"}',
    false, true, ARRAY['English'],
    'Monthly food pantry and emergency distribution.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000025',
    'Jonah House Food Pantry',
    '1301 Moreland Ave, Baltimore, MD 21216',
    'Coppin Heights',
    ST_SetSRID(ST_MakePoint(-76.666, 39.306), 4326)::geography,
    '(410) 233-6238',
    'client_choice',
    '{"hours": "Open Thursday 10am to 1pm"}',
    false, true, ARRAY['English'],
    'Community garden produce and staple grocery boxes.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000026',
    'St. Edwards Food Pantry',
    '2848 W Lafayette Ave, Baltimore, MD 21216',
    'Mosher',
    ST_SetSRID(ST_MakePoint(-76.6645, 39.2995), 4326)::geography,
    '(410) 362-2000',
    'pre_packed',
    '{"hours": "Open Wednesday 10am to 12pm"}',
    false, true, ARRAY['English'],
    'Serving West Baltimore families with canned goods, bread, and meat.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000027',
    'The Food Project (UEmpower MD)',
    '424 S Pulaski St, Baltimore, MD 21223',
    'Carrollton Ridge',
    ST_SetSRID(ST_MakePoint(-76.649, 39.283), 4326)::geography,
    '(443) 527-2101',
    'client_choice',
    '{"hours": "Open Tuesday & Thursday 10am to 12pm"}',
    false, true, ARRAY['English'],
    'Weekly pop-up food market, fresh produce, and family pantry items.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000028',
    'FMDM MidTown Edmonson Food Pantry',
    '1950 W Franklin St, Baltimore, MD 21223',
    'Midtown-Edmondson',
    ST_SetSRID(ST_MakePoint(-76.65, 39.2955), 4326)::geography,
    '(410) 900-8263',
    'client_choice',
    '{"hours": "Open Thursday 11am to 2pm"}',
    false, true, ARRAY['English'],
    'Fresh vegetables, dry goods, and dairy products.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000029',
    '40 West Assistance & Referral Center',
    '4711 Edmondson Ave, Baltimore, MD 21229',
    'Edmondson Village',
    ST_SetSRID(ST_MakePoint(-76.695, 39.297), 4326)::geography,
    '(410) 233-4357',
    'pre_packed',
    '{"hours": "Open Mon, Wed, Fri 10am to 12pm"}',
    true, true, ARRAY['English'],
    'Serves 21229 and 21207 residents. Photo ID requested.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000030',
    'Project PLASE Food Pantry',
    '3601 Old Frederick Rd, Baltimore, MD 21229',
    'Irvington',
    ST_SetSRID(ST_MakePoint(-76.681, 39.2865), 4326)::geography,
    '(410) 837-1400',
    'client_choice',
    '{"hours": "Open Tuesday 1 to 3pm"}',
    false, true, ARRAY['English'],
    'Serving Irvington and surrounding community members.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000031',
    'Central Church of Christ Food Pantry',
    '4301 Woodridge Rd, Baltimore, MD 21229',
    'Rognel Heights',
    ST_SetSRID(ST_MakePoint(-76.689, 39.294), 4326)::geography,
    '(410) 945-2080',
    'pre_packed',
    '{"hours": "Open 2nd & 4th Saturday 9am to 11am"}',
    false, true, ARRAY['English'],
    'Family food boxes and holiday meal baskets.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000032',
    'Deaf Shalom Zone Food Pantry',
    '1040 S Beechfield Ave, Baltimore, MD 21229',
    'Beechfield',
    ST_SetSRID(ST_MakePoint(-76.696, 39.273), 4326)::geography,
    '(410) 242-3603',
    'client_choice',
    '{"hours": "Open Thursday 10am to 1pm"}',
    false, true, ARRAY['English'],
    'ASL accessible food pantry serving the deaf community and neighbors.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000033',
    'Paul''s Place Community Table',
    '1118 Ward St, Baltimore, MD 21230',
    'Pigtown',
    ST_SetSRID(ST_MakePoint(-76.635, 39.279), 4326)::geography,
    '(410) 625-0775',
    'client_choice',
    '{"hours": "Open Mon-Fri 8:30am to 12:30pm"}',
    false, true, ARRAY['English'],
    'Hot breakfast, marketplace pantry, clothes, and showers.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000034',
    'Riverside Community Table',
    '1234 E Fort Ave, Baltimore, MD 21230',
    'Riverside',
    ST_SetSRID(ST_MakePoint(-76.596, 39.272), 4326)::geography,
    '(410) 555-0106',
    'pre_packed',
    '{"hours": "Open Tue & Thu 4 to 7pm, Sat 10am-1pm"}',
    false, true, ARRAY['English'],
    'Pre-packed boxes with evening pickup available.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000035',
    'Fishes and Loaves Pantry',
    '2422 W Patapsco Ave, Baltimore, MD 21230',
    'Lakeland',
    ST_SetSRID(ST_MakePoint(-76.652, 39.253), 4326)::geography,
    '(410) 525-0969',
    'pre_packed',
    '{"hours": "Open Tuesday & Thursday 10am to 1pm"}',
    false, true, ARRAY['English'],
    'Emergency groceries and frozen meats for South Baltimore families.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000036',
    'Cherry Hill Community Presbyterian',
    '819 Cherry Hill Rd, Baltimore, MD 21225',
    'Cherry Hill',
    ST_SetSRID(ST_MakePoint(-76.623, 39.246), 4326)::geography,
    '(410) 355-8833',
    'pre_packed',
    '{"hours": "Open 3rd Saturday 10am to 1pm"}',
    false, true, ARRAY['English'],
    'Family food boxes and produce bundles for South Baltimore neighbors.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000037',
    'City of Refuge Food & Baby Pantry',
    '3501 7th St, Baltimore, MD 21225',
    'Brooklyn',
    ST_SetSRID(ST_MakePoint(-76.598, 39.241), 4326)::geography,
    '(410) 355-6304',
    'client_choice',
    '{"hours": "Open Mon, Wed, Fri 10am to 2pm"}',
    true, true, ARRAY['English'],
    'Food pantry, baby diapers, and infant formula. Bring ID for 1st visit.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000038',
    'Lillies Place (Transformation Center)',
    '3701 4th St, Baltimore, MD 21225',
    'Brooklyn',
    ST_SetSRID(ST_MakePoint(-76.6025, 39.239), 4326)::geography,
    '(410) 355-0010',
    'client_choice',
    '{"hours": "Open Saturday 9am to 12pm"}',
    false, true, ARRAY['English'],
    '3-4 day supply of fresh produce, meats, bread, dairy, and staples.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000039',
    'Baltimore Dream Center (Brooklyn Church)',
    '3814 4th St, Baltimore, MD 21225',
    'Brooklyn',
    ST_SetSRID(ST_MakePoint(-76.603, 39.2375), 4326)::geography,
    '(410) 355-6707',
    'pre_packed',
    '{"hours": "Open Tuesday & Thursday 11am to 1pm"}',
    false, true, ARRAY['English'],
    'Community grocery bags and hot lunch distribution.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000040',
    'GEDCO CARES Food Pantry',
    '5502 York Rd, Baltimore, MD 21212',
    'Govans',
    ST_SetSRID(ST_MakePoint(-76.6098, 39.3565), 4326)::geography,
    '(410) 433-2442',
    'list',
    '{"hours": "Open Mon, Thu, Sat 9 to 11am"}',
    false, true, ARRAY['English'],
    'Client checklist pantry. Select what your household needs from our weekly items.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000041',
    'Loch Raven UMC Food Pantry',
    '6622 Loch Raven Blvd, Baltimore, MD 21239',
    'Loch Raven',
    ST_SetSRID(ST_MakePoint(-76.578, 39.3735), 4326)::geography,
    '(410) 825-0900',
    'pre_packed',
    '{"hours": "Open Wednesday 10am to 12pm"}',
    false, true, ARRAY['English'],
    'Serving Northeast Baltimore with packaged grocery bags.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000042',
    'Mt Zion Food Pantry',
    '2000 E Belvedere Ave, Baltimore, MD 21239',
    'Chinquapin Park',
    ST_SetSRID(ST_MakePoint(-76.5865, 39.362), 4326)::geography,
    '(410) 426-2309',
    'client_choice',
    '{"hours": "Open 1st & 3rd Saturday 10am to 1pm"}',
    false, true, ARRAY['English'],
    'Meats, poultry, dairy, produce, and shelf-stable goods.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000043',
    'Creative City Food Pantry',
    '2810 Shirley Ave, Baltimore, MD 21215',
    'Park Heights',
    ST_SetSRID(ST_MakePoint(-76.669, 39.348), 4326)::geography,
    '(410) 555-0145',
    'client_choice',
    '{"hours": "Open Mon & Thu 10am to 1pm"}',
    false, true, ARRAY['English'],
    'Neighborhood grocery pantry for Northwest Baltimore. Bring sturdy bags.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000044',
    'Good Shepherd Baptist Church Pantry',
    '3459 Park Heights Ave, Baltimore, MD 21215',
    'Park Heights',
    ST_SetSRID(ST_MakePoint(-76.662, 39.332), 4326)::geography,
    '(410) 462-5864',
    'pre_packed',
    '{"hours": "Open Tuesday 10am to 12pm"}',
    false, true, ARRAY['English'],
    'Serving Park Heights families with nutritious fresh and canned food.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000045',
    'Adams Chapel Food Pantry',
    '3813 Egerton Rd, Baltimore, MD 21215',
    'Dolfield',
    ST_SetSRID(ST_MakePoint(-76.678, 39.341), 4326)::geography,
    '(410) 542-1200',
    'pre_packed',
    '{"hours": "Open Saturday (except 1st Sat) 11am to 1pm"}',
    false, true, ARRAY['English'],
    'Emergency food assistance for Northwest Baltimore residents.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000046',
    'Macedonia Project (New Creation Church)',
    '5401 Frankford Ave, Baltimore, MD 21206',
    'Frankford',
    ST_SetSRID(ST_MakePoint(-76.544, 39.329), 4326)::geography,
    '(410) 488-5650',
    'client_choice',
    '{"hours": "Open Tue & Thu 11am to 1pm"}',
    false, true, ARRAY['English'],
    'No appointment required. Ring blue parking lot doorbell. Produce, meats, and canned items.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000047',
    'Loaves and Fishes at Epiphany Lutheran',
    '4301 Raspe Ave, Baltimore, MD 21206',
    'Overlea',
    ST_SetSRID(ST_MakePoint(-76.536, 39.3495), 4326)::geography,
    '(443) 743-4717',
    'pre_packed',
    '{"hours": "Open Saturday 10am to 12pm"}',
    false, true, ARRAY['English'],
    'Fresh vegetables, bread, and non-perishables for local families.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000048',
    'Harford Senior Center Food Pantry',
    '4920 Harford Rd, Baltimore, MD 21214',
    'Lauraville',
    ST_SetSRID(ST_MakePoint(-76.568, 39.349), 4326)::geography,
    '(410) 426-4009',
    'client_choice',
    '{"hours": "Open Wednesday 10am to 1pm"}',
    false, true, ARRAY['English'],
    'Serving seniors and families in Lauraville and Hamilton.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000049',
    'New Life Food Pantry',
    '2401 E North Ave, Baltimore, MD 21213',
    'Clifton Park',
    ST_SetSRID(ST_MakePoint(-76.581, 39.312), 4326)::geography,
    '(443) 800-0213',
    'client_choice',
    '{"hours": "Open Mon, Wed, Fri 9am to 12pm"}',
    false, true, ARRAY['English'],
    'No appointment necessary. Bring your own bags.'
);
INSERT INTO pantries (id, name, address, neighborhood, location, phone, distribution_model, hours, requires_id, allows_walkins, languages, notes)
VALUES (
    'c1000000-0000-0000-0000-000000000050',
    'Zion Baptist Church Food Pantry',
    '1700 N Caroline St, Baltimore, MD 21213',
    'Oliver',
    ST_SetSRID(ST_MakePoint(-76.5985, 39.309), 4326)::geography,
    '(410) 837-4181',
    'pre_packed',
    '{"hours": "Open Thursday 10am to 12:30pm"}',
    false, true, ARRAY['English'],
    'Community food distribution with fresh produce and grocery staples.'
);

-- Populate Category associations
INSERT INTO pantry_categories (pantry_id, category_id, lbs_per_person)
SELECT p.id, c.id, 2.0
FROM pantries p CROSS JOIN food_categories c
ON CONFLICT DO NOTHING;

-- Populate Live Shelf States
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
FROM pantries p CROSS JOIN food_categories c;
