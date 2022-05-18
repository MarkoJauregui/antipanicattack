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
				const response = await contract.mint(BigNumber.from(mintAmount), {
					value: ethers.utils.parseEther((0.1 * mintAmount).toString()),
				});
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
		<Flex justify="center" align="center" height="100vh" paddingBottom="550px">
			<Box width="820px">
				<Image
					src={Logo}
					width="500px"
					height="500px"
					padding="0"
					display="block"
					marginLeft="auto"
					marginRight="auto"
					paddingTop="200px"
				/>
				<Text
					fontSize="25px"
					letterSpacing="-5.5%"
					textShadow="0 2px 2px #000000"
					display="block"
					marginTop="auto"
					position="relative"
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
					<Text
						marginTop="70px"
						fontSize="30px"
						letterSpacing="-5.5%"
						fontFamily="inherit"
						textShadow="0 3px #000000"
						color="#FFD700"
					>
						Connect Wallet to Mint
					</Text>
				)}
			</Box>
		</Flex>
	);
};

export default MainMint;
