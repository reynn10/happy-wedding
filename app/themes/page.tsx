'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

// --- DATA DUMMY TEMA (Lebih banyak) ---
const allThemes = [
  { id: 1, name: "Rustic Nature", category: "Outdoor", image: "1605106702734-205df224ecce" },
  { id: 2, name: "Classic Elegant", category: "Luxury", image: "1511285560982-1351cdeb9821" },
  { id: 3, name: "Dark Floral", category: "Modern", image: "1507646227500-4d38930012be" },
  { id: 4, name: "Javanese Heritage", category: "Traditional", image: "1519741497674-611481863552" },
  { id: 5, name: "Beach Sunset", category: "Outdoor", image: "1515934751635-c81c6bc9a2d8" },
  { id: 6, name: "Minimal White", category: "Modern", image: "1469371670807-013ccf25f16e" },
  { id: 7, name: "Gold Royal", category: "Luxury", image: "1523438885200-e635ba2c371e" },
  { id: 8, name: "Garden Party", category: "Outdoor", image: "1507676184212-d03ab07a11d0" },
];

const categories = ["All", "Modern", "Traditional", "Luxury", "Outdoor"];

export default function ThemesPage() {
  const [filter, setFilter] = useState("All");

  // Filter logic
  const filteredThemes = filter === "All" 
    ? allThemes 
    : allThemes.filter(theme => theme.category === filter);

  return (
    <main className="min-h-screen bg-stone-50 font-sans selection:bg-pink-100 selection:text-pink-600">
      <Navbar />
      
      {/* Header */}
      <section className="pt-20 pb-12 px-6 text-center" data-aos="fade-down">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 font-serif mb-4">Koleksi Tema Eksklusif</h1>
          <p className="text-gray-500 max-w-xl mx-auto">Pilih desain undangan yang paling menggambarkan kisah cinta Anda.</p>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 pb-12" data-aos="fade-up">
          <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border
                        ${filter === cat 
                            ? 'bg-pink-600 text-white border-pink-600 shadow-lg scale-105' 
                            : 'bg-white text-gray-500 border-gray-200 hover:border-pink-300 hover:text-pink-500'}
                    `}
                  >
                      {cat}
                  </button>
              ))}
          </div>
      </section>

      {/* Grid Gallery */}
      <section className="px-6 pb-24 max-w-7xl mx-auto" data-aos="zoom-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredThemes.map((theme) => (
                  <div key={theme.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                      
                      {/* Image Container */}
                      <div className="relative h-80 overflow-hidden">
                          <Image 
                            src={`https://images.unsplash.com/photo-${theme.image}?q=80&w=600&auto=format&fit=crop`}
                            alt={theme.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          
                          {/* Overlay Action */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                              <Link href={`/invitation/demo?theme=${theme.id}`} className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-bold hover:bg-pink-50 transition">
                                  Preview
                              </Link>
                              <Link href="/login" className="bg-pink-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-pink-700 transition">
                                  Pilih
                              </Link>
                          </div>

                          <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider rounded-full text-gray-800 shadow-sm">
                                  {theme.category}
                              </span>
                          </div>
                      </div>

                      {/* Info */}
                      <div className="p-5 text-center">
                          <h3 className="font-serif font-bold text-lg text-gray-900 mb-1">{theme.name}</h3>
                          <p className="text-xs text-gray-400 uppercase tracking-widest">Premium Design</p>
                      </div>
                  </div>
              ))}
          </div>

          {/* Empty State jika filter kosong */}
          {filteredThemes.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                  <p>Belum ada tema untuk kategori ini.</p>
              </div>
          )}
      </section>

      <Footer />
    </main>
  );
}