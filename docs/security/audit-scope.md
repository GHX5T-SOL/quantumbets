# External Audit Scope (Pre-Mainnet)

**Status:** Draft. Engage auditor before mainnet.

## In Scope

- `contracts/contracts/Collateral.sol`
- `contracts/contracts/Market.sol`
- Oracle resolution flow (off-chain → on-chain)
- Access control (owner, oracle roles)
- Reentrancy, overflow, access control
- Economic assumptions (pool math, fee handling)

## Out of Scope (Initial)

- Frontend
- API (non-custodial; no fund handling)
- Oracle worker implementation details (trusted operator model for v0)

## Deliverables

- Written report with findings (Critical, High, Medium, Low, Info)
- Remediation verification
- Final sign-off before mainnet deploy

## Recommended Firms

- OpenZeppelin
- Trail of Bits
- Consensys Diligence
- Code4rena (contest)

## Timeline

- RFP: 2–4 weeks before target mainnet
- Audit: 2–4 weeks
- Remediation: 1–2 weeks
- Re-audit of fixes if needed
