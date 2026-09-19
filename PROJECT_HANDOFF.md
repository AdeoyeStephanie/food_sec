# Find Food Baltimore (PantryPulse) — Comprehensive Technical Handoff Document

> **Project Mission:** Bridging the food pantry information gap in Baltimore City. No existing platform (Plentiful, Link2Feed, 211, Maryland Food Bank) gives food-insecure clients live, category-level shelf visibility (*"Does a pantry near 21218 have baby formula right now?"*). We solve this with a two-sided platform: a dignity-first public web locator and a lightweight pantry operator toolkit powered by multimodal AI and a predict-and-correct inventory state estimator.

---

## 1. Repository & Collaboration Information

* **GitHub Repository:** `https://github.com/AdeoyeStephanie/food_sec`
* **Active Working Branch:** `feature/predict-and-correct`
* **Stable Production Branch:** `main`
* **Local Project Directory:** `/Users/tomisinadebari/Downloads/Food Pantry`

---

## 2. Architecture Overview & Two-App Separation

Per project requirements, the system is strictly split into two completely isolated applications so neighbors never see administrative tools, and pantry staff have a dedicated operating console:

```
                               ┌────────────────────────────────────────────────────────┐
                               │                    FIND FOOD BALTIMORE                 │
                               └───────────────────────────┬────────────────────────────┘
                                                           │
                      ┌────────────────────────────────────┴────────────────────────────────────┐
                      ▼                                                                         ▼
     ┌─────────────────────────────────┐                                       ┌─────────────────────────────────┐
     │      NEIGHBOR / CLIENT APP      │                                       │   PANTRY OPERATOR / OWNER APP   │
     │            Route: /             │                                       │        Route: /volunteer        │
     ├─────────────────────────────────┤                                       ├─────────────────────────────────┤
     │ • 100% clean, no admin buttons  │                                       │ • Protected by 4-digit PIN      │
     │ • Natural language + voice search│                                      │   (e.g., "4827")                │
     │ • Conversational AI summary     │                                       │ • Big-button check-in counter   │
     │ • Leaflet map with stock pins   │                                       │ • Real-time camera scanner with │
     │ • Category bands (Plenty/Low/Out│                                       │   Gemini 3.6 Flash multimodal AI│
     │ • Walking distance & directions │                                       │ • 10-second closing check       │
     │ • "What to expect" (No ID, etc.)│                                       │ • Quick mid-shift "Out" flags   │
     │ • Anonymous neighbor feedback   │                                       │ • TEFAP report generation       │
     └─────────────────────────────────┘                                       └─────────────────────────────────┘
```

---

## 3. What Has Been Built & Achieved So Far

### A. Database Layer (`db/`)
* **Database Engine:** PostgreSQL + PostGIS (compatible with Supabase).
* **Schema (`db/init.sql`):**
  * `pantries`: UUID, name, address, neighborhood, PostGIS `geography(POINT, 4326)`, hours JSONB, distribution model, volunteer code, ID policy, walk-in policy, spoken languages.
  * `food_categories`: Standard pantry taxonomy (Produce, Protein, Dairy, Grains, Diapers, Hygiene, Canned Goods, Halal items).
  * `pantry_categories`: Per-category allocation rates (lbs per person for predict-and-correct math).
  * `shelf_state`: Time-series shelf updates (`plenty`, `low`, `out`), internal estimated quantities, source (`intake_photo`, `prediction`, `volunteer_correction`, `client_feedback`), confidence score (0.0–1.0).
  * `check_ins`: Fast anonymous household logging (household size 1–20, timestamp).
  * `latest_shelf` View: Fast materialized lookup of the most recent stock status and freshness timestamp per pantry.
  * `find_pantries_near(lat, lng, radius_miles)` Function: PostGIS geospatial distance calculation and walking time estimation.
