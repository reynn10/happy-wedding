import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Membuat satu instance koneksi untuk dipakai di seluruh aplikasi
export const supabase = createClient(supabaseUrl, supabaseAnonKey);