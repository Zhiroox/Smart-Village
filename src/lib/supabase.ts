import { createClient } from '@supabase/supabase-js';
import { AdministrativeApplication, NewsItem, PotensiItem, GisLocation, VillageOfficial } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Local Storage Helper Keys
const APPS_STORAGE_KEY = 'smart_village_applications';
const NEWS_STORAGE_KEY = 'smart_village_news';
const POTENSI_STORAGE_KEY = 'admin_potensi';
const GIS_STORAGE_KEY = 'admin_gis';
const OFFICIALS_STORAGE_KEY = 'admin_officials';

// =============================================
// 1. NEWS (BERITA DESA) — SUPABASE CRUD
// =============================================

export const fetchNewsFromSupabase = async (): Promise<NewsItem[]> => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      // Fallback ke localStorage / mockData
      return getStoredNewsSync();
    }

    const items: NewsItem[] = data.map((item: any) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      summary: item.summary,
      content: item.content,
      category: item.category,
      village: item.village,
      imageUrl: item.image_url || '',
      publishedAt: item.published_at || new Date().toISOString().slice(0, 10),
      author: item.author,
    }));

    if (typeof window !== 'undefined') {
      localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(items));
    }
    return items;
  } catch (err) {
    console.error('Error fetching news from Supabase:', err);
    return getStoredNewsSync();
  }
};

export const createNewsInSupabase = async (
  data: Omit<NewsItem, 'id' | 'slug'>
): Promise<NewsItem | null> => {
  const slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 80) + '-' + Date.now();

  const payload = {
    title: data.title,
    slug,
    summary: data.summary,
    content: data.content,
    category: data.category,
    village: data.village,
    image_url: data.imageUrl,
    author: data.author,
    published_at: data.publishedAt || new Date().toISOString().slice(0, 10),
  };

  try {
    const { data: inserted, error } = await supabase
      .from('news')
      .insert([payload])
      .select('*')
      .single();

    if (error) {
      console.error('Supabase news insert error:', error);
      // Simpan ke localStorage sebagai fallback jika Supabase error
      return saveNewsItemSync(data);
    }

    const newItem: NewsItem = {
      id: inserted.id,
      title: inserted.title,
      slug: inserted.slug,
      summary: inserted.summary,
      content: inserted.content,
      category: inserted.category,
      village: inserted.village,
      imageUrl: inserted.image_url || '',
      publishedAt: inserted.published_at || new Date().toISOString().slice(0, 10),
      author: inserted.author,
    };
    return newItem;
  } catch (err) {
    console.error('Error inserting news to Supabase:', err);
    return saveNewsItemSync(data);
  }
};

export const updateNewsInSupabase = async (
  id: string,
  data: Partial<Omit<NewsItem, 'id' | 'slug'>>
): Promise<boolean> => {
  const payload: any = {};
  if (data.title !== undefined) payload.title = data.title;
  if (data.summary !== undefined) payload.summary = data.summary;
  if (data.content !== undefined) payload.content = data.content;
  if (data.category !== undefined) payload.category = data.category;
  if (data.village !== undefined) payload.village = data.village;
  if (data.imageUrl !== undefined) payload.image_url = data.imageUrl;
  if (data.author !== undefined) payload.author = data.author;
  if (data.publishedAt !== undefined) payload.published_at = data.publishedAt;

  try {
    const { error } = await supabase
      .from('news')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error('Supabase news update error:', error);
      return updateNewsItemSync(id, data);
    }
    return true;
  } catch (err) {
    console.error('Error updating news in Supabase:', err);
    return updateNewsItemSync(id, data);
  }
};

export const deleteNewsFromSupabase = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase news delete error:', error);
      return deleteNewsItemSync(id);
    }
    return true;
  } catch (err) {
    console.error('Error deleting news from Supabase:', err);
    return deleteNewsItemSync(id);
  }
};

