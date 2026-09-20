'use client';

/*
 * Leaflet is imported dynamically at runtime (see the import('leaflet') below),
 * so its map/layer/marker objects are handled untyped in this thin wrapper.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef, useState } from 'react';
import { Pantry } from '@/lib/pantryData';

interface PantryMapProps {
  pantries: Pantry[];
  selectedPantry: Pantry | null;
  hoveredPantryId?: string | null;
  onSelectPantry: (pantry: Pantry) => void;
}

function createPantryPinIcon(
  L: any,
  idx: number,
  pantry: Pantry,
  isFocused: boolean
) {
  const barColors = (pantry.shelf_items || []).slice(0, 3).map((item) => {
    if (item.band === 'plenty') return '#16a34a'; // green
    if (item.band === 'low') return '#d97706';    // amber
    return '#dc2626';                             // red
  });

  const iconHtml = `
    <div style="
      display: flex;
      align-items: center;
      background: white;
      padding: 4px 8px;
      border-radius: 9999px;
      box-shadow: ${isFocused ? '0 0 0 3px rgba(6,78,59,0.35), 0 6px 16px rgba(0,0,0,0.35)' : '0 3px 10px rgba(0,0,0,0.22)'};
      border: ${isFocused ? '2.5px solid #064e3b' : '2px solid #ffffff'};
      transform: ${isFocused ? 'scale(1.22)' : 'scale(1)'};
      transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: pointer;
      gap: 5px;
    ">
      <span style="
        font-weight: 800;
        font-size: 12px;
        color: #064e3b;
        line-height: 1;
      ">${idx + 1}</span>
      <div style="display: flex; gap: 2.5px; align-items: flex-end; height: 12px;">
        ${barColors.map((color, i) => `
          <div style="
            width: 3.5px;
            height: ${i === 0 ? '12px' : i === 1 ? '9px' : '6px'};
            background-color: ${color};
            border-radius: 1px;
          "></div>
        `).join('')}
      </div>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-pantry-pin',
    iconSize: [48, 28],
    iconAnchor: [24, 14],
  });
}

export default function PantryMap({
  pantries,
  selectedPantry,
  hoveredPantryId,
  onSelectPantry,
}: PantryMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const leafletRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);
  const markersMapRef = useRef<Map<string, { marker: any; pantry: Pantry; index: number }>>(new Map());
  const prevPantriesKeyRef = useRef<string>('');
  const initialFitDoneRef = useRef<boolean>(false);
  const onSelectPantryRef = useRef(onSelectPantry);

  useEffect(() => {
    onSelectPantryRef.current = onSelectPantry;
  }, [onSelectPantry]);

  const [mapReady, setMapReady] = useState(false);

  // 1. Initialize Leaflet map instance once on mount
  useEffect(() => {
    if (!mapContainerRef.current || typeof window === 'undefined') return;

    let isMounted = true;
    let resizeObserver: ResizeObserver | null = null;
    const markersMap = markersMapRef.current;

    import('leaflet').then((leaflet) => {
      if (!isMounted || !mapContainerRef.current) return;
      const L = leaflet.default || leaflet;
      leafletRef.current = L;

      // Guard against double init in React strict mode or HMR
      if (mapInstanceRef.current) return;

      const container = mapContainerRef.current;
      if ((container as any)._leaflet_id) {
        delete (container as any)._leaflet_id;
      }

      try {
        const initialLat = selectedPantry && Number.isFinite(selectedPantry.lat) ? selectedPantry.lat : 39.3150;
        const initialLng = selectedPantry && Number.isFinite(selectedPantry.lng) ? selectedPantry.lng : -76.6200;

        const map = L.map(container, {
          center: [initialLat, initialLng],
          zoom: 12,
          zoomControl: false,
        });

        // 100% Free OpenStreetMap standard tile layer
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // Layer group for pins
        markersGroupRef.current = L.layerGroup().addTo(map);
        mapInstanceRef.current = map;

        // Handle layout changes & mobile visibility toggles
        if (typeof ResizeObserver !== 'undefined' && container) {
          resizeObserver = new ResizeObserver(() => {
            if (mapInstanceRef.current && container.offsetWidth > 0 && container.offsetHeight > 0) {
              mapInstanceRef.current.invalidateSize({ pan: false });
            }
          });
          resizeObserver.observe(container);
        }

        setTimeout(() => {
          if (mapInstanceRef.current && container.offsetWidth > 0) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 200);

        setMapReady(true);
      } catch (err) {
        console.warn('Leaflet initialization deferred or skipped:', err);
      }
    });

    return () => {
      isMounted = false;
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {
          // ignore cleanup errors
        }
        mapInstanceRef.current = null;
      }
      leafletRef.current = null;
      markersGroupRef.current = null;
      markersMap.clear();
      setMapReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Synchronize markers when pantries list changes
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !leafletRef.current || !markersGroupRef.current) return;

    const L = leafletRef.current;
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;

    markersGroup.clearLayers();
    markersMapRef.current.clear();

    const validPantries = pantries.filter(
      (p) => p && Number.isFinite(p.lat) && Number.isFinite(p.lng)
    );

    validPantries.forEach((pantry, idx) => {
      const isSelected = selectedPantry?.id === pantry.id;
      const isHovered = hoveredPantryId === pantry.id;
      const isFocused = isSelected || isHovered;

      const icon = createPantryPinIcon(L, idx, pantry, isFocused);
      const marker = L.marker([pantry.lat, pantry.lng], {
        icon,
        zIndexOffset: isFocused ? 1000 : 0,
      }).addTo(markersGroup);

      marker.on('click', () => {
        onSelectPantryRef.current(pantry);
        try {
          if (mapContainerRef.current && mapContainerRef.current.offsetWidth > 0) {
            map.panTo([pantry.lat, pantry.lng], { animate: true, duration: 0.4 });
          }
        } catch {
          // ignore pan errors if container hidden
        }
        const el = document.getElementById(`pantry-card-${pantry.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });

      markersMapRef.current.set(pantry.id, { marker, pantry, index: idx });
    });

    // Fit bounds ONLY when container has visible size and pantries change
    const pantriesKey = validPantries.map((p) => p.id).join(',');
    if (pantriesKey !== prevPantriesKeyRef.current) {
      prevPantriesKeyRef.current = pantriesKey;
      if (
        validPantries.length > 0 &&
        !selectedPantry &&
        mapContainerRef.current &&
        mapContainerRef.current.offsetWidth > 0 &&
        mapContainerRef.current.offsetHeight > 0
      ) {
        try {
          const bounds = L.latLngBounds(validPantries.map((p) => [p.lat, p.lng]));
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14, animate: initialFitDoneRef.current });
          initialFitDoneRef.current = true;
        } catch (err) {
          console.warn('fitBounds error ignored:', err);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapReady, pantries]);

  // 3. Highlight markers on hover or selection change without recreating markers
  useEffect(() => {
    if (!mapReady || !leafletRef.current) return;
    const L = leafletRef.current;

    markersMapRef.current.forEach(({ marker, pantry, index }) => {
      const isSelected = selectedPantry?.id === pantry.id;
      const isHovered = hoveredPantryId === pantry.id;
      const isFocused = isSelected || isHovered;

      marker.setIcon(createPantryPinIcon(L, index, pantry, isFocused));
      marker.setZIndexOffset(isFocused ? 1000 : 0);
    });
  }, [mapReady, selectedPantry?.id, hoveredPantryId]);

  // 4. Smoothly pan / fly to selected pantry when selected
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !selectedPantry) return;
    if (!Number.isFinite(selectedPantry.lat) || !Number.isFinite(selectedPantry.lng)) return;
    if (!mapContainerRef.current || mapContainerRef.current.offsetWidth === 0 || mapContainerRef.current.offsetHeight === 0) return;

    try {
      const map = mapInstanceRef.current;
      const currentCenter = map.getCenter();
      if (!currentCenter || !Number.isFinite(currentCenter.lat) || !Number.isFinite(currentCenter.lng)) return;

      const dist = Math.hypot(currentCenter.lat - selectedPantry.lat, currentCenter.lng - selectedPantry.lng);
      if (dist < 0.0001) return;

      const currentZoom = map.getZoom();
      if (currentZoom < 13) {
        map.flyTo([selectedPantry.lat, selectedPantry.lng], 13.5, { duration: 0.6, easeLinearity: 0.25 });
      } else {
        map.panTo([selectedPantry.lat, selectedPantry.lng], { animate: true, duration: 0.4 });
      }
    } catch (err) {
      console.warn('panTo/flyTo error ignored:', err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapReady, selectedPantry?.id]);

  return (
    <div 
      className="relative w-full h-full min-h-[350px] rounded-2xl overflow-hidden border border-emerald-900/10 shadow-inner z-0"
      style={{ isolation: 'isolate' }}
    >
      <div ref={mapContainerRef} className="w-full h-full absolute inset-0 z-0" />
    </div>
  );
}
