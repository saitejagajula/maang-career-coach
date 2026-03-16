import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { authConfig } from '@/lib/auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
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
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Use $queryRaw to access password field (Prisma 7 type workaround)
        const users = await prisma.$queryRaw<Array<{
          id: string; name: string | null; email: string | null;
          image: string | null; password: string | null;
          hasCompletedOnboarding: boolean;
        }>>`
          SELECT id, name, email, image, password, "hasCompletedOnboarding"
          FROM "User" WHERE email = ${credentials.email as string} LIMIT 1
        `;

        const user = users[0];
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!isValid) return null;

        return {
          id:                     user.id,
          name:                   user.name,
          email:                  user.email,
          image:                  user.image,
          hasCompletedOnboarding: user.hasCompletedOnboarding,
        };
      },
    }),
  ],
});
