'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

// --- MOCK DATA ---
const initialWishes = [
  { name: 'Andi & Rina', msg: 'Selamat menempuh hidup baru bro! Semoga samawa ya.', date: '2 jam yang lalu' },
  { name: 'Siti Aminah', msg: 'Happy Wedding Juliet! Cantik banget undangannya 😍', date: '5 jam yang lalu' },
  { name: 'Budi Santoso', msg: 'Barakallahu lakuma wa baraka alaikuma. Lancar sampai hari H.', date: '1 hari yang lalu' },
];

function InvitationContent() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState("Tamu Spesial");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [wishes, setWishes] = useState(initialWishes);
  const [newWish, setNewWish] = useState({ name: '', msg: '' });
  const [isPlaying, setIsPlaying] = useState(false); // State musik

  useEffect(() => {
    const nameFromUrl = searchParams.get('to');
    if (nameFromUrl) {
      setGuestName(decodeURIComponent(nameFromUrl));
    }

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
  }, [searchParams]);

  const openInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true); // Mulai musik saat buka
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // Di sini nanti logika play/pause audio HTML5
  };

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

  return (
    <main className={`min-h-screen bg-white relative ${inter.className} overflow-x-hidden`}>
      
      {/* --- COVER DEPAN --- */}
      <div 
        className={`fixed inset-0 z-100 bg-cover bg-center transition-transform duration-1000 ease-in-out flex flex-col items-center justify-center text-center p-6
        ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}
        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070")' }}
      >
        <div className="text-white space-y-8 animate-pulse-slow">
            <p className="tracking-[0.3em] uppercase text-sm">The Wedding of</p>
            <h1 className={`${playfair.className} text-7xl md:text-9xl font-bold drop-shadow-lg`}>
                Romeo <span className="text-pink-400">&</span> Juliet
            </h1>
            <div className="w-24 h-1 bg-pink-500 mx-auto rounded-full"></div>
            <p className="text-xl md:text-2xl font-light">12 . 12 . 2025</p>

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

      {/* --- HERO IMAGE --- */}
      <section className="relative w-full h-screen">
          <img src="https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1976" alt="Couple" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/30"></div>
          <div className="absolute bottom-20 left-0 w-full text-center text-white px-4">
              <h2 className={`${playfair.className} text-2xl md:text-3xl italic mb-4 opacity-80`}>We are getting married</h2>
              <p className="max-w-2xl mx-auto text-gray-200 leading-relaxed">"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri..."</p>
          </div>
      </section>

      {/* --- PROFIL MEMPELAI --- */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2">
          <div className="bg-stone-100 p-20 flex flex-col items-center justify-center text-center h-full min-h-[500px]">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl mb-8">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974" className="w-full h-full object-cover"/>
              </div>
              <h3 className={`${playfair.className} text-5xl font-bold text-gray-900 mb-2`}>Romeo Putra</h3>
              <p className="text-gray-500 font-medium uppercase tracking-widest text-sm mb-6">The Groom</p>
              <p className="text-gray-600 max-w-sm">Putra pertama dari pasangan <br/> Bpk. Adam & Ibu Hawa</p>
          </div>
          <div className="bg-pink-50 p-20 flex flex-col items-center justify-center text-center h-full min-h-[500px]">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl mb-8">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070" className="w-full h-full object-cover"/>
              </div>
              <h3 className={`${playfair.className} text-5xl font-bold text-gray-900 mb-2`}>Juliet Putri</h3>
              <p className="text-pink-500 font-medium uppercase tracking-widest text-sm mb-6">The Bride</p>
              <p className="text-gray-600 max-w-sm">Putri bungsu dari pasangan <br/> Bpk. Capulet & Ibu Lady</p>
          </div>
      </section>

      {/* --- COUNTDOWN --- */}
      <section className="w-full py-24 bg-gray-900 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-6">
              <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold mb-12`}>Save The Date</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                  {[{l:'Hari',v:timeLeft.days},{l:'Jam',v:timeLeft.hours},{l:'Menit',v:timeLeft.minutes},{l:'Detik',v:timeLeft.seconds}].map((item, idx) => (
                      <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                          <span suppressHydrationWarning className="block text-4xl md:text-6xl font-bold font-serif mb-2">{item.v}</span>
                          <span className="text-sm uppercase tracking-widest text-pink-400">{item.l}</span>
                      </div>
                  ))}
              </div>
              <div className="inline-block border-t border-b border-white/30 py-4 px-12">
                  <p className="text-xl md:text-2xl tracking-widest">DECEMBER 12th, 2025</p>
              </div>
          </div>
      </section>

      {/* --- DETAIL ACARA (LOCATION) - SUDAH KEMBALI --- */}
      <section className="w-full bg-white text-gray-900 py-24 px-6">
          <div className="max-w-7xl mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
                   <div className="p-10 border-r-0 md:border-r border-gray-200">
                        <h3 className={`${playfair.className} text-4xl text-pink-600 mb-6`}>Akad Nikah</h3>
                        <p className="text-2xl font-bold mb-2">08.00 - 10.00 WIB</p>
                        <p className="text-gray-500">Masjid Agung Al-Falah</p>
                        <p className="text-sm text-gray-400 mt-4 italic">Jl. Soekarno Hatta No. 123</p>
                   </div>
                   <div className="p-10">
                        <h3 className={`${playfair.className} text-4xl text-pink-600 mb-6`}>Resepsi</h3>
                        <p className="text-2xl font-bold mb-2">11.00 - Selesai</p>
                        <p className="text-gray-500">Grand Hotel Ballroom</p>
                        <p className="text-sm text-gray-400 mt-4 italic">Lt. 2 - Jl. Jendral Sudirman No. 45</p>
                   </div>
               </div>
               
               {/* Tombol Map */}
               <div className="mt-12 text-center">
                   <button className="bg-gray-900 text-white px-10 py-3 rounded-full font-bold hover:bg-pink-600 transition shadow-lg flex items-center gap-3 mx-auto">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                       Lihat Lokasi di Google Maps
                   </button>
               </div>
          </div>
      </section>

      {/* --- RSVP FORM --- */}
      <section className="w-full py-24 bg-pink-50 px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-pink-600 p-6 text-center">
                  <h2 className={`${playfair.className} text-3xl font-bold text-white`}>Konfirmasi Kehadiran</h2>
              </div>
              <div className="p-8 md:p-12">
                  <form className="space-y-6">
                      <input 
                        type="text" 
                        suppressHydrationWarning={true}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 outline-none" 
                        placeholder="Nama Lengkap" 
                        defaultValue={guestName !== "Tamu Spesial" ? guestName : ""} 
                      />
                      <select suppressHydrationWarning={true} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none">
                        <option>Hadir</option>
                        <option>Tidak Hadir</option>
                      </select>
                      <button suppressHydrationWarning={true} type="button" className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition">Kirim Konfirmasi</button>
                  </form>
              </div>
          </div>
      </section>

      {/* --- WEDDING GIFT --- */}
      <section className="w-full py-24 bg-white px-6 text-center">
          <h2 className={`${playfair.className} text-4xl font-bold mb-6 text-gray-900`}>Wedding Gift</h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-12">Doa restu Anda merupakan karunia yang sangat berarti bagi kami.</p>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* KARTU 1: BCA */}
              <div className="flex flex-col items-center w-full max-w-[400px] mx-auto">
                  <div className="group relative w-full aspect-[1.586/1] rounded-3xl shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.02] hover:rotate-1 hover:shadow-blue-900/20">
                      <div className="absolute inset-0 bg-linear-to-br from-[#00529C] to-[#003366]"></div>
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-white to-transparent"></div>
                      <div className="relative h-full p-6 sm:p-8 flex flex-col justify-between text-white text-left">
                          <div className="flex justify-between items-start">
                              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" className="h-6 sm:h-8 brightness-0 invert" alt="BCA"/>
                              <p className="text-[10px] sm:text-xs font-light tracking-widest opacity-80">PASPOR BCA</p>
                          </div>
                          <div className="flex items-center gap-3 sm:gap-4 my-auto">
                              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm2 2v4h6V4H9zm0 6v4h6v-4H9zm0 6v4h6v-4H9z" opacity="0.9"/></svg>
                              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>
                          </div>
                          <div>
                              <p className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold tracking-widest drop-shadow-md mb-3 text-shadow">1234 5678 9000</p>
                              <div className="flex justify-between items-end">
                                  <div>
                                      <p className="text-[8px] sm:text-[10px] text-gray-300 uppercase tracking-widest mb-0.5">Card Holder</p>
                                      <p className="font-bold text-xs sm:text-sm lg:text-base tracking-wider uppercase drop-shadow-sm">ROMEO PUTRA</p>
                                  </div>
                                  <div className="text-right">
                                      <p className="text-[8px] sm:text-[10px] text-gray-300 uppercase tracking-widest mb-0.5">Valid Thru</p>
                                      <p className="font-mono font-bold text-xs sm:text-sm">12/30</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <button 
                    onClick={() => handleCopy('123456789000')} 
                    suppressHydrationWarning={true}
                    className="mt-6 w-full bg-gray-50 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-pink-50 hover:border-pink-200 hover:text-pink-600 transition-all duration-300 shadow-sm"
                  >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                      Salin Nomor Rekening
                  </button>
              </div>

              {/* KARTU 2: MANDIRI */}
              <div className="flex flex-col items-center w-full max-w-[400px] mx-auto">
                  <div className="group relative w-full aspect-[1.586/1] rounded-3xl shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.02] hover:-rotate-1 hover:shadow-yellow-600/20">
                      <div className="absolute inset-0 bg-linear-to-br from-[#FFB800] via-[#F29600] to-[#b46d00]"></div>
                      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                      <div className="relative h-full p-6 sm:p-8 flex flex-col justify-between text-white text-left">
                          <div className="flex justify-between items-start">
                               <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg" className="h-6 sm:h-8 brightness-0 invert" alt="Mandiri"/>
                              <p className="text-[10px] sm:text-xs font-bold tracking-widest italic opacity-90">PRIORITAS</p>
                          </div>
                           <div className="flex items-center gap-3 sm:gap-4 my-auto">
                              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-200 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm2 2v4h6V4H9zm0 6v4h6v-4H9zm0 6v4h6v-4H9z" opacity="0.9"/></svg>
                              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>
                          </div>
                          <div>
                              <p className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold tracking-widest drop-shadow-md mb-3 text-shadow">0987 6543 2100</p>
                              <div className="flex justify-between items-end">
                                  <div>
                                      <p className="text-[8px] sm:text-[10px] text-yellow-100 uppercase tracking-widest mb-0.5">Card Holder</p>
                                      <p className="font-bold text-xs sm:text-sm lg:text-base tracking-wider uppercase drop-shadow-sm">JULIET PUTRI</p>
                                  </div>
                                  <div className="text-right">
                                      <p className="text-[8px] sm:text-[10px] text-yellow-100 uppercase tracking-widest mb-0.5">Valid Thru</p>
                                      <p className="font-mono font-bold text-xs sm:text-sm">10/28</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <button 
                    onClick={() => handleCopy('098765432100')} 
                    suppressHydrationWarning={true}
                    className="mt-6 w-full bg-gray-50 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-700 transition-all duration-300 shadow-sm"
                  >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                      Salin Nomor Rekening
                  </button>
              </div>
          </div>
      </section>

      {/* --- WISHES --- */}
      <section className="w-full py-24 bg-stone-100 px-6">
          <div className="max-w-4xl mx-auto">
              <h2 className={`${playfair.className} text-4xl font-bold text-center mb-12 text-gray-900`}>Wedding Wishes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="bg-white p-8 rounded-2xl shadow-sm h-fit">
                      <form onSubmit={submitWish} className="space-y-4">
                          <input 
                            type="text" 
                            suppressHydrationWarning={true}
                            placeholder="Nama Anda" 
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none" 
                            value={newWish.name} 
                            onChange={(e) => setNewWish({...newWish, name: e.target.value})} 
                          />
                          <textarea 
                            rows={4} 
                            suppressHydrationWarning={true}
                            placeholder="Tulis doa..." 
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none" 
                            value={newWish.msg} 
                            onChange={(e) => setNewWish({...newWish, msg: e.target.value})}
                          ></textarea>
                          <button suppressHydrationWarning={true} type="submit" className="bg-pink-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-pink-700 transition">Kirim Ucapan</button>
                      </form>
                  </div>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                      {wishes.map((wish, idx) => (
                          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                              <h4 className="font-bold text-gray-900">{wish.name}</h4>
                              <p className="text-gray-600 text-sm">{wish.msg}</p>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </section>

      <section className="w-full py-24 bg-gray-900 text-white text-center px-6">
          <h2 className={`${playfair.className} text-4xl font-bold text-pink-400 mb-4`}>Thank You</h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">Terima kasih atas kehadiran dan doa restu Bapak/Ibu/Saudara/i.</p>
          <div className="mt-8 mb-12">
              <p className="text-xs text-gray-500 italic mb-2">Permintaan Maaf:</p>
              <p className="text-gray-400 text-xs max-w-md mx-auto leading-relaxed">
                  Tanpa mengurangi rasa hormat, kami memohon maaf apabila terdapat tamu yang belum dapat kami undang secara langsung dikarenakan keterbatasan tempat.
              </p>
          </div>
          <div className="pt-8 border-t border-gray-800"><h3 className={`${playfair.className} text-3xl font-bold`}>Romeo & Juliet</h3></div>
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
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        ) : (
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
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