'use client';

import React from 'react';

type Props = {
  data: any;
  handleInputChange: (e: any) => void;
  setActiveMenu: (v: null) => void;
};

export default function CoupleEditor({ data, handleInputChange, setActiveMenu }: Props) {
  return (
    <>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mempelai Pria</label>
        <input type="text" name="groomName" value={data.groomName} onChange={handleInputChange} suppressHydrationWarning={true} className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-pink-200 transition text-gray-900 font-medium" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mempelai Wanita</label>
        <input type="text" name="brideName" value={data.brideName} onChange={handleInputChange} suppressHydrationWarning={true} className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-pink-200 transition text-gray-900 font-medium" />
      </div>
    </>
  );
}
