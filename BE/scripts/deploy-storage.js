const { ethers } = require("hardhat");

async function main() {
  const Storage = await ethers.getContractFactory("Storage");
  const storage = await Storage.deploy();
  await storage.waitForDeployment();
  console.log("Storage deployed at:", storage.target);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
