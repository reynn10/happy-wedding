'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Playfair_Display, Inter } from 'next/font/google';
import { supabase } from '@/lib/supabaseClient'; // Pastikan path ini benar

const playfair = Playfair_Display({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

// --- TIPE DATA DARI DATABASE ---
type InvitationData = {
  groom_name: string;
  bride_name: string;
  date: string;
  venue: string;
  cover_photo: string;
  theme_color: string;
};

type GiftData = {
  id: number;
  bank_name: string;
  account_number: string;
  account_holder: string;
};

function InvitationContent() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState("Tamu Spesial");
  
  // State Data Database
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [gifts, setGifts] = useState<GiftData[]>([]);
  
  // State Interaksi Lokal
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Mock State untuk Ucapan (Sementara Lokal)
  const [wishes, setWishes] = useState([
    { name: 'Andi & Rina', msg: 'Selamat menempuh hidup baru bro! Semoga samawa ya.', date: '2 jam lalu' },
    { name: 'Siti Aminah', msg: 'Happy Wedding! Cantik banget undangannya 😍', date: '5 jam lalu' },
  ]);
  const [newWish, setNewWish] = useState({ name: '', msg: '' });

  // --- 1. FETCH DATA DARI SUPABASE ---
  useEffect(() => {
    // Ambil Nama Tamu dari URL
    const nameFromUrl = searchParams.get('to');
    if (nameFromUrl) {
      setGuestName(decodeURIComponent(nameFromUrl));
    }

    const fetchData = async () => {
      // Ambil Data Undangan
      const { data: invData } = await supabase.from('invitations').select('*').limit(1).single();
      if (invData) setInvitation(invData);

      // Ambil Data Gift
      const { data: giftData } = await supabase.from('gifts').select('*');
      if (giftData) setGifts(giftData);
    };

    fetchData();
  }, [searchParams]);

  // --- 2. COUNTDOWN TIMER ---
  useEffect(() => {
    // Tanggal target (Hardcoded sementara jika DB format teks, idealnya ISO)
    const targetDate = new Date("2025-12-12T08:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- HANDLERS ---
  const openInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
  };

  const toggleMusic = () => setIsPlaying(!isPlaying);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Nomor rekening ${text} berhasil disalin!`);
  };

  const submitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.name || !newWish.msg) return;
    setWishes([{ ...newWish, date: 'Baru saja' }, ...wishes]);
    setNewWish({ name: '', msg: '' });
    alert("Ucapan berhasil dikirim!");
  };

  // Tampilkan Loading jika data database belum masuk
  if (!invitation) return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-500 font-serif">
      <div className="animate-pulse">Memuat Undangan...</div>
    </div>
  );

  return (
    <main className={`min-h-screen bg-white relative ${inter.className} overflow-x-hidden`}>
      
      {/* --- COVER DEPAN (LOCK SCREEN) --- */}
      <div 
        className={`fixed inset-0 z-100 bg-cover bg-center transition-transform duration-1000 ease-in-out flex flex-col items-center justify-center text-center p-6
        ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}
        // Gunakan foto dari database, fallback ke default jika kosong
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${invitation.cover_photo || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070'}")` }}
      >
        <div className="text-white space-y-8 animate-pulse-slow relative z-10">
            <p className="tracking-[0.3em] uppercase text-sm">The Wedding of</p>
            <h1 className={`${playfair.className} text-6xl md:text-8xl font-bold drop-shadow-lg leading-tight`}>
                {/* Ambil nama depan saja */}
                {invitation.groom_name.split(' ')[0]} <span className="text-pink-400">&</span> {invitation.bride_name.split(' ')[0]}
            </h1>
            <div className="w-24 h-1 bg-pink-500 mx-auto rounded-full"></div>
            <p className="text-xl md:text-2xl font-light">{invitation.date}</p>

            <div className="mt-16 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl max-w-md mx-auto transform transition hover:scale-105 duration-300">
                <p className="text-sm mb-3 text-gray-200">Kepada Yth Bapak/Ibu/Saudara/i:</p>
                <h2 className="text-3xl font-bold mb-6 text-white capitalize">{guestName}</h2>
                <button 
                  onClick={openInvitation} 
                  suppressHydrationWarning={true}
                  className="bg-pink-600 text-white px-10 py-4 rounded-full font-bold hover:bg-pink-700 transition shadow-lg flex items-center gap-3 mx-auto"
                >
                    <span className="tracking-widest uppercase text-sm">Buka Undangan</span>
                </button>
            </div>
        </div>
      </div>

      {/* --- HERO IMAGE (DALAM) --- */}
      <section className="relative w-full h-screen">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${invitation.cover_photo || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070'}")` }}
          ></div>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/30"></div>
          
          <div className="absolute bottom-20 left-0 w-full text-center text-white px-4">
              <h2 className={`${playfair.className} text-2xl md:text-3xl italic mb-4 opacity-80`}>We are getting married</h2>
              <p className="max-w-2xl mx-auto text-gray-200 leading-relaxed">
                  "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri..."
              </p>
          </div>
      </section>

      {/* --- PROFIL MEMPELAI --- */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2">
          <div className="bg-stone-100 p-20 flex flex-col items-center justify-center text-center h-full min-h-[500px]">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl mb-8 bg-gray-300">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" className="w-full h-full object-cover" alt="Groom"/>
              </div>
              <h3 className={`${playfair.className} text-5xl font-bold text-gray-900 mb-2`}>{invitation.groom_name}</h3>
              <p className="text-gray-500 font-medium uppercase tracking-widest text-sm mb-6">The Groom</p>
              <p className="text-gray-600 max-w-sm">Putra pertama dari keluarga Bapak & Ibu.</p>
          </div>
          <div className="bg-pink-50 p-20 flex flex-col items-center justify-center text-center h-full min-h-[500px]">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl mb-8 bg-gray-300">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400" className="w-full h-full object-cover" alt="Bride"/>
              </div>
              <h3 className={`${playfair.className} text-5xl font-bold text-gray-900 mb-2`}>{invitation.bride_name}</h3>
              <p className="text-pink-500 font-medium uppercase tracking-widest text-sm mb-6">The Bride</p>
              <p className="text-gray-600 max-w-sm">Putri bungsu dari keluarga Bapak & Ibu.</p>
          </div>
      </section>

      {/* --- COUNTDOWN --- */}
      <section className="w-full py-24 bg-gray-900 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-6">
              <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold mb-12`}>Save The Date</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                  {[{l:'Days',v:timeLeft.days},{l:'Hours',v:timeLeft.hours},{l:'Mins',v:timeLeft.minutes},{l:'Secs',v:timeLeft.seconds}].map((item, idx) => (
                      <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                          <span suppressHydrationWarning className="block text-4xl md:text-6xl font-bold font-serif mb-2">{item.v}</span>
                          <span className="text-sm uppercase tracking-widest text-pink-400">{item.l}</span>
                      </div>
                  ))}
              </div>
              <div className="inline-block border-t border-b border-white/30 py-4 px-12">
                  <p className="text-xl md:text-2xl tracking-widest uppercase">{invitation.date}</p>
              </div>
          </div>
      </section>

      {/* --- DETAIL ACARA --- */}
      <section className="w-full bg-white text-gray-900 py-24 px-6">
          <div className="max-w-7xl mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
                   <div className="p-10 border-r-0 md:border-r border-gray-200">
                        <h3 className={`${playfair.className} text-4xl text-pink-600 mb-6`}>Holy Matrimony</h3>
                        <p className="text-2xl font-bold mb-2">08.00 - 10.00 WIB</p>
                        <p className="text-gray-500 font-bold">{invitation.venue}</p>
                        <p className="text-sm text-gray-400 mt-2 italic">Jl. Soekarno Hatta No. 123</p>
                   </div>
                   <div className="p-10">
                        <h3 className={`${playfair.className} text-4xl text-pink-600 mb-6`}>Wedding Reception</h3>
                        <p className="text-2xl font-bold mb-2">11.00 - Finish</p>
                        <p className="text-gray-500 font-bold">{invitation.venue}</p>
                        <p className="text-sm text-gray-400 mt-2 italic">Grand Ballroom Lt. 2</p>
                   </div>
               </div>
               
               <div className="mt-12 text-center">
                   <button className="bg-gray-900 text-white px-10 py-3 rounded-full font-bold hover:bg-pink-600 transition shadow-lg flex items-center gap-3 mx-auto">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                       Open Google Maps
                   </button>
               </div>
          </div>
      </section>

      {/* --- RSVP FORM --- */}
      <section className="w-full py-24 bg-pink-50 px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-pink-600 p-6 text-center">
                  <h2 className={`${playfair.className} text-3xl font-bold text-white`}>RSVP</h2>
                  <p className="text-pink-100 text-sm mt-2">Please confirm your attendance</p>
              </div>
              <div className="p-8 md:p-12">
                  <form className="space-y-6">
                      <input 
                        type="text" 
                        suppressHydrationWarning={true}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 outline-none" 
                        placeholder="Full Name" 
                        defaultValue={guestName !== "Tamu Spesial" ? guestName : ""} 
                      />
                      <select suppressHydrationWarning={true} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none">
                        <option>Will Attend</option>
                        <option>Cannot Attend</option>
                        <option>Tentative</option>
                      </select>
                      <button suppressHydrationWarning={true} type="button" className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition">Confirm Attendance</button>
                  </form>
              </div>
          </div>
      </section>

      {/* --- WEDDING GIFT (DINAMIS DARI DB) --- */}
      <section className="w-full py-24 bg-white px-6 text-center">
          <h2 className={`${playfair.className} text-4xl font-bold mb-6 text-gray-900`}>Wedding Gift</h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-12">
            Your blessing is a meaningful gift for us. However, if you wish to give a cashless gift, you may do so via the details below.
          </p>
          
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start justify-center">
              
              {gifts.length === 0 ? (
                <div className="col-span-2 text-gray-400 italic">Belum ada rekening yang ditambahkan.</div>
              ) : (
                gifts.map((gift) => (
                  <div key={gift.id} className="flex flex-col items-center w-full max-w-[400px] mx-auto">
                      <div className="group relative w-full aspect-[1.586/1] rounded-3xl shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.02] hover:rotate-1 hover:shadow-blue-900/20">
                          {/* Logic Warna Card */}
                          <div className={`absolute inset-0 bg-linear-to-br ${gift.bank_name.toLowerCase().includes('bca') ? 'from-[#00529C] to-[#003366]' : 'from-[#FFB800] via-[#F29600] to-[#b46d00]'}`}></div>
                          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-white to-transparent"></div>
                          
                          <div className="relative h-full p-6 sm:p-8 flex flex-col justify-between text-white text-left">
                              <div className="flex justify-between items-start">
                                  <p className="font-bold tracking-widest text-lg">{gift.bank_name}</p>
                                  <p className="text-[10px] sm:text-xs font-light tracking-widest opacity-80">DEBIT CARD</p>
                              </div>
                              <div className="flex items-center gap-3 sm:gap-4 my-auto">
                                  <div className="w-10 h-8 bg-yellow-400/80 rounded-md shadow-sm"></div>
                                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>
                              </div>
                              <div>
                                  <p className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold tracking-widest drop-shadow-md mb-3 text-shadow">{gift.account_number}</p>
                                  <div className="flex justify-between items-end">
                                      <div>
                                          <p className="text-[8px] sm:text-[10px] text-gray-300 uppercase tracking-widest mb-0.5">Card Holder</p>
                                          <p className="font-bold text-xs sm:text-sm lg:text-base tracking-wider uppercase drop-shadow-sm">{gift.account_holder}</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <button 
                        onClick={() => handleCopy(gift.account_number)} 
                        suppressHydrationWarning={true}
                        className="mt-6 w-full bg-gray-50 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-pink-50 hover:border-pink-200 hover:text-pink-600 transition-all duration-300 shadow-sm"
                      >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                          Copy Account Number
                      </button>
                  </div>
                ))
              )}
          </div>
      </section>

      {/* --- WISHES (ENGLISH) --- */}
      <section className="w-full py-24 bg-stone-100 px-6">
          <div className="max-w-4xl mx-auto">
              <h2 className={`${playfair.className} text-4xl font-bold text-center mb-12 text-gray-900`}>Wedding Wishes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="bg-white p-8 rounded-2xl shadow-sm h-fit">
                      <form onSubmit={submitWish} className="space-y-4">
                          <input 
                            type="text" 
                            suppressHydrationWarning={true}
                            placeholder="Your Name" 
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none" 
                            value={newWish.name} 
                            onChange={(e) => setNewWish({...newWish, name: e.target.value})} 
                          />
                          <textarea 
                            rows={4} 
                            suppressHydrationWarning={true}
                            placeholder="Write your wishes..." 
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none" 
                            value={newWish.msg} 
                            onChange={(e) => setNewWish({...newWish, msg: e.target.value})}
                          ></textarea>
                          <button suppressHydrationWarning={true} type="submit" className="bg-pink-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-pink-700 transition">Send Wish</button>
                      </form>
                  </div>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                      {wishes.map((wish, idx) => (
                          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                              <h4 className="font-bold text-gray-900">{wish.name}</h4>
                              <p className="text-gray-600 text-sm">{wish.msg}</p>
                              <p className="text-xs text-gray-400 mt-2">{wish.date}</p>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </section>

      <section className="w-full py-24 bg-gray-900 text-white text-center px-6">
          <h2 className={`${playfair.className} text-4xl font-bold text-pink-400 mb-4`}>Thank You</h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">For your presence and blessings on our special day.</p>
          <div className="mt-8 mb-12">
              <p className="text-xs text-gray-500 italic mb-2">Note:</p>
              <p className="text-gray-400 text-xs max-w-md mx-auto leading-relaxed">
                  We apologize if we could not invite everyone due to venue capacity limitations. Thank you for your understanding.
              </p>
          </div>
          <div className="pt-8 border-t border-gray-800"><h3 className={`${playfair.className} text-3xl font-bold`}>{invitation.groom_name.split(' ')[0]} & {invitation.bride_name.split(' ')[0]}</h3></div>
      </section>

      {/* --- MUSIC CONTROL BUTTON --- */}
      <button 
        onClick={toggleMusic}
        suppressHydrationWarning={true}
        className={`fixed bottom-8 right-8 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition duration-300
          ${isPlaying ? 'bg-pink-600 text-white animate-spin-slow' : 'bg-white text-pink-600'}
        `}
      >
        {isPlaying ? (
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        ) : (
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        )}
      </button>

    </main>
  );
}

export default function DemoInvitation() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <InvitationContent />
    </Suspense>
  );
}