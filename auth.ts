import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' }, // ✅ force JWT for all providers
  providers: [
    GitHub,
    Google,
    Credentials({
      name: 'Demo Account',
      credentials: {
        name: { label: 'Name', type: 'text', placeholder: 'Your name...' },
      },
      async authorize(credentials) {
        const name = credentials?.name as string;
        if (!name || name.trim().length < 2) return null;

        const user = await prisma.user.upsert({
          where: {
            email: `demo_${name.toLowerCase().replace(/\s+/g, '_')}@demo.com`,
          },
          update: {},
          create: {
            name: name,
            email: `demo_${name.toLowerCase().replace(/\s+/g, '_')}@demo.com`,
          },
        });

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id; // ✅ store on sign in
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string; // ✅ expose to session
      return session;
    },
  },
});
