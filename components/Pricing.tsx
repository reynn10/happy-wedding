import React from 'react';

const plans = [
  {
    name: "Basic",
    price: "Gratis",
    description: "Coba dulu, bayar nanti. Cocok untuk acara kecil.",
    features: [
      "Masa aktif 3 hari",
      "Maksimal 20 Tamu",
      "Tema Standard",
      "Tanpa Musik",
      "Watermark Happy Wedding"
    ],
    buttonText: "Coba Gratis",
    popular: false,
  },
  {
    name: "Premium",
    price: "Rp 149.000",
    description: "Paling laris! Fitur lengkap untuk pernikahan impian.",
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
  },
  {
    name: "Exclusive",
    price: "Rp 299.000",
    description: "Layanan prioritas dengan domain khusus yang elegan.",
    features: [
      "Semua Fitur Premium",
      "Custom Domain (.com)",
      "Hapus Watermark Total",
      "Prioritas Support 24/7",
      "Jasa Input Data Tamu",
      "Revisi Desain Minor"
    ],
    buttonText: "Hubungi Sales",
    popular: false,
  },
];

export default function Pricing() {
  return (
    // FIX: Gunakan bg-transparent agar background dari page.tsx terlihat
    // HAPUS: Blob lokal di sini agar tidak tumpang tindih
    <section id="harga" className="py-24 bg-transparent relative">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
            Paket Penawaran Spesial
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan acara Anda. Tanpa biaya tersembunyi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              // KONSISTENSI CARD:
              // - Popular: Solid White + Border Pink Tebal + Shadow Pink
              // - Basic: Glass Effect + Hover jadi White + Shadow Pink Halus
              className={`relative rounded-[2.5rem] p-8 border transition-all duration-300 flex flex-col h-full
                ${plan.popular 
                  ? 'bg-white border-pink-500 shadow-[0_20px_60px_-10px_rgba(236,72,153,0.3)] scale-100 md:scale-105 z-10' 
                  : 'bg-white/60 backdrop-blur-lg border-white/60 shadow-[0_8px_30px_rgba(236,72,153,0.05)] hover:bg-white hover:border-pink-200/50 hover:shadow-[0_20px_50px_-10px_rgba(236,72,153,0.2)] hover:-translate-y-1'
                }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-pink-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md whitespace-nowrap">
                  Paling Laris 🔥
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-2 min-h-[20]">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                {plan.price !== "Gratis" && <span className="text-gray-400 text-sm">/acara</span>}
              </div>

              <ul className="space-y-4 mb-8 grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600 text-sm">
                    <svg className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-pink-600' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg mt-auto
                ${plan.popular 
                  ? 'bg-pink-600 text-white hover:bg-pink-700 hover:shadow-pink-500/30' 
                  : 'bg-white border border-gray-200 text-gray-900 hover:border-pink-600 hover:text-pink-600 hover:shadow-pink-200/50'
                }`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}