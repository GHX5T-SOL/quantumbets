# Incident Response Runbook

**Owner:** Ghost + Zoro

## Severity Levels

| Level | Definition | Example |
|-------|------------|---------|
| P0 | Critical: funds at risk | Exploit, oracle hack |
| P1 | High: service degraded | API down, auth failure |
| P2 | Medium: partial outage | Single venue adapter down |
| P3 | Low: UX issue | Chart slow, minor bug |

## Response Flow

1. **Detect** — Monitoring, user report, or internal discovery
2. **Triage** — Assign severity, notify owners
3. **Contain** — Pause contracts if needed, isolate affected systems
4. **Remediate** — Fix root cause, deploy patch
5. **Recover** — Restore service, verify
6. **Post-mortem** — Within 72h for P0/P1

## P0 — Critical

1. **Immediately:** Pause Market contract if exploit suspected
2. Notify both founders
3. Create Linear incident issue
4. Post status update (status page)
5. Rotate keys if compromise suspected
6. Engage legal counsel if regulatory impact
7. Post-mortem: root cause, timeline, prevention

## P1 — High

1. Notify on-call (Ghost)
2. Create Linear issue
3. Prioritize fix over feature work
4. Status update within 2h

## Contacts

- **Ghost:** [internal]
- **Zoro:** [internal]
- **Legal:** [counsel contact]
- **Security:** security@[domain]

## Status Page

Maintain a public status page (e.g. status.quantumbets.com) for outage communication.
