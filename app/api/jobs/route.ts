import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { calculateFitScore } from '@/lib/fit-score';

const MAANG = ['Google', 'Meta', 'Amazon', 'Apple', 'Netflix', 'Microsoft'];

// Strict company name matching — employer_name must contain one of these
const COMPANY_KEYWORDS: Record<string, string[]> = {
  Google:    ['google'],
  Meta:      ['meta', 'facebook', 'instagram', 'whatsapp'],
  Amazon:    ['amazon', 'aws'],
  Apple:     ['apple'],
  Netflix:   ['netflix'],
  Microsoft: ['microsoft'],
};

function isMANGCompany(employerName: string, allowedCompanies: string[]): string | null {
  const name = employerName.toLowerCase();
  for (const company of allowedCompanies) {
    const keywords = COMPANY_KEYWORDS[company] || [company.toLowerCase()];
    if (keywords.some((kw) => name.includes(kw))) return company;
  }
  return null;
}

async function fetchJSearchJobs(query: string): Promise<any[]> {
  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&num_pages=1&page=1&date_posted=month`;
  const res = await fetch(url, {
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
    next: { revalidate: 3600 }, // cache for 1 hour
  });
  const data = await res.json();
  return data.data || [];
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const companies = user.targetCompanies.length > 0 ? user.targetCompanies : MAANG;
  const roles = user.targetRoles.length > 0 ? user.targetRoles : ['Software Engineer'];

  // Fetch jobs for each target company in parallel
  const queries = companies.flatMap((company) =>
    roles.slice(0, 2).map((role) => `${role} at ${company}`)
  );

  const results = await Promise.all(queries.map(fetchJSearchJobs));
  const allJobs = results.flat();

  // Deduplicate by job_id
  const seen = new Set<string>();
  const uniqueJobs = allJobs.filter((job) => {
    if (seen.has(job.job_id)) return false;
    seen.add(job.job_id);
    return true;
  });

  // Get user's saved jobs
  const savedJobs = await prisma.savedJob.findMany({
    where: { userId: user.id },
    select: { jobId: true },
  });
  const savedJobIds = new Set(savedJobs.map((s) => s.jobId));

  // Map and score — strictly filter to target MAANG companies only
  const jobs = uniqueJobs
    .filter((job) => {
      if (!job.job_title || !job.employer_name) return false;
      return isMANGCompany(job.employer_name, companies) !== null;
    })
    .map((job) => {
      const matchedCompany = isMANGCompany(job.employer_name, companies) || job.employer_name;
      const fitScore = calculateFitScore(
        user.skills,
        user.yearsOfExperience ?? 0,
        user.targetRoles,
        job.job_title,
        job.job_description || '',
      );

      return {
        id: job.job_id,
        company: matchedCompany,
        role: job.job_title,
        location: [job.job_city, job.job_state, job.job_country].filter(Boolean).join(', '),
        locationType: job.job_is_remote ? 'Remote' : 'On-site',
        postedDate: job.job_posted_at_datetime_utc?.split('T')[0] || '',
        description: job.job_description?.slice(0, 300) || '',
        applyUrl: job.job_apply_link,
        salaryRange: job.job_min_salary && job.job_max_salary
          ? `$${(job.job_min_salary / 1000).toFixed(0)}k – $${(job.job_max_salary / 1000).toFixed(0)}k`
          : null,
        fitScore,
        isSaved: savedJobIds.has(job.job_id),
        logo: job.employer_logo,
        employmentType: job.job_employment_type,
      };
    })
    .sort((a, b) => b.fitScore - a.fitScore); // highest fit first

  return NextResponse.json({ jobs });
}
