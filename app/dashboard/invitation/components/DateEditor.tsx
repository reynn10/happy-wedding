'use client';

import React from 'react';
import FormField from './FormField';

type Props = {
  data: any;
  handleInputChange: (e: any) => void;
};

export default function DateEditor({ data, handleInputChange }: Props) {
  return (
    <div className="space-y-6">
      {/* Date Section */}
      <div className="relative overflow-hidden rounded-3xl p-8 bg-linear-to-br from-blue-50 via-white to-indigo-50 border border-blue-200/50 backdrop-blur-sm shadow-xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-blue-400 to-transparent"></div>
        
        <div className="mb-6 pb-6 border-b border-blue-200/30">
          <h4 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-1">📅 Tanggal & Waktu</h4>
          <p className="text-xs text-blue-700/80 font-light">Tentukan hari dan waktu istimewa acara pernikahan</p>
        </div>

        <FormField
          label="Tanggal & Waktu"
          icon="⏰"
          placeholder="Contoh: Sabtu, 15 Maret 2025 | Pukul 14:00 WIB"
          name="date"
          value={data.date}
          onChange={handleInputChange}
          accentColor="blue"
          hint="Format: Hari, Tanggal Bulan Tahun | Pukul HH:MM WIB"
        />
      </div>

      {/* Venue Section */}
      <div className="relative overflow-hidden rounded-3xl p-8 bg-linear-to-br from-purple-50 via-white to-pink-50 border border-purple-200/50 backdrop-blur-sm shadow-xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-purple-400 to-transparent"></div>
        
        <div className="mb-6 pb-6 border-b border-purple-200/30">
          <h4 className="text-sm font-bold text-purple-900 uppercase tracking-widest mb-1">📍 Lokasi Venue</h4>
          <p className="text-xs text-purple-700/80 font-light">Pilih venue dengan lokasi yang strategis dan indah</p>
        </div>

        <FormField
          label="Nama Venue"
          icon="🏛️"
          placeholder="Contoh: Grand Ballroom Hotel Mewah"
          name="venue"
          value={data.venue}
          onChange={handleInputChange}
          accentColor="purple"
          hint="Tuliskan nama venue atau lokasi pernikahan yang elegan"
        />
      </div>

      {/* Maps Section */}
      <div className="relative overflow-hidden rounded-3xl p-8 bg-linear-to-br from-emerald-50 via-white to-teal-50 border border-emerald-200/50 backdrop-blur-sm shadow-xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-emerald-400 to-transparent"></div>
        
        <div className="mb-6 pb-6 border-b border-emerald-200/30">
          <h4 className="text-sm font-bold text-emerald-900 uppercase tracking-widest mb-1">🗺️ Link Google Maps</h4>
          <p className="text-xs text-emerald-700/80 font-light">Memudahkan tamu menemukan venue dengan navigasi</p>
        </div>

        <FormField
          label="Maps Link"
          icon="🧭"
          placeholder="https://maps.app.goo.gl/..."
          name="mapUrl"
          value={data.mapUrl}
          onChange={handleInputChange}
          accentColor="teal"
          hint="Buka Google Maps → Share → Copy Link"
        />
      </div>
    </div>
  );
}
