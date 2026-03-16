import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/jobs', '/strategy', '/saved', '/profile', '/chat'];

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const isLoggedIn = !!session?.user;
  const isProtected = protectedRoutes.some((route) => nextUrl.pathname.startsWith(route));
  const isOnboarding = nextUrl.pathname.startsWith('/onboarding');

  // Not logged in → redirect to login
  if (!isLoggedIn && isProtected) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  // Logged in but onboarding not done → redirect to onboarding
  if (isLoggedIn && isProtected && !session.user.hasCompletedOnboarding && !isOnboarding) {
    return NextResponse.redirect(new URL('/onboarding', nextUrl));
  }

  // Logged in + onboarding done, trying to access onboarding again → redirect to dashboard
  if (isLoggedIn && isOnboarding && session.user.hasCompletedOnboarding) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
