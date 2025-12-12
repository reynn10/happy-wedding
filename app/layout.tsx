import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from 'sonner';
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
      {/* FIX: Tambahkan suppressHydrationWarning={true} 
        Ini mencegah error saat ekstensi browser (seperti McAfee/LastPass) 
        menyuntikkan kode ke dalam body.
      */}
      <body 
        suppressHydrationWarning={true}
        className={`${inter.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden bg-[#fafaf9] min-h-screen`}
      >
        <Toaster position="top-center" richColors closeButton />
        
        <UseScrollEffects />
        
        {children}
      </body>
    </html>
  );
}