import { createClient } from '@supabase/supabase-js';
import { mockApplications, mockNews, mockPotensi, mockGisLocations } from './data/mockData';
import { AdministrativeApplication, NewsItem, PotensiItem, GisLocation } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Local Storage Helper Keys
const APPS_STORAGE_KEY = 'smart_village_applications';
const NEWS_STORAGE_KEY = 'smart_village_news';

// =============================================
// NEWS CRUD — berbasis localStorage
// =============================================

/** Ambil semua berita: gabungan dari localStorage (berita admin) + mockData */
export const getStoredNews = (): NewsItem[] => {
  if (typeof window === 'undefined') return mockNews;
  const stored = localStorage.getItem(NEWS_STORAGE_KEY);
  let adminNews: NewsItem[] = [];
  if (stored) {
    try { adminNews = JSON.parse(stored); } catch { adminNews = []; }
  }
  // Berita admin (terbaru) muncul lebih dulu, diikuti mock data
  return [...adminNews, ...mockNews];
};

/** Hanya berita yang ditambahkan admin (tanpa mock data) */
export const getAdminNews = (): NewsItem[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(NEWS_STORAGE_KEY);
  if (!stored) return [];
  try { return JSON.parse(stored); } catch { return []; }
};

/** Simpan berita baru */
export const saveNewsItem = (
  data: Omit<NewsItem, 'id' | 'slug'>
): NewsItem => {
  const adminNews = getAdminNews();
  const slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 80) + '-' + Date.now();
  const newItem: NewsItem = {
    ...data,
    id: `news-admin-${Date.now()}`,
    slug,
  };
  const updated = [newItem, ...adminNews];
  if (typeof window !== 'undefined') {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(updated));
  }
  return newItem;
};

/** Update berita yang sudah ada */
export const updateNewsItem = (id: string, data: Partial<Omit<NewsItem, 'id' | 'slug'>>): boolean => {
  const adminNews = getAdminNews();
  const idx = adminNews.findIndex(n => n.id === id);
  if (idx === -1) return false;
  adminNews[idx] = { ...adminNews[idx], ...data };
  if (typeof window !== 'undefined') {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(adminNews));
  }
  return true;
};

/** Hapus berita (hanya berita yang ditambahkan admin, bukan mockData) */
export const deleteNewsItem = (id: string): boolean => {
  const adminNews = getAdminNews();
  const filtered = adminNews.filter(n => n.id !== id);
  if (filtered.length === adminNews.length) return false;
  if (typeof window !== 'undefined') {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(filtered));
  }
  return true;
};

export const getStoredApplications = (): AdministrativeApplication[] => {
  if (typeof window === 'undefined') return mockApplications;
  const stored = localStorage.getItem(APPS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(mockApplications));
    return mockApplications;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return mockApplications;
  }
};

export const saveApplication = (app: Omit<AdministrativeApplication, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'applicationNumber'>): AdministrativeApplication => {
  const currentApps = getStoredApplications();
  const prefix = app.village === 'Desa Pagutan' ? 'PGT' : 'BJK';
  const year = new Date().getFullYear();
  const seq = (currentApps.length + 1).toString().padStart(4, '0');
  const applicationNumber = `${prefix}-${year}-${seq}`;

  const newApp: AdministrativeApplication = {
    ...app,
    id: `app-custom-${Date.now()}`,
    applicationNumber,
    status: 'Menunggu',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const updatedApps = [newApp, ...currentApps];
  if (typeof window !== 'undefined') {
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(updatedApps));
  }
  return newApp;
};

export const updateApplicationStatus = (id: string, status: AdministrativeApplication['status'], statusNotes?: string): boolean => {
  const currentApps = getStoredApplications();
  const index = currentApps.findIndex(a => a.id === id || a.applicationNumber === id);
  if (index !== -1) {
    currentApps[index].status = status;
    if (statusNotes !== undefined) {
      currentApps[index].statusNotes = statusNotes;
    }
    currentApps[index].updatedAt = new Date().toISOString();
    if (typeof window !== 'undefined') {
      localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(currentApps));
    }
    return true;
  }
  return false;
};
