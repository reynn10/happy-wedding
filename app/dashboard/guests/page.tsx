'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function GuestBookPage() {
  // Mock Data State
  const [guests, setGuests] = useState([
    { id: 1, name: "Budi Santoso", phone: "0812 3456 7890", category: "Keluarga", status: "Hadir", pax: 2 },
    { id: 2, name: "Siti Aminah", phone: "0812 9876 5432", category: "VIP", status: "Pending", pax: 1 },
    { id: 3, name: "Dimas Pratama", phone: "0813 5555 6666", category: "Teman", status: "Tidak Hadir", pax: 0 },
    { id: 4, name: "Rina & Adi", phone: "0856 7777 8888", category: "Keluarga", status: "Hadir", pax: 2 },
    { id: 5, name: "Eko Kurniawan", phone: "0811 2233 4455", category: "Kantor", status: "Pending", pax: 1 },
  ]);

  // Handlers
  const handleExport = () => {
    alert("Sedang mengunduh data tamu ke format Excel (.xlsx)...");
  };

  const handleAddGuest = () => {
    const newName = prompt("Masukkan Nama Tamu Baru:");
    if (newName) {
      const newGuest = {
        id: Date.now(),
        name: newName,
        phone: "08xx xxxx xxxx",
        category: "Umum",
        status: "Pending" as "Hadir" | "Pending" | "Tidak Hadir",
        pax: 1
      };
      // @ts-ignore
      setGuests([...guests, newGuest]);
    }
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus "${name}" dari daftar tamu?`)) {
      setGuests(guests.filter(g => g.id !== id));
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

      {/* --- STATS SUMMARY --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* CARD 1: TOTAL TAMU */}
          <div className="group relative bg-white rounded-4xl p-6 shadow-sm border border-pink-100 hover:shadow-xl hover:border-pink-200 transition-all duration-500 overflow-hidden h-40 flex flex-col justify-end">
              <div className="absolute -bottom-6 -right-6 opacity-10 rotate-12 group-hover:rotate-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 ease-out text-pink-600">
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
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md mb-2 relative z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              </div>
              <div className="relative z-10">
                  <p className="text-pink-600/80 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">Total Tamu</p>
                  <h3 className="text-4xl font-serif font-bold text-gray-900 group-hover:text-pink-600 transition-colors">{totalGuests}</h3>
              </div>
          </div>

          {/* CARD 2: AKAN HADIR */}
          <div className="group relative bg-white rounded-4xl p-6 shadow-sm border border-emerald-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-500 overflow-hidden h-40 flex flex-col justify-end">
              <div className="absolute -bottom-6 -right-6 opacity-10 rotate-12 group-hover:rotate-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 ease-out text-emerald-600">
                  <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
              </div>
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md mb-2 relative z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div className="relative z-10">
                  <p className="text-emerald-600/80 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">Akan Hadir</p>
                  <h3 className="text-4xl font-serif font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{confirmed}</h3>
              </div>
          </div>

          {/* CARD 3: BELUM RESPON */}
          <div className="group relative bg-white rounded-4xl p-6 shadow-sm border border-orange-100 hover:shadow-xl hover:border-orange-200 transition-all duration-500 overflow-hidden h-40 flex flex-col justify-end">
              <div className="absolute -bottom-6 -right-6 opacity-10 rotate-12 group-hover:rotate-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 ease-out text-orange-500">
                  <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4z"/>
                  </svg>
              </div>
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white shadow-md mb-2 relative z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div className="relative z-10">
                  <p className="text-orange-600/80 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">Belum Respon</p>
                  <h3 className="text-4xl font-serif font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{pending}</h3>
              </div>
          </div>

          {/* CARD 4: TIDAK HADIR */}
          <div className="group relative bg-white rounded-4xl p-6 shadow-sm border border-red-100 hover:shadow-xl hover:border-red-200 transition-all duration-500 overflow-hidden h-40 flex flex-col justify-end">
              <div className="absolute -bottom-6 -right-6 opacity-10 rotate-12 group-hover:rotate-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 ease-out text-red-600">
                  <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                  </svg>
              </div>
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shadow-md mb-2 relative z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </div>
              <div className="relative z-10">
                  <p className="text-red-600/80 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">Tidak Hadir</p>
                  <h3 className="text-4xl font-serif font-bold text-gray-900 group-hover:text-red-600 transition-colors">{declined}</h3>
              </div>
          </div>

      </div>

      {/* --- TABLE & FILTER --- */}
      <div className="bg-white p-2 rounded-full border border-gray-200 shadow-sm flex items-center pl-6">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input 
            type="text" 
            placeholder="Cari nama tamu..." 
            suppressHydrationWarning={true}
            className="w-full bg-transparent border-none focus:ring-0 text-sm px-4 outline-none text-gray-700 placeholder:text-gray-400 h-10" 
          />
          <button 
            suppressHydrationWarning={true}
            className="bg-stone-100 text-gray-600 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-stone-200 transition mx-1"
          >
            Filter
          </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
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
              <tbody className="text-sm text-gray-600">
                  {guests.map((guest) => (
                      <tr key={guest.id} className="group hover:bg-stone-50 transition-colors">
                          <td className="py-4 pl-4 border-b border-gray-50 group-last:border-none">
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-gray-500 font-bold text-xs group-hover:bg-white group-hover:shadow-sm transition">
                                      {guest.name.slice(0,2).toUpperCase()}
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
                                  <button 
                                    onClick={() => handleEdit(guest.name)}
                                    suppressHydrationWarning={true}
                                    className="p-2 bg-white border border-gray-200 rounded-full hover:text-blue-600 hover:border-blue-200 transition"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                                  </button>
                                  <button 
                                    onClick={() => handleDelete(guest.id, guest.name)}
                                    suppressHydrationWarning={true}
                                    className="p-2 bg-white border border-gray-200 rounded-full hover:text-red-600 hover:border-red-200 transition"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                  </button>
                              </div>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>

    </div>
  );
}