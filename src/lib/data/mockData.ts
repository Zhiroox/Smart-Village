import { QuickStats, NewsItem, VillageOfficial, PotensiItem, GisLocation, AdministrativeApplication, GalleryItem, DownloadItem, FaqItem } from '../types';

export const mockQuickStats: Record<'Desa Pagutan', QuickStats> = {
  'Desa Pagutan': {
    population: 6850,
    dusunCount: 15,
    umkmCount: 58,
    farmlandArea: 480,
    tourismSpots: 5,
  }
};

export const mockNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Pelatihan Pembuatan Kerajinan Bambu & Digital Marketing bagi UMKM Desa Pagutan',
    slug: 'pelatihan-pembuatan-kerajinan-bambu-digital-marketing',
    summary: 'Pemerintah Desa Pagutan bekerja sama dengan Tim KKN Universitas menggelar workshop pemasaran digital dan inovasi desain kerajinan bambu.',
    content: `Desa Pagutan, Batukliang - Dalam rangka meningkatkan daya saing ekonomi lokal, Pemerintah Desa Pagutan menyelenggarakan pelatihan pemasaran digital dan pengembangan produk kerajinan bambu bagi para pelaku UMKM setempat. Kegiatan yang berlangsung di Aula Kantor Desa Pagutan ini dihadiri oleh puluhan pengrajin bambu dan pelaku usaha mikro.

Kepala Desa Pagutan dalam sambutannya menyampaikan bahwa potensi bambu di Batukliang sangat melimpah, namun pemasaran produk masih terbatas pada pasar tradisional. Dengan adanya pelatihan ini, diharapkan para pelaku usaha dapat memanfaatkan platform digital dan media sosial untuk memperluas jangkauan pasar hingga ke tingkat nasional maupun internasional.`,
    category: 'Ekonomi',
    village: 'Desa Pagutan',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
    publishedAt: '2026-06-25',
    author: 'Admin Desa Pagutan'
  },
  {
    id: 'news-2',
    title: 'Pemerintah Desa Pagutan Salurkan Bantuan Bibit Padi Unggul & Pupuk Organik',
    slug: 'penyaluran-bantuan-bibit-padi-unggul-pagutan',
    summary: 'Kelompok tani di Desa Pagutan menerima bantuan bibit padi sertifikasi prima dan fasilitas pendampingan teknologi pengairan.',
    content: `Desa Pagutan, Batukliang - Guna mendukung ketahanan pangan nasional dan meningkatkan produktivitas hasil panen, Pemerintah Desa Pagutan menyaluran bantuan bibit padi unggul varietas Inpari beserta paket pupuk hayati organik kepada kelompok tani yang tersebar di wilayah persawahan subak.

Program yang didanai melalui Alokasi Dana Desa (ADD) ini bertujuan untuk mengoptimalkan penggunaan lahan pertanian seluas 480 hektar di wilayah Desa Pagutan. Pembagian bibit secara simbolis diserahkan langsung oleh Kepala Desa Pagutan di Balai Pertanian Dusun Pagutan.`,
    category: 'Pembangunan',
    village: 'Desa Pagutan',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
    publishedAt: '2026-06-20',
    author: 'Sekretariat Desa Pagutan'
  },
  {
    id: 'news-3',
    title: 'Gotong Royong Perbaikan Rute Evakuasi & Saluran Irigasi di Wilayah Desa Pagutan',
    slug: 'gotong-royong-perbaikan-rute-evakuasi-irigasi',
    summary: 'Masyarakat Desa Pagutan bersinergi melakukan aksi gotong royong membersihkan drainase utama pencegah banjir.',
    content: `Kecamatan Batukliang - Menghadapi musim penghujan, warga Desa Pagutan secara serentak menggelar aksi gotong royong perbaikan drainase serta perapihan jalan desa yang difungsikan sebagai jalur evakuasi bencana. Kegiatan ini diikuti oleh ratusan warga dari berbagai elemen masyarakat, mulai dari pemuda Karang Taruna hingga tokoh masyarakat.`,
    category: 'Kegiatan',
    village: 'Desa Pagutan',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800',
    publishedAt: '2026-06-14',
    author: 'Tim Liputan KKN'
  },
  {
    id: 'news-4',
    title: 'Pengumuman Pelayanan Administrasi Mandiri Berbasis Digital Smart Village Desa Pagutan',
    slug: 'pengumuman-pelayanan-administrasi-mandiri-digital',
    summary: 'Warga Desa Pagutan kini dapat mengajukan surat keterangan secara online sebelum memprosesnya di kantor desa.',
    content: `Desa Pagutan - Dalam wujud modernisasi pelayanan publik, Pemerintah Desa Pagutan meluncurkan Portal Layanan Surat Online Mandiri. Warga cukup mengisikan formulir secara online dan mengecek status permohonan dengan nomor resi resmi.`,
    category: 'Pengumuman',
    village: 'Desa Pagutan',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    publishedAt: '2026-06-10',
    author: 'Tim Smart Village'
  }
];

