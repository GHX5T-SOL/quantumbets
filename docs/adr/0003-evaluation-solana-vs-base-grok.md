# ADR-0003: Chain Evaluation — Solana (Grok) vs Base (ADR-0001)

**Status:** Proposed / under evaluation  
**Date:** 2026-03-19  
**Authors:** Ghost, Zoro + external “Grok” synthesis

---

## Context

[ADR-0001](0001-default-l2-and-custody-model.md) selected **Base** for MVP: EVM tooling, USDC, on-ramps, alignment with Polymarket-style signing patterns.

An external plan (“Grok”) recommends **Solana** + **Anchor** + **Phantom**, citing low fees, fast finality, prediction/trading UX, optional **Wormhole** bridging, and a native **$QBT** governance token.

We must not fork the codebase blindly: **pick one primary execution environment for MVP**, or explicitly run a **time-boxed spike** before switching.

---

## Grok arguments for Solana

- Very low per-tx cost and fast confirmation — good for **terminal-style** refresh rates.
- Mature wallet (Phantom) and Anchor ecosystem for programs.
- Off-chain APIs (Polymarket/Kalshi) remain chain-agnostic; execution layer could be Solana CPMM-style programs.
- Wormhole (or similar) for cross-chain liquidity **if** product/legal allows.

---

## Arguments for keeping Base (ADR-0001)

- **Repo state:** Hardhat contracts, EVM addresses, team familiarity, existing CI.
- **USDC / on-ramps:** Base + Circle USDC path is straightforward for bootstrap.
- **Polymarket CLOB** patterns are **EVM-native** (EIP-712); mirroring signing flows is simpler on EVM.
- **Solana + token + custom bridge** multiplies security and audit surface **before** product-market fit.

---

## Decision process (recommended)

1. **Week 1–2 spike (Linear):** “Solana Anchor: hello-world market program + RPC latency benchmark” vs “Base: deploy existing Market/Collateral to Base Sepolia + one user flow.”
2. **Score:** dev velocity, custody model, oracle integration cost, on-ramp UX, legal/token complexity.
3. **Outcome:** Either **confirm ADR-0001** or **supersede** with new ADR “Primary chain: Solana” + migration plan.

---

## Consequences

- Until ADR-0003 is **Accepted** with Solana: **default implementation remains Base**.
- Grok epics in Linear may include Solana-specific tasks marked **blocked on ADR-0003**.

---

## References

- [Grok integration plan](../plans/grok-plan-integration.md)
- [Base docs](https://docs.base.org)
- [Solana docs](https://solana.com/docs)
- [Anchor book](https://www.anchor-lang.com/)
