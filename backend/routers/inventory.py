from fastapi import APIRouter, HTTPException
from models import CheckInRequest, CorrectionRequest
from store import store

router = APIRouter(prefix="/api/inventory", tags=["inventory"])

@router.post("/checkin")
async def checkin(request: CheckInRequest):
    """Log an anonymous household check-in."""
    pantry = store.get_pantry(request.pantry_id)
    if not pantry:
        raise HTTPException(status_code=404, detail="Unknown pantry_id — the pantry does not exist.")
    rec = store.record_checkin(request.pantry_id, request.household_size)
    return {"status": "success", "record": rec}

@router.post("/correction")
async def correction(request: CorrectionRequest):
    """Volunteer closing check or inventory intake. Updates live shelf stock and Kalman parameters."""
    pantry = store.get_pantry(request.pantry_id)
    if not pantry:
        raise HTTPException(status_code=404, detail="Unknown pantry_id — the pantry does not exist.")
    
    corrections_list = [c.dict() for c in request.corrections]
    updated = store.update_shelf_corrections(request.pantry_id, corrections_list)
    if not updated:
        raise HTTPException(status_code=400, detail="Failed to apply shelf corrections.")
    return {"status": "success"}

@router.get("/{pantry_id}/today")
async def get_today_stats(pantry_id: str):
    """Today's check-in count and total people served for compliance."""
    pantry = store.get_pantry(pantry_id)
    if not pantry:
        raise HTTPException(status_code=404, detail="Unknown pantry_id")
    return store.get_today_checkins(pantry_id)
