'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  getStoredApplications,
  updateApplicationStatus,
  getStoredNews,
  getAdminNews,
  saveNewsItem,
  updateNewsItem,
  deleteNewsItem,
} from '@/lib/supabase';
import { AdministrativeApplication, ApplicationStatusType, NewsItem } from '@/lib/types';
import { mockPotensi, mockGisLocations } from '@/lib/data/mockData';
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
  Plus,
  Edit,
  Trash2,
  Settings,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  AlertTriangle,
  Image as ImageIcon,
  FileText,
  Tag,
  Eye,
  User,
} from 'lucide-react';

// =============================================
// TIPE FORM WIZARD BERITA
// =============================================
type WizardStep = 1 | 2 | 3;
type NewsCategory = 'Pengumuman' | 'Pembangunan' | 'Kegiatan' | 'Ekonomi';
type NewsVillage = 'Desa Pagutan' | 'Desa Bujak';

interface NewsFormData {
  title: string;
  category: NewsCategory;
  village: NewsVillage;
  author: string;
  summary: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
}

const EMPTY_FORM: NewsFormData = {
  title: '',
  category: 'Pengumuman',
  village: 'Desa Pagutan',
  author: 'Admin Desa Pagutan',
  summary: '',
  content: '',
  imageUrl: '',
  publishedAt: new Date().toISOString().slice(0, 10),
};

// Foto placeholder berdasarkan kategori
const CATEGORY_IMAGES: Record<NewsCategory, string> = {
  Pengumuman: 'https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?auto=format&fit=crop&q=80&w=800',
  Pembangunan: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
  Kegiatan: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
  Ekonomi: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
};

