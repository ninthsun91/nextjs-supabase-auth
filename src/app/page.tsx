import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  console.log('user: ', data.user);

  return data.user ? (
    <div className="flex flex-col items-center space-y-2">
      <form action="/auth/signout" method="post">
        <button className="border border-black button block" type="submit">
          Sign out
        </button>
      </form>
    </div>
  ) : (
    <div className="flex flex-col items-center space-y-2">
      <button className="border border-black p-1">
        <Link href="/login/password">Email & Password</Link>
      </button>
      <button className="border border-black p-1">
        <Link href="/login/otp">Email OTP Login</Link>
      </button>
      <form action="/login/google" method="get">
        <button className="border border-black p-1" type="submit">
          Google OAuth2
        </button>
      </form>
    </div>
  );
}
