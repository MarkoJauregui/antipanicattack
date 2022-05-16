const hre = require('hardhat');

async function main() {
	const AntiPanicAttackNFT = await hre.ethers.getContractFactory(
		'AntiPanicAttackNFT'
	);
	const antiPanicAttackNFT = await AntiPanicAttackNFT.deploy();

	await antiPanicAttackNFT.deployed();

	console.log('AntiPanicAttackNFT deployed to:', antiPanicAttackNFT.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
