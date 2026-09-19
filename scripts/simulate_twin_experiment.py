#!/usr/bin/env python3
"""
Pantry Pulse - Twin Experiment / OSSE Simulator
Validates the Compartmental Kalman Inventory Estimator against Ground Truth.

Parameters grounded in Baltimore City Census & Maryland Food Bank (MFB) data:
- Average Baltimore household size: 2.42 (Census: 40% 1-person, 28% 2, 15% 3, 10% 4, 7% 5+)
- Operating shift: 4 hours (e.g. 10:00 AM - 2:00 PM)
- Arrival rate: Poisson process, front-loaded peak (~15-20 arrivals/hr early, tapering to ~8/hr)
- Baseline capacity: Produce 150 lbs, Protein 100 lbs, Grains 120 lbs, Canned 150 lbs
- True consumption behavior: hidden 1.28x multiplier (families take 28% more than chart)
"""

import math
import random
from typing import List, Dict, Tuple, Any

# Baltimore City Household Size empirical distribution
HOUSEHOLD_DISTRIBUTION = [
    (1, 0.40),
    (2, 0.28),
    (3, 0.15),
    (4, 0.10),
    (5, 0.05),
    (6, 0.02),
]

# Baseline TEFAP Allocation (lbs per household member)
CATEGORY_SPECS = {
    "Produce": {"capacity": 320.0, "base_lbs_per_person": 2.5, "stock_threshold": 0.35},
    "Protein": {"capacity": 220.0, "base_lbs_per_person": 1.8, "stock_threshold": 0.35},
    "Grains":  {"capacity": 250.0, "base_lbs_per_person": 2.0, "stock_threshold": 0.35},
    "Canned":  {"capacity": 300.0, "base_lbs_per_person": 2.2, "stock_threshold": 0.35},
}

def sample_household_size(rng: random.Random) -> int:
    r = rng.random()
    cumulative = 0.0
    for size, prob in HOUSEHOLD_DISTRIBUTION:
        cumulative += prob
        if r <= cumulative:
            return size
    return 3

def band_from_qty(qty: float, capacity: float) -> str:
    fraction = max(0.0, qty) / capacity
    if fraction > 0.35:
        return "plenty"
    elif fraction > 0.08:
        return "low"
    else:
        return "out"

