from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import pantries, inventory

app = FastAPI(
    title="Pantry Pulse Baltimore API",
    description="Real-Time Food Pantry Inventory & Distribution Intelligence API (JSON store)",
    version="2.0.0",
)

# CORS (allow all origins for dev/demo)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers (data comes from the JSON store in data/pantries.json — see store.py)
app.include_router(pantries.router)
app.include_router(inventory.router)


@app.get("/health")
async def health_check():
    """Health check endpoint to verify API readiness."""
    return {"status": "healthy", "service": "pantry-pulse-api", "version": "2.0.0"}
