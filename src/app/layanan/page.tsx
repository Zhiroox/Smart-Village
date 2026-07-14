'use client';

import React, { useState, useEffect } from 'react';
import { getStoredApplications, saveApplication } from '@/lib/supabase';
import { AdministrativeApplication } from '@/lib/types';
import { 
  FileText, 
  Send, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  FileCheck2, 
  FileSpreadsheet,
  Download,
  ShieldCheck
} from 'lucide-react';
import { mockFaq, mockDownloads } from '@/lib/data/mockData';

export default function LayananPage() {
  const [activeTab, setActiveTab] = useState<'form' | 'info' | 'faq' | 'downloads'>('form');
  const [appsList, setAppsList] = useState<AdministrativeApplication[]>([]);

  // Form State
  const [fullName, setFullName] = useState('');
  const [nik, setNik] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState<AdministrativeApplication['serviceType']>('Surat Keterangan Usaha');
  const [address, setAddress] = useState('');
  const [purpose, setPurpose] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [submittedApp, setSubmittedApp] = useState<AdministrativeApplication | null>(null);

  useEffect(() => {
    setAppsList(getStoredApplications());
  }, []);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !nik || !phoneNumber || !address || !purpose) {
      alert('Mohon lengkapi seluruh kolom formulir wajib.');
      return;
    }

    const created = saveApplication({
      fullName,
      nik,
      phoneNumber,
      email,
      village: 'Desa Pagutan',
      serviceType,
      address,
      purpose,
      additionalNotes,
      kkFileName: 'Scan_KK_Warga.pdf',
      ktpFileName: 'Scan_KTP_Warga.pdf'
    });

    setSubmittedApp(created);
    setAppsList(getStoredApplications());

    // Reset fields
    setFullName('');
    setNik('');
    setPhoneNumber('');
    setEmail('');
    setAddress('');
    setPurpose('');
    setAdditionalNotes('');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner Header */}
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white text-slate-800 border-b border-slate-200/80">
        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-semibold mb-5">
            <FileText className="w-3.5 h-3.5" /> Portal Pelayanan &amp; Pengaduan Mandiri
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Layanan &amp; Pengaduan{' '}<span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Warga Pagutan</span></h1>
          <p className="text-slate-650 text-sm md:text-base max-w-2xl mx-auto mb-8">
            Ajukan surat keterangan resmi, pantau status verifikasi, unduh blanko formulir, atau cek info persyaratan pelayanan Desa Pagutan.
          </p>

          {/* Navigation Bar Pills */}
          <div className="bg-slate-200/40 p-2.5 rounded-2xl inline-flex flex-wrap justify-center gap-2.5 border border-slate-200">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                activeTab === 'form' 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/10' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-400/80 shadow-sm'
              }`}
            >
              Pengajuan Surat Online
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                activeTab === 'info' 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/10' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-400/80 shadow-sm'
              }`}
            >
              Persyaratan
            </button>
            <button
              onClick={() => setActiveTab('downloads')}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                activeTab === 'downloads' 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/10' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-400/80 shadow-sm'
              }`}
            >
              Unduh Form
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                activeTab === 'faq' 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/10' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-400/80 shadow-sm'
              }`}
            >
              FAQ
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl py-10">
        {/* Tab 1: Form Pengajuan Online */}
        {activeTab === 'form' && (
          <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-6 md:p-10 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Formulir Permohonan Surat Keterangan</h2>
              <p className="text-xs text-slate-500">Isi data identitas sesuai KTP/KK secara cermat untuk verifikasi.</p>
            </div>

            {submittedApp ? (
              <div className="bg-emerald-50 border-2 border-emerald-200 p-6 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-800">Permohonan Surat Berhasil Dikirim!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Nomor permohonan resmi Anda adalah:
                </p>
                <div className="inline-block bg-slate-100 text-emerald-700 font-mono text-xl font-extrabold px-6 py-2.5 rounded-xl border border-emerald-200 shadow-sm">
                  {submittedApp.applicationNumber}
                </div>
                <p className="text-[11px] text-slate-500">
                  Simpan nomor resi ini untuk keperluan administrasi lebih lanjut.
                </p>
                <button
                  onClick={() => setSubmittedApp(null)}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  Buat Permohonan Baru
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitForm} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Wilayah Desa</label>
                    <input
                      type="text"
                      disabled
                      value="Desa Pagutan (Batukliang)"
                      className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Jenis Surat Keterangan *</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-600 focus:bg-white"
                    >
                      <option value="Surat Keterangan Usaha">Surat Keterangan Usaha (SKU)</option>
                      <option value="Surat Keterangan Domisili">Surat Keterangan Domisili</option>
                      <option value="Surat Keterangan Tidak Mampu (SKTM)">Surat Keterangan Tidak Mampu (SKTM)</option>
                      <option value="Rekomendasi Nikah">Rekomendasi Nikah</option>
                      <option value="Surat Keterangan Pindah">Surat Keterangan Pindah</option>
                      <option value="Surat Keterangan Umum">Surat Keterangan Umum</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nama Lengkap (Sesuai KTP) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Lalu Muhamad Supriadi"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nomor Induk Kependudukan (NIK) *</label>
                    <input
                      type="text"
                      required
                      maxLength={16}
                      placeholder="16 Digit NIK KTP"
                      value={nik}
                      onChange={(e) => setNik(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nomor WhatsApp / HP *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081912345678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email (Opsional)</label>
                    <input
                      type="email"
                      placeholder="nama@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Alamat Dusun / RT / RW *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dusun Pagutan Dayah RT 02 / RW 01"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tujuan & Keperluan Surat *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Jelaskan secara singkat tujuan permohonan berkas (contoh: Persyaratan pengajuan kredit modal usaha)..."
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white resize-none"
                  ></textarea>
                </div>

                {/* Upload Dokumen */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Lampirkan Scan / Foto KTP</label>
                    <input type="file" accept="image/*,.pdf" className="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Lampirkan Scan / Foto KK</label>
                    <input type="file" accept="image/*,.pdf" className="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Kirim Permohonan Surat
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Info & Persyaratan */}
        {activeTab === 'info' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-soft space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Informasi Jam Pelayanan & Syarat Berkas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <Clock className="w-5 h-5" /> Jam Operasional Loket Pelayanan
                </div>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li><strong>Senin - Kamis:</strong> 08:00 - 15:30 WITA</li>
                  <li><strong>Jumat:</strong> 08:00 - 11:30 WITA (Istirahat Shalat Jumat)</li>
                  <li><strong>Sabtu - Minggu / Hari Libur:</strong> Tutup</li>
                </ul>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" /> Syarat Berkas Umum
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Fotokopi Kartu Tanda Penduduk (KTP) Pemohon</li>
                  <li>Fotokopi Kartu Keluarga (KK) yang Masih Berlaku</li>
                  <li>Surat Pengantar dari Ketua RT / Kepala Dusun setempat</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Download Form */}
        {activeTab === 'downloads' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-soft space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Unduh Formulir Berkas Pelayanan</h2>
            <div className="divide-y divide-slate-100">
              {mockDownloads.map(dl => (
                <div key={dl.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900 text-xs md:text-sm">{dl.title}</h4>
                      <div className="text-[11px] text-slate-400">Ukuran: {dl.fileSize} • Uploaded: {dl.uploadedAt}</div>
                    </div>
                  </div>
                  <button onClick={() => alert(`Unduh formulir: ${dl.title}`)} className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 text-xs font-semibold rounded-lg flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: FAQ */}
        {activeTab === 'faq' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-soft space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Pertanyaan yang Sering Diajukan (FAQ)</h2>
            <div className="space-y-4">
              {mockFaq.map(faq => (
                <div key={faq.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs md:text-sm flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    {faq.question}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


