'use client';

import React from 'react';
import Image from 'next/image';
import { mockOfficials, mockDownloads } from '@/lib/data/mockData';
import { History, Target, ShieldCheck, Download, FileText, Landmark, Award } from 'lucide-react';

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
    <div className="py-10 space-y-12">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-12 px-4 border-b-4 border-emerald-600">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold mb-3">
            <Landmark className="w-3.5 h-3.5" /> Profil Resmi Pemerintahan Desa
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Profil, Sejarah & Regulasi Desa Pagutan</h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto">
            Mengenal lebih dekat latar belakang sejarah, gambaran umum wilayah, visi & misi, serta dokumen transparansi publik Desa Pagutan, Kecamatan Batukliang.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl space-y-12">
        {/* Sejarah & Asal Usul */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-soft">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Sejarah & Asal Usul Desa Pagutan</h2>
              <p className="text-xs text-slate-500">Rekam jejak peradaban dan perkembangan wilayah Batukliang</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-xs md:text-sm text-slate-600 leading-relaxed space-y-4">
            <p>
              Desa Pagutan memiliki sejarah panjang yang mengakar kuat pada kebudayaan Sasak di Lombok Tengah. Nama &ldquo;Pagutan&rdquo; secara konseptual bermakna tempat penambatan atau persinggahan yang aman bagi para leluhur dan petani. Berada di kawasan lereng yang subur di Kecamatan Batukliang, masyarakat Desa Pagutan secara turun-temurun mengandalkan sektor agraris dan kerajinan tenun tradisional sebagai penopang kehidupan utama.
            </p>
            <p>
              Dalam era transformasi digital modern, Desa Pagutan terus berbenah meningkatkan infrastruktur pelayanan publik, keterbukaan informasi anggaran desa, serta pemberdayaan sektor mikro UMKM guna mewujudkan masyarakat yang sejahtera, mandiri, dan berdaya saing.
            </p>
          </div>
        </section>

        {/* Visi, Misi & Motto */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visi Card */}
          <div className="bg-emerald-900 text-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col justify-between border-b-8 border-emerald-600">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-emerald-300 flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-300">Visi Desa Pagutan (2019 - 2024)</span>
              <h3 className="text-xl font-extrabold mt-2 mb-4">Visi Utama</h3>
              <blockquote className="text-sm md:text-base italic font-serif text-emerald-100 leading-relaxed bg-emerald-800/40 p-4 rounded-xl border-l-4 border-emerald-400">
                &ldquo;Menjadikan Desa Pagutan yang Religius, Mandiri dan Ramah&rdquo;
              </blockquote>
            </div>

            {/* Motto */}
            <div className="pt-6 border-t border-emerald-800/80 mt-6">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-400">Motto Desa</span>
              <div className="font-mono text-xs md:text-sm font-bold text-emerald-300 mt-1 uppercase tracking-wide">
                &ldquo;SETUNGGAL WICARE SETUNGGAL KARYE&rdquo;
              </div>
            </div>
          </div>

          {/* Misi Card */}
          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-soft">
            <div className="flex items-center gap-2 mb-4 text-emerald-700 font-bold text-sm border-b border-slate-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">Misi Pembangunan Desa</h3>
            </div>
            
            <ul className="space-y-3 text-xs md:text-sm text-slate-600">
              {misiList.map((misi, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-normal">{misi}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Perangkat Desa */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Perangkat & Pamong Desa Pagutan</h2>
              <p className="text-xs text-slate-500">Jajaran pejabat pelaksana pemerintahan desa</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {officials.map(official => (
              <div key={official.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-4 hover:border-emerald-500 transition-colors">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-300">
                  <Image src={official.photoUrl} alt={official.name} fill className="object-cover" unoptimized />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{official.name}</h4>
                  <p className="text-[11px] text-emerald-700 font-semibold">{official.position}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Peraturan Desa & Download Dokumen */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-soft">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Peraturan Desa & Unduh Berkas</h2>
              <p className="text-xs text-slate-500">Dokumen legalitas, Perdes, dan formulir pelayanan administrasi</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {mockDownloads.map(dl => (
              <div key={dl.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{dl.title}</h4>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Kategori: {dl.category} • Ukuran: {dl.fileSize} • Diunduh: {dl.downloadCount} kali
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Mengunduh dokumen: ${dl.title}`)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-semibold rounded-lg transition-colors shrink-0 flex items-center gap-1"
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