export const mockOfficials: VillageOfficial[] = [
  {
    id: 'off-1',
    name: 'Subandi',
    position: 'Kepala Desa',
    village: 'Desa Pagutan',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    phone: '0812-3456-7890'
  },
  {
    id: 'off-2',
    name: 'M. Zarwadi MZ',
    position: 'Sekdes',
    village: 'Desa Pagutan',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'off-3',
    name: 'Ra\'up',
    position: 'Kaur Umum dan TU',
    village: 'Desa Pagutan',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'off-4',
    name: 'Bq. Nurul Hayati',
    position: 'Kaur Keuangan',
    village: 'Desa Pagutan',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'off-5',
    name: 'Sukriadi',
    position: 'Kaur Perencanaan',
    village: 'Desa Pagutan',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'off-6',
    name: 'Khairil Makirin',
    position: 'Kasi Pemerintahan',
    village: 'Desa Pagutan',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'off-7',
    name: 'Herman',
    position: 'Kasi Kesejahteraan',
    village: 'Desa Pagutan',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'off-8',
    name: 'Herman Jayadi S',
    position: 'Kasi Pelayanan',
    village: 'Desa Pagutan',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
  }
];

export const mockStafPembantu: string[] = [
  'Abdul Aziz',
  'Fahrurrozi',
  'Ahmad Susfendi',
  'Nurlina Sari',
  'Haeniyah'
];

export const mockKadusList: { name: string; position: string }[] = [
  { name: 'Syariful Anam', position: 'Kadus Pagutan Utara' },
  { name: 'Hazman Hadi', position: 'Kadus Pagutan Selatan' },
  { name: 'L. Parman Prawira', position: 'Kadus Pesinggahan' },
  { name: 'Awaludin Latif', position: 'Kadus Lombok Daye' },
  { name: 'Herman Jayadi S.', position: 'Plt. Kadus Lombok Lauk' },
  { name: 'Remahardi', position: 'Kadus Jejeneng' },
  { name: 'Yusuf Hamdani', position: 'Kadus LD. Buwuh' },
  { name: 'Muh. Hatim', position: 'Kadus Sangkawana' },
  { name: 'Ahmad', position: 'Kadus LD. Gocek' },
  { name: 'Jumali', position: 'Kadus Sangkawati' },
  { name: 'Jumadil', position: 'Kadus Gubuk Baru' },
  { name: 'Munawar', position: 'Kadus Genteng' },
  { name: 'Jamhari Mahdan', position: 'Kadus Tunjang Timur' },
  { name: 'Nuriah', position: 'Kadus Tunjang Barat' },
  { name: 'Rakhmat Mustasaid', position: 'Kadus Tunjang Utara' }
];

