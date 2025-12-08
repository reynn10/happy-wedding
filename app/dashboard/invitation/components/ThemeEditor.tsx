'use client';

import React from 'react';

type Props = {
  data: any;
  handleThemeChange: (color: string) => void;
};

export default function ThemeEditor({ data, handleThemeChange }: Props) {
  return (
    <div className="space-y-4">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Warna Dominan</label>
      <div className="flex gap-3">
        {['Pink', 'Blue', 'Green', 'Gold'].map((color) => (
          <button key={color} onClick={() => handleThemeChange(color)} suppressHydrationWarning={true} className={`w-12 h-12 rounded-full border-2 transition-all transform hover:scale-110 ${data.themeColor === color ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent'} ${color === 'Pink' ? 'bg-pink-500' : color === 'Blue' ? 'bg-blue-500' : color === 'Green' ? 'bg-emerald-500' : 'bg-yellow-500'}`} />
        ))}
      </div>
    </div>
  );
}
