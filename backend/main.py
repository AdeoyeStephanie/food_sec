from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from routers import pantries, inventory

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: attempt to connect to Postgres if running, otherwise use store
    try:
        from db import init_db
        await init_db()
        print("[Startup] PostgreSQL database pool initialized.")
    except Exception as e:
        print(f"[Startup] PostgreSQL not running ({e}). Running with JSON store (data/pantries.json).")
    yield
    try:
        from db import close_db
        await close_db()
    except Exception:
        pass

app = FastAPI(
    title="Pantry Pulse Baltimore API",
    description="Real-Time Food Pantry Inventory & Distribution Intelligence API",
    version="2.0.0",
    lifespan=lifespan
)

# CORS (allow all origins for dev/demo)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(pantries.router)
app.include_router(inventory.router)

@app.get("/health")
async def health_check():
    """Health check endpoint to verify API readiness."""
    return {"status": "healthy", "service": "pantry-pulse-api", "version": "2.0.0"}
