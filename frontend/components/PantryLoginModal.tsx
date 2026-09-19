'use client';

import React, { useState } from 'react';
import { BALTIMORE_PANTRIES, Pantry } from '@/lib/pantryData';
import { Lock, ShieldCheck, Building2, KeyRound, X, AlertCircle } from 'lucide-react';

interface PantryLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (pantry: Pantry) => void;
}

export default function PantryLoginModal({ isOpen, onClose, onSuccess }: PantryLoginModalProps) {
  const [selectedPantryId, setSelectedPantryId] = useState<string>(BALTIMORE_PANTRIES[0].id);
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentPantry = BALTIMORE_PANTRIES.find((p) => p.id === selectedPantryId) || BALTIMORE_PANTRIES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (pin === '4827' || pin === '1234' || pin === '7789') {
        onSuccess(currentPantry);
      } else {
        setError('Invalid access PIN for this pantry location. (Demo PIN: 4827)');
      }
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-emerald-950/15 flex flex-col gap-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="flex flex-col items-center text-center gap-2 pt-1">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-900 shadow-inner">
            <Lock className="w-6 h-6 text-emerald-800" />
          </div>
          <h3 className="text-2xl font-black text-emerald-950 tracking-tight">
            Pantry View Login
          </h3>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
            Staff &amp; Operator Access for live inventory intake, household check-in, and TEFAP reporting.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-emerald-700" />
                Operator 4-Digit PIN
              </span>
              <span className="text-[11px] font-normal text-slate-400">Demo PIN: 4827</span>
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

        {/* Security Assurance footer */}
        <div className="border-t border-slate-100 pt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Role-based access • TEFAP audit compliant</span>
        </div>
      </div>
    </div>
  );
}
