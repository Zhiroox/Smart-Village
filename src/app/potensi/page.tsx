'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fetchPotensiFromSupabase } from '@/lib/supabase';
import { PotensiItem } from '@/lib/types';
import { 
  Wheat, Sprout, Egg, Home, 
  Sparkles, Leaf, Award, Globe,
  Store, Tractor, Mountain, MapPin, Phone, Tag, Loader2
} from 'lucide-react';

// ── Helper: derive visual styling from PotensiItem fields ──
const getCategoryIcon = (category: string, priceOrYield?: string): React.ReactNode => {
  const tag = (priceOrYield || '').toLowerCase();
  if (tag.includes('hortikultura')) return <Sprout className="w-5 h-5" />;
  if (tag.includes('palawija')) return <Wheat className="w-5 h-5" />;
  if (tag.includes('pangan utama')) return <Wheat className="w-5 h-5" />;
  if (tag.includes('ekonomi kreatif')) return <Home className="w-5 h-5" />;

  switch (category) {
    case 'Agriculture': return <Tractor className="w-5 h-5" />;
    case 'Livestock': return <Egg className="w-5 h-5" />;
    case 'UMKM': return <Store className="w-5 h-5" />;
    case 'Tourism': return <Mountain className="w-5 h-5" />;
    default: return <Leaf className="w-5 h-5" />;
  }
};

