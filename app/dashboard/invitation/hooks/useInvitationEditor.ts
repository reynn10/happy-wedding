'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1170&auto=format&fit=crop";

export const useInvitationEditor = () => {
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
  const [refreshKey, setRefreshKey] = useState(Date.now());

  // Fetch data dari Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsLoading(false); return; }
      setUserId(user.id);

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

  // Generate preview URL
  const getPreviewUrl = () => {
    const params = new URLSearchParams();
    params.set('groom', data.groomName);
    params.set('bride', data.brideName);
    params.set('date', data.date);
    params.set('venue', data.venue);
    params.set('cover', data.coverPhoto);
    if (userId) params.set('uid', userId); 
    params.set('hideScroll', '1');
    return `/invitation/demo?${params.toString()}&t=${refreshKey}`;
  };

  // Upload image handler
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

  // Save data handler
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
    setRefreshKey(Date.now());
    alert("Berhasil disimpan!");
  };

  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // Theme change handler
  const handleThemeChange = (color: string) => { 
    setData(prev => ({ ...prev, themeColor: color })); 
  };

  return {
    data,
    setData,
    activeMenu,
    setActiveMenu,
    isLoading,
    isSaving,
    isUploading,
    userId,
    refreshKey,
    getPreviewUrl,
    handleImageUpload,
    handleSave,
    handleInputChange,
    handleThemeChange,
  };
};
