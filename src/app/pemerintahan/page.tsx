'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { mockOfficials, mockStafPembantu, mockKadusList } from '@/lib/data/mockData';
import { Users, ShieldCheck, Award, MapPin, CheckCircle2, Building2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function PemerintahanPage() {
  const [officials, setOfficials] = useState(mockOfficials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfficials = async () => {
      try {
        const { data, error } = await supabase
          .from('village_officials')
          .select('*')
          .eq('village', 'Desa Pagutan');

        if (error) {
          console.error('Supabase fetch error:', error.message);
          return;
        }

        if (data && data.length > 0) {
          const mapped = data.map(o => ({
            id: o.id,
            name: o.name,
            position: o.position,
            village: o.village,
            photoUrl: o.photo_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
            phone: o.phone
          }));
          setOfficials(mapped);
        }
      } catch (err) {
        console.error('Error fetching officials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOfficials();
  }, []);

  const kades = officials.find(o => o.position === 'Kepala Desa');
  const sekdes = officials.find(o => o.position === 'Sekdes');
  
  const kaurList = officials.filter(o => o.position.startsWith('Kaur'));
  const kasiList = officials.filter(o => o.position.startsWith('Kasi'));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border-b border-slate-200/80" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-semibold mb-5 backdrop-blur-sm">
            <Users className="w-3.5 h-3.5" /> Struktur Organisasi &amp; Tata Kerja (SOTK)
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Pemerintahan{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              Desa Pagutan
            </span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
            Struktur kepengurusan resmi pemerintah Desa Pagutan, Kecamatan Batukliang, Kabupaten Lombok Tengah, NTB.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl pb-16 space-y-8">
        {/* ===== BAGAN SOTK ===== */}
        <section className="bg-white border border-slate-200 shadow-md rounded-3xl p-6 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 rounded-t-3xl" />
          
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-1">Struktur Organisasi & Tata Kerja Pemerintah Desa Pagutan</h2>
            <p className="text-sm text-slate-500">Hierarki kepemimpinan dan penugasan aparatur Desa Pagutan</p>
          </div>

          {/* ===== ORG CHART ===== */}
          <div className="flex flex-col items-center">

            {/* KEPALA DESA */}
            {kades && (
              <div className="flex flex-col items-center w-full">
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white px-8 py-5 rounded-2xl shadow-lg border border-emerald-400/40 flex flex-col items-center w-64 hover:scale-105 transition-transform duration-200 cursor-default">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-3 ring-4 ring-white/20 relative shadow-lg">
                    <Image src={kades.photoUrl} alt={kades.name} fill className="object-cover object-top" unoptimized />
                  </div>
                  <div className="text-[10px] uppercase font-bold text-emerald-200 tracking-widest mb-1">Kepala Desa</div>
                  <div className="font-extrabold text-sm text-white text-center">{kades.name}</div>
                </div>
                {/* Vertical line down */}
                <div className="w-px h-10 bg-slate-300" />
              </div>
            )}

            {/* SEKRETARIS DESA */}
            {sekdes && (
              <div className="flex flex-col items-center w-full">
                <div className="bg-white text-slate-800 px-6 py-4 rounded-2xl shadow-md border border-slate-200 flex flex-col items-center w-56 hover:scale-105 transition-transform duration-200 cursor-default">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-2 ring-2 ring-emerald-500/25 relative shadow-sm">
                    <Image src={sekdes.photoUrl} alt={sekdes.name} fill className="object-cover object-top" unoptimized />
                  </div>
                  <div className="text-[10px] font-bold text-emerald-600 mb-0.5 uppercase tracking-widest">Sekretaris Desa</div>
                  <div className="font-bold text-xs text-slate-800 text-center">{sekdes.name}</div>
                </div>

                {/* T-shaped connector: vertical down then splits */}
                <div className="w-px h-8 bg-slate-350" />
                {/* Horizontal bar */}
                <div className="flex items-center justify-center w-full max-w-2xl">
                  <div className="flex-1 h-px bg-slate-300" />
                  <div className="w-px h-6 bg-slate-300" />
                  <div className="flex-1 h-px bg-slate-300" />
                </div>
                {/* Two vertical drops */}
                <div className="flex justify-around w-full max-w-2xl">
                  <div className="w-px h-6 bg-slate-300" />
                  <div className="w-px h-6 bg-slate-300" />
                </div>
              </div>
            )}

            {/* KAUR & KASI GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
              {/* KAUR */}
              <div className="relative bg-blue-50/20 border border-blue-200 rounded-2xl p-5">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                    Unsur Staf (Kaur)
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {kaurList.map(kaur => (
                    <div key={kaur.id} className="group bg-white border border-blue-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 p-3 rounded-xl flex flex-col items-center text-center cursor-default shadow-xs">
                      <div className="w-12 h-12 rounded-full overflow-hidden mb-2 ring-2 ring-blue-400/30 group-hover:ring-blue-400/65 relative transition-all">
                        <Image src={kaur.photoUrl} alt={kaur.name} fill className="object-cover object-top" unoptimized />
                      </div>
                      <div className="text-[8px] font-bold text-blue-600 leading-tight mb-0.5 uppercase">{kaur.position}</div>
                      <div className="font-semibold text-[10px] text-slate-700">{kaur.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* KASI */}
              <div className="relative bg-amber-50/20 border border-amber-200 rounded-2xl p-5">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="bg-gradient-to-r from-amber-600 to-amber-700 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                    Unsur Pelaksana (Kasi)
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {kasiList.map(kasi => (
                    <div key={kasi.id} className="group bg-white border border-amber-100 hover:border-amber-300 hover:bg-amber-50/50 transition-all duration-200 p-3 rounded-xl flex flex-col items-center text-center cursor-default shadow-xs">
                      <div className="w-12 h-12 rounded-full overflow-hidden mb-2 ring-2 ring-amber-400/30 group-hover:ring-amber-400/65 relative transition-all">
                        <Image src={kasi.photoUrl} alt={kasi.name} fill className="object-cover object-top" unoptimized />
                      </div>
                      <div className="text-[8px] font-bold text-amber-600 leading-tight mb-0.5 uppercase">{kasi.position}</div>
                      <div className="font-semibold text-[10px] text-slate-700">{kasi.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Connector from KAUR/KASI to STAF */}
            <div className="flex items-center justify-center w-full max-w-2xl mt-3">
              <div className="flex-1 h-px bg-slate-200" />
              <div className="w-px h-6 bg-slate-300" />
              <div className="flex-1 h-px bg-slate-200" />
            </div>
            <div className="w-px h-3 bg-slate-300" />

            {/* STAF PEMBANTU */}
            <div className="w-full max-w-2xl relative bg-slate-50 border border-slate-200 rounded-2xl p-5 mt-0 shadow-sm">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="bg-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border border-slate-300 shadow-sm">
                  Staf Pembantu Desa
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                {mockStafPembantu.map((staf, idx) => (
                  <span key={idx} className="bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-all px-3 py-1.5 rounded-lg text-xs font-medium text-slate-650 hover:text-emerald-700 flex items-center gap-1.5 cursor-default shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    {staf}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== 15 KEPALA DUSUN ===== */}
        <section className="bg-white border border-slate-200 shadow-md rounded-3xl p-6 md:p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Kepala Kewilayahan (Kepala Dusun)</h2>
              <p className="text-sm text-slate-500">15 Dusun administratif di bawah naungan Desa Pagutan</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {mockKadusList.map((kadus, idx) => (
              <div
                key={idx}
                className="group bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/85 hover:border-emerald-300 p-4 rounded-xl text-center transition-all duration-200 cursor-default hover:-translate-y-0.5 shadow-xs"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-250 text-emerald-600 flex items-center justify-center mx-auto mb-2.5 group-hover:bg-emerald-100 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-[10px] font-bold text-emerald-600 mb-1 leading-tight">{kadus.position}</div>
                <div className="text-xs font-bold text-slate-800">{kadus.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== TUPOKSI SECTION ===== */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-slate-800">Tugas Pokok &amp; Fungsi</h2>
            <div className="flex-1 h-px bg-slate-250" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: Award,
                title: 'Fungsi Pelayanan Publik',
                desc: 'Menyelenggarakan tata kelola kependudukan, perizinan administrasi surat menyurat, pengurusan tanah, serta koordinasi bantuan kesejahteraan sosial masyarakat Desa Pagutan secara prima.',
                colorClass: 'border-slate-200 hover:border-emerald-300',
                iconClass: 'from-emerald-500 to-teal-600 shadow-emerald-500/10',
              },
              {
                icon: ShieldCheck,
                title: 'Ketenteraman & Keamanan',
                desc: 'Membina pertahanan sipil (linmas), menanggulangi konflik sengketa warga di tingkat dusun, serta menyelenggarakan sinergi pelaporan kasus kekerasan perempuan dan anak (PPA).',
                colorClass: 'border-slate-200 hover:border-blue-300',
                iconClass: 'from-blue-500 to-indigo-600 shadow-blue-500/10',
              },
              {
                icon: Building2,
                title: 'Pembangunan & Infrastruktur',
                desc: 'Merencanakan dan mengawasi pembangunan infrastruktur desa, pengelolaan dana desa, serta pengembangan fasilitas umum untuk peningkatan kesejahteraan warga.',
                colorClass: 'border-slate-200 hover:border-amber-300',
                iconClass: 'from-amber-500 to-orange-600 shadow-amber-500/10',
              },
              {
                icon: Users,
                title: 'Pemberdayaan Masyarakat',
                desc: 'Mengembangkan kapasitas SDM, memberdayakan kelompok UMKM, organisasi kemasyarakatan, serta pemuda desa untuk mencapai kemandirian ekonomi lokal.',
                colorClass: 'border-slate-200 hover:border-purple-300',
                iconClass: 'from-purple-500 to-violet-600 shadow-purple-500/10',
              },
            ].map((item) => (
              <div key={item.title} className={`group bg-white border ${item.colorClass} p-6 rounded-2xl transition-all duration-200 flex gap-5 hover:-translate-y-0.5 shadow-sm hover:shadow-md`}>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.iconClass} text-white flex items-center justify-center shadow-lg shrink-0 group-hover:scale-105 transition-transform`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
