import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Cek agar tidak error saat build time jika env belum load
export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey
);