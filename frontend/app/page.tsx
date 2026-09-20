'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Pantry, getUrgencyIndicator } from '@/lib/pantryData';
import { useNow } from '@/lib/useNow';
import PantryDetailSheet from '@/components/PantryDetailSheet';
import VolunteerDashboard from '@/components/VolunteerDashboard';
import PantryLoginModal from '@/components/PantryLoginModal';
import HotlineModal from '@/components/HotlineModal';
import BrandLogo from '@/components/BrandLogo';
import { Language, TRANSLATIONS } from '@/lib/translations';
import { getStoredPantries, saveAndBroadcastPantries } from '@/lib/inventorySync';
import { fetchPantries } from '@/lib/api';
import {
  Search,
  Mic,
  Phone,
  PhoneCall,
  Sparkles,
  Navigation,
  ArrowLeft,
  Clock,
  Lock,
  RotateCcw,
  Map as MapIcon,
  List as ListIcon
} from 'lucide-react';

// Dynamic import for Leaflet map to prevent SSR issues
const PantryMap = dynamic(() => import('@/components/PantryMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-75 bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center text-slate-400 text-sm">
      Loading Baltimore Pantry Map...
    </div>
  ),
});

export default function Home() {
  // Live clock so open/closed badges recompute as time passes.
  const now = useNow();

  // Polling bookkeeping: last-applied data snapshot (skip identical responses)
  // and an in-flight guard (don't stack overlapping fetches).
  const lastSnapshotRef = React.useRef<string>('');
  const isFetchingRef = React.useRef<boolean>(false);

  // Navigation & Search State
  const [pantriesList, setPantriesList] = useState<Pantry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshToast, setRefreshToast] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState<Language>('en');
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [selectedPantry, setSelectedPantry] = useState<Pantry | null>(null);
  const [hoveredPantryId, setHoveredPantryId] = useState<string | null>(null);
  const [isVolunteerMode, setIsVolunteerMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authenticatedPantry, setAuthenticatedPantry] = useState<Pantry | null>(null);
  const [isListening, setIsListening] = useState(false);

  // Filter chips
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Hotline Modal & Mobile View Toggle
  const [showHotlineModal, setShowHotlineModal] = useState(false);
  const [mobileTab, setMobileTab] = useState<'list' | 'map'>('list');

  // Listen for real-time inventory updates across any open tab or window
  React.useEffect(() => {
    // Restore searched/map view state if user previously opened the map
    if (typeof window !== 'undefined') {
      const savedSearched = localStorage.getItem('PULSE_HAS_SEARCHED');
      if (savedSearched === 'true') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasSearched(true);
      }
    }

    // Initial load from localStorage if previously fetched. This is a one-time
    // hydration-safe read of an external store on mount (not derived state), so
    // the synchronous setState here is intentional.
    const stored = getStoredPantries([]);
    if (stored.length > 0) {
      lastSnapshotRef.current = JSON.stringify(stored);
      setPantriesList(stored);
      setIsLoading(false);
    }

    // Apply a freshly fetched list only when it actually differs from what's on
    // screen, so identical poll responses don't trigger needless re-renders.
    const applyPantries = (list: Pantry[], broadcast: boolean) => {
      if (!Array.isArray(list) || list.length === 0) return;
      const snapshot = JSON.stringify(list);
      if (snapshot === lastSnapshotRef.current) return;
      lastSnapshotRef.current = snapshot;
      setPantriesList(list);
      if (broadcast) saveAndBroadcastPantries(list);
    };

    // Single fetch from the backend; guarded so overlapping ticks (e.g. during a
    // Render cold start) don't stack up concurrent requests.
    const fetchOnce = async () => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      try {
        const list = await fetchPantries();
        applyPantries(list, true);
      } catch (err) {
        console.warn('Backend pantries fetch notice:', err);
      } finally {
        isFetchingRef.current = false;
        setIsLoading(false);
      }
    };

    // Initial load, then poll every 3s for near-live cross-device sync.
    fetchOnce();
    const pollId = window.setInterval(() => {
      // Pause polling while the tab is hidden (backgrounded / phone locked) to
      // avoid pinging Render for a screen no one is looking at.
      if (document.hidden) return;
      fetchOnce();
    }, 3000);

    // When the tab becomes visible again, refresh immediately instead of waiting
    // out the remaining interval.
    const handleVisibility = () => {
      if (!document.hidden) fetchOnce();
    };

    const handleSync = (e: Event) => {
      const detail = (e as CustomEvent<Pantry[]>).detail;
      if (detail && Array.isArray(detail)) {
        lastSnapshotRef.current = JSON.stringify(detail);
        setPantriesList(detail);
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'BALTIMORE_PANTRIES_DATA_V1' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            lastSnapshotRef.current = e.newValue;
            setPantriesList(parsed);
          }
        } catch {}
      }
    };

    window.addEventListener('inventory-sync', handleSync);
    window.addEventListener('storage', handleStorage);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.clearInterval(pollId);
      window.removeEventListener('inventory-sync', handleSync);
      window.removeEventListener('storage', handleStorage);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const handleRegisterNewPantry = (newPantry: Pantry) => {
    setPantriesList((prev) => {
      const nextList = [newPantry, ...prev];
      saveAndBroadcastPantries(nextList);
      return nextList;
    });
    setSelectedPantry(newPantry);
  };

  const handleUpdateFullPantry = (updatedPantry: Pantry) => {
    setPantriesList((prev) => {
      const nextList = prev.map((p) => (p.id === updatedPantry.id ? updatedPantry : p));
      saveAndBroadcastPantries(nextList);
      return nextList;
    });
    if (selectedPantry?.id === updatedPantry.id) {
      setSelectedPantry(updatedPantry);
    }
    if (authenticatedPantry?.id === updatedPantry.id) {
      setAuthenticatedPantry(updatedPantry);
    }
  };

  const handleUpdateInventory = (category: string, band: 'plenty' | 'low' | 'out') => {
    setPantriesList((prev) => {
      const targetId = authenticatedPantry?.id || selectedPantry?.id || prev[0]?.id;
      if (!targetId) return prev;
      const nextList = prev.map((p) => {
        if (p.id === targetId) {
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
      });
      saveAndBroadcastPantries(nextList);
      return nextList;
    });
  };

  // Speech recognition handler
  const handleVoiceSearch = () => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      // Web Speech API is a vendor-prefixed browser API with no stable TS types.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'es' ? 'es-ES' : 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // Conversational Natural Language Matcher for Voice & Text Queries
  const filterPantriesIntelligently = (
    pantries: Pantry[],
    rawQuery: string,
    filterChip: string | null
  ): Pantry[] => {
    let list = [...pantries];

    // Quick filter chips
    if (filterChip === 'tonight') {
      list = list.filter((p) => p.open_tonight);
    } else if (filterChip === 'no_id') {
      list = list.filter((p) => !p.requires_id);
    } else if (filterChip === 'produce') {
      list = list.filter((p) =>
        p.shelf_items?.some(
          (item) => item.category_name.toLowerCase().includes('produce') && item.band === 'plenty'
        )
      );
    }

    const q = rawQuery.trim().toLowerCase();
    if (!q) return list;

    // 1. Extract 5-digit zip codes (e.g. 21220, 21218, 21211, etc.)
    const zipCodes = q.match(/\b\d{5}\b/g) || [];

    // 2. Filter conversational stopwords (e.g. "I'm looking for food in", "busco comida en")
    const conversationalStopwords = new Set([
      'i', "i'm", 'im', 'me', 'my', 'we', 'our', 'you', 'your',
      'looking', 'look', 'search', 'searching', 'find', 'finding', 'need', 'needs', 'needed',
      'want', 'wants', 'food', 'pantry', 'pantries', 'bank', 'banks', 'site', 'sites', 'place', 'places',
      'assistance', 'help', 'give', 'get', 'got', 'having', 'have',
      'in', 'at', 'near', 'around', 'close', 'closer', 'for', 'to', 'from', 'on', 'by', 'of', 'with', 'and', 'or',
      'the', 'a', 'an', 'some', 'any', 'is', 'are', 'there', 'where', 'can', 'please', 'today', 'now',
      'somewhere', 'open', 'opened', 'neighborhood', 'area', 'city', 'county',
      // Spanish conversational fillers
      'yo', 'busco', 'buscar', 'necesito', 'necesitamos', 'quiero', 'comida', 'alimentos',
      'despensa', 'banco', 'en', 'cerca', 'de', 'por', 'favor', 'donde', 'hay', 'un', 'una',
      'los', 'las', 'el', 'la', 'con', 'sin', 'para', 'hoy', 'ahora'
    ]);

    // 3. High-intent detectors
    const wantsTonight =
      q.includes('tonight') ||
      q.includes('tonite') ||
      q.includes('noche') ||
      q.includes('evening') ||
      q.includes('after 5') ||
      q.includes('after 6') ||
      q.includes('open tonight');

    const wantsNoId =
      q.includes('no id') ||
      q.includes('without id') ||
      q.includes('sin id') ||
      q.includes('sin identificacion') ||
      q.includes('sin identificación');

    const wantsProduce =
      q.includes('produce') ||
      q.includes('vegetable') ||
      q.includes('fruit') ||
      q.includes('verdura') ||
      q.includes('fruta') ||
      q.includes('fresh');

    const wantsDiapers =
      q.includes('diaper') ||
      q.includes('formula') ||
      q.includes('baby') ||
      q.includes('wipe') ||
      q.includes('pañal');

    const wantsHalal = q.includes('halal');
    const wantsKosher = q.includes('kosher');

    // 4. Tokenize meaningful terms
    const meaningfulTokens = q
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((word) => word.length > 1 && !conversationalStopwords.has(word));

    return list.filter((p) => {
      const name = p.name.toLowerCase();
      const neigh = p.neighborhood.toLowerCase();
      const addr = p.address.toLowerCase();
      const notes = (p.notes || '').toLowerCase();
      const allText = `${name} ${neigh} ${addr} ${notes}`;

      // A. Zip code match (e.g. 21220)
      if (zipCodes.length > 0) {
        if (zipCodes.some((zip) => addr.includes(zip))) {
          return true;
        }
      }

      // B. Neighborhood presence in query (e.g. user said "Middle River" or "Hampden")
      if (neigh.length >= 3 && q.includes(neigh)) {
        return true;
      }
      if (neigh.includes('/')) {
        const parts = neigh.split('/').map((s) => s.trim());
        if (parts.some((part) => part.length >= 3 && q.includes(part))) {
          return true;
        }
      }

      // C. Intent filters
      if (wantsTonight && p.open_tonight) return true;
      if (wantsNoId && !p.requires_id) return true;
      if (wantsHalal && (notes.includes('halal') || name.includes('halal'))) return true;
      if (wantsKosher && (notes.includes('kosher') || name.includes('kosher'))) return true;

      if (wantsProduce && p.shelf_items?.some((it) => it.category_name.toLowerCase().includes('produce'))) {
        if (meaningfulTokens.every((t) => ['produce', 'fresh', 'vegetable', 'fruit', 'verdura', 'fruta'].includes(t))) {
          return true;
        }
      }

      if (wantsDiapers && p.shelf_items?.some((it) => it.category_name.toLowerCase().includes('diaper'))) {
        if (meaningfulTokens.every((t) => ['diaper', 'diapers', 'baby', 'formula', 'wipes', 'pañal', 'pañales'].includes(t))) {
          return true;
        }
      }

      // D. Token keyword matching (e.g. ["middle", "river"])
      if (meaningfulTokens.length > 0) {
        // Multi-word neighborhood special case
        if (meaningfulTokens.includes('middle') && meaningfulTokens.includes('river')) {
          return (neigh.includes('middle') && neigh.includes('river')) || (addr.includes('middle') && addr.includes('river'));
        }

        const matched = meaningfulTokens.filter((token) => {
          return (
            allText.includes(token) ||
            p.shelf_items?.some((it) => it.category_name.toLowerCase().includes(token))
          );
        });

        if (matched.length > 0) {
          return true;
        }
      }

      // E. Direct substring fallback
      return name.includes(q) || neigh.includes(q) || addr.includes(q);
    });
  };

  const handleExecuteSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setHasSearched(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('PULSE_HAS_SEARCHED', 'true');
    }
    const matches = filterPantriesIntelligently(pantriesList, searchQuery, activeFilter);
    if (matches.length > 0) {
      setSelectedPantry(matches[0]);
    } else {
      setSelectedPantry(null);
    }
  };

  const handleRefreshStock = async () => {
    setIsRefreshing(true);
    try {
      const list = await fetchPantries();
      if (list.length > 0) {
        setPantriesList(list);
        saveAndBroadcastPantries(list);
        setSelectedPantry((prev) => (prev ? list.find((p) => p.id === prev.id) || list[0] : null));
      }
      setRefreshToast('✓ Live stock refreshed from network');
      setTimeout(() => setRefreshToast(null), 2500);
    } catch (err) {
      console.warn('Refresh error:', err);
      setRefreshToast('⚠️ Server connection check');
      setTimeout(() => setRefreshToast(null), 2500);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Filtered Pantries
  const filteredPantries = useMemo(() => {
    return filterPantriesIntelligently(pantriesList, query, activeFilter);
  }, [query, activeFilter, pantriesList]);

  // Cleanly close the pantry detail sheet and return to the list view.
  const handleClosePantryDetail = () => {
    setSelectedPantry(null);
    setMobileTab('list');
  };

  // Reconcile the selection only when the active filters exclude the currently
  // selected pantry. The `selectedPantry &&` guard is essential: without it the
  // effect re-fires when the user closes the sheet (selection -> null) and
  // immediately forces a new selection, thrashing the render and crashing the page.
  React.useEffect(() => {
    if (hasSearched && filteredPantries.length > 0) {
      if (selectedPantry && !filteredPantries.some((p) => p.id === selectedPantry.id)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedPantry(filteredPantries[0]);
      }
    }
  }, [filteredPantries, hasSearched, selectedPantry]);

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
          No direct pantries located matching &ldquo;<strong>{query}</strong>&rdquo;. Try searching by nearby neighborhoods like <em>Hampden</em>, <em>Middle River</em>, <em>Downtown</em>, or zip codes like <em>21211</em>, <em>21218</em>, <em>21220</em>.
        </span>
      );
    }
    if (q.includes('21220') || q.includes('middle river')) {
      return (
        <span>
          Found <strong className="text-emerald-950">{filteredPantries.length} emergency food sites serving Middle River / Eastern Baltimore</strong>.
        </span>
      );
    }
    if (q.includes('hampden') || q.includes('diaper') || q.includes('halal')) {
      return (
        <span>
          Found pantries open near Hampden.{' '}
          <strong className="text-emerald-950">Hampden Family Center</strong> provides emergency food assistance, fresh produce, and family supplies.
        </span>
      );
    }
    if (q.includes('produce') || q.includes('verdura') || q.includes('fruta')) {
      return (
        <span>
          Found <strong className="text-emerald-950">{filteredPantries.length} pantries with fresh produce</strong> on shelves right now in Baltimore.
        </span>
      );
    }
    if (q.includes('tonight') || q.includes('noche')) {
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
          onUpdateFullPantry={handleUpdateFullPantry}
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
            if (typeof window !== 'undefined') {
              localStorage.removeItem('PULSE_HAS_SEARCHED');
            }
            setQuery('');
            setSelectedPantry(null);
          }}
          className="cursor-pointer flex items-center gap-2.5 select-none"
        >
          <BrandLogo variant="community-bowl" size={32} showText={false} />
          <div>
            <h1 className="font-extrabold text-base md:text-lg tracking-tight text-emerald-950 leading-none">
              {t.appName}
            </h1>
            <span className="text-[11px] text-slate-500 font-medium">{t.appSubtitle}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Real-time Refresh Stock Button */}
          <button
            onClick={handleRefreshStock}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-950 bg-white hover:bg-emerald-50 border border-emerald-950/15 px-3 py-1.5 rounded-full transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-60"
            title="Refresh live pantry inventory and stock status"
          >
            <RotateCcw className={`w-3.5 h-3.5 text-emerald-700 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isRefreshing ? 'Syncing...' : 'Refresh Stock'}</span>
          </button>

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

      {/* Floating Refresh Toast */}
      {refreshToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-950 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-emerald-500/30 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <span>{refreshToast}</span>
        </div>
      )}

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
                onKeyDown={(e) => e.key === 'Enter' && handleExecuteSearch(query)}
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
              onClick={() => handleExecuteSearch(query)}
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
                { label: '📍 21218 (Central Baltimore)', q: '21218' },
                { label: '📍 21220 (Middle River)', q: '21220' },
                { label: t.presets.produce, q: language === 'es' ? 'frutas y verduras' : 'fresh produce' },
                { label: t.presets.tonight, q: language === 'es' ? 'abierto esta noche' : 'open tonight' },
                { label: t.presets.noId, q: language === 'es' ? 'sin identificacion' : 'no ID needed' },
                { label: t.presets.formula, q: language === 'es' ? 'formula para bebe' : 'diapers and formula' },
              ].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => handleExecuteSearch(chip.q)}
                  className="bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-500 text-slate-800 text-xs font-medium px-3.5 py-2 rounded-full transition shadow-xs active:scale-95 cursor-pointer"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hotline Card */}
          <div
            onClick={() => setShowHotlineModal(true)}
            className="bg-[#1e293b] hover:bg-[#15202e] text-white rounded-3xl p-5 shadow-lg flex items-center gap-4 border border-slate-800 hover:border-emerald-500/50 transition cursor-pointer group active:scale-[0.99]"
            role="button"
            tabIndex={0}
            title={language === 'es' ? 'Haga clic para simular llamada de voz' : 'Click to test interactive voice AI hotline'}
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-700/80 group-hover:bg-emerald-600/30 flex items-center justify-center shrink-0 transition">
              <PhoneCall className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition">
                  {t.hotlineTitle}
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  {language === 'es' ? 'Simular Voz' : 'Live Voice Demo'}
                </span>
              </div>
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
        <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-65px)] overflow-hidden relative">
          {/* Left Column: Search summary & Pantry list */}
          <div className={`w-full md:w-5/12 lg:w-4/12 h-full flex flex-col border-r border-emerald-900/10 bg-white overflow-y-auto ${mobileTab === 'list' ? 'flex' : 'hidden md:flex'}`}>
            {/* Top Query Re-Search Bar */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-2 sticky top-0 bg-white z-10">
              <button
                onClick={() => {
                  setHasSearched(false);
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem('PULSE_HAS_SEARCHED');
                  }
                }}
                className="p-2 text-slate-500 hover:text-emerald-950 hover:bg-slate-100 rounded-xl transition"
                title="Back to search screen"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  placeholder={t.searchPlaceholder}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleExecuteSearch(query)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium text-slate-800 outline-none focus:border-emerald-700"
                />
              </div>
            </div>

            {/* Quick Filter Bar */}
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { id: 'all', label: language === 'es' ? 'Todos' : 'All' },
                { id: 'tonight', label: language === 'es' ? 'Abierto esta noche' : 'Open Tonight' },
                { id: 'no_id', label: language === 'es' ? 'Sin ID' : 'No ID Needed' },
                { id: 'produce', label: language === 'es' ? 'Verduras frescas' : 'Fresh Produce' },
              ].map((filter) => {
                const isActive = (filter.id === 'all' && !activeFilter) || activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id === 'all' ? null : filter.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      isActive
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            {/* Scrollable Results List */}
            <div className="p-4 flex flex-col gap-4">
              {/* AI Conversational Summary Bubble matching Page 3 */}
              <div className="bg-[#f0fdf4] border border-emerald-300/60 rounded-2xl p-3.5 text-xs text-emerald-900 flex items-start gap-2.5 shadow-xs">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>{conversationalSummary}</div>
              </div>

              {/* Header with Result Count & Refresh */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-emerald-950">
                    {filteredPantries.length} {t.matchesOpenToday}
                  </h3>
                  <button
                    onClick={handleRefreshStock}
                    disabled={isRefreshing}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-emerald-800 transition cursor-pointer"
                    title="Refresh live stock"
                  >
                    <RotateCcw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-700' : ''}`} />
                  </button>
                </div>
                <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                  {t.sampleDataBadge}
                </span>
              </div>

              {/* Pantry Cards matching Mockup */}
              {isLoading && pantriesList.length === 0 ? (
                <div className="flex flex-col gap-3">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="rounded-2xl p-4 border border-emerald-900/10 bg-white animate-pulse flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                        <div className="h-4 bg-slate-100 rounded w-16"></div>
                      </div>
                      <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                      <div className="flex gap-2 mt-1">
                        <div className="h-6 w-20 bg-emerald-50 rounded-full"></div>
                        <div className="h-6 w-20 bg-emerald-50 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {filteredPantries.map((pantry, idx) => {
                  const isSelected = selectedPantry?.id === pantry.id;
                  const isHovered = hoveredPantryId === pantry.id;
                  const urgency = getUrgencyIndicator(pantry, now);

                  return (
                    <div
                      id={`pantry-card-${pantry.id}`}
                      key={pantry.id}
                      onClick={() => setSelectedPantry(pantry)}
                      onMouseEnter={() => setHoveredPantryId(pantry.id)}
                      onMouseLeave={() => setHoveredPantryId(null)}
                      className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 ${
                        isSelected
                          ? 'border-emerald-800 bg-emerald-50/50 shadow-md ring-2 ring-emerald-700'
                          : isHovered
                          ? 'border-emerald-600 bg-emerald-50/30 shadow-md ring-1 ring-emerald-400'
                          : 'border-slate-200 bg-white hover:border-emerald-300 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div>
                            <h4 className="font-bold text-sm text-emerald-950 leading-snug">
                              {pantry.name}
                            </h4>
                            <p className="text-xs text-slate-600 font-medium">
                              {pantry.distance_miles} miles · ~{pantry.walk_minutes} {t.walkingDistance}
                            </p>
                          </div>
                        </div>

                        {/* Live Urgency Status Pill */}
                        <span className={`shrink-0 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs ${urgency.badgeClass}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${urgency.dotClass}`}></span>
                          <span>{urgency.status === 'open_tonight' ? 'Tonight' : urgency.status === 'closing_soon' ? 'Closes Soon' : urgency.status === 'open' ? 'Open Today' : 'Closed'}</span>
                        </span>
                      </div>

                      <div className="mt-2 text-xs font-semibold text-emerald-900 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>{pantry.hours_text}</span>
                      </div>

                      {/* Prominent category badges */}
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {pantry.shelf_items.slice(3, 5).map((item, i) => (
                          <div
                            key={i}
                            className={`px-2.5 py-1 rounded-xl text-xs flex items-center justify-between font-semibold ${
                              item.band === 'plenty'
                                ? 'bg-emerald-100/80 text-emerald-900 border border-emerald-200/60'
                                : item.band === 'low'
                                ? 'bg-amber-100/80 text-amber-900 border border-amber-200/60'
                                : 'bg-rose-100/80 text-rose-900 border border-rose-200/60'
                            }`}
                          >
                            <span>{item.category_name}</span>
                            <span className="capitalize text-[11px] font-bold">
                              {item.band === 'plenty' ? t.plenty : item.band === 'low' ? t.low : t.out}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Card Footer */}
                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-600 font-semibold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          {t.updatedAgo}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPantry(pantry);
                            }}
                            className="text-xs font-bold text-slate-700 hover:text-emerald-900 px-3 py-1.5 bg-slate-100 rounded-xl hover:bg-slate-200 transition cursor-pointer"
                          >
                            {t.details}
                          </button>
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${pantry.lat},${pantry.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-bold text-white px-3 py-1.5 bg-[#064e3b] rounded-xl hover:bg-[#043d2e] transition flex items-center gap-1"
                          >
                            <Navigation className="w-3 h-3" />
                            {t.directions}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Compassionate Empty State */}
                {filteredPantries.length === 0 && (
                  <div className="bg-white border-2 border-emerald-900/10 rounded-3xl p-6 text-center flex flex-col items-center gap-4 shadow-sm animate-in fade-in duration-200">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-900 font-bold text-xl">
                      🌾
                    </div>
                    <div className="max-w-sm">
                      <h4 className="font-extrabold text-base text-slate-900">
                        {language === 'es' ? 'No se encontraron despensas exactas' : 'No pantries match every active filter'}
                      </h4>
                      <p className="text-xs text-slate-600 font-medium mt-1.5 leading-relaxed">
                        {language === 'es'
                          ? `No se preocupe: la comida de emergencia siempre está disponible en Baltimore. Llame a la línea directa de alimentos o borre los filtros para ver las ${pantriesList.length} despensas comunitarias.`
                          : `Don’t worry—emergency food access is always available in Baltimore. Call the direct helpline or clear your filters to view all ${pantriesList.length} neighborhood pantries.`}
                      </p>
                    </div>

                    {/* Direct 1-Tap Helplines */}
                    <div className="grid grid-cols-2 gap-2.5 w-full max-w-xs">
                      <a
                        href="tel:211"
                        className="flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-950 py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Call 2-1-1 Maryland</span>
                      </a>
                      <button
                        onClick={() => setShowHotlineModal(true)}
                        className="flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white py-2.5 px-3 rounded-xl text-xs font-bold shadow-sm transition cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
                        <span>(410) 737-8282</span>
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setQuery('');
                        setActiveFilter(null);
                      }}
                      className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer mt-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                      <span>{t.showAllBtn}</span>
                    </button>
                  </div>
                )}
              </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Map & Detail Panel */}
          <div className={`flex-1 relative h-full flex flex-col md:flex-row bg-[#f8faf9] ${mobileTab === 'map' ? 'flex' : 'hidden md:flex'}`}>
            {/* Map Container */}
            <div className="flex-1 h-full min-h-87.5">
              <PantryMap
                pantries={filteredPantries}
                selectedPantry={selectedPantry}
                hoveredPantryId={hoveredPantryId}
                onSelectPantry={(p) => setSelectedPantry(p)}
              />
            </div>

            {/* Slide-over Detail Sheet (shown on desktop beside map) */}
            {selectedPantry && (
              <div className="hidden md:block w-100 lg:w-110 h-full p-4 shrink-0 overflow-y-auto z-20 border-l border-slate-200">
                <PantryDetailSheet
                  pantry={selectedPantry}
                  language={language}
                  onClose={handleClosePantryDetail}
                />
              </div>
            )}
          </div>

          {/* Floating Mobile Toggle Button [List / Map] */}
          <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-slate-900/95 backdrop-blur-md text-white rounded-full p-1 shadow-2xl flex items-center border border-slate-700/80">
            <button
              onClick={() => setMobileTab('list')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full transition cursor-pointer ${
                mobileTab === 'list'
                  ? 'bg-[#064e3b] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ListIcon className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Lista' : 'List'}</span>
              <span className="text-[10px] opacity-75">({filteredPantries.length})</span>
            </button>
            <button
              onClick={() => setMobileTab('map')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full transition cursor-pointer ${
                mobileTab === 'map'
                  ? 'bg-[#064e3b] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Mapa' : 'Map'}</span>
            </button>
          </div>

          {/* Mobile Sheet Modal Overlay when a pantry is selected */}
          {selectedPantry && (
            <div
              className="md:hidden fixed inset-0 z-80 bg-black/60 backdrop-blur-xs p-3 flex flex-col justify-end animate-in fade-in duration-200"
              onClick={handleClosePantryDetail}
            >
              <div
                className="w-full max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <PantryDetailSheet
                  pantry={selectedPantry}
                  language={language}
                  onClose={handleClosePantryDetail}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Voice AI Hotline Simulator Modal */}
      <HotlineModal
        isOpen={showHotlineModal}
        language={language}
        onClose={() => setShowHotlineModal(false)}
        onSelectPantryQuery={(simulatedQuery) => {
          handleExecuteSearch(simulatedQuery);
          setShowHotlineModal(false);
        }}
      />

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