export const mockPotensi: PotensiItem[] = [
  {
    id: 'pot-1',
    name: 'Tenun Khas Sasak Pagutan',
    category: 'UMKM',
    village: 'Desa Pagutan',
    description: 'Kerajinan kain tenun ikat dan songket tradisional buatan tangan pengrajin wanita Desa Pagutan dengan motif khas Lombok yang melegenda.',
    location: 'Dusun Pagutan Lauk, Desa Pagutan',
    imageUrl: 'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=800'
    ],
    contactPerson: 'Ibu Inaq Senim (0878-1122-3344)',
    priceOrYield: 'Rp 250.000 - Rp 1.500.000 / lembar'
  },
  {
    id: 'pot-2',
    name: 'Kerajinan Bambu Pagutan Lestari',
    category: 'UMKM',
    village: 'Desa Pagutan',
    description: 'Produk anyaman bambu perabotan rumah tangga, tempat nasi, kap lampu ramah lingkungan berkualitas tinggi.',
    location: 'Dusun Tunjang, Desa Pagutan',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800'
    ],
    contactPerson: 'Pak Amaq Murni (0819-3344-5566)',
    priceOrYield: 'Rp 35.000 - Rp 300.000 / pcs'
  },
  {
    id: 'pot-3',
    name: 'Pertanian Padi Organik & Hortikultura Pagutan',
    category: 'Agriculture',
    village: 'Desa Pagutan',
    description: 'Hamparan sawah subur yang menghasilkan beras organik berkualitas tinggi serta tanaman sayur hortikultura seperti cabai, tomat, dan bawang.',
    location: 'Area Persawahan Subak Pagutan',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
    gallery: ['https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800'],
    priceOrYield: 'Hasil Panen 6.5 Ton / Hektar'
  },
  {
    id: 'pot-4',
    name: 'Peternakan Sapi Lombok Unggul',
    category: 'Livestock',
    village: 'Desa Pagutan',
    description: 'Sentra pembibitan sapi Bali unggulan dan budidaya kambing dengan pola pakan hijau lestari terintegrasi.',
    location: 'Dusun Lombok Daye, Desa Pagutan',
    imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e6d49?auto=format&fit=crop&q=80&w=800',
    gallery: ['https://images.unsplash.com/photo-1546445317-29f4545e6d49?auto=format&fit=crop&q=80&w=800'],
    priceOrYield: 'Populasi ~450 Ekor'
  },
  {
    id: 'pot-5',
    name: 'Wisata Budaya & Agrowisata Sawah Pagutan',
    category: 'Tourism',
    village: 'Desa Pagutan',
    description: 'Destinasi wisata edukasi persawahan dengan latar belakang perbukitan hijau asri dan galeri tenun tradisional.',
    location: 'Dusun Pagutan Tengah, Desa Pagutan',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    gallery: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800'],
    contactPerson: 'Pokdarwis Pagutan Asri'
  }
];

