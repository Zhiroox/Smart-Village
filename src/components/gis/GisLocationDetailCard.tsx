'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GisLocation } from '@/lib/types';
import {
  MapPin,
  Compass,
  Copy,
  Check,
  Navigation,
  X,
  ExternalLink,
  Info,
  Building2,
  Share2
} from 'lucide-react';

interface GisLocationDetailCardProps {
  location: GisLocation | null;
  onClose: () => void;
}

const categoryColors: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  'Kantor Desa': { bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-800/40', icon: '🏛️' },
  'Sekolah': { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-800/40', icon: '🏫' },
  'Masjid': { bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-800/40', icon: '🕌' },
  'Puskesmas': { bg: 'bg-rose-50 dark:bg-rose-950/30', text: 'text-rose-700 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-800/40', icon: '🏥' },
  'Wisata': { bg: 'bg-purple-50 dark:bg-purple-950/30', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800/40', icon: '🎭' },
  'Pertanian': { bg: 'bg-lime-50 dark:bg-lime-950/30', text: 'text-lime-700 dark:text-lime-300', border: 'border-lime-200 dark:border-lime-800/40', icon: '🌾' },
  'Peternakan': { bg: 'bg-orange-50 dark:bg-orange-950/30', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-800/40', icon: '🐄' },
  'Area Rawan Bencana': { bg: 'bg-red-50 dark:bg-red-950/30', text: 'text-red-700 dark:text-red-300', border: 'border-red-200 dark:border-red-800/40', icon: '⚠️' },
  'Rute Evakuasi': { bg: 'bg-cyan-50 dark:bg-cyan-950/30', text: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-200 dark:border-cyan-800/40', icon: '🚨' },
  'Pemakaman': { bg: 'bg-stone-50 dark:bg-stone-950/30', text: 'text-stone-700 dark:text-stone-300', border: 'border-stone-200 dark:border-stone-800/40', icon: '🪦' },
  'Batas Desa': { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-700 dark:text-slate-300', border: 'border-slate-200 dark:border-slate-700', icon: '🗺️' },
  'Batas Dusun': { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-700 dark:text-slate-300', border: 'border-slate-200 dark:border-slate-700', icon: '📍' },
};

export default function GisLocationDetailCard({ location, onClose }: GisLocationDetailCardProps) {
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  if (!location) return null;

  const colors = categoryColors[location.category] || {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800/40',
    icon: '📍'
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;

  const handleCopyCoords = () => {
    const coordsStr = `${location.latitude}, ${location.longitude}`;
    navigator.clipboard.writeText(coordsStr);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(location.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full bg-white dark:bg-slate-850 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/40 shadow-xl overflow-hidden"
    >
      {/* Top Accent Header Bar */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{colors.icon}</span>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">
              Detail Titik Lokasi Terpilih
            </div>
            <div className="text-xs font-semibold text-white/90">
              {location.category} • {location.village}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Tutup Detail"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 md:p-6 space-y-5">
        {/* Title and Badges */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${colors.bg} ${colors.text} ${colors.border}`}>
                <span>{colors.icon}</span> {location.category}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium border border-slate-200/60 dark:border-slate-700/60">
                <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {location.village}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {location.name}
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
            >
              <Navigation className="w-4 h-4" />
              Rute Google Maps
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Image & Description */}
          <div className="lg:col-span-7 space-y-4">
            {location.imageUrl && (
              <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-xs bg-slate-100 dark:bg-slate-800">
                <Image
                  src={location.imageUrl}
                  alt={location.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-600" /> Deskripsi Lokasi
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800 whitespace-pre-line">
                {location.description}
              </p>
            </div>
          </div>

          {/* Right Column: Address & GPS Info Card */}
          <div className="lg:col-span-5 space-y-3">
            {/* Address Box */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Alamat Lengkap
                </span>
                <button
                  onClick={handleCopyAddress}
                  className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedAddress ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  {copiedAddress ? 'Tersalin' : 'Salin'}
                </button>
              </div>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-normal">
                {location.address}
              </p>
            </div>

            {/* GPS Coordinates Box */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-teal-600" /> Koordinat Presisi (GPS)
                </span>
                <button
                  onClick={handleCopyCoords}
                  className="text-[11px] text-teal-700 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedCoords ? <Check className="w-3 h-3 text-teal-600" /> : <Copy className="w-3 h-3" />}
                  {copiedCoords ? 'Tersalin' : 'Salin'}
                </button>
              </div>
              <div className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200/80 dark:border-slate-700/80 flex justify-between items-center">
                <span>Lat: {location.latitude}</span>
                <span>Lng: {location.longitude}</span>
              </div>
            </div>

            {/* Hint Box */}
            <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
              <span>Gunakan peta di atas untuk melihat persebaran titik lokasi lainnya.</span>
              <button
                onClick={() => {
                  const shareText = `Lokasi: ${location.name}\nKategori: ${location.category}\nAlamat: ${location.address}\nKoordinat: ${location.latitude}, ${location.longitude}`;
                  navigator.clipboard.writeText(shareText);
                  alert('Info lokasi berhasil disalin ke clipboard!');
                }}
                className="inline-flex items-center gap-1 font-bold hover:underline shrink-0 ml-2 cursor-pointer"
              >
                <Share2 className="w-3 h-3" /> Bagikan
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
