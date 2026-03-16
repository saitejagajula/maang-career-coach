import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ user });
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  const allowed = [
    'name', 'title', 'location', 'yearsOfExperience',
    'skills', 'targetCompanies', 'targetRoles',
    'resumeSummary', 'linkedinUrl', 'githubUrl',
  ];

  const data = Object.fromEntries(
    Object.entries(body).filter(([key]) => allowed.includes(key))
  );

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data,
  });

  return NextResponse.json({ user });
}
