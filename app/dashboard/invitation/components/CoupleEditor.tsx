'use client';

import React from 'react';
import FormField from './FormField';

type Props = {
  data: any;
  handleInputChange: (e: any) => void;
};

export default function CoupleEditor({ data, handleInputChange }: Props) {
  return (
    <div className="space-y-6">
      {/* Bride Section */}
      <div className="relative overflow-hidden rounded-3xl p-8 bg-linear-to-br from-rose-50 via-white to-pink-50 border border-rose-200/50 backdrop-blur-sm shadow-xl">
        {/* Luxury accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-rose-400 to-transparent"></div>
        
        <div className="mb-6 pb-6 border-b border-rose-200/30">
          <h4 className="text-sm font-bold text-rose-900 uppercase tracking-widest mb-1">👰 Pengantin Wanita</h4>
          <p className="text-xs text-rose-700/80 font-light">Masukkan nama lengkap mempelai wanita dengan elegan</p>
        </div>

        <FormField
          label="Nama Lengkap"
          icon="💎"
          placeholder="Contoh: Siti Nurhaliza"
          name="brideName"
          value={data.brideName}
          onChange={handleInputChange}
          accentColor="pink"
          hint="Tulis dengan nama resmi dan lengkap"
        />
      </div>

      {/* Groom Section */}
      <div className="relative overflow-hidden rounded-3xl p-8 bg-linear-to-br from-blue-50 via-white to-cyan-50 border border-blue-200/50 backdrop-blur-sm shadow-xl">
        {/* Luxury accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-blue-400 to-transparent"></div>
        
        <div className="mb-6 pb-6 border-b border-blue-200/30">
          <h4 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-1">🤵 Pengantin Pria</h4>
          <p className="text-xs text-blue-700/80 font-light">Masukkan nama lengkap mempelai pria dengan elegan</p>
        </div>

        <FormField
          label="Nama Lengkap"
          icon="💎"
          placeholder="Contoh: Reza Ismaya"
          name="groomName"
          value={data.groomName}
          onChange={handleInputChange}
          accentColor="blue"
          hint="Tulis dengan nama resmi dan lengkap"
        />
      </div>
    </div>
  );
}
