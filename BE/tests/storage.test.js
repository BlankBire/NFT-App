const { expect } = require("chai"); // Moved to Hardhat-compatible version in BE/test/storage.test.js

const { ethers } = require("hardhat");

describe("Storage", function () {
  it("test initial value", async function () {
    const Storage = await ethers.getContractFactory("Storage");
    const storage = await Storage.deploy();
    await storage.waitForDeployment();
    console.log("storage deployed at:" + storage.target);
    const value = await storage.retrieve();
    expect(Number(value)).to.equal(0);
  });
  it("test updating and retrieving updated value", async function () {
    const Storage = await ethers.getContractFactory("Storage");
    const storage = await Storage.deploy();
    await storage.waitForDeployment();
    const storage2 = await ethers.getContractAt("Storage", storage.target);
    const setValue = await storage2.store(56);
    await setValue.wait();
    const newVal = await storage2.retrieve();
    expect(Number(newVal)).to.equal(56);
  });
});
