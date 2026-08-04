'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { MapPin, BarChart3 } from 'lucide-react';
import { GisLocation } from '@/lib/types';

const CATEGORY_COLORS: Record<string, string> = {
  'Sekolah': '#f59e0b',
  'Masjid': '#10b981',
  'Kantor Desa': '#3b82f6',
  'Puskesmas': '#f43f5e',
  'Pemakaman': '#78716c',
  'Area Rawan Bencana': '#ef4444',
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: [0, 0, 0.58, 1] as const },
  }),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 shadow-lg">
        <p className="text-xs font-bold text-slate-800 dark:text-white">{payload[0]?.name}</p>
        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{payload[0]?.value} lokasi</p>
      </div>
    );
  }
  return null;
};

interface WebGisChartsProps {
  locations?: GisLocation[];
  umkmData?: unknown[];
  komoditasData?: unknown[];
  risikoData?: unknown[];
}

export default function WebGisCharts({ locations = [] }: WebGisChartsProps) {
  const categoryCounts = locations.reduce<Record<string, number>>((acc, loc) => {
    acc[loc.category] = (acc[loc.category] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.entries(categoryCounts).map(([name, value]) => ({
    name: name === 'Area Rawan Bencana' ? 'Lainnya' : name,
    value,
    color: CATEGORY_COLORS[name] || '#94a3b8',
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Jumlah Marker Bar Chart */}
      <motion.div
        custom={1}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        whileHover={{ y: -4 }}
        className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-600 flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Jumlah per Kategori</h4>
            <p className="text-[10px] text-slate-400">Total {locations.length} titik lokasi</p>
          </div>
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                axisLine={{ stroke: 'rgba(148,163,184,0.2)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                width={30}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
