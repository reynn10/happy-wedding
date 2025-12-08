'use client';

import React from 'react';
import FormField from './FormField';

type Props = {
  data: any;
  handleInputChange: (e: any) => void;
};

export default function StoryEditor({ data, handleInputChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl p-8 bg-linear-to-br from-rose-50 via-white to-red-50 border border-rose-200/50 backdrop-blur-sm shadow-xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-rose-400 to-transparent"></div>
        
        <div className="mb-6 pb-6 border-b border-rose-200/30">
          <h4 className="text-sm font-bold text-rose-900 uppercase tracking-widest mb-1">💕 Cerita Cinta Kami</h4>
          <p className="text-xs text-rose-700/80 font-light">Bagikan kisah pertemuan dan perjalanan cinta yang menyentuh hati</p>
        </div>

        <FormField
          label="Cerita Pertemuan"
          icon="✨"
          placeholder="Tuliskan bagaimana kalian pertama kali bertemu, momen spesial, dan perjalanan cinta hingga hari ini..."
          name="story"
          value={data.story}
          onChange={handleInputChange}
          accentColor="red"
          multiline={true}
          hint="Cerita yang menyentuh hati akan membuat tamu lebih teringat. (Maks: 500 karakter)"
        />
      </div>
    </div>
  );
}
