'use client';

import React from 'react';

type Props = {
  data: any;
  handleInputChange: (e: any) => void;
};

export default function MusicEditor({ data, handleInputChange }: Props) {
  const songs = [
    { id: 1, title: 'Beautiful in White', artist: 'Shane Filan', duration: '3:42' },
    { id: 2, title: 'A Thousand Years', artist: 'Christina Perri', duration: '4:13' },
    { id: 3, title: 'Perfect', artist: 'Ed Sheeran', duration: '3:44' },
    { id: 4, title: 'All of Me', artist: 'John Legend', duration: '4:27' },
    { id: 5, title: 'Marry You', artist: 'Bruno Mars', duration: '3:50' },
  ];

  const currentSong = songs.find(s => s.title === data.music);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl p-8 bg-linear-to-br from-amber-50 via-white to-orange-50 border border-amber-200/50 backdrop-blur-sm shadow-xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-amber-400 to-transparent"></div>
        
        <div className="mb-6 pb-6 border-b border-amber-200/30">
          <h4 className="text-sm font-bold text-amber-900 uppercase tracking-widest mb-1">🎵 Pilih Musik Latar</h4>
          <p className="text-xs text-amber-700/80 font-light">Musik yang akan menemani tamu membuka undangan</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {songs.map((song) => (
            <button
              key={song.id}
              onClick={() => handleInputChange({ target: { name: 'music', value: song.title } } as any)}
              suppressHydrationWarning={true}
              className={`relative overflow-hidden rounded-2xl px-6 py-4 text-left transition-all duration-300 group ${
                data.music === song.title
                  ? 'bg-linear-to-r from-amber-200 to-orange-200 border-2 border-amber-400 shadow-lg scale-105'
                  : 'bg-white border-2 border-amber-200 hover:border-amber-300 hover:shadow-md hover:bg-amber-50/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className={`text-sm font-semibold ${data.music === song.title ? 'text-amber-950' : 'text-gray-900'}`}>
                    ♪ {song.title}
                  </div>
                  <div className={`text-xs mt-1.5 font-light ${data.music === song.title ? 'text-amber-900' : 'text-gray-600'}`}>
                    {song.artist}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold tabular-nums ${data.music === song.title ? 'text-amber-900' : 'text-gray-500'}`}>
                    {song.duration}
                  </span>
                  {data.music === song.title && (
                    <div className="flex gap-1">
                      <div className="w-1 h-3 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1 h-3 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1 h-3 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  )}
                </div>
              </div>
              {data.music === song.title && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-amber-400 to-orange-400"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {currentSong && (
        <div className="relative overflow-hidden rounded-2xl p-4 bg-linear-to-r from-amber-100 to-orange-100 border-2 border-amber-300 shadow-md">
          <p className="text-sm text-amber-900 font-semibold">
            <span className="text-base">♪</span> {currentSong.title} - {currentSong.artist}
          </p>
        </div>
      )}
    </div>
  );
}
