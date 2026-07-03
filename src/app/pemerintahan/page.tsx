'use client';

import React from 'react';
import Image from 'next/image';
import { mockOfficials, mockStafPembantu, mockKadusList } from '@/lib/data/mockData';
import { Users, ShieldCheck, Award, MapPin, CheckCircle2 } from 'lucide-react';

export default function PemerintahanPage() {
  const kades = mockOfficials.find(o => o.position === 'Kepala Desa');
  const sekdes = mockOfficials.find(o => o.position === 'Sekdes');
  
  const kaurList = mockOfficials.filter(o => o.position.startsWith('Kaur'));
  const kasiList = mockOfficials.filter(o => o.position.startsWith('Kasi'));

  return (
    <div className="py-10 space-y-12 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-12 px-4 border-b-4 border-emerald-600">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5" /> Struktur Organisasi & Tata Kerja (SOTK)
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Pemerintahan Desa Pagutan</h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto">
            Struktur kepengurusan resmi pemerintah Desa Pagutan, Kecamatan Batukliang, Kabupaten Lombok Tengah, NTB.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl space-y-12">
        {/* Bagan Struktur Utama */}
        <section className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-soft text-center space-y-10 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-emerald-600"></div>
          
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Bagan SOTK Pemerintah Desa</h2>
            <p className="text-xs text-slate-500">Hierarki kepemimpinan dan penugasan aparatur Desa Pagutan</p>
          </div>

          {/* KEPALA DESA */}
          {kades && (
            <div className="max-w-xs mx-auto relative z-10">
              <div className="bg-emerald-800 text-white p-5 rounded-2xl shadow-md border border-emerald-600 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-white relative">
                  <Image src={kades.photoUrl} alt={kades.name} fill className="object-cover object-top" unoptimized />
                </div>
                <div className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider mb-0.5">Kepala Desa</div>
                <div className="font-extrabold text-sm">{kades.name}</div>
              </div>
              <div className="w-0.5 h-8 bg-slate-300 mx-auto"></div>
            </div>
          )}

          {/* SEKRETARIS DESA */}
          {sekdes && (
            <div className="max-w-xs mx-auto relative z-10">
              <div className="bg-slate-800 text-white p-4 rounded-2xl shadow-sm border border-slate-700 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border border-slate-400 relative">
                  <Image src={sekdes.photoUrl} alt={sekdes.name} fill className="object-cover object-top" unoptimized />
                </div>
                <div className="text-[10px] font-bold text-emerald-400 mb-0.5">Sekretaris Desa (Sekdes)</div>
                <div className="font-bold text-xs">{sekdes.name}</div>
              </div>
              <div className="w-0.5 h-8 bg-slate-300 mx-auto"></div>
            </div>
          )}

          {/* KAUR & KASI SPLIT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-4 relative">
            {/* KAUR (Kepala Urusan) */}
            <div className="space-y-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-200/80">
              <h3 className="text-xs font-bold uppercase text-emerald-800 bg-emerald-50 py-1.5 rounded-lg mb-2">Unsur Staf (Kaur)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {kaurList.map(kaur => (
                  <div key={kaur.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mb-2 border border-slate-200 relative">
                      <Image src={kaur.photoUrl} alt={kaur.name} fill className="object-cover object-top" unoptimized />
                    </div>
                    <div className="text-[9px] font-bold text-emerald-700 leading-tight mb-0.5">{kaur.position}</div>
                    <div className="font-semibold text-[10px] text-slate-800">{kaur.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* KASI (Kepala Seksi) */}
            <div className="space-y-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-200/80">
              <h3 className="text-xs font-bold uppercase text-emerald-800 bg-emerald-50 py-1.5 rounded-lg mb-2">Unsur Pelaksana (Kasi)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {kasiList.map(kasi => (
                  <div key={kasi.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mb-2 border border-slate-200 relative">
                      <Image src={kasi.photoUrl} alt={kasi.name} fill className="object-cover object-top" unoptimized />
                    </div>
                    <div className="text-[9px] font-bold text-emerald-700 leading-tight mb-0.5">{kasi.position}</div>
                    <div className="font-semibold text-[10px] text-slate-800">{kasi.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STAF PEMBANTU SECTION */}
          <div className="bg-slate-50/60 p-6 rounded-2xl border border-slate-200/80 max-w-4xl mx-auto">
            <h3 className="text-xs font-bold uppercase text-slate-700 mb-3 tracking-wider">Staf Pembantu Desa</h3>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {mockStafPembantu.map((staf, idx) => (
                <span key={idx} className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 shadow-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {staf}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 15 KEPALA DUSUN SECTION */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-soft">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Kepala Kewilayahan (Kepala Dusun)</h2>
              <p className="text-xs text-slate-500">15 Dusun administratif di bawah naungan Desa Pagutan</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {mockKadusList.map((kadus, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 shadow-xs text-center space-y-1">
                <div className="text-[10px] font-bold text-emerald-700">{kadus.position}</div>
                <div className="text-xs font-bold text-slate-900">{kadus.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* TUPOKSI SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">Fungsi Pelayanan Publik</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Menyelenggarakan tata kelola kependudukan, perizinan administrasi surat menyurat, pengurusan tanah, serta koordinasi bantuan kesejahteraan sosial masyarakat Desa Pagutan secara prima.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">Ketenteraman & Keamanan</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Membina pertahanan sipil (linmas), menanggulangi konflik sengketa warga di tingkat dusun, serta menyelenggarakan sinergi pelaporan kasus kekerasan perempuan dan anak (PPA) melalui paralegal desa.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
