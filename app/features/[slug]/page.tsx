import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// --- DATABASE KONTEN FITUR ---
const featuresData: Record<string, any> = {
  'whatsapp': {
    title: "WhatsApp Blast Otomatis",
    subtitle: "Kirim Undangan Personal Tanpa Ribet",
    description: "Teknologi pengiriman pesan cerdas yang memungkinkan Anda mengirim ratusan undangan hanya dengan sekali klik, namun tetap terasa personal bagi setiap tamu.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000",
    benefits: [
      { title: "Personalisasi Nama", desc: "Sistem otomatis mengganti 'Bapak/Ibu' dengan nama asli tamu di setiap pesan." },
      { title: "Anti-Banned System", desc: "Algoritma pengiriman bertahap (delay cerdas) agar nomor WA Anda aman dari blokir." },
      { title: "Import Data Excel", desc: "Punya 500 tamu? Cukup upload file Excel, sistem akan membaca nomornya otomatis." },
      { title: "Laporan Real-time", desc: "Lihat siapa saja yang pesan-nya sudah terkirim, diterima, atau gagal." }
    ]
  },
  'rsvp': {
    title: "Smart RSVP Dashboard",
    subtitle: "Manajemen Tamu Undangan Digital",
    description: "Ucapkan selamat tinggal pada catatan kertas yang berantakan. Pantau konfirmasi kehadiran tamu secara real-time dan akurat.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
    benefits: [
      { title: "Status Kehadiran", desc: "Tamu bisa memilih: Hadir, Tidak Hadir, atau Masih Ragu." },
      { title: "Jumlah Pax", desc: "Tamu dapat memasukkan berapa anggota keluarga yang akan dibawa." },
      { title: "Export Data", desc: "Unduh data kehadiran ke format Excel/PDF untuk diserahkan ke pihak Katering." },
      { title: "QR Code Check-in", desc: "Fitur check-in tamu di lokasi acara menggunakan scan QR Code (Paket Exclusive)." }
    ]
  },
  'gift': {
    title: "Cashless Wedding Gift",
    subtitle: "Solusi Angpao Digital Modern",
    description: "Memudahkan tamu yang berhalangan hadir atau yang lebih nyaman dengan transaksi non-tunai untuk tetap memberikan tanda kasih.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000",
    benefits: [
      { title: "Multi-Bank & E-Wallet", desc: "Mendukung BCA, Mandiri, BRI, GoPay, OVO, Dana, dan lainnya." },
      { title: "Copy Rekening Instan", desc: "Tombol salin otomatis memudahkan tamu transfer tanpa salah ketik." },
      { title: "QRIS Ready", desc: "Tampilkan QRIS statis Anda agar tamu cukup scan untuk mengirim hadiah." },
      { title: "Privasi Terjaga", desc: "Nomor rekening aman dan hanya tampil di dalam undangan resmi." }
    ]
  },
  'location': {
    title: "Peta Navigasi Akurat",
    subtitle: "Panduan Lokasi Anti Nyasar",
    description: "Pastikan tamu undangan sampai di lokasi acara tepat waktu dengan integrasi peta digital yang presisi dan mudah digunakan.",
    image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1000",
    benefits: [
      { title: "Google Maps Integration", desc: "Tombol langsung yang membuka aplikasi Google Maps dengan titik koordinat presisi." },
      { title: "Multi-Venue", desc: "Dukungan untuk lokasi Akad dan Resepsi yang berbeda dalam satu undangan." },
      { title: "Estimasi Waktu", desc: "Tamu dapat melihat estimasi waktu tempuh dari lokasi mereka saat ini." },
      { title: "Tampilan Elegan", desc: "Peta ditampilkan dengan desain yang rapi dan tidak merusak estetika undangan." }
    ]
  }
};

// --- KOMPONEN UTAMA HALAMAN ---
// Ini yang sebelumnya hilang. Next.js butuh export default function ini.
export default async function FeatureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Ambil slug dari params (Async untuk Next.js terbaru)
  const { slug } = await params;
  
  // 2. Cari data di database lokal kita
  const data = featuresData[slug];

  // 3. Jika slug tidak ada (misal /features/ngawur), tampilkan 404
  if (!data) {
    return notFound();
  }

  // 4. Render Tampilan
  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* --- HERO HEADER --- */}
      <section className="pt-32 pb-20 px-6 bg-stone-50 text-center relative overflow-hidden">
         <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="max-w-4xl mx-auto relative z-10">
            <p className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-4">Fitur Unggulan</p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 font-serif mb-6">{data.title}</h1>
            <p className="text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto">{data.subtitle}</p>
         </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
              
              {/* Gambar Utama (Visual Mewah) */}
              <div className="relative w-full h-[300px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl mb-20 group">
                  <Image 
                    src={data.image} 
                    alt={data.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>

              {/* Penjelasan & Grid Benefit */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  
                  {/* Kolom Kiri: Deskripsi Utama */}
                  <div className="md:col-span-1">
                      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Cara Kerja</h3>
                      <p className="text-gray-600 leading-relaxed mb-8">
                          {data.description}
                      </p>
                      <Link href="/login" className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-600 transition shadow-lg">
                          Coba Sekarang
                      </Link>
                  </div>

                  {/* Kolom Kanan: Grid Benefit */}
                  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {data.benefits.map((benefit: any, index: number) => (
                          <div key={index} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition hover:border-pink-200 group">
                              <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center text-pink-600 mb-4 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                                  <span className="font-bold font-serif">{index + 1}</span>
                              </div>
                              <h4 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h4>
                              <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
                          </div>
                      ))}
                  </div>

              </div>
          </div>
      </section>

      {/* --- NAVIGATION FOOTER --- */}
      <section className="py-20 bg-pink-600 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
          <div className="relative z-10">
              <h2 className="text-3xl font-serif font-bold mb-6">Mulai Gunakan Fitur Ini</h2>
              <div className="flex justify-center gap-4">
                  <Link href="/register" className="bg-white text-pink-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-xl">
                      Buat Akun Gratis
                  </Link>
                  <Link href="/features" className="bg-transparent border border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition">
                      Kembali ke Menu
                  </Link>
              </div>
          </div>
      </section>

      <Footer />
    </main>
  );
}