const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
}

describe('Token Contract', () => {
  let accounts, deployer, TokenContract;
  beforeEach(async () => {
    // Constructing the Token Factory.
    const TokenContractFactory = await ethers.getContractFactory('Token');

    // Deploying the Token Factory to the blockchain.
    TokenContract = await TokenContractFactory.deploy('Token', 'TOK', 1000000);

    accounts = await ethers.getSigners();
    deployer = accounts[0].address;
  });

  describe('Deployment', () => {
    const name = 'Token';
    const symbol = 'TOK';
    const decimals = 18;
    const totalSupply = tokens('1000000');

    it('Has a correct name.', async () => {
      expect(await TokenContract.name()).to.equal(name);
    });

    it('Has a correct symbol.', async () => {
      expect(await TokenContract.symbol()).to.equal(symbol);
    });

    it('Has a correct decimals value.', async () => {
      expect(await TokenContract.decimals()).to.equal(decimals);
    });

    it('Has a correct total supply.', async () => {
      expect(await TokenContract.totalSupply()).to.equal(totalSupply);
    });

    it('Assigns total supply to a deployer.', async () => {
      expect(await TokenContract.balanceOf(deployer)).to.equal(totalSupply);
    });
  });
});