'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

interface DashboardData {
  userName: string;
  activeProject: {
    title: string;
    date: string;
    location: string;
    status: string;
    image: string;
  };
  stats: {
    totalGuests: number;
    confirmed: number;
    pending: number;
    declined: number;
  };
  recentGuests: any[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState("");
  
  const [data, setData] = useState<DashboardData>({
    userName: "Pengantin",
    activeProject: {
      title: "Wedding Invitation",
      date: "Belum disetting",
      location: "-",
      status: "Draft",
      image: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800"
    },
    stats: { totalGuests: 0, confirmed: 0, pending: 0, declined: 0 },
    recentGuests: []
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Selamat Pagi");
    else if (hour < 15) setGreeting("Selamat Siang");
    else if (hour < 18) setGreeting("Selamat Sore");
    else setGreeting("Selamat Malam");

    const initDashboard = async () => {
      setIsLoading(true);
      
      // 1. CEK USER LOGIN
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        // 2. AMBIL UNDANGAN MILIK USER INI
        const { data: invData } = await supabase
          .from('invitations')
          .select('*')
          .eq('user_id', user.id) // Filter by User ID
          .single();

        // 3. AMBIL TAMU MILIK USER INI
        const { data: guestData } = await supabase
          .from('guests')
          .select('*')
          .eq('user_id', user.id) // Filter by User ID
          .order('id', { ascending: false });

        const guests = guestData || [];
        const total = guests.length;
        const confirmCount = guests.filter(g => g.status === 'Hadir').length;
        const pendingCount = guests.filter(g => g.status === 'Pending').length;
        const declinedCount = guests.filter(g => g.status === 'Tidak Hadir').length;
        const recent = guests.slice(0, 3);

        // Nama User dari Metadata Auth atau Undangan
        const displayName = invData?.groom_name 
            ? invData.groom_name.split(' ')[0] 
            : user.user_metadata?.full_name || "Pengantin";

        setData({
          userName: displayName,
          activeProject: {
            title: invData ? `${invData.groom_name} & ${invData.bride_name}` : "Buat Undangan Baru",
            date: invData?.event_date || "Tanggal belum diatur",
            location: invData?.venue_name || "Lokasi belum diatur",
            status: invData ? "80% Siap" : "Draft",
            image: invData?.cover_photo || "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800"
          },
          stats: {
            totalGuests: total,
            confirmed: confirmCount,
            pending: pendingCount,
            declined: declinedCount
          },
          recentGuests: recent
        });

      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initDashboard();
  }, [router]);

  // --- HANDLERS ---
  const goToGuests = () => router.push('/dashboard/guests');
  const goToEdit = () => router.push('/dashboard/invitation');
  const openPreview = () => window.open('/invitation/demo', '_blank');
  const handleUpgrade = () => alert("Fitur ini tersedia di paket Exclusive!");

  if (isLoading) {
    return (
      <div className="space-y-8 p-4 animate-pulse">
        <div className="h-20 bg-gray-200 rounded-3xl w-full max-w-lg mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-56 bg-gray-200 rounded-[2.5rem]"></div>)}
        </div>
      </div>
    );
  }

  // ... (SISA KODE RENDER JSX TETAP SAMA SEPERTI YANG SEBELUMNYA)
  // Gunakan kode JSX yang sudah "Clean Luxury" dari jawaban sebelumnya di sini.
  // Saya hanya mengubah logika fetching data di atas.
  
  return (
    <div className="space-y-10 animate-fade-in-up font-sans text-gray-800">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
          <div>
              <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">Overview</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                  {greeting}, <br/>
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-600 to-purple-600">
                    {data.userName}.
                  </span>
              </h1>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 pr-6 rounded-full shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Status Acara</p>
                  <p className="text-sm font-bold text-gray-900">{data.activeProject.status}</p>
              </div>
          </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Total Tamu */}
          <div onClick={goToGuests} className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-pink-100 hover:shadow-xl hover:border-pink-200 transition-all duration-500 overflow-hidden h-56 flex flex-col justify-end cursor-pointer">
              <div className="absolute -bottom-6 -right-6 opacity-40 rotate-12 group-hover:rotate-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 ease-out text-pink-600">
                  <svg className="w-40 h-40" viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 9.5C8.5 9.5 8.5 12.5 8.5 13.5C8.5 14.8807 9.61929 16 11 16C12.3807 16 13.5 14.8807 13.5 13.5C13.5 12.5 13.5 9.5 13.5 9.5L14 3H8L8.5 9.5Z" opacity="0.5"/><path d="M11 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M8 21H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M15.5 9.5C15.5 9.5 15.5 12.5 15.5 13.5C15.5 14.8807 16.6193 16 18 16C19.3807 16 20.5 14.8807 20.5 13.5C20.5 12.5 20.5 9.5 20.5 9.5L21 3H15L15.5 9.5Z" opacity="0.5"/><path d="M18 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M15 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="11" cy="5" r="1" fill="currentColor"/><circle cx="18" cy="6" r="1" fill="currentColor"/></svg>
              </div>
              <div className="relative z-10">
                  <p className="text-pink-600/80 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Total Tamu</p>
                  <h3 className="text-5xl font-serif font-bold text-gray-900 group-hover:text-pink-600 transition-colors tracking-tight">{data.stats.totalGuests}</h3>
                  <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-50 text-pink-600 border border-pink-100">Terdaftar</div>
              </div>
          </div>
          {/* Card 2: Konfirmasi Hadir */}
          <div className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-emerald-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-500 overflow-hidden h-56 flex flex-col justify-end cursor-default">
              <div className="absolute -bottom-6 -right-6 opacity-40 rotate-12 group-hover:rotate-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 ease-out text-emerald-600">
                  <svg className="w-40 h-40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="relative z-10">
                  <p className="text-emerald-600/80 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Akan Hadir</p>
                  <h3 className="text-5xl font-serif font-bold text-gray-900 group-hover:text-emerald-600 transition-colors tracking-tight">{data.stats.confirmed}</h3>
                  <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">{data.stats.totalGuests > 0 ? Math.round((data.stats.confirmed / data.stats.totalGuests) * 100) : 0}% Confirm</div>
              </div>
          </div>
          {/* Card 3: Belum Respon */}
          <div className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-orange-100 hover:shadow-xl hover:border-orange-200 transition-all duration-500 overflow-hidden h-56 flex flex-col justify-end cursor-default">
              <div className="absolute -bottom-6 -right-6 opacity-40 rotate-12 group-hover:rotate-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 ease-out text-orange-600">
                  <svg className="w-40 h-40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="relative z-10">
                  <p className="text-orange-600/80 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Belum Respon</p>
                  <h3 className="text-5xl font-serif font-bold text-gray-900 group-hover:text-orange-600 transition-colors tracking-tight">{data.stats.pending}</h3>
                  <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-600 border border-orange-100">Menunggu</div>
              </div>
          </div>
      </div>

