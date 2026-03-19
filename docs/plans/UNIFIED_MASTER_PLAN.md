# QuantumBets — Unified Master Plan (v1)

**Single source of truth.** Linear: epic **[QUANT-28](https://linear.app/quantumbets/issue/QUANT-28)** + doc **[Unified Master Plan v1](https://linear.app/quantumbets/document/unified-master-plan-v1-canonical-4bf383ae1b08)**. GitHub mirror: this file.

---

## Mission

Build a **professional trading-terminal** for **event contracts** (prediction markets): SA-first topics, **global** brand, **transparent** resolution (hybrid **AI + human** oracle), optional **read-only** feeds from [Polymarket](https://docs.polymarket.com) / [Kalshi](https://docs.kalshi.com). **Not** casino UX.

---

## Vision (one paragraph)

Traders see **charts, depth, and risk**; they trade outcome exposure in **stable collateral**; markets resolve through a **defensible oracle** with dispute windows. We expand from South Africa to worldwide **without** renaming the product.

---

## Technical north star (locked until ADR-0003 closes)

| Topic | Default (today) | Optional path |
|--------|------------------|---------------|
| **Chain** | **Base** L2 + Hardhat + EVM wallets ([ADR-0001](../adr/0001-default-l2-and-custody-model.md)) | **Solana** + Anchor only if [ADR-0003](../adr/0003-evaluation-solana-vs-base-grok.md) supersedes after spike |
| **Collateral** | USDC-style, **no** native token for MVP | Token / bridge only after legal + audit |
| **API + DB** | Express + Prisma + Postgres in monorepo | Supabase only if we explicitly migrate (one choice) |
| **Oracle** | `services/oracle` + IncryptOracle **patterns** | On-chain program stays aligned with chosen chain |

---

## How we use Linear (Ghost + Zoro)

1. **Project:** [QuantumBets Prototype](https://linear.app/quantumbets/project/quantumbets-prototype-01e0496ea4f9/overview)
2. **Start:** Epic **`QUANT-28`** — links + ritual.
3. **Your work:** Filter **`owner:zoro`** or **`owner:ghost`** (labels on stream issues).
4. **Phases:** Milestones **U1 / U2 / U3** (setup → core → hardening).
5. **PRs:** Put **`QUANT-xx`** in the title or description to auto-link.
6. **Weekly:** Comment on **`QUANT-37`** (S09 ritual) or duplicate a sub-issue per sprint.

### Labels (use these only)

| Label | Meaning |
|-------|---------|
| `owner:ghost` | Ghost owns completion |
| `owner:zoro` | Zoro owns completion |
| `area:frontend` | UI |
| `area:backend` | API, DB |
| `area:web3` | Contracts, wallets, chain |
| `area:oracle` | Resolution pipeline |
| `area:payments` | Ramps, treasury |
| `area:compliance` | Legal, KYC, geo |
| `area:design` | Brand, Figma |
| `area:docs` | Runbooks, QA lists |
| `risk:high` | Security / legal / money |

Ignore **`roadmap:grok`** on canceled issues; it was an older overlay.

---

## Streams (what to build)

| ID | Stream | Primary owner |
|----|--------|----------------|
| **QUANT-29** | Foundation & brand | Zoro |
| **QUANT-30** | Legal & compliance | Zoro (Ghost: technical annex) |
| **QUANT-31** | Chain + smart contracts | Ghost |
| **QUANT-32** | Backend, auth, data | Ghost |
| **QUANT-33** | Hybrid oracle | Ghost |
| **QUANT-34** | Frontend trading terminal | Zoro (Ghost: wallet/RPC) |
| **QUANT-35** | Venues & payments | Ghost |
| **QUANT-36** | QA, audit, launch | Both |
| **QUANT-37** | Weekly sync & reflection (cadence) | Ghost + Zoro |

**Links:** [QUANT-28 start](https://linear.app/quantumbets/issue/QUANT-28) · [S01–S09 under epic](https://linear.app/quantumbets/issue/QUANT-28/00-start-here-unified-program-mission-linear-map-zoroghost)

---

## How to complete any issue (playbook)

### 1. Before coding

- Read acceptance criteria in the Linear issue.
- Branch: `feat/quant-XX-short-name`.
- If contracts or money: skim `docs/security/security-checklist.md`.

### 2. Tools by area

| Area | Tools | Prompt pattern (Cursor / AI) |
|------|--------|------------------------------|
| **Frontend** | Cursor, repo `apps/web`, Figma | “Implement [route/component] in Next.js App Router + Tailwind. Match existing layout. Acceptance: [paste checkboxes]. Do not add new deps unless necessary.” |
| **Backend** | Cursor, `services/api`, Prisma, Docker | “Change only `services/api`. Add endpoint X with Zod validation. Update Prisma schema if needed. Acceptance: …” |
| **Web3** | Cursor, `contracts/`, Hardhat, Base Sepolia RPC | “Extend `Market.sol` with … Add tests in Hardhat. No scope creep.” |
| **Oracle** | Cursor, `services/oracle` | “Add adapter interface + one stub source. Document env vars.” |
| **Legal / copy** | ChatGPT/Claude for drafts, **lawyer** for sign-off | “Draft plain-language TOS section for [topic]; not legal advice.” |
| **Research** | Perplexity / docs | “Compare X vs Y for Z with citations.” |

### 3. Done

- `npm run build` at repo root.
- PR with `QUANT-XX` in title.
- Move issue **In Review**; other founder reviews.

---

## Roadmap (3 phases)

| Phase | Milestone | Focus |
|-------|-----------|--------|
| **U1** | Setup | Brand, legal kickoff, ADR-0003 spike, repo/CI |
| **U2** | Core product | Contracts + API + oracle v1 + terminal UX + read-only venues |
| **U3** | Hardening | Audit prep, staging, launch checklist, incident runbook |

---

## Zoro — your first 3 tasks

1. Open **`QUANT-29`** — domains, socials, email, Figma mood board.
2. Open **`QUANT-30`** — book counsel, send `docs/legal/legal-intake-packet.md`.
3. Open **`QUANT-34`** — extend terminal UI per acceptance (charts, layouts).

## Ghost — your first 3 tasks

1. Open **`QUANT-31`** — run or schedule **ADR-0003** spike; deploy Base Sepolia path.
2. Open **`QUANT-32`** — harden API + auth + DB migrations on staging.
3. Open **`QUANT-33`** — oracle sources + operator flow.

---

## References

- Repo: https://github.com/GHX5T-SOL/quantumbets  
- ADRs: `docs/adr/`  
- Legal drafts: `docs/legal/`  
- QA: `docs/qa/`  

---

## Disclaimer

Not legal, tax, or investment advice.
