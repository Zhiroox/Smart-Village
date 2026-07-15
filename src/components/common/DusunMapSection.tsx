'use client';

import React, { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface DusunData {
  id: string;
  name: string;
  color: string;
  path: string;
  labelX: number;
  labelY: number;
}

// All polygon edges are shared exactly — zero gaps.
// Layout based on the real map of Desa Pagutan, Kec. Batukliang:
//   - North boundary along Jl. Pagutan
//   - East boundary along Jl. Pagutan-Mantang
//   - Kantor Desa Pagutan in the northeast
//   - Tunjang areas to the west/northwest
//   - Genteng in the center-west
//   - Village narrows toward the south

// Shared vertex grid:
// Row 0 (north edge):  (55,35) (175,18) (295,12) (415,16) (535,28) (580,52)
// Row 1:               (38,135)(165,122)(290,118)(415,122)(540,128)(582,148)
// Row 2:               (28,235)(155,225)(285,218)(412,222)(538,230)(582,248)
// Row 3:               (45,330)(175,318)(305,312)(432,318)(555,328)
// Row 4 (south edge):  (70,405)(210,415)(355,420)(500,410)(565,388)

const dusunData: DusunData[] = [
  // ── Row 1 (North, along Jl. Pagutan) ──
  {
    id: 'tunjang-utara',
    name: 'Tunjang Utara',
    color: '#0d9488',
    path: 'M 55 35 L 175 18 L 165 122 L 38 135 Z',
    labelX: 108, labelY: 78,
  },
  {
    id: 'pesinggahan',
    name: 'Pesinggahan',
    color: '#0284c7',
    path: 'M 175 18 L 295 12 L 290 118 L 165 122 Z',
    labelX: 231, labelY: 68,
  },
  {
    id: 'pagutan-utara',
    name: 'Pagutan Utara',
    color: '#059669',
    path: 'M 295 12 L 415 16 L 415 122 L 290 118 Z',
    labelX: 354, labelY: 67,
  },
  {
    id: 'lombok-daye',
    name: 'Lombok Daye',
    color: '#4f46e5',
    path: 'M 415 16 L 535 28 L 580 52 L 582 148 L 540 128 L 415 122 Z',
    labelX: 500, labelY: 82,
  },

  // ── Row 2 (Upper-middle) ──
  {
    id: 'jejeneng',
    name: 'Jejeneng',
    color: '#d97706',
    path: 'M 38 135 L 165 122 L 155 225 L 28 235 Z',
    labelX: 97, labelY: 180,
  },
  {
    id: 'ld-buwuh',
    name: 'LD. Buwuh',
    color: '#dc2626',
    path: 'M 165 122 L 290 118 L 285 218 L 155 225 Z',
    labelX: 224, labelY: 171,
  },
  {
    id: 'sangkawana',
    name: 'Sangkawana',
    color: '#db2777',
    path: 'M 290 118 L 415 122 L 412 222 L 285 218 Z',
    labelX: 351, labelY: 170,
  },
  {
    id: 'ld-gocek',
    name: 'LD. Gocek',
    color: '#0891b2',
    path: 'M 415 122 L 540 128 L 582 148 L 582 248 L 538 230 L 412 222 Z',
    labelX: 498, labelY: 183,
  },

  // ── Row 3 (Lower-middle) ──
  {
    id: 'genteng',
    name: 'Genteng',
    color: '#78716c',
    path: 'M 28 235 L 155 225 L 175 318 L 45 330 Z',
    labelX: 100, labelY: 277,
  },
  {
    id: 'tunjang-timur',
    name: 'Tunjang Timur',
    color: '#0e7490',
    path: 'M 155 225 L 285 218 L 305 312 L 175 318 Z',
    labelX: 230, labelY: 268,
  },
  {
    id: 'sangkawati',
    name: 'Sangkawati',
    color: '#ea580c',
    path: 'M 285 218 L 412 222 L 432 318 L 305 312 Z',
    labelX: 359, labelY: 268,
  },
  {
    id: 'lombok-lauk',
    name: 'Lombok Lauk',
    color: '#7c3aed',
    path: 'M 412 222 L 538 230 L 582 248 L 555 328 L 432 318 Z',
    labelX: 504, labelY: 278,
  },

  // ── Row 4 (South, narrower) ──
  {
    id: 'tunjang-barat',
    name: 'Tunjang Barat',
    color: '#65a30d',
    path: 'M 45 330 L 175 318 L 210 415 L 70 405 Z',
    labelX: 125, labelY: 367,
  },
  {
    id: 'pagutan-selatan',
    name: 'Pagutan Selatan',
    color: '#047857',
    path: 'M 175 318 L 305 312 L 355 420 L 210 415 Z',
    labelX: 261, labelY: 366,
  },
  {
    id: 'gubuk-baru',
    name: 'Gubuk Baru',
    color: '#9333ea',
    path: 'M 305 312 L 432 318 L 555 328 L 565 388 L 500 410 L 355 420 Z',
    labelX: 452, labelY: 364,
  },
];

export default function DusunMapSection() {
  const [selectedDusun, setSelectedDusun] = useState<DusunData | null>(null);
  const [hoveredDusun, setHoveredDusun] = useState<string | null>(null);

  const handleClick = (dusun: DusunData) => {
    setSelectedDusun(prev => prev?.id === dusun.id ? null : dusun);
  };

  return (
    <section className="bg-white py-14 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg text-xs font-semibold mb-4">
            <MapPin className="w-3.5 h-3.5" /> Peta Wilayah Administratif
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Wilayah Dusun Desa Pagutan</h2>
          <p className="text-sm text-slate-500">Klik area dusun pada peta untuk melihat nama wilayahnya</p>
        </div>

        {/* Map Card */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-gradient-to-br from-emerald-50/40 via-white to-slate-50">
          {/* Selected dusun name overlay */}
          {selectedDusun && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-fadeIn">
              <div
                className="px-5 py-2.5 rounded-xl shadow-lg border border-white/50 backdrop-blur-md pointer-events-auto"
                style={{ backgroundColor: selectedDusun.color + 'e6' }}
              >
                <div className="text-white text-center whitespace-nowrap">
                  <div className="text-[9px] uppercase tracking-[0.15em] font-semibold opacity-80 mb-0.5">Dusun</div>
                  <div className="text-lg md:text-xl font-extrabold tracking-tight">{selectedDusun.name}</div>
                </div>
              </div>
            </div>
          )}

          {/* SVG Map */}
          <div className="px-3 pt-4 pb-2 md:px-6 md:pt-6 md:pb-3">
            <svg
              viewBox="0 0 610 445"
              className="w-full h-auto"
              style={{ maxHeight: '520px' }}
            >
              <defs>
                <filter id="glow-selected">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Geographic features — Kokok Mertawareng river */}
              <path
                d="M 20 190 C 80 195, 140 175, 220 180 C 300 185, 370 170, 430 178 C 480 183, 520 168, 590 175"
                fill="none"
                stroke="#93c5fd"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.35"
                strokeDasharray="6 4"
                className="pointer-events-none"
              />
              <text x="305" y="172" textAnchor="middle" style={{ fontSize: '5.5px', fill: '#93c5fd', fontWeight: 500, fontStyle: 'italic' }} className="pointer-events-none select-none">
                Kokok Mertawareng
              </text>

              {/* Jl. Pagutan road hint (north) */}
              <path
                d="M 10 28 C 100 15, 250 5, 420 10 C 500 12, 560 25, 600 42"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="3"
                strokeLinecap="round"
                className="pointer-events-none"
              />
              <text x="280" y="7" textAnchor="middle" style={{ fontSize: '5px', fill: '#cbd5e1', fontWeight: 600, letterSpacing: '0.5px' }} className="pointer-events-none select-none">
                Jl. Pagutan
              </text>

              {/* Jl. Pagutan-Mantang road hint (east) */}
              <path
                d="M 588 55 C 590 120, 588 200, 590 280 C 588 340, 575 380, 568 400"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="3"
                strokeLinecap="round"
                className="pointer-events-none"
              />

              {/* Dusun polygons */}
              {dusunData.map(dusun => {
                const isHovered = hoveredDusun === dusun.id;
                const isSelected = selectedDusun?.id === dusun.id;
                const isDimmed = selectedDusun !== null && !isSelected;

                return (
                  <g key={dusun.id}>
                    <path
                      d={dusun.path}
                      fill={dusun.color}
                      fillOpacity={isSelected ? 0.55 : isDimmed ? 0.08 : isHovered ? 0.32 : 0.16}
                      stroke={isSelected ? dusun.color : isHovered ? dusun.color : '#94a3b8'}
                      strokeWidth={isSelected ? 2.5 : isHovered ? 1.5 : 0.6}
                      strokeOpacity={isSelected ? 1 : isHovered ? 0.7 : 0.3}
                      strokeLinejoin="round"
                      className="cursor-pointer"
                      style={{
                        transition: 'fill-opacity 0.3s, stroke-width 0.2s, stroke-opacity 0.2s',
                        filter: isSelected ? 'url(#glow-selected)' : 'none',
                      }}
                      onClick={() => handleClick(dusun)}
                      onMouseEnter={() => setHoveredDusun(dusun.id)}
                      onMouseLeave={() => setHoveredDusun(null)}
                    />
                    {/* Label */}
                    <text
                      x={dusun.labelX}
                      y={dusun.labelY}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="pointer-events-none select-none"
                      style={{
                        fontSize: isSelected ? '11px' : '7px',
                        fontWeight: isSelected ? 900 : 600,
                        fill: isSelected ? '#fff' : isDimmed ? '#b0b8c4' : '#475569',
                        opacity: isDimmed && !isSelected ? 0.45 : 1,
                        transition: 'all 0.3s',
                        textShadow: isSelected ? `0 1px 6px ${dusun.color}90` : 'none',
                      }}
                    >
                      {dusun.name}
                    </text>
                  </g>
                );
              })}

              {/* Kantor Desa Pagutan marker (northeast, matching real location) */}
              <g className="pointer-events-none">
                <circle cx="440" cy="68" r="4" fill="#10b981" stroke="white" strokeWidth="1.8" />
                <circle cx="440" cy="68" r="4" fill="none" stroke="#10b981" strokeWidth="0.7" opacity="0.4">
                  <animate attributeName="r" from="5" to="13" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="440" y="56" textAnchor="middle" style={{ fontSize: '5.5px', fontWeight: 700, fill: '#10b981' }}>
                  ★ Kantor Desa
                </text>
              </g>
            </svg>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 md:px-8 py-3 bg-slate-50/80 border-t border-slate-200/60">
            <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Kantor Desa</span>
              <span className="text-slate-300">|</span>
              <span className="font-semibold text-slate-600">15 Dusun Administratif</span>
              <span className="text-slate-300">|</span>
              <span>Kec. Batukliang, Lombok Tengah</span>
            </div>
            <Link
              href="/webgis"
              className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 transition-colors group"
            >
              Lihat detail di Peta WebGIS
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
