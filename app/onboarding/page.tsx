'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ChevronRight, Rocket, X } from 'lucide-react';
import type { Company } from '@/types';

const COMPANIES: Company[] = ['Google', 'Meta', 'Amazon', 'Apple', 'Netflix', 'Microsoft'];
const ROLES = [
  'Software Engineer',
  'Senior Software Engineer',
  'Staff Engineer',
  'Principal Engineer',
  'Machine Learning Engineer',
  'Data Engineer',
  'DevOps / SRE',
  'Engineering Manager',
];
const SKILL_SUGGESTIONS = [
  'Python', 'Java', 'TypeScript', 'JavaScript', 'Go', 'C++', 'Rust',
  'React', 'Node.js', 'System Design', 'Data Structures', 'Algorithms',
  'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'Kafka',
  'Machine Learning', 'GraphQL', 'Microservices', 'Distributed Systems',
];

type FormData = {
  targetCompanies: Company[];
  targetRoles: string[];
  yearsOfExperience: number;
  skills: string[];
};

const STEPS = [
  { id: 1, title: 'Target companies', subtitle: 'Which MAANG companies are you targeting?' },
  { id: 2, title: 'Target roles', subtitle: 'What roles are you applying for?' },
  { id: 3, title: 'Experience', subtitle: 'How many years of experience do you have?' },
  { id: 4, title: 'Your skills', subtitle: 'Select your technical skills' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [form, setForm] = useState<FormData>({
    targetCompanies: [],
    targetRoles: [],
    yearsOfExperience: 0,
    skills: [],
  });

  const progress = (step / STEPS.length) * 100;
  const currentStep = STEPS[step - 1];

  const toggleCompany = (company: Company) => {
    setForm((prev) => ({
      ...prev,
      targetCompanies: prev.targetCompanies.includes(company)
        ? prev.targetCompanies.filter((c) => c !== company)
        : [...prev.targetCompanies, company],
    }));
  };

  const toggleRole = (role: string) => {
    setForm((prev) => ({
      ...prev,
      targetRoles: prev.targetRoles.includes(role)
        ? prev.targetRoles.filter((r) => r !== role)
        : [...prev.targetRoles, role],
    }));
  };

  const toggleSkill = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const addCustomSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !form.skills.includes(trimmed)) {
      setForm((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    }
    setSkillInput('');
  };

  const canProceed = () => {
    if (step === 1) return form.targetCompanies.length > 0;
    if (step === 2) return form.targetRoles.length > 0;
    if (step === 3) return form.yearsOfExperience > 0;
    if (step === 4) return form.skills.length > 0;
    return false;
  };

  const handleNext = async () => {
    if (step < STEPS.length) {
      setStep((s) => s + 1);
    } else {
      setLoading(true);
      try {
        const res = await fetch('/api/users/onboard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          router.push('/dashboard');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
          <Rocket className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-slate-900 text-lg">MAANG Career Coach</span>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm p-8">
        {/* Step indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">
              Step {step} of {STEPS.length}
            </span>
            <span className="text-xs font-medium text-slate-500">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-1">{currentStep.title}</h2>
        <p className="text-sm text-slate-500 mb-6">{currentStep.subtitle}</p>

        {/* Step 1 — Companies */}
        {step === 1 && (
          <div>
            <div className="flex flex-wrap gap-2">
              {COMPANIES.map((company) => {
                const selected = form.targetCompanies.includes(company);
                return (
                  <button
                    key={company}
                    onClick={() => toggleCompany(company)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                      selected
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {selected && <CheckCircle className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />}
                    {company}
                  </button>
                );
              })}
            </div>
            {form.targetCompanies.length > 0 && (
              <p className="mt-3 text-xs text-slate-500">{form.targetCompanies.length} selected</p>
            )}
          </div>
        )}

        {/* Step 2 — Roles */}
        {step === 2 && (
          <div>
            <div className="flex flex-wrap gap-2">
              {ROLES.map((role) => {
                const selected = form.targetRoles.includes(role);
                return (
                  <button
                    key={role}
                    onClick={() => toggleRole(role)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                      selected
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {selected && <X className="inline w-3 h-3 mr-1" />}
                    {role}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3 — Experience */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="yoe" className="text-sm font-medium text-slate-700">
                Years of Experience
              </Label>
              <Input
                id="yoe"
                type="number"
                min={0}
                max={30}
                className="mt-1.5"
                placeholder="e.g. 5"
                value={form.yearsOfExperience || ''}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, yearsOfExperience: parseInt(e.target.value) || 0 }))
                }
                onKeyDown={(e) => e.key === 'Enter' && canProceed() && handleNext()}
                autoFocus
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {[1, 2, 3, 5, 7, 10, 12, '15+'].map((val) => (
                <button
                  key={val}
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      yearsOfExperience: typeof val === 'number' ? val : 15,
                    }))
                  }
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                    form.yearsOfExperience === (typeof val === 'number' ? val : 15)
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 — Skills */}
        {step === 4 && (
          <div className="space-y-4">
            {/* Custom skill input */}
            <div className="flex gap-2">
              <Input
                placeholder="Type a skill and press Enter"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomSkill();
                  }
                }}
              />
              <Button variant="outline" onClick={addCustomSkill} className="shrink-0">
                Add
              </Button>
            </div>

            {/* Selected skills */}
            {form.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {form.skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1 px-2.5 py-1 bg-slate-900 text-white rounded-lg text-xs font-medium"
                  >
                    {skill}
                    <button onClick={() => toggleSkill(skill)} className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Suggestions */}
            <div>
              <p className="text-xs text-slate-500 mb-2">Suggestions</p>
              <div className="flex flex-wrap gap-1.5">
                {SKILL_SUGGESTIONS.filter((s) => !form.skills.includes(s)).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium border border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900 transition-all"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          <Button onClick={handleNext} disabled={!canProceed() || loading} className="gap-1.5">
            {loading ? 'Saving...' : step === STEPS.length ? 'Go to Dashboard' : 'Continue'}
            {!loading && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-6">
        {STEPS.map((s) => (
          <div
            key={s.id}
            className={`h-1.5 rounded-full transition-all ${
              s.id === step
                ? 'w-6 bg-slate-900'
                : s.id < step
                ? 'w-3 bg-slate-400'
                : 'w-3 bg-slate-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
