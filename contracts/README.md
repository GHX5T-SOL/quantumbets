# QuantumBets Contracts

Solidity contracts for Base (mainnet) and Base Sepolia (testnet).

## Setup

```bash
npm install
```

## Compile

```bash
npm run build
```

## Deploy (local Hardhat)

```bash
npx hardhat node
# In another terminal:
npx hardhat run scripts/deploy.ts --network localhost
```

## Deploy (Base Sepolia)

```bash
export PRIVATE_KEY=your_deployer_private_key
npx hardhat run scripts/deploy.ts --network baseSepolia
```

## Deploy (Base Mainnet)

```bash
export PRIVATE_KEY=your_deployer_private_key
npx hardhat run scripts/deploy.ts --network base
```

Add `COLLATERAL_ADDRESS` and `MARKET_ADDRESS` to your `.env` after deployment.
