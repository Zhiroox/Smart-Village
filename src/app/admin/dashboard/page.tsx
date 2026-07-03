'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getStoredApplications, updateApplicationStatus } from '@/lib/supabase';
import { AdministrativeApplication, ApplicationStatusType, NewsItem } from '@/lib/types';
import { mockNews, mockPotensi, mockGisLocations } from '@/lib/data/mockData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  ShieldCheck, 
  FileCheck2, 
  Newspaper, 
  MapPin, 
  ShoppingBag, 
  LogOut, 
  Clock, 
  Hourglass, 
  Plus,
  Edit,
  Trash2,
  Settings
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [appsList, setAppsList] = useState<AdministrativeApplication[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'news' | 'potensi' | 'webgis' | 'settings'>('overview');
  const [newsData, setNewsData] = useState<NewsItem[]>(mockNews);

  // Status Modal State
  const [selectedApp, setSelectedApp] = useState<AdministrativeApplication | null>(null);
  const [newStatus, setNewStatus] = useState<ApplicationStatusType>('Diproses');
  const [statusNotes, setStatusNotes] = useState('');

  useEffect(() => {
    setAppsList(getStoredApplications());
  }, []);

  const handleUpdateStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    updateApplicationStatus(selectedApp.id, newStatus, statusNotes);
    setAppsList(getStoredApplications());
    setSelectedApp(null);
    setStatusNotes('');
  };

  const handleLogout = () => {
    router.push('/admin/login');
  };

  // Recharts Chart Mock Data
  const chartMonthlyData = [
    { month: 'Jan', surat: 12 },
    { month: 'Feb', surat: 19 },
    { month: 'Mar', surat: 15 },
    { month: 'Apr', surat: 24 },
    { month: 'Mei', surat: 30 },
    { month: 'Jun', surat: 42 },
  ];

  const chartStatusData = [
    { name: 'Selesai', value: appsList.filter(a => a.status === 'Selesai').length || 1 },
    { name: 'Diproses', value: appsList.filter(a => a.status === 'Diproses').length || 1 },
    { name: 'Menunggu', value: appsList.filter(a => a.status === 'Menunggu').length || 1 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Sidebar Admin Navigation */}
      <aside className="w-full lg:w-64 bg-slate-900 text-slate-300 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-base">PANEL ADMIN</h2>
              <p className="text-[11px] text-emerald-400">Smart Village Pagutan</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-colors ${
                activeTab === 'overview' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <FileCheck2 className="w-4 h-4" /> Ikhtisar & Statistik
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold transition-colors ${
                activeTab === 'applications' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <span className="flex items-center gap-3"><Clock className="w-4 h-4" /> Permohonan Surat</span>
              <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full text-[10px]">
                {appsList.filter(a => a.status === 'Menunggu' || a.status === 'Diproses').length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-colors ${
                activeTab === 'news' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <Newspaper className="w-4 h-4" /> Kelola Berita Desa
            </button>

            <button
              onClick={() => setActiveTab('potensi')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-colors ${
                activeTab === 'potensi' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> Kelola Potensi UMKM
            </button>

            <button
              onClick={() => setActiveTab('webgis')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-colors ${
                activeTab === 'webgis' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <MapPin className="w-4 h-4" /> Marker WebGIS
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-colors ${
                activeTab === 'settings' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <Settings className="w-4 h-4" /> Pengaturan Sistem
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" /> Keluar dari Admin
          </button>
        </div>
      </aside>

      {/* Main Admin Body */}
      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto">
        {/* Top Welcome Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Dashboard Operator & Administrator</h1>
            <p className="text-xs text-slate-500">Pemerintahan Desa Pagutan • Kecamatan Batukliang</p>
          </div>
          <Link href="/" target="_blank" className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg">
            Lihat Website Publik ↗
          </Link>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
                <div className="text-xs font-bold uppercase text-slate-400 mb-1">Total Permohonan Surat</div>
                <div className="text-3xl font-extrabold text-slate-900">{appsList.length}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
                <div className="text-xs font-bold uppercase text-amber-500 mb-1">Menunggu Verifikasi</div>
                <div className="text-3xl font-extrabold text-amber-600">{appsList.filter(a => a.status === 'Menunggu').length}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
                <div className="text-xs font-bold uppercase text-blue-500 mb-1">Sedang Diproses</div>
                <div className="text-3xl font-extrabold text-blue-600">{appsList.filter(a => a.status === 'Diproses').length}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
                <div className="text-xs font-bold uppercase text-emerald-500 mb-1">Surat Selesai</div>
                <div className="text-3xl font-extrabold text-emerald-600">{appsList.filter(a => a.status === 'Selesai').length}</div>
              </div>
            </div>

            {/* Recharts Analytics Graphs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
                <h3 className="font-bold text-slate-900 text-sm mb-4">Grafik Pengajuan Surat Bulanan 2026</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartMonthlyData}>
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="surat" fill="#10b981" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
                <h3 className="font-bold text-slate-900 text-sm mb-4">Proporsi Status Berkas</h3>
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={chartStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                        {chartStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: APPLICATIONS MANAGER */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-lg">Daftar Permohonan Surat Masuk</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                    <th className="p-3">No. Resi</th>
                    <th className="p-3">Pemohon & NIK</th>
                    <th className="p-3">Jenis Surat</th>
                    <th className="p-3">Desa</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {appsList.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-slate-800">{app.applicationNumber}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{app.fullName}</div>
                        <div className="text-[11px] text-slate-400">NIK: {app.nik}</div>
                      </td>
                      <td className="p-3 text-slate-700 font-medium">{app.serviceType}</td>
                      <td className="p-3 text-slate-600">{app.village}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          app.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' :
                          app.status === 'Diproses' ? 'bg-indigo-100 text-indigo-800' :
                          app.status === 'Diverifikasi' ? 'bg-blue-100 text-blue-800' :
                          app.status === 'Ditolak' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => { setSelectedApp(app); setNewStatus(app.status); setStatusNotes(app.statusNotes || ''); }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-[11px]"
                        >
                          Ubah Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: NEWS MANAGER */}
        {activeTab === 'news' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-lg">Kelola Berita & Pengumuman Desa</h2>
              <button onClick={() => alert('Fitur Tambah Berita Baru (CRUD)')} className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Tambah Berita
              </button>
            </div>
            <div className="space-y-3">
              {newsData.map(n => (
                <div key={n.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs md:text-sm">{n.title}</h4>
                    <p className="text-[11px] text-slate-400">{n.village} • {n.category} • {n.publishedAt}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-slate-600 hover:text-emerald-600"><Edit className="w-4 h-4" /></button>
                    <button className="p-1.5 text-slate-600 hover:text-rose-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: POTENSI MANAGER */}
        {activeTab === 'potensi' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-lg">Kelola Potensi UMKM & Produk Desa</h2>
              <button onClick={() => alert('Fitur Tambah Potensi (CRUD)')} className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Tambah Potensi
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockPotensi.map(p => (
                <div key={p.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs md:text-sm">{p.name}</h4>
                    <p className="text-[11px] text-slate-400">{p.category} • {p.village}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-slate-600 hover:text-emerald-600"><Edit className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: WEBGIS MARKERS */}
        {activeTab === 'webgis' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-lg">Kelola Marker Titik Lokasi WebGIS</h2>
              <button onClick={() => alert('Tambah Titik Spasial Baru')} className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Tambah Lokasi
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {mockGisLocations.map(g => (
                <div key={g.id} className="py-3 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{g.name}</h4>
                    <p className="text-[11px] text-slate-400">{g.category} • Lat: {g.latitude}, Long: {g.longitude}</p>
                  </div>
                  <button className="p-1.5 text-slate-600 hover:text-emerald-600"><Edit className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 space-y-6">
            <h2 className="font-bold text-slate-900 text-lg">Pengaturan Sistem Smart Village</h2>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Platform</label>
                <input type="text" defaultValue="Smart Village Desa Pagutan" className="w-full max-w-md p-2 bg-slate-50 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Supabase API URL</label>
                <input type="text" defaultValue={process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'} className="w-full max-w-md p-2 bg-slate-50 border border-slate-300 rounded-lg" />
              </div>
              <button onClick={() => alert('Pengaturan tersimpan!')} className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg">Simpan Perubahan</button>
            </div>
          </div>
        )}
      </main>

      {/* Status Update Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6">
            <h3 className="font-bold text-slate-900 text-base">Ubah Status Resi {selectedApp.applicationNumber}</h3>
            <form onSubmit={handleUpdateStatusSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Status Baru</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                >
                  <option value="Menunggu">Menunggu Verifikasi</option>
                  <option value="Diverifikasi">Diverifikasi</option>
                  <option value="Diproses">Diproses Petugas</option>
                  <option value="Selesai">Selesai (Siap Diambil)</option>
                  <option value="Ditolak">Ditolak</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Catatan Tambahan untuk Warga</label>
                <textarea
                  rows={3}
                  placeholder="Contoh: Surat telah ditandatangani dan dapat diambil di loket..."
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs resize-none"
                ></textarea>
              </div>

              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setSelectedApp(null)} className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl">Batal</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
