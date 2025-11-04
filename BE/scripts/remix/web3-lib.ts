// @ts-nocheck
/* eslint-disable */
// Remix-only Web3 deploy helper. VS Code/Hardhat should ignore this file.
import Web3 from "web3";
import { Contract, ContractSendMethod, Options } from "web3-eth-contract";

export const deploy = async (
  contractName: string,
  args: Array<any>,
  from?: string,
  gas?: number
): Promise<Options> => {
  const web3 = new Web3(web3Provider);
  console.log(`deploying ${contractName}`);
  const artifactsPath = `browser/artifacts/${contractName}.json`;
  const metadata = JSON.parse(
    await remix.call("fileManager", "getFile", artifactsPath)
  );
  const accounts = await web3.eth.getAccounts();
  const contract: Contract = new web3.eth.Contract(metadata.abi);
  const contractSend: ContractSendMethod = contract.deploy({
    data: metadata.data.bytecode.object,
    arguments: args,
  });
  const newContractInstance = await contractSend.send({
    from: from || accounts[0],
    gas: gas || 1500000,
  });
  return newContractInstance.options;
};
