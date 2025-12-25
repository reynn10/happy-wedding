'use client';
import React, { useState } from 'react';

const faqs = [
  { q: "Apakah undangan bisa diedit setelah dibayar?", a: "Tentu saja! Anda memiliki akses penuh untuk mengedit detail acara, foto, dan daftar tamu kapan saja tanpa batas, bahkan setelah undangan disebar ke tamu." },
  { q: "Apakah ada batasan jumlah tamu?", a: "Tidak ada batasan (Unlimited). Paket Premium dan Exclusive membebaskan Anda mengirim ke berapapun jumlah tamu tanpa biaya tambahan sepeserpun." },
  { q: "Berapa lama masa aktif undangan?", a: "Untuk Paket Premium dan Exclusive, masa aktifnya adalah SELAMANYA (Lifetime). Undangan Anda akan tetap bisa diakses sebagai kenang-kenangan digital yang abadi." },
  { q: "Apakah musik bisa ganti sendiri?", a: "Bisa. Kami menyediakan library musik romantis pilihan, atau Anda bisa mengunggah file MP3 pilihan Anda sendiri agar lebih personal." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Editorial Header (Sticky) */}
            <div className="lg:col-span-5 text-left lg:sticky lg:top-32">
                {/* UPDATE: Label Q&A dihapus agar tampilan lebih bersih */}
                
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-[0.9] mb-6">
                    Pertanyaan <br/> <span className=" text-pink-600 font-light">Umum</span>
                </h2>
                
                <p className="text-gray-500 text-sm md:text-base leading-relaxed font-light mb-8 max-w-md">
                    Segala hal yang perlu Anda ketahui tentang layanan undangan digital kami. Jika butuh bantuan lebih lanjut, tim support kami siap membantu.
                </p>
                
                {/* Decorative Line */}
                <div className="w-24 h-px bg-pink-200 mb-8"></div>

                <button className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-900 pb-1 hover:text-pink-600 hover:border-pink-600 transition-all">
                    Hubungi WhatsApp Support
                </button>
            </div>

            {/* Right Column: Accordion List */}
            <div className="lg:col-span-7 flex flex-col gap-4">
                {faqs.map((item, index) => (
                    <div 
                        key={index}
                        className={`group rounded-[2.5rem] border transition-all duration-500 ease-out overflow-hidden
                            ${openIndex === index 
                                ? 'bg-white border-pink-100 shadow-[0_10px_40px_-10px_rgba(236,72,153,0.1)]' 
                                : 'bg-white/40 border-stone-100 hover:bg-white hover:border-stone-200'
                            }
                        `}
                    >
                        <button 
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-start justify-between p-6 md:p-8 text-left"
                        >
                            <div className="flex gap-5 md:gap-8">
                                {/* Stylized Number */}
                                <span className={`font-serif text-2xl italic font-bold transition-colors duration-300 ${openIndex === index ? 'text-pink-600' : 'text-stone-300'}`}>
                                    0{index + 1}
                                </span>
                                <span className={`text-lg md:text-xl font-serif font-bold transition-colors duration-300 mt-1 ${openIndex === index ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                    {item.q}
                                </span>
                            </div>
                            
                            {/* Animated Icon */}
                            <span className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 shrink-0 ml-4 mt-1
                                ${openIndex === index 
                                    ? 'bg-pink-600 border-pink-600 text-white rotate-180' 
                                    : 'bg-transparent border-stone-200 text-stone-400 group-hover:border-pink-300 group-hover:text-pink-400'
                                }
                            `}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </span>
                        </button>
                        
                        {/* Content Area */}
                        <div 
                            className={`grid transition-all duration-500 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                        >
                            <div className="overflow-hidden">
                                <div className="p-6 md:p-8 pt-0 pl-5rem md:pl-6rem">
                                    <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed border-l-2 border-stone-100 pl-6">
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}