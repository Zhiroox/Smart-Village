'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Navigation, Ruler, PenTool, Printer, Download,
  FileJson, FileSpreadsheet, Satellite, Moon, Sun, Maximize,
  Minimize, Compass, MousePointer, X
} from 'lucide-react';
import { saveAs } from 'file-saver';

// Types for map interaction
interface MapToolbarProps {
  mapInstance: any; // Leaflet map instance
  leafletLib: any; // Leaflet library
  locations: any[];
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isSatellite: boolean;
  onToggleSatellite: () => void;
  mouseCoords: { lat: number; lng: number } | null;
}

type ToolMode = 'none' | 'search' | 'measure-distance' | 'measure-area';

export default function WebGisToolbar({
  mapInstance,
  leafletLib,
  locations,
  isDarkMode,
  onToggleDarkMode,
  isSatellite,
  onToggleSatellite,
  mouseCoords,
}: MapToolbarProps) {
  const [toolMode, setToolMode] = useState<ToolMode>('none');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [measurePoints, setMeasurePoints] = useState<[number, number][]>([]);
  const [measureResult, setMeasureResult] = useState<string>('');
  const [measureLayers, setMeasureLayers] = useState<any[]>([]);

  // ========= SEARCH LOCATION =========
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&countrycodes=id`
      );
      const data = await res.json();
      setSearchResults(data);
    } catch {
      setSearchResults([]);
    }
    setIsSearching(false);
  }, [searchQuery]);

  const flyToSearchResult = (lat: string, lon: string, displayName: string) => {
    if (!mapInstance) return;
    mapInstance.flyTo([parseFloat(lat), parseFloat(lon)], 16, { duration: 1.5 });
    setSearchResults([]);
    setSearchQuery(displayName.split(',')[0]);
    setToolMode('none');
  };

  // ========= LOCATE ME =========
  const handleLocateMe = () => {
    if (!mapInstance || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        mapInstance.flyTo([latitude, longitude], 17, { duration: 1.5 });
        if (leafletLib) {
          const marker = leafletLib.circleMarker([latitude, longitude], {
            radius: 10,
            color: '#3b82f6',
            fillColor: '#60a5fa',
            fillOpacity: 0.7,
            weight: 3,
          }).addTo(mapInstance);
          marker.bindPopup('<div style="font-size:12px;font-weight:600;">📍 Lokasi Anda</div>').openPopup();
          setTimeout(() => mapInstance.removeLayer(marker), 15000);
        }
      },
      () => alert('Tidak dapat mengakses lokasi. Pastikan GPS aktif.'),
      { enableHighAccuracy: true }
    );
  };

  // ========= MEASURE DISTANCE =========
  const startMeasureDistance = () => {
    if (toolMode === 'measure-distance') {
      clearMeasure();
      setToolMode('none');
      return;
    }
    clearMeasure();
    setToolMode('measure-distance');
    setMeasureResult('Klik titik-titik di peta. Klik ganda untuk selesai.');
  };

  // ========= MEASURE AREA =========
  const startMeasureArea = () => {
    if (toolMode === 'measure-area') {
      clearMeasure();
      setToolMode('none');
      return;
    }
    clearMeasure();
    setToolMode('measure-area');
    setMeasureResult('Klik titik-titik polygon di peta. Klik ganda untuk selesai.');
  };

  // Clear measurement layers
  const clearMeasure = useCallback(() => {
    measureLayers.forEach(layer => {
      if (mapInstance) mapInstance.removeLayer(layer);
    });
    setMeasureLayers([]);
    setMeasurePoints([]);
    setMeasureResult('');
  }, [mapInstance, measureLayers]);

  // Add measurement point (called from parent via effect)
  React.useEffect(() => {
    if (!mapInstance || !leafletLib || (toolMode !== 'measure-distance' && toolMode !== 'measure-area')) return;

    const onClick = (e: any) => {
      const { lat, lng } = e.latlng;
      const newPoints = [...measurePoints, [lat, lng] as [number, number]];
      setMeasurePoints(newPoints);

      // Add point marker
      const circle = leafletLib.circleMarker([lat, lng], {
        radius: 5,
        color: '#ef4444',
        fillColor: '#fca5a5',
        fillOpacity: 1,
        weight: 2,
      }).addTo(mapInstance);
      setMeasureLayers(prev => [...prev, circle]);

      if (newPoints.length >= 2) {
        if (toolMode === 'measure-distance') {
          // Draw polyline
          const line = leafletLib.polyline(newPoints, {
            color: '#ef4444',
            weight: 3,
            dashArray: '8, 4',
          }).addTo(mapInstance);
          // Remove previous polyline
          setMeasureLayers(prev => {
            const oldLines = prev.filter(l => l instanceof leafletLib.Polyline && !(l instanceof leafletLib.CircleMarker));
            oldLines.forEach(l => mapInstance.removeLayer(l));
            return [...prev.filter(l => !(l instanceof leafletLib.Polyline) || l instanceof leafletLib.CircleMarker), line];
          });

          // Calculate distance
          let totalDist = 0;
          for (let i = 1; i < newPoints.length; i++) {
            totalDist += mapInstance.distance(
              leafletLib.latLng(newPoints[i - 1][0], newPoints[i - 1][1]),
              leafletLib.latLng(newPoints[i][0], newPoints[i][1])
            );
          }
          if (totalDist > 1000) {
            setMeasureResult(`Jarak: ${(totalDist / 1000).toFixed(2)} km`);
          } else {
            setMeasureResult(`Jarak: ${totalDist.toFixed(1)} m`);
          }
        } else {
          // Draw polygon
          const poly = leafletLib.polygon(newPoints, {
            color: '#8b5cf6',
            fillColor: '#c4b5fd',
            fillOpacity: 0.3,
            weight: 2,
            dashArray: '6, 4',
          }).addTo(mapInstance);
          setMeasureLayers(prev => {
            const oldPolys = prev.filter(l => l instanceof leafletLib.Polygon && !(l instanceof leafletLib.CircleMarker));
            oldPolys.forEach(l => mapInstance.removeLayer(l));
            return [...prev.filter(l => !(l instanceof leafletLib.Polygon) || l instanceof leafletLib.CircleMarker), poly];
          });

          // Calculate area (simple Shoelace formula)
          if (newPoints.length >= 3) {
            let area = 0;
            const n = newPoints.length;
            for (let i = 0; i < n; i++) {
              const j = (i + 1) % n;
              // Convert to meters approximately
              const xi = newPoints[i][1] * 111320 * Math.cos(newPoints[i][0] * Math.PI / 180);
              const yi = newPoints[i][0] * 110540;
              const xj = newPoints[j][1] * 111320 * Math.cos(newPoints[j][0] * Math.PI / 180);
              const yj = newPoints[j][0] * 110540;
              area += xi * yj - xj * yi;
            }
            area = Math.abs(area) / 2;
            if (area > 10000) {
              setMeasureResult(`Luas: ${(area / 10000).toFixed(2)} Ha`);
            } else {
              setMeasureResult(`Luas: ${area.toFixed(1)} m²`);
            }
          }
        }
      }
    };

    const onDblClick = () => {
      setToolMode('none');
      // Keep the drawing visible
    };

    mapInstance.on('click', onClick);
    mapInstance.on('dblclick', onDblClick);

    // Change cursor
    const container = mapInstance.getContainer();
    container.style.cursor = 'crosshair';

    return () => {
      mapInstance.off('click', onClick);
      mapInstance.off('dblclick', onDblClick);
      container.style.cursor = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapInstance, leafletLib, toolMode, measurePoints.length]);

  // ========= PRINT MAP =========
  const handlePrint = () => {
    window.print();
  };

  // ========= EXPORT GEOJSON =========
  const handleExportGeoJSON = () => {
    const geojson = {
      type: 'FeatureCollection',
      features: locations.map(loc => ({
        type: 'Feature',
        properties: {
          id: loc.id,
          name: loc.name,
          category: loc.category,
          description: loc.description,
          address: loc.address,
          village: loc.village,
        },
        geometry: {
          type: 'Point',
          coordinates: [loc.longitude, loc.latitude],
        },
      })),
    };
    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/geo+json' });
    saveAs(blob, 'webgis-desa-pagutan.geojson');
  };

  // ========= EXPORT CSV =========
  const handleExportCSV = () => {
    const headers = ['ID', 'Nama', 'Kategori', 'Deskripsi', 'Alamat', 'Desa', 'Latitude', 'Longitude'];
    const rows = locations.map(loc =>
      [loc.id, loc.name, loc.category, loc.description, loc.address, loc.village, loc.latitude, loc.longitude]
        .map(v => `"${String(v).replace(/"/g, '""')}"`)
        .join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'webgis-desa-pagutan.csv');
  };

  // ========= FULLSCREEN =========
  const handleFullscreen = () => {
    const mapContainer = document.getElementById('webgis-map-container');
    if (!mapContainer) return;
    if (!isFullscreen) {
      if (mapContainer.requestFullscreen) {
        mapContainer.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  React.useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // Tool buttons config
  const tools = [
    { id: 'search', icon: <Search className="w-4 h-4" />, label: 'Cari Lokasi', action: () => setToolMode(toolMode === 'search' ? 'none' : 'search') },
    { id: 'locate', icon: <Navigation className="w-4 h-4" />, label: 'Lokasi Saya', action: handleLocateMe },
    { id: 'divider1', divider: true },
    { id: 'measure-dist', icon: <Ruler className="w-4 h-4" />, label: 'Ukur Jarak', action: startMeasureDistance, active: toolMode === 'measure-distance' },
    { id: 'measure-area', icon: <PenTool className="w-4 h-4" />, label: 'Ukur Luas', action: startMeasureArea, active: toolMode === 'measure-area' },
    { id: 'divider2', divider: true },
    { id: 'print', icon: <Printer className="w-4 h-4" />, label: 'Cetak Peta', action: handlePrint },
    { id: 'geojson', icon: <FileJson className="w-4 h-4" />, label: 'Export GeoJSON', action: handleExportGeoJSON },
    { id: 'csv', icon: <FileSpreadsheet className="w-4 h-4" />, label: 'Export CSV', action: handleExportCSV },
    { id: 'divider3', divider: true },
    { id: 'satellite', icon: <Satellite className="w-4 h-4" />, label: 'Satelit', action: onToggleSatellite, active: isSatellite },
    { id: 'darkmode', icon: isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />, label: isDarkMode ? 'Light Mode' : 'Dark Mode', action: onToggleDarkMode, active: isDarkMode },
    { id: 'fullscreen', icon: isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />, label: 'Fullscreen', action: handleFullscreen, active: isFullscreen },
  ];

  return (
    <>
      {/* Toolbar (right side of map) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="absolute top-3 right-3 z-[1000] flex flex-col gap-1"
      >
        {tools.map((tool) => {
          if ('divider' in tool && tool.divider) {
            return <div key={tool.id} className="h-px bg-slate-300/40 dark:bg-slate-600/40 mx-1 my-0.5" />;
          }
          return (
            <motion.button
              key={tool.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={tool.action}
              title={tool.label}
              className={`group relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm ${
                'active' in tool && tool.active
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                  : 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700 hover:text-emerald-600 border border-slate-200/60 dark:border-slate-700/60'
              }`}
            >
              {tool.icon}
              {/* Tooltip */}
              <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-900 dark:bg-slate-700 text-white text-[10px] font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
                {tool.label}
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-slate-900 dark:border-l-slate-700" />
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Search Panel */}
      <AnimatePresence>
        {toolMode === 'search' && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-3 left-3 right-14 z-[1001] bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-xl p-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Cari lokasi di peta..."
                  autoFocus
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200/60 dark:border-slate-600/60 rounded-xl text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="px-3 py-2 bg-emerald-500 text-white text-xs font-semibold rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50"
              >
                {isSearching ? '...' : 'Cari'}
              </button>
              <button
                onClick={() => { setToolMode('none'); setSearchResults([]); }}
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            {searchResults.length > 0 && (
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {searchResults.map((r: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => flyToSearchResult(r.lat, r.lon, r.display_name)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors flex items-start gap-2"
                  >
                    <Navigation className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="line-clamp-2">{r.display_name}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Measurement result banner */}
      <AnimatePresence>
        {measureResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-14 left-3 z-[1000] bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-3"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              toolMode === 'measure-area' ? 'bg-violet-100 text-violet-600' : 'bg-rose-100 text-rose-600'
            }`}>
              {toolMode === 'measure-area' ? <PenTool className="w-4 h-4" /> : <Ruler className="w-4 h-4" />}
            </div>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{measureResult}</span>
            <button
              onClick={() => { clearMeasure(); setToolMode('none'); }}
              className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compass */}
      <div className="absolute bottom-14 right-3 z-[1000]">
        <div className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 shadow-sm flex items-center justify-center">
          <Compass className="w-5 h-5 text-emerald-600" />
        </div>
      </div>

      {/* Mouse Coordinates */}
      {mouseCoords && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-3 left-3 z-[1000] bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 rounded-lg px-3 py-1.5 shadow-sm flex items-center gap-2"
        >
          <MousePointer className="w-3 h-3 text-emerald-500" />
          <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400">
            {mouseCoords.lat.toFixed(6)}°, {mouseCoords.lng.toFixed(6)}°
          </span>
        </motion.div>
      )}
    </>
  );
}
