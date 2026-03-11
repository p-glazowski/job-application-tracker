'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import AvatarLetter from './AvatarLetter';

export default function NavBar() {
  const { data: session } = useSession();
  return (
    <header className="border-b-2 border-black/10 p-4 ">
      <nav className="flex items-center justify-between max-w-600 mx-auto w-full">
        <Link href={'/'}>
          <div className="font-bold text-xl text-pink-600">Job Tracker</div>
        </Link>
        <ul className="text-gray-500 font-bold flex gap-10 items-center">
          {session ? (
            <>
              <Link
                href={'/dashboard/add'}
                className="text-white bg-pink-500 p-1 px-4 rounded-md"
              >
                + Add job
              </Link>
              <Link href={'/dashboard'}>
                <div className="flex gap-4 items-center">
                  {session.user?.image ? (
                    <Image
                      src={session?.user?.image}
                      alt={`${session?.user?.name} avatar`}
                      width={32}
                      height={32}
                      className="rounded-[50%]"
                    />
                  ) : (
                    <AvatarLetter>{session.user?.name ?? 'U'}</AvatarLetter>
                  )}
                  <li>Dashboard</li>
                </div>
              </Link>

              <button
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                }}
                className="cursor-pointer"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link href={'/login'}>
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
}
