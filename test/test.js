const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('AntiPanicAttackNFT Contract', function () {
	let AntiPanicAttackNFT, owner, addr1, addr2, addr3, antiPanicAttackNFT;

	beforeEach(async () => {
		[owner, addr1, addr2, addr3] = await ethers.getSigners();

		AntiPanicAttackNFT = await ethers.getContractFactory(
			'AntiPanicAttackNFT',
			owner
		);
		antiPanicAttackNFT = await AntiPanicAttackNFT.deploy();
	});

	describe('Deployment', async () => {
		it('Should set the right owner', async function () {
			expect(await antiPanicAttackNFT.owner()).to.equal(owner.address);
		});

		it('should be the right name', async () => {
			expect(await antiPanicAttackNFT.name()).to.equal('AntiPanicAttack');
		});

		it('should be the right symbol', async () => {
			expect(await antiPanicAttackNFT.symbol()).to.equal('APA');
		});
	});

	describe('mint Function', () => {
		it('should NOT allow the user to mint while setPublicMint is false', async () => {
			await antiPanicAttackNFT.connect(owner).setIsPublicMintEnabled(false);
			await expect(
				antiPanicAttackNFT.connect(addr1).mint(1, {
					value: ethers.utils.parseEther('0.1'),
				})
			).to.be.revertedWith('Minting not enabled');
		});
	});
});
