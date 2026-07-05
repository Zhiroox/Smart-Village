'use client';

import React from 'react';
import Image from 'next/image';
import { mockOfficials, mockDownloads } from '@/lib/data/mockData';
import { History, Target, ShieldCheck, Download, FileText, Landmark, CheckCircle2 } from 'lucide-react';

export default function ProfilPage() {
  const officials = mockOfficials;

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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white text-slate-800 border-b border-slate-200/80">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-semibold mb-5">
            <Landmark className="w-3.5 h-3.5" /> Profil Resmi Pemerintahan Desa
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Profil, Sejarah &amp;{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Regulasi Desa
            </span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
            Mengenal lebih dekat latar belakang sejarah, gambaran umum wilayah, visi &amp; misi, serta dokumen transparansi publik Desa Pagutan, Kecamatan Batukliang.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-10 space-y-8">
        {/* Sejarah & Asal Usul */}
        <section className="bg-white border border-slate-200 shadow-md rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shrink-0">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Sejarah &amp; Asal Usul Desa Pagutan</h2>
              <p className="text-xs text-slate-500">Rekam jejak peradaban dan perkembangan wilayah Batukliang</p>
            </div>
          </div>

          <div className="text-sm text-slate-600 leading-relaxed space-y-4">
            <p>
              Desa Pagutan memiliki sejarah panjang yang mengakar kuat pada kebudayaan Sasak di Lombok Tengah. Nama &ldquo;Pagutan&rdquo; secara konseptual bermakna tempat penambatan atau persinggahan yang aman bagi para leluhur dan petani. Berada di kawasan lereng yang subur di Kecamatan Batukliang, masyarakat Desa Pagutan secara turun-temurun mengandalkan sektor agraris dan kerajinan tenun tradisional sebagai penopang kehidupan utama.
            </p>
            <p>
              Dalam era transformasi digital modern, Desa Pagutan terus berbenah meningkatkan infrastruktur pelayanan publik, keterbukaan informasi anggaran desa, serta pemberdayaan sektor mikro UMKM guna mewujudkan masyarakat yang sejahtera, mandiri, dan berdaya saing.
            </p>
          </div>
        </section>

        {/* Visi, Misi & Motto */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Visi Card */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white p-6 md:p-8 rounded-2xl flex flex-col justify-between shadow-lg hover:scale-[1.01] transition-transform duration-200">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-white/10 text-emerald-100 flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-emerald-200">Visi Desa Pagutan (2019 - 2024)</span>
              <h3 className="text-xl font-extrabold mt-2 mb-4 text-white">Visi Utama</h3>
              <blockquote className="text-sm italic font-serif text-emerald-100 leading-relaxed bg-white/5 p-4 rounded-xl border-l-4 border-emerald-300">
                &ldquo;Menjadikan Desa Pagutan yang Religius, Mandiri dan Ramah&rdquo;
              </blockquote>
            </div>

            {/* Motto */}
            <div className="pt-6 border-t border-white/15 mt-6">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-emerald-200">Motto Desa</span>
              <div className="font-mono text-xs font-bold text-emerald-100 mt-1 uppercase tracking-wide">
                &ldquo;SETUNGGAL WICARE SETUNGGAL KARYE&rdquo;
              </div>
            </div>
          </div>

          {/* Misi Card */}
          <div className="lg:col-span-2 bg-white border border-slate-200 shadow-md p-6 md:p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-800">Misi Pembangunan Desa</h3>
            </div>
            
            <ul className="space-y-3 text-sm text-slate-600">
              {misiList.map((misi, idx) => (
                <li key={idx} className="flex items-start gap-3 group hover:text-slate-800 transition-colors">
                  <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-100 transition-colors">
                    {idx + 1}
                  </span>
                  <span className="leading-normal">{misi}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Perangkat Desa */}
        <section className="bg-white border border-slate-200 shadow-md rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Perangkat &amp; Pamong Desa Pagutan</h2>
              <p className="text-xs text-slate-500 mt-0.5">Jajaran pejabat pelaksana pemerintahan desa</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {officials.map(official => (
              <div key={official.id} className="group bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 hover:border-emerald-300 p-4 rounded-xl flex items-center gap-3 transition-all duration-200 cursor-default shadow-xs">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 ring-2 ring-slate-200 group-hover:ring-emerald-350 transition-all">
                  <Image src={official.photoUrl} alt={official.name} fill className="object-cover" unoptimized />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">{official.name}</h4>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">{official.position}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Peraturan Desa & Download Dokumen */}
        <section className="bg-white border border-slate-200 shadow-md rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Peraturan Desa &amp; Unduh Berkas</h2>
              <p className="text-xs text-slate-500">Dokumen legalitas, Perdes, dan formulir pelayanan administrasi</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {mockDownloads.map(dl => (
              <div key={dl.id} className="py-4 flex items-center justify-between gap-4 group hover:bg-slate-50 -mx-2 px-2 rounded-xl transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">{dl.title}</h4>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Kategori: {dl.category} • Ukuran: {dl.fileSize} • Diunduh: {dl.downloadCount} kali
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Mengunduh dokumen: ${dl.title}`)}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-emerald-600 border border-slate-200 hover:border-emerald-500 text-slate-600 hover:text-white text-xs font-semibold rounded-lg transition-all shrink-0 flex items-center gap-1.5 group/btn"
                >
                  <Download className="w-3.5 h-3.5" /> Unduh
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
