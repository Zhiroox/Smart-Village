'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  getStoredNews,
  getAdminNews,
  saveNewsItem,
  updateNewsItem,
  deleteNewsItem,
} from '@/lib/supabase';
import { NewsItem, PotensiItem, GisLocation } from '@/lib/types';
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
  Save,
  Navigation,
} from 'lucide-react';
import { mockPotensi, mockGisLocations } from '@/lib/data/mockData';

// =============================================
// TIPE FORM WIZARD BERITA
// =============================================
type WizardStep = 1 | 2 | 3;
type NewsCategory = 'Pengumuman' | 'Pembangunan' | 'Kegiatan' | 'Ekonomi';
type NewsVillage = 'Desa Pagutan' | 'Desa Bujak';
type PotensiCategory = 'Agriculture' | 'Livestock' | 'UMKM' | 'Tourism';

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

interface PotensiFormData {
  id: string;
  name: string;
  category: PotensiCategory;
  village: NewsVillage;
  description: string;
  location: string;
  imageUrl: string;
  contactPerson: string;
  priceOrYield: string;
}

interface GisFormData {
  id: string;
  name: string;
  category: GisLocation['category'];
  village: NewsVillage;
  latitude: string;
  longitude: string;
  description: string;
  address: string;
  imageUrl: string;
}

const EMPTY_NEWS_FORM: NewsFormData = {
  title: '',
  category: 'Pengumuman',
  village: 'Desa Pagutan',
  author: 'Admin Desa Pagutan',
  summary: '',
  content: '',
  imageUrl: '',
  publishedAt: new Date().toISOString().slice(0, 10),
};

const EMPTY_POTENSI_FORM: PotensiFormData = {
  id: '',
  name: '',
  category: 'UMKM',
  village: 'Desa Pagutan',
  description: '',
  location: '',
  imageUrl: '',
  contactPerson: '',
  priceOrYield: '',
};

const EMPTY_GIS_FORM: GisFormData = {
  id: '',
  name: '',
  category: 'Kantor Desa',
  village: 'Desa Pagutan',
  latitude: '',
  longitude: '',
  description: '',
  address: '',
  imageUrl: '',
};

const CATEGORY_IMAGES: Record<NewsCategory, string> = {
  Pengumuman: 'https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?auto=format&fit=crop&q=80&w=800',
  Pembangunan: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
  Kegiatan: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
  Ekonomi: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
};

const GIS_CATEGORIES: GisLocation['category'][] = [
  'Batas Desa', 'Batas Dusun', 'Kantor Desa', 'Sekolah', 'Masjid',
  'Puskesmas', 'Wisata', 'Pertanian', 'Peternakan', 'Area Rawan Bencana', 'Rute Evakuasi'
];

const POTENSI_CATEGORIES: { value: PotensiCategory; label: string; emoji: string }[] = [
  { value: 'UMKM', label: 'UMKM', emoji: '🛍️' },
  { value: 'Agriculture', label: 'Pertanian', emoji: '🌾' },
  { value: 'Livestock', label: 'Peternakan', emoji: '🐄' },
  { value: 'Tourism', label: 'Ekowisata', emoji: '🏝️' },
];

// =============================================
// HOOK: Local state storage untuk Potensi & GIS
// =============================================
function usePotensiData() {
  const [items, setItems] = useState<PotensiItem[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem('admin_potensi');
    if (stored) {
      setItems(JSON.parse(stored));
    } else {
      setItems(mockPotensi);
    }
  }, []);

  const save = (newItems: PotensiItem[]) => {
    setItems(newItems);
    localStorage.setItem('admin_potensi', JSON.stringify(newItems));
  };

  const addItem = (form: PotensiFormData) => {
    const newItem: PotensiItem = {
      id: `potensi-${Date.now()}`,
      name: form.name,
      category: form.category,
      village: form.village,
      description: form.description,
      location: form.location,
      imageUrl: form.imageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
      gallery: [],
      contactPerson: form.contactPerson,
      priceOrYield: form.priceOrYield,
    };
    save([...items, newItem]);
  };

  const updateItem = (id: string, form: PotensiFormData) => {
    save(items.map(i => i.id === id ? {
      ...i,
      name: form.name,
      category: form.category,
      village: form.village,
      description: form.description,
      location: form.location,
      imageUrl: form.imageUrl || i.imageUrl,
      contactPerson: form.contactPerson,
      priceOrYield: form.priceOrYield,
    } : i));
  };

  const deleteItem = (id: string) => {
    save(items.filter(i => i.id !== id));
  };

  return { items, addItem, updateItem, deleteItem };
}

