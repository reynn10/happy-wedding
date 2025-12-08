'use client';

import React from 'react';
import FormField from './FormField';
import Image from 'next/image';

type Props = {
  data: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
};

export default function GalleryEditor({ data, handleInputChange, onUpload, isUploading }: Props) {
  return (
    <div className="grid gap-6">
      
      {/* --- FOTO SAMPUL (PURPLE) --- */}
      <div className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-purple-100 hover:shadow-xl hover:border-purple-200 transition-all duration-500 overflow-hidden">
        
        {/* Watermark Icon (Landscape/Image Solid) */}
        <div className="absolute -bottom-6 -right-6 text-purple-500 opacity-40 rotate-12 group-hover:rotate-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500 ease-out">
            <svg className="w-48 h-48" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
        </div>

        <div className="relative z-10">
            <div className="mb-6">
                <h3 className="font-serif font-bold text-2xl text-gray-900 group-hover:text-purple-600 transition-colors">Foto Sampul</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Main Cover</p>
            </div>

            {/* AREA UPLOAD */}
            <div className="mb-6 space-y-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Upload Gambar</label>
                <div className="relative group/upload cursor-pointer">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={onUpload} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                        disabled={isUploading}
                    />
                    <div className="w-full p-8 bg-stone-50/50 rounded-3xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center text-center transition-all duration-300 group-hover/upload:border-purple-300 group-hover/upload:bg-purple-50/50">
                        {isUploading ? (
                            <div className="flex flex-col items-center gap-2 animate-pulse">
                                <svg className="w-8 h-8 text-purple-500 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="text-purple-600 text-xs font-bold">Mengupload...</span>
                            </div>
                        ) : (
                            <>
                                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover/upload:scale-110 transition-transform">
                                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </div>
                                <span className="text-gray-500 text-xs font-bold group-hover/upload:text-purple-600">Klik untuk Pilih Foto</span>
                                <span className="text-[10px] text-gray-400 mt-1">Maksimal 2MB (JPG/PNG)</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <FormField
                label="Atau Gunakan Link"
                placeholder="https://images.unsplash.com/..."
                name="coverPhoto"
                value={data.coverPhoto}
                onChange={handleInputChange}
                hint="Pastikan link gambar dapat diakses publik."
                accentColor="purple"
            />
        </div>
      </div>

      {/* --- GALERI MOMEN (INDIGO) --- */}
      <div className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-indigo-100 hover:shadow-xl hover:border-indigo-200 transition-all duration-500 overflow-hidden">
        
        {/* Watermark Icon (Polaroid Artistik) */}
        {/* Menggunakan 3 layer foto: Kiri, Kanan, Tengah dengan fill-rule evenodd untuk efek bingkai foto */}
        <div className="absolute -bottom-6 -right-6 text-indigo-500 opacity-40 rotate-12 group-hover:rotate-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500 ease-out">
            <svg className="w-48 h-48" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd">
                 {/* Foto Kiri (Miring) */}
                 <path d="M4.5 15.5l1-9 6 1-1 9-6-1z" opacity="0.3" />
                 {/* Foto Kanan (Miring) */}
                 <path d="M19.5 15.5l-1-9-6 1 1 9 6-1z" opacity="0.3" />
                 {/* Foto Tengah (Polaroid Frame) */}
                 <path d="M8 4h8c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm1 2v9h6V6H9z" />
            </svg>
        </div>

        <div className="relative z-10">
            <div className="mb-6">
                <h3 className="font-serif font-bold text-2xl text-gray-900 group-hover:text-indigo-600 transition-colors">Galeri Momen</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Photo Gallery</p>
            </div>
            
            {/* Grid Preview Galeri (Placeholder UI) */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-stone-50 rounded-2xl border border-stone-100 flex items-center justify-center relative overflow-hidden group/item cursor-pointer hover:border-indigo-200 transition">
                         <svg className="w-6 h-6 text-gray-300 group-hover/item:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                <p className="text-xs text-indigo-800 leading-relaxed">
                    Fitur <strong>Multi-Upload Galeri</strong> sedang dalam pengembangan. Segera hadir untuk menampilkan momen indah Anda!
                </p>
            </div>
        </div>
      </div>

    </div>
  );
}