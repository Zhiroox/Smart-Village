import { QuickStats, NewsItem, VillageOfficial, PotensiItem, GisLocation, AdministrativeApplication, GalleryItem, DownloadItem, FaqItem } from '../types';

export const mockQuickStats: Record<'Desa Pagutan' | 'Desa Bujak' | 'Semua Desa', QuickStats> = {
  'Desa Pagutan': {
    population: 4850,
    dusunCount: 6,
    umkmCount: 42,
    farmlandArea: 285,
    tourismSpots: 3,
  },
  'Desa Bujak': {
    population: 5210,
    dusunCount: 7,
    umkmCount: 38,
    farmlandArea: 310,
    tourismSpots: 4,
  },
  'Semua Desa': {
    population: 10060,
    dusunCount: 13,
    umkmCount: 80,
    farmlandArea: 595,
    tourismSpots: 7,
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
    title: 'Pemerintah Desa Bujak Salurkan Bantuan Bibit Padi Unggul & Pupuk Organik',
    slug: 'penyaluran-bantuan-bibit-padi-unggul-bujak',
    summary: 'Kelompok tani di Desa Bujak menerima bantuan bibit padi sertifikasi prima dan fasilitas pendampingan teknologi pengairan.',
    content: `Desa Bujak, Batukliang - Guna mendukung ketahanan pangan nasional dan meningkatkan produktivitas hasil panen, Pemerintah Desa Bujak menyalurkan bantuan bibit padi unggul varietas Inpari beserta paket pupuk hayati organik kepada 12 kelompok tani yang tersebar di 7 dusun.

Program yang didanai melalui Alokasi Dana Desa (ADD) ini bertujuan untuk mengoptimalkan penggunaan lahan pertanian seluas 310 hektar di wilayah Desa Bujak. Pembagian bibit secara simbolis diserahkan langsung oleh Kepala Desa Bujak di Balai Pertanian Dusun Bujak Dayah.`,
    category: 'Pembangunan',
    village: 'Desa Bujak',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
    publishedAt: '2026-06-20',
    author: 'Sekretariat Desa Bujak'
  },
  {
    id: 'news-3',
    title: 'Gotong Royong Perbaikan Rute Evakuasi & Saluran Irigasi di Wilayah Batukliang',
    slug: 'gotong-royong-perbaikan-rute-evakuasi-irigasi',
    summary: 'Masyarakat Desa Pagutan dan Bujak bersinergi melakukan aksi gotong royong membersihkan drainase utama pencegah banjir.',
    content: `Kecamatan Batukliang - Menghadapi musim penghujan, warga Desa Pagutan dan Desa Bujak secara serentak menggelar aksi gotong royong perbaikan drainase serta perapihan jalan desa yang difungsikan sebagai jalur evakuasi bencana. Kegiatan ini diikuti oleh ratusan warga dari berbagai elemen masyarakat, mulai dari pemuda Karang Taruna hingga tokoh masyarakat.`,
    category: 'Kegiatan',
    village: 'Desa Pagutan',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800',
    publishedAt: '2026-06-14',
    author: 'Tim Liputan KKN'
  },
  {
    id: 'news-4',
    title: 'Pengumuman Pelayanan Administrasi Mandiri Berbasis Digital Smart Village',
    slug: 'pengumuman-pelayanan-administrasi-mandiri-digital',
    summary: 'Warga Desa Pagutan dan Bujak kini dapat mengajukan surat keterangan secara online sebelum memprosesnya di kantor desa.',
    content: `Batukliang - Dalam wujud modernisasi pelayanan publik, Pemerintah Desa Pagutan dan Bujak meluncurkan Portal Layanan Surat Online Mandiri. Warga cukup mengisikan formulir secara online dan mengecek status permohonan dengan nomor resi resmi.`,
    category: 'Pengumuman',
    village: 'Desa Bujak',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    publishedAt: '2026-06-10',
    author: 'Tim Smart Village'
  }
];

