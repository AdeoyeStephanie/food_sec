'use client';

import React, { useEffect, useRef } from 'react';
import { Pantry } from '@/lib/pantryData';

interface PantryMapProps {
  pantries: Pantry[];
  selectedPantry: Pantry | null;
  hoveredPantryId?: string | null;
  onSelectPantry: (pantry: Pantry) => void;
}

export default function PantryMap({ pantries, selectedPantry, hoveredPantryId, onSelectPantry }: PantryMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || typeof window === 'undefined') return;

    let L: any;
    let isCancelled = false;

    // Dynamically import Leaflet
    import('leaflet').then((leaflet) => {
      if (isCancelled || !mapContainerRef.current) return;
      L = leaflet.default || leaflet;

      if (!mapInstanceRef.current) {
        const initialLat = selectedPantry ? selectedPantry.lat : 39.3150;
        const initialLng = selectedPantry ? selectedPantry.lng : -76.6200;

        const map = L.map(mapContainerRef.current, {
          center: [initialLat, initialLng],
          zoom: 12,
          zoomControl: false,
        });

        // 100% Free OpenStreetMap standard tile layer (Requires NO API key or token whatsoever)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.control.zoom({ position: 'bottomright' }).addTo(map);
        mapInstanceRef.current = map;

        setTimeout(() => {
          map.invalidateSize();
        }, 150);
      }

      const map = mapInstanceRef.current;
      if (!map) return;

      // Clear existing markers
      markersRef.current.forEach((m) => map.removeLayer(m));
      markersRef.current = [];

      // Add pins for pantries
      pantries.forEach((pantry, idx) => {
        const barColors = (pantry.shelf_items || []).slice(0, 3).map((item) => {
          if (item.band === 'plenty') return '#16a34a'; // green
          if (item.band === 'low') return '#d97706';    // amber
          return '#dc2626';                             // red
        });

        const isSelected = selectedPantry?.id === pantry.id;
        const isHovered = hoveredPantryId === pantry.id;
        const isFocused = isSelected || isHovered;

        const iconHtml = `
          <div style="
            display: flex;
            align-items: center;
            background: white;
            padding: 4px 8px;
            border-radius: 9999px;
            box-shadow: ${isFocused ? '0 0 0 3px rgba(6,78,59,0.3), 0 6px 16px rgba(0,0,0,0.3)' : '0 3px 10px rgba(0,0,0,0.22)'};
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

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-pantry-pin',
          iconSize: [48, 28],
          iconAnchor: [24, 14],
        });

        const marker = L.marker([pantry.lat, pantry.lng], { icon: customIcon, zIndexOffset: isFocused ? 1000 : 0 }).addTo(map);
        marker.on('click', () => {
          onSelectPantry(pantry);
          map.setView([pantry.lat, pantry.lng], 14, { animate: true });
          const el = document.getElementById(`pantry-card-${pantry.id}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });

        markersRef.current.push(marker);
      });

      // Fit map bounds to show matching pantries smoothly
      if (pantries.length > 0) {
        const bounds = L.latLngBounds(pantries.map((p) => [p.lat, p.lng]));
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
      }

      map.invalidateSize();
    });

    return () => {
      isCancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [pantries, onSelectPantry, selectedPantry, hoveredPantryId]);

  // If selectedPantry changes, center map
  useEffect(() => {
    if (mapInstanceRef.current && selectedPantry) {
      mapInstanceRef.current.setView([selectedPantry.lat, selectedPantry.lng], 14, { animate: true });
      mapInstanceRef.current.invalidateSize();
    }
  }, [selectedPantry]);

  return (
    <div 
      className="relative w-full h-full min-h-[350px] rounded-2xl overflow-hidden border border-emerald-900/10 shadow-inner z-0"
      style={{ isolation: 'isolate' }}
    >
      <div ref={mapContainerRef} className="w-full h-full absolute inset-0 z-0" />
    </div>
  );
}
