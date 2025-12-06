import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import UseScrollEffects from "@/components/UseScrollEffects"; 

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

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
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        
        {/* 2. Pasang di sini */}
        <UseScrollEffects />
        
        {children}
      </body>
    </html>
  );
}