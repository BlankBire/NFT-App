# My NFT Backend (Hardhat)

Thư mục này chứa toàn bộ mã nguồn liên quan đến Smart Contract, bao gồm các hợp đồng, mã kiểm thử (tests) và các kịch bản triển khai (deployment scripts).

## Công nghệ sử dụng

- **Solidity (0.8.30):** Ngôn ngữ lập trình cho Smart Contract.
- **Hardhat:** Môi trường phát triển Ethereum mạnh mẽ.
- **Ethers.js (v6):** Thư viện để tương tác với mạng Ethereum.
- **OpenZeppelin Contracts:** Thư viện các hợp đồng thông minh tiêu chuẩn và bảo mật.

## Hướng dẫn bắt đầu

Đảm bảo đang ở trong thư mục `BE/`:

1. **Cài đặt phụ thuộc:**
   ```powershell
   npm install
   ```

2. **Biên dịch Smart Contract:**
   ```powershell
   npm run compile
   ```

3. **Chạy kiểm thử:**
   ```powershell
   npm test
   ```
   Các tệp kiểm thử nằm trong thư mục `tests/`.

## Triển khai Smart Contract

### Triển khai cục bộ (Local Development)

Khởi động một node Hardhat cục bộ:
```powershell
npm run node
```

Triển khai hợp đồng `MyNFT.sol` lên node cục bộ:
```powershell
npm run deploy:mynft
```

### Triển khai lên mạng Sepolia (Testnet)

1. Sao chép tệp `.env.example` thành `.env`:
   ```powershell
   cp .env.example .env
   ```
2. Điền đầy đủ các thông tin cấu hình:
   - `SEPOLIA_RPC_URL`: URL từ Alchemy hoặc Infura.
   - `PRIVATE_KEY`: Khóa riêng tư của ví MetaMask (Dùng ví phụ để đảm bảo an toàn).
   - `ETHERSCAN_API_KEY`: API Key để xác minh contract trên Etherscan.

3. Thực hiện triển khai:
   ```powershell
   npm run deploy:mynft:sepolia
   ```

## Cấu trúc thư mục

- `contracts/`: Chứa các tệp Solidity (.sol). Hợp đồng chính là `MyNFT.sol`.
- `tests/`: Chứa các kịch bản kiểm thử sử dụng Mocha/Chai.
- `scripts/`: Chứa các script triển khai và tiện ích.
- `hardhat.config.js`: Cấu hình mạng lưới và các plugin cho Hardhat.

## Lưu ý

- Dự án sử dụng **Ethers.js v6**, vì vậy hãy chú ý các thay đổi về cú pháp so với v5 trong các script và test.
- Khi triển khai lên mạng thật hoặc testnet, hãy luôn kiểm tra kỹ số dư và cấu hình mạng trong `hardhat.config.js`.

---