export const mockGisLocations: GisLocation[] = [
  {
    id: 'gis-1',
    name: 'SDN 2 Tunjang',
    category: 'Sekolah',
    village: 'Desa Pagutan',
    latitude: -8.6384290,
    longitude: 116.2632648,
    description: 'Fasilitas pendidikan Sekolah Dasar Negeri 2 Tunjang di Desa Pagutan.',
    address: 'Dusun Tunjang, Desa Pagutan'
  },
  {
    id: 'gis-2',
    name: 'Masjid Nurul Yaqin Tunjang',
    category: 'Masjid',
    village: 'Desa Pagutan',
    latitude: -8.6381615,
    longitude: 116.2628072,
    description: 'Masjid tempat peribadatan dan pusat kegiatan keagamaan Islam Dusun Tunjang.',
    address: 'Dusun Tunjang, Desa Pagutan'
  },
  {
    id: 'gis-3',
    name: 'SDN 1 Tunjang',
    category: 'Sekolah',
    village: 'Desa Pagutan',
    latitude: -8.63540186,
    longitude: 116.26582072,
    description: 'Fasilitas pendidikan Sekolah Dasar Negeri 1 Tunjang di Desa Pagutan.',
    address: 'Dusun Tunjang, Desa Pagutan'
  },
  {
    id: 'gis-4',
    name: 'Masjid Daruttaqwa Genteng',
    category: 'Masjid',
    village: 'Desa Pagutan',
    latitude: -8.6345312,
    longitude: 116.2684831,
    description: 'Masjid tempat peribadatan Dusun Genteng, Desa Pagutan.',
    address: 'Dusun Genteng, Desa Pagutan'
  },
  {
    id: 'gis-5',
    name: 'Masjid Nurul Hikmah',
    category: 'Masjid',
    village: 'Desa Pagutan',
    latitude: -8.6375354,
    longitude: 116.2706963,
    description: 'Sarana ibadah warga muslim Desa Pagutan.',
    address: 'Desa Pagutan'
  },
  {
    id: 'gis-6',
    name: 'SDN 2 Sangkawana',
    category: 'Sekolah',
    village: 'Desa Pagutan',
    latitude: -8.6357042,
    longitude: 116.2744223,
    description: 'Fasilitas pendidikan Sekolah Dasar Negeri 2 Sangkawana.',
    address: 'Dusun Sangkawana, Desa Pagutan'
  },
  {
    id: 'gis-7',
    name: 'Masjid Nurul imam Lendang Gocek',
    category: 'Masjid',
    village: 'Desa Pagutan',
    latitude: -8.6361587,
    longitude: 116.2749085,
    description: 'Masjid tempat peribadatan Dusun Lendang Gocek, Desa Pagutan.',
    address: 'Dusun Lendang Gocek, Desa Pagutan'
  },
  {
    id: 'gis-8',
    name: 'SDN 1 Sangkawana',
    category: 'Sekolah',
    village: 'Desa Pagutan',
    latitude: -8.6370373,
    longitude: 116.2752812,
    description: 'Fasilitas pendidikan Sekolah Dasar Negeri 1 Sangkawana.',
    address: 'Dusun Sangkawana, Desa Pagutan'
  },
  {
    id: 'gis-9',
    name: 'Masjid Nuruttaqwa',
    category: 'Masjid',
    village: 'Desa Pagutan',
    latitude: -8.6410683,
    longitude: 116.2757380,
    description: 'Masjid tempat ibadah dan pengajian anak-anak warga desa.',
    address: 'Desa Pagutan'
  },
  {
    id: 'gis-10',
    name: 'Masjid Nurul Batin',
    category: 'Masjid',
    village: 'Desa Pagutan',
    latitude: -8.63605532,
    longitude: 116.28306304,
    description: 'Fasilitas ibadah masyarakat Desa Pagutan.',
    address: 'Desa Pagutan'
  },
  {
    id: 'gis-11',
    name: 'SMPN 2 Batukliang',
    category: 'Sekolah',
    village: 'Desa Pagutan',
    latitude: -8.6298524,
    longitude: 116.2844525,
    description: 'Fasilitas pendidikan tingkat pertama SMP Negeri 2 Batukliang.',
    address: 'Desa Pagutan'
  },
  {
    id: 'gis-12',
    name: 'Masjid Nurul Huda, Lembok Lauk',
    category: 'Masjid',
    village: 'Desa Pagutan',
    latitude: -8.6311043,
    longitude: 116.2875740,
    description: 'Masjid utama Dusun Lombok Lauk (Lembok Lauk), Desa Pagutan.',
    address: 'Dusun Lombok Lauk, Desa Pagutan'
  },
  {
    id: 'gis-13',
    name: 'Pemakaman Umum Dusun Lembok',
    category: 'Area Rawan Bencana',
    village: 'Desa Pagutan',
    latitude: -8.6314580,
    longitude: 116.2870958,
    description: 'Lahan pemakaman umum dan area terbuka Dusun Lombok (Lembok).',
    address: 'Dusun Lombok, Desa Pagutan'
  },
  {
    id: 'gis-14',
    name: 'Pesantren Nurul Mubin',
    category: 'Sekolah',
    village: 'Desa Pagutan',
    latitude: -8.6326499,
    longitude: 116.2867653,
    description: 'Lembaga pendidikan Islam dan pondok pesantren di Desa Pagutan.',
    address: 'Desa Pagutan'
  },
  {
    id: 'gis-15',
    name: 'Kantor Desa Pagutan',
    category: 'Kantor Desa',
    village: 'Desa Pagutan',
    latitude: -8.62801091,
    longitude: 116.28606907,
    description: 'Kantor Kepala Desa Pagutan, pusat pelayanan administrasi terpadu.',
    address: 'Jl. Raya Pagutan, Desa Pagutan'
  },
  {
    id: 'gis-16',
    name: 'Masjid Baitussalam Lembok Daye',
    category: 'Masjid',
    village: 'Desa Pagutan',
    latitude: -8.6281049,
    longitude: 116.2885853,
    description: 'Masjid tempat peribadatan Dusun Lombok Daye (Lembok Daye).',
    address: 'Dusun Lombok Daye, Desa Pagutan'
  },
  {
    id: 'gis-17',
    name: 'Masjid Baiturrahman Pagutan',
    category: 'Masjid',
    village: 'Desa Pagutan',
    latitude: -8.6277978,
    longitude: 116.2829171,
    description: 'Masjid Baiturrahman pusat peribadatan Desa Pagutan.',
    address: 'Desa Pagutan'
  },
  {
    id: 'gis-18',
    name: 'SMAS dan MTS Nurul Iman NW Pagutan',
    category: 'Sekolah',
    village: 'Desa Pagutan',
    latitude: -8.62741539,
    longitude: 116.28294949,
    description: 'Kompleks pendidikan menengah atas dan madrasah tsanawiyah NW Pagutan.',
    address: 'Desa Pagutan'
  },
  {
    id: 'gis-19',
    name: 'TK PGRI Pagutan',
    category: 'Sekolah',
    village: 'Desa Pagutan',
    latitude: -8.62264610,
    longitude: 116.28868996,
    description: 'Sekolah pendidikan anak usia dini TK PGRI Pagutan.',
    address: 'Desa Pagutan'
  },
  {
    id: 'gis-20',
    name: 'SDI Babussalam Sangkawana',
    category: 'Sekolah',
    village: 'Desa Pagutan',
    latitude: -8.6392653,
    longitude: 116.2828199,
    description: 'Sekolah Dasar Islam Babussalam Sangkawana.',
    address: 'Dusun Sangkawana, Desa Pagutan'
  },
  {
    id: 'gis-21',
    name: 'Masjid Al Ijtihad Sangkawana',
    category: 'Masjid',
    village: 'Desa Pagutan',
    latitude: -8.6390160,
    longitude: 116.2829633,
    description: 'Sarana ibadah warga muslim Dusun Sangkawana.',
    address: 'Dusun Sangkawana, Desa Pagutan'
  },
  {
    id: 'gis-22',
    name: 'MA An Nazhar',
    category: 'Sekolah',
    village: 'Desa Pagutan',
    latitude: -8.62829771,
    longitude: 116.28530730,
    description: 'Madrasah Aliyah An Nazhar Desa Pagutan.',
    address: 'Desa Pagutan'
  },
  {
    id: 'gis-23',
    name: 'Puskesmas Pembantu Pagutan',
    category: 'Puskesmas',
    village: 'Desa Pagutan',
    latitude: -8.62795222,
    longitude: 116.28407908,
    description: 'Fasilitas kesehatan pembantu (Pustu) pelayanan medis warga Pagutan.',
    address: 'Desa Pagutan'
  }
];

