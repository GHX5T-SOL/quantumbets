# ADR-0001: Default L2 and Custody Model

**Status:** Accepted  
**Date:** 2025-03-19  
**Authors:** Ghost, Zoro

---

## Context

We need to choose a default EVM L2 for the prediction market platform, define the custody model, and confirm the no-token MVP path. This affects smart contract deployment, wallet integration, on-ramp providers, and oracle design.

---

## Decision

### 1. Default L2: **Base**

**Rationale:**

- **Ecosystem:** Strong Coinbase/Base ecosystem; many on-ramp providers (MoonPay, Transak, Ramp) support Base natively
- **Cost:** Low gas fees for retail users; suitable for high-frequency trading UX
- **Wallet support:** Full MetaMask, WalletConnect, Rainbow, etc.
- **Polymarket alignment:** Polymarket uses Polygon; Base is EVM-equivalent for our stack—we can add Polygon as a secondary chain later if needed for cross-venue arbitrage display
- **Developer experience:** Same tooling as Ethereum (Hardhat, Foundry, ethers.js)

**Alternative considered:** Polygon PoS — also viable; we defer Polygon as Phase 2+ if we need multi-chain or Polymarket-native flows.

### 2. Custody Model: **Non-Custodial (User Wallets)**

- Users connect their own wallets (MetaMask, etc.)
- Collateral stays in user-controlled wallets or in **user-specific escrow contracts** (not a shared hot wallet)
- Platform never holds private keys; we only facilitate signing for orders and withdrawals
- **Hot wallet** (if any) is only for protocol fees/treasury, not user funds

### 3. No-Token MVP Path

- **MVP collateral:** USDC (or bridged USDC) on Base
- **No native token** until: (a) legal clarity, (b) audit, (c) clear utility spec
- **Bridge:** Use **canonical Circle USDC** on Base; avoid custom bridge in MVP

---

## Consequences

- All smart contracts target Base (chainId 8453 mainnet, 84532 testnet)
- RPC: Alchemy/QuickNode/Public for Base
- On-ramp: Prefer providers with Base support (MoonPay, Transak, Ramp)
- Oracle and market contracts deploy to Base testnet first, then mainnet after audit

---

## References

- [Base docs](https://docs.base.org)
- [Circle USDC on Base](https://www.circle.com/en/multi-chain-usdc)
