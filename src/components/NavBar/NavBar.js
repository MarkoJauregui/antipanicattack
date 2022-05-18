import React from 'react';
import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import Behance from '../../assets/behance.png';
import Twitter from '../../assets/twitter.png';
import Email from '../../assets/email.png';

const NavBar = ({ accounts, setAccounts }) => {
	const isConnected = Boolean(accounts[0]);

	const connectAccount = async () => {
		if (window.ethereum) {
			const accounts = await window.ethereum.request({
				method: 'eth_requestAccounts',
			});
			setAccounts(accounts);
		}
	};

	return (
		<Flex justify="space-between" align="center" padding="30px">
			{/* Social Media Icons  */}
			<Flex justify="space-around" width="40%" padding="0 155px">
				<Link href="https://www.behance.net/hjauregui?tracking_source=search_users%7Chernan%20jauregui">
					<Image src={Behance} boxSize="30px" margin="0 10px" />
				</Link>
				<Link href="https://twitter.com/72dpiNFT">
					<Image src={Twitter} boxSize="30px" margin="0 10px" />
				</Link>
				<Link href="mailto:hjauregui@me.com">
					<Image src={Email} boxSize="30px" margin="0 10px" />
				</Link>
			</Flex>

			{/* Sections */}

			<Flex
				justify="space-around"
				align="center"
				width="40%"
				padding="30px 30px 30px 30px"
			>
				<Box margin="0 5px">
					<Link
						href="https://rinkeby.etherscan.io/address/0x1A3D504513622C396601E4747e94d6fc75C73a7D#writeContract"
						textDecoration="none"
						color="white"
						fontSize="16px"
					>
						Contract
					</Link>
				</Box>

				{/* <Box margin="0 15px">Mint</Box>
				<Spacer />
				<Box margin="0 15px">Team</Box>
				<Spacer /> */}

				{/* Connect Button */}
				{isConnected ? (
					<Box margin="0 5px">Connected</Box>
				) : (
					<Button
						backgroundColor="#FFD700"
						borderRadius="5px"
						boxShadow="0px 2px 2px 1px #0f0f0f"
						color="black"
						cursor="pointer"
						fontFamily="inherit"
						padding="15px"
						margin="0 15px"
						onClick={connectAccount}
					>
						Connect Wallet
					</Button>
				)}
			</Flex>
		</Flex>
	);
};

export default NavBar;