// === Chart Data for WebGIS Dashboard ===

export const umkmChartData = [
  { name: 'Tenun', value: 18, color: '#8b5cf6' },
  { name: 'Anyaman Bambu', value: 12, color: '#10b981' },
  { name: 'Makanan', value: 14, color: '#f59e0b' },
  { name: 'Jasa', value: 7, color: '#3b82f6' },
  { name: 'Perdagangan', value: 5, color: '#ef4444' },
];

export const komoditasChartData = [
  { name: 'Padi', value: 480, satuan: 'Ha' },
  { name: 'Jagung', value: 85, satuan: 'Ha' },
  { name: 'Cabai', value: 42, satuan: 'Ha' },
  { name: 'Tomat', value: 35, satuan: 'Ha' },
  { name: 'Bawang', value: 28, satuan: 'Ha' },
  { name: 'Kopi', value: 15, satuan: 'Ha' },
];

export const risikoChartData = [
  { name: 'Banjir', value: 2, color: '#3b82f6' },
  { name: 'Longsor', value: 1, color: '#f97316' },
  { name: 'Gempa', value: 1, color: '#ef4444' },
  { name: 'Kekeringan', value: 1, color: '#eab308' },
];

export const mockApplications: AdministrativeApplication[] = [
  {
    id: 'app-1',
    applicationNumber: 'PGT-2026-0001',
    fullName: 'Lalu Muhamad Supriadi',
    nik: '5202041508920003',
    phoneNumber: '081912345678',
    email: 'supriadi@gmail.com',
    serviceType: 'Surat Keterangan Usaha',
    village: 'Desa Pagutan',
    address: 'Dusun Pagutan Dayah RT 02/RW 01',
    purpose: 'Persyaratan pengajuan kredit modal usaha UMKM di Bank NTB Syariah',
    status: 'Selesai',
    statusNotes: 'Surat telah ditandatangani Kepala Desa dan dapat diambil di loket pelayanan kantor desa.',
    createdAt: '2026-06-22T09:30:00Z',
    updatedAt: '2026-06-23T14:00:00Z'
  },
  {
    id: 'app-2',
    applicationNumber: 'PGT-2026-0002',
    fullName: 'Baiq Nurul Fitriani',
    nik: '5202045210950001',
    phoneNumber: '087865432109',
    email: 'nurul.fitri@yahoo.com',
    serviceType: 'Surat Keterangan Domisili',
    village: 'Desa Pagutan',
    address: 'Dusun Lombok Lauk RT 01',
    purpose: 'Melengkapi dokumen pendaftaran CPNS 2026',
    status: 'Diproses',
    statusNotes: 'Sedang dalam verifikasi kelengkapan berkas oleh Sekdes.',
    createdAt: '2026-06-26T11:15:00Z',
    updatedAt: '2026-06-27T08:20:00Z'
  },
  {
    id: 'app-3',
    applicationNumber: 'PGT-2026-0003',
    fullName: 'Amaq Sahnan',
    nik: '5202040101780005',
    phoneNumber: '085237890123',
    email: 'sahnan@gmail.com',
    serviceType: 'Surat Keterangan Tidak Mampu (SKTM)',
    village: 'Desa Pagutan',
    address: 'Dusun Pagutan Tengah',
    purpose: 'Permohonan beasiswa sekolah anak di SMAN 1 Batukliang',
    status: 'Menunggu',
    createdAt: '2026-06-29T10:00:00Z',
    updatedAt: '2026-06-29T10:00:00Z'
  }
];

