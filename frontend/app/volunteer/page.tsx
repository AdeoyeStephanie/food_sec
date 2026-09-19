'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import VolunteerDashboard from '@/components/VolunteerDashboard';
import { BALTIMORE_PANTRIES, Pantry } from '@/lib/pantryData';
import { getStoredPantries, saveAndBroadcastPantries } from '@/lib/inventorySync';
import { Lock, ArrowLeft, ShieldCheck, Building2, KeyRound, AlertCircle } from 'lucide-react';

export default function VolunteerPage() {
  const [pantriesList, setPantriesList] = useState<Pantry[]>(BALTIMORE_PANTRIES);
  const [selectedPantryId, setSelectedPantryId] = useState<string>(BALTIMORE_PANTRIES[0].id);
  const [authenticatedPantry, setAuthenticatedPantry] = useState<Pantry | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    setPantriesList(getStoredPantries(BALTIMORE_PANTRIES));
  }, []);

  const currentPantry = pantriesList.find((p) => p.id === selectedPantryId) || pantriesList[0];

  const handleUpdateFullPantry = (updatedPantry: Pantry) => {
    setPantriesList((prev) => {
      const nextList = prev.map((p) => (p.id === updatedPantry.id ? updatedPantry : p));
      saveAndBroadcastPantries(nextList);
      return nextList;
    });
    setAuthenticatedPantry(updatedPantry);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const validPins = ['2026', '1234', '7789', '4827'];
      if (validPins.includes(pin)) {
        setAuthenticatedPantry(currentPantry);
        setIsAuthenticated(true);
      } else {
        setError('Invalid operator PIN for this pantry.');
      }
    }, 350);
  };

  if (isAuthenticated && authenticatedPantry) {
    return (
      <main className="min-h-screen bg-[#e9f1ed] p-3 md:p-8">
        <VolunteerDashboard
          activePantry={authenticatedPantry}
          onExit={() => {
            setIsAuthenticated(false);
            setAuthenticatedPantry(null);
            setPin('');
          }}
          onUpdateFullPantry={handleUpdateFullPantry}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f2f6f4] flex flex-col justify-between p-4 md:p-8">
      {/* Top Bar */}
      <div className="max-w-md mx-auto w-full flex justify-between items-center py-2">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-900 bg-white border border-emerald-950/10 px-3 py-1.5 rounded-full hover:bg-slate-50 transition shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Neighbor App
        </Link>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/60 px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Pantry View Portal</span>
        </div>
      </div>

      {/* Login Card */}
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-emerald-900/10 flex flex-col gap-6">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-13 h-13 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-900 shadow-inner">
            <Lock className="w-6 h-6 text-emerald-800" />
          </div>
          <h2 className="text-2xl font-black text-emerald-950 tracking-tight">Pantry View Login</h2>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
            Staff &amp; Operator Access for live inventory intake, household check-in, and TEFAP compliance.
          </p>
        </div>

        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
          {/* Pantry Location Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              Select Your Pantry Location
            </label>
            <div className="relative">
              <select
                value={selectedPantryId}
                onChange={(e) => {
                  setSelectedPantryId(e.target.value);
                  setError(null);
                }}
                className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 font-medium focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none transition appearance-none cursor-pointer"
              >
                {BALTIMORE_PANTRIES.map((pantry) => (
                  <option key={pantry.id} value={pantry.id}>
                    {pantry.name} ({pantry.neighborhood})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 truncate">
              {currentPantry.address}
            </p>
          </div>

          {/* Secure Operator PIN */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-emerald-700" />
                Operator 4-Digit PIN
              </span>
            </label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(null);
              }}
              placeholder="••••"
              className="w-full text-center text-3xl font-mono tracking-widest py-2.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-emerald-700 focus:bg-white outline-none transition shadow-inner"
              autoFocus
            />
            {error && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || pin.length < 4}
            className="w-full mt-1 bg-[#064e3b] hover:bg-[#043d2e] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none text-white font-bold text-sm py-3.5 rounded-2xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="inline-block animate-spin mr-1">⏳</span>
            ) : (
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
            )}
            Enter Pantry View
          </button>
        </form>

        <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500">
          <span>Active Location:</span>
          <span className="font-semibold text-emerald-950 truncate max-w-[200px]">
            {currentPantry.name}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-slate-400 py-4 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>PantryPulse Operating Network • Baltimore City</span>
      </div>
    </main>
  );
}
