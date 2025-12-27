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

// --- KOMPONEN CTA (Agar bisa direuse) ---
const CTACard = () => (
  <div className="bg-gray-900 rounded-[2.5rem] p-8 text-center relative overflow-hidden shadow-2xl group border border-gray-800">
    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
    <div className="absolute -top-24 -left-24 w-64 h-64 bg-pink-600 rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
    
    <div className="relative z-10">
        <h3 className="text-2xl font-serif font-bold text-white mb-3">Siap Menggunakan?</h3>
        <p className="text-gray-400 text-xs mb-6 max-w-xs mx-auto leading-relaxed">Nikmati kemudahan fitur ini di pernikahan impian Anda.</p>
        
        <div className="flex flex-col gap-3">
            <Link href="/register" className="w-full bg-white text-gray-900 px-6 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-pink-50 transition shadow-lg flex items-center justify-center gap-3">
                Coba Gratis Sekarang
            </Link>
            <Link href="/features" className="w-full bg-transparent border border-gray-600 text-white px-6 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase hover:border-white transition flex items-center justify-center gap-2">
                Lihat Fitur Lain
            </Link>
        </div>
    </div>
  </div>
);

export default async function FeatureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = featuresData[slug];

  if (!data) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 font-sans text-gray-800 selection:bg-pink-100 selection:text-pink-600 overflow-x-hidden">
      <Navbar />

      {/* Background Blobs (Soft Luxury) */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-pink-100/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-purple-100/40 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28">
        
        {/* Breadcrumb */}
        <div className="mb-12">
            <Link href="/#fitur" className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-gray-400 hover:text-pink-600 transition-colors uppercase group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Kembali ke Menu
            </Link>
        </div>

        {/* --- GRID UTAMA --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            
            {/* --- LEFT COLUMN: STICKY VISUAL & ACTION --- */}
            <div className="lg:sticky lg:top-32 order-1 flex flex-col gap-8">
                
                {/* 1. Image Card */}
                <div className="relative">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-linear-to-br from-pink-200 to-transparent rounded-full opacity-50 blur-2xl"></div>
                    <div className="relative aspect-4/5 w-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
                        <Image 
                            src={data.image} 
                            alt={data.title} 
                            fill 
                            className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                        <div className="absolute bottom-10 left-8 right-8 text-white">
                            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-2 text-pink-200 opacity-90">Feature Highlight</p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-4">{data.title}</h1>
                            <div className="w-20 h-1.5 bg-pink-500 rounded-full"></div>
                        </div>
                    </div>
                    <div className="absolute -bottom-8 -right-8 bg-white p-5 rounded-[2.5rem] shadow-xl border border-stone-100 animate-bounce-slow hidden md:block">
                       <div className="w-14 h-14 bg-pink-50 rounded-3xl flex items-center justify-center text-pink-600">
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                       </div>
                    </div>
                </div>

                {/* 2. CTA Box (DESKTOP ONLY) */}
                <div className="hidden lg:block">
                   <CTACard />
                </div>

            </div>

            {/* --- RIGHT COLUMN: CONTENT DETAIL --- */}
            <div className="pt-4 lg:pt-8 order-2">
                
                {/* Intro */}
                <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight mb-8">
                    {data.subtitle}
                </h2>
                
                <blockquote className="text-lg md:text-xl text-gray-500 leading-relaxed font-light mb-12 border-l-4 border-pink-200 pl-8 italic">
                    "{data.description}"
                </blockquote>

                <div className="w-full h-px bg-stone-200 mb-12"></div>

                {/* Benefits List (Editorial Numbering) */}
                <div className="space-y-12">
                    {data.benefits.map((item: any, idx: number) => (
                        <div key={idx} className="group flex gap-6 md:gap-8 items-start">
                            <span className="font-serif text-5xl md:text-6xl text-stone-200 font-bold group-hover:text-pink-200 transition-colors duration-500 -mt-2 leading-none select-none shrink-0">
                                0{idx + 1}
                            </span>
                            <div className="pt-2">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. CTA Box (MOBILE ONLY) - Tampil di bawah konten */}
                <div className="block lg:hidden mt-16">
                   <CTACard />
                </div>

            </div>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}