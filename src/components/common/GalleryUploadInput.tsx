'use client';

import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, X, Images, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';

interface GalleryUploadInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  label?: string;
  maxPhotos?: number;
}

export default function GalleryUploadInput({
  values,
  onChange,
  label = 'Galeri Foto Tambahan',
  maxPhotos = 8,
}: GalleryUploadInputProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImageFile = (file: File) => {
    setErrorMsg('');
    if (values.length >= maxPhotos) {
      setErrorMsg(`Maksimal ${maxPhotos} foto dalam galeri.`);
      return;
    }
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setErrorMsg('Format file tidak didukung. Gunakan PNG, JPG, atau WEBP.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Ukuran file terlalu besar! Maksimal 10MB.');
      return;
    }

    setIsCompressing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX = 1200;
        let { width, height } = img;
        if (width > height) {
          if (width > MAX) { height = Math.round((height * MAX) / width); width = MAX; }
        } else {
          if (height > MAX) { width = Math.round((width * MAX) / height); height = MAX; }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { setIsCompressing(false); return; }
        ctx.drawImage(img, 0, 0, width, height);
        const outputMime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(outputMime, 0.82);
        onChange([...values, dataUrl]);
        setIsCompressing(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      };
      img.onerror = () => { setErrorMsg('Gagal membaca gambar.'); setIsCompressing(false); };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => { setErrorMsg('Gagal membaca file.'); setIsCompressing(false); };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) processImageFile(files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) processImageFile(e.dataTransfer.files[0]);
  };

  const handleAddUrl = () => {
    const url = urlInput.trim();
    if (!url) return;
    if (values.length >= maxPhotos) { setErrorMsg(`Maksimal ${maxPhotos} foto.`); return; }
    if (!url.startsWith('http')) { setErrorMsg('URL tidak valid. Harus dimulai dengan https://'); return; }
    onChange([...values, url]);
    setUrlInput('');
    setErrorMsg('');
  };

  const handleRemove = (idx: number) => {
    onChange(values.filter((_, i) => i !== idx));
  };

  const atMax = values.length >= maxPhotos;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <label className="block text-sm font-bold text-slate-800 flex items-center gap-1.5">
          <Images className="w-4 h-4 text-violet-600" />
          {label}
          <span className="text-[11px] font-normal text-slate-400 ml-1">
            ({values.length}/{maxPhotos} foto)
          </span>
        </label>
        {/* Tab toggle */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1 rounded-md font-semibold transition-all flex items-center gap-1 ${activeTab === 'upload' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Upload className="w-3 h-3" /> Unggah
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-3 py-1 rounded-md font-semibold transition-all flex items-center gap-1 ${activeTab === 'url' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <LinkIcon className="w-3 h-3" /> URL
          </button>
        </div>
      </div>

      {/* Error */}
      {errorMsg && (
        <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Upload Tab */}
      {activeTab === 'upload' && !atMax && (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
          />
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
              isCompressing
                ? 'bg-violet-50 border-violet-400 animate-pulse'
                : 'border-slate-300 hover:border-violet-500 bg-slate-50/50 hover:bg-violet-50/20'
            }`}
          >
            <Upload className="w-6 h-6 text-violet-400 mx-auto mb-1.5" />
            {isCompressing ? (
              <p className="text-xs font-semibold text-violet-700">Memproses foto...</p>
            ) : (
              <>
                <p className="text-xs font-semibold text-slate-700">Klik atau seret foto ke sini</p>
                <p className="text-[10px] text-slate-400 mt-0.5">PNG · JPG · WEBP — Maks 10MB</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* URL Tab */}
      {activeTab === 'url' && !atMax && (
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://example.com/foto.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddUrl()}
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-violet-500 transition-colors"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            disabled={!urlInput.trim()}
            className="px-3 py-2 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-xl text-xs flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah
          </button>
        </div>
      )}

      {atMax && (
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl">
          ⚠️ Batas maksimal {maxPhotos} foto tercapai. Hapus salah satu untuk menambah foto baru.
        </p>
      )}

      {/* Thumbnail grid */}
      {values.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {values.map((url, idx) => (
            <div key={idx} className="relative group rounded-xl overflow-hidden border-2 border-slate-200 aspect-square bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
              {/* Overlay info */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="p-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors"
                  title="Hapus foto ini"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              {/* Index badge */}
              <div className="absolute top-1 left-1 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                {idx + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {values.length > 0 && (
        <p className="text-[11px] text-slate-400 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-violet-500" />
          {values.length} foto tersimpan dalam galeri · Hover thumbnail untuk hapus
        </p>
      )}
    </div>
  );
}
