'use client';

import React from 'react';

type Props = {
  data: any;
  handleInputChange: (e: any) => void;
};

export default function StoryEditor({ data, handleInputChange }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cerita Pertemuan</label>
      <textarea name="story" value={data.story} onChange={handleInputChange} suppressHydrationWarning={true} rows={5} className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-red-200 transition text-gray-900 font-medium resize-none" />
    </div>
  );
}
