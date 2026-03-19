# Legal Intake Packet — Counsel Engagement

**Purpose:** Provide counsel with sufficient context to advise on product classification, licensing, and jurisdictional risk for a prediction market platform.

---

## 1. Product Description

We are building a **trading-terminal-style** interface for event contracts (prediction markets). The product:

- Offers **SA-first liquidity** on local politics, sports, culture, and influencer events
- Positions for **global expansion** (name and branding are non-geographic)
- Presents as a **professional trading platform** (data, risk, execution transparency), not casino/gambling UX
- May aggregate **read-only** data from external venues (Polymarket, Kalshi) as optional modules
- Uses **crypto collateral** (EVM L2: Base or Polygon) with on/off-ramp providers
- Employs a **hybrid AI+human oracle** for market resolution

---

## 2. User Flows (High Level)

1. **Registration:** Email or wallet-based sign-up
2. **Deposit:** Crypto on-ramp or direct wallet deposit
3. **Trading:** Buy/sell outcome shares on binary (and later multi-outcome) markets
4. **Resolution:** Oracle attests outcome; platform settles positions
5. **Withdrawal:** Crypto-out (fiat-out later, if compliant)

---

## 3. Fee Model

- **Trading fees:** Maker/taker (e.g., 2% default, configurable per market)
- **Market creation fees:** Per-market fee (e.g., 50 units for public, 100 for private)
- **Subscription/API:** Tiered access for data/API (future)

---

## 4. Jurisdictions

- **Primary launch:** South Africa (users, entity, operations)
- **Expansion:** Global (geo-gating and restricted-territories policy to be defined with counsel)

---

## 5. Token / Bridge Intent

- **MVP:** No native token; use existing stablecoin (USDC) or wrapped asset as collateral
- **Future:** Token utility (governance, staking, fees) and custom bridge only if legally viable and post-audit

---

## 6. Questions for Counsel

1. How is this product classified under SA law: gambling, derivatives, information service, or other?
2. What licensing (national/provincial) is required before accepting real-money users in SA?
3. What restrictions apply to advertising, KYC, and geo-blocking?
4. What are the implications of aggregating/displaying data from Polymarket and Kalshi (US-regulated venues)?
5. What entity structure (Pty Ltd, etc.) and insurance/audit requirements are recommended?

---

## 7. Next Steps

- [ ] Schedule initial counsel call
- [ ] Provide this packet + any supplementary materials
- [ ] Draft restricted-territories policy based on counsel input
- [ ] Version-control all legal docs in `docs/legal/`
