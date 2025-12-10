import React from 'react';

type IconProps = {
  className?: string;
};

// Ikon Champagne (Total Tamu / Pesta)
export const IconChampagne = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.5 9.5C8.5 9.5 8.5 12.5 8.5 13.5C8.5 14.8807 9.61929 16 11 16C12.3807 16 13.5 14.8807 13.5 13.5C13.5 12.5 13.5 9.5 13.5 9.5L14 3H8L8.5 9.5Z" opacity="0.5"/>
    <path d="M11 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 21H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M15.5 9.5C15.5 9.5 15.5 12.5 15.5 13.5C15.5 14.8807 16.6193 16 18 16C19.3807 16 20.5 14.8807 20.5 13.5C20.5 12.5 20.5 9.5 20.5 9.5L21 3H15L15.5 9.5Z" opacity="0.5"/>
    <path d="M18 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M15 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="11" cy="5" r="1" fill="currentColor"/>
    <circle cx="18" cy="6" r="1" fill="currentColor"/>
  </svg>
);

// Ikon Amplop (Hadir / Undangan)
export const IconEnvelope = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

// Ikon Jam Pasir (Pending / Menunggu)
export const IconHourglass = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4z"/>
  </svg>
);

// Ikon Silang / X (Tidak Hadir / Batal)
export const IconCrossCircle = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
  </svg>
);

// Ikon Hati (Couple)
export const IconHeart = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

// Ikon Edit (Pensil)
export const IconEdit = ({ className }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
  </svg>
);

// Ikon Eye (Preview)
export const IconEye = ({ className }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
  </svg>
);