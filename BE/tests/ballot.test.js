const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ballot (converted from Remix .sol test)", function () {
  let ballot;

  beforeEach(async function () {
    const Ballot = await ethers.getContractFactory("Ballot");
    // candidate1 as bytes32 (ethers v6)
    const names = [ethers.encodeBytes32String("candidate1")];
    ballot = await Ballot.deploy(names);
    await ballot.waitForDeployment();
  });

  it("should allow voting and report winning proposal", async function () {
    const tx = await ballot.vote(0);
    await tx.wait();

    const winning = await ballot.winningProposal();
    expect(Number(winning)).to.equal(0);

    const winnerName = await ballot.winnerName();
    expect(winnerName).to.equal(ethers.encodeBytes32String("candidate1"));
  });
});
