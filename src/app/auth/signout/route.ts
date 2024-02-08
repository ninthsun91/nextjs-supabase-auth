import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = createClient();

  // Check if session exists
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!!session) {
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL('/', req.url), {
    status: 302,
  });
}