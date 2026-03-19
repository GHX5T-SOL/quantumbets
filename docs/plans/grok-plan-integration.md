# Grok Plan Integration — Merged Operating Blueprint

This document **merges** the external Grok blueprint (Mar 2026) with the repo’s existing architecture ([ADR-0001: Base + no-token MVP](../adr/0001-default-l2-and-custody-model.md)). **Nothing here replaces legal counsel.**

---

## Executive summary

| Topic | Repo / Cursor plan (current) | Grok plan |
|--------|------------------------------|-----------|
| **Default chain** | **Base** (EVM), Hardhat, USDC-style MVP | **Solana** + Anchor + Phantom; cites speed/TPS |
| **DB** | Postgres + Prisma (`services/api`) | Supabase + Next API routes |
| **Oracle** | TS worker stub; IncryptOracle as *concepts* | Port IncryptOracle to Solana; Llama-3 + RapidAPI; 1–4h optimistic |
| **Token** | No native token until legal + audit | **$QBT** governance + Wormhole |
| **Frontend** | Next 14 terminal shell, mock markets | Next 15, Lightweight-Charts / TradingView, full order book UX |
| **Name** | QuantumBets / Linear project | **QuantumBets** (aligned) |

**Integration rule:** Ship on **one** primary chain for MVP. Grok’s Solana stack is captured as a **tracked option** in [ADR-0003](../adr/0003-evaluation-solana-vs-base-grok.md). Until ADR-0003 supersedes ADR-0001, **implementation stays Base/EVM**; Linear includes **spike tasks** for Solana/Anchor if you choose to evaluate.

---

## What we adopt from Grok (regardless of chain)

1. **Frontend workstreams** — Landing + auth, markets dashboard (SA / global / trending), **trading terminal** (sidebar, chart, book, ticket), portfolio, create market, oracle status, mobile + dark mode.
2. **White paper sections** — Exec summary, market, product, architecture, hybrid oracle, tokenomics (if any), roadmap, team, legal, financials.
3. **Legal bootstrap framing** — CIPC Pty, provincial bookmaker / event-contract positioning, templates + lawyer review, KYC at scale (e.g. Onfido) when needed.
4. **Financials (ZAR order-of-magnitude)** — Grok: ~R250k Y1 bootstrap envelope; line items for legal/audit, AI compute, marketing — **verify with your accountant**.
5. **Collaboration** — Daily Linear updates; 2× weekly syncs; feature branches + PR review; end-of-week reflection issue; shared testnet + Playwright e2e.
6. **Workspace** — Solana CLI + Anchor *if* pursuing ADR-0003; else continue Hardhat/Base; Figma (Zoro); Postman/API clients; Perplexity for research.

---

## Grok research notes (use with verification)

- Polymarket: hybrid on-chain/off-chain, USDC, oracle stack — compare [Polymarket docs](https://docs.polymarket.com).
- Kalshi: REST/WebSocket, [Kalshi API](https://docs.kalshi.com) — Developer Agreement for trading.
- SA: National Gambling Act + **provincial** licensing — see [legal intake](../legal/legal-intake-packet.md).
- Sector volume figures ($21B+, $325B+) — **treat as directional**; re-source before investor materials.
- Solana benchmarks — re-verify against current network docs before betting the stack.

---

## Grok roadmap (6 months to MVP) — mapped to Linear

| Grok phase | Time | Milestone name in Linear |
|------------|------|---------------------------|
| P0 Foundation | Week 1 | Grok P0 — Foundation |
| P1 Contracts + Oracle | Weeks 2–4 | Grok P1 — Core contracts & oracle |
| P2 Frontend + integrations | Weeks 5–8 | Grok P2 — Terminal & mirrors |
| P3 Test + audit + SA | Weeks 9–12 | Grok P3 — Testnet & SA markets |
| P4 Mainnet + token + GTM | Months 4–6 | Grok P4 — Mainnet & growth |

---

## Grok Linear epics (issues in project)

See Linear issues **Grok EPIC-01 … EPIC-08** plus **META: Grok plan** and **Ritual: Weekly sync & reflection**.

---

## IncryptOracle

Reference: [GHX5T-SOL/IncryptOracle](https://github.com/GHX5T-SOL/IncryptOracle). Reuse **patterns** (hybrid validators, dispute window, reputation); do not assume license/port without review.

---

## Disclaimer

Not legal, tax, or investment advice. Token launch and bridging require **jurisdiction-specific** advice.
