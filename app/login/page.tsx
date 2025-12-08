'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

// --- DATA TESTIMONI ---
const testimonials = [
  {
    id: 1,
    name: "Sarah & Dimas",
    role: "Menikah Desember 2024",
    text: "Sangat terbantu dengan fitur RSVP-nya. Kami jadi tahu pasti jumlah tamu yang datang. Desainnya juga aesthetic banget!",
    avatar: "https://images.unsplash.com/photo-1623091411315-266390560623?w=100&q=60" 
  },
  {
    id: 2,
    name: "Reza & Putri",
    role: "Menikah Februari 2025",
    text: "Fitur kirim WhatsApp-nya juara! Hemat waktu banget, nggak perlu ngetik satu-satu. Worth every penny.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=60" 
  },
  {
    id: 3,
    name: "Bella & Edward",
    role: "Menikah Maret 2025",
    text: "Suka banget sama tema 'Classic Elegant'. Simpel tapi mewah. Tamu-tamu kami banyak yang nanya bikin di mana.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=60" 
  }
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTesti, setCurrentTesti] = useState(0);

  // Auto-rotate testimonial
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTesti((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeData = testimonials[currentTesti];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("Login gagal: " + error.message);
      } else {
        // alert("Login berhasil! Mengarahkan ke dashboard..."); // Opsional
        router.push('/dashboard');
      }
    } catch (error) {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) alert(error.message);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-pink-100 selection:text-pink-600">
      
      {/* --- KOLOM KIRI: VISUAL EXPERIENCE (Desktop Only) --- */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden bg-gray-900">
        
        {/* Background Image */}
        <Image 
            src="https://images.unsplash.com/photo-1519225468359-2996bc01c37c?q=80&w=2070"
            alt="Wedding Background"
            fill
            className="object-cover opacity-60"
            priority
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/30"></div>
        
        {/* Content over Image */}
        <div className="relative z-10 p-16 flex flex-col justify-between h-full w-full">
            
            {/* Logo */}
            <div className="text-white/80 font-serif tracking-widest text-sm uppercase">Happy Wedding Studio</div>

            <div className="space-y-8">
                <h2 className="text-5xl font-serif font-bold text-white leading-tight drop-shadow-lg">
                    "Pernikahan impian dimulai dari cerita yang indah."
                </h2>
                
                {/* --- TESTIMONIAL CARD (ROTATING) --- */}
                <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl max-w-md shadow-2xl relative overflow-hidden min-h-[180px] flex flex-col justify-center">
                    
                    <div key={activeData.id} className="animate-fade-in-up">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 relative shrink-0">
                                 <Image 
                                    src={activeData.avatar} 
                                    fill 
                                    className="object-cover" 
                                    alt="User"
                                 />
                            </div>
                            <div>
                                <p className="text-white font-bold text-base">{activeData.name}</p>
                                <p className="text-pink-200 text-xs uppercase tracking-wider">{activeData.role}</p>
                            </div>
                        </div>
                        <p className="text-gray-200 text-sm italic leading-relaxed">
                            "{activeData.text}"
                        </p>
                        <div className="flex gap-1 mt-4">
                            {[1,2,3,4,5].map(i => (
                                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.26.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.55-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            ))}
                        </div>
                    </div>

                    {/* Progress Indicator (Dots) */}
                    <div className="absolute bottom-4 right-4 flex gap-1.5">
                        {testimonials.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentTesti ? 'bg-white w-4' : 'bg-white/30'}`}
                            ></div>
                        ))}
                    </div>

                </div>
            </div>

            <div className="flex gap-2 opacity-0"></div>
        </div>
      </div>

      {/* --- KOLOM KANAN: FORM LOGIN --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 bg-white relative">
        
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors group">
            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-gray-900 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </div>
            <span className="text-sm font-medium">Beranda</span>
        </Link>

        <div className="max-w-[400px] w-full animate-fade-in-up">
            
            <div className="text-center mb-10">
                <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-serif">Selamat Datang</h1>
                <p className="text-gray-500">Masuk untuk melanjutkan desain undangan Anda.</p>
            </div>

            <button 
                onClick={handleGoogleLogin} 
                suppressHydrationWarning={true} // FIX ERROR
                className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all mb-8 shadow-xs"
            >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google"/>
                Masuk dengan Google
            </button>

            <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="px-3 bg-white text-gray-400">Atau login manual</span></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1">
                    <label className="block text-sm font-semibold text-gray-700 ml-1">Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        suppressHydrationWarning={true} // FIX ERROR
                        required
                        className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-900 focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-500 outline-none transition-all placeholder:text-gray-400" 
                        placeholder="contoh@email.com" 
                    />
                </div>
                
                <div className="space-y-1">
                    <div className="flex justify-between items-center ml-1">
                        <label className="block text-sm font-semibold text-gray-700">Password</label>
                        <a href="#" className="text-sm text-pink-600 hover:text-pink-700 font-medium hover:underline">Lupa?</a>
                    </div>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        suppressHydrationWarning={true} // FIX ERROR
                        required
                        className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-900 focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-500 outline-none transition-all placeholder:text-gray-400" 
                        placeholder="••••••••" 
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    suppressHydrationWarning={true} // FIX ERROR
                    className="w-full bg-pink-600 text-white font-bold py-4 rounded-xl hover:bg-pink-700 active:scale-95 transition-all shadow-[0_10px_20px_-10px_rgba(219,39,119,0.5)] mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? 'Memproses...' : 'Masuk Sekarang'}
                </button>
            </form>

            <p className="mt-10 text-center text-gray-500 text-sm">
                Belum punya akun? <Link href="/register" className="text-pink-600 font-bold hover:text-pink-700 transition-colors">Buat Akun Baru</Link>
            </p>

        </div>
      </div>

    </div>
  );
}