# QA Checklist: M3 — Internal Alpha

- [ ] Auth: POST /api/auth/login with email returns token
- [ ] Auth: GET /api/auth/me with token returns user
- [ ] Auth: POST /api/auth/logout invalidates session
- [ ] Audit log entry created on login
- [ ] Prisma migrations run: `npx prisma migrate dev`
- [ ] DB_URL points to local Postgres
