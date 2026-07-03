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
  ShieldAlert
} from 'lucide-react';

export default function HomePage() {
  const stats = mockQuickStats['Desa Pagutan'];
  const news = mockNews;
  const potensi = mockPotensi;

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 text-white pt-12 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-15 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
            <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Portal Resmi Digital Smart Village
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Selamat Datang di Portal <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                Desa Pagutan
              </span>
            </h1>
            
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
              Pusat transparansi informasi publik, tata kelola pemerintahan digital, pengajuan surat mandiri online, serta katalog potensi ekonomi & pariwisata Kecamatan Batukliang, Kabupaten Lombok Tengah.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/layanan"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 group"
              >
                <FileCheck2 className="w-4 h-4" />
                Pengajuan Surat Online
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/webgis"
                className="px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                Jelajahi Peta WebGIS
              </Link>
            </div>
          </div>

          {/* Quick Statistics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-6 border-t border-slate-800/80">
            <StatCard
              title="Jumlah Penduduk"
              value={stats.population}
              unit="Jiwa"
              icon={Users}
            />
            <StatCard
              title="Wilayah Dusun"
              value={stats.dusunCount}
              unit="Dusun"
              icon={MapPin}
            />
            <StatCard
              title="Pelaku UMKM"
              value={stats.umkmCount}
              unit="Usaha"
              icon={ShoppingBag}
            />
            <StatCard
              title="Lahan Pertanian"
              value={stats.farmlandArea}
              unit="Ha"
              icon={Wheat}
            />
            <StatCard
              title="Spot Wisata"
              value={stats.tourismSpots}
              unit="Lokasi"
              icon={Compass}
            />
          </div>
        </div>
      </section>

      {/* Sambutan Kepala Desa Section */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10 shadow-soft grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 relative flex justify-center">
            <div className="relative w-48 h-60 md:w-full md:h-72 rounded-2xl overflow-hidden shadow-md border-4 border-slate-100">
              <Image 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" 
                alt="Kepala Desa" 
                fill 
                className="object-cover object-top"
                unoptimized
              />
            </div>
            <div className="absolute -bottom-3 bg-emerald-800 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-md">
              Pemerintah Desa
            </div>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Sambutan Resmi
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Komitmen Pelayanan Publik & Transformasi Desa Digital
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              &ldquo;Selamat datang di Portal Smart Village Desa Pagutan, Kecamatan Batukliang. Website ini hadir sebagai wujud komitmen transparansi, keterbukaan informasi, serta efisiensi pelayanan masyarakat bagi seluruh warga Desa Pagutan. Kami terus berinovasi untuk mempermudah akses administratif dan mempromosikan seluruh potensi ekonomi lokal ke tingkat yang lebih luas.&rdquo;
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-sm">Subandi</div>
                <div className="text-xs text-slate-500">Kepala Desa Pagutan</div>
              </div>
              <Link href="/profil" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
                Baca Profil Desa <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Layanan Cepat (Quick Action Grid) */}
      <section className="bg-slate-100/70 py-12 border-y border-slate-200/80">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Layanan Utama Mandiri</h2>
            <p className="text-xs text-slate-500">Akses cepat ke modul administrasi, informasi publik, dan pemetaan desa</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/layanan" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft hover:shadow-soft-lg hover:border-emerald-500 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-emerald-700 transition-colors">Surat Online</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Pengajuan permohonan surat keterangan mandiri secara online</p>
            </Link>

            <Link href="/layanan" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft hover:shadow-soft-lg hover:border-emerald-500 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-emerald-700 transition-colors">Cek Status Resi</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Lacak posisi dan verifikasi pengajuan surat keterangan Anda</p>
            </Link>

            <Link href="/webgis" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft hover:shadow-soft-lg hover:border-emerald-500 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-emerald-700 transition-colors">Peta WebGIS</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Pemetaan spasial batas desa, sarana umum, dan titik wisata</p>
            </Link>

            <Link href="/layanan?tab=kekerasan" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft hover:shadow-soft-lg hover:border-emerald-500 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-emerald-700 transition-colors">Lapor Kekerasan</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Sistem Pelaporan Kasus Kekerasan Perempuan & Anak (PPA)</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Berita Terbaru & Pengumuman */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
              <Newspaper className="w-4 h-4" /> Informasi Publik
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Berita & Pengumuman Terbaru</h2>
          </div>
          <Link href="/berita" className="mt-4 md:mt-0 text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
            Lihat Semua Berita <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.slice(0, 3).map((item) => (
            <article key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all flex flex-col group">
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image 
                  src={item.imageUrl} 
                  alt={item.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
                <div className="absolute top-3 left-3 bg-emerald-800/90 backdrop-blur text-white px-2.5 py-1 rounded-md text-[11px] font-semibold">
                  {item.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] text-slate-400 mb-1">{item.publishedAt} • Oleh {item.author}</div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <Link 
                  href={`/berita/${item.id}`} 
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 pt-2 border-t border-slate-100"
                >
                  Baca Selengkapnya <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Highlight Potensi Desa */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full inline-block">
                Ekonomi & Pariwisata Lokal
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
                Dukung Produk Unggulan UMKM & Destinasi Wisata Desa Pagutan
              </h2>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                Jelajahi kerajinan tenun khas Sasak, olahan bambu ramah lingkungan, komoditas beras organik subak, hingga spot ekowisata panorama sawah di Desa Pagutan.
              </p>
              <div className="pt-2">
                <Link
                  href="/potensi"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs md:text-sm transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Kunjungi Katalog Potensi Desa
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {potensi.slice(0, 2).map(item => (
                <div key={item.id} className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 backdrop-blur">
                  <div className="relative h-28 rounded-xl overflow-hidden mb-3">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" unoptimized />
                  </div>
                  <h4 className="font-bold text-sm text-white line-clamp-1">{item.name}</h4>
                  <p className="text-[11px] text-emerald-400 font-medium">{item.category} • {item.village}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
