'use client';

import React, { useState } from 'react';
import { MapComponent } from '@/components/gis/MapComponent';
import { VillageSelector } from '@/components/common/VillageSelector';
import { mockGisLocations } from '@/lib/data/mockData';
import { VillageName } from '@/lib/types';
import { Map, Layers, Search, Info } from 'lucide-react';

export default function WebGisPage() {
  const [selectedVillage, setSelectedVillage] = useState<VillageName>('Semua Desa');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Layer');

  return (
    <div className="py-8 space-y-8">
      {/* Banner Header */}
      <section className="bg-slate-900 text-white py-10 px-4 border-b-4 border-emerald-600">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold mb-3">
            <Map className="w-3.5 h-3.5" /> Sistem Informasi Geografis Spasial (WebGIS)
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Peta Spasial Desa Pagutan & Desa Bujak</h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto mb-6">
            Pemetaan interaktif fasilitas umum, kantor pemerintahan, sekolah, sarana kesehatan, potensi ekonomi, serta rute evakuasi bencana alam.
          </p>

          <div className="bg-white/10 p-2 rounded-2xl backdrop-blur-md inline-block">
            <VillageSelector 
              selectedVillage={selectedVillage} 
              onSelectVillage={setSelectedVillage} 
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl space-y-6">
        {/* Main Leaflet Map Container */}
        <MapComponent
          locations={mockGisLocations}
          selectedVillage={selectedVillage}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Informational Footer Cards for WebGIS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Layer Tematik Lengkap</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pilih kategori di sidebar untuk menampilkan persebaran infrastruktur dan potensi secara spesifik.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Presisi Koordinat GPS</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Setiap titik diselaraskan dengan data geografis riil Kecamatan Batukliang, Lombok Tengah.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Mitigasi Bencana & Evakuasi</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fitur layer titik rawan dan jalur evakuasi membantu meningkatkan kewaspadaan masyarakat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
