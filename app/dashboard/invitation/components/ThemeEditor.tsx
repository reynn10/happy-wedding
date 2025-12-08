'use client';

import React from 'react';
import Image from 'next/image';

type Props = {
  data: any;
  // Kita ubah prop ini agar menerima string tema, bukan color lagi
  onThemeChange: (themeName: string) => void; 
};

const themes = [
  {
    id: "Classic Elegant", // Sesuai Landing Page
    color: "bg-stone-200",
    image: "https://images.unsplash.com/photo-1764641642780-21475fb85af1?q=80&w=200",
    desc: "Mewah & Bersih"
  },
  {
    id: "Rustic Nature", // Sesuai Landing Page
    color: "bg-amber-100",
    image: "https://images.unsplash.com/photo-1764269713275-9fea9f0d91c8?q=80&w=200",
    desc: "Hangat & Natural"
  },
  {
    id: "Dark Floral", // Sesuai Landing Page
    color: "bg-gray-800",
    image: "https://images.unsplash.com/photo-1633051567046-844064059c53?q=80&w=200",
    desc: "Romantis & Misterius"
  },
  {
    id: "Javanese Heritage", // Sesuai Landing Page
    color: "bg-yellow-700",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=200",
    desc: "Tradisional & Agung"
  }
];

export default function ThemeEditor({ data, onThemeChange }: Props) {
  return (
    <div className="grid gap-6">
      
      {/* --- TEMA VISUAL (TEAL) --- */}
      <div className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-teal-100 hover:shadow-xl hover:border-teal-200 transition-all duration-500 overflow-hidden">
        
        {/* Watermark Icon (Palette/Kuas Solid) */}
        <div className="absolute -bottom-6 -right-6 text-teal-500 opacity-40 rotate-12 group-hover:rotate-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500 ease-out">
            <svg className="w-48 h-48" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
        </div>

        <div className="relative z-10">
            <div className="mb-6">
                <h3 className="font-serif font-bold text-2xl text-gray-900 group-hover:text-teal-600 transition-colors">Pilih Tema</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Visual Style</p>
            </div>

            {/* Grid Pilihan Tema */}
            <div className="grid grid-cols-2 gap-4">
                {themes.map((theme) => {
                    const isActive = data.themeColor === theme.id; // Menggunakan theme ID sebagai value

                    return (
                        <div 
                            key={theme.id}
                            onClick={() => onThemeChange(theme.id)}
                            className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2
                                ${isActive 
                                    ? 'border-teal-500 shadow-md scale-[1.02] ring-2 ring-teal-100' 
                                    : 'border-transparent hover:border-teal-200 hover:shadow-sm'
                                }
                            `}
                        >
                            {/* Preview Image */}
                            <div className="h-24 w-full relative">
                                <Image src={theme.image} fill className="object-cover" alt={theme.id} />
                                {/* Overlay jika aktif */}
                                {isActive && (
                                    <div className="absolute inset-0 bg-teal-600/20 flex items-center justify-center">
                                        <div className="bg-white rounded-full p-1 shadow-sm">
                                            <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Label */}
                            <div className={`p-3 text-center ${isActive ? 'bg-teal-50' : 'bg-stone-50'}`}>
                                <p className={`text-xs font-bold ${isActive ? 'text-teal-700' : 'text-gray-700'}`}>
                                    {theme.id}
                                </p>
                                <p className="text-[8px] text-gray-400 mt-0.5">{theme.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <p className="mt-6 text-[10px] text-gray-400 italic">
                * Tema akan langsung diterapkan pada Live Preview.
            </p>
        </div>
      </div>

    </div>
  );
}