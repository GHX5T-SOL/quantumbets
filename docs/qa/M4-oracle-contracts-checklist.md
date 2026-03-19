# QA Checklist: M4 — Oracle + Contracts

- [ ] Contracts compile: `cd contracts && npm run build`
- [ ] Deploy script runs on local Hardhat node
- [ ] Oracle worker starts: `cd services/oracle && npm run dev`
- [ ] Oracle /health returns 200
- [ ] Oracle /attestations returns array (after 5 min)
- [ ] Admin oracle dashboard loads attestations
- [ ] Dispute window logic: 4h after attestation
