'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const reviews = [
  {
    name: "Sarah & Dimas",
    date: "December 12, 2024",
    location: "Plataran Menteng",
    text: "Desainnya benar-benar merepresentasikan 'Dream Wedding' kami. Fitur RSVP sangat membantu mengelola tamu VIP. Worth every penny!",
    weddingPhoto: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop",
    avatar: "https://images.unsplash.com/photo-1623091411315-266390560623?w=150&h=150&fit=crop&q=80",
    rating: 5
  },
  {
    name: "Reza & Putri",
    date: "February 14, 2025",
    location: "The Ritz-Carlton",
    text: "Simpel, Elegan, dan Cepat. Tamu-tamu kami bilang undangannya sangat aesthetic dan mudah dibuka di HP.",
    weddingPhoto: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800&auto=format&fit=crop",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80",
    rating: 5
  },
  {
    name: "Bella & Edward",
    date: "March 20, 2025",
    location: "Glass House Bogor",
    text: "Suka banget sama tema 'Dark Floral'-nya. Terasa sangat premium. Adminnya juga ramah banget bantuin setup data awal.",
    weddingPhoto: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80",
    rating: 5
  },
  {
    name: "Andi & Nina",
    date: "April 05, 2025",
    location: "Balai Kartini",
    text: "Fitur angpao digitalnya sangat berguna. Desainnya modern dan tidak norak. Sangat merekomendasikan Happy Wedding!",
    weddingPhoto: "https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=800&auto=format&fit=crop",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  // Ambil 2 testimoni saat ini
  const currentReviews = [
    reviews[currentIndex % reviews.length],
    reviews[(currentIndex + 1) % reviews.length]
  ];

  return (
    <section className="py-15 bg-transparent relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-rose-100/30 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight">
            Cerita Cinta Mereka
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm md:text-base font-light">
            Momen bahagia dari pasangan yang telah mewujudkan pernikahan impian mereka bersama kami.
          </p>
        </div>

        {/* REVIEWS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch transition-opacity duration-500 ease-in-out">
          {currentReviews.map((review, idx) => (
            <div 
              key={`${currentIndex}-${idx}`} 
              className={`group relative bg-white rounded-[2.5rem] border border-stone-100 overflow-hidden
                shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] 
                hover:shadow-[0_20px_50px_-10px_rgba(219,39,119,0.15)] hover:-translate-y-2
                transition-all duration-700 ease-out animate-fade-in-up
                ${idx === 1 ? 'hidden md:block' : ''} 
              `}
            >
              
              {/* 1. Foto Pernikahan */}
              <div className="p-3 pb-0">
                <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-4xl">
                    <Image 
                    src={review.weddingPhoto} 
                    alt={`${review.name} Wedding`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-lienar-to-t from-black/60 to-transparent opacity-80"></div>
                    
                    <div className="absolute bottom-6 left-8 text-white z-10">
                        <p className="text-[10px] font-bold tracking-widest uppercase mb-1 opacity-90">{review.date}</p>
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <svg className="w-4 h-4 text-pink-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                            {review.location}
                        </div>
                    </div>
                </div>
              </div>

              {/* 2. Konten Testimoni */}
              <div className="p-8 pt-10 relative">
                  <div className="absolute -top-6 right-8 w-16 h-16 rounded-full border-4 border-white shadow-lg overflow-hidden ring-1 ring-stone-100">
                      <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                  </div>

                  <div className="flex gap-1 mb-5">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.26.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.55-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>

                  <h3 className="font-serif font-bold text-3xl text-gray-900 mb-4 group-hover:text-pink-600 transition-colors">
                      {review.name}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed font-light text-base italic">
                    "{review.text}"
                  </p>
              </div>

            </div>
          ))}
        </div>

        {/* Indikator Slide Responsif */}
        
        {/* MOBILE: 4 Titik (Slide per Item) */}
        <div className="flex md:hidden justify-center mt-12 gap-2">
            {reviews.map((_, idx) => (
                <button
                    key={`mob-${idx}`}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentIndex === idx ? 'w-8 bg-pink-600' : 'w-2 bg-stone-300 hover:bg-pink-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                />
            ))}
        </div>

        {/* DESKTOP: 2 Titik (Slide per Halaman) */}
        <div className="hidden md:flex justify-center mt-12 gap-2">
            {Array.from({ length: Math.ceil(reviews.length / 2) }).map((_, idx) => (
                <button
                    key={`desk-${idx}`}
                    onClick={() => setCurrentIndex(idx * 2)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                        Math.floor(currentIndex / 2) === idx ? 'w-8 bg-pink-600' : 'w-2 bg-stone-300 hover:bg-pink-300'
                    }`}
                    aria-label={`Go to group ${idx + 1}`}
                />
            ))}
        </div>

      </div>
    </section>
  );
}