'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation'; // 1. Import ini untuk deteksi ganti halaman
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lenis from 'lenis';

export default function UseScrollEffects() {
  const pathname = usePathname(); // 2. Ambil URL halaman saat ini

  useEffect(() => {
    // --- SETUP AWAL ---
    const lenis = new Lenis({
      duration: 1.5, // Sedikit dipercepat agar responsif
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Init AOS
    AOS.init({
      duration: 1000,
      once: false, // Biarkan animasi main lagi saat scroll ke atas/bawah
      offset: 50,
      easing: 'ease-out-quart',
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // --- LOGIC TAMBAHAN: REFRESH SAAT GANTI HALAMAN ---
  useEffect(() => {
    // Setiap kali 'pathname' berubah (ganti halaman), kita refresh AOS
    // Beri sedikit delay agar konten baru selesai di-render dulu
    setTimeout(() => {
      AOS.refresh(); 
    }, 500); 
  }, [pathname]);

  return null;
}