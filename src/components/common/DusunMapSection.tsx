'use client';

import React, { useState } from 'react';
import { MapPin, ArrowRight, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DusunMapSection() {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section className="bg-white py-14 px-4 border-b border-slate-200">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg text-xs font-semibold mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5" /> Peta Wilayah Administratif
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Peta Wilayah Desa Pagutan
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Peta administrasi yang memuat 15 Dusun di Desa Pagutan beserta batas wilayah dan jaringan jalan raya.
          </p>
        </div>

        {/* Map Image Viewer Card */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 group transition-all duration-300">
          
          {/* Top Controls Overlay */}
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button 
              onClick={() => setIsZoomed(!isZoomed)}
              className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:text-emerald-600 hover:bg-white transition-all active:scale-95"
              title={isZoomed ? "Perkecil Tampilan" : "Perbesar Tampilan"}
            >
              {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </button>
          </div>

          {/* Image Container */}
          <div 
            className={`relative w-full transition-all duration-500 ease-in-out cursor-pointer ${isZoomed ? 'h-[80vh] md:h-[90vh]' : 'h-[50vh] md:h-[70vh]'}`}
            onClick={() => setIsZoomed(!isZoomed)}
            title="Klik untuk memperbesar / memperkecil peta"
          >
            {/* 
              TUTORIAL UNTUK USER:
              1. Simpan gambar foto "PETA DESA PAGUTAN" Anda.
              2. Ganti nama filenya menjadi "peta_desa.jpg".
              3. Pindahkan file tersebut ke dalam folder "public/" di dalam project ini.
            */}
            <Image 
              src="/peta_desa.jpg" 
              alt="Peta Wilayah Desa Pagutan"
              fill
              className={`transition-all duration-700 ${isZoomed ? 'object-contain scale-100' : 'object-cover hover:scale-105'}`}
              unoptimized
            />
            
            {/* Gradient Overlay for Aesthetics when not zoomed */}
            {!isZoomed && (
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
            )}
            
            {/* Fallback Text / Instructions if image is missing */}
            <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center text-slate-400 p-6 text-center border-2 border-dashed border-slate-300 rounded-2xl m-4 bg-slate-50">
              <MapPin className="w-12 h-12 mb-3 text-slate-300" />
              <p className="font-semibold text-slate-600 mb-1">Gambar Peta Belum Ditemukan</p>
              <p className="text-xs">Mohon tambahkan file <b>peta_desa.jpg</b> ke dalam folder <b>public/</b></p>
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 bg-white border-t border-slate-200">
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 15 Dusun
              </span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" /> Batas Administratif
              </span>
            </div>
            
            <Link
              href="/webgis"
              className="flex items-center gap-2 text-xs font-bold text-white bg-slate-900 hover:bg-emerald-600 px-4 py-2 rounded-lg transition-colors shadow-md group"
            >
              Buka di Peta Interaktif WebGIS
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

