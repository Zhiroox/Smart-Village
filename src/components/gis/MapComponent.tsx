'use client';

import React, { useEffect, useState, useRef } from 'react';
import { GisLocation } from '@/lib/types';
import { Layers, MapPin, Navigation, Info, X, Globe, Map as MapIcon } from 'lucide-react';

interface MapComponentProps {
  locations: GisLocation[];
  selectedVillage: string;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

// Category color mapping
const categoryColors: Record<string, { bg: string; border: string; marker: string; icon: string }> = {
  'Kantor Desa': { bg: 'bg-blue-100', border: 'border-blue-300', marker: '#3b82f6', icon: '🏛️' },
  'Sekolah': { bg: 'bg-amber-100', border: 'border-amber-300', marker: '#f59e0b', icon: '🏫' },
  'Masjid': { bg: 'bg-emerald-100', border: 'border-emerald-300', marker: '#10b981', icon: '🕌' },
  'Puskesmas': { bg: 'bg-rose-100', border: 'border-rose-300', marker: '#f43f5e', icon: '🏥' },
  'Wisata': { bg: 'bg-violet-100', border: 'border-violet-300', marker: '#8b5cf6', icon: '🎭' },
  'Pertanian': { bg: 'bg-lime-100', border: 'border-lime-300', marker: '#84cc16', icon: '🌾' },
  'Peternakan': { bg: 'bg-orange-100', border: 'border-orange-300', marker: '#f97316', icon: '🐄' },
  'Area Rawan Bencana': { bg: 'bg-red-100', border: 'border-red-300', marker: '#ef4444', icon: '⚠️' },
  'Rute Evakuasi': { bg: 'bg-cyan-100', border: 'border-cyan-300', marker: '#06b6d4', icon: '🚨' },
};

// Balai Desa Pagutan center
const MAP_CENTER: [number, number] = [-8.628029924721861, 116.28605364365886];
const DEFAULT_ZOOM = 15;

export const MapComponent: React.FC<MapComponentProps> = ({
  locations,
  selectedCategory,
  onSelectCategory,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<GisLocation | null>(null);
  const [mapType, setMapType] = useState<'street' | 'satellite'>('street');
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const tileLayerRef = useRef<any>(null);

  const categories = [
    'Semua Layer',
    'Kantor Desa',
    'Sekolah',
    'Masjid',
    'Puskesmas',
    'Wisata',
    'Pertanian',
    'Peternakan',
    'Area Rawan Bencana',
    'Rute Evakuasi'
  ];

  const filteredLocations = locations.filter(loc => {
    return selectedCategory === 'Semua Layer' || loc.category === selectedCategory;
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize Leaflet map
  useEffect(() => {
    if (!isMounted || !mapRef.current) return;

    let L: any;
    const initMap = async () => {
      L = (await import('leaflet')).default;

      // Fix default icon paths for webpack/next.js
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      if (leafletMapRef.current) return; // already initialized

      const map = L.map(mapRef.current!, {
        center: MAP_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: false,
        attributionControl: false,
      });

      // Add zoom control to bottom-right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Add attribution
      L.control.attribution({ position: 'bottomleft', prefix: false }).addTo(map);

      // Street tile layer
      const streetTile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      });

      streetTile.addTo(map);
      tileLayerRef.current = streetTile;

      leafletMapRef.current = map;

      // Force a size recalculation after a short delay
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    };

    initMap();

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
        tileLayerRef.current = null;
      }
    };
  }, [isMounted]);

