'use client';
import React, { useState } from 'react';

const faqs = [
  { q: "Apakah undangan bisa diedit setelah dibayar?", a: "Tentu saja! Anda memiliki akses penuh untuk mengedit detail acara, foto, dan daftar tamu kapan saja tanpa batas, bahkan setelah undangan disebar." },
  { q: "Apakah ada batasan jumlah tamu?", a: "Tidak ada batasan (Unlimited). Paket Premium dan Exclusive membebaskan Anda mengirim ke berapapun jumlah tamu tanpa biaya tambahan." },
  { q: "Berapa lama masa aktif undangan?", a: "Untuk Paket Premium dan Exclusive, masa aktifnya adalah SELAMANYA (Lifetime). Undangan Anda akan tetap bisa diakses sebagai kenang-kenangan digital." },
  { q: "Apakah musik bisa ganti sendiri?", a: "Bisa. Kami menyediakan library musik romantis, atau Anda bisa mengunggah file MP3 pilihan Anda sendiri." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    // FIX: bg-transparent
    <section className="py-15 bg-transparent relative">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">Sering Ditanyakan</h2>
          <p className="text-gray-500">Punya pertanyaan lain? Hubungi WhatsApp Support kami.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div key={index} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-white border-pink-200 shadow-lg shadow-pink-100' : 'bg-white/60 border-gray-200 hover:border-pink-200 hover:bg-white'}`}>
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex justify-between items-center p-6 text-left bg-transparent transition">
                <span className={`font-bold ${openIndex === index ? 'text-pink-600' : 'text-gray-800'}`}>{item.q}</span>
                <svg className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-pink-500' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-0 text-gray-600 text-sm leading-relaxed">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}