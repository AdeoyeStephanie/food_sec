'use client';

import React, { useEffect, useRef } from 'react';
import { Pantry } from '@/lib/pantryData';
import 'leaflet/dist/leaflet.css';

interface PantryMapProps {
  pantries: Pantry[];
  selectedPantry: Pantry | null;
  onSelectPantry: (pantry: Pantry) => void;
}

export default function PantryMap({ pantries, selectedPantry, onSelectPantry }: PantryMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || typeof window === 'undefined') return;

    let L: any;
    // Dynamically import Leaflet
    import('leaflet').then((leaflet) => {
      L = leaflet.default || leaflet;

      if (!mapInstanceRef.current && mapContainerRef.current) {
        // Center around Baltimore Hampden / Northside by default
        const initialLat = selectedPantry ? selectedPantry.lat : 39.3150;
        const initialLng = selectedPantry ? selectedPantry.lng : -76.6200;

        const map = L.map(mapContainerRef.current, {
          center: [initialLat, initialLng],
          zoom: 13,
          zoomControl: false,
        });

        // Clean light/soft tile layer (CartoDB Positron is clean and distraction-free)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap contributors, CartoDB',
          maxZoom: 19,
        }).addTo(map);

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;
      if (!map) return;

      // Clear existing markers
      markersRef.current.forEach((m) => map.removeLayer(m));
      markersRef.current = [];

      // Add pins for pantries
      pantries.forEach((pantry, idx) => {
        // Check top 3 items stock bands
        const barColors = pantry.shelf_items.slice(0, 3).map((item) => {
          if (item.band === 'plenty') return '#16a34a'; // green
          if (item.band === 'low') return '#d97706';    // amber
          return '#dc2626';                             // red
        });

        const isSelected = selectedPantry?.id === pantry.id;

        // Custom HTML marker matching Page 3 mockup pin style
        const iconHtml = `
          <div style="
            display: flex;
            align-items: center;
            background: white;
            padding: 4px 7px;
            border-radius: 9999px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.18);
            border: 2px solid ${isSelected ? '#064e3b' : '#ffffff'};
            transform: ${isSelected ? 'scale(1.18)' : 'scale(1)'};
            transition: transform 0.2s ease;
            cursor: pointer;
            gap: 5px;
          ">
            <span style="
              font-weight: 700;
              font-size: 13px;
              color: #1f2937;
              line-height: 1;
            ">${idx + 1}</span>
            <div style="display: flex; gap: 2px; align-items: flex-end; height: 12px;">
              ${barColors.map((color, i) => `
                <div style="
                  width: 3px;
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
          iconSize: [44, 28],
          iconAnchor: [22, 14],
        });

        const marker = L.marker([pantry.lat, pantry.lng], { icon: customIcon }).addTo(map);
        marker.on('click', () => {
          onSelectPantry(pantry);
          map.setView([pantry.lat, pantry.lng], 14, { animate: true });
        });

        markersRef.current.push(marker);
      });
    });

    return () => {
      // Cleanup on unmount if needed
    };
  }, [pantries, selectedPantry, onSelectPantry]);

  // If selectedPantry changes, pan map to it
  useEffect(() => {
    if (mapInstanceRef.current && selectedPantry) {
      mapInstanceRef.current.setView([selectedPantry.lat, selectedPantry.lng], 14, { animate: true });
    }
  }, [selectedPantry]);

  return (
    <div className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden border border-emerald-900/10 shadow-inner">
      <div ref={mapContainerRef} className="w-full h-full" style={{ minHeight: '100%' }} />
    </div>
  );
}
