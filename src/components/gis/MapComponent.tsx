'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { GisLocation } from '@/lib/types';
import { Navigation } from 'lucide-react';
import WebGisToolbar from './WebGisToolbar';

interface MapComponentProps {
  locations: GisLocation[];
  activeFilters: string[];
  isDarkMode: boolean;
  isSatellite: boolean;
  onToggleDarkMode: () => void;
  onToggleSatellite: () => void;
}

// Category color mapping
const categoryColors: Record<string, { marker: string; icon: string }> = {
  'Kantor Desa': { marker: '#3b82f6', icon: '🏛️' },
  'Sekolah': { marker: '#f59e0b', icon: '🏫' },
  'Masjid': { marker: '#10b981', icon: '🕌' },
  'Puskesmas': { marker: '#f43f5e', icon: '🏥' },
  'Wisata': { marker: '#8b5cf6', icon: '🎭' },
  'Pertanian': { marker: '#84cc16', icon: '🌾' },
  'Peternakan': { marker: '#f97316', icon: '🐄' },
  'Area Rawan Bencana': { marker: '#ef4444', icon: '⚠️' },
  'Rute Evakuasi': { marker: '#06b6d4', icon: '🚨' },
};

// Balai Desa Pagutan center
const MAP_CENTER: [number, number] = [-8.628029924721861, 116.28605364365886];
const DEFAULT_ZOOM = 15;

// Approximate boundary of Desa Pagutan (polygon coordinates [lat, lng])
// Traced from real village boundary data
const PAGUTAN_BOUNDARY_LATLNGS: [number, number][] = [
  [-8.6155, 116.2720],
  [-8.6130, 116.2780],
  [-8.6120, 116.2860],
  [-8.6125, 116.2940],
  [-8.6145, 116.3010],
  [-8.6175, 116.3070],
  [-8.6210, 116.3110],
  [-8.6260, 116.3130],
  [-8.6310, 116.3120],
  [-8.6365, 116.3090],
  [-8.6410, 116.3060],
  [-8.6450, 116.3010],
  [-8.6470, 116.2950],
  [-8.6465, 116.2870],
  [-8.6440, 116.2800],
  [-8.6400, 116.2740],
  [-8.6350, 116.2700],
  [-8.6290, 116.2680],
  [-8.6230, 116.2685],
  [-8.6185, 116.2700],
  [-8.6155, 116.2720],
];

