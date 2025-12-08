'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function InvitationPage() {
  const router = useRouter();

  // GAMBAR DEFAULT
  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1170&auto=format&fit=crop";

  // --- STATE DATA ---
  const [data, setData] = useState({
    id: 0,
    brideName: "Juliet Putri",
    groomName: "Romeo Putra",
    date: "12 Desember 2025",
    venue: "Grand Hotel Ballroom",
    mapUrl: "", 
    themeColor: "Pink",
    coverPhoto: DEFAULT_IMAGE,
    story: "Kami bertemu pertama kali di...",
    music: "Beautiful in White - Shane Filan"
  });

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  // State untuk refresh iframe
  const [refreshKey, setRefreshKey] = useState(Date.now());

  // --- 1. FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsLoading(false); return; }
      setUserId(user.id); // SIMPAN USER ID

      const { data: invData } = await supabase
        .from('invitations')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (invData) {
        setData({
            id: invData.id,
            brideName: invData.bride_name || "Juliet Putri",
            groomName: invData.groom_name || "Romeo Putra",
            date: invData.event_date || "12 Desember 2025",
            venue: invData.venue_name || "Grand Hotel Ballroom",
            mapUrl: invData.map_url || "",
            themeColor: invData.theme_color || "Pink",
            coverPhoto: invData.cover_photo || DEFAULT_IMAGE,
            story: invData.story || "",
            music: invData.music || "Beautiful in White"
        });
        setRefreshKey(Date.now());
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // --- 2. GENERATE LIVE PREVIEW URL (FIXED) ---
  const getPreviewUrl = () => {
    const params = new URLSearchParams();
    params.set('groom', data.groomName);
    params.set('bride', data.brideName);
    params.set('date', data.date);
    params.set('venue', data.venue);
    params.set('cover', data.coverPhoto);
    // PENTING: Kirim userId agar halaman demo tau rekening siapa yang harus diambil
    if (userId) params.set('uid', userId); 
    
    // Tambah flag agar halaman demo bisa menyembunyikan scrollbar pada desktop
    params.set('hideScroll', '1');
    return `/invitation/demo?${params.toString()}&t=${refreshKey}`;
  };

  // --- 3. UPLOAD IMAGE ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    setIsUploading(true);

    const { error: uploadError } = await supabase.storage
      .from('invitation')
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      alert("Gagal upload: " + uploadError.message);
      setIsUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('invitation')
      .getPublicUrl(filePath);

    const freshUrl = `${publicUrl}?t=${Date.now()}`;
    setData(prev => ({ ...prev, coverPhoto: freshUrl }));
    setIsUploading(false);
  };

  // --- 4. SAVE DATA ---
  const handleSave = async () => {
    if (!userId) return;
    setIsSaving(true);

    const payload = {
        user_id: userId,
        groom_name: data.groomName,
        bride_name: data.brideName,
        event_date: data.date,
        venue_name: data.venue,
        map_url: data.mapUrl,
        theme_color: data.themeColor,
        cover_photo: data.coverPhoto,
        story: data.story,
        music: data.music
    };

    if (data.id === 0) {
        const { data: newData } = await supabase.from('invitations').insert([payload]).select().single();
        if (newData) setData(prev => ({ ...prev, id: newData.id }));
    } else {
        await supabase.from('invitations').update(payload).eq('id', data.id);
    }
    
    setIsSaving(false);
    setActiveMenu(null);
    setRefreshKey(Date.now()); // Refresh iframe
    alert("Berhasil disimpan!");
  };

  // Handlers UI
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };
  const handleThemeChange = (color: string) => { setData(prev => ({ ...prev, themeColor: color })); };
  const handlePreview = () => window.open(getPreviewUrl(), '_blank'); 
  const handleShare = () => { navigator.clipboard.writeText("https://happywedding.com/invitation/demo"); alert("Link tersalin!"); };

  const menuItems = [
    { id: 'mempelai', title: "Mempelai", desc: "Data Pengantin", textColor: "group-hover:text-pink-600", subTextColor: "text-pink-600/80", borderColor: "hover:border-pink-200", watermarkColor: "text-pink-600", icon: (<svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>) },
    { id: 'acara', title: "Acara", desc: "Waktu & Lokasi", textColor: "group-hover:text-blue-600", subTextColor: "text-blue-600/80", borderColor: "hover:border-blue-200", watermarkColor: "text-blue-600", icon: (<svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>) },
    { id: 'galeri', title: "Galeri", desc: "Foto & Video", textColor: "group-hover:text-purple-600", subTextColor: "text-purple-600/80", borderColor: "hover:border-purple-200", watermarkColor: "text-purple-600", icon: (<svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>) },
    { id: 'cerita', title: "Kisah Cinta", desc: "Timeline Cerita", textColor: "group-hover:text-red-600", subTextColor: "text-red-600/80", borderColor: "hover:border-red-200", watermarkColor: "text-red-600", icon: (<svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>) },
    { id: 'musik', title: "Musik", desc: "Lagu Latar", textColor: "group-hover:text-orange-600", subTextColor: "text-orange-600/80", borderColor: "hover:border-orange-200", watermarkColor: "text-orange-600", icon: (<svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>) },
    { id: 'tema', title: "Tema", desc: "Warna & Font", textColor: "group-hover:text-teal-600", subTextColor: "text-teal-600/80", borderColor: "hover:border-teal-200", watermarkColor: "text-teal-600", icon: (<svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>) },
  ];

  const renderEditor = () => {
    if (!activeMenu) return null;

    return (
      <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-gray-100 animate-fade-in-up h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
             <h3 className="text-2xl font-serif font-bold text-gray-900">Edit {menuItems.find(m => m.id === activeMenu)?.title}</h3>
             <button onClick={() => setActiveMenu(null)} suppressHydrationWarning={true} className="text-sm text-gray-500 hover:text-gray-900 font-bold flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>Tutup</button>
        </div>

        <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2 pb-4">
            
            {activeMenu === 'mempelai' && (
                <>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mempelai Pria</label>
                        <input type="text" name="groomName" value={data.groomName} onChange={handleInputChange} suppressHydrationWarning={true} className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-pink-200 transition text-gray-900 font-medium" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mempelai Wanita</label>
                        <input type="text" name="brideName" value={data.brideName} onChange={handleInputChange} suppressHydrationWarning={true} className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-pink-200 transition text-gray-900 font-medium" />
                    </div>
                </>
            )}

            {activeMenu === 'acara' && (
                <>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tanggal Acara</label>
                        <input type="text" name="date" value={data.date} onChange={handleInputChange} suppressHydrationWarning={true} className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-blue-200 transition text-gray-900 font-medium" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Lokasi Venue</label>
                        <input type="text" name="venue" value={data.venue} onChange={handleInputChange} suppressHydrationWarning={true} className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-blue-200 transition text-gray-900 font-medium" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Link Google Maps</label>
                        <input type="text" name="mapUrl" placeholder="https://maps.app.goo.gl/..." value={data.mapUrl} onChange={handleInputChange} suppressHydrationWarning={true} className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-blue-200 transition font-medium text-sm text-blue-600 underline" />
                        <p className="text-[10px] text-gray-400">Copy link dari Google Maps (Share - Copy Link).</p>
                    </div>
                </>
            )}

            {activeMenu === 'galeri' && (
                <div className="space-y-4">
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
                </div>
            )}

            {activeMenu === 'cerita' && (<div className="space-y-2"><label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cerita Pertemuan</label><textarea name="story" value={data.story} onChange={handleInputChange} suppressHydrationWarning={true} rows={5} className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-red-200 transition text-gray-900 font-medium resize-none" /></div>)}
            {activeMenu === 'musik' && (<div className="space-y-2"><label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pilih Lagu</label><select name="music" value={data.music} onChange={handleInputChange} suppressHydrationWarning={true} className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-orange-200 transition text-gray-900 font-medium cursor-pointer appearance-none"><option>Beautiful in White - Shane Filan</option><option>A Thousand Years - Christina Perri</option><option>Perfect - Ed Sheeran</option></select></div>)}
            {activeMenu === 'tema' && (<div className="space-y-4"><label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Warna Dominan</label><div className="flex gap-3">{['Pink', 'Blue', 'Green', 'Gold'].map((color) => (<button key={color} onClick={() => handleThemeChange(color)} suppressHydrationWarning={true} className={`w-12 h-12 rounded-full border-2 transition-all transform hover:scale-110 ${data.themeColor === color ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent'} ${color === 'Pink' ? 'bg-pink-500' : color === 'Blue' ? 'bg-blue-500' : color === 'Green' ? 'bg-emerald-500' : 'bg-yellow-500'}`} />))}</div></div>)}

            <button onClick={handleSave} disabled={isSaving || isUploading} suppressHydrationWarning={true} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition shadow-lg mt-4 disabled:opacity-50">
                {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in-up font-sans text-gray-800">
      
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div><p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">Project Management</p><h1 className="text-4xl font-serif font-bold text-gray-900">My Invitation</h1></div>
          <div className="flex gap-3"><button onClick={handlePreview} suppressHydrationWarning={true} className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-bold hover:border-pink-500 hover:text-pink-600 transition shadow-sm">Lihat Live</button><button onClick={handleShare} suppressHydrationWarning={true} className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-gray-800 transition shadow-lg flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>Bagikan Link</button></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
            <div className="lg:col-span-1 lg:sticky lg:top-8">
              <div className="bg-white rounded-[3rem] p-4 shadow-sm border border-gray-100 flex justify-center items-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                    <div className="relative w-full lg:max-w-[280px] h-[640px] sm:h-[720px] lg:h-[580px] bg-gray-900 rounded-[2.5rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
                      <iframe 
                        src={getPreviewUrl()}
                        className="w-full h-full bg-gray-900 hide-scrollbar [&::-webkit-scrollbar]:hidden"
                        style={{ border: 'none', overflow: 'auto' }}
                        title="Live Preview"
                        scrolling="yes"
                      />
                  </div>
              </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg></div><div><h3 className="font-bold text-gray-900">Status Undangan: Aktif</h3><p className="text-xs text-gray-500">Masa aktif selamanya (Lifetime)</p></div></div>
              </div>
              {activeMenu ? renderEditor() : (<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fade-in-up">{menuItems.map((item) => (<button key={item.id} onClick={() => setActiveMenu(item.id)} suppressHydrationWarning={true} className={`group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl ${item.borderColor} transition-all duration-500 overflow-hidden h-40 flex flex-col justify-end text-left`}><div className={`absolute -bottom-4 -right-4 opacity-10 rotate-12 group-hover:rotate-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 ease-out ${item.watermarkColor}`}>{item.icon}</div><div className="relative z-10"><p className={`font-bold text-[10px] uppercase tracking-[0.2em] mb-1 ${item.subTextColor}`}>{item.desc}</p><h4 className={`font-serif font-bold text-3xl text-gray-900 ${item.textColor} transition-colors tracking-tight`}>{item.title}</h4></div></button>))}</div>)}
          </div>
      </div>
    </div>
  );
}