export const mockOfficials: VillageOfficial[] = [
  {
    id: 'off-1',
    name: 'H. Lalu Ahmad Subandi, S.IP',
    position: 'Kepala Desa Pagutan',
    village: 'Desa Pagutan',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    phone: '0812-3456-7890'
  },
  {
    id: 'off-2',
    name: 'M. Rosyidi, S.Pd',
    position: 'Sekretaris Desa Pagutan',
    village: 'Desa Pagutan',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'off-3',
    name: 'Siti Maryam, S.E',
    position: 'Kaur Keuangan Pagutan',
    village: 'Desa Pagutan',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'off-4',
    name: 'Drs. H. M. Zainuddin',
    position: 'Kepala Desa Bujak',
    village: 'Desa Bujak',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    phone: '0819-8765-4321'
  },
  {
    id: 'off-5',
    name: 'Lalu M. Zaini, S.H',
    position: 'Sekretaris Desa Bujak',
    village: 'Desa Bujak',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'off-6',
    name: 'Nurul Hidayah, A.Md',
    position: 'Kaur Perencanaan Bujak',
    village: 'Desa Bujak',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
  }
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
    name: 'Kerajinan Anyaman Bambu Bujak',
    category: 'UMKM',
    village: 'Desa Bujak',
    description: 'Produk anyaman bambu perabotan rumah tangga, tempat nasi, kap lampu ramah lingkungan berkualitas ekspor.',
    location: 'Dusun Bujak Dayah, Desa Bujak',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800'
    ],
    contactPerson: 'Pak Amaq Murni (0819-3344-5566)',
    priceOrYield: 'Rp 35.000 - Rp 300.000 / pcs'
  },
  {
    id: 'pot-3',
    name: 'Pertanian Padi Organik & Hortikultura Batukliang',
    category: 'Agriculture',
    village: 'Desa Pagutan',
    description: 'Hamparan sawah subur yang menghasilkan beras organik berkualitas tinggi serta tanaman sayur hortikultura seperti cabai dan tomat.',
    location: 'Area Persawahan Subak Pagutan',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
    gallery: ['https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800'],
    priceOrYield: 'Hasil Panen 6.5 Ton / Hektar'
  },
  {
    id: 'pot-4',
    name: 'Peternakan Sapi Bali & Kambing Etawa',
    category: 'Livestock',
    village: 'Desa Bujak',
    description: 'Sentra pembibitan sapi Bali unggulan dan budidaya kambing perah dengan pola pakan hijau lestari.',
    location: 'Dusun Bujak Lauk, Desa Bujak',
    imageUrl: 'https://images.unsplash.com/photo-1570042702808-585a86f46afe?auto=format&fit=crop&q=80&w=800',
    gallery: ['https://images.unsplash.com/photo-1570042702808-585a86f46afe?auto=format&fit=crop&q=80&w=800'],
    priceOrYield: 'Populasi ~450 Ekor'
  },
  {
    id: 'pot-5',
    name: 'Wisata Alam & Ekowisata Sawah Bujak',
    category: 'Tourism',
    village: 'Desa Bujak',
    description: 'Destinasi wisata edukasi persawahan dengan pemandangan lereng Gunung Rinjani yang membentang asri.',
    location: 'Jalan Raya Lantan-Bujak, Desa Bujak',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    gallery: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800'],
    contactPerson: 'Pokdarwis Bujak Asri'
  }
];

