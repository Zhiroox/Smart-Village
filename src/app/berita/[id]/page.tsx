'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { fetchNewsByIdFromSupabase } from '@/lib/supabase';
import { NewsItem } from '@/lib/types';
import { ArrowLeft, Calendar, User, Tag, MapPin, Share2, Loader2 } from 'lucide-react';
import ImageCarousel from '@/components/common/ImageCarousel';

export default function BeritaDetailPage() {
  const params = useParams();
  const newsId = params?.id as string;

  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadNewsDetail = async () => {
      if (!newsId) return;
      setLoading(true);
      const data = await fetchNewsByIdFromSupabase(newsId);
      setNewsItem(data);
      setLoading(false);
    };
    loadNewsDetail();
  }, [newsId]);

  if (loading) {
    return (
      <div className="py-20 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-medium">Memuat berita desa...</p>
        </div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="py-20 bg-slate-50 min-h-screen text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Berita Tidak Ditemukan</h2>
        <Link href="/berita" className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-emerald-600 px-4 py-2 rounded-xl">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Berita
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl space-y-6">
        <Link 
          href="/berita" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Berita Desa
        </Link>

        <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-soft p-6 md:p-10 space-y-6">
          {/* Article Header */}
          <div className="space-y-3 pb-6 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              {(newsItem.categories?.length ? newsItem.categories : [newsItem.category]).map(cat => (
                <span key={cat} className="bg-emerald-800 text-white px-3 py-1 rounded-md text-xs font-semibold">
                  {cat}
                </span>
              ))}
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-600" /> {newsItem.village}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              {newsItem.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-emerald-600" /> {newsItem.publishedAt}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                Ditulis oleh {(newsItem.authors?.length ? newsItem.authors : [newsItem.author]).join(', ')}
              </span>
            </div>
          </div>

          {/* Featured Image / Gallery Carousel */}
          {(() => {
            const slides = [newsItem.imageUrl, ...(newsItem.gallery || [])].filter(Boolean);
            return <ImageCarousel images={slides} alt={newsItem.title} />;
          })()}

          {/* Article Content Body */}
          <div className="prose prose-slate max-w-none text-xs md:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
            {newsItem.content}
          </div>

          {/* Footer Share / Tags */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Tag className="w-3.5 h-3.5 text-emerald-600" /> Kata Kunci: Smart Village, Batukliang, {(newsItem.categories?.length ? newsItem.categories : [newsItem.category]).join(', ')}
            </div>
            <button 
              onClick={() => alert('Link artikel berhasil disalin!')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" /> Bagikan
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
