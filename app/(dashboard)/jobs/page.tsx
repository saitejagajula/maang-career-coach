'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Bookmark,
  BookmarkCheck,
  Briefcase,
  ExternalLink,
  Loader2,
  MapPin,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

type Job = {
  id: string;
  company: string;
  role: string;
  location: string;
  locationType: string;
  postedDate: string;
  description: string;
  applyUrl: string;
  salaryRange: string | null;
  fitScore: number;
  isSaved: boolean;
  logo: string | null;
  employmentType: string;
};

const COMPANIES = ['All', 'Google', 'Meta', 'Amazon', 'Apple', 'Netflix', 'Microsoft'];
const LOCATION_TYPES = ['All', 'Remote', 'On-site'];

function getFitBadgeClass(score: number) {
  if (score >= 80) return 'bg-green-100 text-green-700 border-green-200';
  if (score >= 60) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  return 'bg-orange-100 text-orange-700 border-orange-200';
}

function JobCard({ job, onToggleSave }: { job: Job; onToggleSave: (job: Job) => void }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden">
              {job.logo ? (
                <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain" />
              ) : (
                <span className="text-lg font-bold text-slate-600">{job.company[0]}</span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm leading-tight">{job.role}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{job.company}</p>
            </div>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border shrink-0 ${getFitBadgeClass(job.fitScore)}`}>
            {job.fitScore}% fit
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-3">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-500 truncate">{job.location || 'Location not specified'}</span>
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${
            job.locationType === 'Remote'
              ? 'bg-green-50 text-green-700 border-green-100'
              : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}>
            {job.locationType}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 mb-4 line-clamp-2">{job.description}</p>

        {/* Salary */}
        {job.salaryRange && (
          <p className="text-xs text-slate-600 mb-3 font-medium">{job.salaryRange}/yr</p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button size="sm" className="w-full gap-1.5 text-xs h-8">
              Apply
              <ExternalLink className="w-3 h-3" />
            </Button>
          </a>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 shrink-0"
            onClick={() => onToggleSave(job)}
            title={job.isSaved ? 'Unsave' : 'Save'}
          >
            {job.isSaved ? (
              <BookmarkCheck className="w-4 h-4 text-violet-600" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [companyFilter, setCompanyFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');

  useEffect(() => {
    fetch('/api/jobs')
      .then((r) => r.json())
      .then((data) => setJobs(data.jobs || []))
      .finally(() => setLoading(false));
  }, []);

  const toggleSave = async (job: Job) => {
    // Optimistic update
    setJobs((prev) =>
      prev.map((j) => (j.id === job.id ? { ...j, isSaved: !j.isSaved } : j))
    );

    await fetch('/api/jobs/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobId: job.id,
        jobTitle: job.role,
        company: job.company,
        location: job.location,
        applyUrl: job.applyUrl,
      }),
    });
  };

  const filtered = jobs.filter((job) => {
    const matchSearch =
      !search ||
      job.role.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchCompany = companyFilter === 'All' || job.company === companyFilter;
    const matchLocation = locationFilter === 'All' || job.locationType === locationFilter;
    return matchSearch && matchCompany && matchLocation;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Briefcase className="w-6 h-6" />
          Jobs Board
        </h1>
        <p className="text-slate-500 mt-1">
          {loading ? 'Fetching personalized jobs...' : `${filtered.length} openings matched to your profile`}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl ring-1 ring-slate-200 p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-700">Filters</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search roles or companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {COMPANIES.map((c) => (
              <button
                key={c}
                onClick={() => setCompanyFilter(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  companyFilter === c
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500">Location:</span>
            {LOCATION_TYPES.map((lt) => (
              <button
                key={lt}
                onClick={() => setLocationFilter(lt)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  locationFilter === lt
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Job Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          <p className="text-slate-500 text-sm">Finding jobs matched to your profile...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} onToggleSave={toggleSave} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No jobs match your filters</p>
          <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
