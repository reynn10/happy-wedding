import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-stone-50 font-sans selection:bg-pink-100 selection:text-pink-600">
      <Navbar />
      
      {/* --- 1. HERO SECTION (Clean & Editorial) --- */}
      <section className="pt-30 pb-20 px-6 bg-white rounded-b-[3rem] shadow-sm">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 font-serif leading-tight animate-fade-in-up delay-100">
                  Lebih Dari Sekadar <br/>
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-purple-500 to-pink-500 animate-gradient-x">Undangan Biasa.</span>
              </h1>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed animate-fade-in-up delay-200">
                  Perpaduan sempurna antara estetika desain premium dan kecanggihan teknologi. Mengelola pernikahan impian kini semudah sentuhan jari.
              </p>
          </div>
      </section>

      {/* --- 2. THE CORE EXPERIENCE (Big 3) --- */}
      <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto space-y-32" data-aos="zoom-out">
              
              {/* FEATURE A: WHATSAPP BLAST (Real WhatsApp Style) */}
              <div className="flex flex-col md:flex-row items-center gap-16">
                  {/* Visual */}
                  <div className="flex-1 w-full relative">
                      {/* Background Decoration */}
                      <div className="absolute inset-0 bg-linear-to-tr from-green-100 to-emerald-50 rounded-[3rem] transform -rotate-3 scale-95 opacity-50 blur-xl"></div>
                      
                      <div className="bg-white rounded-[2.5rem] p-4 shadow-2xl border border-gray-100 relative z-10">
                          
                          {/* MOCKUP HP FRAME */}
                          <div className="bg-[#EFEAE2] rounded-4xl h-[450px] overflow-hidden flex flex-col relative border border-gray-200">
                              
                              {/* Wallpaper Pattern WhatsApp */}
                              <div className="absolute inset-0 opacity-[0.4] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>

                              {/* 1. Header Chat */}
                              <div className="relative z-10 bg-[#F0F2F5] px-4 py-3 flex items-center gap-3 border-b border-gray-300 shadow-sm">
                                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                                      <Image 
                                        src="https://images.unsplash.com/photo-1511285560982-1351cdeb9821?w=100" 
                                        width={40} height={40} 
                                        alt="Avatar" 
                                        className="object-cover"
                                      />
                                  </div>
                                  <div className="flex-1">
                                      <p className="text-sm font-bold text-gray-800">Romeo & Juliet</p>
                                      <p className="text-[10px] text-gray-500">online</p>
                                  </div>
                                  <div className="flex gap-4 text-[#007bfc]">
                                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                  </div>
                              </div>

                              {/* 2. Chat Area */}
                              <div className="flex-1 p-4 relative z-10 flex flex-col gap-4 overflow-y-auto">
                                  
                                  {/* Date Bubble */}
                                  <div className="self-center bg-[#E1F3FB] text-[#566065] text-[10px] px-3 py-1 rounded-lg shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] font-medium uppercase mb-2">
                                      HARI INI
                                  </div>

                                  {/* --- BUBBLE KIRI (PENGIRIM/UNDANGAN) --- */}
                                  <div className="bg-white p-1 rounded-lg rounded-tl-none shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] max-w-[85%] self-start relative">
                                      {/* Ekor Bubble Kiri */}
                                      <div className="absolute top-0 -left-2 w-0 h-0 border-t-10 border-t-white border-l-10 border-l-transparent"></div>
                                      
                                      <div className="p-1">
                                          {/* Link Preview Card */}
                                          <div className="bg-[#F0F2F5] rounded-md overflow-hidden mb-2 border-l-4 border-pink-400">
                                               {/* Gambar Thumbnail */}
                                               <div className="h-28 w-full relative">
                                                    <Image 
                                                      src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400" 
                                                      fill 
                                                      alt="Cover" 
                                                      className="object-cover"
                                                    />
                                               </div>
                                               {/* Teks Preview */}
                                               <div className="p-2">
                                                    <h4 className="text-sm font-bold text-gray-800 line-clamp-1">The Wedding of Romeo & Juliet</h4>
                                                    <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">Kepada Yth. Budi Santoso. Tanpa mengurangi rasa hormat, kami mengundang...</p>
                                                    <p className="text-[10px] text-gray-400 mt-1 lowercase">happywedding.com</p>
                                               </div>
                                          </div>

                                          {/* Pesan Teks */}
                                          <p className="text-sm text-gray-800 leading-snug px-1 pb-1">
                                              Assalamu'alaikum, Budi! 😊 <br/>
                                              Mohon doa restu di pernikahan kami ya. Klik link di atas untuk info lengkapnya.
                                          </p>
                                      </div>

                                      {/* Jam */}
                                      <div className="text-[10px] text-gray-400 text-right pr-2 pb-1">
                                          10:05
                                      </div>
                                  </div>

                                  {/* --- BUBBLE KANAN (PENERIMA/BALASAN) --- */}
                                  <div className="bg-[#D9FDD3] p-2 rounded-lg rounded-tr-none shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] max-w-[80%] self-end relative mt-2">
                                      {/* Ekor Bubble Kanan */}
                                      <div className="absolute top-0 -right-2 w-0 h-0 border-t-10 border-t-[#D9FDD3] border-r-10 border-r-transparent"></div>
                                      
                                      <p className="text-sm text-gray-800 leading-snug px-1">
                                          Wa'alaikumsalam! Wah selamat ya Romeo & Juliet! 🥳 <br/>
                                          InsyaAllah pasti hadir bro!
                                      </p>
                                      
                                      {/* Jam & Centang Biru */}
                                      <div className="text-[10px] text-gray-500 text-right mt-1 flex items-center justify-end gap-1">
                                          10:15
                                          {/* Icon Centang Dua Biru */}
                                          <div className="flex text-[#53bdeb]">
                                              <svg className="w-3.5 h-3.5 -mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                                          </div>
                                      </div>
                                  </div>

                              </div>
                          </div>
                      </div>
                  </div>
                  
                  {/* Teks Penjelasan Fitur */}
                  <div className="flex-1 space-y-8">
                      <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shadow-sm border border-green-100">
                          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                      </div>
                      <h2 className="text-4xl font-bold text-gray-900 font-serif">Kirim Tanpa Batas, <br/>Sapa dengan Nama.</h2>
                      <p className="text-gray-500 leading-relaxed text-lg font-light">
                          Sistem cerdas kami mengganti nama tamu secara otomatis di setiap pesan. Kirim ke 500 kontak dalam sekali klik tanpa takut terblokir.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {['Personalisasi Nama', 'Anti-Banned System', 'Import Kontak Excel', 'Laporan Terkirim'].map((item, i) => (
                              <div key={i} className="flex items-center gap-3 text-gray-700 text-sm font-medium p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                  {item}
                              </div>
                          ))}
                      </div>
                      
                  </div>
              </div>

              {/* FEATURE B: SMART RSVP (Clean Dashboard) */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-16" data-aos="fade-right">
                  {/* Visual */}
                  <div className="flex-1 w-full relative">
                       <div className="absolute inset-0 bg-linear-to-bl from-blue-100 to-indigo-50 rounded-[3rem] transform rotate-3 scale-95"></div>
                       <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 relative z-10">
                          {/* Mockup Dashboard Table */}
                          <div className="space-y-6">
                              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                  <div>
                                      <h4 className="font-bold text-gray-900 text-lg">Konfirmasi Kehadiran</h4>
                                      <p className="text-xs text-gray-400">Update Real-time</p>
                                  </div>
                                  <span className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-xs font-bold border border-green-100">250 Hadir</span>
                              </div>
                              {[1,2,3].map((i) => (
                                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition cursor-default">
                                      <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-100 to-purple-100 flex items-center justify-center text-pink-600 text-xs font-bold border border-white shadow-sm">U{i}</div>
                                          <div>
                                              <p className="text-sm font-bold text-gray-800">Tamu Undangan {i}</p>
                                              <p className="text-xs text-gray-400">Membawa 2 Orang</p>
                                          </div>
                                      </div>
                                      <span className="flex h-3 w-3 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                      </span>
                                  </div>
                              ))}
                          </div>
                       </div>
                  </div>
                  
                  {/* Text */}
                  <div className="flex-1 space-y-8">
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                      </div>
                      <h2 className="text-4xl font-bold text-gray-900 font-serif">Data Tamu Rapi,<br/>Tanpa Pusing.</h2>
                      <p className="text-gray-500 leading-relaxed text-lg font-light">
                          Pantau siapa yang hadir dan siapa yang berhalangan secara real-time. Data tersimpan otomatis dan siap diexport ke Excel untuk kebutuhan katering.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {['Status Kehadiran', 'Jumlah Pax', 'Export PDF/Excel', 'Ucapan Doa'].map((item, i) => (
                              <div key={i} className="flex items-center gap-3 text-gray-700 text-sm font-medium p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                  {item}
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

          </div>
      </section>

      {/* --- 3. EXQUISITE DETAILS (LUXURY BENTO GRID - FIXED MOBILE) --- */}
      <section className="py-24 px-6 bg-stone-50" data-aos="fade-up">
          <div className="max-w-7xl mx-auto">
              
              <div className="text-center mb-16">
                  <span className="text-pink-500 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Exclusive Features</span>
                  <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-4">
                      Sentuhan Akhir yang <span className="italic text-pink-600">Sempurna</span>
                  </h2>
                  <p className="text-gray-500 max-w-xl mx-auto font-light">
                      Detail kecil yang dirancang untuk memberikan pengalaman tak terlupakan.
                  </p>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[650px]">
                  
                  {/* ITEM 1: MUSIC PLAYER */}
                  {/* FIX: Tambahkan 'h-96 md:h-auto' agar di HP punya tinggi tetap */}
                  <div className="md:col-span-1 md:row-span-2 relative rounded-[2.5rem] overflow-hidden shadow-2xl group border border-gray-100 h-96 md:h-auto">
                      <Image 
                        src="https://images.unsplash.com/photo-1507676184212-d03ab07a11d0?q=80&w=600&auto=format&fit=crop" 
                        alt="Music Cover" 
                        fill 
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent"></div>

                      <div className="absolute inset-0 p-8 flex flex-col justify-end">
                          <div className="flex gap-1 mb-6 h-8 items-end justify-center opacity-80">
                              {[1,2,3,4,5].map((i) => (
                                <span key={i} className={`w-1 bg-white rounded-full animate-[bounce_${1 + i*0.1}s_infinite]`}></span>
                              ))}
                          </div>

                          <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-5 rounded-3xl shadow-lg">
                              <h3 className="text-white font-serif text-xl font-bold mb-1 truncate">Beautiful in White</h3>
                              <p className="text-pink-200 text-xs uppercase tracking-widest mb-4">Shane Filan</p>
                              <div className="w-full bg-white/20 h-1 rounded-full mb-4 overflow-hidden">
                                  <div className="bg-pink-500 h-full w-2/3 rounded-full"></div>
                              </div>
                              <div className="flex justify-between items-center text-white">
                                  <svg className="w-5 h-5 opacity-70 cursor-pointer" fill="currentColor" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5zM15.5 12c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z"></path></svg>
                                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition shadow-lg cursor-pointer">
                                      <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                                  </div>
                                  <svg className="w-5 h-5 opacity-70 cursor-pointer" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"></path></svg>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* ITEM 2: GALLERY */}
                  {/* FIX: Tambahkan 'h-64 md:h-auto' */}
                  <div className="md:col-span-2 md:row-span-1 bg-black rounded-[2.5rem] relative overflow-hidden group shadow-xl border border-gray-800 h-64 md:h-auto">
                      <Image 
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000" 
                        alt="Gallery" 
                        fill 
                        className="object-cover opacity-70 group-hover:opacity-50 group-hover:scale-105 transition-all duration-1000"
                      />
                      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
                          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 text-white border border-white/30 group-hover:scale-110 transition">
                              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          </div>
                          <h3 className="text-3xl font-serif text-white font-bold mb-1 drop-shadow-md">Cinematic Gallery</h3>
                          <p className="text-white/80 text-sm max-w-sm font-light">Abadikan momen indah dalam grid yang estetik.</p>
                      </div>
                  </div>

                  {/* ITEM 3: CASHLESS GIFT */}
                  {/* FIX: Tambahkan 'h-64 md:h-auto' */}
                  <div className="md:col-span-1 md:row-span-1 bg-stone-50 rounded-[2.5rem] p-6 shadow-xl border border-stone-100 group relative overflow-hidden flex flex-col items-center justify-center h-64 md:h-auto">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-[0.03]"></div>
                      
                      <div className="relative w-48 h-32 transform group-hover:-translate-y-4 transition-transform duration-500 perspective-500">
                          <div className="absolute inset-0 bg-linear-to-br from-[#d4af37] via-[#f7e68d] to-[#d4af37] rounded-xl shadow-2xl rotate-3 group-hover:rotate-6 transition-all duration-500 border border-white/40 flex flex-col p-4 justify-between">
                              <div className="flex justify-between items-start">
                                  <div className="w-8 h-5 bg-white/30 rounded-md backdrop-blur-sm"></div>
                                  <div className="text-[8px] text-white font-bold tracking-widest opacity-80">PLATINUM</div>
                              </div>
                              <div>
                                  <div className="w-24 h-2 bg-white/40 rounded-full mb-2"></div>
                                  <div className="flex justify-between">
                                      <div className="w-12 h-2 bg-white/30 rounded-full"></div>
                                      <div className="w-8 h-8 rounded-full bg-white/20 -mt-4 border border-white/30"></div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="text-center mt-8 relative z-10">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">Smart Gift</h3>
                          <p className="text-gray-500 text-xs">QRIS & Transfer</p>
                      </div>
                  </div>

                  {/* ITEM 4: COUNTDOWN */}
                  <div className="md:col-span-1 md:row-span-1 bg-gray-950 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group border border-gray-800 flex flex-col items-center justify-center h-64 md:h-auto">
                      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-gray-800 via-gray-950 to-black opacity-50"></div>
                      
                      <div className="relative z-10 text-center w-full">
                          <p className="text-[10px] tracking-[0.3em] text-yellow-500/80 uppercase mb-5 font-bold">The Big Day</p>
                          <div className="grid grid-cols-3 gap-2 mb-5">
                              <div className="flex flex-col items-center">
                                  <span className="text-3xl font-serif text-white font-bold">12</span>
                                  <span className="text-[8px] text-gray-500 uppercase mt-1">Days</span>
                              </div>
                              <div className="flex flex-col items-center">
                                  <span className="text-3xl font-serif text-white font-bold">08</span>
                                  <span className="text-[8px] text-gray-500 uppercase mt-1">Hrs</span>
                              </div>
                              <div className="flex flex-col items-center">
                                  <span className="text-3xl font-serif font-bold text-pink-500 animate-pulse">45</span>
                                  <span className="text-[8px] text-gray-500 uppercase mt-1">Mins</span>
                              </div>
                          </div>
                          <div className="w-10 h-px bg-yellow-500/50 mx-auto"></div>
                      </div>
                  </div>

                  {/* ITEM 5: LOVE STORY */}
                  {/* FIX: Tambahkan 'h-64 md:h-auto' */}
                  <div className="md:col-span-2 md:row-span-1 bg-white rounded-[2.5rem] p-8 shadow-xl border border-pink-100 flex flex-col justify-center relative overflow-hidden group hover:border-pink-200 transition-colors h-64 md:h-auto">
                      <div className="relative z-10">
                          <div className="flex justify-between items-start mb-8">
                              <div>
                                  <h3 className="text-2xl font-serif font-bold text-gray-900">Love Journey</h3>
                                  <p className="text-gray-500 text-sm mt-1 font-light">Cerita cinta dari awal hingga selamanya.</p>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500">
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                              </div>
                          </div>

                          <div className="relative px-4">
                              <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-gray-200 -translate-y-1/2"></div>
                              <div className="relative flex justify-between items-center text-center">
                                  {['First Met', 'First Date', 'Proposal'].map((step, i) => (
                                      <div key={i} className="group/point flex flex-col items-center gap-3 cursor-pointer">
                                          <div className="w-3 h-3 bg-white rounded-full border-4 border-gray-300 shadow-sm z-10 group-hover/point:border-pink-500 group-hover/point:scale-125 transition-all"></div>
                                          <span className="text-[10px] text-gray-400 group-hover/point:text-gray-800 uppercase tracking-wider transition-colors">{step}</span>
                                      </div>
                                  ))}
                                  <div className="flex flex-col items-center gap-3">
                                      <div className="w-6 h-6 bg-pink-600 rounded-full shadow-lg z-10 flex items-center justify-center animate-bounce">
                                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                      </div>
                                      <span className="text-[10px] font-bold text-pink-600 uppercase tracking-wider">The Day</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      </section>

      {/* --- 4. FAQ SECTION --- */}
      <section className="py-24 px-6 bg-stone-50" data-aos="fade-up">
          <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-serif">Pertanyaan Umum</h2>
              <div className="space-y-4">
                  {[
                      { q: "Apakah bisa ganti foto setelah undangan disebar?", a: "Tentu bisa! Anda bisa mengedit konten kapan saja tanpa mengubah link undangan." },
                      { q: "Berapa lama masa aktif undangan?", a: "Untuk paket Premium dan Exclusive, masa aktifnya selamanya (Lifetime). Paket Basic aktif 3 hari." },
                      { q: "Apakah ada batasan jumlah tamu?", a: "Tidak ada. Anda bebas mengirim ke berapapun jumlah tamu (Unlimited Guests)." },
                      { q: "Bisakah menggunakan domain sendiri?", a: "Bisa. Fitur Custom Domain (.com) tersedia pada paket Exclusive." },
                  ].map((faq, i) => (
                      <div key={i} className="border border-gray-200 bg-white rounded-2xl p-6 hover:shadow-lg transition duration-300 cursor-pointer group">
                          <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-3 group-hover:text-pink-600 transition-colors">
                              <span className="text-pink-300 group-hover:text-pink-600">Q.</span> {faq.q}
                          </h4>
                          <p className="text-gray-500 text-sm ml-6 leading-relaxed font-light">{faq.a}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- 5. CTA FOOTER (Revised: Clean & Elegant) --- */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
          
          {/* Dekorasi Background Halus (Pink Glow) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-100 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 font-serif leading-tight">
                  Siap Mewujudkan <br/>
                  <span className="text-pink-600 italic">Pernikahan Impian?</span>
              </h2>
              
              <p className="text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto">
                  Bergabunglah dengan ribuan pasangan bahagia lainnya. Coba gratis sekarang, rasakan kemudahannya.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  {/* Tombol Utama: Pink Solid */}
                  <Link href="/login" className="bg-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-[0_10px_40px_-10px_rgba(219,39,119,0.5)] hover:bg-pink-700 hover:scale-105 transition transform">
                      Buat Undangan Gratis
                  </Link>
                  
                  {/* Tombol Kedua: Outline Abu-abu */}
                  <Link href="/#harga" className="bg-white border border-gray-200 text-gray-600 px-10 py-4 rounded-full font-bold text-lg hover:border-pink-200 hover:text-pink-600 hover:bg-pink-50 transition">
                      Lihat Harga Paket
                  </Link>
              </div>

              <p className="text-xs text-gray-400 mt-8">
                  Tanpa kartu kredit • Batalkan kapan saja • Support 24/7
              </p>
          </div>
      </section>

      <Footer />
    </main>
  );
}