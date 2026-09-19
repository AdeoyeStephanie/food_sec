from pydantic import BaseModel
from typing import List, Optional, Any, Union

class ShelfItem(BaseModel):
    category_name: str
    category_emoji: str
    band: str
    minutes_ago: Optional[int] = 0
    confidence: Optional[float] = 0.95
    estimated_qty: Optional[float] = None
    capacity: Optional[float] = None
    source: Optional[str] = None

class PantryBase(BaseModel):
    id: str
    name: str
    address: str
    neighborhood: Optional[str] = None
    lat: float
    lng: float
    phone: Optional[str] = None
    distribution_model: Optional[str] = "client_choice"
    hours: Optional[Any] = None
    hours_text: Optional[str] = None
    open_today: Optional[bool] = True
    open_tonight: Optional[bool] = False
    open_hours_display: Optional[str] = None
    requires_id: Optional[bool] = False
    allows_walkins: Optional[bool] = True
    languages: Optional[List[str]] = ["English"]
    notes: Optional[str] = None
    specialty_tags: Optional[List[str]] = []
    volunteer_code: Optional[str] = "2026"
    is_demo: Optional[bool] = False

class PantryWithShelf(PantryBase):
    shelf_items: List[ShelfItem] = []
    distance_miles: Optional[float] = None
    walk_minutes: Optional[int] = None

class CheckInRequest(BaseModel):
    pantry_id: str
    household_size: int

class CorrectionItem(BaseModel):
    category_id: Optional[int] = None
    category_name: Optional[str] = None
    band: str
    confidence: Optional[float] = None
    estimated_qty: Optional[float] = None
    capacity: Optional[float] = None

class CorrectionRequest(BaseModel):
    pantry_id: str
    corrections: List[CorrectionItem]

class PinVerifyRequest(BaseModel):
    pin: str

class PinVerifyResponse(BaseModel):
    valid: bool
    pantry_name: Optional[str] = None

class PantryCreateRequest(BaseModel):
    name: str
    address: str
    neighborhood: Optional[str] = "Baltimore"
    lat: Optional[float] = 39.2904
    lng: Optional[float] = -76.6122
    phone: Optional[str] = "(410) 737-8282"
    volunteer_code: Optional[str] = "2026"
    distribution_model: Optional[str] = "client_choice"
    requires_id: Optional[bool] = False
    allows_walkins: Optional[bool] = True
    languages: Optional[List[str]] = ["English"]
    notes: Optional[str] = ""
    specialty_tags: Optional[List[str]] = []

class IntakeResult(BaseModel):
    items: List[ShelfItem]
