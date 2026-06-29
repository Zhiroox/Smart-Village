'use client';

import React, { useState, useEffect } from 'react';
import { getStoredApplications, saveApplication } from '@/lib/supabase';
import { AdministrativeApplication, ApplicationStatusType } from '@/lib/types';
import { 
  FileText, 
  Send, 
  Search, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Hourglass, 
  XCircle, 
  FileCheck2, 
  Building2, 
  FileSpreadsheet,
  Download,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { mockFaq, mockDownloads } from '@/lib/data/mockData';

export default function LayananPage() {
  const [activeTab, setActiveTab] = useState<'form' | 'status' | 'info' | 'faq' | 'downloads'>('form');
  const [appsList, setAppsList] = useState<AdministrativeApplication[]>([]);

  // Form State
  const [fullName, setFullName] = useState('');
  const [nik, setNik] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [village, setVillage] = useState<'Desa Pagutan' | 'Desa Bujak'>('Desa Pagutan');
  const [serviceType, setServiceType] = useState<AdministrativeApplication['serviceType']>('Surat Keterangan Usaha');
  const [address, setAddress] = useState('');
  const [purpose, setPurpose] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [submittedApp, setSubmittedApp] = useState<AdministrativeApplication | null>(null);

  // Status Search State
  const [searchCode, setSearchCode] = useState('');
  const [searchedAppResult, setSearchedAppResult] = useState<AdministrativeApplication | null | 'NOT_FOUND'>(null);

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
      village,
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

  const handleTrackStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    const current = getStoredApplications();
    const found = current.find(a => a.applicationNumber.toUpperCase() === searchCode.trim().toUpperCase());
    if (found) {
      setSearchedAppResult(found);
    } else {
      setSearchedAppResult('NOT_FOUND');
    }
  };

  const getStatusBadge = (status: ApplicationStatusType) => {
    switch (status) {
      case 'Menunggu':
        return <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5"><Hourglass className="w-3.5 h-3.5" /> Menunggu Verifikasi</span>;
      case 'Diverifikasi':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Diverifikasi</span>;
      case 'Diproses':
        return <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Sedang Diproses</span>;
      case 'Selesai':
        return <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5"><FileCheck2 className="w-3.5 h-3.5" /> Surat Selesai</span>;
      case 'Ditolak':
        return <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" /> Permohonan Ditolak</span>;
    }
  };

  return (
    <div className="py-10 space-y-10">
      {/* Banner Header */}
      <section className="bg-slate-900 text-white py-12 px-4 border-b-4 border-emerald-600">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold mb-3">
            <FileText className="w-3.5 h-3.5" /> Portal Pelayanan Administrasi Surat Online
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Layanan Mandiri Warga Desa</h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto mb-6">
            Permudah pengurusan surat keterangan secara mandiri dari rumah sebelum mengambil dokumen fisik di Kantor Desa Pagutan maupun Desa Bujak.
          </p>

          {/* Navigation Bar Pills */}
          <div className="bg-white/10 p-2 rounded-2xl backdrop-blur-md inline-flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                activeTab === 'form' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              Pengajuan Online
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                activeTab === 'status' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              Cek Status Resi
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                activeTab === 'info' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              Persyaratan & Jam Kerja
            </button>
            <button
              onClick={() => setActiveTab('downloads')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                activeTab === 'downloads' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              Download Form
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                activeTab === 'faq' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              FAQ
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Tab 1: Form Pengajuan Online */}
        {activeTab === 'form' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-soft space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Formulir Permohonan Surat Keterangan</h2>
              <p className="text-xs text-slate-500">Isi data identitas sesuai KTP/KK secara cermat dan valid.</p>
            </div>

            {submittedApp ? (
              <div className="bg-emerald-50 border-2 border-emerald-400 p-6 rounded-2xl text-center space-y-4 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Permohonan Surat Berhasil Dikirim!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Nomor permohonan resmi Anda adalah:
                </p>
                <div className="inline-block bg-slate-900 text-emerald-400 font-mono text-xl font-extrabold px-6 py-2.5 rounded-xl border border-emerald-500 shadow-md">
                  {submittedApp.applicationNumber}
                </div>
                <p className="text-[11px] text-slate-500">
                  Simpan nomor resi ini untuk mengecek progres verifikasi di menu <strong>Cek Status Resi</strong>.
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
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Pilih Asal Desa *</label>
                    <select
                      value={village}
                      onChange={(e) => setVillage(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-600 focus:bg-white"
                    >
                      <option value="Desa Pagutan">Desa Pagutan</option>
                      <option value="Desa Bujak">Desa Bujak</option>
                    </select>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Alamat Lengkap Dusun / RT / RW *</label>
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
                    placeholder="Jelaskan secara singkat untuk keperluan apa surat ini dibuat (contoh: Persyaratan pengajuan KUR Bank NTB Syariah)..."
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

        {/* Tab 2: Cek Status Resi */}
        {activeTab === 'status' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-soft space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Cek Status & Melacak Permohonan</h2>
              <p className="text-xs text-slate-500">Masukkan kode resi pendaftaran resmi (contoh: PGT-2026-0001 / BJK-2026-0002).</p>
            </div>

            <form onSubmit={handleTrackStatus} className="flex gap-3">
              <input
                type="text"
                placeholder="Masukkan Nomor Resi Permohonan..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:border-emerald-600 focus:bg-white uppercase"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Search className="w-4 h-4" /> Cari
              </button>
            </form>

            {/* Render Track Result */}
            {searchedAppResult === 'NOT_FOUND' && (
              <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center text-rose-700 text-xs">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-rose-500" />
                Nomor permohonan <strong>{searchCode}</strong> tidak ditemukan. Pastikan Anda memasukkan kode resi dengan benar.
              </div>
            )}

            {searchedAppResult && searchedAppResult !== 'NOT_FOUND' && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono">Nomor Resi: {searchedAppResult.applicationNumber}</div>
                    <h3 className="font-bold text-slate-900 text-lg">{searchedAppResult.serviceType}</h3>
                    <div className="text-xs text-slate-500">{searchedAppResult.fullName} • NIK: {searchedAppResult.nik}</div>
                  </div>
                  <div>{getStatusBadge(searchedAppResult.status)}</div>
                </div>

                {/* Timeline status progress */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Progres Verifikasi Surat</h4>
                  <div className="grid grid-cols-5 gap-2 text-center text-[11px]">
                    <div className={`p-2 rounded-lg border font-medium ${searchedAppResult.status === 'Menunggu' ? 'bg-amber-100 border-amber-300 font-bold' : 'bg-white border-slate-200'}`}>1. Menunggu</div>
                    <div className={`p-2 rounded-lg border font-medium ${searchedAppResult.status === 'Diverifikasi' ? 'bg-blue-100 border-blue-300 font-bold' : 'bg-white border-slate-200'}`}>2. Diverifikasi</div>
                    <div className={`p-2 rounded-lg border font-medium ${searchedAppResult.status === 'Diproses' ? 'bg-indigo-100 border-indigo-300 font-bold' : 'bg-white border-slate-200'}`}>3. Diproses</div>
                    <div className={`p-2 rounded-lg border font-medium ${searchedAppResult.status === 'Selesai' ? 'bg-emerald-100 border-emerald-300 font-bold text-emerald-800' : 'bg-white border-slate-200'}`}>4. Selesai</div>
                    <div className={`p-2 rounded-lg border font-medium ${searchedAppResult.status === 'Ditolak' ? 'bg-rose-100 border-rose-300 font-bold text-rose-800' : 'bg-white border-slate-200'}`}>Ditolak</div>
                  </div>
                </div>

                {searchedAppResult.statusNotes && (
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                    <strong>Catatan Petugas Desa:</strong> {searchedAppResult.statusNotes}
                  </div>
                )}
              </div>
            )}

            {/* Sample Recent Demo Submissions */}
            <div className="pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 mb-3">Contoh Resi Pendaftaran Aktif (Klik untuk Lacak Instant):</h4>
              <div className="flex flex-wrap gap-2">
                {appsList.slice(0, 3).map(a => (
                  <button
                    key={a.id}
                    onClick={() => { setSearchCode(a.applicationNumber); setSearchedAppResult(a); }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 text-xs font-mono rounded-lg border border-slate-200 transition-colors"
                  >
                    {a.applicationNumber} ({a.fullName.split(' ')[0]})
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Info & Persyaratan */}
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

        {/* Tab 4: Download Form */}
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

        {/* Tab 5: FAQ */}
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
