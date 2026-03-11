'use client';

import { logIn } from '@/actions/authActions';
import Image from 'next/image';

interface Props {
  image: string;
  provider: 'Github' | 'Google';
}

export default function LoginButton({ image, provider }: Props) {
  const authProvider = provider === 'Github' ? 'github' : 'google';
  return (
    <button
      className="flex gap-4 items-center border border-gray-400/50 rounded-md p-3 px-20 cursor-pointer"
      onClick={() => {
        logIn(authProvider);
      }}
    >
      <Image src={image} alt="google icon" width={32} height={32} />
      <h2 className="text-gray-500 font-bold">Continue with {provider}</h2>
    </button>
  );
}
