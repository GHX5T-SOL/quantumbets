import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Collateral = await ethers.getContractFactory("Collateral");
  const collateral = await Collateral.deploy();
  await collateral.waitForDeployment();
  const collateralAddr = await collateral.getAddress();
  console.log("Collateral:", collateralAddr);

  const Market = await ethers.getContractFactory("Market");
  const market = await Market.deploy(collateralAddr);
  await market.waitForDeployment();
  const marketAddr = await market.getAddress();
  console.log("Market:", marketAddr);

  console.log("\nDone. Add to .env:");
  console.log(`COLLATERAL_ADDRESS=${collateralAddr}`);
  console.log(`MARKET_ADDRESS=${marketAddr}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
