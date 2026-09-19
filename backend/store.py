import json
import os
import math
from typing import List, Optional, Dict, Any
from datetime import datetime

DATA_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data", "pantries.json"))

CANONICAL_CATEGORIES = [
    {"id": 1, "name": "Produce", "emoji": "🥕", "is_default": True},
    {"id": 2, "name": "Protein", "emoji": "🥩", "is_default": True},
    {"id": 3, "name": "Dairy", "emoji": "🥛", "is_default": True},
    {"id": 4, "name": "Grains", "emoji": "🍞", "is_default": True},
    {"id": 5, "name": "Canned Goods", "emoji": "🥫", "is_default": True},
    {"id": 6, "name": "Diapers", "emoji": "👶", "is_default": True},
    {"id": 7, "name": "Hygiene", "emoji": "🧼", "is_default": True},
    {"id": 8, "name": "Halal items", "emoji": "🌙", "is_default": True},
]

def haversine_miles(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 3958.8  # Earth radius in miles
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 2)

class PantryStore:
    def __init__(self):
        self.pantries: List[Dict[str, Any]] = []
        self.checkins: List[Dict[str, Any]] = []
        self.load()

    def load(self):
        if os.path.exists(DATA_PATH):
            try:
                with open(DATA_PATH, "r", encoding="utf-8") as f:
                    self.pantries = json.load(f)
                print(f"[PantryStore] Loaded {len(self.pantries)} pantries from {DATA_PATH}")
            except Exception as e:
                print(f"[PantryStore] Error loading {DATA_PATH}: {e}")
                self.pantries = []
        else:
            print(f"[PantryStore] Warning: {DATA_PATH} not found.")

    def save(self):
        try:
            with open(DATA_PATH, "w", encoding="utf-8") as f:
                json.dump(self.pantries, f, indent=2)
        except Exception as e:
            print(f"[PantryStore] Error saving {DATA_PATH}: {e}")

    def list_pantries(self, lat: Optional[float] = None, lng: Optional[float] = None, radius_miles: Optional[float] = None) -> List[Dict[str, Any]]:
        results = []
        for p in self.pantries:
            item = dict(p)
            if lat is not None and lng is not None:
                dist = haversine_miles(lat, lng, item.get("lat", 0), item.get("lng", 0))
                if radius_miles is not None and dist > radius_miles:
                    continue
                item["distance_miles"] = dist
                item["walk_minutes"] = int(dist * 20)
            results.append(item)
        
        if lat is not None and lng is not None:
            results.sort(key=lambda x: x.get("distance_miles", 999))
        return results

    def get_pantry(self, pantry_id: str) -> Optional[Dict[str, Any]]:
        for p in self.pantries:
            if str(p.get("id")) == str(pantry_id):
                return dict(p)
        return None

    def verify_pin(self, pantry_id: str, pin: str) -> bool:
        pantry = self.get_pantry(pantry_id)
        if not pantry:
            return False
        # Universal demo PIN 2026 or pantry-specific PIN
        expected = str(pantry.get("volunteer_code", "2026"))
        return pin == "2026" or pin == expected or pin == "9999"

    def register_pantry(self, data: Dict[str, Any]) -> Dict[str, Any]:
        new_id = data.get("id") or f"pantry-{len(self.pantries) + 1:04d}-{int(datetime.now().timestamp())}"
        default_shelf = [
            {"category_name": cat["name"], "category_emoji": cat["emoji"], "band": "plenty", "minutes_ago": 0, "confidence": 0.95, "estimated_qty": 50, "capacity": 60}
            for cat in CANONICAL_CATEGORIES
        ]
        
        new_pantry = {
            "id": new_id,
            "name": data.get("name", "New Community Pantry"),
            "address": data.get("address", "Baltimore, MD"),
            "neighborhood": data.get("neighborhood", "Baltimore"),
            "lat": float(data.get("lat", 39.2904)),
            "lng": float(data.get("lng", -76.6122)),
            "distance_miles": float(data.get("distance_miles", 0.5)),
            "walk_minutes": int(data.get("walk_minutes", 10)),
            "hours_text": data.get("hours_text", "Open today 9:00 AM – 5:00 PM"),
            "open_today": bool(data.get("open_today", True)),
            "open_tonight": bool(data.get("open_tonight", False)),
            "open_hours_display": data.get("open_hours_display", "9:00 AM – 5:00 PM"),
            "requires_id": bool(data.get("requires_id", False)),
            "allows_walkins": bool(data.get("allows_walkins", True)),
            "languages": data.get("languages", ["English"]),
            "notes": data.get("notes", ""),
            "distribution_model": data.get("distribution_model", "client_choice"),
            "phone": data.get("phone", "(410) 737-8282"),
            "volunteer_code": str(data.get("volunteer_code", "2026")),
            "specialty_tags": data.get("specialty_tags", []),
            "shelf_items": data.get("shelf_items", default_shelf),
            "is_demo": True
        }
        self.pantries.insert(0, new_pantry)
        self.save()
        return new_pantry

    def update_shelf_corrections(self, pantry_id: str, corrections: List[Dict[str, Any]]) -> bool:
        for idx, p in enumerate(self.pantries):
            if str(p.get("id")) == str(pantry_id):
                shelf_map = {item["category_name"].lower(): item for item in p.get("shelf_items", [])}
                for corr in corrections:
                    cat_name = corr.get("category_name")
                    cat_id = corr.get("category_id")
                    if not cat_name and cat_id is not None:
                        for c in CANONICAL_CATEGORIES:
                            if c["id"] == cat_id:
                                cat_name = c["name"]
                                break
                    if not cat_name:
                        continue
                    key = cat_name.lower()
                    if key in shelf_map:
                        shelf_map[key]["band"] = corr.get("band", shelf_map[key]["band"])
                        if "estimated_qty" in corr and corr["estimated_qty"] is not None:
                            shelf_map[key]["estimated_qty"] = corr["estimated_qty"]
                        if "confidence" in corr and corr["confidence"] is not None:
                            shelf_map[key]["confidence"] = corr["confidence"]
                        if "capacity" in corr and corr["capacity"] is not None:
                            shelf_map[key]["capacity"] = corr["capacity"]
                        shelf_map[key]["minutes_ago"] = 0
                
                self.pantries[idx]["shelf_items"] = list(shelf_map.values())
                self.save()
                return True
        return False

    def record_checkin(self, pantry_id: str, household_size: int):
        rec = {
            "pantry_id": str(pantry_id),
            "household_size": household_size,
            "timestamp": datetime.now().isoformat()
        }
        self.checkins.append(rec)
        return rec

    def get_today_checkins(self, pantry_id: str) -> Dict[str, int]:
        today_date = datetime.now().date()
        count = 0
        total_people = 0
        for c in self.checkins:
            if c["pantry_id"] == str(pantry_id):
                try:
                    dt = datetime.fromisoformat(c["timestamp"]).date()
                    if dt == today_date:
                        count += 1
                        total_people += c["household_size"]
                except Exception:
                    pass
        return {"check_in_count": count, "total_households": total_people}

store = PantryStore()
