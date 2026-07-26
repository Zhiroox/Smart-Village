'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Wheat, Sprout, Egg, Home, ShieldAlert, 
  ChevronRight, ArrowRight, CheckCircle2, 
  Sparkles, Leaf, Award, Globe
} from 'lucide-react';

interface Commodity {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  icon: React.ReactNode;
  imageUrl: string;
  tag: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

const commodities: Commodity[] = [
  {
    id: 'cabai',
    name: 'Cabai',
    shortDesc: 'Cabai kering dan cabai rawit menjadi komoditas unggulan dengan permintaan tinggi di pasar lokal dan luar daerah.',
    fullDesc: 'Mengingat tingginya fluktuasi harga cabai di pasaran, komoditas ini dikelola dengan tingkat kehati-hatian yang tinggi oleh petani, mulai dari penyemaian hingga pengendalian hama. Cabai dipanen secara bertahap setiap beberapa hari sekali dalam satu siklus tanam. Setelah dipetik, cabai disortir berdasarkan tingkat kematangannya agar tidak mudah busuk selama proses distribusi ke pasar maupun ke tangan pedagang eceran.',
    icon: <Sprout className="w-5 h-5" />,
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&q=80&w=400',
    tag: 'Hortikultura',
    bgColor: 'bg-rose-50 dark:bg-rose-950/20',
    borderColor: 'border-rose-200 dark:border-rose-800/40',
    textColor: 'text-rose-600 dark:text-rose-450',
  },
  {
    id: 'tomat',
    name: 'Tomat',
    shortDesc: 'Tomat segar berkualitas tinggi dengan potensi pasar yang luas dan nilai ekonomi yang menjanjikan.',
    fullDesc: 'Tomat segar yang diproduksi di Desa Pagutan terkenal dengan kualitasnya yang prima, daging tebal, dan daya simpan yang relatif baik. Pembudidayaan dilakukan dengan teknik modern untuk menjaga kestabilan hasil panen. Sektor ini menjadi salah satu penopang utama pendapatan harian petani hortikultura di wilayah desa.',
    icon: <Leaf className="w-5 h-5" />,
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400',
    tag: 'Hortikultura',
    bgColor: 'bg-red-50 dark:bg-red-950/20',
    borderColor: 'border-red-200 dark:border-red-800/40',
    textColor: 'text-red-600 dark:text-red-450',
  },
  {
    id: 'jagung',
    name: 'Jagung',
    shortDesc: 'Jagung sebagai sumber pangan dan pakan ternak dengan produktivitas yang terus meningkat.',
    fullDesc: 'Jagung menjadi tanaman palawija pilihan utama warga saat memasuki musim kemarau karena kebutuhan airnya yang relatif lebih sedikit. Penanamannya tersebar di area tegalan maupun sawah tadah hujan. Sebagian besar panen jagung Pagutan dijual kepada pengepul, sementara sebagian kecil lainnya disisihkan untuk konsumsi pangan lokal.',
    icon: <Wheat className="w-5 h-5" />,
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=400',
    tag: 'Palawija',
    bgColor: 'bg-amber-50 dark:bg-amber-950/20',
    borderColor: 'border-amber-200 dark:border-amber-800/40',
    textColor: 'text-amber-600 dark:text-amber-450',
  },
  {
    id: 'kacang-tanah',
    name: 'Kacang Tanah',
    shortDesc: 'Kacang tanah berkualitas baik menjadi komoditas andalan petani dengan nilai jual yang stabil.',
    fullDesc: 'Kacang tanah ditanam pada area lahan yang memiliki struktur tanah lebih gembur untuk memudahkan pembentukan polong. Komoditas ini cukup diminati karena memberikan perputaran uang yang lumayan stabil bagi petani. Saat musim panen tiba, kacang tanah dijual menyesuaikan permintaan pengepul baik dalam kondisi basah untuk direbus, maupun dijemur hingga kering sebagai bahan baku industri makanan ringan dan bumbu kacang.',
    icon: <Sprout className="w-5 h-5" />,
    imageUrl: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&q=80&w=400',
    tag: 'Palawija',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800/40',
    textColor: 'text-yellow-600 dark:text-yellow-450',
  },
  {
    id: 'kedelai',
    name: 'Kedelai',
    shortDesc: 'Kedelai sebagai sumber protein nabati dengan peluang pengembangan yang besar.',
    fullDesc: 'Budidaya kedelai memiliki peran ganda bagi petani Desa Pagutan: sebagai sumber pendapatan tambahan and sebagai tanaman sela untuk mengembalikan unsur hara nitrogen ke dalam tanah. Kualitas biji kedelai yang dihasilkan memenuhi standar untuk diproses lebih lanjut. Hasil panen warga terserap secara konsisten oleh para pelaku Usaha Mikro, Kecil, dan Menengah (UMKM), khususnya para perajin tahu dan tempe skala rumah tangga di sekitar desa.',
    icon: <Leaf className="w-5 h-5" />,
    imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=400',
    tag: 'Palawija',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800/40',
    textColor: 'text-emerald-600 dark:text-emerald-450',
  },
  {
    id: 'padi',
    name: 'Padi',
    shortDesc: 'Padi sebagai komoditas utama dengan produksi melimpah dan kualitas yang terus ditingkatkan.',
    fullDesc: 'Padi merupakan tanaman utama yang mendominasi tata guna lahan sawah di Desa Pagutan, terutama saat musim penghujan pasokan air sedang maksimal. Para petani memprioritaskan pemeliharaan gabah agar persentase butir patah saat digiling dapat ditekan. Hasil panen dari komoditas ini utamanya digunakan untuk mengamankan stok pangan rumah tangga warga, sementara sisanya didistribusikan ke tempat penggilingan beras lokal untuk menyuplai pasar-pasar tradisional terdekat.',
    icon: <Wheat className="w-5 h-5" />,
    imageUrl: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=400',
    tag: 'Pangan Utama',
    bgColor: 'bg-teal-50 dark:bg-teal-950/20',
    borderColor: 'border-teal-200 dark:border-teal-800/40',
    textColor: 'text-teal-600 dark:text-teal-450',
  },
  {
    id: 'telur-ayam',
    name: 'Telur Ayam',
    shortDesc: 'Telur ayam dihasilkan dari peternakan ayam petelur lokal dengan kualitas baik dan pasokan stabil.',
    fullDesc: 'Sektor peternakan unggas skala rumahan turut menjadi pilar pendukung ekonomi warga Desa Pagutan. Peternak lokal memelihara ayam petelur dengan manajemen pakan dan kebersihan kandang yang terjaga untuk menghasilkan produksi telur segar berkualitas. Panen telur ini secara rutin didistribusikan untuk memenuhi kebutuhan nutrisi masyarakat desa, serta disuplai secara harian ke warung-warung sembako dan lapak pasar tradisional terdekat.',
    icon: <Egg className="w-5 h-5" />,
    imageUrl: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=400',
    tag: 'Peternakan',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    borderColor: 'border-orange-200 dark:border-orange-800/40',
    textColor: 'text-orange-600 dark:text-orange-450',
  },
  {
    id: 'atap-alang-alang',
    name: 'Atap Alang-Alang',
    shortDesc: 'Kerajinan atap dari alang-alang menjadi produk unggulan lokal yang kuat, sejuk, dan ramah lingkungan dengan nilai ekonomi tinggi.',
    fullDesc: 'Produk kriya unggulan hasil anyaman manual warga Desa Pagutan. Atap tradisional ini dikenal memiliki ikatan yang kuat, rapi, ramah lingkungan, serta mampu menyejukkan ruangan. Berkat kualitas estetika natural dan daya tahannya yang tinggi, karya warga ini tidak hanya diserap oleh pasar domestik untuk kebutuhan resor dan villa, tetapi juga sukses menembus pasar ekspor internasional hingga ke Eropa.',
    icon: <Home className="w-5 h-5" />,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400',
    tag: 'Ekonomi Kreatif',
    bgColor: 'bg-sky-50 dark:bg-sky-950/20',
    borderColor: 'border-sky-200 dark:border-sky-800/40',
    textColor: 'text-sky-600 dark:text-sky-450',
  }
];

export default function PotensiPage() {
  const [selectedId, setSelectedId] = useState<string>('padi');
  const detailsRef = useRef<HTMLDivElement>(null);

  const selectedCommodity = commodities.find(c => c.id === selectedId) || commodities[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    // Smooth scroll to details on mobile/tablet
    if (window.innerWidth < 1024) {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* ── HERO BANNER SECTION ── */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 text-white border-b border-emerald-800/30">
        {/* Background Image Overlay with blur */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image 
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200" 
            alt="Desa Pagutan Farmland" 
            fill 
            className="object-cover filter blur-[2px]" 
            priority
          />
        </div>
        
        {/* Modern glowing blur shapes */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/15 border border-emerald-450/30 text-emerald-400 rounded-full text-xs font-semibold mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5" /> 
            Potensi Sumber Daya &amp; Sektor Utama
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight"
          >
            Produk &amp; Komoditas <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-350 to-emerald-300 bg-clip-text text-transparent">
              Unggulan Desa Pagutan
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-350 text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Berbagai produk dan komoditas unggulan hasil bumi, peternakan, dan kerajinan lokal 
            yang menjadi kekuatan ekonomi Desa Pagutan serta sumber penghidupan masyarakat.
          </motion.p>
        </div>
      </section>

      {/* ── VISUAL COMMODITY ROW (CAROUSEL GRID) ── */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/60 py-10 shadow-sm relative z-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-emerald-600 dark:text-emerald-400 mb-1">
              Daftar Komoditas &amp; Produk
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Pilih salah satu ikon komoditas untuk membaca ulasan detailnya di bawah</p>
          </div>

          {/* Row of Rectangular Commodity Cards (3/4 Image, 1/4 White Bar) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-3">
            {commodities.map((item, idx) => {
              const isSelected = selectedId === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(item.id)}
                  className={`flex flex-col h-48 rounded-2xl border overflow-hidden transition-all duration-300 ${
                    isSelected
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md shadow-emerald-500/5'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 shadow-sm'
                  }`}
                >
                  {/* Top 3/4: Cover Image */}
                  <div className="relative w-full h-[73%] overflow-hidden bg-slate-100 dark:bg-slate-850">
                    <Image 
                      src={item.imageUrl} 
                      alt={item.name} 
                      fill 
                      className="object-cover transition-transform duration-500 hover:scale-105" 
                      unoptimized 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                  </div>
                  
                  {/* Bottom 1/4: White bar for name and type */}
                  <div className={`w-full h-[27%] flex flex-col justify-center items-center px-1.5 border-t text-center transition-colors duration-250 ${
                    isSelected 
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30' 
                      : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-800/80'
                  }`}>
                    <span className={`text-[11px] sm:text-[12px] font-extrabold leading-tight ${
                      isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'
                    }`}>
                      {item.name}
                    </span>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                      {item.tag}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE INFO / DESCRIPTION SECTION ── */}
      <section className="py-12 md:py-16 px-4" ref={detailsRef}>
        <div className="container mx-auto max-w-6xl">
          
          {/* Main Info Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Overview & Detailed text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-xs uppercase font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider">
                  Profil Unggulan
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  Membangun Kemandirian Ekonomi dari Kekayaan Alam dan Kreativitas Warga
                </h2>
                <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
                  Sektor pertanian, peternakan, dan ekonomi kreatif merupakan pilar utama penggerak kesejahteraan di Desa Pagutan. Berkat lahan yang subur dan ketekunan para warga, Desa Pagutan secara konsisten menghasilkan ragam komoditas pangan berkualitas serta kerajinan bernilai guna tinggi.
                </p>
              </div>

              {/* Dynamic Overview Section */}
              <div className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-550 dark:text-slate-400">
                    Overview Komoditas Terpilih
                  </h3>
                </div>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${selectedCommodity.bgColor} ${selectedCommodity.textColor} shrink-0`}>
                    {selectedCommodity.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                      {selectedCommodity.name}
                    </h4>
                    <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
                      {selectedCommodity.shortDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Comprehensive List (All item short-descriptions) */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-300">
                  Ringkasan Seluruh Komoditas Desa:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {commodities.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelect(c.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                        selectedId === c.id 
                          ? 'bg-emerald-50/30 border-emerald-300 dark:bg-emerald-950/10 dark:border-emerald-800' 
                          : 'bg-white dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 hover:border-slate-200'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${
                        selectedId === c.id ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'
                      }`} />
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-350">{c.name}</div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1">{c.shortDesc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Detailed Card view of selected commodity */}
            <div className="lg:col-span-5 lg:sticky lg:top-6">
              <motion.div
                key={selectedCommodity.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/70 dark:border-slate-700/60 shadow-lg overflow-hidden"
              >
                {/* Big Preview Image */}
                <div className="relative h-60 w-full bg-slate-150">
                  <Image 
                    src={selectedCommodity.imageUrl} 
                    alt={selectedCommodity.name} 
                    fill 
                    className="object-cover" 
                    unoptimized 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-450 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                      {selectedCommodity.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mb-2.5">
                      {selectedCommodity.name}
                    </h3>
                    <div className="h-0.5 w-12 bg-emerald-500 rounded-full mb-4" />
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {selectedCommodity.fullDesc}
                    </p>
                  </div>

                  {/* Highlights and badges */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Award className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Kualitas Premium</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Globe className="w-4 h-4 text-teal-500 shrink-0" />
                      <span>Potensi Ekspor</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
