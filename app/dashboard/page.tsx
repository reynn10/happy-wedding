'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import StatsCards from './components/StatsCards'; 

// --- TIPE DATA ---
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
  
  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1170&auto=format&fit=crop";

  const [data, setData] = useState<DashboardData>({
    userName: "Pengantin",
    activeProject: {
      title: "Wedding Invitation",
      date: "Belum disetting",
      location: "-",
      status: "Draft",
      image: DEFAULT_IMAGE
    },
    stats: { totalGuests: 0, confirmed: 0, pending: 0, declined: 0 },
    recentGuests: []
  });

  // --- FETCH DATA ---
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Selamat Pagi");
    else if (hour < 15) setGreeting("Selamat Siang");
    else if (hour < 18) setGreeting("Selamat Sore");
    else setGreeting("Selamat Malam");

    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push('/login');
            return;
        }

        const { data: invData } = await supabase.from('invitations').select('*').eq('user_id', user.id).single();
        const { data: guestData } = await supabase.from('guests').select('*').eq('user_id', user.id).order('id', { ascending: false });

        const guests = guestData || [];
        
        setData({
          userName: invData ? invData.groom_name.split(' ')[0] : (user.user_metadata?.full_name || "Pengantin"),
          activeProject: {
            title: invData ? `${invData.groom_name} & ${invData.bride_name}` : "Buat Undangan Baru",
            date: invData?.event_date || "Tanggal belum diatur",
            location: invData?.venue_name || "Lokasi belum diatur",
            status: invData ? "80% Siap" : "Draft",
            image: invData?.cover_photo || DEFAULT_IMAGE
          },
          stats: {
            totalGuests: guests.length,
            confirmed: guests.filter(g => g.status === 'Hadir').length,
            pending: guests.filter(g => g.status === 'Pending').length,
            declined: guests.filter(g => g.status === 'Tidak Hadir').length
          },
          recentGuests: guests.slice(0, 5) // Ambil 5 tamu terbaru agar tabel lebih bermanfaat
        });

      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  // Handlers
  const goToEdit = () => router.push('/dashboard/invitation');
  const openPreview = () => window.open('/invitation/demo', '_blank');
  const handleUpgrade = () => alert("Fitur ini tersedia di paket Exclusive!");

  if (isLoading) return <div className="p-10 text-center text-gray-400 animate-pulse">Memuat Dashboard...</div>;

  return (
    <div className="space-y-10 animate-fade-in-up font-sans text-gray-800">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
          <div>
              <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">Overview</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                  {greeting}, <br/>
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-600 to-purple-600">{data.userName}.</span>
              </h1>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 pr-6 rounded-full shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
              </div>
              <div><p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Status Acara</p><p className="text-sm font-bold text-gray-900">{data.activeProject.status}</p></div>
          </div>
      </div>

      {/* STATS  */}
      <StatsCards stats={data.stats} />

      {/* LAYOUT GRID: Active Project & Promo Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- ACTIVE PROJECT CARD (2/3 Lebar) --- */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-3 shadow-sm border border-gray-100 flex flex-col md:flex-row group hover:border-pink-100 transition-colors">
              <div onClick={openPreview} className="w-full md:w-2/5 h-64 md:h-auto relative rounded-4xl overflow-hidden cursor-pointer">
                  <img 
                    src={data.activeProject.image} 
                    alt="Invitation Preview" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">{data.activeProject.title}</h2>
                      <p className="text-gray-500 text-sm">{data.activeProject.date} • {data.activeProject.location}</p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-50 grid grid-cols-2 gap-4">
                      <button onClick={goToEdit} className="flex items-center justify-center gap-2 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transition shadow-lg hover:shadow-gray-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          Edit Konten
                      </button>
                      <button onClick={openPreview} className="flex items-center justify-center gap-2 w-full py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold text-sm hover:border-pink-500 hover:text-pink-600 transition">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                          Lihat Website
                      </button>
                  </div>
              </div>
          </div>
          
          {/* --- SIDE WIDGET (1/3 Lebar) --- */}
          <div className="lg:col-span-1">
             <div className="bg-linear-to-br from-pink-600 to-purple-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl h-full flex flex-col justify-between">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur border border-white/30 rounded-lg text-[10px] font-bold tracking-widest uppercase mb-4">Pro Tips</span>
                    <h3 className="text-xl font-serif font-bold mb-2">Upgrade ke Exclusive?</h3>
                    <p className="text-sm text-pink-100 opacity-90 leading-relaxed">Dapatkan domain .com sendiri, hapus watermark, dan fitur Check-in QR Code.</p>
                </div>
                <button onClick={() => alert("Fitur Premium")} className="relative z-10 mt-6 w-full bg-white text-pink-700 py-3 rounded-xl font-bold text-sm hover:bg-pink-50 transition shadow-lg">Lihat Paket</button>
             </div>
          </div>
      </div>

      {/* --- RECENT GUESTS (FULL WIDTH - KEMBALI BESAR) --- */}
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
                        <th className="pb-4 font-semibold pl-4">Nama</th>
                        <th className="pb-4 font-semibold">Nomor WA</th>
                        <th className="pb-4 font-semibold">Kategori</th>
                        <th className="pb-4 font-semibold text-right pr-4">Status</th>
                    </tr>
                </thead>
                <tbody className="text-sm text-gray-600">
                    {data.recentGuests.length === 0 ? (
                      <tr><td colSpan={4} className="text-center py-8 text-gray-400">Belum ada tamu</td></tr>
                    ) : (
                      data.recentGuests.map((guest: any) => (
                        <tr key={guest.id} className="group hover:bg-stone-50 transition-colors">
                            <td className="py-4 pl-4 border-b border-gray-50 group-last:border-none">
                                <span className="font-bold text-gray-900">{guest.name}</span>
                            </td>
                            <td className="py-4 border-b border-gray-50 font-mono text-xs">{guest.phone || "-"}</td>
                            <td className="py-4 border-b border-gray-50">
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500">{guest.category || "Umum"}</span>
                            </td>
                            <td className="py-4 pr-4 border-b border-gray-50 text-right">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${guest.status === 'Hadir' ? 'bg-green-50 text-green-700' : guest.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${guest.status === 'Hadir' ? 'bg-green-500' : guest.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                                    {guest.status}
                                </span>
                            </td>
                        </tr>
                      ))
                    )}
                </tbody>
            </table>
        </div>
      </div>

    </div>
  );
}