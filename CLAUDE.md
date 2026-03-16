# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Turbopack) at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

No test suite is configured yet.

## Stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS v4** — uses `@import "tailwindcss"` syntax, not `@tailwind` directives. CSS variables defined in `app/globals.css` using `oklch()` color space.
- **shadcn/ui** components live in `components/ui/`. Add new ones via `npx shadcn add <component>`.
- **lucide-react** for all icons.
- No backend — all data is mocked in `lib/mock-data.ts`.

## Architecture

### Route Structure
```
app/
  page.tsx                     # Landing page (static)
  onboarding/page.tsx          # Multi-step onboarding, stores data in localStorage
  (dashboard)/
    layout.tsx                 # Wraps all dashboard routes with <Sidebar>
    dashboard/page.tsx
    jobs/page.tsx
    strategy/page.tsx
    saved/page.tsx
    profile/page.tsx
    chat/page.tsx
```

The `(dashboard)` route group shares a sidebar layout. All dashboard pages are at the root path level (e.g., `/dashboard`, `/jobs`, `/chat`) — not nested under `/dashboard/`.

### Data Flow
All types are defined in `types/index.ts`. Mock data (user, jobs, strategy, chat responses) lives in `lib/mock-data.ts`. Pages import directly from there — no context, no state management library.

### Key Conventions
- Pages that need interactivity use `'use client'` at the top.
- The sidebar (`components/layout/sidebar.tsx`) uses `usePathname()` for active route highlighting. Active item is styled `bg-white text-slate-900`; inactive is `text-slate-400 hover:text-white hover:bg-slate-800`.
- Fit scores on job cards: green badge ≥80, yellow badge 60–79, orange badge <60.
- The mock user is `Sai Teja` (Software Engineer, targeting Google/Meta/Amazon, 5 YOE, IIT Hyderabad).
- Onboarding persists to `localStorage` key `onboarding-data` and redirects to `/dashboard` on completion.
- All component imports use the `@/` alias (maps to project root).