const getCategoryColors = (category: string, priceOrYield?: string) => {
  const tag = (priceOrYield || '').toLowerCase();
  if (tag.includes('hortikultura')) return { bg: 'bg-rose-50 dark:bg-rose-950/20', border: 'border-rose-200 dark:border-rose-800/40', text: 'text-rose-600 dark:text-rose-400', badge: 'bg-rose-600' };
  if (tag.includes('palawija')) return { bg: 'bg-amber-50 dark:bg-amber-950/20', border: 'border-amber-200 dark:border-amber-800/40', text: 'text-amber-600 dark:text-amber-400', badge: 'bg-amber-600' };
  if (tag.includes('pangan utama')) return { bg: 'bg-teal-50 dark:bg-teal-950/20', border: 'border-teal-200 dark:border-teal-800/40', text: 'text-teal-600 dark:text-teal-400', badge: 'bg-teal-600' };
  if (tag.includes('ekonomi kreatif')) return { bg: 'bg-sky-50 dark:bg-sky-950/20', border: 'border-sky-200 dark:border-sky-800/40', text: 'text-sky-600 dark:text-sky-400', badge: 'bg-sky-600' };

  switch (category) {
    case 'Agriculture': return { bg: 'bg-emerald-50 dark:bg-emerald-950/20', border: 'border-emerald-200 dark:border-emerald-800/40', text: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-600' };
    case 'Livestock': return { bg: 'bg-orange-50 dark:bg-orange-950/20', border: 'border-orange-200 dark:border-orange-800/40', text: 'text-orange-600 dark:text-orange-400', badge: 'bg-orange-600' };
    case 'UMKM': return { bg: 'bg-violet-50 dark:bg-violet-950/20', border: 'border-violet-200 dark:border-violet-800/40', text: 'text-violet-600 dark:text-violet-400', badge: 'bg-violet-600' };
    case 'Tourism': return { bg: 'bg-sky-50 dark:bg-sky-950/20', border: 'border-sky-200 dark:border-sky-800/40', text: 'text-sky-600 dark:text-sky-400', badge: 'bg-sky-600' };
    default: return { bg: 'bg-slate-50 dark:bg-slate-950/20', border: 'border-slate-200 dark:border-slate-800/40', text: 'text-slate-600 dark:text-slate-400', badge: 'bg-slate-600' };
  }
};

const getCategoryLabel = (cat: string) => {
  switch (cat) {
    case 'UMKM': return 'UMKM';
    case 'Agriculture': return 'Pertanian';
    case 'Livestock': return 'Peternakan';
    case 'Tourism': return 'Pariwisata';
    default: return cat;
  }
};

const getDisplayTag = (item: PotensiItem): string => {
  const py = (item.priceOrYield || '').trim();
  if (py && !py.startsWith('Rp') && !py.startsWith('Hasil') && !py.startsWith('Tiket')) return py;
  return getCategoryLabel(item.category);
};

const getShortDesc = (desc: string, maxLen = 120): string => {
  if (desc.length <= maxLen) return desc;
  const dotIdx = desc.indexOf('.', 40);
  if (dotIdx > 0 && dotIdx < maxLen + 30) return desc.slice(0, dotIdx + 1);
  return desc.slice(0, maxLen).trimEnd() + '…';
};

export default function PotensiPage() {
  const detailsRef = useRef<HTMLDivElement>(null);

  // All potensi data from admin / Supabase
  const [allItems, setAllItems] = useState<PotensiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string>('');
  const [potensiFilter, setPotensiFilter] = useState<string>('Semua');

  useEffect(() => {
    const loadPotensi = async () => {
      setLoading(true);
      const data = await fetchPotensiFromSupabase();
      setAllItems(data);
      if (data.length > 0) setSelectedId(data[0].id);
      setLoading(false);
    };
    loadPotensi();
  }, []);

  const selectedItem = allItems.find(i => i.id === selectedId) || allItems[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (window.innerWidth < 1024) {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Category filter for the grid section
  const potensiCategories = ['Semua', 'UMKM', 'Agriculture', 'Livestock', 'Tourism'];
  const filteredPotensi = potensiFilter === 'Semua'
    ? allItems
    : allItems.filter(p => p.category === potensiFilter);

  // Determine grid columns for the carousel based on item count
  const carouselCols = allItems.length <= 4 ? 'grid-cols-2 sm:grid-cols-4' 
    : allItems.length <= 6 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6' 
    : 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* ── HERO BANNER SECTION ── */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 text-white border-b border-emerald-800/30">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image 
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200" 
            alt="Desa Pagutan Farmland" 
            fill 
            className="object-cover filter blur-[2px]" 
            priority
          />
        </div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/15 border border-emerald-450/30 text-emerald-400 rounded-full text-xs font-semibold mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5" /> 
            Potensi Sumber Daya &amp; Sektor Utama
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight"
          >
            Produk &amp; Komoditas <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-350 to-emerald-300 bg-clip-text text-transparent">
              Unggulan Desa Pagutan
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-350 text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Berbagai produk dan komoditas unggulan hasil bumi, peternakan, dan kerajinan lokal 
            yang menjadi kekuatan ekonomi Desa Pagutan serta sumber penghidupan masyarakat.
          </motion.p>
        </div>
      </section>



      {/* ── INFORMATIONAL PROFIL UNGGULAN SECTION ── */}
      <section className="py-12 md:py-16 px-4 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="container mx-auto max-w-4xl text-center space-y-4">
          <span className="text-xs uppercase font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider">
            Profil Unggulan
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Membangun Kemandirian Ekonomi dari Kekayaan Alam dan Kreativitas Warga
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Sektor pertanian, peternakan, dan ekonomi kreatif merupakan pilar utama penggerak kesejahteraan di Desa Pagutan. Berkat lahan yang subur dan ketekunan para warga, Desa Pagutan secara konsisten menghasilkan ragam komoditas pangan berkualitas serta kerajinan bernilai guna tinggi.
          </p>
        </div>
      </section>

      {/* ── DIREKTORI UMKM & POTENSI DESA (GRID VIEW) ── */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="container mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-50 dark:bg-violet-950/30 border border-violet-200/60 dark:border-violet-800/40 text-violet-700 dark:text-violet-400 rounded-full text-xs font-semibold mb-4"
            >
              <Store className="w-3.5 h-3.5" /> Direktori Potensi Desa
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight"
            >
              Semua Usaha &{' '}
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Potensi Ekonomi Desa
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
            >
              Daftar lengkap UMKM, potensi pertanian, peternakan, dan wisata yang dikelola oleh warga Desa Pagutan.
            </motion.p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {potensiCategories.map((cat) => {
              const isActive = potensiFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setPotensiFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                  }`}
                >
                  {getCategoryLabel(cat)}
                </button>
              );
            })}
          </div>

          {/* Content */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-pulse">
                  <div className="h-48 bg-slate-200 dark:bg-slate-700" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPotensi.length === 0 ? (
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-12 text-center">
              <Store className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-700 dark:text-slate-300 text-base mb-1">Belum Ada Data</h3>
              <p className="text-xs text-slate-400">Data potensi untuk kategori ini belum tersedia.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPotensi.map((item, idx) => {
                const colors = getCategoryColors(item.category, item.priceOrYield);
                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.06 }}
                    className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-700 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/5 flex flex-col shadow-sm"
                  >
                    <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-750 overflow-hidden">
                      <Image
                        src={item.imageUrl || 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=600'}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className={`absolute top-3 left-3 ${colors.badge} text-white px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 backdrop-blur-sm`}>
                        {getCategoryIcon(item.category, item.priceOrYield)}
                        {getCategoryLabel(item.category)}
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-700 dark:text-slate-300 px-2 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        {item.village}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-bold text-slate-800 dark:text-white text-base group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors line-clamp-2 leading-snug mb-2">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                          {getShortDesc(item.description, 150)}
                        </p>
                      </div>

                      <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                          <MapPin className="w-3 h-3 text-violet-500 shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </div>
                        {item.contactPerson && (
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                            <Phone className="w-3 h-3 text-violet-500 shrink-0" />
                            <span className="truncate">{item.contactPerson}</span>
                          </div>
                        )}
                        {item.priceOrYield && (
                          <div className="flex items-center gap-2 text-[11px]">
                            <Tag className="w-3 h-3 text-violet-500 shrink-0" />
                            <span className={`font-semibold ${colors.text}`}>{item.priceOrYield}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
