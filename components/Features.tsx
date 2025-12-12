import React from 'react';
import Link from 'next/link';

const features = [
  {
    slug: "whatsapp",
    label: "BROADCAST",
    title: "Kirim WA Otomatis",
    description: "Kirim ke 500+ tamu sekaligus dengan nama personal. Anti ribet.",
    color: "text-pink-600",
    glassBg: "bg-pink-100/40", 
    glassBorder: "border-pink-200/60",
    hoverBorder: "group-hover:border-pink-400/50",
    hoverBg: "group-hover:bg-pink-200/50",
    iconColor: "text-pink-500", 
    icon: (
      <svg className="w-full h-full transform rotate-10 group-hover:rotate-2 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
    )
  },
  {
    slug: "rsvp",
    label: "UNLIMITED",
    title: "Tamu Tanpa Batas",
    description: "Undang teman hingga keluarga jauh sepuasnya tanpa biaya tambahan.",
    color: "text-pink-600",
    glassBg: "bg-pink-100/40",
    glassBorder: "border-pink-200/60",
    hoverBorder: "group-hover:border-pink-400/50",
    hoverBg: "group-hover:bg-pink-200/50",
    iconColor: "text-pink-500",
    icon: (
      <svg className="w-full h-full transform rotate-12 group-hover:rotate-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
    )
  },
  {
    slug: "gift",
    label: "FINANCE",
    title: "Amplop Digital",
    description: "Terima hadiah via transfer bank/QRIS langsung ke rekening Anda.",
    color: "text-pink-600",
    glassBg: "bg-pink-100/40",
    glassBorder: "border-pink-200/60",
    hoverBorder: "group-hover:border-pink-400/50",
    hoverBg: "group-hover:bg-pink-200/50",
    iconColor: "text-pink-500",
    icon: (
    <svg className="w-full h-full transform rotate-12 group-hover:rotate-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
    )
  },
  {
    slug: "location",
    label: "LOCATION",
    title: "Peta Navigasi",
    description: "Pandu tamu ke lokasi acara dengan integrasi Google Maps akurat.",
    color: "text-pink-600",
    glassBg: "bg-pink-100/40",
    glassBorder: "border-pink-200/60",
    hoverBorder: "group-hover:border-pink-400/50",
    hoverBg: "group-hover:bg-pink-200/50",
    iconColor: "text-pink-500",
    icon: (
      <svg className="w-full h-full transform rotate-12 group-hover:rotate-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    )
  }
];

export default function Features() {
  return (
    <section id="fitur" className="py-15 bg-transparent relative overflow-hidden">

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
            Semua yang Anda Butuhkan
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Fitur lengkap untuk memastikan acara pernikahan Anda berjalan lancar dan berkesan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group relative overflow-hidden rounded-[2.5rem] p-8 h-56 transition-all duration-500 
                /* GLASS BASE: Warna Tint + Blur + Border */
                bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg
                hover:shadow-2xl hover:scale-[1.01] hover:bg-white ${feature.hoverBorder}
                active:scale-[0.98] active:bg-white
              `}
            >
              
              {/* --- GLOSSY HIGHLIGHT (KILAP KACA) --- */}
              {/* Gradasi putih transparan dari pojok kiri atas */}
              <div className="absolute inset-0 bg-linear-to-b from-white/60 to-transparent opacity-60 pointer-events-none"></div>

              {/* LIQUID HOVER EFFECT (Tint Warna Pink Halus) */}
              <div className={`absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-active:opacity-100 ${feature.hoverBg}`}></div>
              
              {/* KONTEN */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Label: Background putih transparan */}
                  <span className={`inline-block px-2.5 py-0.5 bg-white/60 backdrop-blur-md border border-white/60 text-gray-600 
                    group-hover:text-white group-hover:bg-pink-600 group-hover:border-transparent 
                    group-active:text-white group-active:bg-pink-600 group-active:border-transparent
                    transition-colors duration-300 text-[8px] font-bold rounded-full uppercase tracking-widest mb-3 shadow-sm`}>
                    {feature.label}
                  </span>
                  
                  {/* Judul: Berubah warna saat hover */}
                  <h3 className={`text-xl font-bold text-gray-900 mb-1.5 transition-colors duration-300 ${feature.color.replace('text-', 'group-hover:text-').replace('text-', 'group-active:text-')}`}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 text-xs leading-relaxed max-w-[90%] line-clamp-2 group-hover:text-gray-800 group-active:text-gray-800 transition-colors font-medium">
                    {feature.description}
                  </p>
                </div>

                <Link href={`/features/${feature.slug}`} className={`flex items-center gap-2 text-gray-500 font-bold text-xs cursor-pointer group-hover:gap-3 group-active:gap-3 transition-all ${feature.color.replace('text-', 'group-hover:text-').replace('text-', 'group-active:text-')}`}>
                   <span>Pelajari</span>
                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </Link>
              </div>

              {/* WATERMARK ICON (Vibrant Pink) */}
              <div className={`absolute -bottom-4 -right-4 w-32 h-32 opacity-30 transition-all duration-700 transform rotate-12 
                group-hover:rotate-0 group-hover:scale-110 group-hover:opacity-50
                group-active:rotate-0 group-active:scale-110 group-active:opacity-50
                ${feature.iconColor}`}>
                 {feature.icon}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}