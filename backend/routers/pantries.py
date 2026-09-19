from fastapi import APIRouter, Query, HTTPException
from typing import List, Optional
from models import PantryWithShelf, PinVerifyRequest, PinVerifyResponse, PantryCreateRequest
from store import store, CANONICAL_CATEGORIES

router = APIRouter(prefix="/api", tags=["pantries"])

@router.get("/pantries", response_model=List[PantryWithShelf])
async def get_pantries(
    lat: Optional[float] = Query(None, description="Optional search latitude"),
    lng: Optional[float] = Query(None, description="Optional search longitude"),
    radius_miles: Optional[float] = Query(None, description="Search radius in miles")
):
    """Get all pantries or filter/sort near a location with current shelf stock."""
    pantries = store.list_pantries(lat=lat, lng=lng, radius_miles=radius_miles)
    return pantries

@router.get("/pantries/{pantry_id}", response_model=PantryWithShelf)
async def get_pantry(pantry_id: str):
    """Get a single pantry with full shelf state."""
    pantry = store.get_pantry(pantry_id)
    if not pantry:
        raise HTTPException(status_code=404, detail="Pantry not found")
    return pantry

@router.post("/pantries", response_model=PantryWithShelf)
async def create_pantry(req: PantryCreateRequest):
    """Register a new pantry for the network (great for live demos)."""
    new_pantry = store.register_pantry(req.dict())
    return new_pantry

@router.post("/pantries/{pantry_id}/verify-pin", response_model=PinVerifyResponse)
async def verify_pantry_pin(pantry_id: str, req: PinVerifyRequest):
    """Verify operator 4-digit PIN against the pantry record."""
    pantry = store.get_pantry(pantry_id)
    if not pantry:
        raise HTTPException(status_code=404, detail="Pantry not found")
    is_valid = store.verify_pin(pantry_id, req.pin.strip())
    return PinVerifyResponse(valid=is_valid, pantry_name=pantry.get("name"))

@router.get("/categories")
async def get_categories():
    """List all canonical food categories."""
    return CANONICAL_CATEGORIES
