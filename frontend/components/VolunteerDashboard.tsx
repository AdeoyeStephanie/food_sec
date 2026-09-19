'use client';

import React, { useState, useRef } from 'react';
import { Users, Camera, CheckSquare, Mic, Plus, Minus, Check, ShieldCheck, Upload, Sparkles, Loader2, Image as ImageIcon, Video } from 'lucide-react';
import { Pantry } from '@/lib/pantryData';
import CameraViewfinder from '@/components/CameraViewfinder';

interface VolunteerDashboardProps {
  activePantry?: Pantry | null;
  onExit?: () => void;
  onUpdateInventory?: (category: string, band: 'plenty' | 'low' | 'out') => void;
}

export default function VolunteerDashboard({ activePantry, onExit, onUpdateInventory }: VolunteerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'checkin' | 'donations' | 'closing'>('checkin');
  const [familiesServed, setFamiliesServed] = useState(23);
  const [lastCheckinToast, setLastCheckinToast] = useState<string | null>(null);

  // Quick run out flags
  const [outAlerts, setOutAlerts] = useState<string[]>([]);

  // Donations state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showLiveCamera, setShowLiveCamera] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedImagePreview, setScannedImagePreview] = useState<string | null>(null);
  const [donationCounts, setDonationCounts] = useState<{ [key: string]: { count: number; category: string } }>({
    'Canned green beans': { count: 4, category: 'Produce' },
    'Cereal box': { count: 2, category: 'Grains' },
    'Meat soup': { count: 3, category: 'Protein' },
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
      if (onUpdateInventory) onUpdateInventory(cat, 'low');
    } else {
      setOutAlerts([...outAlerts, cat]);
      if (onUpdateInventory) onUpdateInventory(cat, 'out');
    }
  };

  // AI Scanning handler
  const handleScanDonation = async (presetOrFile: string | File) => {
    setIsScanning(true);
    try {
      const formData = new FormData();
      if (typeof presetOrFile === 'string') {
        formData.append('preset', presetOrFile);
      } else {
        formData.append('image', presetOrFile);
        const reader = new FileReader();
        reader.onload = (e) => setScannedImagePreview(e.target?.result as string);
        reader.readAsDataURL(presetOrFile);
      }

      const res = await fetch('/api/scan-donation', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.items && Array.isArray(data.items)) {
        const newCounts: { [key: string]: { count: number; category: string } } = {};
        data.items.forEach((it: any) => {
          newCounts[it.name] = { count: it.count || 1, category: it.category || 'General' };
        });
        setDonationCounts(newCounts);
      }
    } catch (err) {
      console.error('Scan error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleApplyDonations = () => {
    setDonationsAddedNotice(true);
    // If any categories were added, bump their stock
    Object.values(donationCounts).forEach(({ category }) => {
      if (onUpdateInventory && ['Produce', 'Protein', 'Dairy', 'Diapers', 'Grains'].includes(category)) {
        onUpdateInventory(category, 'plenty');
      }
    });
    setTimeout(() => setDonationsAddedNotice(false), 3000);
  };

  return (
    <div className="bg-[#f2f6f4] min-h-[85vh] text-slate-800 rounded-3xl border border-emerald-900/10 shadow-xl flex flex-col justify-between overflow-hidden max-w-2xl mx-auto">
      {/* Top Header */}
      <div className="bg-white px-5 py-4 border-b border-emerald-900/10 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              Pantry View
            </span>
            <span className="text-xs text-slate-500 font-medium">Verified Operator Session</span>
          </div>
          <h2 className="text-xl font-bold text-emerald-950 mt-0.5">
            {activePantry?.name || 'Northside Family Pantry'}
          </h2>
          {activePantry?.neighborhood && (
            <span className="text-xs text-slate-400 font-medium">{activePantry.neighborhood}, Baltimore</span>
          )}
        </div>
        {onExit && (
          <button
            onClick={onExit}
            className="text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer"
          >
            ← Exit to Neighbor View
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

        {/* TAB 2: DONATIONS IN (GEMINI MULTIMODAL INTAKE) */}
        {activeTab === 'donations' && (
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-emerald-950">Donations in</h3>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  Gemini Vision
                </span>
              </div>
              <p className="text-xs text-slate-500">Snap the pile. We sort it into your categories.</p>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleScanDonation(e.target.files[0]);
                }
              }}
            />

            {/* Live Camera Viewfinder or Photo Intake Card */}
            {showLiveCamera ? (
              <CameraViewfinder
                onCapture={(file) => {
                  setShowLiveCamera(false);
                  handleScanDonation(file);
                }}
                onClose={() => setShowLiveCamera(false)}
              />
            ) : (
              <div className="bg-slate-900 text-white rounded-3xl p-5 flex flex-col items-center justify-center relative overflow-hidden min-h-[170px] border border-slate-700">
                {isScanning ? (
                  <div className="flex flex-col items-center gap-2 py-4">
                    <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                    <span className="text-xs text-emerald-200 font-semibold animate-pulse">
                      Gemini 3.6 Flash analyzing groceries...
                    </span>
                  </div>
                ) : (
                  <>
                    {scannedImagePreview ? (
                      <img
                        src={scannedImagePreview}
                        alt="Donation preview"
                        className="max-h-32 object-contain rounded-xl mb-2"
                      />
                    ) : (
                      <div className="flex gap-3 items-end mb-3">
                        <div className="bg-emerald-800/90 px-3 py-2 rounded-xl text-center border border-emerald-500/40">
                          <span className="text-[11px] text-emerald-200 block font-medium">Produce</span>
                          <span className="text-base font-bold">×4</span>
                        </div>
                        <div className="bg-amber-800/90 px-3 py-2.5 rounded-xl text-center border border-amber-500/40">
                          <span className="text-[11px] text-amber-200 block font-medium">Grains</span>
                          <span className="text-lg font-bold">×2</span>
                        </div>
                        <div className="bg-rose-800/90 px-3 py-2 rounded-xl text-center border border-rose-500/40">
                          <span className="text-[11px] text-rose-200 block font-medium">Protein</span>
                          <span className="text-base font-bold">×3</span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap justify-center gap-2 mb-2">
                      <button
                        onClick={() => setShowLiveCamera(true)}
                        className="bg-[#10b981] hover:bg-[#059669] text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition active:scale-95 shadow-md"
                      >
                        <Camera className="w-4 h-4 text-slate-950" />
                        Open Live Camera
                      </button>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-semibold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition active:scale-95"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Upload File
                      </button>
                    </div>

                    <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-slate-300 flex items-center gap-1.5 mt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Photo is deleted immediately after sorting
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Quick Presets for Instant Demo */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-slate-500 font-semibold">Or test with demo sample boxes:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleScanDonation('canned_box')}
                  className="bg-white hover:bg-emerald-50 border border-slate-200 rounded-xl p-2 text-left text-xs transition"
                >
                  🥫 <span className="font-semibold block text-slate-800">Canned Box</span>
                  <span className="text-[10px] text-slate-400">Beans &amp; Soups</span>
                </button>
                <button
                  onClick={() => handleScanDonation('produce_crate')}
                  className="bg-white hover:bg-emerald-50 border border-slate-200 rounded-xl p-2 text-left text-xs transition"
                >
                  🥕 <span className="font-semibold block text-slate-800">Produce Crate</span>
                  <span className="text-[10px] text-slate-400">Apples &amp; Carrots</span>
                </button>
                <button
                  onClick={() => handleScanDonation('baby_essentials')}
                  className="bg-white hover:bg-emerald-50 border border-slate-200 rounded-xl p-2 text-left text-xs transition"
                >
                  🍼 <span className="font-semibold block text-slate-800">Baby Box</span>
                  <span className="text-[10px] text-slate-400">Diapers &amp; Formula</span>
                </button>
              </div>
            </div>

            {/* Check the counts editable list */}
            <div className="bg-white rounded-2xl p-4 border border-emerald-900/10 flex flex-col gap-3 shadow-xs">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-emerald-950">Check the counts</h4>
                <span className="text-xs text-slate-400">Tap to fix anything</span>
              </div>

              {Object.entries(donationCounts).map(([item, { count, category }]) => (
                <div key={item} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <span className="text-sm font-semibold text-slate-800 block">{item}</span>
                    <span className="text-xs text-emerald-800 font-medium">{category}</span>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
                    <button
                      onClick={() =>
                        setDonationCounts({
                          ...donationCounts,
                          [item]: { count: Math.max(0, count - 1), category }
                        })
                      }
                      className="p-1 hover:bg-slate-200 rounded-lg text-slate-600 transition"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{count}</span>
                    <button
                      onClick={() =>
                        setDonationCounts({
                          ...donationCounts,
                          [item]: { count: count + 1, category }
                        })
                      }
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
              onClick={handleApplyDonations}
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

            <div className="bg-white rounded-3xl p-4 border border-emerald-900/10 flex flex-col gap-4 shadow-xs">
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
                          onClick={() => {
                            setClosingGuesses({ ...closingGuesses, [cat]: band });
                            if (onUpdateInventory) onUpdateInventory(cat, band);
                          }}
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
