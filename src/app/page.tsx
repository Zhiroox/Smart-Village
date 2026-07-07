'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StatCard } from '@/components/common/StatCard';
import { mockQuickStats, mockNews, mockPotensi } from '@/lib/data/mockData';
import { 
  Users, 
  MapPin, 
  ShoppingBag, 
  Wheat, 
  Compass, 
  ArrowRight, 
  FileCheck2, 
  Search, 
  ShieldCheck, 
  Sparkles,
  Newspaper,
  ChevronRight,
  ShieldAlert,
  Zap,
  TrendingUp
} from 'lucide-react';

export default function HomePage() {
  const stats = mockQuickStats['Desa Pagutan'];
  const news = mockNews;
  const potensi = mockPotensi;

  return (
    <div className="space-y-0 pb-0 bg-slate-50">
      {/* ======= HERO SECTION ======= */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white text-slate-800 pt-12 pb-16 md:pt-16 md:pb-24 px-4 overflow-hidden border-b border-slate-200/80">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
        
        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/3 rounded-full blur-3xl" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Portal Resmi Digital Smart Village
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-5 md:mb-6 leading-[1.1]">
              Selamat Datang di{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                Portal Desa Pagutan
              </span>
            </h1>
            
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-7 md:mb-10 max-w-2xl px-2 md:px-0">
              Pusat transparansi informasi publik, tata kelola pemerintahan digital, pengajuan surat mandiri online, serta katalog potensi ekonomi &amp; pariwisata Kecamatan Batukliang, Kabupaten Lombok Tengah.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
              <Link
                href="/layanan"
                className="group px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 active:from-emerald-700 active:to-emerald-600 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <FileCheck2 className="w-4 h-4 shrink-0" />
                Pengajuan Surat Online
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/webgis"
                className="group px-6 py-3.5 rounded-xl bg-white active:bg-slate-100 text-slate-700 font-semibold text-sm border border-slate-200 shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                Jelajahi Peta WebGIS
              </Link>
            </div>
          </div>

          {/* Quick Statistics Banner */}
          <div className="grid grid-cols-2 gap-3 md:gap-5 pt-6 md:pt-8 border-t border-slate-200">
            <StatCard title="Jumlah Penduduk" value={stats.population} unit="Jiwa" icon={Users} color="emerald" />
            <StatCard title="Wilayah Dusun" value={stats.dusunCount} unit="Dusun" icon={MapPin} color="blue" />
            <StatCard title="Lahan Pertanian" value={stats.farmlandArea} unit="Ha" icon={Wheat} color="purple" />
            <StatCard title="Spot Wisata" value={stats.tourismSpots} unit="Lokasi" icon={Compass} color="rose" />
          </div>
        </div>
      </section>

      {/* ======= SAMBUTAN KEPALA DESA ======= */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 backdrop-blur-sm rounded-3xl border border-slate-200 p-6 md:p-10 shadow-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
            
            <div className="md:col-span-4 relative flex justify-center z-10">
              <div className="relative w-48 h-60 md:w-full md:h-72 rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-200">
                <Image 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" 
                  alt="Kepala Desa" 
                  fill 
                  className="object-cover object-top"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
              </div>
              <div className="absolute -bottom-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-2 rounded-full text-xs font-bold shadow-md shadow-emerald-600/30">
                Pemerintah Desa
              </div>
            </div>

            <div className="md:col-span-8 space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-250/30 text-emerald-700 rounded-lg text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Sambutan Resmi
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                Komitmen Pelayanan Publik &amp; Transformasi Desa Digital
              </h2>
              <p className="text-slate-650 text-sm leading-relaxed">
                &ldquo;Selamat datang di Portal Smart Village Desa Pagutan, Kecamatan Batukliang. Website ini hadir sebagai wujud komitmen transparansi, keterbukaan informasi, serta efisiensi pelayanan masyarakat bagi seluruh warga Desa Pagutan. Kami terus berinovasi untuk mempermudah akses administratif dan mempromosikan seluruh potensi ekonomi lokal ke tingkat yang lebih luas.&rdquo;
              </p>
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800 text-sm">Subandi</div>
                  <div className="text-xs text-slate-500">Kepala Desa Pagutan</div>
                </div>
                <Link href="/profil" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors group">
                  Baca Profil Desa <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= LAYANAN CEPAT ======= */}
      <section className="bg-slate-50 py-16 px-4 border-y border-slate-200/60">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg text-xs font-semibold mb-4">
              <Zap className="w-3.5 h-3.5" /> Akses Cepat
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Layanan Utama Mandiri</h2>
            <p className="text-sm text-slate-500">Akses cepat ke modul administrasi, informasi publik, dan pemetaan desa</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            <Link href="/layanan" className="group relative bg-white active:bg-emerald-50/50 border border-slate-200 p-4 md:p-6 rounded-2xl transition-all duration-200 flex flex-col">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 md:mb-5">
                <FileCheck2 className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base mb-1 md:mb-2">Surat Online</h3>
              <p className="text-xs text-slate-500 leading-relaxed hidden sm:block">Pengajuan permohonan surat keterangan mandiri</p>
              <ChevronRight className="absolute bottom-3 right-3 md:bottom-5 md:right-5 w-4 h-4 text-slate-400" />
            </Link>

            <Link href="/layanan" className="group relative bg-white active:bg-blue-50/50 border border-slate-200 p-4 md:p-6 rounded-2xl transition-all duration-200 flex flex-col">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 md:mb-5">
                <Search className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base mb-1 md:mb-2">Cek Status Resi</h3>
              <p className="text-xs text-slate-500 leading-relaxed hidden sm:block">Lacak posisi dan verifikasi pengajuan surat keterangan</p>
              <ChevronRight className="absolute bottom-3 right-3 md:bottom-5 md:right-5 w-4 h-4 text-slate-400" />
            </Link>

            <Link href="/webgis" className="group relative bg-white active:bg-amber-50/50 border border-slate-200 p-4 md:p-6 rounded-2xl transition-all duration-200 flex flex-col">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 md:mb-5">
                <MapPin className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base mb-1 md:mb-2">Peta WebGIS</h3>
              <p className="text-xs text-slate-500 leading-relaxed hidden sm:block">Pemetaan spasial batas desa, sarana umum, dan titik wisata</p>
              <ChevronRight className="absolute bottom-3 right-3 md:bottom-5 md:right-5 w-4 h-4 text-slate-400" />
            </Link>

            <Link href="/layanan?tab=kekerasan" className="group relative bg-white active:bg-rose-50/50 border border-slate-200 p-4 md:p-6 rounded-2xl transition-all duration-200 flex flex-col">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3 md:mb-5">
                <ShieldAlert className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base mb-1 md:mb-2">Lapor Kekerasan</h3>
              <p className="text-xs text-slate-500 leading-relaxed hidden sm:block">Sistem Pelaporan Kasus Kekerasan PPA</p>
              <ChevronRight className="absolute bottom-3 right-3 md:bottom-5 md:right-5 w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* ======= BERITA TERBARU ======= */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
                <Newspaper className="w-4 h-4" /> Informasi Publik
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Berita &amp; Pengumuman Terbaru</h2>
            </div>
            <Link href="/berita" className="mt-4 md:mt-0 text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors group">
              Lihat Semua Berita <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {news.slice(0, 3).map((item) => (
              <article key={item.id} className="group bg-white border border-slate-200 hover:border-emerald-350 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50 flex flex-col">
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
                  <div className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-semibold">
                    {item.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] text-slate-500 mb-2">{item.publishedAt} • Oleh {item.author}</div>
                    <h3 className="font-bold text-slate-800 text-base group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <Link 
                    href={`/berita/${item.id}`} 
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 pt-3 border-t border-slate-100 transition-colors group/link"
                  >
                    Baca Selengkapnya <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======= HIGHLIGHT POTENSI DESA ======= */}
      <section className="bg-slate-50 py-16 px-4 border-t border-slate-200/60">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Ekonomi &amp; Pariwisata Lokal
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  Dukung Produk Unggulan UMKM &amp; Destinasi Wisata Desa Pagutan
                </h2>
                <p className="text-slate-550 text-sm leading-relaxed">
                  Jelajahi kerajinan tenun khas Sasak, olahan bambu ramah lingkungan, komoditas beras organik subak, hingga spot ekowisata panorama sawah di Desa Pagutan.
                </p>
                <div className="pt-2">
                  <Link
                    href="/potensi"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-sm transition-all duration-200 shadow-xl shadow-emerald-600/20 hover:-translate-y-0.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Kunjungi Katalog Potensi Desa
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                {potensi.slice(0, 2).map(item => (
                  <div key={item.id} className="bg-slate-50 border border-slate-200 hover:border-emerald-300 rounded-2xl p-4 transition-all duration-200 group hover:-translate-y-1 hover:shadow-md">
                    <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-emerald-700 transition-colors">{item.name}</h4>
                    <p className="text-[11px] text-emerald-650 font-semibold mt-0.5">{item.category} • {item.village}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
