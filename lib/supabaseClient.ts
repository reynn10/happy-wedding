import { createBrowserClient } from '@supabase/ssr';

// Ambil variable dari environment
const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// --- LOGIKA ANTI-CRASH (PENTING UNTUK BUILD) ---
// Jika URL tidak ditemukan atau tidak valid (misal saat build di Vercel),
// kita gunakan URL dummy agar aplikasi tidak langsung error/crash.
const supabaseUrl = envUrl && envUrl.startsWith('http') 
  ? envUrl 
  : 'https://placeholder.supabase.co'; 

const supabaseAnonKey = envKey && envKey.length > 0
  ? envKey 
  : 'placeholder-key';

// Membuat client untuk Browser (Client-side)
// Menggunakan createBrowserClient agar sesi otomatis disimpan di Cookies
export const supabase = createBrowserClient(
  supabaseUrl, 
  supabaseAnonKey
);