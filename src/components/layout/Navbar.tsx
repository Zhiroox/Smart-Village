'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Info, 
  Users, 
  Newspaper, 
  Sparkles, 
  Map, 
  FileText, 
  Image as ImageIcon, 
  PhoneCall, 
  ShieldCheck, 
  Menu, 
  X, 
  Landmark 
} from 'lucide-react';

export const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Profil Desa', href: '/profil', icon: Info },
    { name: 'Pemerintahan', href: '/pemerintahan', icon: Users },
    { name: 'Berita', href: '/berita', icon: Newspaper },
    { name: 'Potensi Desa', href: '/potensi', icon: Sparkles },
    { name: 'WebGIS', href: '/webgis', icon: Map },
    { name: 'Layanan', href: '/layanan', icon: FileText },
    { name: 'Galeri', href: '/galeri', icon: ImageIcon },
    { name: 'Kontak', href: '/kontak', icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Banner Bar for Official Government Identification */}
      <div className="bg-emerald-800 text-emerald-100 px-4 py-1.5 text-xs font-medium flex justify-between items-center">
        <div className="flex items-center gap-2 container mx-auto">
          <Landmark className="w-3.5 h-3.5 text-emerald-300" />
          <span>Portal Resmi Portal Smart Village Kecamatan Batukliang • Lombok Tengah</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-emerald-200 text-xs">
          <span>Kecamatan Batukliang, Kab. Lombok Tengah, NTB</span>
          <span>•</span>
          <Link href="/admin/login" className="hover:text-white flex items-center gap-1 font-semibold underline underline-offset-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Portal Admin
          </Link>
        </div>
      </div>

      {/* Main Navbar Navigation */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-lg leading-tight group-hover:text-emerald-700 transition-colors">
              SMART VILLAGE
            </div>
            <div className="text-xs text-slate-500 font-medium tracking-wide">
              Desa Pagutan
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs xl:text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link 
            href="/admin/login" 
            className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg"
            title="Portal Admin"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none rounded-lg hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 mt-2 border-t border-slate-100">
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Portal Login Admin / Operator
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
