'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function DemoLogin() {
  const [name, setName] = useState('');

  async function handleDemoLogin(e: React.FormEvent) {
    e.preventDefault();
    await signIn('credentials', {
      name,
      callbackUrl: '/dashboard',
    });
  }

  return (
    <form onSubmit={handleDemoLogin} className="flex flex-col gap-3">
      <p className="text-xs text-gray-400 text-center">
        Just exploring? Try a demo — no account needed
      </p>
      <input
        type="text"
        placeholder="Enter your name or nickname..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        minLength={2}
        required
        className="border border-gray-400/50 rounded-md p-3 text-sm outline-none focus:border-pink-400"
      />
      <button
        type="submit"
        className="border border-pink-500 text-pink-500 rounded-md p-3 cursor-pointer hover:bg-pink-50 font-bold text-sm"
      >
        Try Demo
      </button>
    </form>
  );
}
