import type { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

// Lightweight auth config — no Prisma, safe for Edge middleware
export const authConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize() {
        // Full authorize logic is in lib/auth.ts
        // This stub is here just to satisfy Edge middleware
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-expect-error custom field
        token.hasCompletedOnboarding = user.hasCompletedOnboarding ?? false;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.hasCompletedOnboarding = (token.hasCompletedOnboarding as boolean) ?? false;
      }
      return session;
    },
  },
  pages: { signIn: '/login' },
};
