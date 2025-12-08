import type { Metadata, Viewport } from "next"; // 1. Import Viewport
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import UseScrollEffects from "../components/UseScrollEffects";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

// 2. KONFIGURASI VIEWPORT (SANGAT PENTING UNTUK HP)
// Ini yang mencegah website terlihat "terlalu nge-zoom" atau teks raksasa di HP.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Mencegah browser zoom otomatis
  userScalable: false, // Opsional: Menonaktifkan cubit-zoom (biar terasa seperti aplikasi native)
  themeColor: "#fafaf9", // Menyamakan warna bar browser HP dengan background (Stone-50)
};

export const metadata: Metadata = {
  title: "Happy Wedding - Platform Undangan Digital",
  description: "Buat undangan pernikahan digital impianmu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      {/* 3. CLASS TAMBAHAN: 'overflow-x-hidden'
        Ini mencegah website bisa digeser ke kanan-kiri (scroll samping) yang tidak sengaja 
        membuat tampilan jadi kecil/rusak di HP.
      */}
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden bg-[#fafaf9]`}>
        
        {/* Efek Scroll Mewah (Lenis + AOS) */}
        <UseScrollEffects />
        
        {children}
      </body>
    </html>
  );
}