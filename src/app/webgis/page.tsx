'use client';

import React, { useState } from 'react';
import { MapComponent } from '@/components/gis/MapComponent';
import { mockGisLocations } from '@/lib/data/mockData';
import { Map, Layers, Search, Info } from 'lucide-react';

export default function WebGisPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Layer');

  return (
    <div className="py-8 space-y-8 bg-slate-50 min-h-screen">
      {/* Banner Header */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white text-slate-800 py-10 px-4 border-b border-slate-200/80">
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-250 text-emerald-700 rounded-full text-xs font-semibold mb-3">
            <Map className="w-3.5 h-3.5" /> Sistem Informasi Geografis Spasial (WebGIS)
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Peta Spasial Desa Pagutan</h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl mx-auto">
            Pemetaan interaktif batas dusun, kantor desa, sekolah, rumah ibadah, sarana kesehatan, potensi wisata, serta rute evakuasi kebencanaan.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl space-y-6">
        {/* Main Leaflet Map Container */}
        <MapComponent
          locations={mockGisLocations}
          selectedVillage="Desa Pagutan"
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
                Setiap titik diselaraskan dengan data geografis riil Desa Pagutan, Batukliang, Lombok Tengah.
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
