'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Gift = {
  id: number;
  bank_name: string;
  account_number: string;
  account_holder: string;
};

export default function GiftsPage() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGifts = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('gifts')
        .select('*')
        .eq('user_id', user.id);
      
      if (data) setGifts(data);
      setIsLoading(false);
    };
    fetchGifts();
  }, []);

  const handleAddGift = async () => {
    const bank = prompt("Masukkan Nama Bank:");
    const number = prompt("Nomor Rekening:");
    const holder = prompt("Atas Nama:");

    if (bank && number && holder) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('gifts')
        .insert([{ 
            user_id: user.id, 
            bank_name: bank, 
            account_number: number, 
            account_holder: holder 
        }])
        .select();

      if (data) setGifts([...gifts, data[0]]);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus rekening?")) {
        await supabase.from('gifts').delete().eq('id', id);
        setGifts(gifts.filter(g => g.id !== id));
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Disalin!");
  };

  return (
    <div className="space-y-8 animate-fade-in-up font-sans text-gray-800">
      
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div><p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">Finance</p><h1 className="text-4xl font-serif font-bold text-gray-900">Gifts & Angpao</h1></div>
          <button onClick={handleAddGift} suppressHydrationWarning={true} className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-gray-800 transition shadow-lg flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>Tambah Rekening</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Rekening Aktif</h3>
              {isLoading ? <p>Memuat...</p> : gifts.length === 0 ? <p className="text-gray-400">Belum ada rekening.</p> : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {gifts.map((gift) => (
                        <div key={gift.id} className="group relative w-full aspect-[1.586/1] rounded-4xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                            <div className={`absolute inset-0 bg-linear-to-br ${gift.bank_name.toLowerCase().includes('bca') ? 'from-[#00529C] to-[#003366]' : 'from-[#FFB800] via-[#F29600] to-[#b46d00]'}`}></div>
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-white to-transparent"></div>
                            <div className="relative h-full p-6 flex flex-col justify-between text-white">
                                <div className="flex justify-between items-start">
                                    <span className="font-bold tracking-widest text-sm uppercase">{gift.bank_name}</span>
                                    <button onClick={() => handleDelete(gift.id)} suppressHydrationWarning={true} className="p-2 bg-white/20 rounded-full hover:bg-red-500/80 backdrop-blur transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                                </div>
                                <div className="cursor-pointer" onClick={() => handleCopy(gift.account_number)}>
                                    <p className="font-mono text-xl tracking-widest mb-1 drop-shadow-md">{gift.account_number}</p>
                                    <p className="text-xs text-white/80 uppercase tracking-wider">{gift.account_holder}</p>
                                </div>
                            </div>
                        </div>
                      ))}
                  </div>
              )}
          </div>
      </div>
    </div>
  );
}