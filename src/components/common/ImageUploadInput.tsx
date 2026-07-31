'use client';

import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, X, Image as ImageIcon, CheckCircle2, AlertCircle, FileImage } from 'lucide-react';

interface ImageUploadInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  fallbackCategory?: string;
  defaultCategoryImages?: Record<string, string>;
  helperText?: string;
}

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper utility: Compress & convert image file to compressed Base64 Data URL
  const processImageFile = (file: File) => {
    setErrorMsg('');
    
    // Validate file format (PNG, JPG, JPEG, WEBP)
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const isExtensionValid = /\.(png|jpg|jpeg|webp)$/i.test(file.name);

    if (!validTypes.includes(file.type.toLowerCase()) && !isExtensionValid) {
      setErrorMsg('Format file tidak didukung. Harap unggah gambar berformat PNG, JPG, JPEG, atau WEBP.');
      return;
    }

    // Limit original file size to 10MB before processing
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
        // Create canvas for image resizing and compression
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setErrorMsg('Gagal memproses canvas gambar.');
          setIsCompressing(false);
          return;
        }

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Determine output MIME type & compression
        const outputMime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const quality = outputMime === 'image/png' ? 0.9 : 0.82;

        const dataUrl = canvas.toDataURL(outputMime, quality);
        
        // Calculate file size in KB
        const sizeInKB = Math.round((dataUrl.length * (3 / 4)) / 1024);
        setFileSize(`${sizeInKB} KB`);
        
        onChange(dataUrl);
        setIsCompressing(false);
      };

      img.onerror = () => {
        setErrorMsg('Gagal membaca data gambar.');
        setIsCompressing(false);
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      setErrorMsg('Gagal mengunggah file gambar.');
      setIsCompressing(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processImageFile(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClearImage = () => {
    onChange('');
    setFileName('');
    setFileSize('');
    setErrorMsg('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Preview Image URL selection logic
  const previewUrl = value.trim() || (fallbackCategory && defaultCategoryImages?.[fallbackCategory]) || '';
  const isBase64 = value.startsWith('data:image/');

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-bold text-slate-800 flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-emerald-600" />
          {label}
        </label>

        {/* Tab Toggle: Unggah vs URL */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1 rounded-md font-semibold transition-all flex items-center gap-1 ${
              activeTab === 'upload'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-3 h-3" /> Unggah File PNG/JPG
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-3 py-1 rounded-md font-semibold transition-all flex items-center gap-1 ${
              activeTab === 'url'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LinkIcon className="w-3 h-3" /> Link URL
          </button>
        </div>
      </div>

      {helperText && (
        <p className="text-xs text-slate-500 leading-relaxed">{helperText}</p>
      )}

      {/* ERROR MESSAGE */}
      {errorMsg && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* UPLOAD FILE TAB */}
      {activeTab === 'upload' && (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg, image/webp"
            className="hidden"
          />

          {!value ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isCompressing
                  ? 'bg-emerald-50 border-emerald-400 animate-pulse'
                  : 'border-slate-300 hover:border-emerald-500 bg-slate-50/50 hover:bg-emerald-50/30'
              }`}
            >
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
                  <p className="text-xs font-bold text-slate-800">
                    Klik untuk memilih foto atau seret file ke sini
                  </p>
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
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs border border-slate-200 transition-colors"
                >
                  Ganti Foto
                </button>
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg transition-colors"
                  title="Hapus foto"
                >
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
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setFileName('');
                setFileSize('');
              }}
              className="w-full p-3 bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl text-sm focus:outline-none transition-colors pr-10"
            />
            {value && (
              <button
                type="button"
                onClick={handleClearImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-[11px] text-slate-400">
            Masukkan link gambar (https://...) langsung jika sudah ada di server eksternal.
          </p>
        </div>
      )}

      {/* PREVIEW BOX */}
      {previewUrl && (
        <div className="rounded-xl overflow-hidden border-2 border-slate-200 h-36 relative bg-slate-100 shadow-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Preview akhir"
            className="w-full h-full object-cover"
            onError={(e) => {
              if (fallbackCategory && defaultCategoryImages?.[fallbackCategory]) {
                (e.target as HTMLImageElement).src = defaultCategoryImages[fallbackCategory];
              }
            }}
          />
          <div className="absolute top-2 left-2 bg-slate-900/75 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-md font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Preview Gambar
          </div>
        </div>
      )}
    </div>
  );
}
