-- =================================================================
-- SMART VILLAGE SUPABASE DATABASE SCHEMA
-- Desa Pagutan, Kecamatan Batukliang, Kabupaten Lombok Tengah
-- =================================================================

-- 1. ENUM TYPES
CREATE TYPE village_enum AS ENUM ('Desa Pagutan');
CREATE TYPE news_category_enum AS ENUM ('Pengumuman', 'Pembangunan', 'Kegiatan', 'Ekonomi');
CREATE TYPE potensi_category_enum AS ENUM ('Agriculture', 'Livestock', 'UMKM', 'Tourism');
CREATE TYPE gis_category_enum AS ENUM ('Batas Desa', 'Batas Dusun', 'Kantor Desa', 'Sekolah', 'Masjid', 'Puskesmas', 'Wisata', 'Pertanian', 'Peternakan', 'Area Rawan Bencana', 'Rute Evakuasi');
CREATE TYPE app_status_enum AS ENUM ('Menunggu', 'Diverifikasi', 'Diproses', 'Selesai', 'Ditolak');

-- 2. USERS & ROLES
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'operator', -- 'admin' or 'operator'
  village village_enum NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. NEWS TABLE
CREATE TABLE IF NOT EXISTS public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  category news_category_enum NOT NULL,
  village village_enum NOT NULL,
  image_url TEXT NOT NULL,
  author TEXT NOT NULL,
  published_at DATE DEFAULT CURRENT_DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. POTENSI DESA (UMKM, PERTANIAN, PETERNAKAN, EKOWISATA)
CREATE TABLE IF NOT EXISTS public.potensi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category potensi_category_enum NOT NULL,
  village village_enum NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  contact_person TEXT,
  price_or_yield TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. WEBGIS LOCATIONS
CREATE TABLE IF NOT EXISTS public.gis_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category gis_category_enum NOT NULL,
  village village_enum NOT NULL,
  latitude NUMERIC(10, 7) NOT NULL,
  longitude NUMERIC(10, 7) NOT NULL,
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. ADMINISTRATIVE SERVICE APPLICATIONS (LAYANAN ONLINE)
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_number TEXT UNIQUE NOT NULL, -- e.g. PGT-2026-0001
  full_name TEXT NOT NULL,
  nik VARCHAR(16) NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  service_type TEXT NOT NULL,
  village village_enum NOT NULL,
  address TEXT NOT NULL,
  purpose TEXT NOT NULL,
  additional_notes TEXT,
  kk_file_name TEXT,
  ktp_file_name TEXT,
  status app_status_enum DEFAULT 'Menunggu' NOT NULL,
  status_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. VILLAGE OFFICIALS (SOTK)
CREATE TABLE IF NOT EXISTS public.village_officials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  village village_enum NOT NULL,
  photo_url TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. DOWNLOADS & FORMS
CREATE TABLE IF NOT EXISTS public.downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  file_size TEXT NOT NULL,
  file_url TEXT NOT NULL,
  download_count INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.potensi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gis_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Allow public read access to news, potensi, and gis
CREATE POLICY "Public Read News" ON public.news FOR SELECT USING (true);
CREATE POLICY "Public Read Potensi" ON public.potensi FOR SELECT USING (true);
CREATE POLICY "Public Read GIS" ON public.gis_locations FOR SELECT USING (true);
CREATE POLICY "Public Insert Applications" ON public.applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Select Applications by Resi" ON public.applications FOR SELECT USING (true);
