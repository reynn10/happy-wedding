import React from 'react';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="relative rounded-[3rem] overflow-hidden p-12 md:p-24 text-center shadow-2xl group">
            
            {/* 1. Background Image with Parallax Effect */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070")' }}
            ></div>
            
            {/* 2. Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-stone-950/80 transition-opacity duration-500 group-hover:bg-stone-950/70"></div>
            
            {/* 3. Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none"></div>

            {/* 4. Content */}
            <div className="relative z-10 space-y-8 animate-fade-in-up">
                
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-pink-200 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></span>
                    Mulai Sekarang
                </div>

                <h2 className="text-4xl md:text-7xl font-serif font-bold text-white leading-tight drop-shadow-xl">
                    Wujudkan Pernikahan <br/> 
                    <span className="italic text-pink-300 font-light">Impian Anda</span> Hari Ini
                </h2>
                
                <p className="text-stone-300 max-w-xl mx-auto text-sm md:text-lg font-light leading-relaxed tracking-wide">
                    Bergabunglah dengan ribuan pasangan bahagia lainnya. Buat undangan digital eksklusif Anda dalam hitungan menit, gratis untuk dicoba.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                    <Link href="/login" className="w-full sm:w-auto">
                        <button className="w-full px-10 py-4 bg-pink-600 text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-pink-700 transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(219,39,119,0.5)] flex items-center justify-center gap-3 hover:scale-105">
                            Buat Undangan
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                        </button>
                    </Link>
                    <Link href="/#harga" className="w-full sm:w-auto">
                        <button className="w-full px-10 py-4 bg-transparent border border-stone-600 text-stone-300 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-stone-900 hover:border-white transition-all duration-300">
                            Lihat Paket
                        </button>
                    </Link>
                </div>

                <p className="text-stone-500 text-[10px] mt-8 uppercase tracking-widest opacity-60">
                    Tidak perlu kartu kredit · Batalkan kapan saja
                </p>
            </div>

        </div>
      </div>
    </section>
  );
}