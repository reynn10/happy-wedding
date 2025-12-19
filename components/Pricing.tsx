import React from 'react';
import Image from 'next/image';

const plans = [
  {
    name: "Basic",
    price: "Gratis",
    description: "Untuk acara lamaran atau syukuran kecil yang intim dan hangat.",
    features: [
      "Masa aktif 3 hari",
      "Maksimal 20 Tamu",
      "Tema Standard",
      "Tanpa Musik",
      "Watermark Happy Wedding"
    ],
    buttonText: "Mulai Sekarang",
    popular: false,
    // Gambar Ilustrasi: Minimalist Stationery
    image: "https://images.unsplash.com/photo-1532417302074-00e90f43d092?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Premium",
    price: "Rp 149rb",
    description: "Pilihan favorit pengantin. Fitur lengkap untuk momen yang sempurna.",
    features: [
      "Masa aktif Selamanya",
      "Tamu Tanpa Batas (Unlimited)",
      "Akses Semua Tema Premium",
      "Background Musik",
      "Broadcast WhatsApp Otomatis",
      "Galeri Foto & Video",
      "Peta Navigasi",
      "Buku Tamu & Amplop Digital"
    ],
    buttonText: "Pilih Premium",
    popular: true, 
    // Gambar Ilustrasi: Floral Decoration
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Exclusive",
    price: "Rp 299rb",
    description: "Layanan prioritas dengan domain pribadi (.com) yang sangat elegan.",
    features: [
      "Semua Fitur Premium",
      "Custom Domain (.com)",
      "Hapus Watermark Total",
      "Prioritas Support 24/7",
      "Jasa Input Data Tamu",
      "Revisi Desain Minor"
    ],
    buttonText: "Hubungi Admin",
    popular: false,
    // Gambar Ilustrasi: Luxury Table Setting
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop"
  },
];

export default function Pricing() {
  return (
    <section id="harga" className="py-24 bg-transparent relative overflow-hidden">
      
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header - Editorial Style */}
        <div className="text-center mb-16 md:mb-20">
          {/* UPDATE: Label "The Collection" dihapus */}
          
          {/* UPDATE: Heading satu warna (Text Gray-900) */}
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight">
            Investasi Kebahagiaan
          </h2>
          
          <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm md:text-base font-light leading-relaxed">
            Pilih paket yang sesuai dengan cerita cinta Anda. Transparan, tanpa biaya tersembunyi.
          </p>
        </div>

        {/* Pricing Grid - Magazine Card Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`group relative flex flex-col rounded-[2.5rem] bg-white border border-stone-100 overflow-hidden transition-all duration-500
                ${plan.popular 
                  ? 'shadow-[0_20px_60px_-15px_rgba(236,72,153,0.3)] scale-100 md:scale-105 z-10 ring-1 ring-pink-100' 
                  : 'shadow-sm hover:shadow-xl hover:-translate-y-2'
                }
              `}
            >
              
              {/* 1. Header Gambar (Ilustrasi) */}
              {/* UPDATE: Gambar dibuat rounded di dalam kartu */}
              <div className="p-4 pb-0">
                <div className="relative h-64 w-full overflow-hidden rounded-3xl">
                  <Image 
                    src={plan.image} 
                    alt={plan.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay Gradient: Gelap di bawah agar teks terbaca */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Nama Paket di Atas Gambar */}
                  <div className="absolute bottom-6 left-6 text-white z-10">
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1 opacity-80 text-stone-300">Paket</p>
                      <h3 className="font-serif text-3xl font-bold tracking-wide">{plan.name}</h3>
                  </div>

                  {/* Badge Popular (Jika Ada) */}
                  {plan.popular && (
                      <div className="absolute top-4 right-4">
                          <div className="bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-full shadow-lg">
                              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Recommended</span>
                          </div>
                      </div>
                  )}
                </div>
              </div>

              {/* 2. Konten Harga & Fitur */}
              <div className="p-8 pt-6 flex flex-col h-full grow">
                {/* Harga */}
                <div className="flex items-baseline gap-1 mb-4">
                   <span className={`font-serif font-bold text-gray-900 ${plan.popular ? 'text-5xl' : 'text-4xl'}`}>
                      {plan.price}
                   </span>
                   {plan.price !== "Gratis" && <span className="text-gray-400 text-xs uppercase tracking-wide">/acara</span>}
                </div>

                {/* Deskripsi (Quote Style) */}
                <p className="text-gray-500 text-xs italic leading-relaxed border-l-2 border-pink-200 pl-4 mb-8 font-light">
                  "{plan.description}"
                </p>

                {/* Divider Halus */}
                <div className="w-full h-px bg-stone-100 mb-8"></div>

                {/* Features List */}
                <ul className="space-y-4 mb-10 grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 group/item">
                      <div className={`mt-0.5 p-0.5 rounded-full transition-colors ${plan.popular ? 'bg-pink-100 text-pink-600 group-hover/item:bg-pink-600 group-hover/item:text-white' : 'bg-stone-100 text-stone-400 group-hover/item:bg-stone-800 group-hover/item:text-white'}`}>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                          </svg>
                      </div>
                      <span className="leading-tight font-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-auto">
                  <button className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 shadow-md group/btn flex items-center justify-center gap-2
                    ${plan.popular 
                      ? 'bg-gray-900 text-white hover:bg-pink-600 hover:shadow-pink-200' 
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900'
                    }`}>
                    {plan.buttonText}
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}