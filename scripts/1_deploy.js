const { ethers } = require("hardhat");

async function main() {
  // Fetching the Contract to deploy.
  const TokenContract = await ethers.getContractFactory("Token");

  // Deploying the fetched Contract.
  const token = await TokenContract.deploy();
  await token.deployed();
  console.log(`Token deployed to address ${token.address}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
