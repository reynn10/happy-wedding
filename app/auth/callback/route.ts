import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  
  // Jika ada parameter 'next', gunakan sebagai tujuan redirect
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    
    // Tukar auth code dengan session
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // BERHASIL: Redirect ke dashboard
      return NextResponse.redirect(`${origin}${next}`);
    } else {
      // GAGAL: Log error ke terminal VS Code untuk debugging
      console.error("🔥 Login Callback Error:", error.message);
    }
  } else {
    console.error("🔥 No code found in URL");
  }

  // Jika gagal, kembalikan ke login
  return NextResponse.redirect(`${origin}/login?error=auth`);
}