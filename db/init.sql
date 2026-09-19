-- ============================================================
-- Find Food Baltimore — Database Schema (Supabase compatible)
-- PostgreSQL + PostGIS (no TimescaleDB needed)
-- ============================================================

-- Enable PostGIS for location queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- ============================================================
-- 1. Food Categories
-- ============================================================
CREATE TABLE food_categories (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL UNIQUE,
    emoji       TEXT NOT NULL DEFAULT '📦',
    is_default  BOOLEAN NOT NULL DEFAULT true
);

-- ============================================================
-- 2. Pantries
-- ============================================================
CREATE TYPE distribution_model AS ENUM (
    'pre_packed',
    'list',
    'client_choice'
);

CREATE TABLE pantries (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name                TEXT NOT NULL,
    address             TEXT NOT NULL,
    neighborhood        TEXT,
    location            geography(POINT, 4326) NOT NULL,
    phone               TEXT,
    distribution_model  distribution_model NOT NULL DEFAULT 'client_choice',
    hours               JSONB NOT NULL DEFAULT '{}',
    volunteer_code      TEXT NOT NULL DEFAULT lpad(floor(random() * 10000)::text, 4, '0'),
    requires_id         BOOLEAN NOT NULL DEFAULT false,
    allows_walkins      BOOLEAN NOT NULL DEFAULT true,
    languages           TEXT[] NOT NULL DEFAULT ARRAY['English'],
    notes               TEXT,
    is_active           BOOLEAN NOT NULL DEFAULT true,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_pantries_location ON pantries USING GIST (location);
CREATE INDEX idx_pantries_active ON pantries (is_active) WHERE is_active = true;

-- ============================================================
-- 3. Pantry ↔ Category junction
-- ============================================================
CREATE TABLE pantry_categories (
    pantry_id   UUID NOT NULL REFERENCES pantries(id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES food_categories(id) ON DELETE CASCADE,
    lbs_per_person NUMERIC(4,2) NOT NULL DEFAULT 2.0,
    PRIMARY KEY (pantry_id, category_id)
);

-- ============================================================
-- 4. Shelf State — time-series stock data (regular table)
-- ============================================================
CREATE TYPE stock_band AS ENUM ('plenty', 'low', 'out');
CREATE TYPE update_source AS ENUM (
    'intake_photo',
    'prediction',
    'volunteer_correction',
    'client_feedback',
    'manual'
);

CREATE TABLE shelf_state (
    id              BIGSERIAL PRIMARY KEY,
    time            TIMESTAMPTZ NOT NULL DEFAULT now(),
    pantry_id       UUID NOT NULL REFERENCES pantries(id) ON DELETE CASCADE,
    category_id     INT NOT NULL REFERENCES food_categories(id) ON DELETE CASCADE,
    band            stock_band NOT NULL,
    estimated_qty   NUMERIC(8,2),
    source          update_source NOT NULL DEFAULT 'manual',
    confidence      NUMERIC(3,2) NOT NULL DEFAULT 1.0
);

CREATE INDEX idx_shelf_pantry_cat ON shelf_state (pantry_id, category_id, time DESC);
CREATE INDEX idx_shelf_time ON shelf_state (time DESC);

-- ============================================================
-- 5. Check-ins — household size only, no identity
-- ============================================================
CREATE TABLE check_ins (
    id              BIGSERIAL PRIMARY KEY,
    time            TIMESTAMPTZ NOT NULL DEFAULT now(),
    pantry_id       UUID NOT NULL REFERENCES pantries(id) ON DELETE CASCADE,
    household_size  INT NOT NULL CHECK (household_size >= 1 AND household_size <= 20)
);

CREATE INDEX idx_checkins_pantry ON check_ins (pantry_id, time DESC);

-- ============================================================
-- 6. View — latest shelf state per pantry × category
-- ============================================================
CREATE OR REPLACE VIEW latest_shelf AS
SELECT DISTINCT ON (pantry_id, category_id)
    pantry_id,
    category_id,
    time,
    band,
    estimated_qty,
    source,
    confidence,
    ROUND(EXTRACT(EPOCH FROM (now() - time)) / 60) AS minutes_ago
FROM shelf_state
ORDER BY pantry_id, category_id, time DESC;

-- ============================================================
-- 7. Function — find pantries within radius
-- ============================================================
CREATE OR REPLACE FUNCTION find_pantries_near(
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    radius_miles DOUBLE PRECISION DEFAULT 5.0
)
RETURNS TABLE (
    id              UUID,
    name            TEXT,
    address         TEXT,
    neighborhood    TEXT,
    lat_out         DOUBLE PRECISION,
    lng_out         DOUBLE PRECISION,
    distance_miles  DOUBLE PRECISION,
    walk_minutes    INT,
    distribution_model distribution_model,
    hours           JSONB,
    phone           TEXT,
    requires_id     BOOLEAN,
    allows_walkins  BOOLEAN,
    languages       TEXT[],
    notes           TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.name,
        p.address,
        p.neighborhood,
        ST_Y(p.location::geometry) AS lat_out,
        ST_X(p.location::geometry) AS lng_out,
        ROUND((ST_Distance(p.location, ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography) / 1609.34)::numeric, 2)::double precision,
        CEIL(ST_Distance(p.location, ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography) / 1609.34 * 20)::int,
        p.distribution_model,
        p.hours,
        p.phone,
        p.requires_id,
        p.allows_walkins,
        p.languages,
        p.notes
    FROM pantries p
    WHERE p.is_active = true
      AND ST_DWithin(
            p.location,
            ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography,
            radius_miles * 1609.34
          )
    ORDER BY ST_Distance(p.location, ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography) ASC;
END;
$$ LANGUAGE plpgsql;
