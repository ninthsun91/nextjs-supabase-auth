import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import ChatContainer from '@/component/chat/ChatContainer';
import DocContainer from '@/component/doc/DocContainer';

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return data.user ? <SignedHome user={data.user} /> : <UnSignedHome />;
}

const UnSignedHome = () => {
  return (
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

const SignedHome = ({ user }: { user: User }) => {
  return (
    <div className="border border-black">
      <div className="flex flex-row justify-center items-center space-x-2">
        <div id="profile" className="flex flex-col">
          <div>Name: {user.user_metadata.name || '-'}</div>
          <div>Email: {user.email || '-'}</div>
        </div>
        <form action="/auth/signout" method="post">
          <button className="border border-black button block" type="submit">
            Sign out
          </button>
        </form>
      </div>

      <main className="border border-black flex flex-row">
        <ChatContainer />
        <DocContainer />
      </main>
    </div>
  );
}