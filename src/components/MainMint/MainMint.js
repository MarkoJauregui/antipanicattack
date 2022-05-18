import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import {
	Box,
	Button,
	Flex,
	Image,
	Input,
	Text,
	Link,
	Spacer,
} from '@chakra-ui/react';
import Logo from '../../assets/antipanicattacklogoblanco2.png';

import antiPanicAttackNFT from '../../AntiPanicAttackNFT.json';

const antiPanicAttackNFTAddress = '0x1A3D504513622C396601E4747e94d6fc75C73a7D';

const MainMint = ({ accounts, setAccounts }) => {
	const [mintAmount, setMintAmount] = useState(1);
	const isConnected = Boolean(accounts[0]);

	async function handleMint() {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(
				antiPanicAttackNFTAddress,
				antiPanicAttackNFT.abi,
				signer
			);
			try {
				const response = await contract.mint(BigNumber.from(mintAmount), {
					value: ethers.utils.parseEther(
						(Math.round(0.1 * mintAmount * 10) / 10).toString()
					),
				});
				console.log('response: ', response);
			} catch (err) {
				console.log('error: ', err);
			}
		}
	}

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
					width="550px"
					height="350px"
					padding="0"
					display="block"
					marginLeft="auto"
					marginRight="auto"
					paddingTop="200px"
				/>
				<Text
					fontSize="14px"
					letterSpacing=".1rem"
					lineHeight="1.5em"
					textShadow="0 2px 2px #000000"
					display="block"
					paddingTop="5px"
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
								marginTop="15px"
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
								marginTop="15px"
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
								marginTop="15px"
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
							marginTop="5px"
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

				<Spacer />
				<Link
					href="https://rinkeby.etherscan.io/address/0x1A3D504513622C396601E4747e94d6fc75C73a7D"
					isExternal
					textDecoration="none"
				>
					<Text color="White" fontSize="16px">
						Contract: 0x1A3D504513622C396601E4747e94d6fc75C73a7D
					</Text>
				</Link>
			</Box>
		</Flex>
	);
};

export default MainMint;
