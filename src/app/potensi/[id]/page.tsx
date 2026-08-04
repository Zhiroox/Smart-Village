'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fetchPotensiByIdFromSupabase } from '@/lib/supabase';
import { PotensiItem } from '@/lib/types';
import {
  ArrowLeft, MapPin, Phone, Tag, Tractor, Egg,
  Store, Mountain, Leaf, Sprout, Wheat, Home, Loader2, Share2
} from 'lucide-react';
import ImageCarousel from '@/components/common/ImageCarousel';

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
  if (tag.includes('hortikultura')) return { bg: 'bg-rose-50 dark:bg-rose-950/20', border: 'border-rose-200 dark:border-rose-800/40', text: 'text-rose-600 dark:text-rose-400', badge: 'bg-rose-600', accent: 'text-rose-600' };
  if (tag.includes('palawija')) return { bg: 'bg-amber-50 dark:bg-amber-950/20', border: 'border-amber-200 dark:border-amber-800/40', text: 'text-amber-600 dark:text-amber-400', badge: 'bg-amber-600', accent: 'text-amber-600' };
  if (tag.includes('pangan utama')) return { bg: 'bg-teal-50 dark:bg-teal-950/20', border: 'border-teal-200 dark:border-teal-800/40', text: 'text-teal-600 dark:text-teal-400', badge: 'bg-teal-600', accent: 'text-teal-600' };
  if (tag.includes('ekonomi kreatif')) return { bg: 'bg-sky-50 dark:bg-sky-950/20', border: 'border-sky-200 dark:border-sky-800/40', text: 'text-sky-600 dark:text-sky-400', badge: 'bg-sky-600', accent: 'text-sky-600' };
  switch (category) {
    case 'Agriculture': return { bg: 'bg-emerald-50 dark:bg-emerald-950/20', border: 'border-emerald-200 dark:border-emerald-800/40', text: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-600', accent: 'text-emerald-600' };
    case 'Livestock': return { bg: 'bg-orange-50 dark:bg-orange-950/20', border: 'border-orange-200 dark:border-orange-800/40', text: 'text-orange-600 dark:text-orange-400', badge: 'bg-orange-600', accent: 'text-orange-600' };
    case 'UMKM': return { bg: 'bg-violet-50 dark:bg-violet-950/20', border: 'border-violet-200 dark:border-violet-800/40', text: 'text-violet-600 dark:text-violet-400', badge: 'bg-violet-600', accent: 'text-violet-600' };
    case 'Tourism': return { bg: 'bg-sky-50 dark:bg-sky-950/20', border: 'border-sky-200 dark:border-sky-800/40', text: 'text-sky-600 dark:text-sky-400', badge: 'bg-sky-600', accent: 'text-sky-600' };
    default: return { bg: 'bg-slate-50 dark:bg-slate-950/20', border: 'border-slate-200 dark:border-slate-800/40', text: 'text-slate-600 dark:text-slate-400', badge: 'bg-slate-600', accent: 'text-slate-600' };
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

export default function PotensiDetailPage() {
  const params = useParams();
  const potensiId = params?.id as string;

  const [item, setItem] = useState<PotensiItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      if (!potensiId) return;
      setLoading(true);
      const data = await fetchPotensiByIdFromSupabase(potensiId);
      setItem(data);
      setLoading(false);
    };
    loadDetail();
  }, [potensiId]);

  if (loading) {
    return (
      <div className="py-20 bg-slate-50 dark:bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-violet-600 animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-medium">Memuat detail potensi desa...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="py-20 bg-slate-50 dark:bg-slate-900 min-h-screen text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Data Tidak Ditemukan</h2>
        <Link href="/potensi" className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-violet-600 px-4 py-2 rounded-xl">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Potensi
        </Link>
      </div>
    );
  }

  const colors = getCategoryColors(item.category, item.priceOrYield);

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl space-y-6">
        {/* Back button */}
        <Link
          href="/potensi"
          className="inline-flex items-center gap-2 text-xs font-semibold text-violet-700 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 bg-violet-50 dark:bg-violet-950/30 px-3 py-1.5 rounded-lg border border-violet-200 dark:border-violet-800/40 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Daftar Potensi
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm"
        >
          {/* Header Badges */}
          <div className="p-6 md:p-8 pb-0 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`${colors.badge} text-white px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5`}>
                {getCategoryIcon(item.category, item.priceOrYield)}
                {getCategoryLabel(item.category)}
              </span>
              <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-600" /> {item.village}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {item.name}
            </h1>
          </div>

          {/* Featured Image / Gallery Carousel */}
          {(() => {
            const slides = [item.imageUrl, ...(item.gallery || [])].filter(Boolean);
            return <ImageCarousel images={slides} alt={item.name} className="mt-6" />;
          })()}

          {/* Content */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Description */}
            <div>
              <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Deskripsi</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
              <div className={`${colors.bg} ${colors.border} border rounded-xl p-4 space-y-1`}>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <MapPin className={`w-4 h-4 ${colors.accent}`} /> Lokasi
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">{item.location || '-'}</p>
              </div>

              {item.contactPerson && (
                <div className={`${colors.bg} ${colors.border} border rounded-xl p-4 space-y-1`}>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <Phone className={`w-4 h-4 ${colors.accent}`} /> Kontak
                  </div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">{item.contactPerson}</p>
                </div>
              )}

              {item.priceOrYield && (
                <div className={`${colors.bg} ${colors.border} border rounded-xl p-4 space-y-1`}>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <Tag className={`w-4 h-4 ${colors.accent}`} /> Harga / Hasil
                  </div>
                  <p className={`text-sm font-semibold ${colors.text}`}>{item.priceOrYield}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Tag className="w-3 h-3 text-violet-500" />
                Kategori: {getCategoryLabel(item.category)} · Desa Pagutan
              </p>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Link berhasil disalin!');
                }}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" /> Bagikan
              </button>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
