'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const testimonials = [
  {
    id: 1,
    name: "Sarah & Dimas",
    role: "Menikah Desember 2024",
    text: "Awalnya bingung mau desain undangan dimana, untung nemu Happy Wedding. Sekali bayar, fiturnya lengkap banget!",
    avatar: "https://images.unsplash.com/photo-1623091411315-266390560623?w=100&q=60"
  },
  {
    id: 2,
    name: "Reza & Putri",
    role: "Menikah Februari 2025",
    text: "Proses pendaftarannya cepat. Dalam 10 menit undangan kami sudah jadi dan siap disebar. Recommended!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=60"
  },
  {
    id: 3,
    name: "Bella & Edward",
    role: "Menikah Maret 2025",
    text: "Fitur manajemen tamunya sangat membantu kami mengatur katering. Terima kasih Happy Wedding!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=60"
  }
];

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Buat Akun Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name, // Simpan nama di metadata user
          },
        },
      });

      if (error) {
        alert("Gagal daftar: " + error.message);
      } else {
        alert("Pendaftaran berhasil! Silakan login.");
        // Anda juga bisa otomatis login atau arahkan ke dashboard
        router.push('/login');
      }
    } catch (error) {
      alert("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  };

  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-pink-100 selection:text-pink-600">
      
      {/* --- KOLOM KIRI: VISUAL --- */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden bg-gray-900">
        <Image 
            src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070"
            alt="Wedding Rings"
            fill
            className="object-cover opacity-60"
            priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/30"></div>
        <div className="relative z-10 p-16 flex flex-col justify-between h-full w-full">
            <div className="text-white/80 font-serif tracking-widest text-sm uppercase">Happy Wedding Studio</div>
            <div className="space-y-8">
                <h2 className="text-5xl font-serif font-bold text-white leading-tight drop-shadow-lg">
                    "Mulailah perjalanan keabadian Anda di sini."
                </h2>
                <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl max-w-md shadow-2xl relative overflow-hidden min-h-[180px] flex flex-col justify-center">
                    <div key={activeData.id} className="animate-fade-in-up">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 relative shrink-0">
                                 <Image src={activeData.avatar} fill className="object-cover" alt="User"/>
                            </div>
                            <div>
                                <p className="text-white font-bold text-base">{activeData.name}</p>
                                <p className="text-pink-200 text-xs uppercase tracking-wider">{activeData.role}</p>
                            </div>
                        </div>
                        <p className="text-gray-200 text-sm italic leading-relaxed">"{activeData.text}"</p>
                        <div className="flex gap-1 mt-4">
                            {[1,2,3,4,5].map(i => (
                                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.26.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.55-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            ))}
                        </div>
                    </div>
                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 right-4 flex gap-1.5">
                        {testimonials.map((_, idx) => (
                            <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentTesti ? 'bg-white w-4' : 'bg-white/30'}`}></div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex gap-2 opacity-0"></div>
        </div>
      </div>

      {/* --- KOLOM KANAN: FORM REGISTER --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 bg-white relative">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors group">
            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-gray-900 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </div>
            <span className="text-sm font-medium">Beranda</span>
        </Link>

        <div className="max-w-[400px] w-full animate-fade-in-up">
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-serif">Buat Akun Baru</h1>
                <p className="text-gray-500">Daftar gratis dan mulai desain undanganmu.</p>
            </div>

            <button 
                onClick={handleGoogleLogin} 
                suppressHydrationWarning={true}
                className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all mb-8 shadow-xs"
            >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google"/>
                Daftar dengan Google
            </button>

            <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="px-3 bg-white text-gray-400">Atau daftar manual</span></div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1">
                    <label className="block text-sm font-semibold text-gray-700 ml-1">Nama Lengkap</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        suppressHydrationWarning={true}
                        required
                        className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-900 focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-500 outline-none transition-all placeholder:text-gray-400" 
                        placeholder="Nama Anda" 
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-semibold text-gray-700 ml-1">Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        suppressHydrationWarning={true}
                        required
                        className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-900 focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-500 outline-none transition-all placeholder:text-gray-400" 
                        placeholder="contoh@email.com" 
                    />
                </div>
                
                <div className="space-y-1">
                    <label className="block text-sm font-semibold text-gray-700 ml-1">Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        suppressHydrationWarning={true}
                        required
                        className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-900 focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-500 outline-none transition-all placeholder:text-gray-400" 
                        placeholder="Minimal 8 karakter" 
                    />
                </div>

                <div className="flex items-start gap-3 py-2">
                    <input 
                        type="checkbox" 
                        suppressHydrationWarning={true}
                        required 
                        className="mt-1 w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500 cursor-pointer" 
                    />
                    <p className="text-sm text-gray-500 leading-snug">
                        Saya menyetujui <a href="#" className="text-pink-600 font-bold hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="text-pink-600 font-bold hover:underline">Kebijakan Privasi</a>.
                    </p>
                </div>

                <button 
                    type="submit" 
                    disabled={loading} 
                    suppressHydrationWarning={true}
                    className="w-full bg-pink-600 text-white font-bold py-4 rounded-xl hover:bg-pink-700 active:scale-95 transition-all shadow-[0_10px_20px_-10px_rgba(219,39,119,0.5)] mt-2 disabled:opacity-70"
                >
                    {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
                </button>
            </form>

            <p className="mt-8 text-center text-gray-500 text-sm">
                Sudah punya akun? <Link href="/login" className="text-pink-600 font-bold hover:text-pink-700 transition-colors">Masuk di sini</Link>
            </p>

        </div>
      </div>

    </div>
  );
}