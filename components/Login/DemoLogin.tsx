'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function DemoLogin() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleDemoLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await signIn('credentials', {
      name,
      callbackUrl: '/dashboard',
    });
    setLoading(false);
  }

  return (
    <form onSubmit={handleDemoLogin} className="flex flex-col gap-3">
      <p className="text-xs text-gray-400 text-center">
        Try demo account — no email/password needed
      </p>
      <input
        type="text"
        placeholder="Enter your name or nickname..."
        value={name}
        onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
        minLength={2}
        required
        disabled={loading}
        className="border border-gray-400/50 rounded-md p-3 text-sm outline-none focus:border-pink-400 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={loading}
        className="border border-pink-500 text-pink-500 rounded-md p-3 cursor-pointer hover:bg-pink-500 hover:text-white font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Logging in...' : 'Try Demo'}
      </button>
    </form>
  );
}
