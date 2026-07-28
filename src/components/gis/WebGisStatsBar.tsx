'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { School, Landmark, Hospital, MapPin } from 'lucide-react';
import { mockGisLocations } from '@/lib/data/mockData';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
  bgColor: string;
}

// Derive stats dynamically from actual marker data
const sekolahCount = mockGisLocations.filter(l => l.category === 'Sekolah').length;
const masjidCount = mockGisLocations.filter(l => l.category === 'Masjid').length;
const kantorDesaCount = mockGisLocations.filter(l => l.category === 'Kantor Desa').length;
const puskesmasCount = mockGisLocations.filter(l => l.category === 'Puskesmas').length;
const totalMarkers = mockGisLocations.length;

const stats: StatItem[] = [
  { icon: <MapPin className="w-4 h-4" />, value: totalMarkers, label: 'Total Marker', color: 'text-slate-600', bgColor: 'bg-slate-500/15' },
  { icon: <School className="w-4 h-4" />, value: sekolahCount, label: 'Sekolah', color: 'text-amber-500', bgColor: 'bg-amber-500/15' },
  { icon: <Landmark className="w-4 h-4" />, value: masjidCount, label: 'Masjid', color: 'text-emerald-500', bgColor: 'bg-emerald-500/15' },
  { icon: <Landmark className="w-4 h-4" />, value: kantorDesaCount, label: 'Kantor Desa', color: 'text-blue-500', bgColor: 'bg-blue-500/15' },
  { icon: <Hospital className="w-4 h-4" />, value: puskesmasCount, label: 'Puskesmas', color: 'text-rose-500', bgColor: 'bg-rose-500/15' },
];

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = Math.max(1, Math.ceil(value / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{display}</span>;
}

export default function WebGisStatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ scale: 1.04, y: -2 }}
            className="relative group bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-default overflow-hidden"
          >
            {/* Decorative gradient glow */}
            <div className={`absolute -top-6 -right-6 w-16 h-16 ${stat.bgColor} rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`} />

            <div className={`relative z-10 w-10 h-10 rounded-xl ${stat.bgColor} ${stat.color} flex items-center justify-center shrink-0`}>
              {stat.icon}
            </div>
            <div className="relative z-10">
              <div className="text-xl font-extrabold text-slate-900 dark:text-white leading-none">
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
