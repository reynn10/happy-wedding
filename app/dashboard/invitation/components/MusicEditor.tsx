'use client';

import React from 'react';

type Props = {
  data: any;
  handleInputChange: (e: any) => void;
};

export default function MusicEditor({ data, handleInputChange }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pilih Lagu</label>
      <select name="music" value={data.music} onChange={handleInputChange} suppressHydrationWarning={true} className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-orange-200 transition text-gray-900 font-medium cursor-pointer appearance-none">
        <option>Beautiful in White - Shane Filan</option>
        <option>A Thousand Years - Christina Perri</option>
        <option>Perfect - Ed Sheeran</option>
      </select>
    </div>
  );
}
