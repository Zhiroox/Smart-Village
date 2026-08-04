'use client';

import React, { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];          // All images (main + gallery combined)
  alt: string;
  className?: string;
}

export default function ImageCarousel({ images, alt, className = '' }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Filter out empty strings
  const slides = images.filter(Boolean);

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + slides.length) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  // Single image — no carousel UI needed
  if (slides.length === 0) {
    return (
      <div className={`relative h-72 md:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 ${className}`}>
        <div className="flex items-center justify-center h-full text-slate-300">
          <Images className="w-16 h-16" />
        </div>
      </div>
    );
  }

  if (slides.length === 1) {
    return (
      <div className={`relative h-72 md:h-96 w-full rounded-2xl overflow-hidden shadow-md ${className}`}>
        <Image src={slides[0]} alt={alt} fill className="object-cover" unoptimized />
      </div>
    );
  }

  return (
    <div className={`relative select-none ${className}`}>
      {/* Main slide */}
      <div
        className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden shadow-md bg-slate-100"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((src, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-400 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <Image src={src} alt={`${alt} — foto ${idx + 1}`} fill className="object-cover" unoptimized />
          </div>
        ))}

        {/* Gradient overlay for buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-20 pointer-events-none rounded-2xl" />

        {/* Prev button */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white rounded-full transition-all hover:scale-110 active:scale-95"
          aria-label="Foto sebelumnya"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next button */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white rounded-full transition-all hover:scale-110 active:scale-95"
          aria-label="Foto berikutnya"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Counter badge */}
        <div className="absolute top-3 right-3 z-30 bg-black/50 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <Images className="w-3 h-3" />
          {current + 1} / {slides.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      {slides.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
          {slides.map((src, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                idx === current
                  ? 'border-violet-500 shadow-md scale-105'
                  : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400'
              }`}
            >
              <Image src={src} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" unoptimized />
            </button>
          ))}
        </div>
      )}

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`transition-all rounded-full ${
              idx === current
                ? 'w-5 h-2 bg-violet-600'
                : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Pergi ke foto ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
