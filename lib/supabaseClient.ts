import { createClient } from '@supabase/supabase-js';

// Ambil variable dari environment
const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// LOGIKA ANTI-CRASH:
// Jika envUrl kosong (saat build time), pakai URL dummy yang valid secara format.
// Ini mencegah error "Invalid URL" yang mematikan proses build Vercel.
const supabaseUrl = envUrl && envUrl.startsWith('http') 
  ? envUrl 
  : 'https://placeholder.supabase.co'; // URL Dummy aman

const supabaseAnonKey = envKey || 'placeholder-key';

// Membuat client dengan URL yang pasti valid (asli atau dummy)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
