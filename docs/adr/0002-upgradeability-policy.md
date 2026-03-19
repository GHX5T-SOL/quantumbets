# ADR-0002: Upgradeability Policy

**Status:** Accepted  
**Date:** 2025-03-19

---

## Context

Smart contracts may need fixes or feature additions after deployment. We need a policy for upgradeability.

---

## Decision

1. **MVP:** Use **non-upgradeable** contracts. Simplicity and auditability first.
2. **Post-MVP:** Consider **proxy pattern** (UUPS or TransparentProxy) for Market and Oracle contracts only if:
   - Audit recommends it
   - Clear upgrade path documented
   - Timelock + multisig for upgrade execution
3. **Collateral:** Never upgrade; use canonical USDC on Base for mainnet.
4. **Governance:** Upgrades require multi-sig (e.g. 2-of-2 founders) until DAO exists.

---

## Consequences

- Deploy scripts produce immutable contracts
- Any bug fix requires new deployment and migration
- Document all deployed addresses in `deployments/` with chain and block
