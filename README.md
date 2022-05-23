# Anti Panic Attack NFT Collection!

This is the repo for the Anti Panic Attack NFT Collection by 72dpi. 

72dpi looked to find intersections of color combinations that can become hypnotic to the viewers and invite them
to zoom in and out while focusing, as a way of stimulating awareness and presence and in that way lower anxiety.

The files are prepared to be printed at 4500x800 pixels/ 62,5 x 111 inches/ 1.60 x 2 meters and they should be accompanied by a 432 h vibration when used for meditation. 


## Dependencies 

This project was created using...

- Node.JS 
- Hardhat 
- OpenZeppelin 
- Ethers
- React
- Chakra.UI.
- Infura

## Installation 

- Clone the repository by running `git clone https://github.com/MarkoJauregui/antipanicattack.git` or by downloading the zip.

- Once you're in your projects source folder, run `npm install`. That will make sure you have all the required dependencies installed.

## Usage

1. Run `npx hardhat clean` in your terminal. That will make sure it will delete the artifacts folder *in the odd case you might have it by default* 

2. Run `npx hardhat compile` In order to compile the smart contract in the `contracts/` folder.  Which will create the artifacts folder.

3. You can now run `npx hardhat test` to make sure the smart contract has no vulnerabilities. If you decide to add more tests go enter the `test/test.js` file.

4. Create an account on https://infura.io/. Once you do create a new project and make sure to select Ethereum as the product. After that select your preferred network for the deployment, this project is set to have Rinkeby by default. Save the endpoint of your chosen network, it should look like an url. On step *Replace step number* I will show you how to change the `hardhat.config.js` file depending on the network chosen. 

5. Make sure you have a Metamask account with some ETH on it. In order to get some fake one access a faucet, here is one you can use for Rinkebyhttps://faucet.rinkeby.io/. Once you have the account you want to deploy the contract in, go to your account details and extract your private key. **Make sure to not share this with anyone** 

6. Create an Etherscan account and get an API key https://etherscan.io/myapikey. Make sure to save that.

7. In your project source, create a `.env` file. We do this because `.env` files are automatically included in the `.gitignore` file. **This file should not be committed to Github. It's for personal use only**. 
  Create 3 different variables:

  ```
  REACT_APP_RINKEBY_RPC_URL = "Insert the Infura endpoint here"
  REACT_APP_ETHERSCAN_KEY = "Insert the Etherscan API"
  REACT_APP_PRIVATE_KEY = "Insert the private key of the account that will deploy the contract"
   ```
8. 

## Deployed Website 
https://delicate-malabi-8505f5.netlify.app/

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
