// @ts-nocheck
/* eslint-disable */
// Remix-only runner for ethers deploy helper.
import { deploy } from "./ethers-lib";

(async () => {
  try {
    const result = await deploy("Storage", []);
    console.log(`address: ${result.address}`);
  } catch (e: any) {
    console.log(e.message);
  }
})();
