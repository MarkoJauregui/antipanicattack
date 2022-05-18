import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react';
import Logo from '../../assets/antipanicattacklogoblanco2.png';

import antiPanicAttackNFT from '../../AntiPanicAttackNFT.json';

const antiPanicAttackNFTAddress = '0x1A3D504513622C396601E4747e94d6fc75C73a7D';

const MainMint = ({ accounts, setAccounts }) => {
	const [mintAmount, setMintAmount] = useState(1);
	const isConnected = Boolean(accounts[0]);

	const handleMint = async () => {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum); //connect ethers to blockchain
			const signer = provider.getSigner();
			const contract = new ethers.Contract(
				antiPanicAttackNFTAddress,
				antiPanicAttackNFT.abi,
				signer
			);

			try {
				const response = await contract.mint(BigNumber.from(mintAmount));
				console.log('response: ', response);
			} catch (error) {
				console.log('error: ', error);
			}
		}
	};

	const handleDecrement = () => {
		if (mintAmount <= 1) return;
		setMintAmount(mintAmount - 1);
	};

	const handleIncrement = () => {
		if (mintAmount >= 7) return;
		setMintAmount(mintAmount + 1);
	};

	return (
		<Flex justify="center" align="center" height="100vh" paddingBottom="400px">
			<Box width="820px">
				<Image
					src={Logo}
					width="400px"
					height="400px"
					paddingTop="150px"
					bottom="0"
				/>
				<Text
					fontSize="22px"
					letterSpacing="-5.5%"
					textShadow="0 2px 2px #000000"
				>
					Intersections of color combinations that can become hypnotic to the{' '}
					<br />
					viewers and invite them to zoom in and out while focusing, as a way of{' '}
					<br />
					stimulating awareness and presence and in that way lower anxiety.
				</Text>
				{isConnected ? (
					<div>
						<Flex align="center" justify="center">
							<Button
								backgroundColor="#FFD700"
								borderRadius="5px"
								boxShadow="0px 2px 2px 1px #0f0f0f"
								color="black"
								cursor="pointer"
								fontFamily="inherit"
								padding="15px"
								marginTop="10px"
								onClick={handleDecrement}
							>
								-
							</Button>
							<Input
								readOnly
								fontFamily="inherit"
								width="100px"
								height="40px"
								textAlign="center"
								paddingLeft="19px"
								marginTop="10px"
								type="number"
								value={mintAmount}
							/>
							<Button
								backgroundColor="#FFD700"
								borderRadius="5px"
								boxShadow="0px 2px 2px 1px #0f0f0f"
								color="black"
								cursor="pointer"
								fontFamily="inherit"
								padding="15px"
								marginTop="10px"
								onClick={handleIncrement}
							>
								+
							</Button>
						</Flex>
						<Button
							backgroundColor="#FFD700"
							borderRadius="5px"
							boxShadow="0px 2px 2px 1px #0f0f0f"
							color="black"
							cursor="pointer"
							fontFamily="inherit"
							padding="15px"
							marginTop="10px"
							onClick={handleMint}
						>
							MINT NOW
						</Button>
					</div>
				) : (
					<p>Your wallet needs to be connected to Mint</p>
				)}
			</Box>
		</Flex>
	);
};

export default MainMint;
