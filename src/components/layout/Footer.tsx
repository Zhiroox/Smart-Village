'use client';

import React from 'react';
import Link from 'next/link';
import { Landmark, MapPin, Phone, Mail, Clock, ShieldCheck, Github, Instagram, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-14 pb-8 border-t border-white/8">
      {/* Top accent line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mb-14" />
      
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Col 1: Identity */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-900/40">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-extrabold text-base">SMART VILLAGE</h3>
              <p className="text-xs text-emerald-400">Desa Pagutan</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mb-5">
            Platform tata kelola digital, keterbukaan informasi publik, pemberdayaan ekonomi UMKM, serta pelayanan administrasi mandiri masyarakat Desa Pagutan, Kecamatan Batukliang, Kabupaten Lombok Tengah.
          </p>
          <div className="flex items-center gap-2">
            <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-emerald-500/20 border border-white/8 hover:border-emerald-500/30 flex items-center justify-center text-slate-500 hover:text-emerald-400 transition-all duration-200">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-emerald-500/20 border border-white/8 hover:border-emerald-500/30 flex items-center justify-center text-slate-500 hover:text-emerald-400 transition-all duration-200">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-emerald-500/20 border border-white/8 hover:border-emerald-500/30 flex items-center justify-center text-slate-500 hover:text-emerald-400 transition-all duration-200">
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
            <span className="w-5 h-0.5 bg-emerald-500 rounded-full" />
            Navigasi Utama
          </h4>
          <ul className="space-y-2.5 text-xs">
            {[
              { label: 'Beranda Utama', href: '/' },
              { label: 'Profil & Sejarah Desa', href: '/profil' },
              { label: 'Struktur Pemerintah Desa (SOTK)', href: '/pemerintahan' },
              { label: 'Kabar & Berita Desa', href: '/berita' },
              { label: 'Potensi UMKM & Pertanian', href: '/potensi' },
              { label: 'Peta WebGIS Wilayah', href: '/webgis' },
            ].map(link => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-emerald-500 transition-colors" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Public Services */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
            <span className="w-5 h-0.5 bg-blue-500 rounded-full" />
            Pelayanan Administrasi
          </h4>
          <ul className="space-y-2.5 text-xs">
            {[
              { label: 'Pengajuan Surat Keterangan Online', href: '/layanan' },
              { label: 'Cek Status Permohonan', href: '/layanan' },
              { label: 'Unduh Peraturan Desa (Perdes)', href: '/profil' },
              { label: 'Download Formulir Berkas', href: '/layanan' },
            ].map(link => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-blue-500 transition-colors" />
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/admin/login" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 font-medium transition-colors">
                <ShieldCheck className="w-3.5 h-3.5" />
                Portal Khusus Perangkat Desa
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & Address */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
            <span className="w-5 h-0.5 bg-amber-500 rounded-full" />
            Kontak Pelayanan
          </h4>
          <ul className="space-y-3.5 text-xs">
            <li className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="text-slate-500 leading-relaxed">Jl. Raya Batukliang, Kabupaten Lombok Tengah, Nusa Tenggara Barat (83552)</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <span className="text-slate-500">+62 819-1234-5678 (WhatsApp Center)</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <span className="text-slate-500">layanan@smartvillage-batukliang.desa.id</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="text-slate-500">Senin - Jumat: 08:00 - 15:30 WITA</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600">
        <div>
          © 2026 Pemerintah Desa Pagutan. Dikembangkan bersama Tim KKN Universitas.
        </div>
        <div className="mt-2 sm:mt-0 flex gap-4">
          <span className="hover:text-slate-400 cursor-pointer transition-colors">Privasi &amp; Syarat</span>
          <span className="text-slate-700">•</span>
          <span className="hover:text-slate-400 cursor-pointer transition-colors">Smart Village v2.0</span>
        </div>
      </div>
    </footer>
  );
};
