'use client';

import React from 'react';

type Props = {
  data: any;
  handleInputChange: (e: any) => void;
  handleImageUpload: (e: any) => Promise<void>;
  isUploading?: boolean;
};

export default function GalleryEditor({ data, handleInputChange, handleImageUpload, isUploading }: Props) {
  return (
    <>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Upload Foto Sampul</label>
        <div className="relative group cursor-pointer">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
          <div className="w-full p-8 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center group-hover:border-purple-300 group-hover:bg-purple-50 transition">
            {isUploading ? (
              <span className="text-purple-600 text-sm font-bold animate-pulse">Mengupload...</span>
            ) : (
              <>
                <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span className="text-xs text-gray-500 font-bold">Klik untuk Pilih Foto</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Atau Pakai Link</label>
        <input type="text" name="coverPhoto" value={data.coverPhoto} onChange={handleInputChange} suppressHydrationWarning={true} className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-purple-200 transition text-gray-900 font-medium text-sm" />
      </div>
    </>
  );
}