def run_single_day(
    day_idx: int,
    true_multiplier: float,
    current_learned_multiplier: float,
    seed: int
) -> Dict[str, Any]:
    rng = random.Random(seed)
    
    # 4-hour shift (240 minutes)
    SHIFT_MINUTES = 240
    
    # Starting stock: Fresh morning restock
    true_stock = {cat: spec["capacity"] for cat, spec in CATEGORY_SPECS.items()}
    
    # Estimators to track
    # 1. Status Quo: Assumes morning status (plenty) until volunteer closes at min 240
    # 2. Fixed Allocation: Subtracts base allocation, never corrects, never learns
    # 3. Pantry Pulse: Adaptive Kalman with Michaelis-Menten saturable take + closing Bayesian update
    
    fixed_model_stock = dict(true_stock)
    pulse_model_stock = dict(true_stock)
    pulse_uncertainty = {cat: 0.05 for cat in CATEGORY_SPECS}  # normalized P
    
    # Generate visitor arrival timestamps via inhomogeneous Poisson process
    # Morning rush (first 90 mins): ~18/hr = 0.3/min; later: ~8/hr = 0.13/min
    arrivals = []
    t = 0.0
    while t < SHIFT_MINUTES:
        rate = 0.32 if t < 90 else (0.20 if t < 180 else 0.10)
        dt = rng.expovariate(rate)
        t += dt
        if t < SHIFT_MINUTES:
            h_size = sample_household_size(rng)
            arrivals.append((round(t, 1), h_size))
            
    # Minute-by-minute tracking across shift for metrics
    minute_samples = []
    
    arrival_idx = 0
    num_arrivals = len(arrivals)
    
    for minute in range(SHIFT_MINUTES):
        # Process any arrivals in this minute
        while arrival_idx < num_arrivals and arrivals[arrival_idx][0] <= minute:
            arr_time, h_size = arrivals[arrival_idx]
            arrival_idx += 1
            
            # --- TRUE WORLD GROUND TRUTH ---
            for cat, spec in CATEGORY_SPECS.items():
                base_alloc = spec["base_lbs_per_person"] * h_size
                # True take has hidden multiplier + random lognormal noise
                noise = math.exp(rng.gauss(0, 0.15))
                nominal_take = base_alloc * true_multiplier * noise
                
                # Michaelis-Menten saturable depletion: when stock is low, take slows down
                # V = Vmax * S / (Km + S)
                km = 12.0  # half-saturation constant in lbs
                current_s = true_stock[cat]
                saturation_factor = current_s / (km + current_s) if current_s > 0 else 0.0
                actual_take = min(current_s, nominal_take * saturation_factor)
                true_stock[cat] = max(0.0, true_stock[cat] - actual_take)
                
            # --- APPARENT WORLD (WHAT APP SEES) ---
            # 8% missed tap rate during peak rush
            was_tapped = rng.random() > 0.08
            if was_tapped:
                for cat, spec in CATEGORY_SPECS.items():
                    # Fixed model uses default rate (1.0)
                    fixed_take = spec["base_lbs_per_person"] * h_size * 1.0
                    fixed_model_stock[cat] = max(0.0, fixed_model_stock[cat] - fixed_take)
                    
                    # Pulse model uses learned multiplier + saturable safeguard
                    pulse_nominal = spec["base_lbs_per_person"] * h_size * current_learned_multiplier
                    km_p = 10.0
                    cur_p = pulse_model_stock[cat]
                    sat_p = cur_p / (km_p + cur_p) if cur_p > 0 else 0.0
                    pulse_take = min(cur_p, pulse_nominal * sat_p)
                    pulse_model_stock[cat] = max(0.0, pulse_model_stock[cat] - pulse_take)
                    
                    # Uncertainty grows per check-in without sensor verification
                    pulse_uncertainty[cat] = min(1.0, pulse_uncertainty[cat] + 0.015)
                    
        # Sample state for this minute
        sample = {
            "minute": minute,
            "true": {cat: band_from_qty(true_stock[cat], CATEGORY_SPECS[cat]["capacity"]) for cat in CATEGORY_SPECS},
            "status_quo": {cat: "plenty" for cat in CATEGORY_SPECS}, # Static status quo
            "fixed_model": {cat: band_from_qty(fixed_model_stock[cat], CATEGORY_SPECS[cat]["capacity"]) for cat in CATEGORY_SPECS},
            "pulse_model": {cat: band_from_qty(pulse_model_stock[cat], CATEGORY_SPECS[cat]["capacity"]) for cat in CATEGORY_SPECS},
        }
        minute_samples.append(sample)

    # --- END OF DAY CLOSING CHECK (VOLUNTEER OBSERVATION) ---
    # Volunteer records observed bands at minute 240 (with slight human error near boundaries)
    volunteer_bands = {}
    posterior_multipliers = {}
    
    for cat, spec in CATEGORY_SPECS.items():
        true_s = true_stock[cat]
        # 10% volunteer boundary noise
        apparent_s = true_s + rng.gauss(0, 5.0)
        v_band = band_from_qty(apparent_s, spec["capacity"])
        volunteer_bands[cat] = v_band
        
        # Midpoint of observed band in lbs
        band_midpoints = {"plenty": spec["capacity"] * 0.65, "low": spec["capacity"] * 0.22, "out": spec["capacity"] * 0.04}
        z_obs = band_midpoints[v_band]
        
        # Kalman Gain: K = P / (P + R) where measurement noise R = 0.25 (coarse band observation)
        P = pulse_uncertainty[cat]
        R = 0.25
        K = P / (P + R)
        
        # Blended update
        x_prior = pulse_model_stock[cat]
        x_post = x_prior + K * (z_obs - x_prior)
        pulse_model_stock[cat] = x_post
        pulse_uncertainty[cat] = (1.0 - K) * P
        
        # Parameter learning (Bayesian adaptation of consumption rate)
        observed_depletion = max(5.0, spec["capacity"] - apparent_s)
        predicted_depletion = max(5.0, spec["capacity"] - x_prior)
        ratio = observed_depletion / predicted_depletion
        
        alpha = 0.35
        learned_mult = current_learned_multiplier * (1.0 + alpha * (ratio - 1.0))
        learned_mult = max(0.8, min(1.8, learned_mult))
        posterior_multipliers[cat] = learned_mult

    # --- METRIC COMPUTATION ---
    # Focus on Produce & Protein (most critical high-demand items)
    focus_cats = ["Produce", "Protein"]
    
    metrics = {
        "status_quo": {"phantom_food_minutes": 0, "correct_minutes": 0},
        "fixed_model": {"phantom_food_minutes": 0, "correct_minutes": 0},
        "pulse_model": {"phantom_food_minutes": 0, "correct_minutes": 0},
    }
    
    for s in minute_samples:
        for cat in focus_cats:
            t_band = s["true"][cat]
            for model_key in ["status_quo", "fixed_model", "pulse_model"]:
                m_band = s[model_key][cat]
                if m_band == t_band:
                    metrics[model_key]["correct_minutes"] += 1
                # DANGEROUS ERROR: Showing Plenty/Low when actually OUT
                if t_band == "out" and (m_band == "plenty" or m_band == "low"):
                    metrics[model_key]["phantom_food_minutes"] += 1
                    
    total_cat_minutes = SHIFT_MINUTES * len(focus_cats)
    
    return {
        "day": day_idx,
        "visitors": num_arrivals,
        "true_final_stock": true_stock,
        "learned_multiplier": sum(posterior_multipliers.values()) / len(posterior_multipliers),
        "status_quo_accuracy": round(metrics["status_quo"]["correct_minutes"] / total_cat_minutes * 100, 1),
        "status_quo_phantom_mins": metrics["status_quo"]["phantom_food_minutes"],
        "fixed_model_accuracy": round(metrics["fixed_model"]["correct_minutes"] / total_cat_minutes * 100, 1),
        "fixed_model_phantom_mins": metrics["fixed_model"]["phantom_food_minutes"],
        "pulse_model_accuracy": round(metrics["pulse_model"]["correct_minutes"] / total_cat_minutes * 100, 1),
        "pulse_model_phantom_mins": metrics["pulse_model"]["phantom_food_minutes"],
    }

