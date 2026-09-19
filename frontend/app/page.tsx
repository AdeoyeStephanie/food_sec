'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { BALTIMORE_PANTRIES, Pantry } from '@/lib/pantryData';
import PantryDetailSheet from '@/components/PantryDetailSheet';
import VolunteerDashboard from '@/components/VolunteerDashboard';
import PantryLoginModal from '@/components/PantryLoginModal';
import { Language, TRANSLATIONS } from '@/lib/translations';
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
  HeartHandshake,
  Lock
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
  const [language, setLanguage] = useState<Language>('en');
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [selectedPantry, setSelectedPantry] = useState<Pantry | null>(null);
  const [isVolunteerMode, setIsVolunteerMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authenticatedPantry, setAuthenticatedPantry] = useState<Pantry | null>(null);
  const [isListening, setIsListening] = useState(false);

  // Filter chips
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleRegisterNewPantry = (newPantry: Pantry) => {
    setPantriesList((prev) => [newPantry, ...prev]);
    setSelectedPantry(newPantry);
  };

  const handleUpdateInventory = (category: string, band: 'plenty' | 'low' | 'out') => {
    const targetId = authenticatedPantry?.id;
    setPantriesList((prev) =>
      prev.map((p) => {
        if ((targetId && p.id === targetId) || (!targetId && p.name.includes('Northside'))) {
          const updatedItems = (p.shelf_items || []).map((it) =>
            it.category_name.toLowerCase() === category.toLowerCase()
              ? { ...it, band, minutes_ago: 1 }
              : it
          );
          const updatedPantry = { ...p, shelf_items: updatedItems };
          if (selectedPantry?.id === p.id) {
            setSelectedPantry(updatedPantry);
          }
          if (authenticatedPantry?.id === p.id) {
            setAuthenticatedPantry(updatedPantry);
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
    const q = query.trim().toLowerCase();

    if (!q && !activeFilter) return pantriesList;

    if (activeFilter === 'tonight') {
      list = list.filter((p) => p.open_tonight);
    } else if (activeFilter === 'no_id') {
      list = list.filter((p) => !p.requires_id);
    } else if (activeFilter === 'produce') {
      list = list.filter((p) =>
        p.shelf_items?.some((item) => item.category_name.toLowerCase().includes('produce') && item.band === 'plenty')
      );
    }

    if (q) {
      list = list.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(q);
        const neighborhoodMatch = p.neighborhood.toLowerCase().includes(q);
        const addressMatch = p.address.toLowerCase().includes(q);
        const notesMatch = p.notes.toLowerCase().includes(q);
        const categoryMatch = p.shelf_items?.some((item) => 
          item.category_name.toLowerCase().includes(q)
        );
        const zipMatch = p.address.includes(q) || (q.match(/\b\d{5}\b/) && p.address.includes(q.match(/\b\d{5}\b/)![0]));
        const toniteMatch = (q.includes('tonight') || q.includes('tonite') || q.includes('open')) && p.open_tonight;
        const noIdMatch = (q.includes('no id') || q.includes('without id')) && !p.requires_id;

        return nameMatch || neighborhoodMatch || addressMatch || zipMatch || notesMatch || categoryMatch || toniteMatch || noIdMatch;
      });
    }

    return list;
  }, [query, activeFilter, pantriesList]);

  // Conversational response synthesis
  const conversationalSummary = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return (
        <span>
          Showing verified pantries across Baltimore with live stock estimates.
        </span>
      );
    }
    if (filteredPantries.length === 0) {
      return (
        <span>
          No direct pantries located matching &ldquo;<strong>{query}</strong>&rdquo;. Try searching by nearby neighborhoods like <em>Hampden</em>, <em>Old Goucher</em>, <em>Downtown</em>, or zip codes like <em>21211</em>, <em>21218</em>, <em>21220</em>.
        </span>
      );
    }
    if (q.includes('21220') || q.includes('middle river')) {
      return (
        <span>
          Found <strong className="text-emerald-950">{filteredPantries.length} emergency food sites serving zip code 21220</strong> (Middle River / Eastern Baltimore).
        </span>
      );
    }
    if (q.includes('hampden') || q.includes('diaper') || q.includes('halal')) {
      return (
        <span>
          Found pantries open near Hampden.{' '}
          <strong className="text-emerald-950">Northside Family Pantry</strong> has both diapers and halal items in stock.
        </span>
      );
    }
    if (q.includes('produce')) {
      return (
        <span>
          Found <strong className="text-emerald-950">{filteredPantries.length} pantries with fresh produce</strong> on shelves right now in Baltimore.
        </span>
      );
    }
    if (q.includes('tonight')) {
      return (
        <span>
          Found <strong className="text-emerald-950">{filteredPantries.length} pantries open tonight</strong> with walk-in availability.
        </span>
      );
    }
    return (
      <span>
        Found <strong className="text-emerald-950">{filteredPantries.length} verified locations</strong> matching your search in Baltimore.
      </span>
    );
  }, [query, filteredPantries]);

  if (isVolunteerMode) {
    return (
      <main className="min-h-screen bg-[#e9f1ed] p-3 md:p-8">
        <VolunteerDashboard
          activePantry={authenticatedPantry}
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
              {t.appName}
            </h1>
            <span className="text-[11px] text-slate-500 font-medium">{t.appSubtitle}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Secure Pantry View Access */}
          <button
            onClick={() => setShowLoginModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-950 bg-emerald-100/90 hover:bg-emerald-200 border border-emerald-300 px-3.5 py-1.5 rounded-full transition shadow-xs cursor-pointer active:scale-95"
            title="Secure Staff & Operator Login"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-800" />
            <span>{t.pantryView}</span>
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
              {t.heroTitle}
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {t.heroSubtitle}
            </p>
          </div>

          {/* Search Box */}
          <div className="flex flex-col gap-3">
            <label htmlFor="search-input" className="font-bold text-sm text-emerald-950">
              {t.searchLabel}
            </label>
            <div className="relative">
              <input
                id="search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleExecuteSearch(query || t.searchPlaceholder)}
                placeholder={t.searchPlaceholder}
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
                title={language === 'es' ? 'Búsqueda por voz' : 'Voice search'}
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => handleExecuteSearch(query || t.searchPlaceholder)}
              className="w-full bg-[#064e3b] hover:bg-[#043d2e] active:scale-[0.99] text-white font-bold text-base py-4 rounded-2xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-5 h-5" />
              {t.findFoodBtn}
            </button>
          </div>

          {/* Preset Chips */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs text-slate-500 font-semibold">{t.presetTitle}</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: t.presets.formula, q: language === 'es' ? 'formula para bebe' : 'baby formula near me' },
                { label: t.presets.tonight, q: language === 'es' ? 'abierto esta noche' : 'open tonight after 6pm' },
                { label: t.presets.noId, q: language === 'es' ? 'sin identificacion' : 'pantries with no ID needed' },
                { label: t.presets.produce, q: language === 'es' ? 'frutas y verduras' : 'fresh produce available' },
              ].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => handleExecuteSearch(chip.q)}
                  className="bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-500 text-slate-800 text-xs font-medium px-4 py-2.5 rounded-full transition shadow-xs active:scale-95 cursor-pointer"
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
              <h3 className="font-bold text-sm text-white">{t.hotlineTitle}</h3>
              <p className="text-xs text-slate-300 mt-0.5 font-medium">
                {t.hotlineSubtitle}
              </p>
            </div>
          </div>

          {/* Dignity Guarantee */}
          <p className="text-xs text-center text-slate-500 font-medium">
            {t.dignityNotice}
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
                  {filteredPantries.length} {t.matchesOpenToday}
                </h3>
                <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                  {t.sampleDataBadge}
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
                              {pantry.distance_miles} miles, ~{pantry.walk_minutes} {t.walkingDistance}
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
                              {item.band === 'plenty' ? t.plenty : item.band === 'low' ? t.low : t.out}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Card Footer */}
                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          {t.updatedAgo}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPantry(pantry);
                            }}
                            className="text-xs font-bold text-slate-700 hover:text-emerald-900 px-2.5 py-1 bg-slate-100 rounded-lg hover:bg-slate-200 transition cursor-pointer"
                          >
                            {t.details}
                          </button>
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${pantry.lat},${pantry.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-bold text-white px-2.5 py-1 bg-[#064e3b] rounded-lg hover:bg-[#043d2e] transition flex items-center gap-1"
                          >
                            <Navigation className="w-3 h-3" />
                            {t.directions}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredPantries.length === 0 && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                      📍
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-800">{t.emptyTitle}</p>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs">
                        {t.emptyDesc}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setQuery('');
                        setActiveFilter(null);
                      }}
                      className="text-xs font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-4 py-2 rounded-xl transition cursor-pointer"
                    >
                      {t.showAllBtn}
                    </button>
                  </div>
                )}
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
                  language={language}
                  onClose={() => setSelectedPantry(null)}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Secure Pantry View Login Modal */}
      <PantryLoginModal
        isOpen={showLoginModal}
        pantries={pantriesList}
        onClose={() => setShowLoginModal(false)}
        onRegisterPantry={handleRegisterNewPantry}
        onSuccess={(pantry) => {
          setAuthenticatedPantry(pantry);
          setIsVolunteerMode(true);
          setShowLoginModal(false);
        }}
      />
    </main>
  );
}
