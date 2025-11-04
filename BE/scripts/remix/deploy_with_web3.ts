// @ts-nocheck
/* eslint-disable */
// Remix-only runner for web3 deploy helper.
import { deploy } from "./web3-lib";

(async () => {
  try {
    const result = await deploy("Storage", []);
    console.log(`address: ${result.address}`);
  } catch (e: any) {
    console.log(e.message);
  }
})();
