'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import AvatarLetter from './AvatarLetter';
import logo from '@/public/logo.svg';
import { useState, useEffect, useRef } from 'react';

export default function NavBar() {
  const { data: session } = useSession();
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside); // ✅ cleanup
  }, []);

  return (
    <header className="border-b-2 border-black/10 p-4 ">
      <nav className="flex items-center justify-between max-w-600 mx-auto w-full">
        <Link href={'/'}>
          <div className="flex items-end gap-2">
            <Image src={logo} alt="logo" width={32} height={32} />
            <p className="font-bold text-xl text-pink-500">Job Tracker</p>
          </div>
        </Link>
        <ul className="text-gray-500 font-bold flex gap-10 items-center">
          {session ? (
            <>
              <Link
                href={'/dashboard/add'}
                className="text-white bg-pink-500 p-1 px-4 rounded-md hover:bg-pink-200 hover:text-pink-500"
              >
                + Add job
              </Link>
              <Link href={'/dashboard'}>
                <div className="flex gap-4 items-center cursor-pointer hover:bg-pink-200/30 p-1 px-3 hover:rounded-md hover:text-pink-500">
                  <li>Dashboard</li>
                </div>
              </Link>
              <div className="relative" ref={menuRef}>
                {/* MENU */}
                {menu && (
                  <div className="bg-white py-3 px-5 absolute -bottom-29 -left-49.5 rounded-md shadow-[0px_0px_10px_0px] shadow-gray-400 w-fit">
                    <ul className="text-sm flex flex-col gap-4">
                      <li className="flex flex-col gap-2">
                        <span className="text-pink-500">
                          {session.user?.name}
                        </span>
                        <span className="text-xs">{session.user?.email}</span>
                      </li>
                      <div className="border-b-2 border-gray-400/30 -my-1"></div>
                      <li>
                        <button
                          onClick={() => {
                            signOut({ callbackUrl: '/' });
                          }}
                          className="cursor-pointer hover:text-pink-500"
                        >
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
                <button
                  className="cursor-pointer flex justify-center"
                  onClick={() => {
                    setMenu((pS) => !pS);
                  }}
                >
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
                </button>
              </div>

              {/*   <button
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                }}
                className="cursor-pointer"
              >
                Sign Out
              </button> */}
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
