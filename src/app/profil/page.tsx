'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { mockOfficials, mockDownloads, mockStafPembantu, mockKadusList } from '@/lib/data/mockData';
import { 
  History, 
  Target, 
  ShieldCheck, 
  Download, 
  FileText, 
  Landmark, 
  Users, 
  Home, 
  Layers, 
  BookOpen, 
  Search,
  ChevronDown,
  MapPin,
  Phone
} from 'lucide-react';

export default function ProfilPage() {
  const [activeStaffTab, setActiveStaffTab] = useState<'perangkat' | 'kadus' | 'staf'>('perangkat');
  const [docSearch, setDocSearch] = useState('');
  
  const officials = mockOfficials;
  const kadusList = mockKadusList;
  const stafPembantu = mockStafPembantu;

  const misiList = [
    "Meningkatkan kegiatan-kegiatan keamanan",
    "Memasyarakatkan Majlis Ta'lim, Guru Ngaji, Marbot dan Remaja Masjid",
    "Mempersiapkan Masa Depan Anak-Anak Desa dengan menjadikan Ibu-Ibu Mandiri, Aktif dan Produktif",
    "Mengangkat Sumber Daya Manusia (SDM) Melalui Program Keahlian, Pelatihan, dan Kewirausahaan",
    "Meningkatkan Sektor Kewirausahaan dan Kemandirian Masyarakat dengan bantuan pinjaman modal melalui Koperasi Desa tanpa bunga (Koperasi Syari'ah)",
    "BUMDES sebagai Akses pasar keluar untuk pengusaha Desa petani dan UMKM Kreatif Desa",
    "Mengangkat potensi Desa sebagai Destinasi Wisata Kemasyarakatan",
    "Menciptakan Pemerintah Desa Transparansi Data, Dana dan melayani masyarakat dengan cara 5 S (Salam, Senyum, Sapa, Sopan, dan Santun)",
    "Akses Infrastruktur yang memadai dan berkualitas sampai setiap Dusun."
  ];

  const filteredDownloads = mockDownloads.filter(dl => 
    dl.title.toLowerCase().includes(docSearch.toLowerCase()) ||
    dl.category.toLowerCase().includes(docSearch.toLowerCase())
  );

  const staffTabLabels: Record<typeof activeStaffTab, string> = {
    perangkat: 'Perangkat Desa',
    kadus: 'Kepala Dusun (Kadus)',
    staf: 'Staf Pembantu',
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">

      {/* ======= HERO HEADER ======= */}
      <section className="relative py-14 md:py-20 px-4 overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 text-white text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-950/20 via-slate-950/80 to-slate-950" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-full text-xs font-semibold">
            <Landmark className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            Profil Resmi Pemerintahan Desa
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Mengenal Lebih Dekat{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Desa Pagutan
            </span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Sejarah, visi pembangunan, data aparatur, dan dokumen regulasi publik Desa Pagutan, Kecamatan Batukliang, Lombok Tengah.
          </p>
        </div>
      </section>

      {/* ======= MAIN CONTENT ======= */}
      <div className="container mx-auto px-3 sm:px-4 max-w-6xl pt-6 md:pt-10 space-y-6 md:space-y-10">

        {/* ======= QUICK FACTS STRIP ======= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Kecamatan', value: 'Batukliang' },
            { label: 'Kabupaten', value: 'Lombok Tengah' },
            { label: 'Sektor Utama', value: 'Agraris & Tenun' },
            { label: 'Status', value: 'Smart Village' },
          ].map((f) => (
            <div key={f.label} className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 text-center shadow-sm">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{f.label}</p>
              <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">{f.value}</p>
            </div>
          ))}
        </div>

        {/* ======= SEJARAH SECTION ======= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8">
          {/* Text card */}
          <div className="lg:col-span-7 bg-white border border-slate-200 shadow-sm rounded-2xl p-5 md:p-8">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-bold text-slate-900">Sejarah &amp; Asal Usul</h2>
                <p className="text-xs text-slate-500">Rekam jejak peradaban Desa Pagutan</p>
              </div>
            </div>
            <div className="text-sm text-slate-600 leading-relaxed space-y-4">
              <p>
                Desa Pagutan memiliki sejarah panjang yang mengakar kuat pada kebudayaan Sasak di Lombok Tengah. Nama <strong className="text-emerald-700">&ldquo;Pagutan&rdquo;</strong> bermakna tempat penambatan yang aman bagi para leluhur dan petani. Berada di kawasan lereng subur Kecamatan Batukliang, masyarakatnya secara turun-temurun mengandalkan sektor agraris dan kerajinan tenun tradisional.
              </p>
              <p>
                Dalam era transformasi digital, Desa Pagutan terus meningkatkan infrastruktur pelayanan publik, keterbukaan informasi anggaran, serta pemberdayaan UMKM guna mewujudkan masyarakat yang sejahtera dan berdaya saing.
              </p>
            </div>
          </div>

          {/* Image card */}
          <div className="lg:col-span-5">
            <div className="relative h-52 sm:h-64 lg:h-full min-h-[200px] rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
              <Image 
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800" 
                alt="Persawahan Desa Pagutan" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-2 py-1 bg-emerald-600 text-white rounded-md text-[10px] font-bold uppercase">Lansekap Agraris</span>
                <h3 className="text-base font-bold mt-2 leading-snug">Hamparan Sawah Subak Pagutan</h3>
                <p className="text-xs text-slate-300 mt-1 leading-normal">480 Ha lahan pertanian produktif di jantung Desa Pagutan.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ======= VISI & MISI SECTION ======= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8">
          
          {/* VISI CARD */}
          <div className="lg:col-span-4 bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 text-white p-6 md:p-8 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-emerald-300 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/20 inline-block mb-3">
                Visi Jangka Panjang
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-4">Visi Utama Desa</h3>
              
              <div className="bg-emerald-950/30 border border-emerald-500/20 p-4 rounded-xl">
                <p className="text-sm italic font-serif text-emerald-100 leading-relaxed">
                  &ldquo;Menjadikan Desa Pagutan yang Religius, Mandiri dan Ramah&rdquo;
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/15 mt-6">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-emerald-300 block mb-2">Motto Pengabdian</span>
              <div className="font-mono text-xs font-bold text-emerald-200 bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-center tracking-wider">
                &ldquo;SETUNGGAL WICARE SETUNGGAL KARYE&rdquo;
              </div>
            </div>
          </div>

          {/* MISI CARD */}
          <div className="lg:col-span-8 bg-white border border-slate-200 shadow-sm p-5 md:p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900">Misi Pembangunan Desa</h3>
                <p className="text-xs text-slate-500">9 langkah strategis perwujudan visi pelayanan</p>
              </div>
            </div>
            
            <div className="space-y-2.5">
              {misiList.map((misi, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl active:bg-emerald-50 transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{misi}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======= PAMONG & STAFF SECTION ======= */}
        <section className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          {/* Section header */}
          <div className="p-5 md:p-8 border-b border-slate-100">
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Users className="w-4 h-4 shrink-0" /> Aparatur Desa
            </div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900">Pamong &amp; Perangkat Desa Pagutan</h2>
            <p className="text-xs text-slate-500 mt-0.5">Jajaran pejabat pelaksana dan pelayan administrasi desa</p>
          </div>

          {/* MOBILE: Dropdown selector */}
          <div className="px-5 pt-4 md:hidden">
            <div className="relative">
              <select
                value={activeStaffTab}
                onChange={(e) => setActiveStaffTab(e.target.value as typeof activeStaffTab)}
                className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 pr-10"
              >
                <option value="perangkat">Perangkat Desa</option>
                <option value="kadus">Kepala Dusun (Kadus)</option>
                <option value="staf">Staf Pembantu</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* DESKTOP: Tab pills */}
          <div className="hidden md:flex px-8 pt-5 gap-2">
            {(['perangkat', 'kadus', 'staf'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveStaffTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  activeStaffTab === tab 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700'
                }`}
              >
                {staffTabLabels[tab]}
              </button>
            ))}
          </div>

          {/* Tab content wrapper */}
          <div className="p-5 md:p-8">

            {/* PERANGKAT DESA */}
            {activeStaffTab === 'perangkat' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {officials.map(official => (
                  <div 
                    key={official.id} 
                    className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-center gap-3 active:bg-emerald-50 transition-colors"
                  >
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 ring-2 ring-slate-200">
                      <Image 
                        src={official.photoUrl} 
                        alt={official.name} 
                        fill 
                        className="object-cover object-top" 
                        unoptimized 
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-800 text-sm truncate">{official.name}</h4>
                      <span className="mt-1 px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold rounded-md inline-block leading-tight">
                        {official.position}
                      </span>
                      {official.phone && (
                        <div className="flex items-center gap-1 mt-1">
                          <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                          <p className="text-[10px] text-slate-400 truncate">{official.phone}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* KEPALA DUSUN */}
            {activeStaffTab === 'kadus' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {kadusList.map((kadus, index) => (
                  <div 
                    key={index} 
                    className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-center gap-3 active:bg-emerald-50 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Home className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-800 text-sm truncate">{kadus.name}</h4>
                      <p className="text-[10px] text-emerald-600 font-semibold mt-0.5 uppercase tracking-wide truncate">
                        {kadus.position.replace('Kadus ', '')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* STAF PEMBANTU */}
            {activeStaffTab === 'staf' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {stafPembantu.map((staf, index) => (
                  <div 
                    key={index} 
                    className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-center gap-3 active:bg-emerald-50 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{staf}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mt-0.5">Staf Operasional</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ======= DOKUMEN & REGULASI ======= */}
        <section className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="p-5 md:p-8 border-b border-slate-100 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1.5">
                <BookOpen className="w-4 h-4 shrink-0" /> Pusat Dokumen
              </div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900">Peraturan Desa &amp; Unduh Berkas</h2>
              <p className="text-xs text-slate-500 mt-0.5">Berkas permohonan layanan dan regulasi desa resmi</p>
            </div>

            {/* Search — full width on mobile */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari berkas atau kategori..."
                value={docSearch}
                onChange={(e) => setDocSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Document list */}
          <div className="p-4 md:p-8 space-y-3">
            {filteredDownloads.length > 0 ? (
              filteredDownloads.map(dl => (
                <div 
                  key={dl.id} 
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-800 text-sm leading-snug">{dl.title}</h4>
                      <div className="flex flex-wrap gap-2 items-center mt-1.5">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-semibold text-[10px] rounded-md border border-blue-100">
                          {dl.category}
                        </span>
                        <span className="text-[11px] text-slate-400">{dl.fileSize}</span>
                        <span className="text-[11px] text-slate-400">{dl.downloadCount}× diunduh</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Full-width download button on mobile */}
                  <button 
                    onClick={() => alert(`Mengunduh berkas: ${dl.title}`)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-colors shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    Unduh
                  </button>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-slate-400 space-y-2">
                <FileText className="w-10 h-10 mx-auto stroke-1" />
                <p className="text-sm font-semibold">Berkas tidak ditemukan</p>
                <p className="text-xs">Coba kata kunci yang berbeda</p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
