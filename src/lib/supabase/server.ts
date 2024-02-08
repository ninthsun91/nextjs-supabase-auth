import { createServerClient, CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient(cookieStore: ReturnType<typeof cookies>) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.error('Failed to set cookie', error);
            // Can be ignored if user sessions are refreshed in middleware
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', maxAge: -1, ...options });
          } catch (error) {
            console.error('Failed to remove cookie', error);
            // Can be ignored if user sessions are refreshed in middleware
          }
        },
      },
    },
  );
}