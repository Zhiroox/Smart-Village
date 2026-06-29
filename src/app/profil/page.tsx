'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { VillageSelector } from '@/components/common/VillageSelector';
import { mockOfficials, mockDownloads } from '@/lib/data/mockData';
import { VillageName } from '@/lib/types';
import { History, Target, Map, ShieldCheck, Download, FileText, Landmark } from 'lucide-react';

export default function ProfilPage() {
  const [selectedVillage, setSelectedVillage] = useState<VillageName>('Desa Pagutan');

  const filteredOfficials = mockOfficials.filter(o => o.village === selectedVillage);

  return (
    <div className="py-10 space-y-12">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-12 px-4 border-b-4 border-emerald-600">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold mb-3">
            <Landmark className="w-3.5 h-3.5" /> Profil Resmi Pemerintahan Desa
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Profil, Sejarah & Regulasi Desa</h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto mb-6">
            Mengenal lebih dekat latar belakang sejarah, gambaran umum wilayah, visi & misi, serta dokumen transparansi publik Kecamatan Batukliang.
          </p>

          <div className="bg-white/10 p-2 rounded-2xl backdrop-blur-md inline-block">
            <VillageSelector 
              selectedVillage={selectedVillage} 
              onSelectVillage={setSelectedVillage}
              showAllOption={false}
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl space-y-12">
        {/* Sejarah & Gambaran Umum */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-soft">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Sejarah & Asal Usul {selectedVillage}</h2>
              <p className="text-xs text-slate-500">Rekam jejak peradaban dan perkembangan wilayah Batukliang</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-xs md:text-sm text-slate-600 leading-relaxed space-y-4">
            <p>
              {selectedVillage === 'Desa Pagutan' ? (
                `Desa Pagutan memiliki sejarah panjang yang mengakar kuat pada kebudayaan Sasak di Lombok Tengah. Nama "Pagutan" secara konseptual bermakna tempat penambatan atau persinggahan yang aman bagi para leluhur dan petani. Berada di kawasan lereng yang subur di Kecamatan Batukliang, masyarakat Desa Pagutan secara turun-temurun mengandalkan sektor agraris dan kerajinan tenun tradisional sebagai penopang kehidupan utama.`
              ) : (
                `Desa Bujak tumbuh dan berkembang sebagai salah satu desa lumbung pangan dan pusat kerajinan tangan di Batukliang. Dengan bentang alam persawahan yang luas serta ketersediaan mata air alami dari kawasan hutan sekitarnya, Desa Bujak dikenal dengan semangat gotong royong warga yang tinggi dalam mengelola sumber daya alam dan menjaga kelestarian adat istiadat.`
              )}
            </p>
            <p>
              Dalam era transformasi digital modern, {selectedVillage} terus berbenah meningkatkan infrastruktur pelayanan publik, keterbukaan informasi anggaran desa, serta pemberdayaan sektor mikro UMKM guna mewujudkan masyarakat yang sejahtera, mandiri, dan berdaya saing.
            </p>
          </div>
        </section>

        {/* Visi & Misi */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-900 text-white p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-emerald-200 flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-emerald-300">Visi Utama {selectedVillage}</h3>
              <blockquote className="text-sm md:text-base italic font-serif text-emerald-100 leading-relaxed bg-emerald-800/50 p-4 rounded-xl border-l-4 border-emerald-400">
                &ldquo;Terwujudnya {selectedVillage} yang Mandiri, Sejahtera, Transparan, dan Berbasis Digital dalam Bingkai Kebudayaan Sasak.&rdquo;
              </blockquote>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-soft">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Misi Pembangunan Desa</h3>
            <ul className="space-y-2.5 text-xs md:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span>Meningkatkan kualitas pelayanan publik berbasis teknologi tepat guna yang cepat dan inklusif.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span>Empowering ekonomi warga melalui penguatan UMKM, kelompok tani, dan promosi destinasi wisata desa.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                <span>Mewujudkan transparansi tata kelola keuangan desa dan percepatan pembangunan infrastruktur pedesaan.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Perangkat Desa */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Perangkat & Pamong {selectedVillage}</h2>
              <p className="text-xs text-slate-500">Jajaran pejabat pelaksana pemerintahan desa</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOfficials.map(official => (
              <div key={official.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-300">
                  <Image src={official.photoUrl} alt={official.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{official.name}</h4>
                  <p className="text-xs text-emerald-700 font-medium">{official.position}</p>
                  {official.phone && <p className="text-[11px] text-slate-400 mt-1">{official.phone}</p>}
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
