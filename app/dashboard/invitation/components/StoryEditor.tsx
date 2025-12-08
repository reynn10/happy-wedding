'use client';

import React from 'react';
import FormField from './FormField';

type Props = {
  data: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function StoryEditor({ data, onChange }: Props) {
  return (
    <div className="grid gap-8">
      
      {/* --- 1. FIRST MET (Pertemuan Pertama) --- */}
      <div className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-pink-100 hover:shadow-xl hover:border-pink-200 transition-all duration-500 overflow-hidden">
        
        {/* Watermark: Sparkles / Love at first sight */}
        <div className="absolute -bottom-6 -right-6 text-pink-500 opacity-5 rotate-12 group-hover:rotate-0 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 ease-out">
            <svg className="w-48 h-48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
        </div>

        <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 font-bold border border-pink-100">1</div>
                <div>
                    <h3 className="font-serif font-bold text-xl text-gray-900 group-hover:text-pink-600 transition-colors">First Met</h3>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Awal Cerita</p>
                </div>
            </div>

            <FormField
                label="Waktu (Bulan/Tahun)"
                placeholder="Contoh: Januari 2020"
                name="storyMetDate"
                value={data.storyMetDate}
                onChange={onChange}
                hint="Kapan kalian pertama bertemu?"
                accentColor="pink"
            />
            
            <div className="space-y-2 group/area">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1 group-hover/area:text-gray-600 transition-colors">Cerita Singkat</label>
                <textarea 
                    name="storyMetDesc" 
                    value={data.storyMetDesc} 
                    onChange={onChange} 
                    rows={3} 
                    placeholder="Ceritakan momen pertemuan pertama kalian..."
                    className="w-full p-4 bg-stone-50/50 rounded-2xl border border-stone-100 outline-none text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-200 transition-all resize-none shadow-inner" 
                />
            </div>
        </div>
      </div>

      {/* --- 2. FIRST DATE (Kencan Pertama) --- */}
      <div className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-blue-100 hover:shadow-xl hover:border-blue-200 transition-all duration-500 overflow-hidden">
        
        {/* Watermark: Coffee Cups / Toast */}
        <div className="absolute -bottom-6 -right-6 text-blue-500 opacity-5 rotate-12 group-hover:rotate-0 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 ease-out">
            <svg className="w-48 h-48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> {/* Placeholder abstract shape */}
                <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /> {/* Coffee Cup shape */}
                <path d="M6 1v3M10 1v3M14 1v3" /> {/* Steam */}
            </svg>
        </div>

        <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100">2</div>
                <div>
                    <h3 className="font-serif font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">First Date</h3>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Momen Spesial</p>
                </div>
            </div>

            <FormField
                label="Waktu"
                placeholder="Contoh: Februari 2020"
                name="storyFirstDateDate"
                value={data.storyFirstDateDate}
                onChange={onChange}
                accentColor="blue"
            />
            
            <div className="space-y-2 group/area">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1 group-hover/area:text-gray-600 transition-colors">Cerita Singkat</label>
                <textarea 
                    name="storyFirstDateDesc" 
                    value={data.storyFirstDateDesc} 
                    onChange={onChange} 
                    rows={3} 
                    placeholder="Kenangan saat kencan pertama..."
                    className="w-full p-4 bg-stone-50/50 rounded-2xl border border-stone-100 outline-none text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all resize-none shadow-inner" 
                />
            </div>
        </div>
      </div>

      {/* --- 3. PROPOSAL (Lamaran) --- */}
      <div className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-purple-100 hover:shadow-xl hover:border-purple-200 transition-all duration-500 overflow-hidden">
        
        {/* Watermark: Diamond Ring */}
        <div className="absolute -bottom-6 -right-6 text-purple-500 opacity-5 rotate-12 group-hover:rotate-0 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 ease-out">
            <svg className="w-48 h-48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                <path d="M6 10l5 5 5-5" transform="rotate(180 12 12) translate(0 4)" opacity="0" /> {/* Hidden fixer */}
                <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> {/* Check circle replacement for diamond shape */}
                <path d="M12 2l3 6h-6l3-6zm0 0l-3 6m3-6l3 6" /> {/* Diamond top */}
                <path d="M9 8l3 5 3-5H9z" /> {/* Diamond bottom */}
            </svg>
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M6 13.864c0-.986.799-1.786 1.786-1.786h8.428c.987 0 1.786.8 1.786 1.786v3.35H6v-3.35z"/>
                <path d="M10.124 12.078L12 9l1.876 3.078h-3.752z"/>
                <path d="M12 9l-2.5-4h5L12 9z"/>
            </svg>
        </div>

        <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 font-bold border border-purple-100">3</div>
                <div>
                    <h3 className="font-serif font-bold text-xl text-gray-900 group-hover:text-purple-600 transition-colors">The Proposal</h3>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Menuju Halal</p>
                </div>
            </div>

            <FormField
                label="Waktu"
                placeholder="Contoh: Desember 2024"
                name="storyProposalDate"
                value={data.storyProposalDate}
                onChange={onChange}
                accentColor="purple"
            />
            
            <div className="space-y-2 group/area">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1 group-hover/area:text-gray-600 transition-colors">Cerita Singkat</label>
                <textarea 
                    name="storyProposalDesc" 
                    value={data.storyProposalDesc} 
                    onChange={onChange} 
                    rows={3} 
                    placeholder="Bagaimana dia melamar?"
                    className="w-full p-4 bg-stone-50/50 rounded-2xl border border-stone-100 outline-none text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-purple-100 focus:border-purple-200 transition-all resize-none shadow-inner" 
                />
            </div>
        </div>
      </div>

      {/* --- 4. THE DAY (Hari H) --- */}
      <div className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-yellow-100 hover:shadow-xl hover:border-yellow-200 transition-all duration-500 overflow-hidden">
        
        {/* Watermark: Infinity / Rings */}
        <div className="absolute -bottom-6 -right-6 text-yellow-500 opacity-5 rotate-12 group-hover:rotate-0 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 ease-out">
            <svg className="w-48 h-48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /> {/* Clock placeholder */}
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
        </div>

        <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 font-bold border border-yellow-100">4</div>
                <div>
                    <h3 className="font-serif font-bold text-xl text-gray-900 group-hover:text-yellow-600 transition-colors">The Day</h3>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Janji Suci</p>
                </div>
            </div>

            <div className="space-y-2 group/area">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1 group-hover/area:text-gray-600 transition-colors">Harapan / Quotes</label>
                <textarea 
                    name="storyTheDayDesc" 
                    value={data.storyTheDayDesc} 
                    onChange={onChange} 
                    rows={3} 
                    placeholder="Tulis harapan atau doa untuk hari pernikahan..."
                    className="w-full p-4 bg-stone-50/50 rounded-2xl border border-stone-100 outline-none text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-yellow-100 focus:border-yellow-200 transition-all resize-none shadow-inner" 
                />
            </div>
        </div>
      </div>

    </div>
  );
}