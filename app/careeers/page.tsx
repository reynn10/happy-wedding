import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 p-20">
        <div className="bg-pink-50 p-6 rounded-full mb-6">
            <span className="text-4xl">🚀</span>
        </div>
        <h1 className="text-4xl font-bold font-serif text-gray-900 mb-4">Segera Hadir</h1>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
            Halaman ini sedang dalam tahap pengembangan. Kami sedang menyiapkan konten menarik untuk Anda.
        </p>
        <Link href="/" className="bg-pink-600 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-700 transition">
            Kembali ke Beranda
        </Link>
      </div>
      <Footer />
    </main>
  );
}