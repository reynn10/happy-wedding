'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Menu Items
  const menus = [
    { name: 'Overview', href: '/dashboard', icon: (active: boolean) => <svg className={`w-5 h-5 ${active ? 'text-pink-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
    { name: 'My Invitation', href: '/dashboard/invitation', icon: (active: boolean) => <svg className={`w-5 h-5 ${active ? 'text-pink-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { name: 'Guest Book', href: '/dashboard/guests', icon: (active: boolean) => <svg className={`w-5 h-5 ${active ? 'text-pink-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
    { name: 'Gifts & Angpao', href: '/dashboard/gifts', icon: (active: boolean) => <svg className={`w-5 h-5 ${active ? 'text-pink-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex font-sans text-gray-800">
      
      {/* --- SIDEBAR (30% Element - White) --- */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 bg-white border-r border-gray-100 w-64 shadow-sm flex flex-col justify-between`}>
        
        <div>
            {/* Logo Area */}
            <div className="h-20 flex items-center px-8 border-b border-gray-50">
                <span className="text-xl font-bold font-serif text-gray-900 tracking-tight">
                    Happy<span className="text-pink-600">.</span>
                </span>
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

        {/* User Profile (Bottom) */}
        <div className="p-4 border-t border-gray-50">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 cursor-pointer transition">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                    <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" width={40} height={40} alt="User" className="object-cover"/>
                </div>
                <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">Romeo Putra</p>
                    <p className="text-xs text-gray-400">Free Plan</p>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </div>
        </div>

      </aside>

      {/* --- MAIN CONTENT AREA (60% Element - Stone-50) --- */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header Toggle */}
        <div className="lg:hidden h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
            <span className="font-serif font-bold text-lg">Happy Wedding</span>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
        </div>

        {/* Content Injection */}
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            {children}
        </div>
      </div>

    </div>
  );
}