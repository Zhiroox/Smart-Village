import { createClient } from '@supabase/supabase-js';
import { mockApplications, mockNews, mockPotensi, mockGisLocations } from './data/mockData';
import { AdministrativeApplication, NewsItem, PotensiItem, GisLocation } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Local Storage Helper Keys
const APPS_STORAGE_KEY = 'smart_village_applications';

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

export const saveApplication = (app: Omit<AdministrativeApplication, 'id' | 'createdAt' | 'updatedAt' | 'status'>): AdministrativeApplication => {
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
