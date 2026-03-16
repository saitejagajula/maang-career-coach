import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BrainCircuit,
  Briefcase,
  ChartBar,
  CheckCircle,
  Code2,
  MessageSquare,
  Rocket,
  Target,
} from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Personalized Strategy',
    description:
      'Get a tailored interview preparation plan for your target company, role, and timeline.',
  },
  {
    icon: BrainCircuit,
    title: 'AI Career Coach',
    description:
      'Chat with an AI coach trained on MAANG interview patterns, leadership principles, and hiring bars.',
  },
  {
    icon: Briefcase,
    title: 'Jobs Board',
    description:
      'Browse curated openings at Google, Meta, Amazon, Apple, Netflix, and Microsoft with fit scores.',
  },
  {
    icon: Code2,
    title: 'Technical Prep',
    description:
      'Structured algorithms, system design, and coding practice roadmaps for each company.',
  },
  {
    icon: MessageSquare,
    title: 'Behavioral Interview Prep',
    description:
      'Master STAR storytelling, leadership principles, and Googleyness with example answers.',
  },
  {
    icon: ChartBar,
    title: 'Progress Tracking',
    description:
      'Track your interview applications, sessions, and profile completeness in one dashboard.',
  },
];

const companies = ['Google', 'Meta', 'Amazon', 'Apple', 'Netflix', 'Microsoft'];

const testimonials = [
  {
    name: 'Priya K.',
    role: 'L5 @ Google',
    quote:
      'The strategy page alone saved me weeks of research. I knew exactly what to expect in every round.',
  },
  {
    name: 'Rohan M.',
    role: 'E5 @ Meta',
    quote:
      'The behavioral prep section with STAR story templates helped me land my offer after two failed attempts.',
  },
  {
    name: 'Anjali S.',
    role: 'SDE-II @ Amazon',
    quote:
      'I used the roadmap for 3 months and felt completely confident walking into the onsite.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-900 text-lg">MAANG Career Coach</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
        <Badge className="mb-6 inline-flex" variant="secondary">
          Powered by AI • 100% Free
        </Badge>
        <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
          Land your dream job at{' '}
          <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
            Google, Meta &amp; Amazon
          </span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Your AI-powered career coach with personalized interview strategies, curated job boards,
          and step-by-step prep roadmaps for every MAANG company.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="h-12 px-8 text-base">
              Start Your Journey
              <Rocket className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="h-12 px-8 text-base">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Company badges */}
        <div className="mt-16 flex flex-wrap gap-3 justify-center">
          {companies.map((company) => (
            <Badge key={company} variant="outline" className="text-sm px-4 py-1.5">
              {company}
            </Badge>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Everything you need to get hired
            </h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              From first application to offer letter — we've got every step covered.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl p-6 ring-1 ring-slate-200 hover:ring-slate-300 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Engineers who made it
            </h2>
            <p className="text-lg text-slate-600">Real stories from engineers who landed MAANG roles.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-xl p-6 ring-1 ring-slate-200"
              >
                <p className="text-slate-700 mb-4 leading-relaxed italic">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to crack MAANG?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
            Set up your profile in 2 minutes. Get a personalized strategy instantly.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="h-12 px-8 text-base">
              Get started for free
            </Button>
          </Link>
          <div className="mt-8 flex flex-wrap gap-6 justify-center">
            {['No credit card required', 'Instant access', 'AI-powered coaching'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-slate-400 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
          © 2026 MAANG Career Coach. Built for engineers, by engineers.
        </div>
      </footer>
    </div>
  );
}
