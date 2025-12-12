'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // --- CEK LOGIN & AMBIL USER ---
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.replace('/login');
      } else {
        setUser(session.user);
        setLoading(false);
      }

      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          router.replace('/login');
          setUser(null);
        } else if (session) {
          setUser(session.user);
          setLoading(false);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const menus = [
    { name: 'Overview', href: '/dashboard', icon: (active: boolean) => <svg className={`w-5 h-5 ${active ? 'text-pink-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
    { name: 'My Invitation', href: '/dashboard/invitation', icon: (active: boolean) => <svg className={`w-5 h-5 ${active ? 'text-pink-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { name: 'Guest Book', href: '/dashboard/guests', icon: (active: boolean) => <svg className={`w-5 h-5 ${active ? 'text-pink-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
    { name: 'Gifts & Angpao', href: '/dashboard/gifts', icon: (active: boolean) => <svg className={`w-5 h-5 ${active ? 'text-pink-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  ];

  // FIX: Tambahkan suppressHydrationWarning pada loading state
  if (loading) return (
    <div 
      className="min-h-screen flex items-center justify-center bg-stone-50 text-gray-400"
      suppressHydrationWarning={true}
    >
      Memuat Dashboard...
    </div>
  );

  return (
    // FIX: Tambahkan suppressHydrationWarning pada main wrapper
    <div 
      className="min-h-screen bg-stone-50 flex font-sans text-gray-800 overflow-x-hidden"
      suppressHydrationWarning={true}
    >
      
      {/* --- OVERLAY BACKDROP --- */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 bg-white border-r border-gray-100 w-64 shadow-xl lg:shadow-sm flex flex-col justify-between`}
      >
        
        <div>
            {/* Logo Area */}
            <div className="h-20 flex items-center justify-between px-8 border-b border-gray-50">
                <Link href="/" className="text-xl font-bold font-serif text-gray-900 tracking-tight">
                    Happy<span className="text-pink-600">.</span>
                </Link>
                {/* Tombol Close Mobile */}
                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            {/* Menu List */}
            <nav className="p-4 space-y-2 mt-4">
                <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Main Menu</p>
                {menus.map((menu) => {
                    const isActive = pathname === menu.href;
                    return (
                        <Link 
                            key={menu.name} 
                            href={menu.href}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                                ${isActive 
                                    ? 'bg-pink-50 text-pink-700' 
                                    : 'text-gray-500 hover:bg-stone-50 hover:text-gray-900'
                                }
                            `}
                        >
                            {menu.icon(isActive)}
                            {menu.name}
                        </Link>
                    );
                })}
            </nav>
        </div>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-50">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 relative bg-gray-200 shrink-0">
                     {user?.user_metadata?.avatar_url ? (
                        <Image src={user.user_metadata.avatar_url} fill alt="User" className="object-cover"/>
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                     )}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                        {user?.user_metadata?.full_name || "Pengantin Baru"}
                    </p>
                    <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
                </div>
            </div>

            <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-xs font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Keluar
            </button>
        </div>

      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 lg:ml-64 min-w-0 overflow-x-hidden">
        {/* Mobile Header Toggle */}
        <div className="lg:hidden h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
            <span className="font-serif font-bold text-lg">Happy Wedding</span>
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="text-gray-500 p-2 hover:bg-gray-100 rounded-lg transition"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
        </div>

        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            {children}
        </div>
      </div>

    </div>
  );
}