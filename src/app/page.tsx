import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <button className="border border-black p-1">
        <Link href="/login/password">Email & Password</Link>
      </button>
      <button className="border border-black p-1">
        <Link href="/login">Email OTP Login</Link>
      </button>
    </div>
  );
}
