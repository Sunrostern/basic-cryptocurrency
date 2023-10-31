const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Token Contract', () => {
  let TokenContract;
  beforeEach(async () => {
    // Constructing the Token Factory.
    const TokenContractFactory = await ethers.getContractFactory('Token');

    // Deploying the Token Factory to the blockchain.
    TokenContract = await TokenContractFactory.deploy();
  });
  it('Has a correct name.', async () => {
    expect(await TokenContract.name()).to.equal('Token');
  })

  it('Has a correct symbol.', async () => {
    expect(await TokenContract.symbol()).to.equal('TOK');
  })

  it('Has a correct decimals value.', async () => {
    expect(await TokenContract.decimals()).to.equal(18);
  })
})