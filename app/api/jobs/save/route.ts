import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { jobId, jobTitle, company, location, applyUrl } = await req.json();

  const existing = await prisma.savedJob.findUnique({
    where: { userId_jobId: { userId: session.user.id, jobId } },
  });

  if (existing) {
    // Unsave
    await prisma.savedJob.delete({
      where: { userId_jobId: { userId: session.user.id, jobId } },
    });
    return NextResponse.json({ saved: false });
  } else {
    // Save
    await prisma.savedJob.create({
      data: { userId: session.user.id, jobId, jobTitle, company, location, applyUrl },
    });
    return NextResponse.json({ saved: true });
  }
}
