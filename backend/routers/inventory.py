from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from models import CheckInRequest, CorrectionRequest, IntakeResult, ShelfItem
from db import get_db_conn
import asyncpg
from uuid import UUID
import json

router = APIRouter(prefix="/api/inventory", tags=["inventory"])


def _fk_detail(err: asyncpg.exceptions.ForeignKeyViolationError) -> str:
    """Turn an asyncpg FK error into a client-friendly message.

    Distinguishes an unknown pantry from an unknown category so callers know
    which id was bad (postgres puts the offending column in err.detail).
    """
    detail = getattr(err, "detail", "") or ""
    if "pantry" in detail.lower():
        return "Unknown pantry_id — the pantry does not exist."
    if "categor" in detail.lower():
        return "Unknown category_id — the category does not exist."
    return "Referenced pantry_id or category_id does not exist."


@router.post("/checkin")
async def checkin(request: CheckInRequest, conn: asyncpg.Connection = Depends(get_db_conn)):
    """Log a check-in (household_size). Insert into check_ins table."""
    query = """
        INSERT INTO check_ins (time, pantry_id, household_size)
        VALUES (NOW(), $1, $2)
    """
    try:
        await conn.execute(query, request.pantry_id, request.household_size)
    except asyncpg.exceptions.ForeignKeyViolationError as err:
        raise HTTPException(status_code=404, detail=_fk_detail(err))
    return {"status": "success"}

@router.post("/correction")
async def correction(request: CorrectionRequest, conn: asyncpg.Connection = Depends(get_db_conn)):
    """Volunteer closing check. Insert shelf_state rows with Kalman-blended confidence and estimated quantity."""
    query = """
        INSERT INTO shelf_state (time, pantry_id, category_id, band, estimated_qty, source, confidence)
        VALUES (NOW(), $1, $2, $3, $4, 'volunteer_correction', $5)
    """
    args = [
        (
            request.pantry_id,
            c.category_id,
            c.band,
            c.estimated_qty,
            c.confidence if c.confidence is not None else 0.92
        )
        for c in request.corrections
    ]
    try:
        await conn.executemany(query, args)
    except asyncpg.exceptions.ForeignKeyViolationError as err:
        raise HTTPException(status_code=404, detail=_fk_detail(err))
    return {"status": "success"}

@router.post("/intake", response_model=IntakeResult)
async def intake(
    pantry_id: UUID = Form(...), 
    photo: UploadFile = File(...),
    conn: asyncpg.Connection = Depends(get_db_conn)
):
    """Accept a photo, process with Gemini vision (mocked for now), insert shelf_state."""
    # Placeholder for Gemini vision classification
    # For now, return mock classification
    mock_items = [
        {"category_id": 1, "band": "plenty", "confidence": 0.95},
        {"category_id": 2, "band": "low", "confidence": 0.85}
    ]
    
    query = """
        INSERT INTO shelf_state (time, pantry_id, category_id, band, source, confidence)
        VALUES (NOW(), $1, $2, $3, 'intake_photo', $4)
    """
    args = [(pantry_id, item["category_id"], item["band"], item["confidence"]) for item in mock_items]
    try:
        await conn.executemany(query, args)
    except asyncpg.exceptions.ForeignKeyViolationError as err:
        raise HTTPException(status_code=404, detail=_fk_detail(err))
    
    # Return IntakeResult
    # Need to fetch category names and emojis to return ShelfItem
    shelf_items = []
    for item in mock_items:
        cat = await conn.fetchrow("SELECT name, emoji FROM food_categories WHERE id = $1", item["category_id"])
        if cat:
            shelf_items.append(
                ShelfItem(
                    category_name=cat["name"],
                    category_emoji=cat["emoji"],
                    band=item["band"],
                    confidence=item["confidence"],
                    source="intake_photo",
                    minutes_ago=0
                )
            )
            
    return IntakeResult(items=shelf_items)

@router.get("/{pantry_id}/today")
async def get_today_stats(pantry_id: UUID, conn: asyncpg.Connection = Depends(get_db_conn)):
    """Today's check-in count and total households served"""
    query = """
        SELECT COUNT(*) as check_in_count, COALESCE(SUM(household_size), 0) as total_households
        FROM check_ins
        WHERE pantry_id = $1 AND time >= CURRENT_DATE
    """
    row = await conn.fetchrow(query, pantry_id)
    return {
        "check_in_count": row["check_in_count"],
        "total_households": row["total_households"]
    }