* **Seed Data (`db/seed.sql`):** 10 verified real Baltimore pantries seeded with coordinates, operating hours, and realistic shelf states:
  1. Northside Family Pantry (Hampden)
  2. Beans and Bread (Fells Point)
  3. GEDCO CARES Pantry (Charles Village)
  4. St. Vincent de Paul (Jonestown)
  5. Bea Gaddy Family Centers (Patterson Park)
  6. Riverside Community Table (Riverside)
  7. Paul's Place (Pigtown)
  8. Waverly Community Pantry (Waverly / 21218)
  9. Cherry Hill Community Pantry (Cherry Hill)
  10. Sandtown Community Pantry (Sandtown-Winchester)

### B. Python FastAPI Backend (`backend/`)
* Built with `FastAPI`, `asyncpg`, and `pydantic`.
* **Endpoints:**
  * `GET /health` — Health check
  * `GET /api/pantries` — Geospatial radius search returning pantries and live stock items
  * `GET /api/pantries/{pantry_id}` — Single pantry detail
  * `GET /api/categories` — Master food category list
  * `POST /api/inventory/checkin` — Household visit logging
  * `POST /api/inventory/intake` — Photo donation endpoint
  * `POST /api/inventory/correction` — Volunteer closing check update
  * `GET /api/inventory/{pantry_id}/today` — Today's households served metrics

### C. Modern Next.js Frontend (`frontend/`)
* Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide Icons, and Leaflet.
* **Client App (`frontend/app/page.tsx`):**
  * Natural language search box (*"diapers near Hampden after 6pm"*) with browser Web Speech API voice search in English and Spanish.
  * Suggestion chips (*"Baby formula near me"*, *"Open tonight"*, *"No ID needed"*, *"Fresh produce"*).
  * Conversational AI summary box at the top of results.
  * Interactive Leaflet Map (`frontend/components/PantryMap.tsx`) with custom HTML pins rendering miniature stock bars.
  * Detailed Slide-over sheet (`frontend/components/PantryDetailSheet.tsx`) showing shelf levels, freshness stamps (*"40 min ago"*), practical expectations (*"Bring your own bags"*, *"No ID needed"*), and anonymous neighbor feedback (*"Yes, they had it" / "No, they were out"*).
  * Emergency voice hotline card (*"(410) 555-FOOD"*) for smartphone-dependent clients.
* **Pantry Operator Portal (`frontend/app/volunteer/page.tsx` & `components/VolunteerDashboard.tsx`):**
  * Protected by 4-digit volunteer code (**`4827`**).
  * **Check-In Touchpad:** Large 1 to 8+ household size buttons that increment the "Families served today" counter.
  * **Quick Run-out Flags:** 1-tap toggles for Produce, Protein, Dairy, Diapers, Hygiene to immediately alert neighbors on the map.
  * **Live Camera Viewfinder (`frontend/components/CameraViewfinder.tsx`):** Integrated browser webcam/phone camera stream with live shutter button and front/back camera toggle.
  * **Gemini 3.6 Flash Multimodal Scanner (`frontend/app/api/scan-donation/route.ts`):** Sends snapped photo in-memory to Google Gemini, methodically scans and categorizes items with zero-temperature accuracy, displays editable `+` and `−` review counters, and commits updates to shelves with privacy guarantees (*"Photo is deleted immediately after sorting"*).
  * **Closing Check:** 10-second end-of-shift review where volunteers confirm or override the predict-and-correct model guesses.

---

## 4. Current File Tree

```
Food Pantry/
├── .gitignore
├── PROJECT_HANDOFF.md          <-- (This file)
├── docker-compose.yml          <-- TimescaleDB + PostGIS container config
├── db/
│   ├── init.sql                <-- Postgres schema & spatial functions
│   └── seed.sql                <-- 10 real Baltimore pantries seed data
├── backend/
│   ├── .env.example
│   ├── config.py
│   ├── db.py                   <-- asyncpg connection pool
│   ├── main.py                 <-- FastAPI server
│   ├── models.py               <-- Pydantic models
│   ├── requirements.txt
│   └── routers/
│       ├── inventory.py
│       └── pantries.py
└── frontend/
    ├── .env.local              <-- Contains GEMINI_API_KEY (gitignored)
    ├── package.json
    ├── tsconfig.json
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx            <-- Pure Client/Neighbor App (Route: /)
    │   ├── volunteer/
    │   │   └── page.tsx        <-- Dedicated Pantry Operator Portal (Route: /volunteer)
    │   └── api/
    │       └── scan-donation/
    │           └── route.ts    <-- Gemini 3.6 Flash vision intake API
    ├── components/
    │   ├── CameraViewfinder.tsx<-- Live camera capture & shutter
    │   ├── PantryDetailSheet.tsx
    │   ├── PantryMap.tsx       <-- Interactive Leaflet map with stock pins
    │   └── VolunteerDashboard.tsx
    └── lib/
        └── pantryData.ts       <-- Seed dataset and TypeScript interfaces
```

