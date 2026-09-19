'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import VolunteerDashboard from '@/components/VolunteerDashboard';
import { Lock, ArrowLeft, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function VolunteerPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  // Mock pantry code from Page 4 mockup is "4827" (or any 4 digits for demo convenience)
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '4827' || pin === '1234' || pin.length === 4) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#e9f1ed] p-3 md:p-8">
        <VolunteerDashboard
          onExit={() => setIsAuthenticated(false)}
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
        <span className="text-xs text-slate-500 font-medium">Pantry Portal</span>
      </div>

      {/* Login Card matching Page 4 Volunteer Code */}
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-emerald-900/10 flex flex-col gap-6">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-900 mb-1">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-950">Pantry Volunteer Portal</h2>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
            Enter your 4-digit pantry access code to manage check-ins, snap donations, and publish shelf updates.
          </p>
        </div>

        <form onSubmit={handlePinSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 text-center">
              Volunteer Code
            </label>
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="••••"
              className="w-full text-center text-3xl font-mono tracking-widest py-3 border-2 border-slate-200 rounded-2xl focus:border-emerald-700 outline-none transition"
              autoFocus
            />
            {error && (
              <p className="text-xs text-rose-600 text-center mt-1.5 font-medium">
                Invalid code. (Hint for demo: try <span className="font-mono font-bold">4827</span>)
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#064e3b] hover:bg-[#043d2e] active:scale-[0.99] text-white font-bold text-sm py-3.5 rounded-2xl transition shadow-md flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Enter Pantry Dashboard
          </button>
        </form>

        <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
          <span>Active Pantry:</span>
          <span className="font-semibold text-emerald-950">Northside Family Pantry</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-slate-400 py-4 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
        Find Food Baltimore • Secure Pantry Network
      </div>
    </main>
  );
}
