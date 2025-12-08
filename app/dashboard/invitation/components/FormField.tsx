'use client';

import React from 'react';

type Props = {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hint?: string;
  accentColor?: 'pink' | 'blue' | 'purple' | 'teal' | 'orange' | 'red' | 'green' | 'emerald';
};

export default function FormField({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  hint,
  accentColor = 'pink' 
}: Props) {

  // Mapping warna focus ring agar sesuai dengan accentColor
  const focusColors: Record<string, string> = {
    pink: 'focus:ring-pink-100 focus:border-pink-200',
    blue: 'focus:ring-blue-100 focus:border-blue-200',
    purple: 'focus:ring-purple-100 focus:border-purple-200',
    teal: 'focus:ring-teal-100 focus:border-teal-200',
    emerald: 'focus:ring-emerald-100 focus:border-emerald-200',
    green: 'focus:ring-green-100 focus:border-green-200',
    orange: 'focus:ring-orange-100 focus:border-orange-200',
    red: 'focus:ring-red-100 focus:border-red-200',
  };

  const selectedColor = focusColors[accentColor] || focusColors.pink;

  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1 group-hover:text-gray-600 transition-colors">
        {label}
      </label>
      
      <div className="relative">
          <input 
            type={type} 
            name={name} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder}
            className={`w-full px-6 py-4 bg-stone-50/50 rounded-2xl border border-stone-100 outline-none 
              text-gray-900 font-medium placeholder:text-gray-300
              focus:bg-white focus:ring-2 ${selectedColor}
              transition-all duration-300 ease-out shadow-inner
              hover:bg-white hover:border-gray-200`} 
          />
      </div>

      {hint && (
        <p className="text-[10px] text-gray-400 ml-2 italic opacity-0 group-hover:opacity-100 transition-opacity">
            {hint}
        </p>
      )}
    </div>
  );
}