export const fetchNewsByIdFromSupabase = async (idOrSlug: string): Promise<NewsItem | null> => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
      .single();

    if (!error && data) {
      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        content: data.content,
        category: data.category,
        village: data.village,
        imageUrl: data.image_url || '',
        publishedAt: data.published_at || new Date().toISOString().slice(0, 10),
        author: data.author,
      };
    }
  } catch (e) {
    console.error('Error fetching single news from Supabase:', e);
  }

  // Fallback search in all news
  const all = await fetchNewsFromSupabase();
  return all.find(n => n.id === idOrSlug || n.slug === idOrSlug) || null;
};

// Synchronous Fallbacks for News
const getStoredNewsSync = (): NewsItem[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(NEWS_STORAGE_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch { return []; }
  }
  return [];
};

const saveNewsItemSync = (data: Omit<NewsItem, 'id' | 'slug'>): NewsItem => {
  const current = getStoredNewsSync();
  const slug = data.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 80) + '-' + Date.now();
  const newItem: NewsItem = { ...data, id: `news-local-${Date.now()}`, slug };
  const updated = [newItem, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(updated));
  }
  return newItem;
};

const updateNewsItemSync = (id: string, data: Partial<Omit<NewsItem, 'id' | 'slug'>>): boolean => {
  const current = getStoredNewsSync();
  const idx = current.findIndex(n => n.id === id);
  if (idx === -1) return false;
  current[idx] = { ...current[idx], ...data };
  if (typeof window !== 'undefined') {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(current));
  }
  return true;
};

const deleteNewsItemSync = (id: string): boolean => {
  const current = getStoredNewsSync();
  const filtered = current.filter(n => n.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(filtered));
  }
  return true;
};

// Compatible legacy exports
export const getStoredNews = getStoredNewsSync;
export const getAdminNews = getStoredNewsSync;
export const saveNewsItem = saveNewsItemSync;
export const updateNewsItem = updateNewsItemSync;
export const deleteNewsItem = deleteNewsItemSync;

// =============================================
// 2. POTENSI DESA (UMKM & LAINNYA) — SUPABASE CRUD
// =============================================

export const fetchPotensiFromSupabase = async (): Promise<PotensiItem[]> => {
  try {
    const { data, error } = await supabase
      .from('potensi')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return getStoredPotensiSync();
    }

    const items: PotensiItem[] = data.map((item: any) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      village: item.village,
      description: item.description,
      location: item.location,
      imageUrl: item.image_url || '',
      gallery: item.gallery || [],
      contactPerson: item.contact_person || '',
      priceOrYield: item.price_or_yield || '',
    }));

    if (typeof window !== 'undefined') {
      localStorage.setItem(POTENSI_STORAGE_KEY, JSON.stringify(items));
    }
    return items;
  } catch (err) {
    console.error('Error fetching potensi from Supabase:', err);
    return getStoredPotensiSync();
  }
};

export const createPotensiInSupabase = async (
  item: Omit<PotensiItem, 'id'>
): Promise<PotensiItem | null> => {
  const payload = {
    name: item.name,
    category: item.category,
    village: item.village,
    description: item.description,
    location: item.location,
    image_url: item.imageUrl,
    gallery: item.gallery || [],
    contact_person: item.contactPerson,
    price_or_yield: item.priceOrYield,
  };

  try {
    const { data: inserted, error } = await supabase
      .from('potensi')
      .insert([payload])
      .select('*')
      .single();

    if (error) {
      console.error('Supabase potensi insert error:', error);
      return null;
    }

    return {
      id: inserted.id,
      name: inserted.name,
      category: inserted.category,
      village: inserted.village,
      description: inserted.description,
      location: inserted.location,
      imageUrl: inserted.image_url || '',
      gallery: inserted.gallery || [],
      contactPerson: inserted.contact_person || '',
      priceOrYield: inserted.price_or_yield || '',
    };
  } catch (err) {
    console.error('Error inserting potensi to Supabase:', err);
    return null;
  }
};

