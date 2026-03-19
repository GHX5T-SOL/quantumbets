# Treasury Runbook

**Owner:** Ghost + Zoro  
**Last updated:** 2025-03-19

---

## Wallet Tiers

| Tier | Purpose | Max balance | Key storage |
|------|---------|-------------|-------------|
| Hot | Fees, small payouts | 1% of TVL or 10k USDC | Cloud KMS or encrypted env |
| Warm | Daily operations | 5% of TVL | Multisig 2-of-2 |
| Cold | Reserves | Remainder | Hardware wallet, offline |

## Operational Limits

- **Hot:** Auto-sweep above threshold to warm
- **Warm:** Manual approval for large transfers
- **Cold:** Timelock + multisig for any movement

## On-Ramp Flow

1. User deposits via embedded provider (MoonPay, Transak, Ramp)
2. Funds go to user wallet (non-custodial)
3. User approves Market contract; buys shares
4. Fees accrue to protocol treasury (warm wallet)

## Off-Ramp Flow

1. User sells shares; receives USDC to wallet
2. User uses provider's cash-out (if available) or external exchange
3. Protocol does not custody user fiat

## Incident Response

- Pause contract if exploit suspected
- Rotate hot wallet keys immediately
- Notify users via status page
- Post-mortem within 72h
