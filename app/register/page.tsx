'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      // Auto sign in after registration
      const result = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.ok) {
        router.push('/onboarding');
      }
    } finally {
      setLoading(false);
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
      <div className="w-full max-w-sm bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Create account</h1>
        <p className="text-sm text-slate-500 mb-6">Start your MAANG interview prep journey</p>

        {/* Google */}
        <Button
          type="button"
          variant="outline"
          className="w-full gap-3 mb-4"
          onClick={() => signIn('google', { callbackUrl: '/onboarding' })}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </Button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400">or</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</Label>
            <Input
              id="name"
              className="mt-1.5"
              placeholder="Sai Teja"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email</Label>
            <Input
              id="email"
              type="email"
              className="mt-1.5"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
            <Input
              id="password"
              type="password"
              className="mt-1.5"
              placeholder="Min 6 characters"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="confirm" className="text-sm font-medium text-slate-700">Confirm Password</Label>
            <Input
              id="confirm"
              type="password"
              className="mt-1.5"
              placeholder="Repeat password"
              value={form.confirm}
              onChange={(e) => setForm((p) => ({ ...p, confirm: e.target.value }))}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-slate-900 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
