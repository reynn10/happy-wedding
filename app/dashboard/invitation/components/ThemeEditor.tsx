'use client';

import React from 'react';

type Props = {
  data: any;
  handleThemeChange: (color: string) => void;
};

export default function ThemeEditor({ data, handleThemeChange }: Props) {
  const themes = [
    {
      id: 'Pink',
      name: 'Rose Garden',
      color: 'bg-pink-500',
      gradient: 'from-pink-400 to-rose-500',
      icon: '🌹',
      description: 'Romantic & Elegant',
    },
    {
      id: 'Blue',
      name: 'Ocean Breeze',
      color: 'bg-blue-500',
      gradient: 'from-blue-400 to-cyan-500',
      icon: '🌊',
      description: 'Calm & Luxurious',
    },
    {
      id: 'Green',
      name: 'Garden Paradise',
      color: 'bg-emerald-500',
      gradient: 'from-emerald-400 to-teal-500',
      icon: '🌿',
      description: 'Fresh & Natural',
    },
    {
      id: 'Gold',
      name: 'Golden Luxury',
      color: 'bg-yellow-500',
      gradient: 'from-yellow-400 to-amber-500',
      icon: '👑',
      description: 'Luxurious & Premium',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl p-8 bg-linear-to-br from-teal-50 via-white to-cyan-50 border border-teal-200/50 backdrop-blur-sm shadow-xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-teal-400 to-transparent"></div>
        
        <div className="mb-8 pb-6 border-b border-teal-200/30">
          <h4 className="text-sm font-bold text-teal-900 uppercase tracking-widest mb-1">🎨 Tema Warna Premium</h4>
          <p className="text-xs text-teal-700/80 font-light">Pilih warna yang akan menjadi aksen utama di seluruh undangan</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              suppressHydrationWarning={true}
              className={`relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-300 group transform ${
                data.themeColor === theme.id
                  ? 'ring-2 ring-gray-900 shadow-2xl scale-105'
                  : 'hover:shadow-xl hover:scale-102 ring-2 ring-transparent'
              }`}
            >
              <div className={`absolute inset-0 bg-linear-to-br ${theme.gradient} opacity-90 group-hover:opacity-100 transition`}></div>
              <div className="relative z-10">
                <div className="text-5xl mb-3 drop-shadow-lg">{theme.icon}</div>
                <div className="text-white font-bold text-sm drop-shadow-md">{theme.name}</div>
                <div className="text-white text-xs opacity-95 mt-1.5 font-light">{theme.description}</div>

                {data.themeColor === theme.id && (
                  <div className="absolute top-3 right-3 bg-white/95 rounded-full p-1.5 shadow-lg">
                    <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {data.themeColor && (
        <div className="relative overflow-hidden rounded-2xl p-5 bg-white border-2 border-gray-200 shadow-md">
          <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-gray-400 to-gray-300"></div>
          <p className="text-sm text-gray-900 font-semibold pl-4">
            ✨ Tema <span className="font-bold text-lg">{themes.find(t => t.id === data.themeColor)?.icon}</span> 
            <span className="ml-2 text-gray-700">{themes.find(t => t.id === data.themeColor)?.name} terpilih</span>
          </p>
        </div>
      )}
    </div>
  );
}
