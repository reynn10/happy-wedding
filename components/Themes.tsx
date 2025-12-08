'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const themeList = [
  { id: 1, name: "Rustic Nature", category: "Outdoor", image: "1764269713275-9fea9f0d91c8", description: "Nuansa alam yang hangat dengan ornamen kayu." },
  { id: 2, name: "Classic Elegant", category: "Luxury", image: "1764641642780-21475fb85af1", description: "Desain putih bersih nan mewah untuk pernikahan sakral." },
  { id: 3, name: "Dark Floral", category: "Modern", image: "1633051567046-844064059c53", description: "Sentuhan bunga gelap yang romantis dan misterius." },
  { id: 4, name: "Javanese Heritage", category: "Traditional", image: "1519741497674-611481863552", description: "Keagungan budaya Jawa dengan sentuhan modern." }
];

export default function Themes() {
  const [activeId, setActiveId] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = themeList.findIndex(t => t.id === currentId);
        const nextIndex = (currentIndex + 1) % themeList.length;
        return themeList[nextIndex].id;
      });
    }, 3000); 
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    // FIX: bg-transparent (Blobs sudah ada di Parent)
    <section id="tema" className="py-15 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-serif">
              Pilihan Tema Eksklusif
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Berjalan otomatis. Ketuk untuk menahan gambar.
            </p>
          </div>
          <Link href="/themes">
              <button className="text-pink-600 font-bold hover:text-pink-700 flex items-center gap-2 transition-colors group text-sm">
                Lihat Semua Koleksi
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
          </Link>
        </div>
        <div className="flex flex-row gap-2 md:gap-4 h-[500px] w-full" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          {themeList.map((theme) => {
            const isActive = activeId === theme.id;
            return (
              <div key={theme.id} onClick={() => setActiveId(theme.id)} className={`relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-white/50 hover:shadow-2xl ${isActive ? 'flex-10 md:flex-3' : 'flex-1'}`}>
                {isActive && !isPaused && (<div className="absolute top-0 left-0 h-1 bg-pink-500 z-50 animate-[width_3s_linear_infinite]" style={{ width: '0%' }}></div>)}
                <Image src={`https://images.unsplash.com/photo-${theme.image}?q=80&w=600&auto=format&fit=crop`} alt={theme.name} fill className={`object-cover transition-transform duration-1000 ${isActive ? 'scale-100' : 'scale-150 opacity-70'}`}/>
                <div className={`absolute inset-0 transition-colors duration-500 ${isActive ? 'bg-black/10' : 'bg-black/60'}`}></div>
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}><p className="text-white text-xs font-bold tracking-widest uppercase -rotate-90 whitespace-nowrap">{theme.category}</p></div>
                <div className={`absolute bottom-0 left-0 w-full p-4 md:p-8 bg-linear-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end h-3/4 transition-opacity duration-500 ${isActive ? 'opacity-100 delay-200' : 'opacity-0'}`}>
                  <span className="inline-block w-fit mb-2 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">{theme.category}</span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 leading-tight whitespace-nowrap md:whitespace-normal">{theme.name}</h3>
                  <p className="text-gray-200 text-xs md:text-sm mb-6 line-clamp-2 md:line-clamp-none">{theme.description}</p>
                  <div className="flex items-center gap-3"><button className="bg-pink-600 text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-bold hover:bg-pink-700 transition shadow-lg whitespace-nowrap">Lihat Demo</button></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}