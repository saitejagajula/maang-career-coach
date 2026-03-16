'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  MapPin,
  Trash2,
} from 'lucide-react';
import { mockJobs } from '@/lib/mock-data';
import type { Job } from '@/types';

function getFitBadgeClass(score: number) {
  if (score >= 80) return 'bg-green-100 text-green-700 border-green-200';
  if (score >= 60) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  return 'bg-orange-100 text-orange-700 border-orange-200';
}

export default function SavedPage() {
  const [savedJobs, setSavedJobs] = useState<Job[]>(mockJobs.filter((j) => j.isSaved));

  const removeSaved = (id: string) => {
    setSavedJobs((prev) => prev.filter((j) => j.id !== id));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <BookmarkCheck className="w-6 h-6 text-violet-600" />
          Saved Jobs
        </h1>
        <p className="text-slate-500 mt-1">
          {savedJobs.length} saved{savedJobs.length !== 1 ? ' jobs' : ' job'}
        </p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="text-center py-20">
          <Bookmark className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">No saved jobs yet</h3>
          <p className="text-sm text-slate-400 mb-6">
            Browse the jobs board and save roles you're interested in.
          </p>
          <a href="/jobs">
            <Button>Browse Jobs</Button>
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {savedJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="pt-4">
                <div className="flex items-start gap-4">
                  {/* Company logo */}
                  <div className="w-12 h-12 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 text-lg font-bold text-slate-600">
                    {job.company[0]}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-900">{job.role}</h3>
                          {job.isNew && (
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 mt-0.5">
                          {job.company} · {job.level}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border shrink-0 ${getFitBadgeClass(job.fitScore)}`}
                      >
                        {job.fitScore}% fit
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs text-slate-500">{job.location}</span>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                          job.locationType === 'Remote'
                            ? 'bg-green-50 text-green-700 border-green-100'
                            : job.locationType === 'Hybrid'
                            ? 'bg-blue-50 text-blue-700 border-blue-100'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {job.locationType}
                      </span>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {job.requiredSkills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {job.salaryRange && (
                      <p className="text-xs text-slate-500 mt-2 font-medium">{job.salaryRange}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 shrink-0">
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="w-full gap-1.5 text-xs h-8">
                        Apply
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </a>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1.5 text-xs text-red-600 hover:text-red-700 hover:border-red-200 hover:bg-red-50"
                      onClick={() => removeSaved(job.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