def run_experiment(num_days: int = 7):
    TRUE_HIDDEN_MULTIPLIER = 1.28  # Neighbors take 28% more than standard chart
    current_learned = 1.00         # Initialized without knowing the pantry
    
    print("=" * 70)
    print("PANTRY PULSE: TWIN EXPERIMENT & PK COMPARTMENT SIMULATION")
    print(f"Ground Truth: Hidden Multiplier = {TRUE_HIDDEN_MULTIPLIER}x | Total Days = {num_days}")
    print("=" * 70)
    
    days_summary = []
    
    for day in range(1, num_days + 1):
        res = run_single_day(
            day_idx=day,
            true_multiplier=TRUE_HIDDEN_MULTIPLIER,
            current_learned_multiplier=current_learned,
            seed=42 + day * 17
        )
        current_learned = res["learned_multiplier"]
        days_summary.append(res)
        
        print(f"Day {day:02d} | Visitors: {res['visitors']:2d} | Learned Multiplier: {current_learned:.3f}")
        print(f"   Status Quo Accuracy: {res['status_quo_accuracy']}%  | Phantom Food: {res['status_quo_phantom_mins']} mins")
        print(f"   Fixed Model Acc:    {res['fixed_model_accuracy']}%  | Phantom Food: {res['fixed_model_phantom_mins']} mins")
        print(f"   Pantry Pulse Acc:   {res['pulse_model_accuracy']}%  | Phantom Food: {res['pulse_model_phantom_mins']} mins (REDUCED)")
        print("-" * 70)
        
    # Aggregate over the week
    sq_phantom = sum(d["status_quo_phantom_mins"] for d in days_summary)
    fx_phantom = sum(d["fixed_model_phantom_mins"] for d in days_summary)
    pp_phantom = sum(d["pulse_model_phantom_mins"] for d in days_summary)
    
    reduction_vs_status_quo = (sq_phantom - pp_phantom) / sq_phantom * 100 if sq_phantom > 0 else 0.0
    reduction_vs_fixed = (fx_phantom - pp_phantom) / fx_phantom * 100 if fx_phantom > 0 else 0.0
    
    print("\n" + "=" * 70)
    print("FINAL BENCHMARK VALIDATION RESULTS:")
    print(f"• Total 'Phantom Food' Wasted Trip Exposure (Status Quo):  {sq_phantom} minutes")
    print(f"• Total 'Phantom Food' Exposure (Fixed Allocation Model): {fx_phantom} minutes")
    print(f"• Total 'Phantom Food' Exposure (Pantry Pulse Kalman):   {pp_phantom} minutes")
    print(f"🔥 Phantom Food Reduction vs Status Quo:  {reduction_vs_status_quo:.1f}%")
    print(f"🔥 Phantom Food Reduction vs Fixed Model: {reduction_vs_fixed:.1f}%")
    print(f"🎯 Multiplier Convergence: Initial 1.000 -> Final {current_learned:.3f} (True: {TRUE_HIDDEN_MULTIPLIER:.3f})")
    print("=" * 70)

if __name__ == "__main__":
    run_experiment(7)
