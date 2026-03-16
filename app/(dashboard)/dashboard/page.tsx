import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CalendarClock,
  MessageSquare,
  Sparkles,
  TrendingUp,
  User,
} from 'lucide-react';
import { mockUser, mockJobs } from '@/lib/mock-data';

const statsCards = [
  {
    title: 'Profile Completeness',
    value: `${mockUser.profileCompleteness}%`,
    icon: User,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    showProgress: true,
  },
  {
    title: 'Jobs Applied',
    value: '3',
    icon: Briefcase,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    showProgress: false,
  },
  {
    title: 'Upcoming Interviews',
    value: '2',
    icon: CalendarClock,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    showProgress: false,
  },
  {
    title: 'AI Sessions',
    value: '12',
    icon: MessageSquare,
    color: 'text-green-600',
    bg: 'bg-green-50',
    showProgress: false,
  },
];

const quickActions = [
  { label: 'Browse Jobs', href: '/jobs', icon: Briefcase, variant: 'default' as const },
  { label: 'View Strategy', href: '/strategy', icon: BookOpen, variant: 'outline' as const },
  { label: 'Chat with AI', href: '/chat', icon: MessageSquare, variant: 'outline' as const },
  { label: 'Update Profile', href: '/profile', icon: User, variant: 'outline' as const },
];

function getFitBadgeClass(score: number) {
  if (score >= 80) return 'bg-green-100 text-green-700 border-green-200';
  if (score >= 60) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  return 'bg-orange-100 text-orange-700 border-orange-200';
}

const recentJobs = mockJobs.slice(0, 3);

export default function DashboardPage() {
  const today = new Date();
  const greeting =
    today.getHours() < 12 ? 'Good morning' : today.getHours() < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-violet-500" />
          <span className="text-sm text-slate-500 font-medium">{greeting}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, {mockUser.name.split(' ')[0]}
        </h1>
        <p className="text-slate-500 mt-1">
          You&apos;re targeting{' '}
          <span className="font-medium text-slate-700">
            {mockUser.targetCompanies.join(', ')}
          </span>
          . Keep up the great work!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-500 font-medium">{stat.title}</span>
                  <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                {stat.showProgress && (
                  <Progress value={mockUser.profileCompleteness} className="mt-2 h-1.5" />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Jobs */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Jobs</h2>
            <Link href="/jobs">
              <Button variant="ghost" size="sm" className="gap-1.5 text-slate-600">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recentJobs.map((job) => (
              <Card key={job.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Company logo placeholder */}
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-base font-bold text-slate-600">
                        {job.company[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-slate-900 text-sm">{job.role}</p>
                          {job.isNew && (
                            <Badge variant="secondary" className="text-xs">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 mt-0.5">
                          {job.company} · {job.level} · {job.locationType}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {job.requiredSkills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getFitBadgeClass(job.fitScore)}`}
                      >
                        {job.fitScore}% fit
                      </span>
                      <Link href="/jobs">
                        <Button size="sm" variant="outline" className="text-xs h-7">
                          Apply
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions + Progress */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link key={action.href} href={action.href}>
                      <Button
                        variant={action.variant}
                        className="w-full justify-start gap-2"
                        size="sm"
                      >
                        <Icon className="w-4 h-4" />
                        {action.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Prep Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                Prep Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: 'Algorithms', value: 65 },
                  { label: 'System Design', value: 40 },
                  { label: 'Behavioral', value: 80 },
                  { label: 'Resume', value: mockUser.profileCompleteness },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span>{item.label}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-1.5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