      {/* --- 3. ACTIVE PROJECT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-3 shadow-sm border border-gray-100 flex flex-col md:flex-row group hover:border-pink-100 transition-colors">
              <div onClick={openPreview} className="w-full md:w-2/5 h-64 md:h-auto relative rounded-4xl overflow-hidden cursor-pointer">
                  <Image src={data.activeProject.image} alt="Invitation Preview" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-6">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Active Theme</span>
                  </div>
              </div>
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  <div className="mb-auto">
                      <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Invitation</p>
                      </div>
                      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">{data.activeProject.title}</h2>
                      <p className="text-gray-500 text-sm">{data.activeProject.date} • {data.activeProject.location}</p>
                  </div>
                  <div className="mt-8 pt-8 border-t border-gray-50 grid grid-cols-2 gap-4">
                      <button onClick={goToEdit} suppressHydrationWarning={true} className="flex items-center justify-center gap-2 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transition shadow-lg hover:shadow-gray-200"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>Edit Konten</button>
                      <button onClick={openPreview} suppressHydrationWarning={true} className="flex items-center justify-center gap-2 w-full py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold text-sm hover:border-pink-500 hover:text-pink-600 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>Lihat Website</button>
                  </div>
              </div>
          </div>
          <div className="lg:col-span-1 bg-linear-to-br from-pink-600 to-purple-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full blur-[50px] -mr-10 -mt-10"></div>
              <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur border border-white/30 rounded-lg text-[10px] font-bold tracking-widest uppercase mb-4">Pro Tips</span>
                  <h3 className="text-2xl font-serif font-bold mb-2">Upgrade ke Exclusive?</h3>
                  <p className="text-pink-100 text-sm leading-relaxed">Dapatkan domain <strong>.com</strong> sendiri dan fitur check-in QR Code.</p>
              </div>
              <button onClick={handleUpgrade} suppressHydrationWarning={true} className="relative z-10 mt-8 w-full bg-white text-pink-700 py-3.5 rounded-xl font-bold text-sm hover:bg-pink-50 transition shadow-lg">Lihat Paket Exclusive</button>
          </div>
      </div>

      {/* --- 4. RECENT GUESTS (REAL DATA) --- */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-10">
          <div className="flex justify-between items-center mb-8">
              <div><h3 className="text-xl font-serif font-bold text-gray-900">Tamu Terbaru</h3><p className="text-sm text-gray-400 mt-1">Daftar tamu yang baru ditambahkan.</p></div>
              <Link href="/dashboard/guests" className="text-sm font-bold text-gray-900 border-b-2 border-gray-200 hover:border-pink-500 hover:text-pink-600 transition-all pb-0.5">Lihat Semua</Link>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead><tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100"><th className="pb-4 font-semibold pl-4">Nama Tamu</th><th className="pb-4 font-semibold">Nomor WA</th><th className="pb-4 font-semibold">Kategori</th><th className="pb-4 font-semibold text-right pr-4">Status</th></tr></thead>
                  <tbody className="text-sm text-gray-600">
                      {data.recentGuests.map((guest: any) => (
                          <tr key={guest.id} className="group hover:bg-stone-50 transition-colors">
                              <td className="py-4 pl-4 border-b border-gray-50 group-last:border-none"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-gray-500 font-bold text-xs group-hover:bg-white group-hover:shadow-sm transition">{guest.name.slice(0,2).toUpperCase()}</div><span className="font-bold text-gray-900">{guest.name}</span></div></td>
                              <td className="py-4 border-b border-gray-50 font-mono text-xs">{guest.phone}</td>
                              <td className="py-4 border-b border-gray-50"><span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500">{guest.category}</span></td>
                              <td className="py-4 pr-4 border-b border-gray-50 text-right"><span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${guest.status === 'Hadir' ? 'bg-green-50 text-green-700' : guest.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}>{guest.status}</span></td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>

    </div>
  );
}