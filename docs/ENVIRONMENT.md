# Environment setup

Copy the example files for each environment:

```bash
cp .env.local.example .env.local
cp .env.production.example .env.production
```

## Files

| File | Purpose | Used by |
|------|---------|---------|
| `.env.local` | Local dev database + auth | `npm run dev`, `db:*:local` |
| `.env` | Legacy local file (still works) | Fallback for `db:*:local` if no `.env.local` |
| `.env.production` | Production Neon DB (CLI only) | `db:*:prod` |
| Vercel env vars | Live production app | Vercel deployment |

## Neon branches (recommended)

| Branch | Use for |
|--------|---------|
| `development` | Local `.env.local` |
| `production` | Vercel + `.env.production` |

## Commands

### Local development

```bash
npm run dev              # Next.js (reads .env.local)
npm run db:push:local    # Push schema to local/dev DB
npm run db:seed:local    # Seed local/dev DB
npm run db:studio:local  # Open Prisma Studio (local)
```

### Production database (from your laptop)

```bash
npm run db:push:prod     # Push schema to production Neon
npm run db:seed:prod     # Seed production Neon (demo user)
npm run db:studio:prod   # Open Prisma Studio (production)
```

### Vercel (runtime — not CLI)

Add in Vercel → Settings → Environment Variables:

- `DATABASE_URL` → Neon **production** connection string
- `AUTH_SECRET` → same value as `.env.production`

Then **Redeploy**.

## Health check

```text
https://beats-peach.vercel.app/api/health
```

Expected when fully configured:

```json
{
  "status": "ok",
  "checks": {
    "database": "connected",
    "auth": "configured"
  }
}
```
