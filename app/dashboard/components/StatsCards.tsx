import React from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  stats: {
    totalGuests: number;
    confirmed: number;
    pending: number;
    declined: number;
  };
};

export default function StatsCards({ stats }: Props) {
  const router = useRouter();

  // Helper Component untuk Kartu
  const Card = ({ label, value, sub, icon, colorClass, borderClass, textClass, onClick }: any) => (
    <div 
      onClick={onClick}
      // UPDATE: Menambahkan active:scale-95 dan active:shadow-inner untuk efek tekan di HP
      className={`group relative bg-white rounded-[2.5rem] p-8 shadow-sm border ${borderClass} overflow-hidden h-56 flex flex-col justify-end 
        hover:shadow-xl hover:scale-[1.02] transition-all duration-300
        active:scale-95 active:shadow-inner active:bg-gray-50
        ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
    >
      {/* UPDATE: Menambahkan group-active untuk animasi ikon saat ditekan */}
      <div className={`absolute -bottom-6 -right-6 
          opacity-40 rotate-12 
          group-hover:rotate-0 group-hover:opacity-60 group-hover:scale-110 
          group-active:rotate-0 group-active:opacity-60 group-active:scale-110
          transition-all duration-500 ease-out ${textClass}`}>
         {icon}
      </div>
      
      <div className="relative z-10">
          <p className={`${textClass} opacity-80 font-bold text-[10px] uppercase tracking-[0.2em] mb-2`}>{label}</p>
          <h3 className={`text-5xl font-serif font-bold text-gray-900 group-hover:${textClass.replace('text-', 'text-')} transition-colors tracking-tight`}>{value}</h3>
          <div className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${colorClass}`}>
             {sub}
          </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       {/* Card 1: Total Tamu (Pink - Champagne) */}
       <Card 
         label="Total Tamu" value={stats.totalGuests} sub="Terdaftar" 
         colorClass="bg-pink-50 text-pink-600 border-pink-100" 
         borderClass="border-pink-100 hover:border-pink-200" 
         textClass="text-pink-600"
         onClick={() => router.push('/dashboard/guests')}
         icon={<svg className="w-40 h-40" viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 9.5C8.5 9.5 8.5 12.5 8.5 13.5C8.5 14.8807 9.61929 16 11 16C12.3807 16 13.5 14.8807 13.5 13.5C13.5 12.5 13.5 9.5 13.5 9.5L14 3H8L8.5 9.5Z" opacity="0.5"/><path d="M11 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M8 21H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M15.5 9.5C15.5 9.5 15.5 12.5 15.5 13.5C15.5 14.8807 16.6193 16 18 16C19.3807 16 20.5 14.8807 20.5 13.5C20.5 12.5 20.5 9.5 20.5 9.5L21 3H15L15.5 9.5Z" opacity="0.5"/><path d="M18 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M15 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="11" cy="5" r="1" fill="currentColor"/><circle cx="18" cy="6" r="1" fill="currentColor"/></svg>}
       />
       
       {/* Card 2: Akan Hadir (Emerald - Amplop) */}
       <Card 
         label="Akan Hadir" value={stats.confirmed} sub="Confirmed" 
         colorClass="bg-emerald-50 text-emerald-600 border-emerald-100" 
         borderClass="border-emerald-100 hover:border-emerald-200" 
         textClass="text-emerald-600"
         icon={<svg className="w-40 h-40" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>}
       />
       
       {/* Card 3: Belum Respon (Orange - Jam Pasir) */}
       <Card 
         label="Belum Respon" value={stats.pending} sub="Menunggu" 
         colorClass="bg-orange-50 text-orange-600 border-orange-100" 
         borderClass="border-orange-100 hover:border-orange-200" 
         textClass="text-orange-600"
         icon={<svg className="w-40 h-40" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4z"/></svg>}
       />
       
       {/* Card 4: Tidak Hadir (Red - Silang) */}
       <Card 
         label="Tidak Hadir" value={stats.declined} sub="Declined" 
         colorClass="bg-red-50 text-red-600 border-red-100" 
         borderClass="border-red-100 hover:border-red-200" 
         textClass="text-red-600"
         icon={<svg className="w-40 h-40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>}
       />
    </div>
  );
}