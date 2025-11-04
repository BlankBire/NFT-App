// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public constant MAX_SUPPLY = 100; // Giới hạn tổng cung
    uint256 public mintFee = 0.01 ether; // Phí mint mỗi NFT

    constructor() ERC721("MyNFTCollection", "MNC") Ownable() {}

    function safeMint(address to, string memory uri) public payable onlyOwner {
        require(_tokenIds.current() < MAX_SUPPLY, "Max supply reached");
        require(msg.value >= mintFee, "Insufficient mint fee");

        uint256 tokenId = _tokenIds.current();
        _tokenIds.increment();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // Hàm cho chủ sở hữu thay đổi phí mint
    function setMintFee(uint256 newFee) external onlyOwner {
        mintFee = newFee;
    }

    // Hàm cho chủ sở hữu rút ETH đã nhận từ phí mint
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // Hàm liệt kê tất cả tokenId mà người dùng sở hữu
    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](balance);
        for (uint256 i = 0; i < balance; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(owner, i);
        }
        return tokenIds;
    }

    // Cần ghi đè các hook khi kết hợp ERC721Enumerable và ERC721URIStorage
    function _beforeTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    // Ghi đè _burn vì cả ERC721 và ERC721URIStorage đều triển khai nó
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    // Trả về metadata URL
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // Khai báo interface hỗ trợ
    function supportsInterface(bytes4 interfaceId) public view override(ERC721Enumerable, ERC721URIStorage) returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}