'use client';

import React, { useState, useEffect } from 'react';
import { useInvitationEditor } from './hooks/useInvitationEditor'; 
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { menuItems } from './data/menuItems';

// Import Komponen Editor
import CoupleEditor from './components/CoupleEditor';
import DateEditor from './components/DateEditor';
import GalleryEditor from './components/GalleryEditor';
import StoryEditor from './components/StoryEditor';
import MusicEditor from './components/MusicEditor';
import ThemeEditor from './components/ThemeEditor';
import Preview from './components/Preview'; 

export default function InvitationPage() {
  const {
    data,
    activeMenu,
    setActiveMenu,
    isLoading,
    isSaving,
    isUploading,
    getPreviewUrl,
    handleImageUpload,
    handleSave,
    handleInputChange,
    handleThemeChange,
  } =  useInvitationEditor();

  const handlePreview = () => window.open(getPreviewUrl(), '_blank');
  const handleShare = () => { 
    navigator.clipboard.writeText("https://happywedding.com/invitation/demo"); 
    alert("Link tersalin!"); 
  };

  return (
    <div className="space-y-8 animate-fade-in-up font-sans text-gray-800">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div><p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">Project Management</p><h1 className="text-4xl font-serif font-bold text-gray-900">My Invitation</h1></div>
          <div className="flex gap-3">
              <button onClick={() => window.open(getPreviewUrl(), '_blank')} className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-bold hover:border-pink-500 hover:text-pink-600 transition shadow-sm">Lihat Live</button>
              <button onClick={() => {navigator.clipboard.writeText("[https://happywedding.com/invitation/demo](https://happywedding.com/invitation/demo)"); alert("Link tersalin!")}} className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-gray-800 transition shadow-lg flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>Bagikan Link</button>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* --- KOLOM KIRI: PREVIEW HP (IFRAME) --- */}
        <Preview previewUrl={getPreviewUrl()} />

        {/* --- KOLOM KANAN: EDITOR --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Status Undangan: Aktif</h3>
                <p className="text-xs text-gray-500">Masa aktif selamanya (Lifetime)</p>
              </div>
            </div>
          </div>

          {activeMenu ? (
            <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-gray-100 animate-fade-in-up h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-serif font-bold text-gray-900">Edit {menuItems.find(m => m.id === activeMenu)?.title}</h3>
                    <button onClick={() => setActiveMenu(null)} suppressHydrationWarning={true} className="text-sm text-gray-500 hover:text-gray-900 font-bold flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>Tutup</button>
                </div>
                <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2 pb-4">
                    {activeMenu === 'mempelai' && <CoupleEditor data={data} handleInputChange={handleInputChange} />}
                    {activeMenu === 'acara' && <DateEditor data={data} handleInputChange={handleInputChange} />}
                    {activeMenu === 'galeri' && <GalleryEditor data={data} handleInputChange={handleInputChange} onUpload={handleImageUpload} isUploading={isUploading} />}
                    {activeMenu === 'cerita' && <StoryEditor data={data} onChange={handleInputChange} />}
                    {activeMenu === 'musik' && <MusicEditor data={data} handleInputChange={handleInputChange as any} />}
                    {activeMenu === 'tema' && <ThemeEditor data={data} onThemeChange={handleThemeChange} />}

                    <button onClick={handleSave} disabled={isSaving || isUploading} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition shadow-lg mt-4 disabled:opacity-50">
                        {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fade-in-up">
              {menuItems.map((item) => (
                <button key={item.id} onClick={() => setActiveMenu(item.id)} suppressHydrationWarning={true} className={`group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl ${item.borderColor} transition-all duration-500 overflow-hidden h-40 flex flex-col justify-end text-left`}>
                  <div className={`absolute -bottom-4 -right-4 opacity-10 rotate-12 group-hover:rotate-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 ease-out ${item.watermarkColor}`}>{item.icon}</div>
                  <div className="relative z-10">
                    <p className={`font-bold text-[10px] uppercase tracking-[0.2em] mb-1 ${item.subTextColor}`}>{item.desc}</p>
                    <h4 className={`font-serif font-bold text-3xl text-gray-900 ${item.textColor} transition-colors tracking-tight`}>{item.title}</h4>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}