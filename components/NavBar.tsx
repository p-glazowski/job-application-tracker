import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="border-b-2 border-black/10 p-4">
      <nav className="mx-auto flex items-center justify-between">
        <Link href={'/'}>
          <div className="font-bold text-xl text-pink-600">Job Tracker</div>
        </Link>
        <ul className="text-gray-500 font-bold">
          <Link href={'/login'}>
            <li>Sign In</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
