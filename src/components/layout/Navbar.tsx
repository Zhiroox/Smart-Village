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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/98 backdrop-blur-xl shadow-xl shadow-black/20 border-b border-white/10' : 'bg-slate-900/95 backdrop-blur-md border-b border-white/5'}`}>
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-emerald-100 px-4 py-1.5 text-xs font-medium flex justify-between items-center">
        <div className="flex items-center gap-2 container mx-auto">
          <Landmark className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-200">Portal Resmi Smart Village &bull; Kecamatan Batukliang &bull; Lombok Tengah</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-emerald-300 text-xs shrink-0">
          <span>Kab. Lombok Tengah, NTB</span>
          <span className="text-emerald-600">•</span>
          <Link href="/admin/login" className="hover:text-white flex items-center gap-1 font-semibold transition-colors">
            <ShieldCheck className="w-3.5 h-3.5" />
            Portal Admin
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-900/40 group-hover:shadow-emerald-500/30 group-hover:scale-105 transition-all duration-200">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <div className="font-extrabold text-white text-lg leading-tight group-hover:text-emerald-300 transition-colors">
              SMART VILLAGE
            </div>
            <div className="text-xs text-emerald-400/80 font-medium tracking-wide">
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
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link 
            href="/admin/login" 
            className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg transition-colors"
            title="Portal Admin"
          >
            <ShieldCheck className="w-5 h-5" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none rounded-lg hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-b border-white/10 px-4 pt-2 pb-6 space-y-1 shadow-2xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 mt-2 border-t border-white/10">
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 rounded-xl text-sm font-medium hover:bg-emerald-600/30 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              Portal Login Admin / Operator
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