export const MapComponent: React.FC<MapComponentProps> = ({
  locations,
  activeFilters,
  isDarkMode,
  isSatellite,
  onToggleDarkMode,
  onToggleSatellite,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [mouseCoords, setMouseCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [leafletLib, setLeafletLib] = useState<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const tileLayerRef = useRef<any>(null);

  const filteredLocations = locations.filter(loc => activeFilters.includes(loc.category));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize Leaflet map
  useEffect(() => {
    if (!isMounted || !mapRef.current) return;

    const initMap = async () => {
      const L = (await import('leaflet')).default;
      setLeafletLib(L);

      // Fix default icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      if (leafletMapRef.current) return;

      const map = L.map(mapRef.current!, {
        center: MAP_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: false,
        attributionControl: false,
        doubleClickZoom: false,
      });

      // Zoom control bottom-right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Scale control
      L.control.scale({
        position: 'bottomleft',
        metric: true,
        imperial: false,
        maxWidth: 150,
      }).addTo(map);

      // Attribution
      L.control.attribution({ position: 'bottomleft', prefix: false }).addTo(map);

      // Default tile
      const tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      });
      tile.addTo(map);
      tileLayerRef.current = tile;

      // ── Village boundary outline for Desa Pagutan ──
      L.polygon(PAGUTAN_BOUNDARY_LATLNGS, {
        color: '#e11d48',       // rose-600 border
        weight: 2.5,
        dashArray: '8 5',
        dashOffset: '0',
        fillColor: '#10b981',   // emerald-500 fill
        fillOpacity: 0.06,
        interactive: false,
      }).bindTooltip(
        '<div style="font-size:11px;font-weight:700;color:#0f766e;">📍 Batas Wilayah Desa Pagutan</div>',
        { sticky: true, className: 'pagutan-tooltip' }
      ).addTo(map);

      // Mouse move for coordinates
      map.on('mousemove', (e: any) => {
        setMouseCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
      });

      leafletMapRef.current = map;

      // Invalidate size multiple times to handle layout shifts (mobile especially)
      setTimeout(() => map.invalidateSize(), 200);
      setTimeout(() => map.invalidateSize(), 600);
      setTimeout(() => map.invalidateSize(), 1200);

      // ResizeObserver to re-invalidate whenever the container changes size
      if (mapRef.current && typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => {
          if (leafletMapRef.current) leafletMapRef.current.invalidateSize();
        });
        ro.observe(mapRef.current);
        // Store for cleanup
        (mapRef.current as any).__resizeObserver = ro;
      }
    };

    initMap();

    return () => {
      if (mapRef.current && (mapRef.current as any).__resizeObserver) {
        (mapRef.current as any).__resizeObserver.disconnect();
      }
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
        tileLayerRef.current = null;
      }
    };
  }, [isMounted]);

  // Handle tile layer switching (satellite / dark mode / street)
  useEffect(() => {
    if (!leafletMapRef.current || !leafletLib) return;

    const map = leafletMapRef.current;
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let newTile;
    if (isSatellite) {
      newTile = leafletLib.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri, Maxar, Earthstar Geographics',
        maxZoom: 19,
      });
    } else if (isDarkMode) {
      newTile = leafletLib.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB Dark',
        maxZoom: 19,
      });
    } else {
      newTile = leafletLib.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      });
    }

    newTile.addTo(map);
    tileLayerRef.current = newTile;
  }, [isSatellite, isDarkMode, leafletLib]);

  // Update markers
  const updateMarkers = useCallback(async () => {
    if (!leafletMapRef.current || !leafletLib) return;

    const map = leafletMapRef.current;

    // Remove existing markers
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    // Add new markers with staggered animation
    filteredLocations.forEach((loc, index) => {
      const colors = categoryColors[loc.category] || { marker: '#10b981', icon: '📍' };

      const icon = leafletLib.divIcon({
        className: 'custom-marker',
        html: `
          <div class="gis-marker-anim" style="
            width: 36px;
            height: 36px;
            background: ${colors.marker};
            border: 3px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 14px rgba(0,0,0,0.25);
            font-size: 16px;
            cursor: pointer;
            animation: markerPop 0.4s ease-out ${index * 0.03}s both;
          ">${colors.icon}</div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20],
      });

      const marker = leafletLib.marker([loc.latitude, loc.longitude], { icon }).addTo(map);

      const popupContent = `
        <div class="gis-popup-content" style="min-width: 220px; font-family: system-ui, -apple-system, sans-serif;">
          <div style="
            display: inline-block;
            background: ${colors.marker}20;
            color: ${colors.marker};
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 3px 8px;
            border-radius: 6px;
            margin-bottom: 8px;
          ">${colors.icon} ${loc.category}</div>
          <h3 style="margin: 0 0 6px; font-size: 14px; font-weight: 700; color: #1e293b;">${loc.name}</h3>
          <p style="margin: 0 0 8px; font-size: 12px; color: #64748b; line-height: 1.5;">${loc.description}</p>
          <div style="display: flex; align-items: flex-start; gap: 4px; font-size: 11px; color: #94a3b8;">
            <span>📍</span>
            <span>${loc.address}</span>
          </div>
          <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; font-family: monospace;">
            ${loc.latitude.toFixed(6)}°S, ${loc.longitude.toFixed(6)}°E
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 280,
        className: 'custom-popup gis-popup-animated',
      });

      markersRef.current.push(marker);
    });

    // Fit bounds
    if (filteredLocations.length > 1) {
      const bounds = leafletLib.latLngBounds(filteredLocations.map(loc => [loc.latitude, loc.longitude]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    } else if (filteredLocations.length === 1) {
      map.setView([filteredLocations[0].latitude, filteredLocations[0].longitude], 16);
    } else {
      map.setView(MAP_CENTER, DEFAULT_ZOOM);
    }
  }, [filteredLocations, leafletLib]);

  useEffect(() => {
    updateMarkers();
  }, [updateMarkers]);

  // Loading skeleton
  if (!isMounted) {
    return (
      <div className="w-full h-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-slate-400 font-medium">Memuat Peta WebGIS...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="webgis-map-container" className="w-full h-full relative overflow-hidden rounded-2xl">
      {/* Leaflet Map */}
      <div ref={mapRef} className="absolute inset-0 z-10" />

      {/* Toolbar overlay */}
      <WebGisToolbar
        mapInstance={leafletMapRef.current}
        leafletLib={leafletLib}
        locations={filteredLocations}
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
        isSatellite={isSatellite}
        onToggleSatellite={onToggleSatellite}
        mouseCoords={mouseCoords}
      />

      {/* Floating top info bar */}
      <div className="absolute top-3 left-3 z-[999] bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-800 dark:text-slate-200 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5 shadow-lg pointer-events-none max-w-[200px]">
        <div className="relative">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
          <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
        </div>
        <div>
          <div className="text-[10px] font-bold tracking-wide uppercase text-emerald-700 dark:text-emerald-400">Peta Digital</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">{filteredLocations.length} titik aktif</div>
        </div>
      </div>

      {/* Bottom legend */}
      <div className="absolute bottom-3 right-14 z-[999] bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-2 rounded-lg border border-slate-200/60 dark:border-slate-700/60 shadow-sm pointer-events-none">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
            <Navigation className="w-3 h-3 text-emerald-500" />
            <span>© OpenStreetMap</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-600 dark:text-slate-400">
            <div className="w-5 h-0 border-t-2 border-dashed border-rose-500 shrink-0" />
            <span className="font-medium">Batas Desa Pagutan</span>
          </div>
        </div>
      </div>
    </div>
  );
};
