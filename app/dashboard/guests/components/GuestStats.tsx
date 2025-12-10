import React from 'react';

type Props = {
  stats: {
    total: number;
    confirmed: number;
    pending: number;
    declined: number;
  };
};

export default function GuestStats({ stats }: Props) {
  
  // Utility Component untuk Kartu
  const Card = ({ label, value, icon, colorClass, iconColor }: any) => (
    <div className={`group relative bg-white rounded-4xl p-6 shadow-sm border ${colorClass} overflow-hidden h-40 flex flex-col justify-end 
      /* EFEK INTERAKSI: */
      hover:shadow-xl hover:scale-[1.02] transition-all duration-300
      /* EFEK HP (SAAT DITEKAN): Mengecil sedikit */
      active:scale-95 active:shadow-inner
    `}>
        
        {/* WATERMARK ICON */}
        <div className={`absolute -bottom-4 -right-4 
            /* STATE AWAL: Opacity 40, Miring */
            opacity-40 rotate-12 
            
            /* STATE HOVER (DESKTOP): Opacity 60, Tegak, Membesar */
            group-hover:rotate-0 group-hover:scale-110 group-hover:opacity-60 
            
            /* STATE ACTIVE (HP): Sama seperti Hover saat ditekan */
            group-active:rotate-0 group-active:scale-110 group-active:opacity-60
            
            transition-all duration-500 ease-out 
            ${iconColor}`}
        >
            {icon}
        </div>

        <div className="relative z-10">
            <p className={`${iconColor} opacity-80 font-bold text-[10px] uppercase tracking-[0.2em] mb-1`}>{label}</p>
            {/* Teks angka juga berubah warna saat disentuh/hover */}
            <h3 className={`text-4xl font-serif font-bold text-gray-900 
                ${iconColor.replace('text-', 'group-hover:text-').replace('text-', 'group-active:text-')} 
                transition-colors`}
            >
                {value}
            </h3>
        </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 print:hidden">
      <Card 
        label="Total Tamu" value={stats.total} 
        colorClass="border-pink-100 hover:border-pink-200" iconColor="text-pink-600"
        icon={<svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 9.5C8.5 9.5 8.5 12.5 8.5 13.5C8.5 14.8807 9.61929 16 11 16C12.3807 16 13.5 14.8807 13.5 13.5C13.5 12.5 13.5 9.5 13.5 9.5L14 3H8L8.5 9.5Z" opacity="0.5"/><path d="M11 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M8 21H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M15.5 9.5C15.5 9.5 15.5 12.5 15.5 13.5C15.5 14.8807 16.6193 16 18 16C19.3807 16 20.5 14.8807 20.5 13.5C20.5 12.5 20.5 9.5 20.5 9.5L21 3H15L15.5 9.5Z" opacity="0.5"/><path d="M18 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M15 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="11" cy="5" r="1" fill="currentColor"/><circle cx="18" cy="6" r="1" fill="currentColor"/></svg>}
      />
      <Card 
        label="Akan Hadir" value={stats.confirmed} 
        colorClass="border-emerald-100 hover:border-emerald-200" iconColor="text-emerald-600"
        icon={<svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>}
      />
      <Card 
        label="Belum Respon" value={stats.pending} 
        colorClass="border-orange-100 hover:border-orange-200" iconColor="text-orange-500"
        icon={<svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4z"/></svg>}
      />
      <Card 
        label="Tidak Hadir" value={stats.declined} 
        colorClass="border-red-100 hover:border-red-200" iconColor="text-red-600"
        icon={<svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>}
      />
    </div>
  );
}