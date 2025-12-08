import { createClient } from '@supabase/supabase-js';

// Ambil variable dari environment
const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// --- LOGIKA ANTI-CRASH (BULLETPROOF) ---
// Fungsi ini memastikan kita selalu punya URL & Key yang valid secara sintaks
// agar 'createClient' tidak melempar Error saat build time di Vercel.

const getSupabaseConfig = () => {
  let url = envUrl;
  let key = envKey;

  // 1. Cek apakah URL ada dan valid (harus https://)
  if (!url || !url.startsWith('http')) {
    console.warn('⚠️ Supabase URL not found or invalid. Using placeholder for build.');
    url = 'https://placeholder.supabase.co'; // URL Dummy yang valid secara format
  }

  // 2. Cek apakah Key ada
  if (!key || key.length < 10) {
    console.warn('⚠️ Supabase Key not found. Using placeholder for build.');
    key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder-signature'; // Dummy JWT format
  }

  return { url, key };
};

const config = getSupabaseConfig();

// 3. Buat Client dengan Try-Catch untuk keamanan ekstra
let client;
try {
  client = createClient(config.url, config.key);
} catch (error) {
  console.error('🔥 Critical Supabase Init Error:', error);
  // Fallback darurat jika createClient tetap gagal (sangat jarang)
  client = createClient('https://fallback.supabase.co', 'fallback-key'); 
}

export const supabase = client;