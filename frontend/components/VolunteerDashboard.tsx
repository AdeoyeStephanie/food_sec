'use client';

import React, { useState } from 'react';
import { Users, Camera, CheckSquare, Mic, Plus, Minus, Check, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface VolunteerDashboardProps {
  onExit?: () => void;
}

export default function VolunteerDashboard({ onExit }: VolunteerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'checkin' | 'donations' | 'closing'>('checkin');
  const [familiesServed, setFamiliesServed] = useState(23);
  const [lastCheckinToast, setLastCheckinToast] = useState<string | null>(null);

  // Quick run out flags
  const [outAlerts, setOutAlerts] = useState<string[]>([]);

  // Donations state
  const [donationCounts, setDonationCounts] = useState<{ [key: string]: number }>({
    'Canned vegetables': 2,
    'Cereal': 1,
    'Meat soup': 2,
  });
  const [donationsAddedNotice, setDonationsAddedNotice] = useState(false);

  // Closing check state
  const [closingGuesses, setClosingGuesses] = useState<{ [key: string]: 'plenty' | 'low' | 'out' }>({
    'Produce': 'plenty',
    'Protein': 'low',
    'Dairy': 'plenty',
    'Diapers': 'low',
    'Hygiene': 'out'
  });
  const [closingSaved, setClosingSaved] = useState(false);

  const handleHouseholdTap = (size: number) => {
    setFamiliesServed((prev) => prev + 1);
    setLastCheckinToast(`Household of ${size} checked in! Shelf predictions updated.`);
    setTimeout(() => setLastCheckinToast(null), 3000);
  };

  const toggleRunOut = (cat: string) => {
    if (outAlerts.includes(cat)) {
      setOutAlerts(outAlerts.filter((c) => c !== cat));
    } else {
      setOutAlerts([...outAlerts, cat]);
    }
  };

  return (
    <div className="bg-[#f2f6f4] min-h-[85vh] text-slate-800 rounded-3xl border border-emerald-900/10 shadow-xl flex flex-col justify-between overflow-hidden max-w-2xl mx-auto">
      {/* Top Header */}
      <div className="bg-white px-5 py-4 border-b border-emerald-900/10 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-full">
              Volunteer Mode
            </span>
            <span className="text-xs text-slate-500 font-medium">Code: 4827</span>
          </div>
          <h2 className="text-xl font-bold text-emerald-950 mt-0.5">Northside Family Pantry</h2>
        </div>
        {onExit && (
          <button
            onClick={onExit}
            className="text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl font-medium transition"
          >
            Exit to Client View
          </button>
        )}
      </div>

      {/* Main Tab Content */}
      <div className="p-5 md:p-6 flex-1 overflow-y-auto">
        {/* Toast Alert */}
        {lastCheckinToast && (
          <div className="mb-4 bg-emerald-900 text-white px-4 py-2.5 rounded-2xl text-xs flex items-center justify-between shadow-lg animate-bounce">
            <span>{lastCheckinToast}</span>
            <Check className="w-4 h-4 text-emerald-400" />
          </div>
        )}

        {/* TAB 1: CHECK-IN */}
        {activeTab === 'checkin' && (
          <div className="flex flex-col gap-6">
            {/* Counter Card */}
            <div className="bg-[#064e3b] text-white rounded-3xl p-5 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-200 font-medium">Families served today</p>
                <p className="text-4xl font-extrabold tracking-tight mt-1">{familiesServed}</p>
              </div>
              <p className="text-xs text-emerald-200/80 max-w-[160px] text-right">
                Tap a number each time a family checks in.
              </p>
            </div>

            {/* Household size pad */}
            <div>
              <h3 className="font-bold text-base text-emerald-950 mb-1">Tap the household size</h3>
              <p className="text-xs text-slate-500 mb-3">No names. Just the number of people in the household.</p>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleHouseholdTap(size)}
                    className="bg-white hover:bg-emerald-50 active:bg-emerald-100 border-2 border-slate-200 hover:border-emerald-600 rounded-2xl py-4 flex flex-col items-center justify-center font-bold text-2xl text-slate-800 shadow-sm transition active:scale-95"
                  >
                    {size === 8 ? '8+' : size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Run Out Flags */}
            <div className="bg-white rounded-2xl p-4 border border-emerald-900/10">
              <h4 className="font-bold text-sm text-emerald-950 mb-1">Did something just run out?</h4>
              <p className="text-xs text-slate-500 mb-3">One tap instantly notifies neighbors on the map.</p>
              <div className="flex flex-wrap gap-2">
                {['Produce', 'Protein', 'Dairy', 'Diapers', 'Hygiene'].map((cat) => {
                  const isOut = outAlerts.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleRunOut(cat)}
                      className={`text-xs px-3.5 py-2 rounded-xl font-semibold border transition ${
                        isOut
                          ? 'bg-rose-600 border-rose-700 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {cat} {isOut && '• Out'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Voice Assistant banner */}
            <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-emerald-600 py-3 rounded-2xl text-sm font-semibold text-slate-700 shadow-sm transition">
              <Mic className="w-4 h-4 text-emerald-700" />
              Ask the assistant or log by voice
            </button>
          </div>
        )}

        {/* TAB 2: DONATIONS IN */}
        {activeTab === 'donations' && (
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-xl font-bold text-emerald-950">Donations in</h3>
              <p className="text-xs text-slate-500">Snap the pile. We sort it into your categories.</p>
            </div>

            {/* Photo intake card */}
            <div className="bg-slate-800 text-white rounded-3xl p-5 flex flex-col items-center justify-center relative overflow-hidden min-h-[160px] border border-slate-700">
              <div className="flex gap-4 items-end mb-3">
                <div className="bg-emerald-800/80 px-3 py-2 rounded-xl text-center border border-emerald-500/40">
                  <span className="text-xs text-emerald-200 block font-medium">Vegetables</span>
                  <span className="text-lg font-bold">×2</span>
                </div>
                <div className="bg-amber-800/80 px-4 py-3 rounded-xl text-center border border-amber-500/40">
                  <span className="text-xs text-amber-200 block font-medium">Cereal</span>
                  <span className="text-xl font-bold">×1</span>
                </div>
                <div className="bg-rose-800/80 px-3 py-2 rounded-xl text-center border border-rose-500/40">
                  <span className="text-xs text-rose-200 block font-medium">Meat soup</span>
                  <span className="text-lg font-bold">×2</span>
                </div>
              </div>

              <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Photo is deleted immediately after sorting
              </div>
            </div>

            {/* Check the counts editable list */}
            <div className="bg-white rounded-2xl p-4 border border-emerald-900/10 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-emerald-950">Check the counts</h4>
                <span className="text-xs text-slate-400">Tap to fix anything</span>
              </div>

              {Object.entries(donationCounts).map(([item, count]) => (
                <div key={item} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <span className="text-sm font-semibold text-slate-800 block">{item}</span>
                    <span className="text-xs text-slate-400">
                      {item.includes('vegetables') ? 'Produce' : item.includes('soup') ? 'Protein' : 'Grains'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
                    <button
                      onClick={() => setDonationCounts({ ...donationCounts, [item]: Math.max(0, count - 1) })}
                      className="p-1 hover:bg-slate-200 rounded-lg text-slate-600 transition"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{count}</span>
                    <button
                      onClick={() => setDonationCounts({ ...donationCounts, [item]: count + 1 })}
                      className="p-1 hover:bg-slate-200 rounded-lg text-slate-600 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <button
              onClick={() => {
                setDonationsAddedNotice(true);
                setTimeout(() => setDonationsAddedNotice(false), 3000);
              }}
              className="bg-[#064e3b] text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-[#043d2e] shadow-sm transition active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {donationsAddedNotice ? '✓ Added to shelves!' : 'Add to shelves'}
            </button>

            <p className="text-xs text-center text-slate-500">
              Or just say it: <span className="italic font-medium">&quot;twelve meat soups in&quot;</span>
            </p>
          </div>
        )}

        {/* TAB 3: CLOSING CHECK (The Predict-and-Correct engine) */}
        {activeTab === 'closing' && (
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-xl font-bold text-emerald-950">Closing check</h3>
              <p className="text-xs text-slate-500">
                We guessed from today&apos;s 23 check-ins. Fix anything that looks off. About 10 seconds.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-4 border border-emerald-900/10 flex flex-col gap-4">
              {Object.entries(closingGuesses).map(([cat, currentBand]) => (
                <div key={cat} className="flex flex-col gap-1.5 pb-3 border-b border-slate-100 last:border-0">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-slate-900">{cat}</span>
                    <span className="text-[11px] text-slate-400 capitalize">Our guess: {currentBand}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {(['plenty', 'low', 'out'] as const).map((band) => {
                      const isSelected = currentBand === band;
                      return (
                        <button
                          key={band}
                          onClick={() => setClosingGuesses({ ...closingGuesses, [cat]: band })}
                          className={`py-2 text-xs font-bold rounded-xl border transition ${
                            isSelected
                              ? band === 'plenty'
                                ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                                : band === 'low'
                                ? 'bg-amber-700 text-white border-amber-800 shadow-sm'
                                : 'bg-rose-600 text-white border-rose-700 shadow-sm'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {band.charAt(0).toUpperCase() + band.slice(1)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setClosingSaved(true);
                setTimeout(() => setClosingSaved(false), 3000);
              }}
              className="bg-[#064e3b] text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-[#043d2e] shadow-sm transition active:scale-[0.98]"
            >
              {closingSaved ? '✓ Shelf updates published to Baltimore map!' : 'Send update'}
            </button>

            <button className="border border-rose-200 text-rose-700 hover:bg-rose-50 py-2.5 rounded-xl text-xs font-semibold transition">
              Closed next time? Let neighbors know
            </button>
          </div>
        )}
      </div>

      {/* Bottom Nav Bar matching Page 4/6 */}
      <div className="bg-white border-t border-emerald-900/10 px-6 py-3 flex justify-around items-center">
        <button
          onClick={() => setActiveTab('checkin')}
          className={`flex flex-col items-center gap-1 text-xs font-medium transition ${
            activeTab === 'checkin' ? 'text-emerald-800 font-bold scale-105' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Check-in</span>
        </button>

        <button
          onClick={() => setActiveTab('donations')}
          className={`flex flex-col items-center gap-1 text-xs font-medium transition ${
            activeTab === 'donations' ? 'text-emerald-800 font-bold scale-105' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Camera className="w-5 h-5" />
          <span>Donations in</span>
        </button>

        <button
          onClick={() => setActiveTab('closing')}
          className={`flex flex-col items-center gap-1 text-xs font-medium transition ${
            activeTab === 'closing' ? 'text-emerald-800 font-bold scale-105' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <CheckSquare className="w-5 h-5" />
          <span>Closing check</span>
        </button>
      </div>
    </div>
  );
}