// =============================================
// KOMPONEN UTAMA
// =============================================
export default function AdminDashboardPage() {
  const router = useRouter();
  const [appsList, setAppsList] = useState<AdministrativeApplication[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'news' | 'potensi' | 'webgis' | 'settings'>('overview');

  // STATE BERITA
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [adminNewsOnly, setAdminNewsOnly] = useState<NewsItem[]>([]);

  // WIZARD BERITA
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState<WizardStep>(1);
  const [formData, setFormData] = useState<NewsFormData>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // KONFIRMASI HAPUS
  const [deleteTarget, setDeleteTarget] = useState<NewsItem | null>(null);

  // STATUS MODAL
  const [selectedApp, setSelectedApp] = useState<AdministrativeApplication | null>(null);
  const [newStatus, setNewStatus] = useState<ApplicationStatusType>('Diproses');
  const [statusNotes, setStatusNotes] = useState('');

  useEffect(() => {
    setAppsList(getStoredApplications());
    refreshNews();
  }, []);

  const refreshNews = () => {
    setAllNews(getStoredNews());
    setAdminNewsOnly(getAdminNews());
  };

  // ----------------------
  // Handler Status Surat
  // ----------------------
  const handleUpdateStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;
    updateApplicationStatus(selectedApp.id, newStatus, statusNotes);
    setAppsList(getStoredApplications());
    setSelectedApp(null);
    setStatusNotes('');
  };

  const handleLogout = () => router.push('/admin/login');

  // ----------------------
  // Handler Wizard Berita
  // ----------------------
  const openAddWizard = () => {
    setFormData({ ...EMPTY_FORM, publishedAt: new Date().toISOString().slice(0, 10) });
    setEditingId(null);
    setWizardStep(1);
    setSaveSuccess(false);
    setShowWizard(true);
  };

  const openEditWizard = (item: NewsItem) => {
    setFormData({
      title: item.title,
      category: item.category,
      village: item.village,
      author: item.author,
      summary: item.summary,
      content: item.content,
      imageUrl: item.imageUrl,
      publishedAt: item.publishedAt,
    });
    setEditingId(item.id);
    setWizardStep(1);
    setSaveSuccess(false);
    setShowWizard(true);
  };

  const closeWizard = () => {
    setShowWizard(false);
    setEditingId(null);
    setSaveSuccess(false);
  };

  const handleSaveNews = () => {
    const finalImageUrl = formData.imageUrl.trim() || CATEGORY_IMAGES[formData.category];
    const payload = { ...formData, imageUrl: finalImageUrl };

    if (editingId) {
      updateNewsItem(editingId, payload);
    } else {
      saveNewsItem(payload);
    }
    setSaveSuccess(true);
    refreshNews();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteNewsItem(deleteTarget.id);
    setDeleteTarget(null);
    refreshNews();
  };

  // Validasi per step
  const step1Valid = formData.title.trim().length >= 5;
  const step2Valid = formData.summary.trim().length >= 10 && formData.content.trim().length >= 20;

  // ----------------------
  // Chart data
  // ----------------------
  const chartMonthlyData = [
    { month: 'Jan', surat: 12 }, { month: 'Feb', surat: 19 },
    { month: 'Mar', surat: 15 }, { month: 'Apr', surat: 24 },
    { month: 'Mei', surat: 30 }, { month: 'Jun', surat: 42 },
  ];
  const chartStatusData = [
    { name: 'Selesai', value: appsList.filter(a => a.status === 'Selesai').length || 1 },
    { name: 'Diproses', value: appsList.filter(a => a.status === 'Diproses').length || 1 },
    { name: 'Menunggu', value: appsList.filter(a => a.status === 'Menunggu').length || 1 },
  ];
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

  const categoryColors: Record<NewsCategory, string> = {
    Pengumuman: 'bg-blue-100 text-blue-800',
    Pembangunan: 'bg-orange-100 text-orange-800',
    Kegiatan: 'bg-purple-100 text-purple-800',
    Ekonomi: 'bg-emerald-100 text-emerald-800',
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">

      {/* ==================== SIDEBAR ==================== */}
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
            {[
              { key: 'overview', icon: <FileCheck2 className="w-4 h-4" />, label: 'Ikhtisar & Statistik' },
              { key: 'applications', icon: <Clock className="w-4 h-4" />, label: 'Permohonan Surat' },
              { key: 'news', icon: <Newspaper className="w-4 h-4" />, label: 'Kelola Berita Desa' },
              { key: 'potensi', icon: <ShoppingBag className="w-4 h-4" />, label: 'Kelola Potensi UMKM' },
              { key: 'webgis', icon: <MapPin className="w-4 h-4" />, label: 'Marker WebGIS' },
              { key: 'settings', icon: <Settings className="w-4 h-4" />, label: 'Pengaturan Sistem' },
            ].map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as typeof activeTab)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-colors ${
                  activeTab === key ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800 text-slate-400'
                }`}
              >
                {icon} {label}
                {key === 'applications' && (
                  <span className="ml-auto bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full text-[10px]">
                    {appsList.filter(a => a.status === 'Menunggu' || a.status === 'Diproses').length}
                  </span>
                )}
              </button>
            ))}
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

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto">
        {/* Welcome Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Dashboard Operator & Administrator</h1>
            <p className="text-xs text-slate-500">Pemerintahan Desa Pagutan • Kecamatan Batukliang</p>
          </div>
          <Link href="/" target="_blank" className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg">
            Lihat Website Publik ↗
          </Link>
        </div>

        {/* ============= TAB: OVERVIEW ============= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Permohonan Surat', value: appsList.length, color: 'text-slate-900', accent: 'text-slate-400' },
                { label: 'Menunggu Verifikasi', value: appsList.filter(a => a.status === 'Menunggu').length, color: 'text-amber-600', accent: 'text-amber-500' },
                { label: 'Sedang Diproses', value: appsList.filter(a => a.status === 'Diproses').length, color: 'text-blue-600', accent: 'text-blue-500' },
                { label: 'Surat Selesai', value: appsList.filter(a => a.status === 'Selesai').length, color: 'text-emerald-600', accent: 'text-emerald-500' },
              ].map(({ label, value, color, accent }) => (
                <div key={label} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className={`text-xs font-bold uppercase mb-1 ${accent}`}>{label}</div>
                  <div className={`text-3xl font-extrabold ${color}`}>{value}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
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
              <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-sm mb-4">Proporsi Status Berkas</h3>
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={chartStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                        {chartStatusData.map((_, index) => (
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

        {/* ============= TAB: APPLICATIONS ============= */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <h2 className="font-bold text-slate-900 text-lg">Daftar Permohonan Surat Masuk</h2>
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
                        }`}>{app.status}</span>
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

        {/* ============= TAB: NEWS MANAGER ============= */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            {/* Header + Tombol Tambah */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="font-bold text-slate-900 text-lg">Kelola Berita & Pengumuman Desa</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Total {allNews.length} berita ditampilkan di website publik ({adminNewsOnly.length} ditambahkan admin)
                  </p>
                </div>
                <button
                  onClick={openAddWizard}
                  className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                  ✏️ Tulis Berita Baru
                </button>
              </div>
            </div>

            {/* Panduan singkat */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <h3 className="font-bold text-emerald-800 text-sm mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" /> 📋 Cara Menambah Berita
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { step: '1', icon: '📝', title: 'Isi Judul & Kategori', desc: 'Tulis judul berita dan pilih jenis berita (Pengumuman, Kegiatan, dll)' },
                  { step: '2', icon: '📄', title: 'Tulis Isi Berita', desc: 'Tulis ringkasan singkat dan isi lengkap berita yang ingin disampaikan' },
                  { step: '3', icon: '✅', title: 'Simpan & Terbitkan', desc: 'Periksa kembali dan klik simpan. Berita langsung tampil di website!' },
                ].map(({ step, icon, title, desc }) => (
                  <div key={step} className="bg-white rounded-xl p-4 border border-emerald-100 flex gap-3">
                    <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">{step}</div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{icon} {title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Berita Admin (yang bisa diedit/hapus) */}
            {adminNewsOnly.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">📰 Berita yang Ditambahkan Admin ({adminNewsOnly.length})</h3>
                <div className="space-y-3">
                  {adminNewsOnly.map(n => (
                    <div key={n.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${categoryColors[n.category]}`}>{n.category}</span>
                          <span className="text-[10px] text-slate-400">{n.publishedAt} • {n.author}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm leading-snug">{n.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{n.summary}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => openEditWizard(n)}
                          className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold rounded-lg text-xs transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget(n)}
                          className="flex items-center gap-1.5 px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold rounded-lg text-xs transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Berita Default (mockData) - hanya lihat */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">📁 Berita Bawaan Sistem ({allNews.length - adminNewsOnly.length})</h3>
              <p className="text-xs text-slate-400">Berita berikut adalah data contoh dari sistem. Tidak dapat diedit melalui panel ini.</p>
              <div className="space-y-2">
                {allNews.filter(n => !n.id.startsWith('news-admin-')).map(n => (
                  <div key={n.id} className="p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold mr-2 ${categoryColors[n.category]}`}>{n.category}</span>
                      <span className="text-xs font-medium text-slate-700">{n.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-2">{n.publishedAt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============= TAB: POTENSI ============= */}
        {activeTab === 'potensi' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-lg">Kelola Potensi UMKM & Produk Desa</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockPotensi.map(p => (
                <div key={p.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs md:text-sm">{p.name}</h4>
                    <p className="text-[11px] text-slate-400">{p.category} • {p.village}</p>
                  </div>
                  <button className="p-1.5 text-slate-600 hover:text-emerald-600"><Edit className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============= TAB: WEBGIS ============= */}
        {activeTab === 'webgis' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <h2 className="font-bold text-slate-900 text-lg">Kelola Marker Titik Lokasi WebGIS</h2>
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

        {/* ============= TAB: SETTINGS ============= */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
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

      {/* ==================== MODAL: UBAH STATUS SURAT ==================== */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6">
            <h3 className="font-bold text-slate-900 text-base">Ubah Status Resi {selectedApp.applicationNumber}</h3>
            <form onSubmit={handleUpdateStatusSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Status Baru</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ApplicationStatusType)}
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
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setSelectedApp(null)} className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl">Batal</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL WIZARD: TAMBAH/EDIT BERITA ==================== */}
      {showWizard && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">

            {/* Header Modal */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">
                  {editingId ? '✏️ Edit Berita' : '📰 Tulis Berita Baru'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {saveSuccess ? 'Berita berhasil disimpan!' : `Langkah ${wizardStep} dari 3`}
                </p>
              </div>
              <button onClick={closeWizard} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Progress Bar */}
            {!saveSuccess && (
              <div className="px-6 pt-4">
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3].map(s => (
                    <React.Fragment key={s}>
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold border-2 transition-all ${
                        wizardStep > s ? 'bg-emerald-600 border-emerald-600 text-white' :
                        wizardStep === s ? 'border-emerald-600 text-emerald-600 bg-emerald-50' :
                        'border-slate-200 text-slate-400'
                      }`}>
                        {wizardStep > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                      </div>
                      {s < 3 && <div className={`flex-1 h-1 rounded-full transition-all ${wizardStep > s ? 'bg-emerald-600' : 'bg-slate-200'}`} />}
                    </React.Fragment>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 px-1">
                  <span>Judul & Kategori</span>
                  <span>Isi Berita</span>
                  <span>Preview & Simpan</span>
                </div>
              </div>
            )}

            {/* Body Form */}
            <div className="flex-1 overflow-y-auto p-6">

              {/* ====== SUKSES ====== */}
              {saveSuccess && (
                <div className="text-center py-8 space-y-4">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900">
                    {editingId ? 'Berita Berhasil Diperbarui! 🎉' : 'Berita Berhasil Disimpan! 🎉'}
                  </h4>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto">
                    Berita "<strong>{formData.title}</strong>" sudah tersimpan dan langsung tampil di halaman berita website desa.
                  </p>
                  <div className="flex gap-3 justify-center pt-2">
                    <button
                      onClick={closeWizard}
                      className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all"
                    >
                      Kembali ke Daftar Berita
                    </button>
                    <button
                      onClick={openAddWizard}
                      className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
                    >
                      Tambah Berita Lagi
                    </button>
                  </div>
                </div>
              )}

              {/* ====== STEP 1: JUDUL & KATEGORI ====== */}
              {!saveSuccess && wizardStep === 1 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                    <strong>📝 Langkah 1:</strong> Tulis judul berita, pilih kategori, dan isi nama penulis.
                  </div>

                  {/* Judul */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Judul Berita <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Contoh: Gotong Royong Pembersihan Saluran Irigasi Desa Pagutan..."
                      value={formData.title}
                      onChange={e => setFormData(f => ({ ...f, title: e.target.value }))}
                      className="w-full p-4 bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl text-sm resize-none focus:outline-none transition-colors"
                    />
                    {formData.title.length > 0 && formData.title.length < 5 && (
                      <p className="text-xs text-rose-500 mt-1">Judul terlalu pendek, minimal 5 karakter.</p>
                    )}
                  </div>

                  {/* Kategori */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-3">
                      <Tag className="inline w-4 h-4 mr-1" /> Pilih Kategori Berita <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['Pengumuman', 'Pembangunan', 'Kegiatan', 'Ekonomi'] as NewsCategory[]).map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setFormData(f => ({ ...f, category: cat }))}
                          className={`p-4 rounded-xl border-2 text-sm font-bold text-left transition-all ${
                            formData.category === cat
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <div className="text-2xl mb-1">
                            {cat === 'Pengumuman' ? '📢' : cat === 'Pembangunan' ? '🏗️' : cat === 'Kegiatan' ? '🎯' : '💼'}
                          </div>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Desa & Penulis */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">Desa</label>
                      <select
                        value={formData.village}
                        onChange={e => setFormData(f => ({ ...f, village: e.target.value as NewsVillage }))}
                        className="w-full p-3 bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl text-sm focus:outline-none"
                      >
                        <option value="Desa Pagutan">Desa Pagutan</option>
                        <option value="Desa Bujak">Desa Bujak</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        <User className="inline w-4 h-4 mr-1" /> Nama Penulis / Sumber
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Admin Desa Pagutan"
                        value={formData.author}
                        onChange={e => setFormData(f => ({ ...f, author: e.target.value }))}
                        className="w-full p-3 bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Tanggal */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">Tanggal Terbit</label>
                    <input
                      type="date"
                      value={formData.publishedAt}
                      onChange={e => setFormData(f => ({ ...f, publishedAt: e.target.value }))}
                      className="w-full md:w-auto p-3 bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* ====== STEP 2: ISI BERITA ====== */}
              {!saveSuccess && wizardStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                    <strong>📄 Langkah 2:</strong> Tulis ringkasan singkat (2–3 kalimat) dan isi lengkap berita.
                  </div>

                  {/* Ringkasan */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1">
                      Ringkasan Berita <span className="text-rose-500">*</span>
                    </label>
                    <p className="text-xs text-slate-400 mb-2">Deskripsi singkat yang muncul di daftar berita (2–3 kalimat)</p>
                    <textarea
                      rows={3}
                      placeholder="Contoh: Warga Desa Pagutan bersama aparat desa melaksanakan gotong royong membersihkan saluran irigasi yang tersumbat sebagai persiapan menghadapi musim hujan..."
                      value={formData.summary}
                      onChange={e => setFormData(f => ({ ...f, summary: e.target.value }))}
                      className="w-full p-4 bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl text-sm resize-none focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Isi Lengkap */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1">
                      Isi Lengkap Berita <span className="text-rose-500">*</span>
                    </label>
                    <p className="text-xs text-slate-400 mb-2">Ceritakan secara lengkap kejadian/kegiatan yang dilaporkan</p>
                    <textarea
                      rows={8}
                      placeholder="Tulis isi berita di sini secara lengkap...&#10;&#10;Contoh:&#10;Desa Pagutan, Batukliang — Pada hari Minggu, 20 Juli 2026, seluruh warga Desa Pagutan bersama perangkat desa menggelar kegiatan gotong royong...&#10;&#10;Kegiatan ini bertujuan untuk...&#10;&#10;Kepala Desa menyampaikan..."
                      value={formData.content}
                      onChange={e => setFormData(f => ({ ...f, content: e.target.value }))}
                      className="w-full p-4 bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl text-sm resize-none focus:outline-none transition-colors font-mono leading-relaxed"
                    />
                    <p className="text-xs text-slate-400 mt-1">{formData.content.length} karakter</p>
                  </div>
                </div>
              )}

              {/* ====== STEP 3: FOTO & PREVIEW ====== */}
              {!saveSuccess && wizardStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                    <strong>🖼️ Langkah 3:</strong> Tambahkan foto (opsional) dan periksa kembali sebelum simpan.
                  </div>

                  {/* Foto */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" /> URL Foto Berita (Opsional)
                    </label>
                    <p className="text-xs text-slate-400 mb-2">
                      Jika tidak diisi, foto akan dipilih otomatis sesuai kategori "{formData.category}".
                    </p>
                    <input
                      type="url"
                      placeholder="https://... (kosongkan untuk foto otomatis)"
                      value={formData.imageUrl}
                      onChange={e => setFormData(f => ({ ...f, imageUrl: e.target.value }))}
                      className="w-full p-3 bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl text-sm focus:outline-none"
                    />
                  </div>

                  {/* Preview Foto */}
                  <div className="rounded-xl overflow-hidden border-2 border-slate-200 h-40 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={formData.imageUrl.trim() || CATEGORY_IMAGES[formData.category]}
                      alt="preview"
                      className="w-full h-full object-cover"
                      onError={e => { (e.target as HTMLImageElement).src = CATEGORY_IMAGES[formData.category]; }}
                    />
                    <div className="absolute bottom-2 left-2 bg-emerald-600/90 text-white text-[11px] px-2 py-1 rounded-md font-bold">
                      {formData.category}
                    </div>
                  </div>

                  {/* Ringkasan Preview */}
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-bold text-slate-500 uppercase">Preview Berita</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base leading-snug">{formData.title || '—'}</h4>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>📅 {formData.publishedAt}</span>
                      <span>👤 {formData.author}</span>
                      <span>🏘️ {formData.village}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{formData.summary || '—'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Navigasi */}
            {!saveSuccess && (
              <div className="p-6 border-t border-slate-100 flex items-center justify-between gap-3">
                {wizardStep > 1 ? (
                  <button
                    onClick={() => setWizardStep(s => (s - 1) as WizardStep)}
                    className="flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" /> Kembali
                  </button>
                ) : (
                  <button onClick={closeWizard} className="px-4 py-3 bg-slate-100 text-slate-500 font-semibold rounded-xl">
                    Batal
                  </button>
                )}

                {wizardStep < 3 ? (
                  <button
                    onClick={() => setWizardStep(s => (s + 1) as WizardStep)}
                    disabled={wizardStep === 1 ? !step1Valid : !step2Valid}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-xl transition-all"
                  >
                    Selanjutnya <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSaveNews}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    {editingId ? 'Perbarui Berita' : '✅ Simpan & Terbitkan'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== MODAL: KONFIRMASI HAPUS ==================== */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5 text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-rose-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Hapus Berita Ini?</h3>
              <p className="text-sm text-slate-500 mt-2">
                Berita "<strong>{deleteTarget.title}</strong>" akan dihapus dan tidak bisa dikembalikan.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-all"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
