'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, Layers, ChevronDown, ChevronUp,
  Eye, EyeOff
} from 'lucide-react';

interface FilterCategory {
  key: string;
  label: string;
  icon: string;
  color: string;
  count: number;
}

interface WebGisFilterSidebarProps {
  categories: FilterCategory[];
  activeFilters: string[];
  onToggleFilter: (key: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: () => void;
}

export default function WebGisFilterSidebar({
  categories,
  activeFilters,
  onToggleFilter,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: WebGisFilterSidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const allActive = categories.every(c => activeFilters.includes(c.key));

  const handleToggleAll = () => {
    if (allActive) {
      // Deselect all
      categories.forEach(c => {
        if (activeFilters.includes(c.key)) onToggleFilter(c.key);
      });
    } else {
      // Select all
      categories.forEach(c => {
        if (!activeFilters.includes(c.key)) onToggleFilter(c.key);
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="w-full lg:w-72 xl:w-80 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-sm flex flex-col overflow-hidden shrink-0"
    >
      {/* Header */}
      <div className="p-4 pb-3 border-b border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Filter Layer</h3>
              <p className="text-[10px] text-slate-400">Pilih kategori peta</p>
            </div>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSearchSubmit()}
            placeholder="Cari lokasi..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200/60 dark:border-slate-600/60 rounded-xl text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all"
          />
        </div>
      </div>

      {/* Filter Checkboxes */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-3 space-y-1.5">
              {/* Toggle All */}
              <button
                onClick={handleToggleAll}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/40 dark:border-slate-600/40 transition-all"
              >
                <span className="flex items-center gap-2">
                  {allActive ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {allActive ? 'Sembunyikan Semua' : 'Tampilkan Semua'}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                  {activeFilters.length}/{categories.length}
                </span>
              </button>

              {/* Category filters */}
              {categories.map((cat, i) => {
                const isActive = activeFilters.includes(cat.key);
                return (
                  <motion.button
                    key={cat.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ x: 4 }}
                    onClick={() => onToggleFilter(cat.key)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-700/40 text-emerald-800 dark:text-emerald-300'
                        : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/30 text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-600'
                    }`}
                  >
                    {/* Custom checkbox */}
                    <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                      isActive
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-slate-300 dark:border-slate-600 group-hover:border-emerald-400'
                    }`}>
                      {isActive && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    <span className="text-base">{cat.icon}</span>
                    <span className="flex-1 text-left">{cat.label}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      isActive
                        ? 'bg-emerald-200/60 dark:bg-emerald-800/40 text-emerald-700 dark:text-emerald-300'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}>
                      {cat.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Quick Locate */}
            <div className="p-3 pt-0">
              <button
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(() => {
                      // Will be handled by parent
                    });
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm hover:shadow-md hover:from-emerald-600 hover:to-teal-600 transition-all active:scale-[0.98]"
              >
                <MapPin className="w-3.5 h-3.5" />
                Lokasi Saya
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
