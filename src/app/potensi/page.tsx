'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { mockPotensi } from '@/lib/data/mockData';
import { PotensiItem } from '@/lib/types';
import { Sparkles, ShoppingBag, Wheat, Compass, MapPin, Phone, DollarSign, X } from 'lucide-react';

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

  const filteredPotensi = mockPotensi.filter(p => {
    return selectedTab === 'Semua' || p.category === selectedTab;
  });

  return (
    <div className="py-10 space-y-10 bg-slate-50 min-h-screen">
      {/* Banner Header */}
      <section className="bg-slate-900 text-white py-12 px-4 border-b-4 border-emerald-600">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Katalog Potensi Ekonomi & Sumber Daya Desa
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Potensi & Komoditas Desa Pagutan</h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto">
            Etalase kerajinan tradisional tenun Sasak, produk kerajinan anyaman bambu, komoditas beras pertanian subak asri, peternakan mandiri, serta ekowisata alam.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        {/* Tab Selection Navigation */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-soft flex flex-wrap items-center justify-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setSelectedTab(tab.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                {tab.name === 'Agriculture' ? 'Pertanian' : tab.name === 'Livestock' ? 'Peternakan' : tab.name === 'Tourism' ? 'Ekowisata' : tab.name}
              </button>
            );
          })}
        </div>

        {/* Potensi Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPotensi.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all flex flex-col group">
              <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                <div className="absolute top-3 left-3 bg-emerald-800/90 backdrop-blur text-white px-2.5 py-1 rounded-md text-[11px] font-semibold">
                  {item.category === 'Agriculture' ? 'Pertanian' : item.category === 'Livestock' ? 'Peternakan' : item.category === 'Tourism' ? 'Ekowisata' : item.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-3">
                    {item.description}
                  </p>
                  <div className="text-[11px] text-slate-600 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModalItem(item)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-semibold rounded-xl transition-colors text-center"
                >
                  Detail & Galeri Potensi
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail & Gallery */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 relative">
            <button 
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                {activeModalItem.category} • {activeModalItem.village}
              </span>
              <h2 className="text-2xl font-bold text-slate-900">{activeModalItem.name}</h2>

              <div className="relative h-64 rounded-2xl overflow-hidden shadow-md">
                <Image src={activeModalItem.imageUrl} alt={activeModalItem.name} fill className="object-cover" unoptimized />
              </div>

              <div className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {activeModalItem.description}
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Lokasi:</strong> {activeModalItem.location}</span>
                </div>
                {activeModalItem.priceOrYield && (
                  <div className="flex items-center gap-2 text-slate-700">
                    <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Harga / Hasil Panen:</strong> {activeModalItem.priceOrYield}</span>
                  </div>
                )}
                {activeModalItem.contactPerson && (
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Kontak Pengelola:</strong> {activeModalItem.contactPerson}</span>
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
