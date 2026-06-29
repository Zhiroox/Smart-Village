'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { VillageSelector } from '@/components/common/VillageSelector';
import { mockGallery } from '@/lib/data/mockData';
import { VillageName } from '@/lib/types';
import { Image as ImageIcon, Video, Calendar, Tag, Play } from 'lucide-react';

export default function GaleriPage() {
  const [selectedVillage, setSelectedVillage] = useState<VillageName>('Semua Desa');
  const [activeFilter, setActiveFilter] = useState<'all' | 'photo' | 'video'>('all');

  const filteredGallery = mockGallery.filter(item => {
    const matchVillage = selectedVillage === 'Semua Desa' || item.village === selectedVillage;
    const matchType = activeFilter === 'all' || item.type === activeFilter;
    return matchVillage && matchType;
  });

  return (
    <div className="py-10 space-y-10">
      {/* Banner Header */}
      <section className="bg-slate-900 text-white py-12 px-4 border-b-4 border-emerald-600">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold mb-3">
            <ImageIcon className="w-3.5 h-3.5" /> Dokumentasi Kegiatan & Keindahan Wilayah
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Galeri Foto & Video Desa</h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto mb-6">
            Kumpulan potret momen penting pembangunan, musyawarah desa, kegiatan kebudayaan Sasak, serta panorama alam Kecamatan Batukliang.
          </p>

          <div className="bg-white/10 p-2 rounded-2xl backdrop-blur-md inline-block">
            <VillageSelector 
              selectedVillage={selectedVillage} 
              onSelectVillage={setSelectedVillage} 
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        {/* Type Filter Buttons */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'all' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Semua Media
          </button>
          <button
            onClick={() => setActiveFilter('photo')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeFilter === 'photo' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" /> Galeri Foto
          </button>
          <button
            onClick={() => setActiveFilter('video')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeFilter === 'video' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Video className="w-3.5 h-3.5" /> Dokumentasi Video
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all group">
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                <Image src={item.url} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-emerald-800/90 text-white px-2.5 py-1 rounded-md text-[11px] font-semibold">
                  {item.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-900/80 text-slate-200 px-2 py-0.5 rounded text-[10px]">
                  {item.village}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">{item.title}</h4>
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-600" /> {item.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
