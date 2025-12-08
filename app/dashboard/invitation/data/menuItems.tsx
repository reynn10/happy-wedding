import React from 'react';

export const menuItems = [
  {
    id: 'mempelai',
    title: "Mempelai",
    desc: "Data Pengantin",
    textColor: "group-hover:text-pink-600",
    subTextColor: "text-pink-600/80",
    borderColor: "hover:border-pink-200",
    watermarkColor: "text-pink-600",
    icon: (
      <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  {
    id: 'acara',
    title: "Acara",
    desc: "Waktu & Lokasi",
    textColor: "group-hover:text-blue-600",
    subTextColor: "text-blue-600/80",
    borderColor: "hover:border-blue-200",
    watermarkColor: "text-blue-600",
    icon: (
      <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
      </svg>
    ),
  },
  {
    id: 'galeri',
    title: "Galeri",
    desc: "Foto & Video",
    textColor: "group-hover:text-purple-600",
    subTextColor: "text-purple-600/80",
    borderColor: "hover:border-purple-200",
    watermarkColor: "text-purple-600",
    icon: (
      <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
      </svg>
    ),
  },
  {
    id: 'cerita',
    title: "Kisah Cinta",
    desc: "Timeline Cerita",
    textColor: "group-hover:text-red-600",
    subTextColor: "text-red-600/80",
    borderColor: "hover:border-red-200",
    watermarkColor: "text-red-600",
    icon: (
      <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
      </svg>
    ),
  },
  {
    id: 'musik',
    title: "Musik",
    desc: "Lagu Latar",
    textColor: "group-hover:text-orange-600",
    subTextColor: "text-orange-600/80",
    borderColor: "hover:border-orange-200",
    watermarkColor: "text-orange-600",
    icon: (
      <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </svg>
    ),
  },
  {
    id: 'tema',
    title: "Tema",
    desc: "Warna & Font",
    textColor: "group-hover:text-teal-600",
    subTextColor: "text-teal-600/80",
    borderColor: "hover:border-teal-200",
    watermarkColor: "text-teal-600",
    icon: (
      <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>
    ),
  },
];
