'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Bookmark,
  BrainCircuit,
  Briefcase,
  LayoutDashboard,
  MessageSquare,
  Rocket,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockUser } from '@/lib/mock-data';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Jobs', href: '/jobs', icon: Briefcase },
  { label: 'Strategy', href: '/strategy', icon: BookOpen },
  { label: 'Chat', href: '/chat', icon: MessageSquare },
  { label: 'Saved', href: '/saved', icon: Bookmark },
  { label: 'Profile', href: '/profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-60 min-h-screen bg-slate-900 text-slate-100 shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/15 transition-colors">
            <Rocket className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-none">MAANG</p>
            <p className="text-[10px] text-slate-400 leading-none mt-0.5">Career Coach</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-white text-slate-900'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* AI Assistant promo */}
      <div className="mx-3 mb-3 p-3 bg-gradient-to-br from-violet-600/20 to-blue-600/20 rounded-xl border border-violet-500/20">
        <div className="flex items-center gap-2 mb-1.5">
          <BrainCircuit className="w-4 h-4 text-violet-400" />
          <span className="text-xs font-semibold text-white">AI Coach</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
          Ask anything about your MAANG interview prep.
        </p>
        <Link
          href="/chat"
          className="text-[11px] font-medium text-violet-400 hover:text-violet-300 transition-colors"
        >
          Start chatting →
        </Link>
      </div>

      {/* User avatar */}
      <div className="px-3 pb-4 pt-2 border-t border-slate-800">
        <Link
          href="/profile"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">
              {mockUser.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{mockUser.name}</p>
            <p className="text-xs text-slate-400 truncate">{mockUser.title}</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
