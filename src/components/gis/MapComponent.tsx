'use client';

import React, { useEffect, useState } from 'react';
import { GisLocation } from '@/lib/types';
import { Layers, MapPin, Navigation, Info } from 'lucide-react';

interface MapComponentProps {
  locations: GisLocation[];
  selectedVillage: string;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  locations,
  selectedCategory,
  onSelectCategory,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<GisLocation | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  if (!isMounted) {
    return (
      <div className="w-full h-[550px] bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center text-slate-400 font-medium">
        Memuat Peta Interaktif WebGIS...
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
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200/60 border border-slate-200/70'
              }`}
            >
              <span>{cat}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                selectedCategory === cat ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-100 text-slate-600'
              }`}>
                {cat === 'Semua Layer'
                  ? locations.length
                  : locations.filter(l => l.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Location Card in Sidebar */}
        {selectedLocation && (
          <div className="mt-auto p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                {selectedLocation.category}
              </span>
              <button onClick={() => setSelectedLocation(null)} className="text-slate-400 hover:text-slate-600 text-xs">✕</button>
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">{selectedLocation.name}</h4>
            <p className="text-xs text-slate-600 mb-2 leading-relaxed">{selectedLocation.description}</p>
            <div className="text-[11px] text-slate-500 flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{selectedLocation.address}</span>
            </div>
          </div>
        )}
      </div>

      {/* Map View Canvas Area */}
      <div className="flex-1 min-h-[450px] lg:min-h-[550px] relative bg-slate-50 overflow-hidden flex flex-col justify-between p-6 border-t lg:border-t-0 lg:border-l border-slate-200">
        {/* Top Floating Map Info Header */}
        <div className="z-20 bg-white/95 backdrop-blur-md text-slate-800 p-3.5 rounded-xl border border-slate-200/80 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
            <div>
              <div className="text-xs font-bold tracking-wide uppercase text-emerald-700">Peta Digital Desa Pagutan</div>
              <div className="text-xs text-slate-500">Menampilkan {filteredLocations.length} titik lokasi spasial</div>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-[11px] text-slate-400">Koordinat Pusat</div>
            <div className="text-xs font-mono text-emerald-600">-8.6254° S, 116.2812° E</div>
          </div>
        </div>

        {/* Dynamic Vector GIS Layout Matrix */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-8 opacity-90">
          {/* Stylized Topographic Lines Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
          
          {/* Location Pins Interactive Overlay */}
          <div className="relative w-full h-full max-w-2xl max-h-96 border border-slate-200 rounded-3xl bg-white/80 backdrop-blur-xs p-6 flex flex-wrap items-center justify-center gap-6 overflow-auto shadow-inner">
            {filteredLocations.length === 0 ? (
              <div className="text-center text-slate-500 text-sm py-12">
                <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                Tidak ada titik lokasi pada layer ini untuk Desa Pagutan.
              </div>
            ) : (
              filteredLocations.map((loc) => {
                const isSelected = selectedLocation?.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`group relative p-3.5 rounded-xl transition-all duration-300 text-left flex items-start gap-3 border ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-400 ring-4 ring-emerald-55/30 scale-105 z-30 shadow-md'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500/50 hover:bg-slate-50 shadow-xs'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-snug">{loc.name}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-slate-550'}`}>
                        {loc.category}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Bottom Floating Legend Bar */}
        <div className="z-20 bg-white/95 backdrop-blur-md text-slate-750 p-3 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs shadow-md">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Desa Pagutan</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 text-[11px]">
            <Navigation className="w-3.5 h-3.5 text-emerald-600" /> OpenStreetMap & GIS Layer Active
          </div>
        </div>
      </div>
    </div>
  );
};
