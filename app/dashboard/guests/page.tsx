'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient'; // Pastikan path import ini sesuai struktur folder Anda

// Definisi tipe data agar TypeScript senang
type Guest = {
  id: number;
  name: string;
  phone: string;
  category: string;
  status: string;
  pax: number;
};

export default function GuestBookPage() {
  // State sekarang kosong dulu, nanti diisi dari Database
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- 1. FETCH DATA (AMBIL DARI SUPABASE) ---
  const fetchGuests = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .order('id', { ascending: false }); // Urutkan yang terbaru di atas

    if (error) {
      console.error('Error fetching guests:', error);
    } else {
      setGuests(data || []);
    }
    setIsLoading(false);
  };

  // Jalankan saat halaman dibuka
  useEffect(() => {
    fetchGuests();
  }, []);

  // Handlers
  const handleExport = () => {
    alert("Sedang mengunduh data tamu ke format Excel (.xlsx)...");
  };

  // --- 2. ADD GUEST (SIMPAN KE SUPABASE) ---
  const handleAddGuest = async () => {
    const newName = prompt("Masukkan Nama Tamu Baru:");
    if (!newName) return;

    const newGuest = {
      name: newName,
      phone: "08xx xxxx xxxx", // Default sementara
      category: "Umum",
      status: "Pending",
      pax: 1
    };

    // Optimistic UI: Tampilkan dulu di layar biar cepat
    const tempId = Date.now();
    const optimisticGuest = { ...newGuest, id: tempId };
    setGuests([optimisticGuest, ...guests]);

    // Kirim ke Database
    const { data, error } = await supabase
      .from('guests')
      .insert([newGuest])
      .select();

    if (error) {
      alert("Gagal menyimpan: " + error.message);
      fetchGuests(); // Refresh jika gagal
    } else if (data) {
      // Update data di layar dengan data asli dari DB (yang punya ID valid)
      setGuests(prev => [data[0], ...prev.filter(g => g.id !== tempId)]);
    }
  };

  // --- 3. DELETE GUEST (HAPUS DARI SUPABASE) ---
  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus "${name}" dari daftar tamu?`)) {
      // Hapus dari layar dulu
      setGuests(guests.filter(g => g.id !== id));

      // Hapus dari Database
      const { error } = await supabase
        .from('guests')
        .delete()
        .eq('id', id);

      if (error) {
        alert("Gagal menghapus: " + error.message);
        fetchGuests(); // Refresh jika gagal
      }
    }
  };

  const handleEdit = (name: string) => {
    alert(`Fitur edit untuk "${name}" akan membuka modal detail.`);
  };

  // Calculated Stats
  const totalGuests = guests.length;
  const confirmed = guests.filter(g => g.status === 'Hadir').length;
  const pending = guests.filter(g => g.status === 'Pending').length;
  const declined = guests.filter(g => g.status === 'Tidak Hadir').length;

  return (
    <div className="space-y-8 animate-fade-in-up font-sans text-gray-800">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
              <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">Guest Management</p>
              <h1 className="text-4xl font-serif font-bold text-gray-900">Buku Tamu</h1>
          </div>
          <div className="flex gap-3">
              <button 
                onClick={handleExport}
                suppressHydrationWarning={true}
                className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-bold hover:border-pink-500 hover:text-pink-600 transition shadow-sm flex items-center gap-2"
              >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  Export Excel
              </button>
              <button 
                onClick={handleAddGuest}
                suppressHydrationWarning={true}
                className="px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-gray-800 transition shadow-lg flex items-center gap-2"
              >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                  Tambah Tamu
              </button>
          </div>
      </div>

      {/* --- STATS SUMMARY (IKON ASLI ANDA) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* CARD 1: TOTAL TAMU (Champagne Toast - Pink) */}
          <div className="group relative bg-white rounded-4xl p-6 shadow-sm border border-pink-100 hover:shadow-xl hover:border-pink-200 transition-all duration-500 overflow-hidden h-40 flex flex-col justify-end">
              <div className="absolute -bottom-4 -right-4 opacity-40 rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-transform duration-500 text-pink-600">
                  <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.5 9.5C8.5 9.5 8.5 12.5 8.5 13.5C8.5 14.8807 9.61929 16 11 16C12.3807 16 13.5 14.8807 13.5 13.5C13.5 12.5 13.5 9.5 13.5 9.5L14 3H8L8.5 9.5Z" opacity="0.5"/>
                      <path d="M11 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M8 21H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M15.5 9.5C15.5 9.5 15.5 12.5 15.5 13.5C15.5 14.8807 16.6193 16 18 16C19.3807 16 20.5 14.8807 20.5 13.5C20.5 12.5 20.5 9.5 20.5 9.5L21 3H15L15.5 9.5Z" opacity="0.5"/>
                      <path d="M18 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M15 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="11" cy="5" r="1" fill="currentColor"/>
                      <circle cx="18" cy="6" r="1" fill="currentColor"/>
                  </svg>
              </div>
              <div className="relative z-10">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Total Tamu</span>
                  <span className="text-3xl font-serif font-bold text-gray-900">{totalGuests}</span>
              </div>
          </div>

          {/* CARD 2: AKAN HADIR (Amplop - Emerald) */}
          <div className="group relative bg-white rounded-4xl p-6 shadow-sm border border-emerald-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-500 overflow-hidden h-40 flex flex-col justify-end">
              <div className="absolute -bottom-4 -right-4 opacity-40 rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-transform duration-500 text-emerald-600">
                  <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
              </div>
              <div className="relative z-10">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Akan Hadir</span>
                  <span className="text-3xl font-serif font-bold text-gray-900">{confirmed}</span>
              </div>
          </div>

          {/* CARD 3: BELUM RESPON (Jam Pasir - Yellow) */}
          <div className="group relative bg-white rounded-4xl p-6 shadow-sm border border-yellow-100 hover:shadow-lg transition-all overflow-hidden h-40 flex flex-col justify-end">
              <div className="absolute -bottom-4 -right-4 opacity-40 rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-transform duration-500 text-yellow-600">
                  <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4z"/>
                  </svg>
              </div>
              <div className="relative z-10">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Belum Respon</span>
                  <span className="text-3xl font-serif font-bold text-gray-900">{pending}</span>
              </div>
          </div>

          {/* CARD 4: TIDAK HADIR (Silang - Red) */}
          <div className="group relative bg-white rounded-4xl p-6 shadow-sm border border-red-100 hover:shadow-xl hover:border-red-200 transition-all duration-500 overflow-hidden h-40 flex flex-col justify-end">
              <div className="absolute -bottom-4 -right-4 opacity-40 rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-transform duration-500 text-red-600">
                  <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                  </svg>
              </div>
              <div className="relative z-10">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Tidak Hadir</span>
                  <span className="text-3xl font-serif font-bold text-gray-900">{declined}</span>
              </div>
          </div>

      </div>

      {/* --- TABLE CARD --- */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[300px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-64 text-gray-400 animate-pulse">Memuat Data Database...</div>
          ) : guests.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64 text-gray-400">
              <p>Belum ada tamu.</p>
              <button onClick={handleAddGuest} className="text-pink-600 font-bold text-sm mt-2 hover:underline">Tambah Tamu Pertama</button>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-stone-50/50">
                  <tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
                      <th className="pb-4 font-semibold pl-4 pt-4">Nama Tamu</th>
                      <th className="pb-4 font-semibold pt-4">Nomor WA</th>
                      <th className="pb-4 font-semibold pt-4">Kategori</th>
                      <th className="pb-4 font-semibold text-center pt-4">Status RSVP</th>
                      <th className="pb-4 pr-8 font-semibold text-right pt-4">Aksi</th>
                  </tr>
              </thead>
              <tbody className="text-sm text-gray-600 divide-y divide-gray-50">
                  {guests.map((guest) => (
                      <tr key={guest.id} className="group hover:bg-stone-50 transition-colors">
                          <td className="py-4 pl-4 border-b border-gray-50 group-last:border-none">
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-gray-500 font-bold text-xs group-hover:bg-white group-hover:shadow-sm transition">
                                      {guest.name ? guest.name.slice(0,2).toUpperCase() : '??'}
                                  </div>
                                  <div>
                                      <span className="font-bold text-gray-900 block">{guest.name}</span>
                                      <span className="text-xs text-gray-400">Diundang via WhatsApp</span>
                                  </div>
                              </div>
                          </td>
                          <td className="py-4 border-b border-gray-50 font-mono text-xs">{guest.phone}</td>
                          <td className="py-4 border-b border-gray-50">
                              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500">{guest.category}</span>
                          </td>
                          <td className="py-4 text-center border-b border-gray-50">
                              {guest.status === 'Hadir' && (
                                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700">Hadir ({guest.pax})</span>
                              )}
                              {guest.status === 'Pending' && (
                                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-yellow-50 text-yellow-700">Pending</span>
                              )}
                              {guest.status === 'Tidak Hadir' && (
                                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700">Tidak Hadir</span>
                              )}
                          </td>
                          <td className="py-4 pr-8 border-b border-gray-50 text-right">
                              <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => handleEdit(guest.name)} suppressHydrationWarning={true} className="p-2 bg-white border border-gray-200 rounded-full hover:text-blue-600 hover:border-blue-200 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
                                  <button onClick={() => handleDelete(guest.id, guest.name)} suppressHydrationWarning={true} className="p-2 bg-white border border-gray-200 rounded-full hover:text-red-600 hover:border-red-200 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                              </div>
                          </td>
                      </tr>
                  ))}
              </tbody>
            </table>
          )}
      </div>

    </div>
  );
}