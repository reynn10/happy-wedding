'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Deteksi scroll untuk efek glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Fitur', href: '/#fitur' },
    { name: 'Tema', href: '/#tema' },
    { name: 'Harga', href: '/#harga' },
    // { name: 'FAQ', href: '/faq' }, // Opsional
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b
          ${isScrolled 
            ? 'bg-white/80 backdrop-blur-md border-stone-200/50 py-3 shadow-sm' 
            : 'bg-transparent border-transparent py-5'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* 1. LOGO */}
          <Link href="/" className="relative z-50 group">
             <span className={`font-serif text-2xl font-bold tracking-tight transition-colors duration-300 
                ${isMobileMenuOpen ? 'text-gray-900' : (isScrolled || pathname !== '/') ? 'text-gray-900' : 'text-white md:text-gray-900'}
             `}>
               Happy<span className="text-pink-600">.</span>
             </span>
          </Link>

          {/* 2. DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-pink-600
                  ${(isScrolled || pathname !== '/') ? 'text-gray-600' : 'text-white/90 hover:text-white'}
                `}
              >
                {link.name}
              </Link>
            ))}
            
            {/* CTA Button */}
            <Link href="/login">
                <button className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:-translate-y-0.5
                    ${(isScrolled || pathname !== '/') 
                        ? 'bg-gray-900 text-white hover:bg-pink-600' 
                        : 'bg-white text-gray-900 hover:bg-pink-50'
                    }
                `}>
                    Login
                </button>
            </Link>
          </div>

          {/* 3. MOBILE HAMBURGER BUTTON */}
          <button 
            className="md:hidden relative z-50 p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className={`w-6 h-0.5 rounded-full transition-all duration-300 mb-1.5 
                ${isMobileMenuOpen ? 'rotate-45 translate-y-2 bg-gray-900' : (isScrolled || pathname !== '/') ? 'bg-gray-900' : 'bg-white'}
            `}></div>
            <div className={`w-6 h-0.5 rounded-full transition-all duration-300 mb-1.5 
                ${isMobileMenuOpen ? 'opacity-0' : (isScrolled || pathname !== '/') ? 'bg-gray-900' : 'bg-white'}
            `}></div>
            <div className={`w-6 h-0.5 rounded-full transition-all duration-300 
                ${isMobileMenuOpen ? '-rotate-45 -translate-y-2 bg-gray-900' : (isScrolled || pathname !== '/') ? 'bg-gray-900' : 'bg-white'}
            `}></div>
          </button>

        </div>
      </nav>

      {/* 4. MOBILE MENU OVERLAY (FULLSCREEN) */}
      <div className={`fixed inset-0 z-40 bg-stone-50/95 backdrop-blur-xl transition-transform duration-500 ease-in-out md:hidden flex flex-col justify-center items-center gap-8
          ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
      `}>
          {navLinks.map((link) => (
            <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif font-bold text-gray-800 hover:text-pink-600 transition-colors"
            >
                {link.name}
            </Link>
          ))}
          
          <div className="w-12 h-px bg-gray-200"></div>

          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="px-10 py-4 bg-gray-900 text-white rounded-full font-bold text-sm tracking-widest uppercase shadow-xl hover:bg-pink-600 transition-all">
                  Masuk / Daftar
              </button>
          </Link>
      </div>
    </>
  );
}