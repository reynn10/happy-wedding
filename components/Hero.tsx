import Image from "next/image";
import Link from 'next/link';

export default function Hero() {
  return (
    <section 
      id="beranda"
      className="relative min-h-screen md:min-h-[110vh] flex items-center pt-0 overflow-hidden" 
      style={{ 
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 100%), url("https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full z-10">
        
        {/* --- KOLOM KIRI: TEKS --- */}
        <div className="text-center md:text-left space-y-6 md:space-y-8 animate-fade-in-up mt-16 md:mt-0">
           <div className="inline-block px-4 py-1.5 bg-pink-600/20 backdrop-blur-md border border-pink-500/30 text-pink-300 font-medium text-sm rounded-full">
              ✨ Undangan Digital Premium
           </div>
           
           <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight font-serif drop-shadow-lg">
              Abadikan Momen <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400">
                Penuh Cinta
              </span>
           </h1>
           
           <p className="text-lg text-gray-300 leading-relaxed max-w-lg mx-auto md:mx-0">
              Buat undangan pernikahan impianmu dengan puluhan tema eksklusif. Fitur lengkap, mudah diedit, dan siap kirim ke semua tamu.
           </p>

           <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <Link href="/login">
                  <button className="px-8 py-4 bg-pink-600 text-white font-bold rounded-full shadow-[0_0_20px_rgba(219,39,119,0.5)] hover:bg-pink-700 hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                    Buat Sekarang
                  </button>
              </Link>
              <Link href="/features">
                  <button className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto">
                    Pelajari Fitur
                  </button>
              </Link>
           </div>
           
           <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-400 pt-4">
              <span className="flex text-yellow-400">★★★★★</span>
              <span>4.9/5 dari 2.000+ Pengantin</span>
           </div>
        </div>

        {/* --- KOLOM KANAN: OPSI 5 (FLOATING FEATURES) --- */}
        <div className="hidden md:flex justify-center items-center relative h-[600px] w-full">
            
            {/* Lingkaran Glow */}
            <div className="absolute w-[400px] h-[400px] bg-pink-500 rounded-full blur-[120px] opacity-20 animate-pulse"></div>

            {/* HP UTAMA */}
            <div className="relative w-72 h-[520px] bg-black rounded-[3rem] border-8 border-gray-800 shadow-2xl z-10 overflow-hidden transform transition hover:scale-105 duration-500">
                <Image 
                    src="https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1976" 
                    alt="Main App" fill className="object-cover opacity-90"
                />
                {/* Mockup UI Undangan */}
                <div className="absolute inset-0 flex flex-col justify-end pb-10 px-6 bg-linear-to-t from-black/80 via-transparent to-transparent">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center">
                        <h3 className="text-white font-serif text-xl mb-1">Romeo & Juliet</h3>
                        <p className="text-gray-300 text-xs mb-3">Minggu, 12 Des 2025</p>
                        <button className="bg-pink-600 w-full py-2 rounded-full text-white text-xs font-bold">Buka Undangan</button>
                    </div>
                </div>
            </div>

            {/* NOTIFIKASI MELAYANG 1 */}
            <div className="absolute top-20 -left-4 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-[bounce_3s_infinite] z-20 max-w-[200px]">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Baru Saja</p>
                    <p className="text-sm font-bold text-gray-800">Budi Hadir ✅</p>
                </div>
            </div>

            {/* NOTIFIKASI MELAYANG 2 */}
            <div className="absolute top-1/2 -right-8 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-[pulse_4s_infinite] z-20 max-w-[220px]">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Amplop Digital</p>
                    <p className="text-sm font-bold text-gray-800">Rp 500.000 masuk 💰</p>
                </div>
            </div>

            {/* NOTIFIKASI MELAYANG 3 */}
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

      {/* --- DIVIDER: WAVE SVG --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 z-20">
          {/* FIX: Menggunakan HEX color #fafaf9 (Stone-50) agar warnanya absolut sama dengan background page */}
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(130%+1.3px)] h-[80]" style={{ fill: '#fafaf9' }}>
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
      </div>

    </section>
  );
}