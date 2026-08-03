import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Smart Village Desa Pagutan | Kecamatan Batukliang Lombok Tengah",
  description: "Portal Desa Pagutan. Layanan administrasi mandiri online, transparansi publik, potensi UMKM, pertanian, dan peta WebGIS digital.",
  keywords: ["Smart Village", "Desa Pagutan", "Batukliang", "Lombok Tengah", "NTB", "Layanan Desa Online", "WebGIS"],
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
