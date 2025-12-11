'use client';
import React, { useState, useEffect } from 'react';
import { Guest } from '../types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, phone: string, category: string, pax: number) => void;
  editingGuest: Guest | null;
  isSaving: boolean; // Prop baru untuk loading state
};

export default function GuestModal({ isOpen, onClose, onSave, editingGuest, isSaving }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Umum');
  const [pax, setPax] = useState(1);

  // Reset form saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      if (editingGuest) {
        setName(editingGuest.name);
        setPhone(editingGuest.phone || '');
        setCategory(editingGuest.category || 'Umum');
        setPax(editingGuest.pax || 1);
      } else {
        setName('');
        setPhone('');
        setCategory('Umum');
        setPax(1);
      }
    }
  }, [isOpen, editingGuest]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl scale-100 animate-zoom-in">
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
          {editingGuest ? 'Edit Tamu' : 'Tambah Tamu Baru'}
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-1">
             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Nama Lengkap</label>
             <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-5 py-3 bg-stone-50 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-pink-200 focus:bg-white transition font-medium" placeholder="Nama Tamu" />
          </div>
          
          <div className="space-y-1">
             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Nomor WhatsApp</label>
             <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-5 py-3 bg-stone-50 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-pink-200 focus:bg-white transition font-medium font-mono" placeholder="08..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Kategori</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-5 py-3 bg-stone-50 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-pink-200 focus:bg-white transition font-medium cursor-pointer">
                    <option value="Umum">Umum</option>
                    <option value="Keluarga">Keluarga</option>
                    <option value="VIP">VIP</option>
                    <option value="Kantor">Kantor</option>
                </select>
             </div>
             <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Jumlah (Pax)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  value={pax} 
                  onChange={e => setPax(Number(e.target.value) || 1)} // Handle empty string/NaN
                  className="w-full px-5 py-3 bg-stone-50 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-pink-200 focus:bg-white transition font-medium text-center" 
                />
             </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
            <button onClick={onClose} disabled={isSaving} className="flex-1 py-3.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition disabled:opacity-50">Batal</button>
            
            <button 
              onClick={() => onSave(name, phone, category, pax)} 
              disabled={isSaving || !name}
              className="flex-1 py-3.5 rounded-xl bg-pink-600 text-white font-bold hover:bg-pink-700 transition shadow-lg shadow-pink-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Menyimpan...
                </>
              ) : (
                "Simpan"
              )}
            </button>
        </div>
      </div>
    </div>
  );
}