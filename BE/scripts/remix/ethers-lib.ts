// @ts-nocheck
/* eslint-disable */
// This file is for Remix only. VS Code/Hardhat should ignore it.
import { ethers } from "ethers";

/**
 * Deploy the given contract
 * @param {string} contractName name of the contract to deploy
 * @param {Array<any>} args list of constructor' parameters
 * @param {Number} accountIndex account index from the exposed account
 * @return {Contract} deployed contract
 */
export const deploy = async (
  contractName: string,
  args: Array<any>,
  accountIndex?: number
): Promise<any> => {
  console.log(`deploying ${contractName}`);
  const artifactsPath = `browser/artifacts/${contractName}.json`;
  const metadata = JSON.parse(
    await remix.call("fileManager", "getFile", artifactsPath)
  );
  const signer = new (ethers as any).providers.Web3Provider(
    web3Provider
  ).getSigner(accountIndex);
  const factory = new ethers.ContractFactory(
    metadata.abi,
    metadata.data.bytecode.object,
    signer
  );
  const contract = await factory.deploy(...args);
  await contract.deployed();
  return contract;
};
