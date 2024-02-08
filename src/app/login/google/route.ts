import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  console.log('/login/google GET');
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) {
    console.log(error.name, error.message);
    return NextResponse.redirect(new URL('/error', req.nextUrl));
  }

  return NextResponse.redirect(data.url, { status: 302 });
}