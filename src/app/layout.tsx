import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Smart Village Desa Pagutan & Desa Bujak | Kecamatan Batukliang Lombok Tengah",
  description: "Portal resmi Smart Village Desa Pagutan dan Desa Bujak. Layanan administrasi mandiri online, transparansi publik, potensi UMKM, pertanian, dan peta WebGIS digital.",
  keywords: ["Smart Village", "Desa Pagutan", "Desa Bujak", "Batukliang", "Lombok Tengah", "NTB", "Layanan Desa Online", "WebGIS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-slate-900 text-slate-200 antialiased">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
