'use client';

import React from 'react';
import Link from 'next/link';
import { Landmark, MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t-4 border-emerald-600">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Col 1: Identity */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">SMART VILLAGE</h3>
              <p className="text-xs text-emerald-400">Desa Pagutan & Desa Bujak</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Platform tata kelola digital, keterbukaan informasi publik, pemberdayaan ekonomi UMKM, serta pelayanan administrasi mandiri masyarakat Kecamatan Batukliang, Kabupaten Lombok Tengah.
          </p>
          <div className="text-xs text-slate-500">
            Dikembangkan bersama Tim KKN Universitas © 2026
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Navigasi Utama
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:text-emerald-400 transition-colors">Beranda Utama</Link></li>
            <li><Link href="/profil" className="hover:text-emerald-400 transition-colors">Profil & Sejarah Desa</Link></li>
            <li><Link href="/pemerintahan" className="hover:text-emerald-400 transition-colors">Struktur Pemerintah Desa (SOTK)</Link></li>
            <li><Link href="/berita" className="hover:text-emerald-400 transition-colors">Kabar & Berita Desa</Link></li>
            <li><Link href="/potensi" className="hover:text-emerald-400 transition-colors">Potensi UMKM & Pertanian</Link></li>
            <li><Link href="/webgis" className="hover:text-emerald-400 transition-colors">Peta WebGIS Wilayah</Link></li>
          </ul>
        </div>

        {/* Col 3: Public Services */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Pelayanan Administrasi
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/layanan" className="hover:text-emerald-400 transition-colors">Pengajuan Surat Keterangan Online</Link></li>
            <li><Link href="/layanan" className="hover:text-emerald-400 transition-colors">Cek Status Permohonan (Tracking Code)</Link></li>
            <li><Link href="/profil" className="hover:text-emerald-400 transition-colors">Unduh Peraturan Desa (Perdes)</Link></li>
            <li><Link href="/layanan" className="hover:text-emerald-400 transition-colors">Download Formulir Berkas</Link></li>
            <li><Link href="/admin/login" className="text-emerald-400 hover:underline flex items-center gap-1 mt-3 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Portal Khusus Perangkat Desa
            </Link></li>
          </ul>
        </div>

        {/* Col 4: Contact & Address */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Kontak Pelayanan
          </h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Jl. Raya Batukliang, Kabupaten Lombok Tengah, Nusa Tenggara Barat (83552)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>+62 819-1234-5678 (WhatsApp Center)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>layanan@smartvillage-batukliang.desa.id</span>
            </li>
            <li className="flex items-center gap-2.5 text-slate-400 pt-1">
              <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Senin - Jumat: 08:00 - 15:30 WITA</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <div>
          © 2026 Pemerintah Desa Pagutan & Desa Bujak. Hak Cipta Dilindungi Undang-Undang.
        </div>
        <div className="mt-2 sm:mt-0 flex gap-4">
          <span>Privasi & Syarat Ketentuan</span>
          <span>•</span>
          <span>Desain Minimalis Pemerintah</span>
        </div>
      </div>
    </footer>
  );
};
