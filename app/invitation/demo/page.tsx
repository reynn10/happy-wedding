'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Playfair_Display, Inter } from 'next/font/google';
import { supabase } from '@/lib/supabaseClient'; 

const playfair = Playfair_Display({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

// --- TIPE DATA ---
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
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Default Data
  const [data, setData] = useState<InvitationData>({
    groom_name: "Romeo Putra",
    bride_name: "Juliet Putri",
    date: "12 Desember 2025",
    venue: "Grand Hotel Ballroom",
    cover_photo: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=600",
    theme_color: "Pink"
  });

  const [gifts, setGifts] = useState<GiftData[]>([]);
  
  // Mock Wishes
  const [wishes, setWishes] = useState([
    { name: 'Andi & Rina', msg: 'Selamat menempuh hidup baru! Semoga bahagia selalu.', date: '2 jam lalu' },
    { name: 'Siti Aminah', msg: 'Happy Wedding! Undangan yang sangat cantik.', date: '5 jam lalu' },
  ]);
  const [newWish, setNewWish] = useState({ name: '', msg: '' });

  // --- 1. FETCH DATA ---
  useEffect(() => {
    const loadData = async () => {
      const paramGroom = searchParams.get('groom');
      const paramBride = searchParams.get('bride');
      const paramDate = searchParams.get('date');
      const paramVenue = searchParams.get('venue');
      const paramCover = searchParams.get('cover');
      const paramTo = searchParams.get('to');
      const paramUid = searchParams.get('uid');

      if (paramTo) setGuestName(decodeURIComponent(paramTo));

      if (paramGroom && paramBride) {
         setData(prev => ({
            ...prev,
            groom_name: paramGroom,
            bride_name: paramBride,
            date: paramDate || prev.date,
            venue: paramVenue || prev.venue,
            cover_photo: paramCover || prev.cover_photo
         }));
         
         // Ambil data rekening berdasarkan user ID dari parameter
         if (paramUid) {
            const { data: giftData } = await supabase.from('gifts').select('*').eq('user_id', paramUid);
            if (giftData) setGifts(giftData);
         }
         setHasLoaded(true);
      } else {
         const { data: dbData } = await supabase.from('invitations').select('*').limit(1).single();
         if (dbData) {
            setData({
                groom_name: dbData.groom_name || "Romeo",
                bride_name: dbData.bride_name || "Juliet",
                date: dbData.event_date || "12 Desember 2025",
                venue: dbData.venue_name || "Grand Hotel Ballroom",
                cover_photo: dbData.cover_photo || "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=600",
                theme_color: dbData.theme_color || "Pink"
            });
            
            // Ambil data rekening berdasarkan user_id dari invitations
            const { data: giftData } = await supabase.from('gifts').select('*').eq('user_id', dbData.user_id);
            if (giftData) setGifts(giftData);
         }
         setHasLoaded(true);
      }
    };
    loadData();
  }, [searchParams]);

  // --- 2. COUNTDOWN ---
  useEffect(() => {
    const targetDate = new Date("2025-12-12T08:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
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

  const openInvitation = () => { setIsOpen(true); setIsPlaying(true); };
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

  if (!hasLoaded) return <div className="min-h-screen flex items-center justify-center bg-stone-50 text-pink-400 animate-pulse">Memuat Undangan...</div>;

  return (
    <main className={`min-h-screen bg-stone-50 text-gray-800 relative ${inter.className} overflow-x-hidden`}>
      
      {/* --- LOCK SCREEN (COVER DEPAN) --- */}
      <div 
        className={`fixed inset-0 z-100 bg-gray-900 transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] flex flex-col items-center justify-center text-center px-6
        ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="absolute inset-0 z-0">
             <img src={data.cover_photo} alt="Cover" className="w-full h-full object-cover opacity-60" />
             <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-white space-y-6 max-w-md w-full animate-fade-in-up">
            <p className="tracking-[0.4em] uppercase text-xs opacity-90">The Wedding Of</p>
            
            <h1 className={`${playfair.className} text-6xl md:text-7xl font-bold leading-tight drop-shadow-lg`}>
                {data.groom_name.split(' ')[0]} <br/> 
                <span className="text-4xl text-pink-300 font-light italic">&</span> <br/>
                {data.bride_name.split(' ')[0]}
            </h1>

            <div className="mt-12 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-4xl shadow-2xl">
                <p className="text-xs text-gray-300 mb-2">Kepada Yth Bapak/Ibu/Saudara/i</p>
                <h2 className="text-2xl font-bold mb-6 text-white capitalize">{guestName}</h2>
                <button 
                  onClick={openInvitation} 
                  className="bg-pink-600 text-white w-full py-3.5 rounded-xl font-bold hover:bg-pink-700 transition shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2 animate-bounce-slow"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    Buka Undangan
                </button>
            </div>
        </div>
      </div>

      {/* --- KONTEN UTAMA (SCROLLABLE) --- */}
      
      {/* 1. HERO SECTION (UPDATED: Quotes & Wave Divider) */}
      <section className="relative w-full h-screen flex flex-col justify-end pb-0 overflow-hidden">
          {/* Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${data.cover_photo}")` }}
          ></div>
          {/* Gradient Overlay Lebih Halus */}
          <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
          
          {/* Content */}
          <div className="relative z-10 w-full text-center text-white px-6 pb-24 md:pb-32">
              <p className="tracking-[0.3em] uppercase text-xs md:text-sm mb-4 opacity-80 animate-fade-in-up">We Are Getting Married</p>
              
              <h2 className={`${playfair.className} text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl animate-fade-in-up delay-100`}>
                 {data.groom_name.split(' ')[0]} <span className="text-pink-400">&</span> {data.bride_name.split(' ')[0]}
              </h2>

              {/* Quotes Indah */}
              <div className="max-w-xl mx-auto animate-fade-in-up delay-200">
                  <p className="text-gray-200 text-sm md:text-base italic leading-relaxed opacity-90 font-light">
                      "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya..."
                  </p>
                  <div className="w-12 h-px bg-pink-500 mx-auto my-4"></div>
                  <p className="text-pink-300 text-xs font-bold tracking-widest uppercase">(Ar-Rum: 21)</p>
              </div>
          </div>

          {/* SVG WAVE SEPARATOR (Lengkung Halus) */}
          <div className="absolute bottom-0 left-0 w-full leading-none z-20 text-white">
             {/* Menggunakan warna text-white agar menyatu dengan background section berikutnya (jika putih) */}
             <svg className="block w-full h-16 md:h-24 lg:h-32 fill-white" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,149.3C672,139,768,149,864,165.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
             </svg>
          </div>
      </section>

      {/* 2. Profil Mempelai */}
      <section className="py-20 px-6 bg-white relative z-10">
          <div className="max-w-4xl mx-auto space-y-16 pt-10">
             {/* Groom */}
             <div className="flex flex-col items-center text-center space-y-4" data-aos="fade-up">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-stone-100 shadow-xl bg-gray-200 relative">
                   <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" className="w-full h-full object-cover" alt="Groom"/>
                </div>
                <div>
                    <h3 className={`${playfair.className} text-4xl font-bold text-gray-900`}>{data.groom_name}</h3>
                    <p className="text-pink-600 text-sm font-bold tracking-widest uppercase mt-2">The Groom</p>
                    <p className="text-gray-500 text-sm mt-3 px-8 leading-relaxed">Putra pertama dari keluarga Bapak & Ibu yang berbahagia.</p>
                </div>
             </div>
             
             <div className="text-center">
                 <span className={`${playfair.className} text-5xl text-pink-300`}>&</span>
             </div>

             {/* Bride */}
             <div className="flex flex-col items-center text-center space-y-4" data-aos="fade-up">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-stone-100 shadow-xl bg-gray-200 relative">
                   <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400" className="w-full h-full object-cover" alt="Bride"/>
                </div>
                <div>
                    <h3 className={`${playfair.className} text-4xl font-bold text-gray-900`}>{data.bride_name}</h3>
                    <p className="text-pink-600 text-sm font-bold tracking-widest uppercase mt-2">The Bride</p>
                    <p className="text-gray-500 text-sm mt-3 px-8 leading-relaxed">Putri bungsu dari keluarga Bapak & Ibu yang berbahagia.</p>
                </div>
             </div>
          </div>
      </section>

      {/* 3. Detail Acara */}
      <section className="py-20 px-6 bg-stone-50 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] -mt-12 relative z-20">
          <div className="text-center mb-10">
              <h2 className={`${playfair.className} text-3xl font-bold text-gray-900 mb-2`}>Save The Date</h2>
              <p className="text-gray-500">{data.date}</p>
          </div>

          <div className="flex justify-center gap-3 mb-10 text-center">
              {[{l:'Hari',v:timeLeft.days},{l:'Jam',v:timeLeft.hours},{l:'Menit',v:timeLeft.minutes}].map((t,i) =>(
                  <div key={i} className="bg-white border border-gray-100 p-4 rounded-2xl w-20 shadow-sm">
                      <span className="block text-2xl font-bold text-pink-600">{t.v}</span>
                      <span className="text-[9px] uppercase text-gray-400 font-bold tracking-widest">{t.l}</span>
                  </div>
              ))}
          </div>

          <div className="space-y-6">
              <div className="p-8 border border-white rounded-4xl bg-white shadow-sm text-center">
                  <h3 className={`${playfair.className} text-2xl text-gray-900 mb-2`}>Akad Nikah</h3>
                  <p className="text-sm font-bold text-pink-600 mb-2">08.00 - 10.00 WIB</p>
                  <p className="text-sm text-gray-600">{data.venue}</p>
              </div>
              <div className="p-8 border border-white rounded-4xl bg-white shadow-sm text-center">
                  <h3 className={`${playfair.className} text-2xl text-gray-900 mb-2`}>Resepsi</h3>
                  <p className="text-sm font-bold text-pink-600 mb-2">11.00 - Selesai</p>
                  <p className="text-sm text-gray-600">{data.venue}</p>
              </div>
          </div>

          <div className="mt-10 text-center">
             <button className="bg-gray-900 text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-xl hover:bg-gray-800 transition flex items-center gap-2 mx-auto">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                 Google Maps
             </button>
          </div>
      </section>

      {/* 4. Gift Section */}
      <section className="py-20 px-6 text-center bg-white">
          <h2 className={`${playfair.className} text-4xl font-bold mb-6 text-gray-900`}>Wedding Gift</h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-12 text-sm leading-relaxed">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
          </p>
          
          <div className="max-w-md mx-auto grid gap-6">
              {gifts.length === 0 ? (
                  <p className="text-gray-400 italic text-sm">Belum ada rekening.</p>
              ) : (
                  gifts.map((gift) => (
                      <div key={gift.id} className="relative overflow-hidden rounded-2xl shadow-xl bg-gray-900 text-white p-6 text-left aspect-[1.6/1] transform transition hover:scale-105">
                          <div className="absolute top-0 right-0 p-4 opacity-10">
                              <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                          </div>
                          <div className="relative z-10 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start">
                                <p className="font-bold tracking-widest text-lg uppercase">{gift.bank_name}</p>
                                <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                            </div>
                            <div>
                                <p className="font-mono text-xl tracking-widest mb-1 text-shadow">{gift.account_number}</p>
                                <p className="text-xs opacity-70 uppercase tracking-wider">{gift.account_holder}</p>
                            </div>
                            <button onClick={() => handleCopy(gift.account_number)} className="absolute bottom-6 right-6 text-[10px] font-bold bg-white/20 px-3 py-1.5 rounded-full hover:bg-white/30 backdrop-blur transition">
                                SALIN
                            </button>
                          </div>
                      </div>
                  ))
              )}
          </div>
      </section>

      {/* 5. Wishes */}
      <section className="py-20 px-6 bg-stone-100 rounded-t-[3rem] -mt-12 relative z-10">
          <h2 className={`${playfair.className} text-3xl font-bold text-center text-gray-900 mb-8`}>Kirim Ucapan</h2>
          <div className="max-w-md mx-auto space-y-8">
              <form onSubmit={submitWish} className="space-y-4 bg-white p-6 rounded-3xl shadow-sm">
                  <input 
                    type="text" 
                    placeholder="Nama Anda" 
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-pink-200 outline-none transition"
                    value={newWish.name}
                    onChange={(e) => setNewWish({...newWish, name: e.target.value})}
                  />
                  <textarea 
                    rows={3} 
                    placeholder="Tulis doa & ucapan..." 
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-pink-200 outline-none transition resize-none"
                    value={newWish.msg}
                    onChange={(e) => setNewWish({...newWish, msg: e.target.value})}
                  ></textarea>
                  <button className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-pink-700 transition">
                      Kirim
                  </button>
              </form>

              <div className="space-y-4">
                  {wishes.map((w, i) => (
                      <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                          <div className="flex justify-between items-start mb-1">
                             <p className="font-bold text-gray-900 text-sm">{w.name}</p>
                             <span className="text-[10px] text-gray-400">{w.date}</span>
                          </div>
                          <p className="text-gray-600 text-xs leading-relaxed">{w.msg}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-500 py-10 text-center text-xs">
          <p className="mb-2 text-white/50">{data.groom_name.split(' ')[0]} & {data.bride_name.split(' ')[0]}</p>
          <p>Created with Happy Wedding</p>
      </footer>

      {/* Music Toggle */}
      <button 
        onClick={toggleMusic} 
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-2xl flex items-center justify-center z-50 transition-all ${isPlaying ? 'bg-pink-600 text-white animate-spin-slow' : 'bg-white text-gray-800'}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>
      </button>

    </main>
  );
}

export default function DemoInvitation() {
  return <Suspense><InvitationContent /></Suspense>;
}