'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Hook untuk navigasi programatis

// --- DATA DUMMY (Simulasi Database) ---
const initialData = {
  user: { name: "Romeo Putra", plan: "Free" },
  stats: {
    totalGuests: 450,
    newGuests: 12,
    confirmed: 290,
    pending: 150,
    wishes: 85,
    newWishes: 8
  },
  activeProject: {
    title: "The Wedding of Romeo & Juliet",
    date: "Minggu, 12 Desember 2025",
    location: "Grand Hotel Ballroom",
    status: "80% Siap",
    image: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800"
  },
  recentGuests: [
    { id: 1, name: "Budi Santoso", phone: "0812 3456 7890", category: "Keluarga", status: "Hadir" },
    { id: 2, name: "Siti Aminah", phone: "0812 9876 5432", category: "Teman", status: "Pending" },
    { id: 3, name: "Dimas Pratama", phone: "0813 5555 6666", category: "VIP", status: "Tidak Hadir" },
  ]
};

export default function DashboardPage() {
  const router = useRouter(); // Inisialisasi Router
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Logic Sapaan Waktu
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Selamat Pagi");
    else if (hour < 15) setGreeting("Selamat Siang");
    else if (hour < 18) setGreeting("Selamat Sore");
    else setGreeting("Selamat Malam");

    // Simulasi Loading Data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Loading sebentar biar terasa "aplikasi beneran"

    return () => clearTimeout(timer);
  }, []);

  // --- ACTION HANDLERS ---
  
  const handlePreview = () => {
    // Buka tab baru ke halaman demo
    window.open('/invitation/demo', '_blank');
  };

  const handleEdit = () => {
    // Pindah ke halaman edit
    router.push('/dashboard/invitation');
  };

  const handleAddGuest = () => {
    // Pindah ke halaman tamu
    router.push('/dashboard/guests');
  };

  const handleUpgrade = () => {
    alert("Mengarahkan ke halaman pembayaran paket Exclusive...");
  };

  // SKELETON LOADING
  if (isLoading) {
    return (
      <div className="space-y-8 p-4 animate-pulse">
        <div className="flex justify-between items-end">
            <div className="space-y-3 w-1/2">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-10 bg-gray-200 rounded w-full max-w-md"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded-full w-32"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-56 bg-gray-200 rounded-[2.5rem]"></div>)}
        </div>
        <div className="h-64 bg-gray-200 rounded-[2.5rem]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in-up font-sans text-gray-800 pb-20">
      
      {/* --- 1. HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
          <div>
              <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">Overview</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                  {greeting}, <br/>
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-600 to-purple-600">
                    {initialData.user.name}.
                  </span>
              </h1>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 pr-6 rounded-full shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Status Acara</p>
                  <p className="text-sm font-bold text-gray-900">{initialData.activeProject.status}</p>
              </div>
          </div>
      </div>

      {/* --- 2. STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Total Tamu (Clickable -> ke Guest Book) */}
          <div onClick={handleAddGuest} className="group relative cursor-pointer bg-white rounded-[2.5rem] p-8 shadow-sm border border-pink-100 hover:shadow-xl hover:border-pink-200 transition-all duration-500 overflow-hidden h-56 flex flex-col justify-end">
              <div className="absolute -bottom-6 -right-6 opacity-10 rotate-12 group-hover:rotate-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 ease-out text-pink-600">
                  <svg className="w-40 h-40" viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 9.5C8.5 9.5 8.5 12.5 8.5 13.5C8.5 14.8807 9.61929 16 11 16C12.3807 16 13.5 14.8807 13.5 13.5C13.5 12.5 13.5 9.5 13.5 9.5L14 3H8L8.5 9.5Z" opacity="0.5"/><path d="M11 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M8 21H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M15.5 9.5C15.5 9.5 15.5 12.5 15.5 13.5C15.5 14.8807 16.6193 16 18 16C19.3807 16 20.5 14.8807 20.5 13.5C20.5 12.5 20.5 9.5 20.5 9.5L21 3H15L15.5 9.5Z" opacity="0.5"/><path d="M18 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M15 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="11" cy="5" r="1" fill="currentColor"/><circle cx="18" cy="6" r="1" fill="currentColor"/></svg>
              </div>
              <div className="relative z-10">
                  <p className="text-pink-600/80 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Total Tamu</p>
                  <h3 className="text-5xl font-serif font-bold text-gray-900 group-hover:text-pink-600 transition-colors tracking-tight">{initialData.stats.totalGuests}</h3>
                  <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-50 text-pink-600 border border-pink-100">+{initialData.stats.newGuests} Baru</div>
              </div>
          </div>

          {/* Konfirmasi Hadir */}
          <div className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-emerald-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-500 overflow-hidden h-56 flex flex-col justify-end">
              <div className="absolute -bottom-6 -right-6 opacity-10 rotate-12 group-hover:rotate-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 ease-out text-emerald-600">
                  <svg className="w-40 h-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="relative z-10">
                  <p className="text-emerald-600/80 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Akan Hadir</p>
                  <h3 className="text-5xl font-serif font-bold text-gray-900 group-hover:text-emerald-600 transition-colors tracking-tight">{initialData.stats.confirmed}</h3>
                  <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">65% Confirm</div>
              </div>
          </div>

          {/* Ucapan Masuk */}
          <div className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-purple-100 hover:shadow-xl hover:border-purple-200 transition-all duration-500 overflow-hidden h-56 flex flex-col justify-end">
              <div className="absolute -bottom-6 -right-6 opacity-10 rotate-12 group-hover:rotate-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 ease-out text-purple-600">
                  <svg className="w-40 h-40" viewBox="0 0 24 24" fill="currentColor"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
              </div>
              <div className="relative z-10">
                  <p className="text-purple-100/90 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Ucapan & Doa</p>
                  <h3 className="text-5xl font-serif font-bold text-gray-900 group-hover:text-purple-600 transition-colors tracking-tight">{initialData.stats.wishes}</h3>
                  <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-600 border border-purple-100">{initialData.stats.newWishes} Pesan Baru</div>
              </div>
          </div>

      </div>

      {/* --- 3. ACTIVE PROJECT (Link Fungsional) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-3 shadow-sm border border-gray-100 flex flex-col md:flex-row group hover:border-pink-100 transition-colors">
              <div className="w-full md:w-2/5 h-64 md:h-auto relative rounded-4xl overflow-hidden cursor-pointer" onClick={handlePreview}>
                  <Image 
                    src={initialData.activeProject.image} 
                    alt="Invitation Preview" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-6">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                          Active Theme
                      </span>
                  </div>
              </div>

              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  <div className="mb-auto">
                      <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Invitation</p>
                      </div>
                      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">{initialData.activeProject.title}</h2>
                      <p className="text-gray-500 text-sm">{initialData.activeProject.date} • {initialData.activeProject.location}</p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-50 grid grid-cols-2 gap-4">
                      <button onClick={handleEdit} className="flex items-center justify-center gap-2 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transition shadow-lg hover:shadow-gray-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          Edit Konten
                      </button>
                      <button onClick={handlePreview} className="flex items-center justify-center gap-2 w-full py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold text-sm hover:border-pink-500 hover:text-pink-600 transition">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                          Lihat Website
                      </button>
                  </div>
              </div>
          </div>

          {/* Side Widget (CTA Upgrade) */}
          <div className="lg:col-span-1 bg-linear-to-br from-pink-600 to-purple-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full blur-[50px] -mr-10 -mt-10"></div>
              
              <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur border border-white/30 rounded-lg text-[10px] font-bold tracking-widest uppercase mb-4">Pro Tips</span>
                  <h3 className="text-2xl font-serif font-bold mb-2">Upgrade ke Exclusive?</h3>
                  <p className="text-pink-100 text-sm leading-relaxed">
                      Dapatkan domain <strong>.com</strong> sendiri dan fitur check-in QR Code.
                  </p>
              </div>
              
              <button onClick={handleUpgrade} className="relative z-10 mt-8 w-full bg-white text-pink-700 py-3.5 rounded-xl font-bold text-sm hover:bg-pink-50 transition shadow-lg">
                  Lihat Paket Exclusive
              </button>
          </div>

      </div>

      {/* --- 4. RECENT GUESTS (Link ke Detail) --- */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-10">
          <div className="flex justify-between items-center mb-8">
              <div>
                  <h3 className="text-xl font-serif font-bold text-gray-900">Tamu Terbaru</h3>
                  <p className="text-sm text-gray-400 mt-1">Daftar tamu yang baru ditambahkan.</p>
              </div>
              <Link href="/dashboard/guests" className="text-sm font-bold text-gray-900 border-b-2 border-gray-200 hover:border-pink-500 hover:text-pink-600 transition-all pb-0.5">Lihat Semua</Link>
          </div>
          
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
                          <th className="pb-4 font-semibold pl-4">Nama Tamu</th>
                          <th className="pb-4 font-semibold">Nomor WA</th>
                          <th className="pb-4 font-semibold">Kategori</th>
                          <th className="pb-4 font-semibold text-right pr-4">Status</th>
                      </tr>
                  </thead>
                  <tbody className="text-sm text-gray-600">
                      {initialData.recentGuests.map((guest) => (
                          <tr key={guest.id} className="group hover:bg-stone-50 transition-colors">
                              <td className="py-4 pl-4 border-b border-gray-50 group-last:border-none">
                                  <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-gray-500 font-bold text-xs group-hover:bg-white group-hover:shadow-sm transition">
                                          {guest.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                      </div>
                                      <span className="font-bold text-gray-900">{guest.name}</span>
                                  </div>
                              </td>
                              <td className="py-4 border-b border-gray-50 font-mono text-xs">{guest.phone}</td>
                              <td className="py-4 border-b border-gray-50">
                                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500">
                                      {guest.category}
                                  </span>
                              </td>
                              <td className="py-4 pr-4 border-b border-gray-50 text-right">
                                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${guest.status === 'Hadir' ? 'bg-green-50 text-green-700' : guest.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}>
                                      <span className={`w-1.5 h-1.5 rounded-full ${guest.status === 'Hadir' ? 'bg-green-500' : guest.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                                      {guest.status}
                                  </span>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>

    </div>
  );
}