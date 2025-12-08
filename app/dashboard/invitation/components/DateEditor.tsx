'use client';

import React from 'react';

type Props = {
  data: any;
  handleInputChange: (e: any) => void;
};

export default function DateEditor({ data, handleInputChange }: Props) {
  return (
    <>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tanggal Acara</label>
        <input type="text" name="date" value={data.date} onChange={handleInputChange} suppressHydrationWarning={true} className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-blue-200 transition text-gray-900 font-medium" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Lokasi Venue</label>
        <input type="text" name="venue" value={data.venue} onChange={handleInputChange} suppressHydrationWarning={true} className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-blue-200 transition text-gray-900 font-medium" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Link Google Maps</label>
        <input type="text" name="mapUrl" placeholder="https://maps.app.goo.gl/..." value={data.mapUrl} onChange={handleInputChange} suppressHydrationWarning={true} className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-blue-200 transition font-medium text-sm text-blue-600 underline" />
        <p className="text-[10px] text-gray-400">Copy link dari Google Maps (Share - Copy Link).</p>
      </div>
    </>
  );
}