export const mockGisLocations: GisLocation[] = [
  {
    id: 'gis-1',
    name: 'Kantor Desa Pagutan',
    category: 'Kantor Desa',
    village: 'Desa Pagutan',
    latitude: -8.6254,
    longitude: 116.2812,
    description: 'Pusat pemerintahan dan pelayanan administrasi masyarakat Desa Pagutan.',
    address: 'Jl. Raya Pagutan No. 1, Kecamatan Batukliang, Lombok Tengah'
  },
  {
    id: 'gis-2',
    name: 'Kantor Desa Bujak',
    category: 'Kantor Desa',
    village: 'Desa Bujak',
    latitude: -8.6189,
    longitude: 116.2905,
    description: 'Pusat pemerintahan dan pelayanan publik Desa Bujak.',
    address: 'Jl. Raya Bujak Batukliang, Lombok Tengah'
  },
  {
    id: 'gis-3',
    name: 'Puskesmas Pembantu (Pustu) Pagutan',
    category: 'Puskesmas',
    village: 'Desa Pagutan',
    latitude: -8.6270,
    longitude: 116.2825,
    description: 'Fasilitas pelayanan kesehatan masyarakat dasar dan Posyandu.',
    address: 'Dusun Pagutan Dayah'
  },
  {
    id: 'gis-4',
    name: 'SD Negeri 1 Bujak',
    category: 'Sekolah',
    village: 'Desa Bujak',
    latitude: -8.6205,
    longitude: 116.2890,
    description: 'Sekolah Dasar Negeri 1 Bujak.',
    address: 'Jl. Pendidikan Bujak'
  },
  {
    id: 'gis-5',
    name: 'Masjid Jami\' Nurul Huda Pagutan',
    category: 'Masjid',
    village: 'Desa Pagutan',
    latitude: -8.6248,
    longitude: 116.2800,
    description: 'Masjid agung pusat kegiatan keagamaan Desa Pagutan.',
    address: 'Dusun Pagutan Tengah'
  },
  {
    id: 'gis-6',
    name: 'Sentra Tenun Sasak Pagutan',
    category: 'Wisata',
    village: 'Desa Pagutan',
    latitude: -8.6290,
    longitude: 116.2785,
    description: 'Galeri dan workshop pengrajin tenun tradisional.',
    address: 'Dusun Pagutan Lauk'
  },
  {
    id: 'gis-7',
    name: 'Ekowisata Persawahan Bujak Asri',
    category: 'Wisata',
    village: 'Desa Bujak',
    latitude: -8.6150,
    longitude: 116.2940,
    description: 'Kawasan spot foto dan agrowisata sawah.',
    address: 'Jalan Agrowisata Bujak'
  },
  {
    id: 'gis-8',
    name: 'Kawasan Rawan Luapan Sungai (Bencana)',
    category: 'Area Rawan Bencana',
    village: 'Desa Bujak',
    latitude: -8.6120,
    longitude: 116.2970,
    description: 'Titik waspada genangan air saat curah hujan sangat tinggi.',
    address: 'Bantaran Sungai Bujak Utara'
  },
  {
    id: 'gis-9',
    name: 'Posko Evakuasi Utama Balai Desa',
    category: 'Rute Evakuasi',
    village: 'Desa Pagutan',
    latitude: -8.6250,
    longitude: 116.2815,
    description: 'Titik kumpul darurat evakuasi bencana alam.',
    address: 'Lapangan Kantor Desa Pagutan'
  }
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
    applicationNumber: 'BJK-2026-0002',
    fullName: 'Baiq Nurul Fitriani',
    nik: '5202045210950001',
    phoneNumber: '087865432109',
    email: 'nurul.fitri@yahoo.com',
    serviceType: 'Surat Keterangan Domisili',
    village: 'Desa Bujak',
    address: 'Dusun Bujak Lauk RT 01',
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
    title: 'Pesta Panen Raya Padi Organik Subak Batukliang',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
    category: 'Pertanian',
    village: 'Desa Bujak',
    date: '2026-06-02'
  },
  {
    id: 'gal-3',
    title: 'Festival Seni & Kerajinan Sasak Batukliang',
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
    answer: 'Seluruh pelayanan administrasi kependudukan dan pembuatan surat keterangan di Kantor Desa Pagutan dan Desa Bujak adalah GRATIS (Rp 0).',
    category: 'Layanan'
  },
  {
    id: 'faq-3',
    question: 'Bagaimana cara melacak status permohonan surat saya?',
    answer: 'Masuk ke menu Layanan Mandiri > Cek Status, lalu masukkan Nomor Permohonan resmi (contoh: PGT-2026-0001) yang Anda dapatkan saat menekan tombol kirim formulir.',
    category: 'Sistem'
  }
];
