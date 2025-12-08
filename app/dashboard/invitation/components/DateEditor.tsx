'use client';

import React from 'react';
import FormField from './FormField';

type Props = {
  data: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function DateEditor({ data, handleInputChange }: Props) {
  return (
    <div className="grid gap-6">
      
      {/* --- TANGGAL & WAKTU (DATE) - BLUE --- */}
      <div className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-blue-100 hover:shadow-xl hover:border-blue-200 transition-all duration-500 overflow-hidden">
        
        {/* Watermark Icon (Kalender Solid Minimalis) */}
        <div className="absolute -bottom-6 -right-6 text-blue-500 opacity-40 rotate-12 group-hover:rotate-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500 ease-out">
            <svg className="w-48 h-48" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
        </div>

        <div className="relative z-10">
            <div className="mb-6">
                <h3 className="font-serif font-bold text-2xl text-gray-900 group-hover:text-blue-600 transition-colors">Tanggal & Waktu</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">The Date</p>
            </div>

            <FormField
                label="Waktu Acara"
                placeholder="Contoh: Sabtu, 15 Maret 2025 | 09:00 WIB"
                name="date"
                value={data.date}
                onChange={handleInputChange}
                hint="Tulis hari, tanggal, dan jam dengan lengkap."
                accentColor="blue"
            />
        </div>
      </div>

      {/* --- LOKASI VENUE (PURPLE) --- */}
      <div className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-purple-100 hover:shadow-xl hover:border-purple-200 transition-all duration-500 overflow-hidden">
        
        {/* Watermark Icon (Gedung Solid Minimalis) */}
        <div className="absolute -bottom-6 -right-6 text-purple-500 opacity-40 rotate-12 group-hover:rotate-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500 ease-out">
            <svg className="w-48 h-48" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                {/* Bentuk gedung yang lebih bersih tanpa banyak jendela kecil */}
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
            </svg>
        </div>

        <div className="relative z-10">
            <div className="mb-6">
                <h3 className="font-serif font-bold text-2xl text-gray-900 group-hover:text-purple-600 transition-colors">Lokasi Venue</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">The Venue</p>
            </div>

            <FormField
                label="Nama Gedung / Hotel"
                placeholder="Contoh: Grand Ballroom Hotel Mulia"
                name="venue"
                value={data.venue}
                onChange={handleInputChange}
                hint="Nama lokasi yang akan muncul di undangan."
                accentColor="purple"
            />
        </div>
      </div>

      {/* --- GOOGLE MAPS (TEAL) --- */}
      <div className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-teal-100 hover:shadow-xl hover:border-teal-200 transition-all duration-500 overflow-hidden">
        
        {/* Watermark Icon (Pin Peta Solid) */}
        <div className="absolute -bottom-6 -right-6 text-teal-500 opacity-40 rotate-12 group-hover:rotate-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500 ease-out">
             <svg className="w-48 h-48" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                {/* Bentuk Pin Maps klasik yang bersih */}
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
        </div>

        <div className="relative z-10">
            <div className="mb-6">
                <h3 className="font-serif font-bold text-2xl text-gray-900 group-hover:text-teal-600 transition-colors">Google Maps</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Navigation</p>
            </div>

            <FormField
                label="Link Peta"
                placeholder="https://maps.app.goo.gl/..."
                name="mapUrl"
                value={data.mapUrl}
                onChange={handleInputChange}
                hint="Paste link 'Share' dari Google Maps di sini."
                accentColor="teal"
            />
        </div>
      </div>

    </div>
  );
}