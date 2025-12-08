'use client';

import React from 'react';
import FormField from './FormField';

type Props = {
  data: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CoupleEditor({ data, handleInputChange }: Props) {
  return (
    <div className="grid gap-6">
      
      {/* --- PENGANTIN WANITA (BRIDE) --- */}
      <div className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-pink-100 hover:shadow-xl hover:border-pink-200 transition-all duration-500 overflow-hidden">
        
        {/* Watermark Icon (Hati Solid - Wanita) */}
        <div className="absolute -bottom-6 -right-6 text-pink-500 opacity-40 rotate-12 group-hover:rotate-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500 ease-out">
            <svg className="w-48 h-48" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        </div>

        <div className="relative z-10">
            {/* Header Tanpa Ikon Kiri Atas */}
            <div className="mb-6">
                <h3 className="font-serif font-bold text-2xl text-gray-900 group-hover:text-pink-600 transition-colors">Pengantin Wanita</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">The Bride</p>
            </div>

            <FormField
                label="Nama Lengkap & Gelar"
                placeholder="Contoh: Siti Nurhaliza, S.Kom"
                name="brideName"
                value={data.brideName}
                onChange={handleInputChange}
                hint="Nama ini akan tampil paling besar di undangan."
            />
        </div>
      </div>

      {/* --- PENGANTIN PRIA (GROOM) --- */}
      <div className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-blue-100 hover:shadow-xl hover:border-blue-200 transition-all duration-500 overflow-hidden">
        
        {/* Watermark Icon (Hati Solid Biru - Pria) */}
        {/* Menggunakan ikon Hati berwarna biru dengan opasitas awal 40% */}
        <div className="absolute -bottom-6 -right-6 text-blue-500 opacity-40 rotate-12 group-hover:rotate-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500 ease-out">
            <svg className="w-48 h-48" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        </div>

        <div className="relative z-10">
            {/* Header Tanpa Ikon Kiri Atas */}
            <div className="mb-6">
                <h3 className="font-serif font-bold text-2xl text-gray-900 group-hover:text-blue-600 transition-colors">Pengantin Pria</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">The Groom</p>
            </div>

            <FormField
                label="Nama Lengkap & Gelar"
                placeholder="Contoh: Romeo Putra, S.T"
                name="groomName"
                value={data.groomName}
                onChange={handleInputChange}
                hint="Pastikan gelar ditulis dengan benar."
            />
        </div>
      </div>

    </div>
  );
}