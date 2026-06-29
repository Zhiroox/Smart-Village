# 🌾 Platform Smart Village Desa Pagutan & Desa Bujak
> **Kecamatan Batukliang, Kabupaten Lombok Tengah, Nusa Tenggara Barat**  
> *Portal Resmi Tata Kelola Digital, WebGIS, Pelayanan Mandiri Online, & Pemberdayaan Ekonomi Desa (Program KKN 2026)*

---

## 📌 Fitur Utama Platform

1. **🏛️ Portal Publik & Berita Terkini**:
   - Informasi resmi pemerintah desa, sambutan Kepala Desa, serta pengumuman pembangunan.
   - Fitur pencarian kata kunci dan filter kategori berita (Pembangunan, Ekonomi, Kegiatan, Pengumuman).
2. **🗺️ WebGIS Tematik Spasial**:
   - Peta interaktif berbasis **Leaflet.js** & **OpenStreetMap** disesuaikan dengan koordinat presisi Batukliang.
   - Filter layer: Kantor Desa, Sekolah, Masjid, Puskesmas/Posyandu, Wisata, Pertanian, Peternakan, Area Rawan Bencana, dan Rute Evakuasi.
3. **📄 Layanan Mandiri Surat Online (Administrasi Warga)**:
   - Formulir pengajuan mandiri untuk 7+ jenis surat keterangan (SKU, SKTM, Domisili, Rekomendasi Nikah, Pindah, dll).
   - Generasi nomor resi pendaftaran otomatis (contoh: `PGT-2026-0001` atau `BJK-2026-0002`).
   - Fitur **Cek Status Resi** real-time dengan alur progres: *Menunggu → Diverifikasi → Diproses → Selesai → Ditolak*.
4. **🛍️ Katalog Potensi Ekonomi & UMKM**:
   - Etalase produk unggulan Tenun Khas Sasak, Kerajinan Anyaman Bambu, Komoditas Padi Organik Subak, dan Ekowisata Panorama.
5. **🔐 Dashboard Admin / Operator Desa**:
   - Panel autentikasi aman untuk perangkat desa.
   - Grafik analitik bulanan berbasis **Recharts**.
   - Sistem verifikasi berkas permohonan surat warga dan manajemen konten (CRUD).

---

## 🛠️ Teknologi & Modul (Tech Stack)

- **Frontend Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **Styling & UI**: Tailwind CSS, Minimalist Government Emerald Palette, Lucide Icons
- **Database & Auth**: Supabase (PostgreSQL, Client Hooks, Sync Offline Fallback)
- **Pemetaan (Maps)**: Leaflet.js, React-Leaflet, OpenStreetMap
- **Visualisasi Data**: Recharts

---

## ⚡ Panduan Instalasi & Jalankan Lokal

### 1. Prasyarat System
Pastikan komputer Anda telah terinstall **Node.js (v18.x atau lebih baru)** dan **npm**.

### 2. Kloning / Ekstrak Proyek
```bash
cd c:/kuliah/KKN/website
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Jalankan Server Pengembang (Development)
```bash
npm run dev
```
Buka peramban (browser) di [http://localhost:3000](http://localhost:3000).

---

## 🗄️ Konfigurasi Supabase Backend (Opsional)

Aplikasi ini sudah dilengkapi dengan **Local Fallback Persistence** (menggunakan storage peramban), sehingga seluruh fitur (pengajuan surat, lacak resi, update status admin) dapat dites langsung tanpa internet atau tanpa membuat akun Supabase terlebih dahulu.

Namun, untuk pengoperasian jangka panjang oleh pemerintah desa, hubungkan dengan Supabase:
1. Buat proyek baru di [Supabase.com](https://supabase.com).
2. Jalankan skrip SQL di file `supabase_schema.sql` pada menu **SQL Editor** di dashboard Supabase.
3. Buat file `.env.local` di direktori utama proyek dan masukkan URL & Anon Key:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-supabase-anon-key
```

---

## 🚀 Panduan Deploy ke Vercel (Production)

1. Upload repository ini ke GitHub / GitLab.
2. Log in ke [Vercel.com](https://vercel.com) dan pilih **Add New Project**.
3. Hubungkan dengan repositori GitHub proyek Smart Village ini.
4. Pada bagian **Environment Variables**, masukkan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Klik **Deploy**. Selesai!

---

## 🔑 Kredensial Akses Admin Demo

- **URL Admin Login**: `/admin/login`
- **Username**: `admin`
- **Password**: `admin123`

---

*Disusun & Diserahterimakan oleh Tim KKN Universitas untuk Pemerintah Desa Pagutan & Desa Bujak, Kecamatan Batukliang, Lombok Tengah © 2026.*