export const mockGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) 2026',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    category: 'Pemerintahan',
    village: 'Desa Pagutan',
    date: '2026-05-15'
  },
  {
    id: 'gal-2',
    title: 'Pesta Panen Raya Padi Organik Subak Pagutan',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
    category: 'Pertanian',
    village: 'Desa Pagutan',
    date: '2026-06-02'
  },
  {
    id: 'gal-3',
    title: 'Festival Seni & Kerajinan Sasak Pagutan',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&q=80&w=800',
    category: 'Kebudayaan',
    village: 'Desa Pagutan',
    date: '2026-06-18'
  }
];

export const mockDownloads: DownloadItem[] = [
  {
    id: 'dl-1',
    title: 'Formulir Permohonan Surat Keterangan Usaha (SKU)',
    category: 'Formulir Layanan',
    fileSize: '245 KB',
    fileUrl: '#',
    downloadCount: 142,
    uploadedAt: '2026-01-10'
  },
  {
    id: 'dl-2',
    title: 'Formulir Permohonan Surat Keterangan Tidak Mampu (SKTM)',
    category: 'Formulir Layanan',
    fileSize: '210 KB',
    fileUrl: '#',
    downloadCount: 318,
    uploadedAt: '2026-01-10'
  },
  {
    id: 'dl-3',
    title: 'Peraturan Desa (Perdes) No. 03 Tahun 2025 Tentang Transparansi Anggaran',
    category: 'Peraturan Desa',
    fileSize: '1.2 MB',
    fileUrl: '#',
    downloadCount: 89,
    uploadedAt: '2025-12-01'
  }
];

export const mockFaq: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Berapa lama proses pembuatan Surat Keterangan Online?',
    answer: 'Proses verifikasi hingga penerbitan surat keterangan rata-rata membutuhkan waktu 1 - 2 hari kerja tergantung kelengkapan persyaratan dan ketersediaan verifikator.',
    category: 'Layanan'
  },
  {
    id: 'faq-2',
    question: 'Apakah ada biaya dalam pengurusan surat di Kantor Desa?',
    answer: 'Seluruh pelayanan administrasi kependudukan dan pembuatan surat keterangan di Kantor Desa Pagutan adalah GRATIS (Rp 0).',
    category: 'Layanan'
  },
  {
    id: 'faq-3',
    question: 'Bagaimana cara melacak status permohonan surat saya?',
    answer: 'Masuk ke menu Layanan Mandiri > Cek Status, lalu masukkan Nomor Permohonan resmi (contoh: PGT-2026-0001) yang Anda dapatkan saat menekan tombol kirim formulir.',
    category: 'Sistem'
  }
];
