import type { Metadata, Viewport } from "next"; 
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import UseScrollEffects from "../components/UseScrollEffects";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

// 2. KONFIGURASI VIEWPORT (STANDAR AMAN)
// Kita menghapus 'maximumScale' dan 'userScalable: false'. 
// Ini membiarkan browser laptop mengatur zoom secara natural (native).
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
        // Hapus style text-size-adjust yang memaksa, biarkan browser desktop merender font secara default
      >
        
        {/* Efek Scroll Mewah (Lenis + AOS) */}
        <UseScrollEffects />
        
        {children}
      </body>
    </html>
  );
}