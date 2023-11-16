const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
}

describe('Token Contract', () => {
  let accounts, deployer, receiver, TokenContract;
  beforeEach(async () => {
    // Constructing the Token Factory.
    const TokenContractFactory = await ethers.getContractFactory('Token');

    // Deploying the Token Factory to the blockchain.
    TokenContract = await TokenContractFactory.deploy('Token', 'TOK', 1000000);

    accounts = await ethers.getSigners();
    deployer = accounts[0];
    receiver = accounts[1];
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
      expect(await TokenContract.balanceOf(deployer.address)).to.equal(totalSupply);
    });
  });

  describe('Sending Tokens', () => {
    describe('Success', () => {
      let amount, result, transaction;

      beforeEach(async () => {
        amount = tokens(100);
        transaction = await TokenContract.connect(deployer).transfer(receiver.address, amount);
        result = await transaction.wait();
      });

      it('Transfers Token balances.', async () => {
        expect(await TokenContract.balanceOf(deployer.address)).to.equal(tokens(1000000 - 100));
        expect(await TokenContract.balanceOf(receiver.address)).to.equal(tokens(100));
      });

      it('Emits the Transfer event.', async () => {
        const event = result.events[0];
        expect(event.event).to.equal('Transfer');

        const args = event.args;
        expect(args.from).to.equal(deployer.address);
        expect(args.to).to.equal(receiver.address);
        expect(args.value).to.equal(amount);
      });
    });

    describe('Failure', () => {
      let amount, result, transaction;

      it('Rejects insufficient Tokens.', async () => {
        amount = tokens(1000000 + 1);
        await expect(TokenContract.connect(deployer).transfer(receiver.address, amount)).to.be.revertedWith('Insufficient Token balance.');
      });

      it('Rejects an invalid recipient.', async () => {
        const amount = tokens(100);
        await expect(TokenContract.connect(deployer).transfer('0x0000000000000000000000000000000000000000', amount)).to.be.reverted;
      });
    });
  });
});