'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockNews } from '@/lib/data/mockData';
import { VillageSelector } from '@/components/common/VillageSelector';
import { VillageName } from '@/lib/types';
import { Newspaper, Search, ChevronRight, Calendar, User } from 'lucide-react';

export default function BeritaPage() {
  const [selectedVillage, setSelectedVillage] = useState<VillageName>('Semua Desa');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Semua', 'Pengumuman', 'Pembangunan', 'Kegiatan', 'Ekonomi'];

  const filteredNews = mockNews.filter((item) => {
    const matchVillage = selectedVillage === 'Semua Desa' || item.village === selectedVillage;
    const matchCat = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchVillage && matchCat && matchSearch;
  });

  return (
    <div className="py-10 space-y-10">
      {/* Banner Header */}
      <section className="bg-slate-900 text-white py-12 px-4 border-b-4 border-emerald-600">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold mb-3">
            <Newspaper className="w-3.5 h-3.5" /> Pusat Kabar & Keterbukaan Informasi
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Berita & Pengumuman Desa</h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto mb-6">
            Dapatkan pembaruan terkini seputar kegiatan pembangunan, pengumuman layanan, serta kegiatan masyarakat di Kecamatan Batukliang.
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
        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kata kunci berita..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-soft">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-base mb-1">Berita Tidak Ditemukan</h3>
            <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian atau kategori yang Anda pilih.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <article key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all flex flex-col group">
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-800/90 backdrop-blur text-white px-2.5 py-1 rounded-md text-[11px] font-semibold">
                    {item.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur text-slate-200 px-2.5 py-0.5 rounded text-[10px]">
                    {item.village}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-emerald-600" /> {item.publishedAt}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3 text-emerald-600" /> {item.author}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <Link 
                    href={`/berita/${item.id}`} 
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 pt-3 border-t border-slate-100"
                  >
                    Baca Selengkapnya <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
