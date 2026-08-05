export type VillageName = 'Desa Pagutan';

export interface QuickStats {
  population: number;
  dusunCount: number;
  umkmCount: number;
  farmlandArea: number; // in hectares
  tourismSpots: number;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;          // primary (for backward compat display)
  categories: string[];
  village: 'Desa Pagutan';
  imageUrl: string;
  gallery?: string[];
  publishedAt: string;
  author: string;
  authors: string[];
}

export interface VillageOfficial {
  id: string;
  name: string;
  position: string;
  village: 'Desa Pagutan';
  photoUrl?: string;
  phone?: string;
}

export interface PotensiItem {
  id: string;
  name: string;
  category: 'Agriculture' | 'Livestock' | 'UMKM' | 'Tourism';
  village: 'Desa Pagutan';
  description: string;
  location: string;
  imageUrl: string;
  gallery: string[];
  contactPerson?: string;
  priceOrYield?: string;
}

export interface GisLocation {
  id: string;
  name: string;
  category: 'Batas Desa' | 'Batas Dusun' | 'Kantor Desa' | 'Sekolah' | 'Masjid' | 'Puskesmas' | 'Wisata' | 'Pertanian' | 'Peternakan' | 'Pemakaman' | 'Area Rawan Bencana' | 'Rute Evakuasi';
  village: 'Desa Pagutan';
  latitude: number;
  longitude: number;
  description: string;
  address: string;
  imageUrl?: string;
}

export type ApplicationStatusType = 'Menunggu' | 'Diverifikasi' | 'Diproses' | 'Selesai' | 'Ditolak';

export interface AdministrativeApplication {
  id: string;
  applicationNumber: string; // e.g. PGT-2026-0001
  fullName: string;
  nik: string;
  phoneNumber: string;
  email: string;
  serviceType: 'Surat Keterangan Domisili' | 'Surat Keterangan Usaha' | 'Surat Keterangan Tidak Mampu (SKTM)' | 'Rekomendasi Nikah' | 'Surat Keterangan Pindah' | 'Surat Keterangan Umum' | 'Lainnya';
  village: 'Desa Pagutan';
  address: string;
  purpose: string;
  additionalNotes?: string;
  kkFileName?: string;
  ktpFileName?: string;
  status: ApplicationStatusType;
  statusNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  type: 'photo' | 'video';
  url: string;
  thumbnailUrl?: string;
  category: string;
  village: 'Desa Pagutan';
  date: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  category: string;
  fileSize: string;
  fileUrl: string;
  downloadCount: number;
  uploadedAt: string;
}