export const updatePotensiInSupabase = async (
  id: string,
  item: Partial<Omit<PotensiItem, 'id'>>
): Promise<boolean> => {
  const payload: any = {};
  if (item.name !== undefined) payload.name = item.name;
  if (item.category !== undefined) payload.category = item.category;
  if (item.village !== undefined) payload.village = item.village;
  if (item.description !== undefined) payload.description = item.description;
  if (item.location !== undefined) payload.location = item.location;
  if (item.imageUrl !== undefined) payload.image_url = item.imageUrl;
  if (item.contactPerson !== undefined) payload.contact_person = item.contactPerson;
  if (item.priceOrYield !== undefined) payload.price_or_yield = item.priceOrYield;

  try {
    const { error } = await supabase
      .from('potensi')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error('Supabase potensi update error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error updating potensi in Supabase:', err);
    return false;
  }
};

export const deletePotensiFromSupabase = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('potensi')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase potensi delete error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error deleting potensi from Supabase:', err);
    return false;
  }
};

const getStoredPotensiSync = (): PotensiItem[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(POTENSI_STORAGE_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch { return []; }
  }
  return [];
};

// =============================================
// 3. WEBGIS LOCATIONS — SUPABASE CRUD
// =============================================

export const fetchGisFromSupabase = async (): Promise<GisLocation[]> => {
  try {
    const { data, error } = await supabase
      .from('gis_locations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return getStoredGisSync();
    }

    const items: GisLocation[] = data.map((item: any) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      village: item.village,
      latitude: parseFloat(item.latitude),
      longitude: parseFloat(item.longitude),
      description: item.description,
      address: item.address,
      imageUrl: item.image_url || '',
    }));

    if (typeof window !== 'undefined') {
      localStorage.setItem(GIS_STORAGE_KEY, JSON.stringify(items));
    }
    return items;
  } catch (err) {
    console.error('Error fetching GIS locations from Supabase:', err);
    return getStoredGisSync();
  }
};

export const createGisInSupabase = async (
  item: Omit<GisLocation, 'id'>
): Promise<GisLocation | null> => {
  const payload = {
    name: item.name,
    category: item.category,
    village: item.village,
    latitude: item.latitude,
    longitude: item.longitude,
    description: item.description,
    address: item.address,
    image_url: item.imageUrl,
  };

  try {
    const { data: inserted, error } = await supabase
      .from('gis_locations')
      .insert([payload])
      .select('*')
      .single();

    if (error) {
      console.error('Supabase GIS insert error:', error);
      return null;
    }

    return {
      id: inserted.id,
      name: inserted.name,
      category: inserted.category,
      village: inserted.village,
      latitude: parseFloat(inserted.latitude),
      longitude: parseFloat(inserted.longitude),
      description: inserted.description,
      address: inserted.address,
      imageUrl: inserted.image_url || '',
    };
  } catch (err) {
    console.error('Error inserting GIS location to Supabase:', err);
    return null;
  }
};

export const updateGisInSupabase = async (
  id: string,
  item: Partial<Omit<GisLocation, 'id'>>
): Promise<boolean> => {
  const payload: any = {};
  if (item.name !== undefined) payload.name = item.name;
  if (item.category !== undefined) payload.category = item.category;
  if (item.village !== undefined) payload.village = item.village;
  if (item.latitude !== undefined) payload.latitude = item.latitude;
  if (item.longitude !== undefined) payload.longitude = item.longitude;
  if (item.description !== undefined) payload.description = item.description;
  if (item.address !== undefined) payload.address = item.address;
  if (item.imageUrl !== undefined) payload.image_url = item.imageUrl;

  try {
    const { error } = await supabase
      .from('gis_locations')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error('Supabase GIS update error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error updating GIS location in Supabase:', err);
    return false;
  }
};

export const deleteGisFromSupabase = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('gis_locations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase GIS delete error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error deleting GIS location from Supabase:', err);
    return false;
  }
};

const getStoredGisSync = (): GisLocation[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(GIS_STORAGE_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch { return []; }
  }
  return [];
};

// =============================================
// 4. ADMINISTRATIVE APPLICATIONS (SURAT ONLINE)
// =============================================

