import type { Metadata, Viewport } from "next"; // Import Viewport
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import UseScrollEffects from "../components/UseScrollEffects";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

// 1. TAMBAHKAN INI: Pengaturan Viewport yang Benar
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Mencegah zoom otomatis yang berlebihan
  userScalable: false, // Opsional: Mencegah user zoom manual (agar terasa seperti aplikasi native)
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
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden`}>
        {/* Tambahkan overflow-x-hidden di body untuk mencegah scroll samping tidak sengaja */}
        
        <UseScrollEffects />
        
        {children}
      </body>
    </html>
  );
}