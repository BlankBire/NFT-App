const { ethers } = require("hardhat");

async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT");
  const mynft = await MyNFT.deploy();
  await mynft.waitForDeployment();
  console.log("MyNFT deployed at:", mynft.target);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
