import React from 'react';
import { Guest } from '../types';

type Props = {
  guests: Guest[];
  isLoading: boolean;
  selectedIds: number[];
  onToggleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleSelect: (id: number) => void;
  onSendWA: (guest: Guest) => void;
  onEdit: (guest: Guest) => void;
  onDelete: (id: number) => void;
  onImport: () => void;
};

export default function GuestTable({ 
  guests, isLoading, selectedIds, 
  onToggleSelectAll, onToggleSelect, 
  onSendWA, onEdit, onDelete, onImport 
}: Props) {
  return (
    <>
      {/* FILTER BAR */}
      <div className="bg-white p-2 rounded-full border border-gray-200 shadow-sm flex items-center pl-6">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" placeholder="Cari nama tamu..." suppressHydrationWarning={true} className="w-full bg-transparent border-none focus:ring-0 text-sm px-4 outline-none text-gray-700 placeholder:text-gray-400 h-10" />
          <button suppressHydrationWarning={true} className="bg-stone-100 text-gray-600 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-stone-200 transition mx-1">Filter</button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[300px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-64 text-gray-400 animate-pulse">Memuat Data...</div>
          ) : guests.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64 text-gray-400">
              <p>Belum ada tamu.</p>
              <button onClick={onImport} className="text-blue-600 font-bold text-sm mt-2 hover:underline">Import Kontak</button>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-stone-50/50">
                  <tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
                      <th className="pl-6 py-4 w-10">
                        <input type="checkbox" onChange={onToggleSelectAll} checked={guests.length > 0 && selectedIds.length === guests.length} className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500 border-gray-300" />
                      </th>
                      <th className="pb-4 font-semibold pl-2 pt-6">Nama Tamu</th>
                      <th className="pb-4 font-semibold pt-6">Kontak</th>
                      <th className="pb-4 font-semibold pt-6 text-center">Status</th>
                      <th className="pb-4 pr-8 font-semibold text-right pt-6 print:hidden">Aksi</th>
                  </tr>
              </thead>
              <tbody className="text-sm text-gray-600 divide-y divide-gray-50">
                  {guests.map((guest) => (
                      <tr key={guest.id} className={`group transition-colors ${selectedIds.includes(guest.id) ? 'bg-pink-50/50' : 'hover:bg-stone-50'}`}>
                          <td className="pl-6 py-4"><input type="checkbox" checked={selectedIds.includes(guest.id)} onChange={() => onToggleSelect(guest.id)} className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500 border-gray-300" /></td>
                          <td className="py-4 pl-2"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-gray-500 font-bold text-xs">{guest.name.charAt(0).toUpperCase()}</div><span className="font-bold text-gray-900">{guest.name}</span></div></td>
                          <td className="py-4 font-mono text-xs text-gray-400">{guest.phone || "-"}</td>
                          <td className="py-4 text-center"><span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${guest.status === 'Hadir' ? 'bg-green-100 text-green-700' : guest.status === 'Tidak Hadir' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{guest.status}</span></td>
                          <td className="py-4 pr-8 text-right print:hidden">
                              <div className="flex justify-end gap-2">
                                  <button onClick={() => onSendWA(guest)} title="Kirim WA" className="p-2 bg-green-50 border border-green-200 text-green-600 rounded-full hover:bg-green-100 transition shadow-sm"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></button>
                                  <button onClick={() => onEdit(guest)} className="p-2 bg-blue-50 border border-blue-200 text-blue-600 rounded-full hover:bg-blue-100 transition shadow-sm"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
                                  <button onClick={() => onDelete(guest.id)} className="p-2 bg-red-50 border border-red-200 text-red-600 rounded-full hover:bg-red-100 transition shadow-sm"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                              </div>
                          </td>
                      </tr>
                  ))}
              </tbody>
            </table>
          )}
      </div>
    </>
  );
}