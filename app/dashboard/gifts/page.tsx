import React from 'react';

export default function GiftsPage() {
  return (
    <div className="space-y-8 animate-fade-in-up font-sans text-gray-800">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
              <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">Finance</p>
              <h1 className="text-4xl font-serif font-bold text-gray-900">Gifts & Angpao</h1>
          </div>
          <button className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-gray-800 transition shadow-lg flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
              Tambah Rekening
          </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- KOLOM KIRI: KARTU AKTIF --- */}
          <div className="lg:col-span-2 space-y-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Rekening Aktif</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* KARTU 1: BCA */}
                  <div className="group relative w-full aspect-[1.586/1] rounded-4xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                      <div className="absolute inset-0 bg-linear-to-br from-[#00529C] to-[#003366]"></div>
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-white to-transparent"></div>
                      <div className="relative h-full p-6 flex flex-col justify-between text-white">
                          <div className="flex justify-between items-start">
                              <span className="font-bold tracking-widest text-sm">BCA</span>
                              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 backdrop-blur"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
                          </div>
                          <div>
                              <p className="font-mono text-xl tracking-widest mb-1">1234 5678 9000</p>
                              <p className="text-xs text-gray-300 uppercase tracking-wider">ROMEO PUTRA</p>
                          </div>
                      </div>
                  </div>

                  {/* KARTU 2: MANDIRI */}
                  <div className="group relative w-full aspect-[1.586/1] rounded-4xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                      <div className="absolute inset-0 bg-linear-to-br from-[#FFB800] via-[#F29600] to-[#b46d00]"></div>
                      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                      <div className="relative h-full p-6 flex flex-col justify-between text-white">
                          <div className="flex justify-between items-start">
                              <span className="font-bold tracking-widest text-sm">MANDIRI</span>
                              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 backdrop-blur"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
                          </div>
                          <div>
                              <p className="font-mono text-xl tracking-widest mb-1">0987 6543 2100</p>
                              <p className="text-xs text-yellow-100 uppercase tracking-wider">JULIET PUTRI</p>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Transaction Log */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm mt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Hadiah Masuk Terbaru</h3>
                  <div className="space-y-4">
                      {[1,2,3].map((i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                              <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                  </div>
                                  <div>
                                      <p className="font-bold text-gray-900">Rp 500.000</p>
                                      <p className="text-xs text-gray-500">Dari: Budi Santoso</p>
                                  </div>
                              </div>
                              <span className="text-xs text-gray-400">2 jam lalu</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          {/* --- KOLOM KANAN: ALAMAT KIRIM KADO --- */}
          <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm h-full flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Alamat Kirim Kado</h3>
                  <div className="p-6 bg-pink-50 rounded-2xl border border-pink-100 flex-1">
                      <p className="text-sm font-bold text-gray-900 mb-2">Rumah Mempelai Wanita</p>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                          Jl. Melati Indah No. 45, RT 02/RW 05, <br/>
                          Kec. Kebayoran Baru, Jakarta Selatan, <br/>
                          DKI Jakarta, 12190
                      </p>
                      <div className="flex gap-2">
                          <button className="flex-1 py-2 bg-white text-pink-600 text-xs font-bold rounded-lg border border-pink-200 hover:bg-pink-100 transition">Edit Alamat</button>
                          <button className="flex-1 py-2 bg-white text-gray-600 text-xs font-bold rounded-lg border border-gray-200 hover:bg-gray-100 transition">Salin</button>
                      </div>
                  </div>
                  
                  <div className="mt-6 p-4 rounded-2xl bg-stone-50 border border-stone-100">
                      <p className="text-xs text-gray-500 italic">"Fitur ini memudahkan tamu yang ingin mengirimkan kado fisik."</p>
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
}