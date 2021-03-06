const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('AntiPanicAttackNFT Contract', function () {
	let AntiPanicAttackNFT,
		owner,
		addr1,
		addr2,
		addr3,
		addr4,
		addr5,
		addr6,
		antiPanicAttackNFT;

	beforeEach(async () => {
		[owner, addr1, addr2, addr3, addr4, addr5, addr6] =
			await ethers.getSigners();

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

		it('Should NOT allow the user to mint more than the maxPerWallet', async () => {
			await antiPanicAttackNFT.connect(owner).setIsPublicMintEnabled(true);
			await expect(
				antiPanicAttackNFT
					.connect(addr1)
					.mint(8, { value: ethers.utils.parseEther('0.8') })
			).to.be.revertedWith('Exceeds Wallet mints');
		});

		it('Should NOT mint with wrong values', async () => {
			await antiPanicAttackNFT.connect(owner).setIsPublicMintEnabled(true);
			await expect(
				antiPanicAttackNFT
					.connect(addr1)
					.mint(2, { value: ethers.utils.parseEther('0.1') })
			).to.be.revertedWith('Wrong mint value');
		});

		it('Should NOT mint more than the maxSupply', async () => {
			const addrList = [owner, addr1, addr2, addr3, addr4, addr5, addr6];
			let maxSupply = 52;

			await antiPanicAttackNFT.connect(owner).setIsPublicMintEnabled(true);

			const mintValue = { value: ethers.utils.parseEther('0.7') };

			for (const addr of addrList) {
				if (maxSupply >= 52) {
					await antiPanicAttackNFT.connect(addr).mint(7, mintValue);
				} else {
					await expect(
						antiPanicAttackNFT.connect(owner).mint(7, mintValue)
					).to.be.revertedWith('Sold Out!');
				}
			}
		});

		it('Should Mint token', async () => {
			const baseUri = 'ipfs://test.url/';
			antiPanicAttackNFT.connect(owner).setBaseTokenUri(baseUri);

			await antiPanicAttackNFT.connect(owner).setIsPublicMintEnabled(true);

			await antiPanicAttackNFT
				.connect(addr1)
				.mint(1, { value: ethers.utils.parseEther('0.1') });

			expect(await antiPanicAttackNFT.tokenURI(1)).to.equal(baseUri + `1.json`);
			expect(await antiPanicAttackNFT.ownerOf(1)).to.equal(addr1.address);
		});
	});
});
