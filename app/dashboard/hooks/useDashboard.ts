'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export const useDashboard = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState("");
  
  const [data, setData] = useState({
    userName: "Pengantin",
    activeProject: {
      title: "Wedding Invitation",
      date: "Belum disetting",
      location: "-",
      status: "Draft",
      image: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800"
    },
    stats: { totalGuests: 0, confirmed: 0, pending: 0, declined: 0 },
    recentGuests: [] as any[]
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Selamat Pagi");
    else if (hour < 15) setGreeting("Selamat Siang");
    else if (hour < 18) setGreeting("Selamat Sore");
    else setGreeting("Selamat Malam");

    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setIsLoading(false); return; }

        const { data: invData } = await supabase.from('invitations').select('*').eq('user_id', user.id).single();
        const { data: guestData } = await supabase.from('guests').select('*').eq('user_id', user.id).order('id', { ascending: false });

        const guests = guestData || [];
        
        setData({
          userName: invData ? invData.groom_name.split(' ')[0] : user.user_metadata?.full_name || "Pengantin",
          activeProject: {
            title: invData ? `${invData.groom_name} & ${invData.bride_name}` : "Buat Undangan Baru",
            date: invData?.event_date || "Tanggal belum diatur",
            location: invData?.venue_name || "Lokasi belum diatur",
            status: invData ? "80% Siap" : "Draft",
            image: invData?.cover_photo || "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800"
          },
          stats: {
            totalGuests: guests.length,
            confirmed: guests.filter(g => g.status === 'Hadir').length,
            pending: guests.filter(g => g.status === 'Pending').length,
            declined: guests.filter(g => g.status === 'Tidak Hadir').length
          },
          recentGuests: guests.slice(0, 3)
        });

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { data, isLoading, greeting, router };
};