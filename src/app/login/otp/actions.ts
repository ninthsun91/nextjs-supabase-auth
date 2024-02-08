import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email: formData.get('email') as string,
    options: {
      shouldCreateUser: false
    }
  });

  if (error) {
    console.log(error.name, error.message);
    redirect('/error');
  }

  redirect('/login/otp/verify');
}