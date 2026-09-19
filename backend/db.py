import asyncpg
from config import DATABASE_URL

# Global asyncpg pool
pool = None

async def init_db():
    """Initialize the database connection pool."""
    global pool
    pool = await asyncpg.create_pool(DATABASE_URL)

async def close_db():
    """Close the database connection pool."""
    global pool
    if pool:
        await pool.close()

async def get_db_conn():
    """Dependency to get a database connection from the pool."""
    global pool
    if pool is None:
        raise Exception("Database pool not initialized")
    async with pool.acquire() as conn:
        yield conn
