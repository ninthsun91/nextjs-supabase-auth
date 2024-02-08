import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: new URL('/auth/callback', req.nextUrl).toString(),
    },
  });
  if (error) {
    console.log(error.name, error.message);
    return NextResponse.redirect(new URL('/error', req.nextUrl));
  }

  return NextResponse.redirect(data.url, { status: 302 });
}