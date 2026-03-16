import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  BookOpen,
  Building2,
  Edit,
  Github,
  GraduationCap,
  Linkedin,
  MapPin,
  Target,
  User,
  Zap,
} from 'lucide-react';
import { mockUser } from '@/lib/mock-data';

const completenessItems = [
  { label: 'Basic Info', done: true },
  { label: 'Skills', done: true },
  { label: 'Target Companies', done: true },
  { label: 'Education', done: true },
  { label: 'Resume Summary', done: true },
  { label: 'Work Experience', done: false },
  { label: 'Projects', done: false },
  { label: 'LinkedIn URL', done: !!mockUser.linkedinUrl },
];

export default function ProfilePage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <User className="w-6 h-6" />
          Profile
        </h1>
        <Button variant="outline" size="sm" className="gap-2">
          <Edit className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-4">
          {/* Avatar & basic info */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">
                    {mockUser.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900">{mockUser.name}</h2>
                <p className="text-sm text-slate-500 mt-1">{mockUser.title}</p>
                <div className="flex items-center gap-1.5 mt-2 text-slate-500">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-sm">{mockUser.location}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-slate-500">
                  <Zap className="w-3.5 h-3.5" />
                  <span className="text-sm">{mockUser.yearsOfExperience} years experience</span>
                </div>

                {/* Social links */}
                <div className="flex gap-3 mt-4">
                  {mockUser.linkedinUrl && (
                    <a
                      href={mockUser.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {mockUser.githubUrl && (
                    <a
                      href={mockUser.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Completeness */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center justify-between">
                Profile Completeness
                <span className="text-base font-bold text-slate-900">
                  {mockUser.profileCompleteness}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={mockUser.profileCompleteness} className="h-2 mb-4" />
              <div className="space-y-2">
                {completenessItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        item.done ? 'bg-green-500' : 'bg-slate-200'
                      }`}
                    >
                      {item.done && (
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-xs ${item.done ? 'text-slate-700' : 'text-slate-400'}`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Target Companies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-violet-500" />
                Target Companies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockUser.targetCompanies.map((company) => (
                  <Badge key={company} variant="secondary" className="text-sm">
                    <Building2 className="w-3 h-3 mr-1.5" />
                    {company}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Resume Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 leading-relaxed">{mockUser.resumeSummary}</p>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockUser.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-sm py-1 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-500" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockUser.education.map((edu, i) => (
                <div key={i}>
                  {i > 0 && <Separator className="my-4" />}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">
                        {edu.degree} in {edu.major}
                      </p>
                      <p className="text-sm text-slate-500 mt-0.5">{edu.institution}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Class of {edu.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Target Roles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="w-4 h-4 text-green-500" />
                Target Roles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockUser.targetRoles.map((role) => (
                  <Badge key={role} variant="secondary" className="text-sm py-1 px-3">
                    {role}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
