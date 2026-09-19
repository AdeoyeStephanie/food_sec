from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from db import init_db, close_db
from routers import pantries, inventory

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: initialize database pool
    await init_db()
    yield
    # Shutdown: close database pool
    await close_db()

app = FastAPI(
    title="Find Food Baltimore API",
    description="Backend for real-time food pantry stock visibility",
    version="1.0.0",
    lifespan=lifespan
)

# CORS (allow all for hackathon)
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
    """Health check endpoint to verify the API is running."""
    return {"status": "healthy"}
