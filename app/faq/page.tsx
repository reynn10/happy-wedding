import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ'; // Reuse komponen FAQ

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      <Navbar />
      <div className="py-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-serif mb-6 text-center text-gray-900">Pertanyaan yang Sering Diajukan</h1>
        <p className="text-center text-gray-500 mb-12">Temukan jawaban cepat untuk pertanyaan Anda seputar Happy Wedding.</p>
        
        {/* Kita panggil komponen FAQ yang sudah ada */}
        <FAQ />
        
        <div className="mt-12 text-center bg-gray-50 p-8 rounded-2xl">
            <p className="font-bold text-gray-700 mb-2">Masih punya pertanyaan lain?</p>
            <p className="text-gray-500 mb-4 text-sm">Tim support kami siap menjawab semua keraguan Anda.</p>
            <a href="/contact" className="text-pink-600 font-bold hover:underline">Hubungi Kami &rarr;</a>
        </div>
      </div>
      <Footer />
    </main>
  );
}