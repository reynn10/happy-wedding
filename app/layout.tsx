import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from 'sonner'; // 1. Import Toaster
import "./globals.css";
import UseScrollEffects from "../components/UseScrollEffects";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fafaf9",
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
      <body 
        className={`${inter.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden bg-[#fafaf9] min-h-screen`}
      >
        {/* 2. Pasang Toaster di sini */}
        {/* richColors membuat warna notifikasi lebih hidup (Hijau/Merah) */}
        <Toaster position="top-center" richColors closeButton />
        
        <UseScrollEffects />
        
        {children}
      </body>
    </html>
  );
}