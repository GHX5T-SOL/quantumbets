# Security Checklist

**Owner:** Ghost  
**Last updated:** 2025-03-19

---

## Secrets Management

- [ ] All secrets in environment variables (never in code)
- [ ] `.env` and `.env.*.local` in `.gitignore`
- [ ] Use separate secrets for dev/staging/production
- [ ] Rotate API keys and DB credentials periodically
- [ ] Consider Vault or similar for production

## Authentication

- [x] Auth v0: session-based (email login)
- [ ] 2FA roadmap: TOTP or WebAuthn for admin accounts
- [ ] Rate limiting on login endpoint
- [ ] Session expiry and refresh

## RBAC

- [x] RBAC stubs: `user`, `admin` roles
- [ ] Admin routes protected by `requireRole("admin")`
- [ ] Audit log for role changes

## Audit Logging

- [x] `audit_logs` table with userId, action, resource, details, ip
- [x] Login events logged
- [ ] Logout, failed login, sensitive actions
- [ ] Log retention policy

## Infrastructure

- [ ] HTTPS only in production
- [ ] CORS configured for known origins
- [ ] Rate limiting on API (e.g. express-rate-limit)
- [ ] Security headers (helmet)

## Smart Contracts

- [ ] No hardcoded addresses
- [ ] Upgradeability policy documented
- [ ] External audit before mainnet

## Incident Response

- [ ] See `docs/security/incident-response.md` (planned)
- [ ] Bug bounty policy (planned)
