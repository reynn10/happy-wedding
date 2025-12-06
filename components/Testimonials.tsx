import React from 'react';
import Image from 'next/image';

const reviews = [
  { name: "Dimas & Sarah", date: "Menikah Jan 2024", text: "Awalnya ragu pakai undangan digital, tapi Happy Wedding bikin semuanya jadi mudah. Tamu-tamu tua pun gampang bukanya. Fitur kirim WA-nya juara!", avatar: "https://images.unsplash.com/photo-1623091411315-266390560623?w=100&q=60" },
  { name: "Rizky & Anisa", date: "Menikah Des 2023", text: "Desainnya nggak pasaran! Suka banget sama tema Rustic-nya. Adminnya juga fast response bantuin input data tamu.", avatar: "https://images.unsplash.com/photo-1519741497674-611481863552?w=100&q=60" },
  { name: "Michael & Jessica", date: "Menikah Feb 2024", text: "Saved our budget! Daripada cetak fisik mahal-mahal dan buang kertas, mending ini. Sisa uangnya bisa buat honeymoon hehe.", avatar: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=100&q=60" }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-pink-600 font-bold tracking-widest text-xs uppercase mb-3 block">Love Stories</span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-gray-900">Kata Mereka yang Bahagia</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div 
              key={idx} 
              // UPDATE: Shadow Pink (shadow-[...])
              className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgba(236,72,153,0.05)] border border-white/60 hover:shadow-[0_20px_40px_-10px_rgba(236,72,153,0.2)] hover:bg-white transition-all duration-300 relative group"
            >
              <div className="absolute top-6 right-8 text-pink-100 group-hover:text-pink-50 transition-colors">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z"></path></svg>
              </div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-pink-100">
                  <Image src={review.avatar} width={60} height={60} alt={review.name} className="object-cover h-full w-full"/>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 font-serif">{review.name}</h4>
                  <p className="text-xs text-pink-500 uppercase tracking-wider font-bold">{review.date}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed italic relative z-10">"{review.text}"</p>
              <div className="mt-6 flex gap-1 text-yellow-400">
                 {[1,2,3,4,5].map(i => (<svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.26.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.55-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}