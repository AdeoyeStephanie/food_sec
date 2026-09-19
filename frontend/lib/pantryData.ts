export interface ShelfItem {
  category_name: string;
  category_emoji: string;
  band: 'plenty' | 'low' | 'out';
  minutes_ago: number;
  confidence: number;
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
}

export const BALTIMORE_PANTRIES: Pantry[] = [
  {
    "id": "c1000000-0000-0000-0000-000000000001",
    "name": "Northside Family Pantry",
    "address": "1100 W 36th St, Baltimore, MD 21211",
    "neighborhood": "Hampden",
    "lat": 39.331,
    "lng": -76.6362,
    "distance_miles": 0.4,
    "walk_minutes": 8,
    "hours_text": "Open Mon, Wed, Fri 5 to 8pm",
    "open_today": false,
    "open_tonight": true,
    "open_hours_display": "Open Mon, Wed, Fri 5 to 8pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "notes": "Walk in, no appointment. Bring your own bags. You pick your own items, like a small store.",
    "distribution_model": "client_choice",
    "phone": "(410) 555-0105",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 10,
        "confidence": 0.85
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "low",
        "minutes_ago": 10,
        "confidence": 0.85
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "out",
        "minutes_ago": 10,
        "confidence": 0.85
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "plenty",
        "minutes_ago": 10,
        "confidence": 0.85
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "plenty",
        "minutes_ago": 10,
        "confidence": 0.85
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "low",
        "minutes_ago": 10,
        "confidence": 0.85
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "low",
        "minutes_ago": 10,
        "confidence": 0.85
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "out",
        "minutes_ago": 10,
        "confidence": 0.85
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000002",
    "name": "Hampden United Methodist Church Food Pantry",
    "address": "3449 Falls Rd, Baltimore, MD 21211",
    "neighborhood": "Hampden",
    "lat": 39.3302,
    "lng": -76.6345,
    "distance_miles": 0.5,
    "walk_minutes": 10,
    "hours_text": "Open Tuesday & Thursday 10am to 12pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Tuesday & Thursday 10am to 12pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Walk-in community pantry for Hampden and Medfield neighbors.",
    "distribution_model": "client_choice",
    "phone": "(410) 235-0679",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 17,
        "confidence": 0.86
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "out",
        "minutes_ago": 17,
        "confidence": 0.86
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "plenty",
        "minutes_ago": 17,
        "confidence": 0.86
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 17,
        "confidence": 0.86
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 17,
        "confidence": 0.86
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "out",
        "minutes_ago": 17,
        "confidence": 0.86
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "out",
        "minutes_ago": 17,
        "confidence": 0.86
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "plenty",
        "minutes_ago": 17,
        "confidence": 0.86
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000003",
    "name": "Bmore Community Food (Old Goucher Hub)",
    "address": "300 W 24th St, Baltimore, MD 21218",
    "neighborhood": "Old Goucher",
    "lat": 39.3175,
    "lng": -76.621,
    "distance_miles": 0.6,
    "walk_minutes": 12,
    "hours_text": "Open Saturday 2 to 3:30pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Saturday 2 to 3:30pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "notes": "Weekly fresh produce rescues, baked bread, and pantry groceries. Bring bags.",
    "distribution_model": "client_choice",
    "phone": "(443) 449-5655",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "plenty",
        "minutes_ago": 24,
        "confidence": 0.87
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "plenty",
        "minutes_ago": 24,
        "confidence": 0.87
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "low",
        "minutes_ago": 24,
        "confidence": 0.87
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 24,
        "confidence": 0.87
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 24,
        "confidence": 0.87
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "plenty",
        "minutes_ago": 24,
        "confidence": 0.87
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "plenty",
        "minutes_ago": 24,
        "confidence": 0.87
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "low",
        "minutes_ago": 24,
        "confidence": 0.87
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000004",
    "name": "Waverly Community Pantry",
    "address": "3100 Greenmount Ave, Baltimore, MD 21218",
    "neighborhood": "Waverly",
    "lat": 39.327,
    "lng": -76.6095,
    "distance_miles": 0.8,
    "walk_minutes": 15,
    "hours_text": "Open Wed 2 to 6pm, Sat 9am to 12pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Wed 2 to 6pm, Sat 9am to 12pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Walk in, no appointment. Bring your own bags. Fresh produce and dry goods.",
    "distribution_model": "client_choice",
    "phone": "(410) 555-0108",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 31,
        "confidence": 0.88
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "low",
        "minutes_ago": 31,
        "confidence": 0.88
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "out",
        "minutes_ago": 31,
        "confidence": 0.88
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "plenty",
        "minutes_ago": 31,
        "confidence": 0.88
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "plenty",
        "minutes_ago": 31,
        "confidence": 0.88
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "low",
        "minutes_ago": 31,
        "confidence": 0.88
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "low",
        "minutes_ago": 31,
        "confidence": 0.88
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "out",
        "minutes_ago": 31,
        "confidence": 0.88
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000005",
    "name": "Franciscan Center Food Pantry",
    "address": "101 W 23rd St, Baltimore, MD 21218",
    "neighborhood": "Charles North",
    "lat": 39.316,
    "lng": -76.6185,
    "distance_miles": 0.9,
    "walk_minutes": 17,
    "hours_text": "Open Mon-Fri 10am to 1pm",
    "open_today": false,
    "open_tonight": false,
    "open_hours_display": "Open Mon-Fri 10am to 1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "notes": "Hot meals, emergency food pantry, and pantry choice market.",
    "distribution_model": "client_choice",
    "phone": "(410) 467-5340",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 38,
        "confidence": 0.89
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "out",
        "minutes_ago": 38,
        "confidence": 0.89
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "plenty",
        "minutes_ago": 38,
        "confidence": 0.89
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 38,
        "confidence": 0.89
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 38,
        "confidence": 0.89
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "out",
        "minutes_ago": 38,
        "confidence": 0.89
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "out",
        "minutes_ago": 38,
        "confidence": 0.89
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "plenty",
        "minutes_ago": 38,
        "confidence": 0.89
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000006",
    "name": "Food Rescue Baltimore (Grace Baptist)",
    "address": "3201 The Alameda, Baltimore, MD 21218",
    "neighborhood": "Ednor Gardens",
    "lat": 39.328,
    "lng": -76.595,
    "distance_miles": 1.0,
    "walk_minutes": 20,
    "hours_text": "Open Friday 11:30am to 1pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Friday 11:30am to 1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "notes": "Free fresh food distribution every Friday. Surplus produce rescued from local markets.",
    "distribution_model": "client_choice",
    "phone": "(410) 555-0117",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "plenty",
        "minutes_ago": 45,
        "confidence": 0.9
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "plenty",
        "minutes_ago": 45,
        "confidence": 0.9
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "low",
        "minutes_ago": 45,
        "confidence": 0.9
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 45,
        "confidence": 0.9
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 45,
        "confidence": 0.9
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "plenty",
        "minutes_ago": 45,
        "confidence": 0.9
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "plenty",
        "minutes_ago": 45,
        "confidence": 0.9
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "low",
        "minutes_ago": 45,
        "confidence": 0.9
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000007",
    "name": "Manna House Food Pantry",
    "address": "435 E 25th St, Baltimore, MD 21218",
    "neighborhood": "Barclay",
    "lat": 39.3185,
    "lng": -76.608,
    "distance_miles": 1.1,
    "walk_minutes": 22,
    "hours_text": "Open Mon-Fri 8 to 11:30am",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Mon-Fri 8 to 11:30am",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Morning food assistance and groceries for individuals and families.",
    "distribution_model": "client_choice",
    "phone": "(410) 889-3001",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 52,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "low",
        "minutes_ago": 52,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "out",
        "minutes_ago": 52,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "plenty",
        "minutes_ago": 52,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "plenty",
        "minutes_ago": 52,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "low",
        "minutes_ago": 52,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "low",
        "minutes_ago": 52,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "out",
        "minutes_ago": 52,
        "confidence": 0.9099999999999999
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000008",
    "name": "Homestead UMC Community Service Center",
    "address": "1500 Gorsuch Ave, Baltimore, MD 21218",
    "neighborhood": "Coldstream-Homestead-Montebello",
    "lat": 39.3235,
    "lng": -76.598,
    "distance_miles": 1.2,
    "walk_minutes": 24,
    "hours_text": "Open Tuesday & Thursday 10am to 1pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Tuesday & Thursday 10am to 1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Serving Coldstream and Waverly neighbors with emergency groceries.",
    "distribution_model": "pre_packed",
    "phone": "(410) 243-4419",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 59,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "out",
        "minutes_ago": 59,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "plenty",
        "minutes_ago": 59,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 59,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 59,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "out",
        "minutes_ago": 59,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "out",
        "minutes_ago": 59,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "plenty",
        "minutes_ago": 59,
        "confidence": 0.9199999999999999
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000009",
    "name": "Spirit of Faith Community Pantry",
    "address": "721 E 25th St, Baltimore, MD 21218",
    "neighborhood": "East Baltimore Midway",
    "lat": 39.3185,
    "lng": -76.604,
    "distance_miles": 1.4,
    "walk_minutes": 27,
    "hours_text": "Open Wednesday 11am to 1pm",
    "open_today": false,
    "open_tonight": false,
    "open_hours_display": "Open Wednesday 11am to 1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Free food boxes for youth and families with fresh produce and dry staples.",
    "distribution_model": "pre_packed",
    "phone": "(410) 366-2244",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "plenty",
        "minutes_ago": 16,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "plenty",
        "minutes_ago": 16,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "low",
        "minutes_ago": 16,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 16,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 16,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "plenty",
        "minutes_ago": 16,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "plenty",
        "minutes_ago": 16,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "low",
        "minutes_ago": 16,
        "confidence": 0.9299999999999999
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000010",
    "name": "Beans & Bread Homeless Day Resource Center",
    "address": "400 S Bond St, Baltimore, MD 21231",
    "neighborhood": "Fells Point",
    "lat": 39.2835,
    "lng": -76.594,
    "distance_miles": 1.5,
    "walk_minutes": 29,
    "hours_text": "Open Mon-Fri 9am to 1pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Mon-Fri 9am to 1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "notes": "Breakfast 9-10am, lunch & grocery market 11am-1pm.",
    "distribution_model": "client_choice",
    "phone": "(410) 732-1892",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 23,
        "confidence": 0.94
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "low",
        "minutes_ago": 23,
        "confidence": 0.94
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "out",
        "minutes_ago": 23,
        "confidence": 0.94
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "plenty",
        "minutes_ago": 23,
        "confidence": 0.94
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "plenty",
        "minutes_ago": 23,
        "confidence": 0.94
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "low",
        "minutes_ago": 23,
        "confidence": 0.94
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "low",
        "minutes_ago": 23,
        "confidence": 0.94
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "out",
        "minutes_ago": 23,
        "confidence": 0.94
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000011",
    "name": "The Door Inc. Community Pantry",
    "address": "219 N Chester St, Baltimore, MD 21231",
    "neighborhood": "Patterson Park",
    "lat": 39.294,
    "lng": -76.584,
    "distance_miles": 1.6,
    "walk_minutes": 32,
    "hours_text": "Open Tuesday & Thursday 11am to 12pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Tuesday & Thursday 11am to 12pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "notes": "Food baskets with fresh produce, canned food, bread, and meat.",
    "distribution_model": "pre_packed",
    "phone": "(410) 563-3033",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 30,
        "confidence": 0.95
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "out",
        "minutes_ago": 30,
        "confidence": 0.95
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "plenty",
        "minutes_ago": 30,
        "confidence": 0.95
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 30,
        "confidence": 0.95
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 30,
        "confidence": 0.95
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "out",
        "minutes_ago": 30,
        "confidence": 0.95
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "out",
        "minutes_ago": 30,
        "confidence": 0.95
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "plenty",
        "minutes_ago": 30,
        "confidence": 0.95
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000012",
    "name": "Bea Gaddy Family Center",
    "address": "425 N Chester St, Baltimore, MD 21231",
    "neighborhood": "Middle East",
    "lat": 39.2965,
    "lng": -76.5845,
    "distance_miles": 1.7,
    "walk_minutes": 34,
    "hours_text": "Open Mon-Thu 9am to 12pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Mon-Thu 9am to 12pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Walk-in food pantry, formula, and diapers. Walk-ins accepted Thursdays.",
    "distribution_model": "client_choice",
    "phone": "(410) 563-2749",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "plenty",
        "minutes_ago": 37,
        "confidence": 0.96
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "plenty",
        "minutes_ago": 37,
        "confidence": 0.96
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "low",
        "minutes_ago": 37,
        "confidence": 0.96
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 37,
        "confidence": 0.96
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 37,
        "confidence": 0.96
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "plenty",
        "minutes_ago": 37,
        "confidence": 0.96
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "plenty",
        "minutes_ago": 37,
        "confidence": 0.96
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "low",
        "minutes_ago": 37,
        "confidence": 0.96
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000013",
    "name": "LMS Compassion Place at Fells Point",
    "address": "1706 Eastern Ave, Baltimore, MD 21231",
    "neighborhood": "Fells Point",
    "lat": 39.2855,
    "lng": -76.5915,
    "distance_miles": 1.8,
    "walk_minutes": 36,
    "hours_text": "Open Wednesday & Saturday 10am to 1pm",
    "open_today": false,
    "open_tonight": false,
    "open_hours_display": "Open Wednesday & Saturday 10am to 1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "notes": "Serving Latino and local families in Fells Point and Patterson Park.",
    "distribution_model": "client_choice",
    "phone": "(410) 636-0123",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 44,
        "confidence": 0.97
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "low",
        "minutes_ago": 44,
        "confidence": 0.97
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "out",
        "minutes_ago": 44,
        "confidence": 0.97
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "plenty",
        "minutes_ago": 44,
        "confidence": 0.97
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "plenty",
        "minutes_ago": 44,
        "confidence": 0.97
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "low",
        "minutes_ago": 44,
        "confidence": 0.97
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "low",
        "minutes_ago": 44,
        "confidence": 0.97
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "out",
        "minutes_ago": 44,
        "confidence": 0.97
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000014",
    "name": "St. Vincent de Paul Food Pantry",
    "address": "120 N Front St, Baltimore, MD 21202",
    "neighborhood": "Jonestown",
    "lat": 39.292,
    "lng": -76.605,
    "distance_miles": 2.0,
    "walk_minutes": 39,
    "hours_text": "Open Wed 10am to 1pm, Sat 9am to 12pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Wed 10am to 1pm, Sat 9am to 12pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "notes": "Emergency pantry bags ready to go. No appointment required.",
    "distribution_model": "pre_packed",
    "phone": "(410) 962-5078",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 51,
        "confidence": 0.98
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "out",
        "minutes_ago": 51,
        "confidence": 0.98
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "plenty",
        "minutes_ago": 51,
        "confidence": 0.98
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 51,
        "confidence": 0.98
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 51,
        "confidence": 0.98
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "out",
        "minutes_ago": 51,
        "confidence": 0.98
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "out",
        "minutes_ago": 51,
        "confidence": 0.98
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "plenty",
        "minutes_ago": 51,
        "confidence": 0.98
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000015",
    "name": "Our Daily Bread Employment Center",
    "address": "725 Fallsway, Baltimore, MD 21202",
    "neighborhood": "Old Town",
    "lat": 39.298,
    "lng": -76.6085,
    "distance_miles": 2.1,
    "walk_minutes": 41,
    "hours_text": "Open daily 10:30am to 12:30pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open daily 10:30am to 12:30pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "notes": "Hot meal program and emergency food resource hub.",
    "distribution_model": "client_choice",
    "phone": "(443) 986-9000",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "plenty",
        "minutes_ago": 58,
        "confidence": 0.99
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "plenty",
        "minutes_ago": 58,
        "confidence": 0.99
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "low",
        "minutes_ago": 58,
        "confidence": 0.99
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 58,
        "confidence": 0.99
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 58,
        "confidence": 0.99
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "plenty",
        "minutes_ago": 58,
        "confidence": 0.99
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "plenty",
        "minutes_ago": 58,
        "confidence": 0.99
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "low",
        "minutes_ago": 58,
        "confidence": 0.99
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000016",
    "name": "Land of Kush Community Table",
    "address": "840 N Eutaw St, Baltimore, MD 21201",
    "neighborhood": "Seton Hill",
    "lat": 39.2985,
    "lng": -76.6215,
    "distance_miles": 2.2,
    "walk_minutes": 43,
    "hours_text": "Open Monday 4 to 5:30pm",
    "open_today": true,
    "open_tonight": true,
    "open_hours_display": "Open Monday 4 to 5:30pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Free plant-based meals and grocery packages.",
    "distribution_model": "pre_packed",
    "phone": "(410) 225-5874",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 15,
        "confidence": 0.85
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "low",
        "minutes_ago": 15,
        "confidence": 0.85
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "out",
        "minutes_ago": 15,
        "confidence": 0.85
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "plenty",
        "minutes_ago": 15,
        "confidence": 0.85
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "plenty",
        "minutes_ago": 15,
        "confidence": 0.85
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "low",
        "minutes_ago": 15,
        "confidence": 0.85
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "low",
        "minutes_ago": 15,
        "confidence": 0.85
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "out",
        "minutes_ago": 15,
        "confidence": 0.85
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000017",
    "name": "North Ave Mission (Y Not Lot)",
    "address": "4 W North Ave, Baltimore, MD 21201",
    "neighborhood": "Charles North",
    "lat": 39.311,
    "lng": -76.618,
    "distance_miles": 2.3,
    "walk_minutes": 46,
    "hours_text": "Open 2nd & 4th Wed 2 to 4pm",
    "open_today": false,
    "open_tonight": false,
    "open_hours_display": "Open 2nd & 4th Wed 2 to 4pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "notes": "Biweekly fresh produce giveaways. Free market setup.",
    "distribution_model": "client_choice",
    "phone": "(443) 939-5095",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 22,
        "confidence": 0.86
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "out",
        "minutes_ago": 22,
        "confidence": 0.86
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "plenty",
        "minutes_ago": 22,
        "confidence": 0.86
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 22,
        "confidence": 0.86
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 22,
        "confidence": 0.86
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "out",
        "minutes_ago": 22,
        "confidence": 0.86
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "out",
        "minutes_ago": 22,
        "confidence": 0.86
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "plenty",
        "minutes_ago": 22,
        "confidence": 0.86
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000018",
    "name": "City Place on the Avenue",
    "address": "610 Pennsylvania Ave, Baltimore, MD 21201",
    "neighborhood": "Upton",
    "lat": 39.2965,
    "lng": -76.625,
    "distance_miles": 2.4,
    "walk_minutes": 48,
    "hours_text": "Open Thursday 11am to 1pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Thursday 11am to 1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Weekly fresh produce distribution and canned goods.",
    "distribution_model": "client_choice",
    "phone": "(410) 555-0166",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "plenty",
        "minutes_ago": 29,
        "confidence": 0.87
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "plenty",
        "minutes_ago": 29,
        "confidence": 0.87
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "low",
        "minutes_ago": 29,
        "confidence": 0.87
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 29,
        "confidence": 0.87
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 29,
        "confidence": 0.87
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "plenty",
        "minutes_ago": 29,
        "confidence": 0.87
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "plenty",
        "minutes_ago": 29,
        "confidence": 0.87
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "low",
        "minutes_ago": 29,
        "confidence": 0.87
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000019",
    "name": "St. Francis Neighborhood Center",
    "address": "2405 Linden Ave, Baltimore, MD 21217",
    "neighborhood": "Reservoir Hill",
    "lat": 39.314,
    "lng": -76.634,
    "distance_miles": 2.6,
    "walk_minutes": 51,
    "hours_text": "Open Mon 9:30-11am, Wed 11am-1pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Mon 9:30-11am, Wed 11am-1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "notes": "Fresh produce giveaways and food pantry boxes.",
    "distribution_model": "client_choice",
    "phone": "(410) 669-2612",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 36,
        "confidence": 0.88
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "low",
        "minutes_ago": 36,
        "confidence": 0.88
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "out",
        "minutes_ago": 36,
        "confidence": 0.88
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "plenty",
        "minutes_ago": 36,
        "confidence": 0.88
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "plenty",
        "minutes_ago": 36,
        "confidence": 0.88
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "low",
        "minutes_ago": 36,
        "confidence": 0.88
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "low",
        "minutes_ago": 36,
        "confidence": 0.88
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "out",
        "minutes_ago": 36,
        "confidence": 0.88
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000020",
    "name": "First Mount Calvary Food Pantry",
    "address": "1142 N Fulton Ave, Baltimore, MD 21217",
    "neighborhood": "Sandtown-Winchester",
    "lat": 39.303,
    "lng": -76.6465,
    "distance_miles": 2.7,
    "walk_minutes": 53,
    "hours_text": "Open Mon-Wed 11:30am-1:30pm, Fri 4-6pm",
    "open_today": true,
    "open_tonight": true,
    "open_hours_display": "Open Mon-Wed 11:30am-1:30pm, Fri 4-6pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Hot prepared meals Mon-Wed, pantry open Friday afternoons.",
    "distribution_model": "client_choice",
    "phone": "(410) 728-4488",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 43,
        "confidence": 0.89
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "out",
        "minutes_ago": 43,
        "confidence": 0.89
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "plenty",
        "minutes_ago": 43,
        "confidence": 0.89
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 43,
        "confidence": 0.89
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 43,
        "confidence": 0.89
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "out",
        "minutes_ago": 43,
        "confidence": 0.89
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "out",
        "minutes_ago": 43,
        "confidence": 0.89
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "plenty",
        "minutes_ago": 43,
        "confidence": 0.89
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000021",
    "name": "St. Peter Claver Food Pantry",
    "address": "1542 N Fremont Ave, Baltimore, MD 21217",
    "neighborhood": "Druid Heights",
    "lat": 39.3055,
    "lng": -76.6335,
    "distance_miles": 2.8,
    "walk_minutes": 56,
    "hours_text": "Open Monday 10am-1pm, Wed 10am-1pm",
    "open_today": false,
    "open_tonight": false,
    "open_hours_display": "Open Monday 10am-1pm, Wed 10am-1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Non-perishables Mondays, fresh produce on 4th Tuesday.",
    "distribution_model": "client_choice",
    "phone": "(410) 523-2415",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "plenty",
        "minutes_ago": 50,
        "confidence": 0.9
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "plenty",
        "minutes_ago": 50,
        "confidence": 0.9
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "low",
        "minutes_ago": 50,
        "confidence": 0.9
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 50,
        "confidence": 0.9
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 50,
        "confidence": 0.9
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "plenty",
        "minutes_ago": 50,
        "confidence": 0.9
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "plenty",
        "minutes_ago": 50,
        "confidence": 0.9
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "low",
        "minutes_ago": 50,
        "confidence": 0.9
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000022",
    "name": "Corpus Christi Church Food Pantry",
    "address": "110 W Lafayette Ave, Baltimore, MD 21217",
    "neighborhood": "Bolton Hill",
    "lat": 39.3075,
    "lng": -76.621,
    "distance_miles": 2.9,
    "walk_minutes": 58,
    "hours_text": "Open Tuesday 9:30am to 11:30am",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Tuesday 9:30am to 11:30am",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Emergency groceries for families in Bolton Hill and surrounding neighborhoods.",
    "distribution_model": "pre_packed",
    "phone": "(410) 523-4161",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 57,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "low",
        "minutes_ago": 57,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "out",
        "minutes_ago": 57,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "plenty",
        "minutes_ago": 57,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "plenty",
        "minutes_ago": 57,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "low",
        "minutes_ago": 57,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "low",
        "minutes_ago": 57,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "out",
        "minutes_ago": 57,
        "confidence": 0.9099999999999999
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000023",
    "name": "YO! Baltimore West Food Pantry",
    "address": "1510 W Lafayette Ave, Baltimore, MD 21217",
    "neighborhood": "Harlem Park",
    "lat": 39.299,
    "lng": -76.643,
    "distance_miles": 3.0,
    "walk_minutes": 60,
    "hours_text": "Open Tuesday 12 to 2pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Tuesday 12 to 2pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Community food boxes and youth nutrition assistance.",
    "distribution_model": "pre_packed",
    "phone": "(410) 728-3474",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 14,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "out",
        "minutes_ago": 14,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "plenty",
        "minutes_ago": 14,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 14,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 14,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "out",
        "minutes_ago": 14,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "out",
        "minutes_ago": 14,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "plenty",
        "minutes_ago": 14,
        "confidence": 0.9199999999999999
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000024",
    "name": "Nancy Bennett Food Pantry at Trinity Presbyterian",
    "address": "3200 Walbrook Ave, Baltimore, MD 21216",
    "neighborhood": "Walbrook",
    "lat": 39.3115,
    "lng": -76.671,
    "distance_miles": 3.2,
    "walk_minutes": 63,
    "hours_text": "Open 3rd Saturday 10am to 12pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open 3rd Saturday 10am to 12pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Monthly food pantry and emergency distribution.",
    "distribution_model": "pre_packed",
    "phone": "(410) 383-9633",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "plenty",
        "minutes_ago": 21,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "plenty",
        "minutes_ago": 21,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "low",
        "minutes_ago": 21,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 21,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 21,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "plenty",
        "minutes_ago": 21,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "plenty",
        "minutes_ago": 21,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "low",
        "minutes_ago": 21,
        "confidence": 0.9299999999999999
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000025",
    "name": "Jonah House Food Pantry",
    "address": "1301 Moreland Ave, Baltimore, MD 21216",
    "neighborhood": "Coppin Heights",
    "lat": 39.306,
    "lng": -76.666,
    "distance_miles": 3.3,
    "walk_minutes": 65,
    "hours_text": "Open Thursday 10am to 1pm",
    "open_today": false,
    "open_tonight": false,
    "open_hours_display": "Open Thursday 10am to 1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Community garden produce and staple grocery boxes.",
    "distribution_model": "client_choice",
    "phone": "(410) 233-6238",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 28,
        "confidence": 0.94
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "low",
        "minutes_ago": 28,
        "confidence": 0.94
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "out",
        "minutes_ago": 28,
        "confidence": 0.94
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "plenty",
        "minutes_ago": 28,
        "confidence": 0.94
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "plenty",
        "minutes_ago": 28,
        "confidence": 0.94
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "low",
        "minutes_ago": 28,
        "confidence": 0.94
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "low",
        "minutes_ago": 28,
        "confidence": 0.94
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "out",
        "minutes_ago": 28,
        "confidence": 0.94
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000026",
    "name": "St. Edwards Food Pantry",
    "address": "2848 W Lafayette Ave, Baltimore, MD 21216",
    "neighborhood": "Mosher",
    "lat": 39.2995,
    "lng": -76.6645,
    "distance_miles": 3.4,
    "walk_minutes": 68,
    "hours_text": "Open Wednesday 10am to 12pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Wednesday 10am to 12pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Serving West Baltimore families with canned goods, bread, and meat.",
    "distribution_model": "pre_packed",
    "phone": "(410) 362-2000",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 35,
        "confidence": 0.95
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "out",
        "minutes_ago": 35,
        "confidence": 0.95
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "plenty",
        "minutes_ago": 35,
        "confidence": 0.95
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 35,
        "confidence": 0.95
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 35,
        "confidence": 0.95
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "out",
        "minutes_ago": 35,
        "confidence": 0.95
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "out",
        "minutes_ago": 35,
        "confidence": 0.95
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "plenty",
        "minutes_ago": 35,
        "confidence": 0.95
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000027",
    "name": "The Food Project (UEmpower MD)",
    "address": "424 S Pulaski St, Baltimore, MD 21223",
    "neighborhood": "Carrollton Ridge",
    "lat": 39.283,
    "lng": -76.649,
    "distance_miles": 3.5,
    "walk_minutes": 70,
    "hours_text": "Open Tuesday & Thursday 10am to 12pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Tuesday & Thursday 10am to 12pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "notes": "Weekly pop-up food market, fresh produce, and family pantry items.",
    "distribution_model": "client_choice",
    "phone": "(443) 527-2101",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "plenty",
        "minutes_ago": 42,
        "confidence": 0.96
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "plenty",
        "minutes_ago": 42,
        "confidence": 0.96
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "low",
        "minutes_ago": 42,
        "confidence": 0.96
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 42,
        "confidence": 0.96
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 42,
        "confidence": 0.96
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "plenty",
        "minutes_ago": 42,
        "confidence": 0.96
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "plenty",
        "minutes_ago": 42,
        "confidence": 0.96
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "low",
        "minutes_ago": 42,
        "confidence": 0.96
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000028",
    "name": "FMDM MidTown Edmonson Food Pantry",
    "address": "1950 W Franklin St, Baltimore, MD 21223",
    "neighborhood": "Midtown-Edmondson",
    "lat": 39.2955,
    "lng": -76.65,
    "distance_miles": 3.6,
    "walk_minutes": 72,
    "hours_text": "Open Thursday 11am to 2pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Thursday 11am to 2pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Fresh vegetables, dry goods, and dairy products.",
    "distribution_model": "client_choice",
    "phone": "(410) 900-8263",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 49,
        "confidence": 0.97
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "low",
        "minutes_ago": 49,
        "confidence": 0.97
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "out",
        "minutes_ago": 49,
        "confidence": 0.97
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "plenty",
        "minutes_ago": 49,
        "confidence": 0.97
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "plenty",
        "minutes_ago": 49,
        "confidence": 0.97
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "low",
        "minutes_ago": 49,
        "confidence": 0.97
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "low",
        "minutes_ago": 49,
        "confidence": 0.97
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "out",
        "minutes_ago": 49,
        "confidence": 0.97
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000029",
    "name": "40 West Assistance & Referral Center",
    "address": "4711 Edmondson Ave, Baltimore, MD 21229",
    "neighborhood": "Edmondson Village",
    "lat": 39.297,
    "lng": -76.695,
    "distance_miles": 3.8,
    "walk_minutes": 75,
    "hours_text": "Open Mon, Wed, Fri 10am to 12pm",
    "open_today": false,
    "open_tonight": false,
    "open_hours_display": "Open Mon, Wed, Fri 10am to 12pm",
    "requires_id": true,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Serves 21229 and 21207 residents. Photo ID requested.",
    "distribution_model": "pre_packed",
    "phone": "(410) 233-4357",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 56,
        "confidence": 0.98
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "out",
        "minutes_ago": 56,
        "confidence": 0.98
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "plenty",
        "minutes_ago": 56,
        "confidence": 0.98
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 56,
        "confidence": 0.98
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 56,
        "confidence": 0.98
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "out",
        "minutes_ago": 56,
        "confidence": 0.98
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "out",
        "minutes_ago": 56,
        "confidence": 0.98
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "plenty",
        "minutes_ago": 56,
        "confidence": 0.98
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000030",
    "name": "Project PLASE Food Pantry",
    "address": "3601 Old Frederick Rd, Baltimore, MD 21229",
    "neighborhood": "Irvington",
    "lat": 39.2865,
    "lng": -76.681,
    "distance_miles": 3.9,
    "walk_minutes": 77,
    "hours_text": "Open Tuesday 1 to 3pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Tuesday 1 to 3pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Serving Irvington and surrounding community members.",
    "distribution_model": "client_choice",
    "phone": "(410) 837-1400",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "plenty",
        "minutes_ago": 13,
        "confidence": 0.99
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "plenty",
        "minutes_ago": 13,
        "confidence": 0.99
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "low",
        "minutes_ago": 13,
        "confidence": 0.99
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 13,
        "confidence": 0.99
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 13,
        "confidence": 0.99
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "plenty",
        "minutes_ago": 13,
        "confidence": 0.99
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "plenty",
        "minutes_ago": 13,
        "confidence": 0.99
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "low",
        "minutes_ago": 13,
        "confidence": 0.99
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000031",
    "name": "Central Church of Christ Food Pantry",
    "address": "4301 Woodridge Rd, Baltimore, MD 21229",
    "neighborhood": "Rognel Heights",
    "lat": 39.294,
    "lng": -76.689,
    "distance_miles": 4.0,
    "walk_minutes": 79,
    "hours_text": "Open 2nd & 4th Saturday 9am to 11am",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open 2nd & 4th Saturday 9am to 11am",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Family food boxes and holiday meal baskets.",
    "distribution_model": "pre_packed",
    "phone": "(410) 945-2080",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 20,
        "confidence": 0.85
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "low",
        "minutes_ago": 20,
        "confidence": 0.85
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "out",
        "minutes_ago": 20,
        "confidence": 0.85
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "plenty",
        "minutes_ago": 20,
        "confidence": 0.85
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "plenty",
        "minutes_ago": 20,
        "confidence": 0.85
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "low",
        "minutes_ago": 20,
        "confidence": 0.85
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "low",
        "minutes_ago": 20,
        "confidence": 0.85
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "out",
        "minutes_ago": 20,
        "confidence": 0.85
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000032",
    "name": "Deaf Shalom Zone Food Pantry",
    "address": "1040 S Beechfield Ave, Baltimore, MD 21229",
    "neighborhood": "Beechfield",
    "lat": 39.273,
    "lng": -76.696,
    "distance_miles": 4.1,
    "walk_minutes": 82,
    "hours_text": "Open Thursday 10am to 1pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Thursday 10am to 1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English",
      "ASL"
    ],
    "notes": "ASL accessible food pantry serving the deaf community and neighbors.",
    "distribution_model": "client_choice",
    "phone": "(410) 242-3603",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 27,
        "confidence": 0.86
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "out",
        "minutes_ago": 27,
        "confidence": 0.86
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "plenty",
        "minutes_ago": 27,
        "confidence": 0.86
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 27,
        "confidence": 0.86
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 27,
        "confidence": 0.86
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "out",
        "minutes_ago": 27,
        "confidence": 0.86
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "out",
        "minutes_ago": 27,
        "confidence": 0.86
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "plenty",
        "minutes_ago": 27,
        "confidence": 0.86
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000033",
    "name": "Paul's Place Community Table",
    "address": "1118 Ward St, Baltimore, MD 21230",
    "neighborhood": "Pigtown",
    "lat": 39.279,
    "lng": -76.635,
    "distance_miles": 4.2,
    "walk_minutes": 84,
    "hours_text": "Open Mon-Fri 8:30am to 12:30pm",
    "open_today": false,
    "open_tonight": false,
    "open_hours_display": "Open Mon-Fri 8:30am to 12:30pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Hot breakfast, marketplace pantry, clothes, and showers.",
    "distribution_model": "client_choice",
    "phone": "(410) 625-0775",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "plenty",
        "minutes_ago": 34,
        "confidence": 0.87
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "plenty",
        "minutes_ago": 34,
        "confidence": 0.87
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "low",
        "minutes_ago": 34,
        "confidence": 0.87
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 34,
        "confidence": 0.87
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 34,
        "confidence": 0.87
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "plenty",
        "minutes_ago": 34,
        "confidence": 0.87
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "plenty",
        "minutes_ago": 34,
        "confidence": 0.87
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "low",
        "minutes_ago": 34,
        "confidence": 0.87
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000034",
    "name": "Riverside Community Table",
    "address": "1234 E Fort Ave, Baltimore, MD 21230",
    "neighborhood": "Riverside",
    "lat": 39.272,
    "lng": -76.596,
    "distance_miles": 4.4,
    "walk_minutes": 87,
    "hours_text": "Open Tue & Thu 4 to 7pm, Sat 10am-1pm",
    "open_today": true,
    "open_tonight": true,
    "open_hours_display": "Open Tue & Thu 4 to 7pm, Sat 10am-1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "notes": "Pre-packed boxes with evening pickup available.",
    "distribution_model": "pre_packed",
    "phone": "(410) 555-0106",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 41,
        "confidence": 0.88
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "low",
        "minutes_ago": 41,
        "confidence": 0.88
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "out",
        "minutes_ago": 41,
        "confidence": 0.88
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "plenty",
        "minutes_ago": 41,
        "confidence": 0.88
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "plenty",
        "minutes_ago": 41,
        "confidence": 0.88
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "low",
        "minutes_ago": 41,
        "confidence": 0.88
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "low",
        "minutes_ago": 41,
        "confidence": 0.88
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "out",
        "minutes_ago": 41,
        "confidence": 0.88
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000035",
    "name": "Fishes and Loaves Pantry",
    "address": "2422 W Patapsco Ave, Baltimore, MD 21230",
    "neighborhood": "Lakeland",
    "lat": 39.253,
    "lng": -76.652,
    "distance_miles": 4.5,
    "walk_minutes": 89,
    "hours_text": "Open Tuesday & Thursday 10am to 1pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Tuesday & Thursday 10am to 1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "notes": "Emergency groceries and frozen meats for South Baltimore families.",
    "distribution_model": "pre_packed",
    "phone": "(410) 525-0969",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 48,
        "confidence": 0.89
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "out",
        "minutes_ago": 48,
        "confidence": 0.89
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "plenty",
        "minutes_ago": 48,
        "confidence": 0.89
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 48,
        "confidence": 0.89
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 48,
        "confidence": 0.89
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "out",
        "minutes_ago": 48,
        "confidence": 0.89
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "out",
        "minutes_ago": 48,
        "confidence": 0.89
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "plenty",
        "minutes_ago": 48,
        "confidence": 0.89
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000036",
    "name": "Cherry Hill Community Presbyterian",
    "address": "819 Cherry Hill Rd, Baltimore, MD 21225",
    "neighborhood": "Cherry Hill",
    "lat": 39.246,
    "lng": -76.623,
    "distance_miles": 4.6,
    "walk_minutes": 92,
    "hours_text": "Open 3rd Saturday 10am to 1pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open 3rd Saturday 10am to 1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Family food boxes and produce bundles for South Baltimore neighbors.",
    "distribution_model": "pre_packed",
    "phone": "(410) 355-8833",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "plenty",
        "minutes_ago": 55,
        "confidence": 0.9
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "plenty",
        "minutes_ago": 55,
        "confidence": 0.9
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "low",
        "minutes_ago": 55,
        "confidence": 0.9
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 55,
        "confidence": 0.9
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 55,
        "confidence": 0.9
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "plenty",
        "minutes_ago": 55,
        "confidence": 0.9
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "plenty",
        "minutes_ago": 55,
        "confidence": 0.9
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "low",
        "minutes_ago": 55,
        "confidence": 0.9
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000037",
    "name": "City of Refuge Food & Baby Pantry",
    "address": "3501 7th St, Baltimore, MD 21225",
    "neighborhood": "Brooklyn",
    "lat": 39.241,
    "lng": -76.598,
    "distance_miles": 4.7,
    "walk_minutes": 94,
    "hours_text": "Open Mon, Wed, Fri 10am to 2pm",
    "open_today": false,
    "open_tonight": false,
    "open_hours_display": "Open Mon, Wed, Fri 10am to 2pm",
    "requires_id": true,
    "allows_walkins": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "notes": "Food pantry, baby diapers, and infant formula. Bring ID for 1st visit.",
    "distribution_model": "client_choice",
    "phone": "(410) 355-6304",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 12,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "low",
        "minutes_ago": 12,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "out",
        "minutes_ago": 12,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "plenty",
        "minutes_ago": 12,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "plenty",
        "minutes_ago": 12,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "low",
        "minutes_ago": 12,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "low",
        "minutes_ago": 12,
        "confidence": 0.9099999999999999
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "out",
        "minutes_ago": 12,
        "confidence": 0.9099999999999999
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000038",
    "name": "Lillies Place (Transformation Center)",
    "address": "3701 4th St, Baltimore, MD 21225",
    "neighborhood": "Brooklyn",
    "lat": 39.239,
    "lng": -76.6025,
    "distance_miles": 4.8,
    "walk_minutes": 96,
    "hours_text": "Open Saturday 9am to 12pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Saturday 9am to 12pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "notes": "3-4 day supply of fresh produce, meats, bread, dairy, and staples.",
    "distribution_model": "client_choice",
    "phone": "(410) 355-0010",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 19,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "out",
        "minutes_ago": 19,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "plenty",
        "minutes_ago": 19,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 19,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 19,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "out",
        "minutes_ago": 19,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "out",
        "minutes_ago": 19,
        "confidence": 0.9199999999999999
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "plenty",
        "minutes_ago": 19,
        "confidence": 0.9199999999999999
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000039",
    "name": "Baltimore Dream Center (Brooklyn Church)",
    "address": "3814 4th St, Baltimore, MD 21225",
    "neighborhood": "Brooklyn",
    "lat": 39.2375,
    "lng": -76.603,
    "distance_miles": 5.0,
    "walk_minutes": 99,
    "hours_text": "Open Tuesday & Thursday 11am to 1pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Tuesday & Thursday 11am to 1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "notes": "Community grocery bags and hot lunch distribution.",
    "distribution_model": "pre_packed",
    "phone": "(410) 355-6707",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "plenty",
        "minutes_ago": 26,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "plenty",
        "minutes_ago": 26,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "low",
        "minutes_ago": 26,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 26,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 26,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "plenty",
        "minutes_ago": 26,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "plenty",
        "minutes_ago": 26,
        "confidence": 0.9299999999999999
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "low",
        "minutes_ago": 26,
        "confidence": 0.9299999999999999
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000040",
    "name": "GEDCO CARES Food Pantry",
    "address": "5502 York Rd, Baltimore, MD 21212",
    "neighborhood": "Govans",
    "lat": 39.3565,
    "lng": -76.6098,
    "distance_miles": 5.1,
    "walk_minutes": 101,
    "hours_text": "Open Mon, Thu, Sat 9 to 11am",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Mon, Thu, Sat 9 to 11am",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Client checklist pantry. Select what your household needs from our weekly items.",
    "distribution_model": "list",
    "phone": "(410) 433-2442",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 33,
        "confidence": 0.94
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "low",
        "minutes_ago": 33,
        "confidence": 0.94
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "out",
        "minutes_ago": 33,
        "confidence": 0.94
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "plenty",
        "minutes_ago": 33,
        "confidence": 0.94
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "plenty",
        "minutes_ago": 33,
        "confidence": 0.94
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "low",
        "minutes_ago": 33,
        "confidence": 0.94
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "low",
        "minutes_ago": 33,
        "confidence": 0.94
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "out",
        "minutes_ago": 33,
        "confidence": 0.94
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000041",
    "name": "Loch Raven UMC Food Pantry",
    "address": "6622 Loch Raven Blvd, Baltimore, MD 21239",
    "neighborhood": "Loch Raven",
    "lat": 39.3735,
    "lng": -76.578,
    "distance_miles": 5.2,
    "walk_minutes": 104,
    "hours_text": "Open Wednesday 10am to 12pm",
    "open_today": false,
    "open_tonight": false,
    "open_hours_display": "Open Wednesday 10am to 12pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Serving Northeast Baltimore with packaged grocery bags.",
    "distribution_model": "pre_packed",
    "phone": "(410) 825-0900",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 40,
        "confidence": 0.95
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "out",
        "minutes_ago": 40,
        "confidence": 0.95
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "plenty",
        "minutes_ago": 40,
        "confidence": 0.95
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 40,
        "confidence": 0.95
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 40,
        "confidence": 0.95
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "out",
        "minutes_ago": 40,
        "confidence": 0.95
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "out",
        "minutes_ago": 40,
        "confidence": 0.95
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "plenty",
        "minutes_ago": 40,
        "confidence": 0.95
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000042",
    "name": "Mt Zion Food Pantry",
    "address": "2000 E Belvedere Ave, Baltimore, MD 21239",
    "neighborhood": "Chinquapin Park",
    "lat": 39.362,
    "lng": -76.5865,
    "distance_miles": 5.3,
    "walk_minutes": 106,
    "hours_text": "Open 1st & 3rd Saturday 10am to 1pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open 1st & 3rd Saturday 10am to 1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Meats, poultry, dairy, produce, and shelf-stable goods.",
    "distribution_model": "client_choice",
    "phone": "(410) 426-2309",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "plenty",
        "minutes_ago": 47,
        "confidence": 0.96
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "plenty",
        "minutes_ago": 47,
        "confidence": 0.96
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "low",
        "minutes_ago": 47,
        "confidence": 0.96
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 47,
        "confidence": 0.96
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 47,
        "confidence": 0.96
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "plenty",
        "minutes_ago": 47,
        "confidence": 0.96
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "plenty",
        "minutes_ago": 47,
        "confidence": 0.96
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "low",
        "minutes_ago": 47,
        "confidence": 0.96
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000043",
    "name": "Creative City Food Pantry",
    "address": "2810 Shirley Ave, Baltimore, MD 21215",
    "neighborhood": "Park Heights",
    "lat": 39.348,
    "lng": -76.669,
    "distance_miles": 5.4,
    "walk_minutes": 108,
    "hours_text": "Open Mon & Thu 10am to 1pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Mon & Thu 10am to 1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Neighborhood grocery pantry for Northwest Baltimore. Bring sturdy bags.",
    "distribution_model": "client_choice",
    "phone": "(410) 555-0145",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 54,
        "confidence": 0.97
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "low",
        "minutes_ago": 54,
        "confidence": 0.97
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "out",
        "minutes_ago": 54,
        "confidence": 0.97
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "plenty",
        "minutes_ago": 54,
        "confidence": 0.97
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "plenty",
        "minutes_ago": 54,
        "confidence": 0.97
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "low",
        "minutes_ago": 54,
        "confidence": 0.97
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "low",
        "minutes_ago": 54,
        "confidence": 0.97
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "out",
        "minutes_ago": 54,
        "confidence": 0.97
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000044",
    "name": "Good Shepherd Baptist Church Pantry",
    "address": "3459 Park Heights Ave, Baltimore, MD 21215",
    "neighborhood": "Park Heights",
    "lat": 39.332,
    "lng": -76.662,
    "distance_miles": 5.6,
    "walk_minutes": 111,
    "hours_text": "Open Tuesday 10am to 12pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Tuesday 10am to 12pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Serving Park Heights families with nutritious fresh and canned food.",
    "distribution_model": "pre_packed",
    "phone": "(410) 462-5864",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 11,
        "confidence": 0.98
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "out",
        "minutes_ago": 11,
        "confidence": 0.98
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "plenty",
        "minutes_ago": 11,
        "confidence": 0.98
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 11,
        "confidence": 0.98
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 11,
        "confidence": 0.98
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "out",
        "minutes_ago": 11,
        "confidence": 0.98
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "out",
        "minutes_ago": 11,
        "confidence": 0.98
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "plenty",
        "minutes_ago": 11,
        "confidence": 0.98
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000045",
    "name": "Adams Chapel Food Pantry",
    "address": "3813 Egerton Rd, Baltimore, MD 21215",
    "neighborhood": "Dolfield",
    "lat": 39.341,
    "lng": -76.678,
    "distance_miles": 5.7,
    "walk_minutes": 113,
    "hours_text": "Open Saturday (except 1st Sat) 11am to 1pm",
    "open_today": false,
    "open_tonight": false,
    "open_hours_display": "Open Saturday (except 1st Sat) 11am to 1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Emergency food assistance for Northwest Baltimore residents.",
    "distribution_model": "pre_packed",
    "phone": "(410) 542-1200",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "plenty",
        "minutes_ago": 18,
        "confidence": 0.99
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "plenty",
        "minutes_ago": 18,
        "confidence": 0.99
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "low",
        "minutes_ago": 18,
        "confidence": 0.99
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 18,
        "confidence": 0.99
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 18,
        "confidence": 0.99
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "plenty",
        "minutes_ago": 18,
        "confidence": 0.99
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "plenty",
        "minutes_ago": 18,
        "confidence": 0.99
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "low",
        "minutes_ago": 18,
        "confidence": 0.99
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000046",
    "name": "Macedonia Project (New Creation Church)",
    "address": "5401 Frankford Ave, Baltimore, MD 21206",
    "neighborhood": "Frankford",
    "lat": 39.329,
    "lng": -76.544,
    "distance_miles": 5.8,
    "walk_minutes": 116,
    "hours_text": "Open Tue & Thu 11am to 1pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Tue & Thu 11am to 1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "No appointment required. Ring blue parking lot doorbell. Produce, meats, and canned items.",
    "distribution_model": "client_choice",
    "phone": "(410) 488-5650",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 25,
        "confidence": 0.85
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "low",
        "minutes_ago": 25,
        "confidence": 0.85
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "out",
        "minutes_ago": 25,
        "confidence": 0.85
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "plenty",
        "minutes_ago": 25,
        "confidence": 0.85
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "plenty",
        "minutes_ago": 25,
        "confidence": 0.85
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "low",
        "minutes_ago": 25,
        "confidence": 0.85
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "low",
        "minutes_ago": 25,
        "confidence": 0.85
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "out",
        "minutes_ago": 25,
        "confidence": 0.85
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000047",
    "name": "Loaves and Fishes at Epiphany Lutheran",
    "address": "4301 Raspe Ave, Baltimore, MD 21206",
    "neighborhood": "Overlea",
    "lat": 39.3495,
    "lng": -76.536,
    "distance_miles": 5.9,
    "walk_minutes": 118,
    "hours_text": "Open Saturday 10am to 12pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Saturday 10am to 12pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Fresh vegetables, bread, and non-perishables for local families.",
    "distribution_model": "pre_packed",
    "phone": "(443) 743-4717",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 32,
        "confidence": 0.86
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "out",
        "minutes_ago": 32,
        "confidence": 0.86
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "plenty",
        "minutes_ago": 32,
        "confidence": 0.86
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 32,
        "confidence": 0.86
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 32,
        "confidence": 0.86
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "out",
        "minutes_ago": 32,
        "confidence": 0.86
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "out",
        "minutes_ago": 32,
        "confidence": 0.86
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "plenty",
        "minutes_ago": 32,
        "confidence": 0.86
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000048",
    "name": "Harford Senior Center Food Pantry",
    "address": "4920 Harford Rd, Baltimore, MD 21214",
    "neighborhood": "Lauraville",
    "lat": 39.349,
    "lng": -76.568,
    "distance_miles": 6.0,
    "walk_minutes": 120,
    "hours_text": "Open Wednesday 10am to 1pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Wednesday 10am to 1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Serving seniors and families in Lauraville and Hamilton.",
    "distribution_model": "client_choice",
    "phone": "(410) 426-4009",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "plenty",
        "minutes_ago": 39,
        "confidence": 0.87
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "plenty",
        "minutes_ago": 39,
        "confidence": 0.87
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "low",
        "minutes_ago": 39,
        "confidence": 0.87
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 39,
        "confidence": 0.87
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 39,
        "confidence": 0.87
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "plenty",
        "minutes_ago": 39,
        "confidence": 0.87
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "plenty",
        "minutes_ago": 39,
        "confidence": 0.87
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "low",
        "minutes_ago": 39,
        "confidence": 0.87
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000049",
    "name": "New Life Food Pantry",
    "address": "2401 E North Ave, Baltimore, MD 21213",
    "neighborhood": "Clifton Park",
    "lat": 39.312,
    "lng": -76.581,
    "distance_miles": 6.2,
    "walk_minutes": 123,
    "hours_text": "Open Mon, Wed, Fri 9am to 12pm",
    "open_today": false,
    "open_tonight": false,
    "open_hours_display": "Open Mon, Wed, Fri 9am to 12pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "No appointment necessary. Bring your own bags.",
    "distribution_model": "client_choice",
    "phone": "(443) 800-0213",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 46,
        "confidence": 0.88
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "low",
        "minutes_ago": 46,
        "confidence": 0.88
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "out",
        "minutes_ago": 46,
        "confidence": 0.88
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "plenty",
        "minutes_ago": 46,
        "confidence": 0.88
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "plenty",
        "minutes_ago": 46,
        "confidence": 0.88
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "low",
        "minutes_ago": 46,
        "confidence": 0.88
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "low",
        "minutes_ago": 46,
        "confidence": 0.88
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "out",
        "minutes_ago": 46,
        "confidence": 0.88
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000050",
    "name": "Zion Baptist Church Food Pantry",
    "address": "1700 N Caroline St, Baltimore, MD 21213",
    "neighborhood": "Oliver",
    "lat": 39.309,
    "lng": -76.5985,
    "distance_miles": 6.3,
    "walk_minutes": 125,
    "hours_text": "Open Thursday 10am to 12:30pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Thursday 10am to 12:30pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Community food distribution with fresh produce and grocery staples.",
    "distribution_model": "pre_packed",
    "phone": "(410) 837-4181",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "\ud83e\udd55",
        "band": "low",
        "minutes_ago": 53,
        "confidence": 0.89
      },
      {
        "category_name": "Protein",
        "category_emoji": "\ud83e\udd69",
        "band": "out",
        "minutes_ago": 53,
        "confidence": 0.89
      },
      {
        "category_name": "Dairy",
        "category_emoji": "\ud83e\udd5b",
        "band": "plenty",
        "minutes_ago": 53,
        "confidence": 0.89
      },
      {
        "category_name": "Grains",
        "category_emoji": "\ud83c\udf5e",
        "band": "low",
        "minutes_ago": 53,
        "confidence": 0.89
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "\ud83e\udd6b",
        "band": "low",
        "minutes_ago": 53,
        "confidence": 0.89
      },
      {
        "category_name": "Diapers",
        "category_emoji": "\ud83e\uddd2",
        "band": "out",
        "minutes_ago": 53,
        "confidence": 0.89
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "\ud83e\uddf4",
        "band": "out",
        "minutes_ago": 53,
        "confidence": 0.89
      },
      {
        "category_name": "Halal items",
        "category_emoji": "\ud83c\udf19",
        "band": "plenty",
        "minutes_ago": 53,
        "confidence": 0.89
      }
    ]
  }
  {
    "id": "c1000000-0000-0000-0000-000000000051",
    "name": "Middle River Emergency Food Pantry (Hope Center)",
    "address": "214 Stemmers Run Rd, Middle River, MD 21220",
    "neighborhood": "Middle River",
    "lat": 39.3298,
    "lng": -76.4421,
    "distance_miles": 1.2,
    "walk_minutes": 24,
    "hours_text": "Open Tuesday & Thursday 10am to 1pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Tuesday & Thursday 10am to 1pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "notes": "Emergency groceries, canned proteins, bakery items, and seasonal fresh produce for Eastern Baltimore / 21220 neighbors.",
    "distribution_model": "client_choice",
    "phone": "(410) 686-4673",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "🥕",
        "band": "plenty",
        "minutes_ago": 15,
        "confidence": 0.88
      },
      {
        "category_name": "Protein",
        "category_emoji": "🥩",
        "band": "plenty",
        "minutes_ago": 15,
        "confidence": 0.88
      },
      {
        "category_name": "Dairy",
        "category_emoji": "🥛",
        "band": "low",
        "minutes_ago": 15,
        "confidence": 0.88
      },
      {
        "category_name": "Grains",
        "category_emoji": "🍞",
        "band": "plenty",
        "minutes_ago": 15,
        "confidence": 0.88
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "🥫",
        "band": "plenty",
        "minutes_ago": 15,
        "confidence": 0.88
      },
      {
        "category_name": "Diapers",
        "category_emoji": "👶",
        "band": "low",
        "minutes_ago": 15,
        "confidence": 0.88
      },
      {
        "category_name": "Hygiene",
        "category_emoji": "🧼",
        "band": "low",
        "minutes_ago": 15,
        "confidence": 0.88
      }
    ]
  },
  {
    "id": "c1000000-0000-0000-0000-000000000052",
    "name": "Eastern Regional Food Center (Essex / Middle River)",
    "address": "1517 Eastern Ave, Essex, MD 21221",
    "neighborhood": "Essex / Middle River",
    "lat": 39.3112,
    "lng": -76.4678,
    "distance_miles": 1.8,
    "walk_minutes": 35,
    "hours_text": "Open Wednesday & Saturday 9am to 12pm",
    "open_today": true,
    "open_tonight": false,
    "open_hours_display": "Open Wednesday & Saturday 9am to 12pm",
    "requires_id": false,
    "allows_walkins": true,
    "languages": [
      "English"
    ],
    "notes": "Walk-ins welcome, serves 21220 and 21221 zip codes. Pre-packed family grocery boxes and bakery.",
    "distribution_model": "pre_packed",
    "phone": "(410) 682-6228",
    "shelf_items": [
      {
        "category_name": "Produce",
        "category_emoji": "🥕",
        "band": "low",
        "minutes_ago": 30,
        "confidence": 0.85
      },
      {
        "category_name": "Protein",
        "category_emoji": "🥩",
        "band": "plenty",
        "minutes_ago": 30,
        "confidence": 0.85
      },
      {
        "category_name": "Dairy",
        "category_emoji": "🥛",
        "band": "low",
        "minutes_ago": 30,
        "confidence": 0.85
      },
      {
        "category_name": "Grains",
        "category_emoji": "🍞",
        "band": "plenty",
        "minutes_ago": 30,
        "confidence": 0.85
      },
      {
        "category_name": "Canned Goods",
        "category_emoji": "🥫",
        "band": "plenty",
        "minutes_ago": 30,
        "confidence": 0.85
      }
    ]
  },
];
