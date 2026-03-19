# Staging Environment

## Overview

Staging mirrors production with test data and testnet contracts.

## Services

| Service | URL | Notes |
|---------|-----|-------|
| Web | https://staging.quantumbets.com (or Vercel preview) | Next.js |
| API | https://api-staging.quantumbets.com | Express |
| Oracle | Internal / ECS | Worker |
| Postgres | Managed (e.g. Neon, Supabase) | Separate from prod |
| Redis | Upstash or ElastiCache | Sessions, cache |

## Env Vars

- `DATABASE_URL` — Staging Postgres
- `NEXT_PUBLIC_API_URL` — Staging API URL
- `NEXT_PUBLIC_SENTRY_DSN` — Sentry project for staging
- `FEATURE_*` — Feature flags

## Deploy

- **Web:** Vercel preview or staging branch
- **API:** Railway, Render, or ECS
- **Contracts:** Base Sepolia

## Checklist

- [ ] Staging DB migrated
- [ ] Sentry configured for staging
- [ ] Testnet contracts deployed
- [ ] Smoke tests pass
