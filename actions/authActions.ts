'use server';

import { signIn } from '@/auth';

export async function logIn(provider: 'github' | 'google') {
  await signIn(provider, { redirectTo: '/dashboard' });
}
