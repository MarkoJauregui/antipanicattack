//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AntiPanicAttackNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) walletMints;

    constructor() payable ERC721("AntiPanicAttack", "APA") {
        mintPrice = 0.1 ether;
        totalSupply = 0;
        maxSupply = 52;
        maxPerWallet = 7;
        withdrawWallet = msg.sender;
    }

    function setIsPublicMintEnabled(bool _isPubicMintEnabled)
        external
        onlyOwner
    {
        isPublicMintEnabled = _isPubicMintEnabled;
    }

    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(_tokenId), "Token does not exist!");
        return
            string(
                abi.encodePacked(
                    baseTokenUri,
                    Strings.toString(_tokenId),
                    ".json"
                )
            );
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}(
            ""
        );
        require(success, "Withdraw Failed!");
    }

    function mint(uint256 _quantity) public payable {
        require(isPublicMintEnabled, "Minting not enabled");
        require(msg.value == _quantity * mintPrice, "Wrong mint value");
        require(totalSupply + _quantity <= maxSupply, "Sold Out!");
        require(
            walletMints[msg.sender] + _quantity <= maxPerWallet,
            "Exceeds Wallet mints"
        );

        for (uint256 i = 0; i < _quantity; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}
