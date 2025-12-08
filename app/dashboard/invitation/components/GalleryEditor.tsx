'use client';

import React from 'react';
import FormField from './FormField';

type Props = {
  data: any;
  handleInputChange: (e: any) => void;
  handleImageUpload: (e: any) => Promise<void>;
  isUploading?: boolean;
};

export default function GalleryEditor({ data, handleInputChange, handleImageUpload, isUploading }: Props) {
  return (
    <div className="space-y-6">
      {/* Photo Upload Section */}
      <div className="relative overflow-hidden rounded-3xl p-8 bg-linear-to-br from-violet-50 via-white to-purple-50 border border-violet-200/50 backdrop-blur-sm shadow-xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-violet-400 to-transparent"></div>
        
        <div className="mb-6 pb-6 border-b border-violet-200/30">
          <h4 className="text-sm font-bold text-violet-900 uppercase tracking-widest mb-1">📸 Foto Sampul Utama</h4>
          <p className="text-xs text-violet-700/80 font-light">Upload foto berkualitas tinggi yang mencerminkan keindahan momen</p>
        </div>

        <div className="relative group cursor-pointer">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
          <div className="w-full p-12 bg-white border-2 border-dashed border-violet-300 rounded-2xl flex flex-col items-center justify-center group-hover:border-violet-500 group-hover:bg-violet-50/50 transition-all duration-300">
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 border-3 border-violet-300 border-t-violet-600 rounded-full animate-spin mb-3"></div>
                <span className="text-violet-600 text-sm font-semibold">Sedang Mengupload...</span>
              </div>
            ) : (
              <>
                <svg className="w-16 h-16 text-violet-400 mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span className="text-sm text-violet-900 font-semibold">Drag & Drop atau Klik untuk Pilih Foto</span>
                <span className="text-xs text-violet-600 mt-2 font-light">Tipe: JPG, PNG | Ukuran Max: 5MB</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* URL Alternative Section */}
      <div className="relative overflow-hidden rounded-3xl p-8 bg-linear-to-br from-indigo-50 via-white to-blue-50 border border-indigo-200/50 backdrop-blur-sm shadow-xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-indigo-400 to-transparent"></div>
        
        <div className="mb-6 pb-6 border-b border-indigo-200/30">
          <h4 className="text-sm font-bold text-indigo-900 uppercase tracking-widest mb-1">🔗 Atau Gunakan URL</h4>
          <p className="text-xs text-indigo-700/80 font-light">Alternatif: gunakan link foto dari internet</p>
        </div>

        <FormField
          label="Link Foto"
          icon="🌐"
          placeholder="https://example.com/foto-undangan.jpg"
          name="coverPhoto"
          value={data.coverPhoto}
          onChange={handleInputChange}
          accentColor="blue"
          hint="Masukkan URL lengkap foto (format: https://...)"
        />
      </div>
    </div>
  );
}
