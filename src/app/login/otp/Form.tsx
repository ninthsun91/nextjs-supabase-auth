'use client';

import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

export default function Form() {
  const [email, setEmail] = useState<string>('');
  const [verify, setVerify] = useState<boolean>(false);

  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input className="border border-black" id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={verify} required />
      
      {verify && (
        <div>
          <label htmlFor="otp">OTP:</label>
          <input className="border border-black" id="otp" name="otp" type="number" required />
        </div>
      )}
      
      {verify ? (
        <VerifyButton email={email} />
      ) : (
        <LoginButton setVerify={setVerify} />
      )}
    </form>
  )
}

function LoginButton({ setVerify }: { setVerify: (value: boolean) => void}) {
  const loginHandler = async (formData: FormData) => {
    const supabase = createClient();

    const email = formData.get('email');
    if (!email || typeof email !== 'string') {
      alert('Email is required');
      return;
    }
    console.log('email:', email);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      }
    });
    if (error) {
      alert(error.message);
      return;
    }

    setVerify(true);
  }
  return <button className="border border-black" formAction={loginHandler}>Log in</button>;
}

function VerifyButton({ email }: { email: string }) {
  const verifyHandler = async (formData: FormData) => {
    const supabase = createClient();

    const token = formData.get('otp');
    if (!token || typeof token !== 'string') {
      alert('OTP is required');
      return;
    }
    console.log('verify:', email, token);

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    if (error) {
      alert(error.message);
      return;
    }

    console.log('user: ', data);
  }

  return <button className="border border-black" formAction={verifyHandler}>Verify</button>;
}