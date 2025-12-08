'use client';

import React from 'react';

type Props = {
  data: any;
  handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const songs = [
  { value: "Beautiful in White - Shane Filan", label: "Beautiful in White (Shane Filan)" },
  { value: "A Thousand Years - Christina Perri", label: "A Thousand Years (Christina Perri)" },
  { value: "Perfect - Ed Sheeran", label: "Perfect (Ed Sheeran)" },
  { value: "Marry Your Daughter - Brian McKnight", label: "Marry Your Daughter (Brian McKnight)" },
  { value: "Canon in D - Pachelbel", label: "Canon in D (Classic Instrumental)" },
];

export default function MusicEditor({ data, handleInputChange }: Props) {
  return (
    <div className="grid gap-6">
      
      {/* --- MUSIK LATAR (ORANGE) --- */}
      <div className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-orange-100 hover:shadow-xl hover:border-orange-200 transition-all duration-500 overflow-hidden">
        
        {/* Watermark Icon (Nada Musik Solid) */}
        <div className="absolute -bottom-6 -right-6 text-orange-500 opacity-40 rotate-12 group-hover:rotate-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500 ease-out">
            <svg className="w-48 h-48" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
        </div>

        <div className="relative z-10">
            <div className="mb-6">
                <h3 className="font-serif font-bold text-2xl text-gray-900 group-hover:text-orange-600 transition-colors">Musik Latar</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Backsound</p>
            </div>

            <div className="space-y-2 group/input">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1 group-hover/input:text-gray-600 transition-colors">
                    Pilih Lagu
                </label>
                <div className="relative">
                    <select 
                        name="music" 
                        value={data.music} 
                        onChange={handleInputChange} 
                        className="w-full px-6 py-4 bg-stone-50/50 rounded-2xl border border-stone-100 outline-none 
                        text-gray-900 font-medium cursor-pointer appearance-none
                        focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-orange-200 
                        transition-all duration-300 ease-out shadow-inner hover:bg-white hover:border-gray-200"
                    >
                        {songs.map((song) => (
                            <option key={song.value} value={song.value}>{song.label}</option>
                        ))}
                    </select>
                    
                    {/* Custom Chevron Icon */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                    </div>
                </div>
            </div>

            {/* Audio Visualizer Decoration */}
            <div className="mt-8 flex items-end gap-1 h-8 opacity-50">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-1.5 bg-orange-300 rounded-full animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
                ))}
            </div>

        </div>
      </div>

    </div>
  );
}