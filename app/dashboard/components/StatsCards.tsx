import React from 'react';
import { useRouter } from 'next/navigation';
import { IconChampagne, IconEnvelope, IconHourglass, IconCrossCircle } from '../components/icons/AppIcons';

type Props = { stats: any };

export default function StatsCards({ stats }: Props) {
  const router = useRouter();

  // Helper untuk membuat kartu agar kode tidak berulang
  const Card = ({ label, value, sub, icon: Icon, colorClass, borderClass, textClass, onClick }: any) => (
    <div 
      onClick={onClick}
      className={`group relative bg-white rounded-[2.5rem] p-8 shadow-sm border ${borderClass} hover:shadow-xl transition-all duration-500 overflow-hidden h-56 flex flex-col justify-end ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className={`absolute -bottom-6 -right-6 opacity-10 rotate-12 group-hover:rotate-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 ease-out ${textClass}`}>
         <Icon className="w-40 h-40" />
      </div>
      <div className="relative z-10">
          <p className={`${textClass} opacity-80 font-bold text-[10px] uppercase tracking-[0.2em] mb-2`}>{label}</p>
          <h3 className={`text-5xl font-serif font-bold text-gray-900 group-hover:${textClass.replace('/80','')} transition-colors tracking-tight`}>{value}</h3>
          <div className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${colorClass}`}>
             {sub}
          </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       <Card 
         label="Total Tamu" value={stats.totalGuests} sub="Terdaftar" 
         icon={IconChampagne} 
         colorClass="bg-pink-50 text-pink-600 border-pink-100" 
         borderClass="border-pink-100 hover:border-pink-200" 
         textClass="text-pink-600"
         onClick={() => router.push('/dashboard/guests')}
       />
       <Card 
         label="Akan Hadir" value={stats.confirmed} sub="Confirmed" 
         icon={IconEnvelope} 
         colorClass="bg-emerald-50 text-emerald-600 border-emerald-100" 
         borderClass="border-emerald-100 hover:border-emerald-200" 
         textClass="text-emerald-600"
       />
       <Card 
         label="Belum Respon" value={stats.pending} sub="Menunggu" 
         icon={IconHourglass} 
         colorClass="bg-orange-50 text-orange-600 border-orange-100" 
         borderClass="border-orange-100 hover:border-orange-200" 
         textClass="text-orange-600"
       />
       <Card 
         label="Tidak Hadir" value={stats.declined} sub="Declined" 
         icon={IconCrossCircle} 
         colorClass="bg-red-50 text-red-600 border-red-100" 
         borderClass="border-red-100 hover:border-red-200" 
         textClass="text-red-600"
       />
    </div>
  );
}