'use client';

import React from 'react';

type Props = {
  label: string;
  icon?: React.ReactNode;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  name: string;
  hint?: string;
  multiline?: boolean;
  accentColor?: string;
};

export default function FormField({
  label,
  icon,
  placeholder,
  value,
  onChange,
  type = 'text',
  name,
  hint,
  multiline = false,
  accentColor = 'pink',
}: Props) {
  const accentColors = {
    pink: { ring: 'focus:ring-pink-500', border: 'focus:border-pink-300', light: 'bg-pink-500/5' },
    blue: { ring: 'focus:ring-blue-500', border: 'focus:border-blue-300', light: 'bg-blue-500/5' },
    purple: { ring: 'focus:ring-purple-500', border: 'focus:border-purple-300', light: 'bg-purple-500/5' },
    red: { ring: 'focus:ring-red-500', border: 'focus:border-red-300', light: 'bg-red-500/5' },
    orange: { ring: 'focus:ring-orange-500', border: 'focus:border-orange-300', light: 'bg-orange-500/5' },
    teal: { ring: 'focus:ring-teal-500', border: 'focus:border-teal-300', light: 'bg-teal-500/5' },
  };

  const colors = (accentColors as any)[accentColor] || accentColors.pink;
  const inputBase = `w-full px-6 py-4 bg-white/60 backdrop-blur-md border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 text-gray-900 font-medium placeholder:text-gray-400 placeholder:font-light hover:border-gray-300 hover:bg-white/80 hover:shadow-lg ${colors.ring} ${colors.border} ring-offset-0 focus:shadow-2xl focus:shadow-${accentColor}-200/50`;

  if (multiline) {
    return (
      <div className="group">
        <div className="flex items-center gap-3 mb-4">
          {icon && <div className="text-xl">{icon}</div>}
          <label className="text-sm font-bold text-gray-800 uppercase tracking-widest">{label}</label>
        </div>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          suppressHydrationWarning={true}
          className={`${inputBase} resize-none min-h-[140px]`}
        />
        {hint && <p className="text-xs text-gray-600 mt-2 font-light">{hint}</p>}
      </div>
    );
  }

  return (
    <div className="group">
      <div className="flex items-center gap-3 mb-4">
        {icon && <div className="text-xl">{icon}</div>}
        <label className="text-sm font-bold text-gray-800 uppercase tracking-widest">{label}</label>
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        suppressHydrationWarning={true}
        className={inputBase}
      />
      {hint && <p className="text-xs text-gray-600 mt-2 font-light">{hint}</p>}
    </div>
  );
}
