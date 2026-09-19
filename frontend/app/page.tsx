'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { BALTIMORE_PANTRIES, Pantry } from '@/lib/pantryData';
import PantryDetailSheet from '@/components/PantryDetailSheet';
import VolunteerDashboard from '@/components/VolunteerDashboard';
import {
  Search,
  Mic,
  PhoneCall,
  Sparkles,
  Navigation,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Languages,
  SlidersHorizontal,
  Clock,
  HeartHandshake
} from 'lucide-react';

// Dynamic import for Leaflet map to prevent SSR issues
const PantryMap = dynamic(() => import('@/components/PantryMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center text-slate-400 text-sm">
      Loading Baltimore Pantry Map...
    </div>
  ),
});

export default function Home() {
  // Navigation & Search State
  const [pantriesList, setPantriesList] = useState<Pantry[]>(BALTIMORE_PANTRIES);
  const [hasSearched, setHasSearched] = useState(false);
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [selectedPantry, setSelectedPantry] = useState<Pantry | null>(null);
  const [isVolunteerMode, setIsVolunteerMode] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Filter chips
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleUpdateInventory = (category: string, band: 'plenty' | 'low' | 'out') => {
    setPantriesList((prev) =>
      prev.map((p) => {
        if (p.name.includes('Northside')) {
          const updatedItems = p.shelf_items.map((it) =>
            it.category_name.toLowerCase() === category.toLowerCase()
              ? { ...it, band, minutes_ago: 1 }
              : it
          );
          const updatedPantry = { ...p, shelf_items: updatedItems };
          if (selectedPantry?.id === p.id) {
            setSelectedPantry(updatedPantry);
          }
          return updatedPantry;
        }
        return p;
      })
    );
  };

  // Speech recognition handler
  const handleVoiceSearch = () => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'es' ? 'es-ES' : 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleExecuteSearch(transcript);
      };
      recognition.start();
    } else {
      // Fallback
      setQuery('diapers near Hampden after 6pm');
      handleExecuteSearch('diapers near Hampden after 6pm');
    }
  };

  const handleExecuteSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setHasSearched(true);
    // Select first matching pantry automatically for detail view on desktop
    setSelectedPantry(BALTIMORE_PANTRIES[0]);
  };

  // Filtered Pantries
  const filteredPantries = useMemo(() => {
    let list = [...pantriesList];
    const q = query.toLowerCase();

    if (q.includes('hampden') || activeFilter === 'hampden') {
      list = list.filter((p) => p.neighborhood === 'Hampden' || p.name.includes('Northside'));
    }
    if (q.includes('tonight') || activeFilter === 'tonight') {
      list = list.filter((p) => p.open_tonight);
    }
    if (q.includes('no id') || activeFilter === 'no_id') {
      list = list.filter((p) => !p.requires_id);
    }
    if (q.includes('formula') || q.includes('diaper')) {
      list = list.filter((p) =>
        p.shelf_items.some((item) => item.category_name.toLowerCase().includes('diaper') && item.band !== 'out')
      );
    }
    if (q.includes('produce') || activeFilter === 'produce') {
      list = list.filter((p) =>
        p.shelf_items.some((item) => item.category_name === 'Produce' && item.band === 'plenty')
      );
    }

    return list.length > 0 ? list : pantriesList;
  }, [query, activeFilter, pantriesList]);

  // Conversational response synthesis
  const conversationalSummary = useMemo(() => {
    const q = query.toLowerCase();
    if (q.includes('hampden') || q.includes('diaper') || q.includes('halal')) {
      return (
        <span>
          Two pantries near Hampden are open after 6 tonight.{' '}
          <strong className="text-emerald-950">Northside Family Pantry</strong> has both diapers and halal items in stock.
        </span>
      );
    }
    if (q.includes('produce')) {
      return (
        <span>
          Found <strong className="text-emerald-950">3 pantries with Plenty of fresh produce</strong> on shelves right now in Baltimore.
        </span>
      );
    }
    if (q.includes('tonight')) {
      return (
        <span>
          Found <strong className="text-emerald-950">2 pantries open tonight</strong> with walk-in availability.
        </span>
      );
    }
    return (
      <span>
        Showing verified pantries near Baltimore with real-time stock estimates.
      </span>
    );
  }, [query]);

  // If volunteer mode is enabled, display Volunteer Dashboard
  if (isVolunteerMode) {
    return (
      <main className="min-h-screen bg-[#e9f1ed] p-3 md:p-8">
        <VolunteerDashboard
          onExit={() => setIsVolunteerMode(false)}
          onUpdateInventory={handleUpdateInventory}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f7f5] text-slate-900 flex flex-col justify-between">
      {/* Top Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-950/10 sticky top-0 z-30 px-4 md:px-8 py-3.5 flex justify-between items-center">
        <div
          onClick={() => {
            setHasSearched(false);
            setQuery('');
            setSelectedPantry(null);
          }}
          className="cursor-pointer flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-xl bg-[#064e3b] text-white flex items-center justify-center font-bold text-base shadow-sm">
            B
          </div>
          <div>
            <h1 className="font-extrabold text-base md:text-lg tracking-tight text-emerald-950 leading-none">
              Find Food Baltimore
            </h1>
            <span className="text-[11px] text-slate-500 font-medium">Live Shelf Stock &amp; Pantries</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Volunteer Toggle Button */}
          <button
            onClick={() => setIsVolunteerMode(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-full transition shadow-xs"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pantry Volunteer</span> Mode
          </button>

          {/* Language Switch */}
          <div className="bg-slate-100 p-0.5 rounded-full flex text-xs font-semibold">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full transition ${
                language === 'en' ? 'bg-[#064e3b] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`px-3 py-1 rounded-full transition ${
                language === 'es' ? 'bg-[#064e3b] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Español
            </button>
          </div>
        </div>
      </header>

      {/* VIEW 1: LANDING PAGE (Page 1 in Mockups) */}
      {!hasSearched ? (
        <div className="max-w-xl mx-auto w-full px-4 py-8 md:py-14 flex flex-col gap-8">
          {/* Main Hero Question */}
          <div className="flex flex-col gap-2.5">
            <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-950 tracking-tight">
              What do you need today?
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Say it however you would to a friend. We&apos;ll find pantries near you that have it right now.
            </p>
          </div>

          {/* Search Box */}
          <div className="flex flex-col gap-3">
            <label htmlFor="search-input" className="font-bold text-sm text-emerald-950">
              Tell us what you need
            </label>
            <div className="relative">
              <input
                id="search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleExecuteSearch(query || 'diapers near Hampden after 6pm')}
                placeholder="diapers near Hampden after 6pm"
                className="w-full bg-white text-slate-800 text-base placeholder:text-slate-400 border-2 border-slate-200 focus:border-[#064e3b] rounded-2xl py-4 pl-4 pr-12 outline-none transition shadow-sm"
              />
              <button
                type="button"
                onClick={handleVoiceSearch}
                className={`absolute right-3.5 top-3.5 p-2 rounded-xl transition ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'text-slate-400 hover:text-emerald-900 hover:bg-slate-100'
                }`}
                title="Voice search"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => handleExecuteSearch(query || 'diapers near Hampden after 6pm')}
              className="w-full bg-[#064e3b] hover:bg-[#043d2e] active:scale-[0.99] text-white font-bold text-base py-4 rounded-2xl transition shadow-md flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Find food
            </button>
          </div>

          {/* Preset Chips */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs text-slate-500 font-semibold">Or try one of these</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Baby formula near me', q: 'baby formula near me' },
                { label: 'Open tonight', q: 'open tonight after 6pm' },
                { label: 'No ID needed', q: 'pantries with no ID needed' },
                { label: 'Fresh produce', q: 'fresh produce available' },
              ].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => handleExecuteSearch(chip.q)}
                  className="bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-500 text-slate-800 text-xs font-medium px-4 py-2.5 rounded-full transition shadow-xs active:scale-95"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hotline Card */}
          <div className="bg-[#1e293b] text-white rounded-3xl p-5 shadow-lg flex items-center gap-4 border border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-slate-700/80 flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">No data? Just call.</h3>
              <p className="text-xs text-slate-300 mt-0.5 font-medium">
                (410) 555-FOOD, any time, English or Spanish
              </p>
            </div>
          </div>

          {/* Dignity Guarantee */}
          <p className="text-xs text-center text-slate-500 font-medium">
            No account needed. We don&apos;t save what you type.
          </p>
        </div>
      ) : (
        /* VIEW 2: MAP & RESULTS VIEW (Page 3 in Mockups) */
        <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-65px)] overflow-hidden">
          {/* Left Column: Search summary & Pantry list */}
          <div className="w-full md:w-5/12 lg:w-4/12 h-full flex flex-col border-r border-emerald-900/10 bg-white overflow-y-auto">
            {/* Top Query Re-Search Bar */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-2 sticky top-0 bg-white z-10">
              <button
                onClick={() => setHasSearched(false)}
                className="p-2 text-slate-500 hover:text-emerald-950 hover:bg-slate-100 rounded-xl transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleExecuteSearch(query)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium text-slate-800 outline-none focus:border-emerald-700"
                />
              </div>
            </div>

            <div className="p-4 flex flex-col gap-4">
              {/* AI Conversational Summary Bubble matching Page 3 */}
              <div className="bg-[#f0fdf4] border border-emerald-300/60 rounded-2xl p-3.5 text-xs text-emerald-900 flex items-start gap-2.5 shadow-xs">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>{conversationalSummary}</div>
              </div>

              {/* Header with Result Count */}
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-emerald-950">
                  {filteredPantries.length} matches open today
                </h3>
                <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                  Sample data
                </span>
              </div>

              {/* Pantry Cards matching Mockup */}
              <div className="flex flex-col gap-3">
                {filteredPantries.map((pantry, idx) => {
                  const isSelected = selectedPantry?.id === pantry.id;
                  return (
                    <div
                      key={pantry.id}
                      onClick={() => setSelectedPantry(pantry)}
                      className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 ${
                        isSelected
                          ? 'border-emerald-800 bg-emerald-50/40 shadow-md ring-1 ring-emerald-700'
                          : 'border-slate-200 bg-white hover:border-emerald-300 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            <h4 className="font-bold text-sm text-emerald-950 leading-snug">
                              {pantry.name}
                            </h4>
                            <p className="text-xs text-slate-500">
                              {pantry.distance_miles} miles, about {pantry.walk_minutes} minutes walking
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 text-xs font-semibold text-emerald-800">
                        {pantry.hours_text}
                      </div>

                      {/* Prominent category badges */}
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {pantry.shelf_items.slice(3, 5).map((item, i) => (
                          <div
                            key={i}
                            className={`px-2.5 py-1 rounded-xl text-xs flex items-center justify-between font-semibold ${
                              item.band === 'plenty'
                                ? 'bg-emerald-100/70 text-emerald-800'
                                : item.band === 'low'
                                ? 'bg-amber-100/70 text-amber-800'
                                : 'bg-rose-100/70 text-rose-800'
                            }`}
                          >
                            <span>{item.category_name}</span>
                            <span className="capitalize text-[11px]">
                              {item.band === 'plenty' ? 'Plenty' : item.band === 'low' ? 'Low' : 'Out'}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Card Footer */}
                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Updated 40 min ago
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPantry(pantry);
                            }}
                            className="text-xs font-bold text-slate-700 hover:text-emerald-900 px-2.5 py-1 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
                          >
                            Details
                          </button>
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${pantry.lat},${pantry.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-bold text-white px-2.5 py-1 bg-[#064e3b] rounded-lg hover:bg-[#043d2e] transition flex items-center gap-1"
                          >
                            <Navigation className="w-3 h-3" />
                            Directions
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map & Detail Panel */}
          <div className="flex-1 relative h-full flex flex-col md:flex-row bg-[#f8faf9]">
            {/* Map Container */}
            <div className="flex-1 h-full min-h-[350px]">
              <PantryMap
                pantries={filteredPantries}
                selectedPantry={selectedPantry}
                onSelectPantry={(p) => setSelectedPantry(p)}
              />
            </div>

            {/* Slide-over Detail Sheet (shown on desktop beside map, or as a sheet on mobile) */}
            {selectedPantry && (
              <div className="w-full md:w-[420px] lg:w-[450px] h-full p-3 md:p-4 shrink-0 overflow-y-auto z-20">
                <PantryDetailSheet
                  pantry={selectedPantry}
                  onClose={() => setSelectedPantry(null)}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
