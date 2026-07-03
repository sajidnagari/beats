# PulseTok Analytics (beats)

A modern **TikTok Analytics** product concept built with **Next.js App Router** and **Tailwind CSS**.

[![Live Demo](https://img.shields.io/badge/Live_Demo-beats--peach.vercel.app-06B6D4?style=for-the-badge)](https://beats-peach.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**Live demo:** [https://beats-peach.vercel.app/](https://beats-peach.vercel.app/)

---

## Project Purpose

This project presents **PulseTok** — a fictional SaaS product for TikTok creators, agencies, and brands who want to track views, engagement, audience behavior, and content performance in one place.

### What this site is

| Role | Description |
|------|-------------|
| **Frontend showcase** | Demonstrates modern SaaS UI patterns, animations, and responsive layout |
| **Portfolio project** | Shows skills in Next.js, TypeScript, Tailwind, and component architecture |
| **UI/UX prototype** | Visualizes how a TikTok analytics product could look and flow |
| **Demo app** | Deployable landing page + login + dashboard you can share with clients or recruiters |

### What this site is not (yet)

The dashboard now uses a **real backend** (PostgreSQL + Prisma + API routes), but TikTok metrics are still **seeded demo data** until you connect the TikTok API.

---

## Backend (PostgreSQL + Prisma + React Query)

### Stack
- **Database:** PostgreSQL
- **ORM:** Prisma 5
- **API:** Next.js Route Handlers (`app/api/*`)
- **Auth:** JWT session cookie (`jose`) + bcrypt passwords
- **Data fetching:** TanStack React Query with reusable hooks

### API routes
| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/auth/login` | Sign in |
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/logout` | Sign out |
| GET | `/api/auth/me` | Current user |
| GET | `/api/dashboard/overview` | Overview metrics |
| GET | `/api/dashboard/analytics` | Analytics data |
| GET | `/api/dashboard/content` | Content data |
| GET | `/api/dashboard/audience` | Audience data |
| PATCH | `/api/dashboard/settings` | Update profile |

### Reusable hooks (`hooks/`)
| Hook | Purpose |
|------|---------|
| `useMe()` | Fetch current user |
| `useLogin()` | Login mutation → invalidates `auth` + `dashboard` queries |
| `useRegister()` | Register mutation → invalidates queries |
| `useLogout()` | Logout → clears React Query cache |
| `useOverview()` | Dashboard overview from DB |
| `useAnalytics()` | Analytics from DB |
| `useContent()` | Content from DB |
| `useAudience()` | Audience from DB |
| `useUpdateSettings()` | PATCH settings → invalidates `auth.me` + `dashboard` |

Query keys are centralized in `lib/query-keys.ts` for consistent invalidation.

### Database setup

See **[docs/ENVIRONMENT.md](./docs/ENVIRONMENT.md)** for the full local vs production guide.

**Local (quick start):**

```bash
cp .env.local.example .env.local
# Edit DATABASE_URL + AUTH_SECRET (Neon development branch recommended)
npm run db:push:local
npm run db:seed:local
npm run dev
```

**Production (Neon + Vercel):**

1. Add `DATABASE_URL` + `AUTH_SECRET` in Vercel → Settings → Environment Variables (production Neon branch)
2. Copy the same values to `.env.production` for CLI commands:
   ```bash
   cp .env.production.example .env.production
   ```
3. Push schema and seed production DB:
   ```bash
   npm run db:push:prod
   npm run db:seed:prod
   ```
4. Redeploy on Vercel, then verify `/api/health` and login

### DB scripts

| Command | Environment | Description |
|---------|-------------|-------------|
| `npm run db:push` | local | Sync schema (alias for `:local`) |
| `npm run db:push:local` | `.env.local` | Sync schema to dev database |
| `npm run db:push:prod` | `.env.production` | Sync schema to production Neon |
| `npm run db:seed:local` | `.env.local` | Seed demo user + metrics (dev) |
| `npm run db:seed:prod` | `.env.production` | Seed demo user + metrics (prod) |
| `npm run db:migrate` | local | Create migration (dev) |
| `npm run db:studio:local` | `.env.local` | Prisma Studio (dev) |
| `npm run db:studio:prod` | `.env.production` | Prisma Studio (prod) |

---

## Features

### Landing page
- Hero with particle background and dashboard preview mockup
- Features, advanced features, animated stats, testimonials
- Pricing, integrations, use cases, FAQ accordion
- CTA modals, contact footer, social links

### App experience
- Login page (`/login`)
- Protected dashboard with sidebar navigation
- Pages: Overview, Analytics, Content, Audience, Settings

### Demo login

| Field | Value |
|-------|--------|
| URL | `/login` |
| Email | `demo@pulsetok.io` |
| Password | `demo123` |

---

## Can we add real TikTok data?

**Yes — next step is TikTok API integration.** The backend is ready; you would add:

1. `app/api/auth/tiktok` — OAuth flow
2. `app/api/sync` — fetch and store live metrics in existing Prisma models
3. Cron job to refresh video stats daily
4. Environment variables for TikTok client ID/secret (server-side only)

Until then, dashboard data comes from PostgreSQL (seeded demo metrics per user).

---

## Pricing — what to include

For a TikTok analytics SaaS, pricing should map **features to audience size**. Recommended structure:

### Starter — solo creators (~$19–29/mo)
- 1 TikTok account
- Real-time basic analytics (views, engagement, followers)
- 30-day data history
- Weekly email summary
- Export CSV (limited)

### Pro — serious creators & small teams (~$49–79/mo) ⭐ Recommended
- Up to 5–10 accounts
- Advanced insights (best posting times, content breakdown)
- Viral spike alerts
- Competitor benchmarking (limited)
- Unlimited data history
- Branded PDF reports
- Team collaboration (2–3 seats)

### Agency — agencies & brands (~$149–299/mo)
- 25+ client accounts
- White-label client reports
- Multi-user workspace (10+ seats)
- API access
- Priority support + onboarding
- Custom integrations (Slack, GA4, Notion)

### Pricing page best practices
- Show **annual billing** (e.g. 2 months free) to increase conversions
- Highlight one plan as **Recommended**
- List **concrete limits** (accounts, seats, history days) — not vague bullets
- Add **14-day free trial** on paid plans
- Optional **Free tier**: 1 account, 7-day history, watermark on exports

Current plan copy lives in `lib/data.ts` and can be edited there.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS
- **Language:** TypeScript
- **Database:** PostgreSQL + Prisma
- **Data fetching:** TanStack React Query
- **Auth:** JWT httpOnly cookies + bcrypt
- **Deploy:** Vercel (+ PostgreSQL via Neon, Supabase, or Railway)

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

---

## Folder Structure

```text
beats/
├── app/
│   ├── dashboard/          # Protected analytics dashboard
│   ├── login/              # Demo login page
│   ├── layout.tsx
│   ├── page.tsx            # Landing page
│   └── globals.css
├── components/
│   ├── dashboard/          # Sidebar, charts, shell
│   ├── cta-modal.tsx
│   ├── hero.tsx
│   ├── navbar.tsx
│   └── ...
├── hooks/
│   ├── use-auth.ts         # Auth queries & mutations
│   └── use-dashboard.ts    # Dashboard queries & mutations
├── lib/
│   ├── api-client.ts
│   ├── prisma.ts
│   ├── query-keys.ts
│   ├── session.ts
│   └── types/api.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── ...
```

---

## Deploy on Vercel

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com/)
3. Add environment variables (Production):
   - `DATABASE_URL` — Neon **production** connection string
   - `AUTH_SECRET` — long random secret (`openssl rand -base64 32`)
4. Deploy, then run against production DB from your machine:
   ```bash
   cp .env.production.example .env.production
   # paste same DATABASE_URL + AUTH_SECRET as Vercel
   npm run db:push:prod
   npm run db:seed:prod
   ```
5. Redeploy if env vars were added after first deploy
6. Verify: `https://your-app.vercel.app/api/health` and login with `demo@pulsetok.io` / `demo123`

Details: [docs/ENVIRONMENT.md](./docs/ENVIRONMENT.md)

---

## Author

Built by [Sajid Ali](https://github.com/sajidnagari)

- GitHub: [github.com/sajidnagari](https://github.com/sajidnagari)
- LinkedIn: [linkedin.com/in/sajidnagari](https://www.linkedin.com/in/sajidnagari/)

---

## License

MIT — see [LICENSE](./LICENSE)
