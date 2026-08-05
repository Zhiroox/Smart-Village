'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, Link as LinkIcon, X, Image as ImageIcon, CheckCircle2, AlertCircle, FileImage, Crop } from 'lucide-react';

interface ImageUploadInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  fallbackCategory?: string;
  defaultCategoryImages?: Record<string, string>;
  helperText?: string;
}

// ── Crop Modal ──────────────────────────────────────────────────────────────
interface CropBox { x: number; y: number; w: number; h: number }

function CropModal({
  src,
  onDone,
  onCancel,
}: {
  src: string;
  onDone: (croppedDataUrl: string) => void;
  onCancel: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [box, setBox] = useState<CropBox>({ x: 10, y: 10, w: 80, h: 80 }); // percent values
  const dragState = useRef<{ type: 'move' | 'resize'; startX: number; startY: number; startBox: CropBox } | null>(null);

  // Convert percent → pixel relative to displayed image
  const pxBox = useCallback((): CropBox | null => {
    const img = imgRef.current;
    if (!img) return null;
    const r = img.getBoundingClientRect();
    return {
      x: (box.x / 100) * r.width,
      y: (box.y / 100) * r.height,
      w: (box.w / 100) * r.width,
      h: (box.h / 100) * r.height,
    };
  }, [box]);

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const onMouseDown = (e: React.MouseEvent, type: 'move' | 'resize') => {
    e.preventDefault();
    e.stopPropagation();
    dragState.current = { type, startX: e.clientX, startY: e.clientY, startBox: { ...box } };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    const d = dragState.current;
    const img = imgRef.current;
    if (!d || !img) return;
    const r = img.getBoundingClientRect();
    const dx = ((e.clientX - d.startX) / r.width) * 100;
    const dy = ((e.clientY - d.startY) / r.height) * 100;

    if (d.type === 'move') {
      const nx = clamp(d.startBox.x + dx, 0, 100 - d.startBox.w);
      const ny = clamp(d.startBox.y + dy, 0, 100 - d.startBox.h);
      setBox({ ...d.startBox, x: nx, y: ny });
    } else {
      const nw = clamp(d.startBox.w + dx, 5, 100 - d.startBox.x);
      const nh = clamp(d.startBox.h + dy, 5, 100 - d.startBox.y);
      setBox({ ...d.startBox, w: nw, h: nh });
    }
  }, []);

  const onMouseUp = useCallback(() => {
    dragState.current = null;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  // Touch equivalents
  const onTouchStart = (e: React.TouchEvent, type: 'move' | 'resize') => {
    e.stopPropagation();
    const t = e.touches[0];
    dragState.current = { type, startX: t.clientX, startY: t.clientY, startBox: { ...box } };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const d = dragState.current;
    const img = imgRef.current;
    if (!d || !img) return;
    const t = e.touches[0];
    const r = img.getBoundingClientRect();
    const dx = ((t.clientX - d.startX) / r.width) * 100;
    const dy = ((t.clientY - d.startY) / r.height) * 100;
    if (d.type === 'move') {
      setBox({ ...d.startBox, x: clamp(d.startBox.x + dx, 0, 100 - d.startBox.w), y: clamp(d.startBox.y + dy, 0, 100 - d.startBox.h) });
    } else {
      setBox({ ...d.startBox, w: clamp(d.startBox.w + dx, 5, 100 - d.startBox.x), h: clamp(d.startBox.h + dy, 5, 100 - d.startBox.y) });
    }
  };

  const applyCrop = () => {
    const img = imgRef.current;
    if (!img) return;

    // Create a natural-size canvas for the crop
    const naturalW = img.naturalWidth;
    const naturalH = img.naturalHeight;
    const cx = (box.x / 100) * naturalW;
    const cy = (box.y / 100) * naturalH;
    const cw = (box.w / 100) * naturalW;
    const ch = (box.h / 100) * naturalH;

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(cw);
    canvas.height = Math.round(ch);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, cx, cy, cw, ch, 0, 0, cw, ch);
    onDone(canvas.toDataURL('image/jpeg', 0.85));
  };

  const px = pxBox();

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Crop className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-800 text-sm">Crop Foto</span>
          </div>
          <button onClick={onCancel} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Image area */}
        <div className="flex-1 overflow-auto p-4">
          <p className="text-xs text-slate-500 mb-3 text-center">
            Seret kotak untuk memindahkan area crop · Seret sudut kanan-bawah untuk mengubah ukuran
          </p>
          <div
            ref={containerRef}
            className="relative inline-block select-none w-full"
            onTouchMove={onTouchMove}
            onTouchEnd={() => { dragState.current = null; }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={src}
              alt="Crop preview"
              className="w-full rounded-xl block"
              draggable={false}
            />

            {/* Dark overlay outside crop */}
            {px && (
              <>
                <div className="absolute inset-0 bg-black/45 pointer-events-none rounded-xl" />
                {/* Crop cutout — clear box via outline trick */}
                <div
                  className="absolute border-2 border-white cursor-move"
                  style={{
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    width: `${box.w}%`,
                    height: `${box.h}%`,
                    boxShadow: '0 0 0 9999px rgba(0,0,0,0.45)',
                    borderRadius: '4px',
                  }}
                  onMouseDown={(e) => onMouseDown(e, 'move')}
                  onTouchStart={(e) => onTouchStart(e, 'move')}
                >
                  {/* Grid lines */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                    backgroundSize: '33.33% 33.33%',
                  }} />
                  {/* Resize handle */}
                  <div
                    className="absolute bottom-0 right-0 w-5 h-5 bg-white rounded-tl-lg cursor-se-resize flex items-center justify-center"
                    onMouseDown={(e) => { e.stopPropagation(); onMouseDown(e, 'resize'); }}
                    onTouchStart={(e) => { e.stopPropagation(); onTouchStart(e, 'resize'); }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10">
                      <path d="M2 8 L8 2 M5 8 L8 5 M8 8 L8 8" stroke="#475569" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  {/* Corner dots */}
                  {[['top-0 left-0', '-translate-x-1/2 -translate-y-1/2'],
                    ['top-0 right-0', 'translate-x-1/2 -translate-y-1/2'],
                    ['bottom-0 left-0', '-translate-x-1/2 translate-y-1/2']].map(([pos, tr]) => (
                    <div key={pos} className={`absolute ${pos} w-3 h-3 bg-white rounded-full border-2 border-emerald-500 pointer-events-none transform ${tr}`} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer buttons */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-slate-600 font-semibold text-sm bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Batal
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">
              {Math.round(box.w)}% × {Math.round(box.h)}%
            </span>
            <button
              onClick={applyCrop}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl flex items-center gap-2 transition-colors"
            >
              <Crop className="w-4 h-4" /> Terapkan Crop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function ImageUploadInput({
  value,
  onChange,
  label = 'Foto Utama (PNG / JPG)',
  fallbackCategory,
  defaultCategoryImages,
  helperText,
}: ImageUploadInputProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [isCompressing, setIsCompressing] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showCrop, setShowCrop] = useState(false);
  const [cropSrc, setCropSrc] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImageFile = (file: File) => {
    setErrorMsg('');
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const isExtensionValid = /\.(png|jpg|jpeg|webp)$/i.test(file.name);
    if (!validTypes.includes(file.type.toLowerCase()) && !isExtensionValid) {
      setErrorMsg('Format file tidak didukung. Harap unggah gambar berformat PNG, JPG, JPEG, atau WEBP.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Ukuran file terlalu besar! Maksimal 10MB.');
      return;
    }
    setIsCompressing(true);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) { height = Math.round((height * MAX_WIDTH) / width); width = MAX_WIDTH; }
        } else {
          if (height > MAX_HEIGHT) { width = Math.round((width * MAX_HEIGHT) / height); height = MAX_HEIGHT; }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { setErrorMsg('Gagal memproses canvas gambar.'); setIsCompressing(false); return; }
        ctx.drawImage(img, 0, 0, width, height);
        const outputMime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const quality = outputMime === 'image/png' ? 0.9 : 0.82;
        const dataUrl = canvas.toDataURL(outputMime, quality);
        const sizeInKB = Math.round((dataUrl.length * (3 / 4)) / 1024);
        setFileSize(`${sizeInKB} KB`);
        onChange(dataUrl);
        setIsCompressing(false);
      };
      img.onerror = () => { setErrorMsg('Gagal membaca data gambar.'); setIsCompressing(false); };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => { setErrorMsg('Gagal mengunggah file gambar.'); setIsCompressing(false); };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) processImageFile(files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) processImageFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); };

  const handleClearImage = () => {
    onChange('');
    setFileName('');
    setFileSize('');
    setErrorMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleOpenCrop = () => {
    const src = value.trim() || (fallbackCategory && defaultCategoryImages?.[fallbackCategory]) || '';
    if (!src) return;
    setCropSrc(src);
    setShowCrop(true);
  };

  const handleCropDone = (croppedDataUrl: string) => {
    onChange(croppedDataUrl);
    setFileSize('');
    setFileName(fileName || 'cropped');
    setShowCrop(false);
  };

  const previewUrl = value.trim() || (fallbackCategory && defaultCategoryImages?.[fallbackCategory]) || '';
  const isBase64 = value.startsWith('data:image/');

  return (
    <>
      {showCrop && (
        <CropModal
          src={cropSrc}
          onDone={handleCropDone}
          onCancel={() => setShowCrop(false)}
        />
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-emerald-600" />
            {label}
          </label>
          <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs">
            <button type="button" onClick={() => setActiveTab('upload')}
              className={`px-3 py-1 rounded-md font-semibold transition-all flex items-center gap-1 ${activeTab === 'upload' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
              <Upload className="w-3 h-3" /> Unggah File PNG/JPG
            </button>
            <button type="button" onClick={() => setActiveTab('url')}
              className={`px-3 py-1 rounded-md font-semibold transition-all flex items-center gap-1 ${activeTab === 'url' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
              <LinkIcon className="w-3 h-3" /> Link URL
            </button>
          </div>
        </div>

        {helperText && <p className="text-xs text-slate-500 leading-relaxed">{helperText}</p>}

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* UPLOAD FILE TAB */}
        {activeTab === 'upload' && (
          <div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg, image/webp" className="hidden" />
            {!value ? (
              <div onDrop={handleDrop} onDragOver={handleDragOver} onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${isCompressing ? 'bg-emerald-50 border-emerald-400 animate-pulse' : 'border-slate-300 hover:border-emerald-500 bg-slate-50/50 hover:bg-emerald-50/30'}`}>
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <Upload className="w-6 h-6" />
                </div>
                {isCompressing ? (
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-emerald-700">Memproses & Membaca Gambar...</p>
                    <p className="text-[11px] text-slate-500">Mengompresi format PNG/JPG agar cepat disimpan</p>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold text-slate-800">Klik untuk memilih foto atau seret file ke sini</p>
                    <div className="flex items-center justify-center gap-2 text-[11px]">
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">PNG</span>
                      <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-md">JPG / JPEG</span>
                      <span className="bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-md">WEBP</span>
                    </div>
                    <p className="text-[10px] text-slate-400 pt-1">Maksimal ukuran file: 10MB</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={value} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 text-xs">
                    <div className="font-bold text-slate-900 truncate flex items-center gap-1.5">
                      <FileImage className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{fileName || (isBase64 ? 'Gambar PNG/JPG Terunggah' : 'URL Gambar')}</span>
                    </div>
                    <div className="text-[11px] text-emerald-700 mt-0.5 flex items-center gap-2">
                      <span className="flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Siap Disimpan
                      </span>
                      {fileSize && <span className="text-slate-400">• {fileSize}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button type="button" onClick={handleOpenCrop}
                    className="px-3 py-1.5 bg-violet-50 hover:bg-violet-100 text-violet-700 font-semibold rounded-lg text-xs border border-violet-200 transition-colors flex items-center gap-1"
                    title="Crop foto">
                    <Crop className="w-3.5 h-3.5" /> Crop
                  </button>
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs border border-slate-200 transition-colors">
                    Ganti
                  </button>
                  <button type="button" onClick={handleClearImage}
                    className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg transition-colors" title="Hapus foto">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* INPUT URL TAB */}
        {activeTab === 'url' && (
          <div className="space-y-2">
            <div className="relative">
              <input type="url" placeholder="https://images.unsplash.com/..."
                value={value}
                onChange={(e) => { onChange(e.target.value); setFileName(''); setFileSize(''); }}
                className="w-full p-3 bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl text-sm focus:outline-none transition-colors pr-10"
              />
              {value && (
                <button type="button" onClick={handleClearImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-400">Masukkan link gambar (https://...) langsung jika sudah ada di server eksternal.</p>
          </div>
        )}

        {/* PREVIEW BOX */}
        {previewUrl && (
          <div className="rounded-xl overflow-hidden border-2 border-slate-200 h-36 relative bg-slate-100 shadow-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="Preview akhir" className="w-full h-full object-cover"
              onError={(e) => {
                if (fallbackCategory && defaultCategoryImages?.[fallbackCategory]) {
                  (e.target as HTMLImageElement).src = defaultCategoryImages[fallbackCategory];
                }
              }}
            />
            <div className="absolute top-2 left-2 bg-slate-900/75 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-md font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Preview Gambar
            </div>
            {/* Crop shortcut on preview */}
            {previewUrl && (
              <button type="button" onClick={handleOpenCrop}
                className="absolute top-2 right-2 bg-violet-600/90 hover:bg-violet-600 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-md font-bold flex items-center gap-1 transition-colors">
                <Crop className="w-3 h-3" /> Crop
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
