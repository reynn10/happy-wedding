import Image from "next/image";
import Link from 'next/link';

export default function Hero() {
  return (
    <section 
      id="beranda"
      className="relative min-h-[100dvh] md:min-h-[110vh] flex items-center pt-0 overflow-hidden" 
    >
      
      {/* --- 1. BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
          alt="Wedding Background"
          fill
          className="object-cover object-center"
          priority 
          sizes="100vw"
        />
        {/* Layer Gradient Gelap */}
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-black/30"></div>
      </div>

      
      {/* --- 2. KONTEN --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full relative z-10">
        
        {/* KOLOM KIRI: TEKS */}
        <div className="text-center md:text-left space-y-4 md:space-y-8 animate-fade-in-up mt-20 md:mt-0">
           {/* Badge Kecil */}
           <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-pink-600/20 backdrop-blur-md border border-pink-500/30 text-pink-300 font-medium text-xs md:text-sm rounded-full">
              ✨ Undangan Digital Premium
           </div>
           
           {/* HEADLINE: Responsif (Kecil di HP, Besar di Desktop) */}
           <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight font-serif drop-shadow-lg">
              Abadikan Momen <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400">
                Penuh Cinta
              </span>
           </h1>
           
           {/* Paragraf: Responsif */}
           <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-lg mx-auto md:mx-0">
              Buat undangan pernikahan impianmu dengan puluhan tema eksklusif. Fitur lengkap, mudah diedit, dan siap kirim ke semua tamu.
           </p>

           {/* Tombol: Ukuran responsif */}
           <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 justify-center md:justify-start px-4 md:px-0">
              <Link href="/login" className="w-full sm:w-auto">
                  <button className="w-full px-6 py-3 md:px-8 md:py-4 bg-pink-600 text-white font-bold rounded-full shadow-lg hover:bg-pink-700 transition text-sm md:text-base">
                    Buat Sekarang
                  </button>
              </Link>
              <Link href="/features" className="w-full sm:w-auto">
                  <button className="w-full px-6 py-3 md:px-8 md:py-4 bg-white/10 border border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition backdrop-blur-sm text-sm md:text-base">
                    Pelajari Fitur
                  </button>
              </Link>
           </div>
           
           {/* Rating */}
           <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 text-xs md:text-sm text-gray-400 pt-2">
              <span className="flex text-yellow-400">★★★★★</span>
              <span>4.9/5 dari 2.000+ Pengantin</span>
           </div>
        </div>

        {/* KOLOM KANAN: OPSI 5 (FLOATING FEATURES) - Hidden di Mobile */}
        <div className="hidden md:flex justify-center items-center relative h-[600px] w-full">
            
            <div className="absolute w-[400px] h-[400px] bg-pink-500 rounded-full blur-[120px] opacity-20 animate-pulse"></div>

            <div className="relative w-72 h-[520px] bg-black rounded-[3rem] border-8 border-gray-800 shadow-2xl z-10 overflow-hidden transform transition hover:scale-105 duration-500">
                <Image 
                    src="https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1976" 
                    alt="Main App" fill className="object-cover opacity-90"
                />
                <div className="absolute inset-0 flex flex-col justify-end pb-10 px-6 bg-linear-to-t from-black/80 via-transparent to-transparent">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center">
                        <h3 className="text-white font-serif text-xl mb-1">Romeo & Juliet</h3>
                        <p className="text-gray-300 text-xs mb-3">Minggu, 12 Des 2025</p>
                        <button className="bg-pink-600 w-full py-2 rounded-full text-white text-xs font-bold">Buka Undangan</button>
                    </div>
                </div>
            </div>

            <div className="absolute top-20 -left-4 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-[bounce_3s_infinite] z-20 max-w-[200px]">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Baru Saja</p>
                    <p className="text-sm font-bold text-gray-800">Budi Hadir ✅</p>
                </div>
            </div>

            <div className="absolute top-1/2 -right-8 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-[pulse_4s_infinite] z-20 max-w-[220px]">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Amplop Digital</p>
                    <p className="text-sm font-bold text-gray-800">Rp 500.000 masuk 💰</p>
                </div>
            </div>

            <div className="absolute bottom-20 left-0 bg-white/90 backdrop-blur p-3 rounded-2xl shadow-xl flex items-center gap-3 z-20 max-w-60">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative">
                    <Image src="https://i.pravatar.cc/100?img=5" fill className="object-cover" alt="User" />
                </div>
                <div>
                    <p className="text-xs font-bold text-gray-800">Siti Aminah</p>
                    <p className="text-xs text-gray-500 italic">"Selamat ya Romeo! 😍"</p>
                </div>
            </div>

        </div>

      </div>

      {/* --- DIVIDER: WAVE SVG (WARNA FIXED) --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 z-20">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(130%+1.3px)] h-[80] fill-[#fafaf9] 
          ">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
      </div>

    </section>
  );
}