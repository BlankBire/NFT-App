// src/App.js
import { useState } from "react";
import { ethers } from "ethers";
import MyNFT_ABI from "./utils/MyNFT.json";
import "./App.css";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const metadataURI = process.env.REACT_APP_METADATA_URI;

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [mintingStatus, setMintingStatus] = useState(null);
  const [txHash, setTxHash] = useState(null);

  const [tokenId, setTokenId] = useState("");
  const [nftInfo, setNftInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [errorInfo, setErrorInfo] = useState("");

  const [myCollection, setMyCollection] = useState([]);
  const [loadingCollection, setLoadingCollection] = useState(false);

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected account:", accounts[0]);
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else {
      console.log("Please install MetaMask!");
      alert("Please install MetaMask!");
    }
  }

  async function handleMint() {
    if (!walletAddress) {
      alert("Please connect your wallet first.");
      return;
    }

    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // Khởi tạo đối tượng Contract
      const nftContract = new ethers.Contract(
        contractAddress,
        MyNFT_ABI,
        signer
      );

      try {
        setMintingStatus(
          "Minting... Vui lòng xác nhận giao dịch trên MetaMask."
        );
        setTxHash(null);

        // Gọi hàm safeMint từ Smart Contract
        const mintFee = ethers.utils.parseEther("0.01");
        const tx = await nftContract.safeMint(walletAddress, metadataURI, {
          value: mintFee,
        });
        console.log("Transaction sent:", tx.hash);

        setMintingStatus("Đang chờ giao dịch được xác nhận...");

        // Chờ giao dịch được xác nhận
        await tx.wait();

        console.log("Transaction confirmed!");
        setMintingStatus("Mint thành công!");
        setTxHash(tx.hash);
      } catch (error) {
        console.error("Minting failed:", error);
        setMintingStatus(`Mint thất bại: ${error.message}`);
      }
    }
  }

  async function fetchNFTInfo() {
    if (!tokenId) {
      alert("Vui lòng nhập Token ID!");
      return;
    }

    if (typeof window.ethereum === "undefined") {
      alert("Vui lòng cài MetaMask!");
      return;
    }

    setLoadingInfo(true);
    setErrorInfo("");
    setNftInfo(null);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const nftContract = new ethers.Contract(
        contractAddress,
        MyNFT_ABI,
        provider
      );

      const tokenURI = await nftContract.tokenURI(tokenId);
      console.log("Token URI:", tokenURI);

      // Nếu link ở dạng ipfs:// thì đổi thành https://gateway.pinata.cloud/ipfs/
      const metadataURL = tokenURI.startsWith("ipfs://")
        ? tokenURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
        : tokenURI;

      const response = await fetch(metadataURL);
      const metadata = await response.json();

      // Xử lý ảnh IPFS
      const imageURL = metadata.image.startsWith("ipfs://")
        ? metadata.image.replace(
            "ipfs://",
            "https://gateway.pinata.cloud/ipfs/"
          )
        : metadata.image;

      setNftInfo({
        name: metadata.name,
        description: metadata.description,
        image: imageURL,
      });
    } catch (error) {
      console.error("Lỗi khi lấy metadata:", error);
      setErrorInfo(
        "Không thể lấy thông tin NFT. Token ID có thể chưa tồn tại."
      );
    } finally {
      setLoadingInfo(false);
    }
  }

  async function fetchMyCollection() {
    if (!walletAddress) {
      alert("Vui lòng kết nối ví trước!");
      return;
    }

    setLoadingCollection(true);
    setMyCollection([]);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const nftContract = new ethers.Contract(
        contractAddress,
        MyNFT_ABI,
        provider
      );

      const balance = await nftContract.balanceOf(walletAddress);
      const totalNFTs = balance.toNumber();

      const collectionData = [];

      for (let i = 0; i < totalNFTs; i++) {
        const tokenId = await nftContract.tokenOfOwnerByIndex(walletAddress, i);
        const tokenURI = await nftContract.tokenURI(tokenId);

        const metadataURL = tokenURI.startsWith("ipfs://")
          ? tokenURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
          : tokenURI;

        const response = await fetch(metadataURL);
        const metadata = await response.json();

        const imageURL = metadata.image.startsWith("ipfs://")
          ? metadata.image.replace(
              "ipfs://",
              "https://gateway.pinata.cloud/ipfs/"
            )
          : metadata.image;

        collectionData.push({
          tokenId: tokenId.toString(),
          name: metadata.name,
          description: metadata.description,
          image: imageURL,
        });
      }

      setMyCollection(collectionData);
    } catch (error) {
      console.error("Lỗi khi lấy bộ sưu tập:", error);
      alert("Không thể tải bộ sưu tập NFT.");
    } finally {
      setLoadingCollection(false);
    }
  }

  // Giao diện cơ bản
  return (
    <div className="App">
      <header className="App-header">
        <h1>My NFT DApp</h1>

        <button onClick={connectWallet} className="connect-button">
          {walletAddress
            ? `Connected: ${walletAddress.substring(
                0,
                6
              )}...${walletAddress.substring(38)}`
            : "Connect Wallet"}
        </button>

        {walletAddress && (
          <>
            <div className="mint-container">
              <button onClick={handleMint} className="mint-button">
                Mint My NFT
              </button>

              {mintingStatus && <p className="status-text">{mintingStatus}</p>}

              {txHash && (
                <p className="tx-link">
                  Xem giao dịch:
                  <a
                    href={`https://sepolia.etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Etherscan
                  </a>
                </p>
              )}
            </div>

            <div className="mint-container">
              <h2>Xem thông tin NFT</h2>
              <input
                type="number"
                placeholder="Nhập Token ID..."
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                className="token-input"
              />
              <button onClick={fetchNFTInfo} className="connect-button">
                Xem NFT
              </button>

              {loadingInfo && <p>Đang tải thông tin NFT...</p>}
              {errorInfo && <p style={{ color: "red" }}>{errorInfo}</p>}

              {nftInfo && (
                <div className="nft-display">
                  <h3>{nftInfo.name}</h3>
                  <p>{nftInfo.description}</p>
                  <img
                    src={nftInfo.image}
                    alt={nftInfo.name}
                    className="nft-image"
                  />
                </div>
              )}
            </div>

            <div className="mint-container">
              <h2>Bộ sưu tập của tôi</h2>
              <button onClick={fetchMyCollection} className="connect-button">
                Xem Bộ sưu tập
              </button>

              {loadingCollection && <p>Đang tải bộ sưu tập...</p>}

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "20px",
                  marginTop: "20px",
                }}
              >
                {myCollection.map((nft) => (
                  <div
                    key={nft.tokenId}
                    className="nft-display"
                    style={{ width: "250px" }}
                  >
                    <img src={nft.image} alt={nft.name} className="nft-image" />
                    <h4>{nft.name}</h4>
                    <p>ID: {nft.tokenId}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
