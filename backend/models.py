from pydantic import BaseModel
from typing import List, Optional, Any
from uuid import UUID

class PantryBase(BaseModel):
    id: UUID
    name: str
    address: str
    neighborhood: Optional[str] = None
    lat: float
    lng: float
    phone: Optional[str] = None
    distribution_model: Optional[str] = None
    hours: Optional[Any] = None
    requires_id: Optional[bool] = False
    allows_walkins: Optional[bool] = True
    languages: Optional[List[str]] = None
    notes: Optional[str] = None

class ShelfItem(BaseModel):
    category_name: str
    category_emoji: str
    band: str
    minutes_ago: Optional[int] = None
    confidence: Optional[float] = None
    source: Optional[str] = None

class PantryWithShelf(PantryBase):
    shelf_items: List[ShelfItem]
    distance_miles: Optional[float] = None
    walk_minutes: Optional[int] = None

class CheckInRequest(BaseModel):
    pantry_id: UUID
    household_size: int

class CorrectionItem(BaseModel):
    category_id: int
    band: str

class CorrectionRequest(BaseModel):
    pantry_id: UUID
    corrections: List[CorrectionItem]

class IntakeResult(BaseModel):
    items: List[ShelfItem]
