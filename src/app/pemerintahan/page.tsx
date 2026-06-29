'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { VillageSelector } from '@/components/common/VillageSelector';
import { mockOfficials } from '@/lib/data/mockData';
import { VillageName } from '@/lib/types';
import { Users, ShieldCheck, Phone, Mail, Award } from 'lucide-react';

export default function PemerintahanPage() {
  const [selectedVillage, setSelectedVillage] = useState<VillageName>('Desa Pagutan');

  const filteredOfficials = mockOfficials.filter(o => o.village === selectedVillage);
  const kades = filteredOfficials.find(o => o.position.includes('Kepala Desa'));
  const sekdes = filteredOfficials.find(o => o.position.includes('Sekretaris Desa'));
  const kaurList = filteredOfficials.filter(o => !o.position.includes('Kepala Desa') && !o.position.includes('Sekretaris Desa'));

  return (
    <div className="py-10 space-y-10">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-12 px-4 border-b-4 border-emerald-600">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5" /> Struktur Organisasi & Tata Kerja (SOTK)
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Pemerintahan {selectedVillage}</h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto mb-6">
            Jajaran aparat dan pamong desa yang bertugas menyelenggarakan tata kelola pelayanan dan pembangunan di Kecamatan Batukliang.
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

      <div className="container mx-auto px-4 max-w-5xl space-y-12">
        {/* SOTK Hierarchy Visual */}
        <section className="bg-white p-6 md:p-10 rounded-2xl border border-slate-200 shadow-soft text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Bagan Struktur Pemerintahan Desa</h2>
          <p className="text-xs text-slate-500 mb-8">Hierarki kepemimpinan dan pembagian tugas pelayanan masyarakat</p>

          {/* Kades Top node */}
          {kades && (
            <div className="max-w-xs mx-auto mb-8 relative">
              <div className="bg-emerald-800 text-white p-5 rounded-2xl shadow-lg border-2 border-emerald-600">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-white relative">
                  <Image src={kades.photoUrl} alt={kades.name} fill className="object-cover" />
                </div>
                <div className="text-xs uppercase font-bold text-emerald-300 tracking-wider mb-1">{kades.position}</div>
                <div className="font-extrabold text-sm">{kades.name}</div>
              </div>
              <div className="w-0.5 h-8 bg-slate-300 mx-auto"></div>
            </div>
          )}

          {/* Sekdes Middle node */}
          {sekdes && (
            <div className="max-w-xs mx-auto mb-8 relative">
              <div className="bg-slate-800 text-white p-4 rounded-2xl shadow-md border border-slate-700">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border border-slate-400 relative">
                  <Image src={sekdes.photoUrl} alt={sekdes.name} fill className="object-cover" />
                </div>
                <div className="text-xs font-bold text-emerald-400 mb-0.5">{sekdes.position}</div>
                <div className="font-bold text-xs">{sekdes.name}</div>
              </div>
              <div className="w-0.5 h-8 bg-slate-300 mx-auto"></div>
            </div>
          )}

          {/* Kaur List Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kaurList.map((kaur) => (
              <div key={kaur.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-14 h-14 rounded-full overflow-hidden mx-auto mb-2 border border-slate-300 relative">
                  <Image src={kaur.photoUrl} alt={kaur.name} fill className="object-cover" />
                </div>
                <div className="text-xs font-semibold text-emerald-700">{kaur.position}</div>
                <div className="font-bold text-xs text-slate-800 mt-0.5">{kaur.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Tugas Pokok & Fungsi (Tupoksi) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
            <div className="flex items-center gap-2 mb-3 text-emerald-700 font-bold text-sm">
              <Award className="w-4 h-4" /> Fungsi Pelayanan Publik
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Memastikan seluruh urusan administrasi kependudukan, perizinan surat keterangan usaha, rekomendasi pertanahan, dan bantuan sosial dapat diproses secara cepat, transparan, dan tanpa pemungutan biaya liar.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
            <div className="flex items-center gap-2 mb-3 text-emerald-700 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" /> Pembinaan Masyarakat
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Menjaga kerukunan antar warga, memfasilitasi musyawarah pembangunan desa (Musrenbangdes), serta membina kelompok-kelompok usaha tani dan UMKM lokal di wilayah Batukliang.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