export const getStoredApplications = (): AdministrativeApplication[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(APPS_STORAGE_KEY);
  if (!stored) {
    return [];
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
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

// =============================================
// 5. VILLAGE OFFICIALS (SOTK PERANGKAT DESA)
// =============================================

export const fetchOfficialsFromSupabase = async (): Promise<VillageOfficial[]> => {
  try {
    const { data, error } = await supabase
      .from('village_officials')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return getStoredOfficialsSync();
    }

    const items: VillageOfficial[] = data.map((item: any) => ({
      id: item.id,
      name: item.name,
      position: item.position,
      village: item.village,
      photoUrl: item.photo_url || '',
      phone: item.phone || '',
    }));

    if (typeof window !== 'undefined') {
      localStorage.setItem(OFFICIALS_STORAGE_KEY, JSON.stringify(items));
    }
    return items;
  } catch (err) {
    console.error('Error fetching village officials from Supabase:', err);
    return getStoredOfficialsSync();
  }
};

export const createOfficialInSupabase = async (
  item: Omit<VillageOfficial, 'id'>
): Promise<VillageOfficial | null> => {
  const payload = {
    name: item.name,
    position: item.position,
    village: item.village,
    photo_url: item.photoUrl || '',
    phone: item.phone || '',
  };

  try {
    const { data: inserted, error } = await supabase
      .from('village_officials')
      .insert([payload])
      .select('*')
      .single();

    if (error) {
      console.error('Supabase official insert error:', error);
      return saveOfficialItemSync(item);
    }

    const newItem: VillageOfficial = {
      id: inserted.id,
      name: inserted.name,
      position: inserted.position,
      village: inserted.village,
      photoUrl: inserted.photo_url || '',
      phone: inserted.phone || '',
    };
    return newItem;
  } catch (err) {
    console.error('Error inserting official to Supabase:', err);
    return saveOfficialItemSync(item);
  }
};

export const updateOfficialInSupabase = async (
  id: string,
  data: Partial<Omit<VillageOfficial, 'id'>>
): Promise<boolean> => {
  const payload: any = {};
  if (data.name !== undefined) payload.name = data.name;
  if (data.position !== undefined) payload.position = data.position;
  if (data.village !== undefined) payload.village = data.village;
  if (data.photoUrl !== undefined) payload.photo_url = data.photoUrl;
  if (data.phone !== undefined) payload.phone = data.phone;

  try {
    const { error } = await supabase
      .from('village_officials')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error('Supabase official update error:', error);
      return updateOfficialItemSync(id, data);
    }
    return true;
  } catch (err) {
    console.error('Error updating official in Supabase:', err);
    return updateOfficialItemSync(id, data);
  }
};

export const deleteOfficialFromSupabase = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('village_officials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase official delete error:', error);
      return deleteOfficialItemSync(id);
    }
    return true;
  } catch (err) {
    console.error('Error deleting official from Supabase:', err);
    return deleteOfficialItemSync(id);
  }
};

// LocalStorage Sync Helpers for Village Officials
const getStoredOfficialsSync = (): VillageOfficial[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(OFFICIALS_STORAGE_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch { return []; }
  }
  return [];
};

const saveOfficialItemSync = (data: Omit<VillageOfficial, 'id'>): VillageOfficial => {
  const current = getStoredOfficialsSync();
  const newItem: VillageOfficial = { ...data, id: `off-${Date.now()}` };
  const updated = [...current, newItem];
  if (typeof window !== 'undefined') {
    localStorage.setItem(OFFICIALS_STORAGE_KEY, JSON.stringify(updated));
  }
  return newItem;
};

const updateOfficialItemSync = (id: string, data: Partial<Omit<VillageOfficial, 'id'>>): boolean => {
  const current = getStoredOfficialsSync();
  const index = current.findIndex(i => i.id === id);
  if (index === -1) return false;
  current[index] = { ...current[index], ...data };
  if (typeof window !== 'undefined') {
    localStorage.setItem(OFFICIALS_STORAGE_KEY, JSON.stringify(current));
  }
  return true;
};

const deleteOfficialItemSync = (id: string): boolean => {
  const current = getStoredOfficialsSync();
  const updated = current.filter(i => i.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(OFFICIALS_STORAGE_KEY, JSON.stringify(updated));
  }
  return true;
};


