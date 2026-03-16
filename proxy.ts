import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth.config';
import { NextResponse } from 'next/server';

// Use lightweight config (no Prisma) — safe for Edge runtime
const { auth } = NextAuth(authConfig);

const protectedRoutes = ['/dashboard', '/jobs', '/strategy', '/saved', '/profile', '/chat'];

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const isLoggedIn = !!session?.user;
  const isProtected = protectedRoutes.some((route) => nextUrl.pathname.startsWith(route));
  const isOnboarding = nextUrl.pathname.startsWith('/onboarding');

  if (!isLoggedIn && isProtected) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  if (isLoggedIn && isProtected && !session.user.hasCompletedOnboarding && !isOnboarding) {
    return NextResponse.redirect(new URL('/onboarding', nextUrl));
  }

  if (isLoggedIn && isOnboarding && session.user.hasCompletedOnboarding) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