  // Handle tile layer switching
  useEffect(() => {
    if (!leafletMapRef.current) return;

    const switchTile = async () => {
      const L = (await import('leaflet')).default;
      const map = leafletMapRef.current;

      if (tileLayerRef.current) {
        map.removeLayer(tileLayerRef.current);
      }

      let newTile;
      if (mapType === 'satellite') {
        newTile = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: '&copy; Esri, Maxar, Earthstar Geographics',
          maxZoom: 19,
        });
      } else {
        newTile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        });
      }

      newTile.addTo(map);
      tileLayerRef.current = newTile;
    };

    switchTile();
  }, [mapType]);

  // Update markers when filtered locations change
  useEffect(() => {
    if (!leafletMapRef.current) return;

    const updateMarkers = async () => {
      const L = (await import('leaflet')).default;
      const map = leafletMapRef.current;

      // Remove existing markers
      markersRef.current.forEach(m => map.removeLayer(m));
      markersRef.current = [];

      // Add new markers
      filteredLocations.forEach(loc => {
        const colors = categoryColors[loc.category] || { marker: '#10b981', icon: '📍' };

        // Create custom div icon
        const icon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              width: 36px;
              height: 36px;
              background: ${colors.marker};
              border: 3px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              font-size: 16px;
              cursor: pointer;
              transition: transform 0.2s;
            ">${colors.icon}</div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          popupAnchor: [0, -20],
        });

        const marker = L.marker([loc.latitude, loc.longitude], { icon })
          .addTo(map);

        // Create popup content
        const popupContent = `
          <div style="min-width: 220px; font-family: system-ui, -apple-system, sans-serif;">
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
          className: 'custom-popup',
        });

        marker.on('click', () => {
          setSelectedLocation(loc);
        });

        markersRef.current.push(marker);
      });

      // Fit bounds if there are markers
      if (filteredLocations.length > 1) {
        const bounds = L.latLngBounds(filteredLocations.map(loc => [loc.latitude, loc.longitude]));
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
      } else if (filteredLocations.length === 1) {
        map.setView([filteredLocations[0].latitude, filteredLocations[0].longitude], 16);
      } else {
        map.setView(MAP_CENTER, DEFAULT_ZOOM);
      }
    };

    updateMarkers();
  }, [filteredLocations]);

  // Fly to selected location
  useEffect(() => {
    if (!leafletMapRef.current || !selectedLocation) return;

    leafletMapRef.current.flyTo(
      [selectedLocation.latitude, selectedLocation.longitude],
      17,
      { duration: 1 }
    );

    // Open popup of selected marker
    const markerIndex = filteredLocations.findIndex(loc => loc.id === selectedLocation.id);
    if (markerIndex !== -1 && markersRef.current[markerIndex]) {
      markersRef.current[markerIndex].openPopup();
    }
  }, [selectedLocation, filteredLocations]);

  if (!isMounted) {
    return (
      <div className="w-full h-[550px] bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center text-slate-400 font-medium">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p>Memuat Peta Interaktif WebGIS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-soft border border-slate-200 overflow-hidden flex flex-col lg:flex-row">
      {/* Sidebar Controls & Layers */}
      <div className="w-full lg:w-80 bg-slate-50 p-5 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col gap-4 shrink-0">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-emerald-600" />
            Layer & Kategori WebGIS
          </h3>
          <p className="text-xs text-slate-500">Pilih pemetaan tematik spasial wilayah</p>
        </div>

        <div className="flex flex-wrap lg:flex-col gap-1.5 max-h-60 lg:max-h-none overflow-y-auto pr-1">
          {categories.map(cat => {
            const catColor = categoryColors[cat];
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-between ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200/60 border border-slate-200/70'
                }`}
              >
                <span className="flex items-center gap-2">
                  {catColor && <span className="text-sm">{catColor.icon}</span>}
                  {cat}
                </span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  selectedCategory === cat ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-100 text-slate-600'
                }`}>
                  {cat === 'Semua Layer'
                    ? locations.length
                    : locations.filter(l => l.category === cat).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Map Type Toggle */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setMapType('street')}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              mapType === 'street'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            Peta
          </button>
          <button
            onClick={() => setMapType('satellite')}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              mapType === 'satellite'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Satelit
          </button>
        </div>

        {/* Selected Location Card in Sidebar */}
        {selectedLocation && (
          <div className="mt-auto p-4 bg-emerald-50 border border-emerald-200 rounded-xl animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                {categoryColors[selectedLocation.category]?.icon} {selectedLocation.category}
              </span>
              <button onClick={() => setSelectedLocation(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">{selectedLocation.name}</h4>
            <p className="text-xs text-slate-600 mb-2 leading-relaxed">{selectedLocation.description}</p>
            <div className="text-[11px] text-slate-500 flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{selectedLocation.address}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-emerald-200/50 font-mono text-[10px] text-slate-400">
              {selectedLocation.latitude.toFixed(6)}°S, {selectedLocation.longitude.toFixed(6)}°E
            </div>
          </div>
        )}
      </div>

      {/* Map View Canvas Area */}
      <div className="flex-1 min-h-[450px] lg:min-h-[600px] relative overflow-hidden">
        {/* Leaflet Map Container */}
        <div ref={mapRef} className="absolute inset-0 z-10" />

        {/* Top Floating Map Info Header */}
        <div className="absolute top-3 left-3 right-3 z-[1000] bg-white/90 backdrop-blur-md text-slate-800 p-3 rounded-xl border border-slate-200/80 flex items-center justify-between shadow-lg pointer-events-none">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
            </div>
            <div>
              <div className="text-xs font-bold tracking-wide uppercase text-emerald-700">Peta Digital Desa Pagutan</div>
              <div className="text-xs text-slate-500">Menampilkan {filteredLocations.length} titik lokasi spasial</div>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-[11px] text-slate-400">Koordinat Pusat</div>
            <div className="text-xs font-mono text-emerald-600">-8.6280° S, 116.2860° E</div>
          </div>
        </div>

        {/* Bottom Floating Legend Bar */}
        <div className="absolute bottom-3 left-3 right-3 z-[1000] bg-white/90 backdrop-blur-md text-slate-750 p-3 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs shadow-lg pointer-events-none">
          <div className="flex items-center gap-3 flex-wrap">
            {(selectedCategory === 'Semua Layer'
              ? Object.entries(categoryColors).slice(0, 5)
              : Object.entries(categoryColors).filter(([k]) => k === selectedCategory)
            ).map(([cat, colors]) => (
              <span key={cat} className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors.marker }}
                ></span>
                <span className="text-[11px] text-slate-600">{cat}</span>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-slate-500 text-[11px]">
            <Navigation className="w-3.5 h-3.5 text-emerald-600" />
            OpenStreetMap & GIS
          </div>
        </div>

        {/* Empty state */}
        {filteredLocations.length === 0 && (
          <div className="absolute inset-0 z-[500] flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="text-center text-slate-500 text-sm py-12 bg-white/90 p-8 rounded-2xl border border-slate-200 shadow-lg">
              <Info className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="font-medium text-slate-700 mb-1">Tidak ada titik lokasi</p>
              <p className="text-xs text-slate-400">Layer ini belum memiliki data untuk Desa Pagutan.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
