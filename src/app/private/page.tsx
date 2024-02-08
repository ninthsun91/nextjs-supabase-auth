import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/');
  }

  return <p>Welcome, {data.user.email}</p>;
}