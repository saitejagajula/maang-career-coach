'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  ChevronRight,
  ExternalLink,
  Lightbulb,
  ListChecks,
  Map,
  MessageSquare,
  Star,
  Target,
  Zap,
} from 'lucide-react';
import { mockStrategy } from '@/lib/mock-data';
import type { Company } from '@/types';

const COMPANIES: Company[] = ['Google', 'Meta', 'Amazon', 'Apple', 'Netflix', 'Microsoft'];
const ROLES = ['Software Engineer', 'Senior Software Engineer', 'Staff Engineer', 'ML Engineer'];
const LEVELS = ['L3', 'L4', 'L5', 'L6', 'E4', 'E5', 'SDE-I', 'SDE-II', 'Senior', 'Staff'];

const importanceColor: Record<string, string> = {
  Critical: 'bg-red-100 text-red-700 border-red-200',
  High: 'bg-orange-100 text-orange-700 border-orange-200',
  Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

const difficultyColor: Record<string, string> = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Hard: 'bg-red-100 text-red-700',
};

const resourceTypeIcon: Record<string, React.ReactNode> = {
  Book: <BookOpen className="w-4 h-4" />,
  Course: <Star className="w-4 h-4" />,
  Practice: <Zap className="w-4 h-4" />,
  Article: <MessageSquare className="w-4 h-4" />,
};

export default function StrategyPage() {
  const [selectedCompany, setSelectedCompany] = useState<Company>('Google');
  const [selectedRole, setSelectedRole] = useState('Software Engineer');
  const [selectedLevel, setSelectedLevel] = useState('L5');

  // In a real app, this would fetch strategy based on selections
  const strategy = mockStrategy;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Target className="w-6 h-6" />
          Interview Strategy
        </h1>
        <p className="text-slate-500 mt-1">
          Tailored preparation plans for your target company and role.
        </p>
      </div>

      {/* Selector */}
      <div className="bg-white rounded-xl ring-1 ring-slate-200 p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Select Target</h2>
        <div className="space-y-4">
          {/* Company */}
          <div>
            <p className="text-xs text-slate-500 mb-2 font-medium">Company</p>
            <div className="flex flex-wrap gap-2">
              {COMPANIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCompany(c)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                    selectedCompany === c
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Role */}
            <div className="flex-1">
              <p className="text-xs text-slate-500 mb-2 font-medium">Role</p>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRole(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedRole === r
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            {/* Level */}
            <div>
              <p className="text-xs text-slate-500 mb-2 font-medium">Level</p>
              <div className="flex flex-wrap gap-1.5">
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setSelectedLevel(l)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedLevel === l
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3 text-sm text-slate-600">
          <span>
            Strategy for:{' '}
            <strong className="text-slate-900">
              {selectedCompany} {selectedRole} ({selectedLevel})
            </strong>
          </span>
          <Badge variant="secondary">{strategy.timeline}</Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="process">
        <TabsList className="mb-6">
          <TabsTrigger value="process">Interview Process</TabsTrigger>
          <TabsTrigger value="technical">Technical Prep</TabsTrigger>
          <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
        </TabsList>

        {/* Interview Process */}
        <TabsContent value="process" className="space-y-4">
          <div className="grid gap-4">
            {strategy.interviewProcess.map((stage, i) => (
              <Card key={stage.stage}>
                <CardContent className="pt-5">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-slate-900">{stage.stage}</h3>
                        <Badge variant="outline" className="text-xs">
                          {stage.duration}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{stage.description}</p>
                      <div className="space-y-1.5">
                        {stage.tips.map((tip) => (
                          <div key={tip} className="flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" />
                            <p className="text-sm text-slate-600">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Common Mistakes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-orange-600">
                <AlertTriangle className="w-4 h-4" />
                Common Mistakes to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {strategy.commonMistakes.map((mistake) => (
                  <div key={mistake} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">✕</span>
                    <p className="text-sm text-slate-600">{mistake}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technical Prep */}
        <TabsContent value="technical" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategy.technicalAreas.map((area) => (
              <Card key={area.area}>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center justify-between">
                    {area.area}
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full border ${importanceColor[area.importance]}`}
                    >
                      {area.importance}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {area.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-2 text-sm text-slate-600">
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mock Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                Practice Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {strategy.mockQuestions
                  .filter((q) => q.type !== 'Behavioral')
                  .map((q) => (
                    <div
                      key={q.question}
                      className="p-3 rounded-lg bg-slate-50 ring-1 ring-slate-100"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <Badge variant="secondary" className="text-xs">
                          {q.type}
                        </Badge>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor[q.difficulty]}`}
                        >
                          {q.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700">{q.question}</p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Behavioral */}
        <TabsContent value="behavioral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Framework: {strategy.behavioralPrep.framework}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                Structure every behavioral answer using the STAR framework to clearly communicate
                your impact and ownership.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Situation', 'Task', 'Action', 'Result'].map((item, i) => (
                  <div
                    key={item}
                    className="text-center p-3 rounded-lg bg-slate-900 text-white"
                  >
                    <p className="text-xs text-slate-400">{String.fromCharCode(83 + i * 5 - (i > 1 ? 3 : 0))}</p>
                    <p className="font-semibold text-sm mt-1">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Key Principles to Demonstrate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {strategy.behavioralPrep.principles.map((p) => (
                  <Badge key={p} variant="secondary" className="text-sm py-1 px-3">
                    {p}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-violet-500" />
                Common Behavioral Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {strategy.behavioralPrep.questions.map((q) => (
                  <div
                    key={q}
                    className="flex items-start gap-3 p-3 rounded-lg bg-slate-50"
                  >
                    <span className="text-violet-500 mt-0.5 shrink-0">?</span>
                    <p className="text-sm text-slate-700">{q}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Behavioral questions from mock */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Resume Focus Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {strategy.resumeFocusAreas.map((area) => (
                  <div key={area} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-slate-600">{area}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources */}
        <TabsContent value="resources">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {strategy.resources.map((resource) => (
              <Card key={resource.title} className="hover:shadow-sm transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-600">
                      {resourceTypeIcon[resource.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-medium text-slate-900 text-sm">{resource.title}</h3>
                        {resource.url && (
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-slate-600 shrink-0"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {resource.type}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Roadmap */}
        <TabsContent value="roadmap" className="space-y-4">
          <div className="relative">
            {strategy.roadmap.map((week, i) => (
              <div key={week.week} className="flex gap-4 mb-6">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  {i < strategy.roadmap.length - 1 && (
                    <div className="w-0.5 bg-slate-200 flex-1 mt-2 min-h-[2rem]" />
                  )}
                </div>

                {/* Content */}
                <Card className="flex-1 mb-0">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900">{week.week}</h3>
                      <Badge variant="secondary">{week.focus}</Badge>
                    </div>
                    <div className="space-y-1.5">
                      {week.tasks.map((task) => (
                        <div key={task} className="flex items-start gap-2">
                          <ListChecks className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                          <p className="text-sm text-slate-600">{task}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
