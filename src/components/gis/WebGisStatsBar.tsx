'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Wheat, Beef, ShoppingBag, TreePine, AlertTriangle } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
  bgColor: string;
}

const stats: StatItem[] = [
  { icon: <Home className="w-4 h-4" />, value: 18, label: 'Dusun', color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
  { icon: <Wheat className="w-4 h-4" />, value: 145, label: 'Sawah', color: 'text-emerald-400', bgColor: 'bg-emerald-500/20' },
  { icon: <Beef className="w-4 h-4" />, value: 82, label: 'Peternakan', color: 'text-orange-400', bgColor: 'bg-orange-500/20' },
  { icon: <ShoppingBag className="w-4 h-4" />, value: 56, label: 'UMKM', color: 'text-violet-400', bgColor: 'bg-violet-500/20' },
  { icon: <TreePine className="w-4 h-4" />, value: 12, label: 'Wisata', color: 'text-teal-400', bgColor: 'bg-teal-500/20' },
  { icon: <AlertTriangle className="w-4 h-4" />, value: 5, label: 'Titik Rawan', color: 'text-rose-400', bgColor: 'bg-rose-500/20' },
];

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(value / (duration / 16));
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
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