---

## 5. Active Environment & Configuration

* **Node.js Version:** `v22.17.1`, `npm 10.9.2`
* **Python Version:** `Python 3.13.5`
* **Active Dev Server:** Running on `http://localhost:3000` (Next.js Turbopack)
* **Active Gemini Model:** `gemini-3.6-flash`
* **Local secrets (gitignored):** put `GEMINI_API_KEY` in `frontend/.env.local` — never commit real values.
* **Database URL:** put `DATABASE_URL` in `backend/.env` (see `backend/.env.example`) — never commit real values.

---

## 6. What Needs to Be Done Next (Roadmap for Grok Bot)

Here are the highest-priority tasks remaining to complete the hackathon prototype:

### Task 1: Deepen the Pantry Operator Portal (`frontend/app/volunteer/page.tsx`)
1. **Onboarding / Distribution Style Selector (Mockup Page 4):**
   * Allow pantry managers to set up or toggle their distribution model:
     - *Pre-packed boxes*: Outflow = 1 box per check-in.
     - *Pick from a list*: Order-based item deduction.
     - *They shop the shelves (Client Choice)*: Predict-and-correct estimation.
2. **Category Customization:**
   * Allow pantries to add custom categories (e.g., Kosher items, Infant formula, Pet food).

### Task 2: Implement the Predict-and-Correct State Estimator Engine
* Connect the check-in count directly to shelf depletion:
  $$\text{Depleted Qty} = \text{Household Size} \times \text{Allocation Per Person}$$
* For example, when 5 families of size 4 check in (20 people), calculate that ~30 lbs of Produce and ~20 lbs of Protein have left the shelves.
* When the estimated remaining quantity dips below category thresholds:
  - $> 20$ units $\rightarrow$ **Plenty** (Green)
  - $5 - 20$ units $\rightarrow$ **Low** (Amber)
  - $< 5$ units $\rightarrow$ **Out** (Red)
* During the **Closing Check**, when the volunteer clicks **"Send update"**, the model snaps to ground truth and resets the confidence score to $1.0$.

### Task 3: Auto-Generate TEFAP & Maryland Food Bank Monthly Compliance Report
* Food pantries in Baltimore must submit monthly reports of households served, family size breakdowns, and total pounds distributed under TEFAP compliance.
* Add an **"Export Monthly Report"** button in the volunteer portal that generates a clean downloadable summary (or CSV/PDF) from the check-ins table. *(This is the #1 feature that saves pantry managers hours of manual work).*

### Task 4: Voice Hotline Integration (ElevenLabs + Twilio)
* Setup an incoming phone hotline for callers with limited smartphone access.
* The ElevenLabs agent prompt: *"Hello! I can check live Baltimore food pantry shelves for you. What items do you need and what is your ZIP code?"*
* Configured with a server tool that hits the `/api/pantries` search endpoint.

### Task 5: Production Deployment (Vercel)
* Deploy the Next.js app to Vercel so judges and team members can open the live URL directly on their smartphones during judging.

---

## 7. How to Run & Verify the Project

```bash
# 1. Clone repository and switch to feature branch
git clone https://github.com/AdeoyeStephanie/food_sec.git
cd food_sec
git checkout feature/predict-and-correct

# 2. Start the Frontend Application
cd frontend
npm install
npm run dev

# 3. Open in Browser
# Neighbor/Client App: http://localhost:3000
# Pantry Operator Portal: http://localhost:3000/volunteer (PIN: 4827)
```
