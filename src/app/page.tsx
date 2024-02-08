import Link from 'next/link';

export default function Home() {
  return (
    <button className="border border-black">
      <Link href="/login">Login</Link>
    </button>
  );
}
