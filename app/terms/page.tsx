import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      <Navbar />
      <div className="py-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold font-serif mb-8 text-gray-900">Syarat dan Ketentuan</h1>
        <div className="prose prose-pink max-w-none text-gray-600 space-y-6 text-sm md:text-base">
            <p>Terakhir diperbarui: {new Date().getFullYear()}</p>
            <p>Selamat datang di Happy Wedding. Harap membaca syarat dan ketentuan ini dengan saksama sebelum menggunakan layanan kami.</p>
            
            <h3 className="text-xl font-bold text-gray-800">1. Ketentuan Umum</h3>
            <p>Dengan mengakses website ini, Anda dianggap telah membaca, memahami, dan menyetujui semua isi dalam Syarat & Ketentuan ini.</p>
            
            <h3 className="text-xl font-bold text-gray-800">2. Layanan</h3>
            <p>Happy Wedding menyediakan platform pembuatan undangan digital berbasis website. Kami berhak mengubah atau menghentikan layanan sewaktu-waktu dengan pemberitahuan.</p>
            
            <h3 className="text-xl font-bold text-gray-800">3. Pembayaran</h3>
            <p>Layanan premium dikenakan biaya sesuai paket yang dipilih. Pembayaran yang sudah berhasil tidak dapat dikembalikan (non-refundable), kecuali terdapat kesalahan sistem dari pihak kami.</p>
            
            <h3 className="text-xl font-bold text-gray-800">4. Konten Pengguna</h3>
            <p>Anda bertanggung jawab penuh atas foto, teks, musik, dan data yang Anda unggah ke dalam undangan Anda. Kami tidak bertanggung jawab atas pelanggaran hak cipta yang dilakukan oleh pengguna.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}