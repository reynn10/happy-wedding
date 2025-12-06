import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      <Navbar />
      <div className="py-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold font-serif mb-8 text-gray-900">Kebijakan Privasi</h1>
        <div className="prose prose-pink max-w-none text-gray-600 space-y-6 text-sm md:text-base">
            <p>Privasi Anda sangat penting bagi kami. Dokumen ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.</p>
            
            <h3 className="text-xl font-bold text-gray-800">1. Data yang Kami Kumpulkan</h3>
            <p>Kami mengumpulkan data yang Anda berikan saat mendaftar, seperti nama, email, dan nomor telepon. Kami juga menyimpan data undangan yang Anda buat, termasuk foto dan daftar tamu.</p>
            
            <h3 className="text-xl font-bold text-gray-800">2. Penggunaan Data</h3>
            <p>Data Anda digunakan semata-mata untuk keperluan operasional layanan undangan digital, pemrosesan pembayaran, dan komunikasi terkait layanan.</p>
            
            <h3 className="text-xl font-bold text-gray-800">3. Keamanan Data</h3>
            <p>Kami menggunakan enkripsi standar industri untuk melindungi data sensitif Anda. Kami tidak akan menjual data pribadi Anda kepada pihak ketiga.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}