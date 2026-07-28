'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { mockGisLocations, umkmChartData, komoditasChartData, risikoChartData } from '@/lib/data/mockData';
import { Map } from 'lucide-react';
import WebGisStatsBar from '@/components/gis/WebGisStatsBar';
import WebGisFilterSidebar from '@/components/gis/WebGisFilterSidebar';

// Dynamic imports for heavy components (no SSR)
const MapComponent = dynamic(
  () => import('@/components/gis/MapComponent').then(mod => ({ default: mod.MapComponent })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[480px] sm:h-[520px] lg:h-[640px] bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-slate-400 font-medium">Memuat Peta Interaktif WebGIS...</p>
        </div>
      </div>
    ),
  }
);

const WebGisCharts = dynamic(
  () => import('@/components/gis/WebGisCharts'),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-72 bg-slate-100 animate-pulse rounded-2xl" />
        ))}
      </div>
    ),
  }
);

// All filterable categories (matching actual markers)
const filterCategories = [
  { key: 'Sekolah', label: 'Sekolah', icon: '🏫', color: '#f59e0b', count: 0 },
  { key: 'Masjid', label: 'Masjid', icon: '🕌', color: '#10b981', count: 0 },
  { key: 'Kantor Desa', label: 'Kantor Desa', icon: '🏛️', color: '#3b82f6', count: 0 },
  { key: 'Puskesmas', label: 'Puskesmas', icon: '🏥', color: '#f43f5e', count: 0 },
  { key: 'Area Rawan Bencana', label: 'Lainnya', icon: '📍', color: '#ef4444', count: 0 },
];

export default function WebGisPage() {
  // Compute counts from mock data
  const categoriesWithCounts = filterCategories.map(cat => ({
    ...cat,
    count: mockGisLocations.filter(l => l.category === cat.key).length,
  }));

  // All filters active by default
  const [activeFilters, setActiveFilters] = useState<string[]>(
    filterCategories.map(c => c.key)
  );
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSatellite, setIsSatellite] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleFilter = useCallback((key: string) => {
    setActiveFilters(prev =>
      prev.includes(key) ? prev.filter(f => f !== key) : [...prev, key]
    );
  }, []);

  const handleToggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const handleToggleSatellite = useCallback(() => {
    setIsSatellite(prev => !prev);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    // Filter sidebar search (filter locations by name)
    // This is complementary to the map search tool
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-800 dark:text-white py-8 px-4 border-b border-slate-200/80 dark:border-slate-700/50 overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200/20 dark:bg-emerald-900/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-teal-200/15 dark:bg-teal-900/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-semibold mb-3"
          >
            <Map className="w-3.5 h-3.5" />
            Sistem Informasi Geografis Spasial (WebGIS)
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-3"
          >
            Peta Spasial Desa Pagutan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 dark:text-slate-400 text-xs md:text-sm max-w-2xl mx-auto"
          >
            Pemetaan interaktif persebaran potensi desa, infrastruktur, zona mitigasi bencana, serta analisis spasial wilayah Desa Pagutan.
          </motion.p>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 max-w-7xl py-6 space-y-5">
        {/* Stats Bar */}
        <WebGisStatsBar />

        {/* Map + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Filter Sidebar — appears below map on mobile, left on desktop */}
          <div className="order-2 lg:order-1 w-full lg:w-72 xl:w-80 shrink-0">
            <WebGisFilterSidebar
              categories={categoriesWithCounts}
              activeFilters={activeFilters}
              onToggleFilter={handleToggleFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchSubmit={handleSearchSubmit}
            />
          </div>

          {/* Interactive Map — appears first on mobile */}
          <div
            className="order-1 lg:order-2 flex-1 w-full min-h-[420px] h-[420px] sm:h-[520px] lg:h-[640px] rounded-2xl overflow-hidden shadow-md border border-slate-200/80 dark:border-slate-700/80 relative bg-slate-100 dark:bg-slate-800"
          >
            <MapComponent
              locations={mockGisLocations}
              activeFilters={activeFilters}
              isDarkMode={isDarkMode}
              isSatellite={isSatellite}
              onToggleDarkMode={handleToggleDarkMode}
              onToggleSatellite={handleToggleSatellite}
            />
          </div>
        </div>

        {/* Charts Dashboard */}
        <WebGisCharts
          umkmData={umkmChartData}
          komoditasData={komoditasChartData}
          risikoData={risikoChartData}
        />
      </div>
    </div>
  );
}