function useGisData() {
  const [items, setItems] = useState<GisLocation[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem('admin_gis');
    if (stored) {
      setItems(JSON.parse(stored));
    } else {
      setItems(mockGisLocations);
    }
  }, []);

  const save = (newItems: GisLocation[]) => {
    setItems(newItems);
    localStorage.setItem('admin_gis', JSON.stringify(newItems));
  };

  const addItem = (form: GisFormData) => {
    const newItem: GisLocation = {
      id: `gis-${Date.now()}`,
      name: form.name,
      category: form.category,
      village: form.village,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
      description: form.description,
      address: form.address,
      imageUrl: form.imageUrl,
    };
    save([...items, newItem]);
  };

  const updateItem = (id: string, form: GisFormData) => {
    save(items.map(i => i.id === id ? {
      ...i,
      name: form.name,
      category: form.category,
      village: form.village,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
      description: form.description,
      address: form.address,
      imageUrl: form.imageUrl,
    } : i));
  };

  const deleteItem = (id: string) => {
    save(items.filter(i => i.id !== id));
  };

  return { items, addItem, updateItem, deleteItem };
}

// =============================================
// KOMPONEN UTAMA
// =============================================
export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'news' | 'potensi' | 'webgis' | 'settings'>('overview');

  // STATE BERITA
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [adminNewsOnly, setAdminNewsOnly] = useState<NewsItem[]>([]);

  // WIZARD BERITA
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState<WizardStep>(1);
  const [formData, setFormData] = useState<NewsFormData>(EMPTY_NEWS_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<NewsItem | null>(null);

  // STATE POTENSI
  const potensi = usePotensiData();
  const [showPotensiModal, setShowPotensiModal] = useState(false);
  const [potensiForm, setPotensiForm] = useState<PotensiFormData>(EMPTY_POTENSI_FORM);
  const [editingPotensiId, setEditingPotensiId] = useState<string | null>(null);
  const [deletePotensiTarget, setDeletePotensiTarget] = useState<PotensiItem | null>(null);
  const [potensiSaved, setPotensiSaved] = useState(false);

  // STATE GIS
  const gis = useGisData();
  const [showGisModal, setShowGisModal] = useState(false);
  const [gisForm, setGisForm] = useState<GisFormData>(EMPTY_GIS_FORM);
  const [editingGisId, setEditingGisId] = useState<string | null>(null);
  const [deleteGisTarget, setDeleteGisTarget] = useState<GisLocation | null>(null);
  const [gisSaved, setGisSaved] = useState(false);

  useEffect(() => {
    refreshNews();
  }, []);

  const refreshNews = () => {
    setAllNews(getStoredNews());
    setAdminNewsOnly(getAdminNews());
  };

  const handleLogout = () => router.push('/admin/login');

  // ----------------------
  // Handler Wizard Berita
  // ----------------------
  const openAddWizard = () => {
    setFormData({ ...EMPTY_NEWS_FORM, publishedAt: new Date().toISOString().slice(0, 10) });
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

  const step1Valid = formData.title.trim().length >= 5;
  const step2Valid = formData.summary.trim().length >= 10 && formData.content.trim().length >= 20;

  // ----------------------
  // Handler Potensi CRUD
  // ----------------------
  const openAddPotensi = () => {
    setPotensiForm(EMPTY_POTENSI_FORM);
    setEditingPotensiId(null);
    setPotensiSaved(false);
    setShowPotensiModal(true);
  };

  const openEditPotensi = (item: PotensiItem) => {
    setPotensiForm({
      id: item.id,
      name: item.name,
      category: item.category,
      village: item.village,
      description: item.description,
      location: item.location,
      imageUrl: item.imageUrl,
      contactPerson: item.contactPerson || '',
      priceOrYield: item.priceOrYield || '',
    });
    setEditingPotensiId(item.id);
    setPotensiSaved(false);
    setShowPotensiModal(true);
  };

  const handleSavePotensi = () => {
    if (!potensiForm.name.trim() || !potensiForm.description.trim() || !potensiForm.location.trim()) return;
    if (editingPotensiId) {
      potensi.updateItem(editingPotensiId, potensiForm);
    } else {
      potensi.addItem(potensiForm);
    }
    setPotensiSaved(true);
  };

  const closePotensiModal = () => {
    setShowPotensiModal(false);
    setEditingPotensiId(null);
    setPotensiSaved(false);
  };

  // ----------------------
  // Handler GIS CRUD
  // ----------------------
  const openAddGis = () => {
    setGisForm(EMPTY_GIS_FORM);
    setEditingGisId(null);
    setGisSaved(false);
    setShowGisModal(true);
  };

  const openEditGis = (item: GisLocation) => {
    setGisForm({
      id: item.id,
      name: item.name,
      category: item.category,
      village: item.village,
      latitude: String(item.latitude),
      longitude: String(item.longitude),
      description: item.description,
      address: item.address,
      imageUrl: item.imageUrl || '',
    });
    setEditingGisId(item.id);
    setGisSaved(false);
    setShowGisModal(true);
  };

  const handleSaveGis = () => {
    if (!gisForm.name.trim() || !gisForm.latitude.trim() || !gisForm.longitude.trim()) return;
    if (editingGisId) {
      gis.updateItem(editingGisId, gisForm);
    } else {
      gis.addItem(gisForm);
    }
    setGisSaved(true);
  };

  const closeGisModal = () => {
    setShowGisModal(false);
    setEditingGisId(null);
    setGisSaved(false);
  };

  // Chart data (overview)
  const chartMonthlyData = [
    { month: 'Jan', data: 12 }, { month: 'Feb', data: 19 },
    { month: 'Mar', data: 15 }, { month: 'Apr', data: 24 },
    { month: 'Mei', data: 30 }, { month: 'Jun', data: 42 },
  ];
  const chartCatData = [
    { name: 'UMKM', value: potensi.items.filter(p => p.category === 'UMKM').length || 1 },
    { name: 'Pertanian', value: potensi.items.filter(p => p.category === 'Agriculture').length || 1 },
    { name: 'Wisata', value: potensi.items.filter(p => p.category === 'Tourism').length || 1 },
    { name: 'Peternakan', value: potensi.items.filter(p => p.category === 'Livestock').length || 1 },
  ];
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'];

  const categoryColors: Record<NewsCategory, string> = {
    Pengumuman: 'bg-blue-100 text-blue-800',
    Pembangunan: 'bg-orange-100 text-orange-800',
    Kegiatan: 'bg-purple-100 text-purple-800',
    Ekonomi: 'bg-emerald-100 text-emerald-800',
  };

  const inputClass = "w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all";
  const labelClass = "block text-xs font-semibold text-slate-700 mb-1.5";

  // Category colors for GIS
  const gisCategoryColor: Record<string, string> = {
    'Kantor Desa': 'bg-emerald-100 text-emerald-800',
    'Sekolah': 'bg-blue-100 text-blue-800',
    'Masjid': 'bg-purple-100 text-purple-800',
    'Puskesmas': 'bg-rose-100 text-rose-800',
    'Wisata': 'bg-amber-100 text-amber-800',
    'Pertanian': 'bg-green-100 text-green-800',
    'Peternakan': 'bg-orange-100 text-orange-800',
    'Area Rawan Bencana': 'bg-red-100 text-red-800',
    'Rute Evakuasi': 'bg-yellow-100 text-yellow-800',
    'Batas Desa': 'bg-slate-100 text-slate-700',
    'Batas Dusun': 'bg-slate-100 text-slate-600',
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
          <Link href="/" target="_blank" className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors">
            Lihat Website Publik ↗
          </Link>
        </div>

        {/* ============= TAB: OVERVIEW ============= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">

            {/* ---- Stat Cards ---- */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: 'Total Berita',
                  value: allNews.length,
                  sub: `${adminNewsOnly.length} ditambahkan admin`,
                  color: 'text-slate-900',
                  accent: 'bg-slate-100 text-slate-500',
                  border: 'border-slate-200',
                  icon: '📰',
                },
                {
                  label: 'Potensi UMKM',
                  value: potensi.items.length,
                  sub: `${potensi.items.filter(p => p.category === 'UMKM').length} UMKM · ${potensi.items.filter(p => p.category === 'Agriculture').length} Pertanian`,
                  color: 'text-emerald-700',
                  accent: 'bg-emerald-50 text-emerald-600',
                  border: 'border-emerald-200',
                  icon: '🛍️',
                },
                {
                  label: 'Marker WebGIS',
                  value: gis.items.length,
                  sub: `${[...new Set(gis.items.map(g => g.category))].length} kategori lokasi`,
                  color: 'text-blue-700',
                  accent: 'bg-blue-50 text-blue-600',
                  border: 'border-blue-200',
                  icon: '📍',
                },
                {
                  label: 'Berita Admin',
                  value: adminNewsOnly.length,
                  sub: `dari ${allNews.length} total berita`,
                  color: 'text-purple-700',
                  accent: 'bg-purple-50 text-purple-600',
                  border: 'border-purple-200',
                  icon: '✍️',
                },
              ].map(({ label, value, sub, color, accent, border, icon }) => (
                <div key={label} className={`bg-white p-5 rounded-2xl border ${border} shadow-sm`}>
                  <div className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase px-2 py-1 rounded-lg mb-3 ${accent}`}>
                    <span>{icon}</span> {label}
                  </div>
                  <div className={`text-3xl font-extrabold ${color} mb-1`}>{value}</div>
                  <div className="text-[11px] text-slate-400">{sub}</div>
                </div>
              ))}
            </div>


            {/* ---- Charts Row ---- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Bar Chart: Berita per Kategori */}
              <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Sebaran Berita per Kategori</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Jumlah berita berdasarkan jenis konten</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">{allNews.length} total</span>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { label: 'Pengumuman', jumlah: allNews.filter(n => n.category === 'Pengumuman').length },
                      { label: 'Pembangunan', jumlah: allNews.filter(n => n.category === 'Pembangunan').length },
                      { label: 'Kegiatan',    jumlah: allNews.filter(n => n.category === 'Kegiatan').length },
                      { label: 'Ekonomi',     jumlah: allNews.filter(n => n.category === 'Ekonomi').length },
                    ]} barCategoryGap="30%">
                      <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} allowDecimals={false} />
                      <Tooltip formatter={(v: number) => [`${v} berita`, 'Jumlah']} />
                      <Bar dataKey="jumlah" radius={[6, 6, 0, 0]}>
                        {[
                          <Cell key="0" fill="#3b82f6" />,
                          <Cell key="1" fill="#f97316" />,
                          <Cell key="2" fill="#8b5cf6" />,
                          <Cell key="3" fill="#10b981" />,
                        ]}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                {/* Legend */}
                <div className="flex flex-wrap gap-3 mt-3 justify-center">
                  {[
                    { label: 'Pengumuman', color: '#3b82f6' },
                    { label: 'Pembangunan', color: '#f97316' },
                    { label: 'Kegiatan', color: '#8b5cf6' },
                    { label: 'Ekonomi', color: '#10b981' },
                  ].map(l => (
                    <span key={l.label} className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                      {l.label} ({allNews.filter(n => n.category === l.label).length})
                    </span>
                  ))}
                </div>
              </div>

              {/* Pie Chart: Potensi per Kategori */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="mb-5">
                  <h3 className="font-bold text-slate-900 text-sm">Sebaran Potensi UMKM</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Distribusi per kategori produk desa</p>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartCatData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={75}
                        dataKey="value"
                        paddingAngle={3}
                      >
                        {chartCatData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: number) => [`${v} item`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {chartCatData.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-2 text-[11px]">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                      <span className="text-slate-600 truncate">{d.name}</span>
                      <span className="ml-auto font-bold text-slate-900">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ---- Bottom Row: Recent News + GIS Summary ---- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Berita Terbaru */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 text-sm">📰 Berita Terbaru</h3>
                  <button onClick={() => setActiveTab('news')} className="text-xs font-semibold text-emerald-600 hover:text-emerald-500 transition-colors">
                    Kelola Berita →
                  </button>
                </div>
                <div className="space-y-3">
                  {allNews.slice(0, 5).map(n => (
                    <div key={n.id} className="flex items-start gap-3">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 mt-0.5 ${categoryColors[n.category]}`}>
                        {n.category}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-800 leading-snug line-clamp-1">{n.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{n.publishedAt} · {n.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* GIS Marker Summary */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 text-sm">📍 Ringkasan Marker WebGIS</h3>
                  <button onClick={() => setActiveTab('webgis')} className="text-xs font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                    Kelola Marker →
                  </button>
                </div>
                <div className="space-y-2">
                  {GIS_CATEGORIES.map(cat => {
                    const count = gis.items.filter(g => g.category === cat).length;
                    if (count === 0) return null;
                    return (
                      <div key={cat} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${gisCategoryColor[cat]?.split(' ')[0] || 'bg-slate-300'}`} />
                          <span className="text-xs text-slate-600">{cat}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${Math.min((count / gis.items.length) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-700 w-4 text-right">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ============= TAB: NEWS MANAGER ============= */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="font-bold text-slate-900 text-lg">Kelola Berita & Pengumuman Desa</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Total {allNews.length} berita ditampilkan ({adminNewsOnly.length} ditambahkan admin)
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

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <h3 className="font-bold text-emerald-800 text-sm mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" /> 📋 Cara Menambah Berita
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { step: '1', icon: '📝', title: 'Isi Judul & Kategori', desc: 'Tulis judul berita dan pilih jenis berita' },
                  { step: '2', icon: '📄', title: 'Tulis Isi Berita', desc: 'Tulis ringkasan singkat dan isi lengkap berita' },
                  { step: '3', icon: '✅', title: 'Simpan & Terbitkan', desc: 'Periksa kembali dan klik simpan. Langsung tampil di website!' },
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
                        <button onClick={() => openEditWizard(n)} className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold rounded-lg text-xs transition-colors">
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button onClick={() => setDeleteTarget(n)} className="flex items-center gap-1.5 px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold rounded-lg text-xs transition-colors">
                          <Trash2 className="w-3.5 h-3.5" /> Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="font-bold text-slate-900 text-lg">Kelola Potensi UMKM & Produk Desa</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Total {potensi.items.length} item potensi — data tersimpan di localStorage
                  </p>
                </div>
                <button
                  onClick={openAddPotensi}
                  className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                >
                  <Plus className="w-5 h-5" /> Tambah Potensi Baru
                </button>
              </div>
            </div>

            {/* Stats per Kategori */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {POTENSI_CATEGORIES.map(cat => (
                <div key={cat.value} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                  <div className="text-2xl mb-1">{cat.emoji}</div>
                  <div className="text-lg font-extrabold text-slate-900">
                    {potensi.items.filter(p => p.category === cat.value).length}
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">{cat.label}</div>
                </div>
              ))}
            </div>

            {/* Tabel Item */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Daftar Item Potensi ({potensi.items.length})</h3>
              <div className="space-y-3">
                {potensi.items.map(item => {
                  const cat = POTENSI_CATEGORIES.find(c => c.value === item.category);
                  return (
                    <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200'; }} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-900 text-sm leading-snug">{item.name}</h4>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">{cat?.emoji} {cat?.label || item.category}</span>
                            <span className="text-[11px] text-slate-400">{item.village}</span>
                            <span className="text-[11px] text-slate-400">📍 {item.location}</span>
                          </div>
                          {item.priceOrYield && (
                            <div className="text-[11px] text-emerald-700 mt-0.5 font-medium">💰 {item.priceOrYield}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => openEditPotensi(item)}
                          className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold rounded-lg text-xs transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => setDeletePotensiTarget(item)}
                          className="flex items-center gap-1.5 px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold rounded-lg text-xs transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Hapus
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============= TAB: WEBGIS ============= */}
        {activeTab === 'webgis' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="font-bold text-slate-900 text-lg">Kelola Marker Titik Lokasi WebGIS</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Total {gis.items.length} marker — data tersimpan di localStorage
                  </p>
                </div>
                <button
                  onClick={openAddGis}
                  className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                >
                  <Plus className="w-5 h-5" /> Tambah Marker Baru
                </button>
              </div>
            </div>

            {/* Stats per Kategori */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {GIS_CATEGORIES.map(cat => {
                const count = gis.items.filter(g => g.category === cat).length;
                if (count === 0) return null;
                return (
                  <div key={cat} className="bg-white rounded-xl border border-slate-200 p-3 flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold shrink-0 ${gisCategoryColor[cat] || 'bg-slate-100 text-slate-700'}`}>{count}</span>
                    <span className="text-xs font-medium text-slate-700 truncate">{cat}</span>
                  </div>
                );
              })}
            </div>

            {/* Tabel Marker */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">Daftar Marker ({gis.items.length})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                      <th className="p-3">Nama Lokasi</th>
                      <th className="p-3">Kategori</th>
                      <th className="p-3">Desa</th>
                      <th className="p-3">Koordinat</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {gis.items.map(g => (
                      <tr key={g.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{g.name}</div>
                          {g.address && <div className="text-[11px] text-slate-400 mt-0.5">{g.address}</div>}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${gisCategoryColor[g.category] || 'bg-slate-100 text-slate-700'}`}>
                            {g.category}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600">{g.village}</td>
                        <td className="p-3 font-mono text-slate-600 text-[11px]">
                          <div>🌐 {g.latitude}</div>
                          <div>🌐 {g.longitude}</div>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={() => openEditGis(g)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold rounded-lg text-xs transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button
                              onClick={() => setDeleteGisTarget(g)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold rounded-lg text-xs transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============= TAB: SETTINGS ============= */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <h2 className="font-bold text-slate-900 text-lg">Pengaturan Sistem Smart Village</h2>
            <div className="space-y-4 text-xs max-w-lg">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Platform</label>
                <input type="text" defaultValue="Smart Village Desa Pagutan" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Supabase API URL</label>
                <input type="text" defaultValue={process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500" />
              </div>
              <button onClick={() => alert('Pengaturan tersimpan!')} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" /> Simpan Perubahan
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ==================== MODAL WIZARD: TAMBAH/EDIT BERITA ==================== */}
      {showWizard && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
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

            <div className="flex-1 overflow-y-auto p-6">
              {saveSuccess && (
                <div className="text-center py-8 space-y-4">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900">
                    {editingId ? 'Berita Berhasil Diperbarui! 🎉' : 'Berita Berhasil Disimpan! 🎉'}
                  </h4>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto">
                    Berita &quot;<strong>{formData.title}</strong>&quot; sudah tersimpan dan langsung tampil di website desa.
                  </p>
                  <div className="flex gap-3 justify-center pt-2">
                    <button onClick={closeWizard} className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all">
                      Kembali ke Daftar Berita
                    </button>
                    <button onClick={openAddWizard} className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all">
                      Tambah Berita Lagi
                    </button>
                  </div>
                </div>
              )}

              {!saveSuccess && wizardStep === 1 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                    <strong>📝 Langkah 1:</strong> Tulis judul berita, pilih kategori, dan isi nama penulis.
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">Judul Berita <span className="text-rose-500">*</span></label>
                    <textarea rows={3} placeholder="Contoh: Gotong Royong Pembersihan Saluran Irigasi Desa Pagutan..." value={formData.title} onChange={e => setFormData(f => ({ ...f, title: e.target.value }))} className="w-full p-4 bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl text-sm resize-none focus:outline-none transition-colors" />
                    {formData.title.length > 0 && formData.title.length < 5 && (
                      <p className="text-xs text-rose-500 mt-1">Judul terlalu pendek, minimal 5 karakter.</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-3"><Tag className="inline w-4 h-4 mr-1" /> Pilih Kategori <span className="text-rose-500">*</span></label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['Pengumuman', 'Pembangunan', 'Kegiatan', 'Ekonomi'] as NewsCategory[]).map(cat => (
                        <button key={cat} type="button" onClick={() => setFormData(f => ({ ...f, category: cat }))} className={`p-4 rounded-xl border-2 text-sm font-bold text-left transition-all ${formData.category === cat ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}>
                          <div className="text-2xl mb-1">{cat === 'Pengumuman' ? '📢' : cat === 'Pembangunan' ? '🏗️' : cat === 'Kegiatan' ? '🎯' : '💼'}</div>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">Desa</label>
                      <select value={formData.village} onChange={e => setFormData(f => ({ ...f, village: e.target.value as NewsVillage }))} className="w-full p-3 bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl text-sm focus:outline-none">
                        <option value="Desa Pagutan">Desa Pagutan</option>
                        <option value="Desa Bujak">Desa Bujak</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2"><User className="inline w-4 h-4 mr-1" /> Nama Penulis</label>
                      <input type="text" placeholder="Admin Desa Pagutan" value={formData.author} onChange={e => setFormData(f => ({ ...f, author: e.target.value }))} className="w-full p-3 bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl text-sm focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">Tanggal Terbit</label>
                    <input type="date" value={formData.publishedAt} onChange={e => setFormData(f => ({ ...f, publishedAt: e.target.value }))} className="w-full md:w-auto p-3 bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl text-sm focus:outline-none" />
                  </div>
                </div>
              )}

              {!saveSuccess && wizardStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                    <strong>📄 Langkah 2:</strong> Tulis ringkasan singkat (2–3 kalimat) dan isi lengkap berita.
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1">Ringkasan Berita <span className="text-rose-500">*</span></label>
                    <p className="text-xs text-slate-400 mb-2">Deskripsi singkat yang muncul di daftar berita</p>
                    <textarea rows={3} placeholder="Contoh: Warga Desa Pagutan bersama aparat desa melaksanakan gotong royong..." value={formData.summary} onChange={e => setFormData(f => ({ ...f, summary: e.target.value }))} className="w-full p-4 bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl text-sm resize-none focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1">Isi Lengkap Berita <span className="text-rose-500">*</span></label>
                    <p className="text-xs text-slate-400 mb-2">Ceritakan secara lengkap kejadian/kegiatan yang dilaporkan</p>
                    <textarea rows={8} placeholder="Tulis isi berita di sini secara lengkap..." value={formData.content} onChange={e => setFormData(f => ({ ...f, content: e.target.value }))} className="w-full p-4 bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl text-sm resize-none focus:outline-none transition-colors font-mono leading-relaxed" />
                    <p className="text-xs text-slate-400 mt-1">{formData.content.length} karakter</p>
                  </div>
                </div>
              )}

              {!saveSuccess && wizardStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                    <strong>🖼️ Langkah 3:</strong> Tambahkan foto (opsional) dan periksa kembali sebelum simpan.
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" /> URL Foto Berita (Opsional)
                    </label>
                    <p className="text-xs text-slate-400 mb-2">Jika tidak diisi, foto akan dipilih otomatis sesuai kategori &quot;{formData.category}&quot;.</p>
                    <input type="url" placeholder="https://..." value={formData.imageUrl} onChange={e => setFormData(f => ({ ...f, imageUrl: e.target.value }))} className="w-full p-3 bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl text-sm focus:outline-none" />
                  </div>
                  <div className="rounded-xl overflow-hidden border-2 border-slate-200 h-40 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={formData.imageUrl.trim() || CATEGORY_IMAGES[formData.category]} alt="preview" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = CATEGORY_IMAGES[formData.category]; }} />
                    <div className="absolute bottom-2 left-2 bg-emerald-600/90 text-white text-[11px] px-2 py-1 rounded-md font-bold">{formData.category}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
                    <div className="flex items-center gap-2"><Eye className="w-4 h-4 text-slate-400" /><span className="text-xs font-bold text-slate-500 uppercase">Preview Berita</span></div>
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

            {!saveSuccess && (
              <div className="p-6 border-t border-slate-100 flex items-center justify-between gap-3">
                {wizardStep > 1 ? (
                  <button onClick={() => setWizardStep(s => (s - 1) as WizardStep)} className="flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all">
                    <ChevronLeft className="w-4 h-4" /> Kembali
                  </button>
                ) : (
                  <button onClick={closeWizard} className="px-4 py-3 bg-slate-100 text-slate-500 font-semibold rounded-xl">Batal</button>
                )}
                {wizardStep < 3 ? (
                  <button onClick={() => setWizardStep(s => (s + 1) as WizardStep)} disabled={wizardStep === 1 ? !step1Valid : !step2Valid} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-xl transition-all">
                    Selanjutnya <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={handleSaveNews} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-all active:scale-95">
                    <CheckCircle2 className="w-5 h-5" />
                    {editingId ? 'Perbarui Berita' : '✅ Simpan & Terbitkan'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== MODAL: TAMBAH/EDIT POTENSI ==================== */}
      {showPotensiModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">
                  {potensiSaved ? '✅ Berhasil Disimpan!' : editingPotensiId ? '✏️ Edit Potensi' : '➕ Tambah Potensi Baru'}
                </h3>
                {!potensiSaved && <p className="text-xs text-slate-500 mt-0.5">Lengkapi data item potensi UMKM desa</p>}
              </div>
              <button onClick={closePotensiModal} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {potensiSaved ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 space-y-4 px-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h4 className="text-xl font-extrabold text-slate-900">
                  {editingPotensiId ? 'Potensi Berhasil Diperbarui! 🎉' : 'Potensi Berhasil Ditambahkan! 🎉'}
                </h4>
                <p className="text-slate-500 text-sm text-center max-w-xs">
                  Data &quot;<strong>{potensiForm.name}</strong>&quot; sudah tersimpan dan tampil di halaman potensi.
                </p>
                <div className="flex gap-3 pt-2">
                  <button onClick={closePotensiModal} className="px-5 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 transition-all">Selesai</button>
                  <button onClick={() => { setPotensiForm(EMPTY_POTENSI_FORM); setEditingPotensiId(null); setPotensiSaved(false); }} className="px-5 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all">Tambah Lagi</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                  {/* Nama */}
                  <div>
                    <label className={labelClass}>Nama Produk / Usaha <span className="text-rose-500">*</span></label>
                    <input type="text" placeholder="Cth: Tenun Sasak Asri, Bambu Kreatif..." value={potensiForm.name} onChange={e => setPotensiForm(f => ({ ...f, name: e.target.value }))} className={inputClass} />
                  </div>

                  {/* Kategori */}
                  <div>
                    <label className={labelClass}>Kategori <span className="text-rose-500">*</span></label>
                    <div className="grid grid-cols-2 gap-2">
                      {POTENSI_CATEGORIES.map(cat => (
                        <button key={cat.value} type="button" onClick={() => setPotensiForm(f => ({ ...f, category: cat.value }))} className={`p-3 rounded-xl border-2 text-xs font-bold text-left transition-all flex items-center gap-2 ${potensiForm.category === cat.value ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}>
                          <span className="text-lg">{cat.emoji}</span> {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Desa */}
                  <div>
                    <label className={labelClass}>Desa</label>
                    <select value={potensiForm.village} onChange={e => setPotensiForm(f => ({ ...f, village: e.target.value as NewsVillage }))} className={inputClass}>
                      <option value="Desa Pagutan">Desa Pagutan</option>
                      <option value="Desa Bujak">Desa Bujak</option>
                    </select>
                  </div>

                  {/* Lokasi */}
                  <div>
                    <label className={labelClass}>Lokasi / Alamat <span className="text-rose-500">*</span></label>
                    <input type="text" placeholder="Cth: Dusun Pagutan Tengah, Desa Pagutan" value={potensiForm.location} onChange={e => setPotensiForm(f => ({ ...f, location: e.target.value }))} className={inputClass} />
                  </div>

                  {/* Deskripsi */}
                  <div>
                    <label className={labelClass}>Deskripsi <span className="text-rose-500">*</span></label>
                    <textarea rows={3} placeholder="Ceritakan produk/usaha ini secara singkat..." value={potensiForm.description} onChange={e => setPotensiForm(f => ({ ...f, description: e.target.value }))} className={`${inputClass} resize-none`} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Harga/Hasil */}
                    <div>
                      <label className={labelClass}>Harga / Hasil Panen</label>
                      <input type="text" placeholder="Cth: Rp 150.000/pcs" value={potensiForm.priceOrYield} onChange={e => setPotensiForm(f => ({ ...f, priceOrYield: e.target.value }))} className={inputClass} />
                    </div>
                    {/* Kontak */}
                    <div>
                      <label className={labelClass}>Kontak Pengelola</label>
                      <input type="text" placeholder="Cth: 0812xxxx" value={potensiForm.contactPerson} onChange={e => setPotensiForm(f => ({ ...f, contactPerson: e.target.value }))} className={inputClass} />
                    </div>
                  </div>

                  {/* URL Foto */}
                  <div>
                    <label className={labelClass}><ImageIcon className="inline w-3.5 h-3.5 mr-1" /> URL Foto (Opsional)</label>
                    <input type="url" placeholder="https://..." value={potensiForm.imageUrl} onChange={e => setPotensiForm(f => ({ ...f, imageUrl: e.target.value }))} className={inputClass} />
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button onClick={closePotensiModal} className="px-4 py-2.5 bg-slate-100 text-slate-600 font-semibold rounded-xl text-sm hover:bg-slate-200 transition-colors">Batal</button>
                  <button
                    onClick={handleSavePotensi}
                    disabled={!potensiForm.name.trim() || !potensiForm.description.trim() || !potensiForm.location.trim()}
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-xl transition-all"
                  >
                    <Save className="w-4 h-4" />
                    {editingPotensiId ? 'Perbarui Data' : 'Simpan Potensi'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ==================== MODAL: TAMBAH/EDIT WEBGIS ==================== */}
      {showGisModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">
                  {gisSaved ? '✅ Berhasil Disimpan!' : editingGisId ? '✏️ Edit Marker WebGIS' : '📍 Tambah Marker Baru'}
                </h3>
                {!gisSaved && <p className="text-xs text-slate-500 mt-0.5">Isi data titik lokasi untuk peta WebGIS</p>}
              </div>
              <button onClick={closeGisModal} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {gisSaved ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 space-y-4 px-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h4 className="text-xl font-extrabold text-slate-900">
                  {editingGisId ? 'Marker Berhasil Diperbarui! 🎉' : 'Marker Berhasil Ditambahkan! 🎉'}
                </h4>
                <p className="text-slate-500 text-sm text-center max-w-xs">
                  Marker &quot;<strong>{gisForm.name}</strong>&quot; sudah tersimpan dan akan tampil di peta WebGIS.
                </p>
                <div className="flex gap-3 pt-2">
                  <button onClick={closeGisModal} className="px-5 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 transition-all">Selesai</button>
                  <button onClick={() => { setGisForm(EMPTY_GIS_FORM); setEditingGisId(null); setGisSaved(false); }} className="px-5 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all">Tambah Lagi</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                  {/* Nama */}
                  <div>
                    <label className={labelClass}>Nama Lokasi <span className="text-rose-500">*</span></label>
                    <input type="text" placeholder="Cth: Kantor Desa Pagutan, Masjid Al-Ikhlas..." value={gisForm.name} onChange={e => setGisForm(f => ({ ...f, name: e.target.value }))} className={inputClass} />
                  </div>

                  {/* Kategori */}
                  <div>
                    <label className={labelClass}>Kategori Marker <span className="text-rose-500">*</span></label>
                    <select value={gisForm.category} onChange={e => setGisForm(f => ({ ...f, category: e.target.value as GisLocation['category'] }))} className={inputClass}>
                      {GIS_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Desa */}
                  <div>
                    <label className={labelClass}>Desa</label>
                    <select value={gisForm.village} onChange={e => setGisForm(f => ({ ...f, village: e.target.value as NewsVillage }))} className={inputClass}>
                      <option value="Desa Pagutan">Desa Pagutan</option>
                      <option value="Desa Bujak">Desa Bujak</option>
                    </select>
                  </div>

                  {/* Koordinat */}
                  <div>
                    <label className={labelClass}><Navigation className="inline w-3.5 h-3.5 mr-1" /> Koordinat GPS <span className="text-rose-500">*</span></label>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-3 text-xs text-blue-700">
                      💡 <strong>Cara mendapatkan koordinat:</strong> Buka Google Maps → klik kanan lokasi → salin Latitude & Longitude
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-500 font-semibold mb-1 block">Latitude</label>
                        <input type="number" step="any" placeholder="-8.5234..." value={gisForm.latitude} onChange={e => setGisForm(f => ({ ...f, latitude: e.target.value }))} className={inputClass} />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-500 font-semibold mb-1 block">Longitude</label>
                        <input type="number" step="any" placeholder="116.1234..." value={gisForm.longitude} onChange={e => setGisForm(f => ({ ...f, longitude: e.target.value }))} className={inputClass} />
                      </div>
                    </div>
                  </div>

                  {/* Alamat */}
                  <div>
                    <label className={labelClass}>Alamat Lengkap</label>
                    <input type="text" placeholder="Cth: Jl. Raya Batukliang No. 1, Lombok Tengah" value={gisForm.address} onChange={e => setGisForm(f => ({ ...f, address: e.target.value }))} className={inputClass} />
                  </div>

                  {/* Deskripsi */}
                  <div>
                    <label className={labelClass}>Deskripsi Lokasi</label>
                    <textarea rows={2} placeholder="Keterangan singkat tentang lokasi ini..." value={gisForm.description} onChange={e => setGisForm(f => ({ ...f, description: e.target.value }))} className={`${inputClass} resize-none`} />
                  </div>

                  {/* URL Foto */}
                  <div>
                    <label className={labelClass}><ImageIcon className="inline w-3.5 h-3.5 mr-1" /> URL Foto Lokasi (Opsional)</label>
                    <input type="url" placeholder="https://..." value={gisForm.imageUrl} onChange={e => setGisForm(f => ({ ...f, imageUrl: e.target.value }))} className={inputClass} />
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button onClick={closeGisModal} className="px-4 py-2.5 bg-slate-100 text-slate-600 font-semibold rounded-xl text-sm hover:bg-slate-200 transition-colors">Batal</button>
                  <button
                    onClick={handleSaveGis}
                    disabled={!gisForm.name.trim() || !gisForm.latitude.trim() || !gisForm.longitude.trim()}
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-xl transition-all"
                  >
                    <Save className="w-4 h-4" />
                    {editingGisId ? 'Perbarui Marker' : 'Simpan Marker'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ==================== MODAL: KONFIRMASI HAPUS BERITA ==================== */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5 text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-rose-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Hapus Berita Ini?</h3>
              <p className="text-sm text-slate-500 mt-2">Berita &quot;<strong>{deleteTarget.title}</strong>&quot; akan dihapus dan tidak bisa dikembalikan.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all">Batal</button>
              <button onClick={handleDeleteConfirm} className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-all">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL: KONFIRMASI HAPUS POTENSI ==================== */}
      {deletePotensiTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5 text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-rose-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Hapus Item Potensi?</h3>
              <p className="text-sm text-slate-500 mt-2">Item &quot;<strong>{deletePotensiTarget.name}</strong>&quot; akan dihapus permanen.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeletePotensiTarget(null)} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all">Batal</button>
              <button onClick={() => { potensi.deleteItem(deletePotensiTarget.id); setDeletePotensiTarget(null); }} className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-all">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL: KONFIRMASI HAPUS GIS ==================== */}
      {deleteGisTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5 text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-rose-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Hapus Marker Ini?</h3>
              <p className="text-sm text-slate-500 mt-2">Marker &quot;<strong>{deleteGisTarget.name}</strong>&quot; akan dihapus dari peta WebGIS.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteGisTarget(null)} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all">Batal</button>
              <button onClick={() => { gis.deleteItem(deleteGisTarget.id); setDeleteGisTarget(null); }} className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-all">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
