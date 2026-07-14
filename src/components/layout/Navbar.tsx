'use client';

import React, { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/98 backdrop-blur-xl shadow-md border-b-2 border-slate-300' : 'bg-white/95 backdrop-blur-md border-b border-slate-300'}`}>
      {/* Top Banner Bar — hidden on mobile to save space */}
      <div className="hidden md:block bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-955 text-emerald-100 px-4 py-1.5 text-xs font-medium">
        <div className="flex items-center justify-between container mx-auto">
          <div className="flex items-center gap-2">
            <Landmark className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-200">Portal Resmi Smart Village &bull; Kecamatan Batukliang &bull; Lombok Tengah</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-300 text-xs shrink-0">
            <span>Kab. Lombok Tengah, NTB</span>
            <span className="text-emerald-600">&bull;</span>
            <Link href="/admin/login" className="hover:text-white flex items-center gap-1 font-semibold transition-colors">
              <ShieldCheck className="w-3.5 h-3.5" />
              Portal Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-950/20 group-hover:shadow-emerald-500/30 group-hover:scale-105 transition-all duration-200 shrink-0">
            <Landmark className="w-4 h-4 md:w-6 md:h-6" />
          </div>
          <div>
            <div className="font-extrabold text-slate-800 text-sm md:text-lg leading-tight group-hover:text-emerald-600 transition-colors">
              SMART VILLAGE
            </div>
            <div className="text-[10px] md:text-xs text-emerald-600 font-semibold tracking-wide">
              Desa Pagutan
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs xl:text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                    : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-100/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-500'}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link 
            href="/admin/login" 
            className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
            title="Portal Admin"
          >
            <ShieldCheck className="w-5 h-5" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-500 hover:text-slate-800 focus:outline-none rounded-lg hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-3 pt-2 pb-5 shadow-xl space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                {link.name}
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />}
              </Link>
            );
          })}
          <div className="pt-3 mt-1 border-t border-slate-100">
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-emerald-600 text-white rounded-xl text-sm font-semibold active:bg-emerald-700 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-200 shrink-0" />
              Portal Login Admin / Operator
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
