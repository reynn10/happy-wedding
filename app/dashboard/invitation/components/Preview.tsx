'use client';

import React from 'react';

type PreviewProps = {
  previewUrl: string;
};

export default function Preview({ previewUrl }: PreviewProps) {
  return (
    <div className="lg:col-span-1 lg:sticky lg:top-8">
      <div className="bg-white rounded-[3rem] p-4 shadow-sm border border-gray-100 flex justify-center items-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
        <div className="relative w-full lg:max-w-[280px] h-[640px] sm:h-[720px] lg:h-[580px] bg-gray-900 rounded-[2.5rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
          <iframe 
            src={previewUrl}
            className="w-full h-full bg-gray-900 hide-scrollbar [&::-webkit-scrollbar]:hidden"
            style={{ border: 'none', overflow: 'auto' }}
            title="Live Preview"
            scrolling="yes"
          />
        </div>
      </div>
    </div>
  );
}
