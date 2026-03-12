'use client';

import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

interface Props {
  children: ReactNode;
}

export default function SubmitButton({ children }: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="p-2 px-3 rounded-md bg-pink-500 text-white font-bold cursor-pointer hover:bg-pink-700"
    >
      {pending ? 'Adding...' : children}
    </button>
  );
}
