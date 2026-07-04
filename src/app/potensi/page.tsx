'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { mockPotensi } from '@/lib/data/mockData';
import { PotensiItem } from '@/lib/types';
import { Sparkles, ShoppingBag, Wheat, Compass, MapPin, Phone, DollarSign, X, ChevronRight } from 'lucide-react';

const categoryColorMap: Record<string, string> = {
  'UMKM': 'bg-emerald-600',
  'Agriculture': 'bg-amber-600',
  'Livestock': 'bg-orange-600',
  'Tourism': 'bg-blue-600',
};

export default function PotensiPage() {
  const [selectedTab, setSelectedTab] = useState<string>('Semua');
  const [activeModalItem, setActiveModalItem] = useState<PotensiItem | null>(null);

  const tabs = [
    { name: 'Semua', icon: Sparkles },
    { name: 'UMKM', icon: ShoppingBag },
    { name: 'Agriculture', icon: Wheat },
    { name: 'Livestock', icon: Compass },
    { name: 'Tourism', icon: Compass },
  ];

  const getLabel = (cat: string) => {
    if (cat === 'Agriculture') return 'Pertanian';
    if (cat === 'Livestock') return 'Peternakan';
    if (cat === 'Tourism') return 'Ekowisata';
    return cat;
  };

  const filteredPotensi = mockPotensi.filter(p => {
    return selectedTab === 'Semua' || p.category === selectedTab;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-900">
      {/* Banner Header */}
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500/8 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 rounded-full text-xs font-semibold mb-5">
            <Sparkles className="w-3.5 h-3.5" /> Katalog Potensi Ekonomi &amp; Sumber Daya Desa
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Potensi &amp;{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Komoditas Desa
            </span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
            Etalase kerajinan tradisional tenun Sasak, produk kerajinan anyaman bambu, komoditas beras pertanian subak asri, peternakan mandiri, serta ekowisata alam.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-10 space-y-8">
        {/* Tab Selection */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-2xl flex flex-wrap items-center justify-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setSelectedTab(tab.name)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/8'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                {getLabel(tab.name)}
              </button>
            );
          })}
        </div>

        {/* Potensi Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPotensi.map((item) => (
            <div key={item.id} className="group bg-white/5 hover:bg-white/8 border border-white/10 hover:border-emerald-400/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/10 flex flex-col">
              <div className="relative h-52 w-full bg-slate-800 overflow-hidden">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                <div className={`absolute top-3 left-3 ${categoryColorMap[item.category] || 'bg-slate-600'} backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-semibold`}>
                  {getLabel(item.category)}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-3 group-hover:text-slate-400 transition-colors">
                    {item.description}
                  </p>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModalItem(item)}
                  className="w-full py-2.5 bg-white/5 hover:bg-emerald-600 border border-white/10 hover:border-emerald-500 text-slate-400 hover:text-white text-xs font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 group/btn"
                >
                  Detail &amp; Galeri Potensi
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail & Gallery */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setActiveModalItem(null)}>
          <div className="bg-slate-800 border border-white/15 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 relative" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <span className={`text-xs font-bold uppercase tracking-wider text-white ${categoryColorMap[activeModalItem.category] || 'bg-slate-600'} px-3 py-1.5 rounded-full inline-block`}>
                {getLabel(activeModalItem.category)} &bull; {activeModalItem.village}
              </span>
              <h2 className="text-2xl font-bold text-white">{activeModalItem.name}</h2>

              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image src={activeModalItem.imageUrl} alt={activeModalItem.name} fill className="object-cover" unoptimized />
              </div>

              <div className="text-sm text-slate-400 leading-relaxed">
                {activeModalItem.description}
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-3 text-xs">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span><strong className="text-white">Lokasi:</strong> {activeModalItem.location}</span>
                </div>
                {activeModalItem.priceOrYield && (
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center">
                      <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <span><strong className="text-white">Harga / Hasil Panen:</strong> {activeModalItem.priceOrYield}</span>
                  </div>
                )}
                {activeModalItem.contactPerson && (
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center">
                      <Phone className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <span><strong className="text-white">Kontak Pengelola:</strong> {activeModalItem.contactPerson}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
