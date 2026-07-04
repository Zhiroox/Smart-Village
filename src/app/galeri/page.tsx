'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { mockGallery } from '@/lib/data/mockData';
import { Image as ImageIcon, Video, Calendar, Play } from 'lucide-react';

export default function GaleriPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'photo' | 'video'>('all');

  const filteredGallery = mockGallery.filter(item => {
    return activeFilter === 'all' || item.type === activeFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-900">
      {/* Banner Header */}
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 rounded-full text-xs font-semibold mb-5">
            <ImageIcon className="w-3.5 h-3.5" /> Dokumentasi Kegiatan &amp; Keindahan Wilayah
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Galeri Foto &amp;{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Video Desa</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
            Kumpulan potret momen penting pembangunan, musyawarah desa, kegiatan kebudayaan Sasak, serta panorama alam Desa Pagutan.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-10 space-y-8">
        {/* Type Filter Buttons */}
        <div className="flex justify-center gap-2 flex-wrap">
          {[
            { key: 'all', label: 'Semua Media', Icon: null },
            { key: 'photo', label: 'Galeri Foto', Icon: ImageIcon },
            { key: 'video', label: 'Dokumentasi Video', Icon: Video },
          ].map(btn => (
            <button
              key={btn.key}
              onClick={() => setActiveFilter(btn.key as 'all' | 'photo' | 'video')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeFilter === btn.key
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {btn.Icon && <btn.Icon className="w-3.5 h-3.5" />}
              {btn.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGallery.map(item => (
            <div key={item.id} className="group bg-white/5 hover:bg-white/8 border border-white/10 hover:border-emerald-400/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/10">
              <div className="relative h-56 w-full bg-slate-800 overflow-hidden">
                <Image src={item.url} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-600/90 backdrop-blur-sm text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-emerald-700/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-semibold">
                  {item.category}
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors">{item.title}</h4>
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-500" /> {item.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
