from fastapi import APIRouter, Depends, Query, HTTPException
from typing import List
from models import PantryWithShelf, PantryBase, ShelfItem
from db import get_db_conn
import asyncpg
import json
from uuid import UUID

router = APIRouter(prefix="/api", tags=["pantries"])

@router.get("/pantries", response_model=List[PantryWithShelf])
async def get_pantries(
    lat: float = Query(..., description="Latitude"),
    lng: float = Query(..., description="Longitude"),
    radius_miles: float = Query(5.0, description="Search radius in miles"),
    conn: asyncpg.Connection = Depends(get_db_conn)
):
    """Get pantries near a location with their current shelf stock."""
    # Using the find_pantries_near SQL function
    pantries_query = """
        SELECT * FROM find_pantries_near($1, $2, $3)
    """
    
    pantries_records = await conn.fetch(pantries_query, lat, lng, radius_miles)
    
    result = []
    for p in pantries_records:
        # Get shelf items for this pantry
        shelf_query = """
            SELECT ls.band, ls.minutes_ago, ls.confidence, ls.source, 
                   fc.name as category_name, fc.emoji as category_emoji
            FROM latest_shelf ls
            JOIN food_categories fc ON ls.category_id = fc.id
            WHERE ls.pantry_id = $1
        """
        shelf_records = await conn.fetch(shelf_query, p['id'])
        
        shelf_items = [
            ShelfItem(
                category_name=s['category_name'],
                category_emoji=s['category_emoji'],
                band=s['band'],
                minutes_ago=s['minutes_ago'],
                confidence=float(s['confidence']) if s['confidence'] else None,
                source=s['source']
            ) for s in shelf_records
        ]
        
        # Parse hours JSONB if present
        hours_data = None
        if p.get('hours'):
            hours_data = json.loads(p['hours']) if isinstance(p['hours'], str) else p['hours']
            
        pantry = PantryWithShelf(
            id=p['id'],
            name=p['name'],
            address=p['address'],
            neighborhood=p.get('neighborhood'),
            lat=p['lat_out'],
            lng=p['lng_out'],
            phone=p.get('phone'),
            distribution_model=p.get('distribution_model'),
            hours=hours_data,
            requires_id=p.get('requires_id'),
            allows_walkins=p.get('allows_walkins'),
            languages=p.get('languages'),
            notes=p.get('notes'),
            distance_miles=float(p.get('distance_miles')) if p.get('distance_miles') else None,
            walk_minutes=p.get('walk_minutes'),
            shelf_items=shelf_items
        )
        result.append(pantry)
        
    return result

@router.get("/pantries/{pantry_id}", response_model=PantryWithShelf)
async def get_pantry(pantry_id: UUID, conn: asyncpg.Connection = Depends(get_db_conn)):
    """Get a single pantry with full shelf state."""
    pantry_query = """
        SELECT id, name, address, neighborhood, 
               ST_Y(location::geometry) as lat, ST_X(location::geometry) as lng,
               phone, distribution_model, hours, requires_id, allows_walkins, 
               languages, notes
        FROM pantries
        WHERE id = $1
    """
    p = await conn.fetchrow(pantry_query, pantry_id)
    if not p:
        raise HTTPException(status_code=404, detail="Pantry not found")
        
    shelf_query = """
        SELECT ls.band, ls.minutes_ago, ls.confidence, ls.source, 
               fc.name as category_name, fc.emoji as category_emoji
        FROM latest_shelf ls
        JOIN food_categories fc ON ls.category_id = fc.id
        WHERE ls.pantry_id = $1
    """
    shelf_records = await conn.fetch(shelf_query, pantry_id)
    
    shelf_items = [
        ShelfItem(
            category_name=s['category_name'],
            category_emoji=s['category_emoji'],
            band=s['band'],
            minutes_ago=s['minutes_ago'],
            confidence=float(s['confidence']) if s['confidence'] else None,
            source=s['source']
        ) for s in shelf_records
    ]
    
    hours_data = None
    if p.get('hours'):
        hours_data = json.loads(p['hours']) if isinstance(p['hours'], str) else p['hours']

    return PantryWithShelf(
        id=p['id'],
        name=p['name'],
        address=p['address'],
        neighborhood=p.get('neighborhood'),
        lat=p['lat'],
        lng=p['lng'],
        phone=p.get('phone'),
        distribution_model=p.get('distribution_model'),
        hours=hours_data,
        requires_id=p.get('requires_id'),
        allows_walkins=p.get('allows_walkins'),
        languages=p.get('languages'),
        notes=p.get('notes'),
        shelf_items=shelf_items
    )

@router.get("/categories")
async def get_categories(conn: asyncpg.Connection = Depends(get_db_conn)):
    """List all food categories."""
    records = await conn.fetch("SELECT id, name, emoji, is_default FROM food_categories ORDER BY id")
    return [dict(r) for r in records]
