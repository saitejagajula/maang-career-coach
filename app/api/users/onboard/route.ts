import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const SCRAPER_URL = process.env.SCRAPER_URL || 'http://localhost:8001';

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { targetCompanies, targetRoles, yearsOfExperience, skills } = await req.json();

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      targetCompanies,
      targetRoles,
      yearsOfExperience,
      skills,
      hasCompletedOnboarding: true,
    },
  });

  // Trigger instant scrape for this new user — fire and forget
  // Jobs will be ready in ~2-3 mins without waiting for midnight
  fetch(`${SCRAPER_URL}/scrape/new-user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: user.id }),
  }).catch(() => {
    // Scraper service may not be running — fail silently
    console.log('Scraper service unavailable — jobs will load from JSearch fallback');
  });

  return NextResponse.json({ user });
}
