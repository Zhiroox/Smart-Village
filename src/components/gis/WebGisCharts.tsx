'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp, BarChart3, ShieldAlert } from 'lucide-react';

interface ChartDataItem {
  name: string;
  value: number;
  color?: string;
  satuan?: string;
}

interface WebGisChartsProps {
  umkmData: ChartDataItem[];
  komoditasData: ChartDataItem[];
  risikoData: ChartDataItem[];
}

const KOMODITAS_COLORS = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5', '#ecfdf5'];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: [0, 0, 0.58, 1] as const },
  }),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 shadow-lg">
        <p className="text-xs font-bold text-slate-800 dark:text-white">{label || payload[0]?.name}</p>
        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{payload[0]?.value} {payload[0]?.payload?.satuan || ''}</p>
      </div>
    );
  }
  return null;
};

export default function WebGisCharts({ umkmData, komoditasData, risikoData }: WebGisChartsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* UMKM Pie Chart */}
      <motion.div
        custom={0}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        whileHover={{ y: -4 }}
        className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-violet-500/15 text-violet-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Statistik UMKM</h4>
            <p className="text-[10px] text-slate-400">Distribusi per kategori</p>
          </div>
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={umkmData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {umkmData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => <span className="text-[10px] text-slate-600 dark:text-slate-400">{value}</span>}
                iconSize={8}
                wrapperStyle={{ fontSize: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Komoditas Bar Chart */}
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
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Komoditas</h4>
            <p className="text-[10px] text-slate-400">Luas lahan pertanian (Ha)</p>
          </div>
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={komoditasData} barCategoryGap="20%">
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
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {komoditasData.map((_, index) => (
                  <Cell key={`bar-${index}`} fill={KOMODITAS_COLORS[index % KOMODITAS_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Risiko Bencana Doughnut Chart */}
      <motion.div
        custom={2}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        whileHover={{ y: -4 }}
        className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-600 flex items-center justify-center">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Risiko Bencana</h4>
            <p className="text-[10px] text-slate-400">Titik rawan per jenis</p>
          </div>
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={risikoData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={6}
                dataKey="value"
                strokeWidth={0}
              >
                {risikoData.map((entry, index) => (
                  <Cell key={`risk-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => <span className="text-[10px] text-slate-600 dark:text-slate-400">{value}</span>}
                iconSize={8}
                wrapperStyle={{ fontSize: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
