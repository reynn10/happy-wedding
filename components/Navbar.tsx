'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  // Default State:
  // Jika di Home ('/'), default FALSE (Hilang dulu).
  // Jika di halaman lain, default TRUE (Muncul dulu).
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  const [isVisible, setIsVisible] = useState(!isHomePage); 
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Reset status saat pindah halaman
    setIsVisible(!isHomePage);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Tentukan batas ambang (Threshold)
      // Home: Tunggu lewat Hero (tinggi layar - 100px)
      // Halaman Lain: Langsung aktif setelah scroll dikit (50px)
      const threshold = isHomePage ? window.innerHeight - 100 : 50;

      // KONDISI 1: MASIH DI POSISI PALING ATAS (TOP)
      if (currentScrollY < threshold) {
        // Jika Home: Hilang (biar gambar Hero bersih)
        // Jika Lainnya: Muncul (biar menu terlihat)
        setIsVisible(!isHomePage);
      } 
      // KONDISI 2: SUDAH SCROLL JAUH (Dynamic Logic)
      else {
        // Cek Arah Scroll
        if (currentScrollY > lastScrollY.current) {
           // Scroll ke BAWAH -> TAMPIL
           setIsVisible(true);
        } else {
           // Scroll ke ATAS -> HILANG (Sesuai request Anda)
           setIsVisible(false);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    
    // Panggil sekali di awal untuk memastikan posisi benar saat refresh
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, pathname]); // Re-run effect jika halaman berubah

  return (
    <nav 
      className={`fixed w-full z-50 top-0 start-0 border-b border-white/20 bg-white/90 backdrop-blur-md transition-transform duration-500 ease-in-out shadow-sm
      ${isVisible ? 'translate-y-0' : '-translate-y-full'}`} 
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-3">
        
        {/* Logo Brand */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-bold whitespace-nowrap text-pink-600 font-serif">
            Happy Wedding
          </span>
        </Link>

        {/* Tombol Kanan */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-2">
          <Link href="/login">
            <button type="button" className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 text-center border border-gray-200 transition">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button type="button" className="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-full text-sm px-5 py-2.5 text-center shadow-md transition hover:-translate-y-0.5">
              Buat Undangan
            </button>
          </Link>
        </div>

        {/* Menu Tengah */}
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <Link href="/#beranda" className="block py-2 px-3 text-gray-900 rounded hover:text-pink-600 md:p-0 transition-colors">Beranda</Link>
            </li>
            <li>
              <Link href="/features" className="block py-2 px-3 text-gray-900 rounded hover:text-pink-600 md:p-0 transition-colors">Fitur</Link>
            </li>
            <li>
              <Link href="/themes" className="block py-2 px-3 text-gray-900 rounded hover:text-pink-600 md:p-0 transition-colors">Tema</Link>
            </li>
            <li>
              <Link href="/#harga" className="block py-2 px-3 text-gray-900 rounded hover:text-pink-600 md:p-0 transition-colors">Harga</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}