import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      <Navbar />
      <div className="py-20 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-serif mb-6 text-gray-900">Hubungi Kami</h1>
        <p className="text-gray-600 mb-8 text-lg">Punya pertanyaan atau butuh bantuan? Tim kami siap membantu Anda.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-pink-50 p-8 rounded-2xl border border-pink-100">
                <h3 className="text-xl font-bold mb-4">Kantor Pusat</h3>
                <p className="mb-2">Gedung Happy Wedding Tower Lt. 12</p>
                <p className="mb-2">Jl. Sudirman No. 45, Jakarta Selatan</p>
                <p className="mb-6">Indonesia, 12190</p>
                
                <h3 className="text-xl font-bold mb-4">Kontak Langsung</h3>
                <p className="mb-2">Email: <a href="mailto:support@happywedding.com" className="text-pink-600 font-bold">support@happywedding.com</a></p>
                <p className="mb-2">WhatsApp: <span className="text-pink-600 font-bold">+62 812-3456-7890</span></p>
            </div>
            
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-bold mb-2">Nama Anda</label>
                    <input type="text" className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-pink-500" placeholder="Nama Lengkap"/>
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Email</label>
                    <input type="email" className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-pink-500" placeholder="email@anda.com"/>
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Pesan</label>
                    <textarea rows={4} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-pink-500" placeholder="Tulis pesan Anda disini..."></textarea>
                </div>
                <button className="bg-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-pink-700 w-full transition">Kirim Pesan</button>
            </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}