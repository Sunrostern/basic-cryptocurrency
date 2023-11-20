const { ethers } = require('hardhat');

async function main() {
  // Fetching the Contract to deploy.
  const TokenContractFactory = await ethers.getContractFactory('Token');

  // Deploying the fetched Contract.
  const TokenContract = await TokenContractFactory.deploy('Token', 'TOK', 1000000);
  await TokenContract.deployed();
  console.log(`Token deployed to address ${TokenContract.address}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
