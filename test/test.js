const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('AntiPanicAttackNFT Contract', function () {
	let AntiPanicAttackNFT, owner, addr1, addr2, antiPanicAttackNFT;

	beforeEach(async () => {
		[owner, addr1, addr2] = await ethers.getSigners();

		AntiPanicAttackNFT = await ethers.getContractFactory(
			'AntiPanicAttackNFT',
			owner
		);
		antiPanicAttackNFT = await AntiPanicAttackNFT.deploy();

		await antiPanicAttackNFT.connect(owner).setIsPublicMintEnabled(true);
	});

	describe('Deployment', async () => {
		it('Should set the right owner', async function () {
			expect(await antiPanicAttackNFT.owner()).to.equal(owner.address);
		});

		it('should be the right name', async () => {
			expect(await antiPanicAttackNFT.name()).to.equal('AntiPanicAttack');
		});

		// describe('Mint Function', async () => {
		// 	it('NOT correct Price', async () => {
		// 		antiPanicAttackNFT.connect(addr1).mint();
		// 	});
		// });
	});
});
