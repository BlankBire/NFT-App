# My NFT Application

Dự án này là một ứng dụng NFT đơn giản được xây dựng theo mô hình monorepo, bao gồm cả phần Backend (Smart Contract) và Frontend (React).

## Tổng quan dự án

Dự án cho phép người dùng mint NFT và xem bộ sưu tập NFT thông qua một giao diện web trực quan.

- **BE (Backend):** Sử dụng Hardhat và Ethers.js (v6) để phát triển, kiểm thử và triển khai Smart Contract.
- **FE (Frontend):** Ứng dụng React kết nối với Smart Contract để thực hiện các chức năng mint và xem bộ sưu tập NFT.

## Cấu trúc thư mục

```text
my-nft-app/
├── BE/                 # Workspace Hardhat (Smart Contracts, Tests, Scripts)
├── FE/                 # Ứng dụng React (Giao diện người dùng)
├── .gitignore          # Cấu hình bỏ qua các tệp không cần thiết cho Git
└── README.md           # Tệp hướng dẫn chính của dự án
```

## Yêu cầu hệ thống
- **Node.js:** Phiên bản 18 trở lên.
- **npm:** Trình quản lý gói đi kèm với Node.js.
- **MetaMask:** Tiện ích mở rộng trình duyệt và một tài khoản có sẵn trên mạng Sepolia (nếu muốn triển khai lên testnet).

## Cài đặt nhanh

Để cài đặt tất cả các phụ thuộc cho cả Frontend và Backend, hãy chạy các lệnh sau:

```powershell
# Di chuyển vào thư mục Backend và cài đặt
cd BE
npm install

# Di chuyển vào thư mục Frontend và cài đặt
cd ../FE
npm install

# Trở lại thư mục gốc
cd ..
```

## Backend (Hardhat)

Mọi thao tác liên quan đến Smart Contract được thực hiện trong thư mục `BE/`.

### Các lệnh hữu ích:

```powershell
# Biên dịch Smart Contract
npm run compile

# Chạy unit test
npm test

# Khởi động node Hardhat cục bộ
npm run node

# Triển khai hợp đồng lên node cục bộ
npm run deploy:mynft
```

*Chi tiết xem thêm tại [BE README](file:///d:/my-nft-app/BE/README.md).*

## Frontend (React)

Phần giao diện người dùng được quản lý trong thư mục `FE/`.

### Khởi chạy:

```powershell
cd FE
npm start
```

*Chi tiết xem thêm tại [FE README](file:///d:/my-nft-app/FE/README.md).*

## Triển khai lên mạng thử nghiệm (Sepolia)

1. Tạo tệp `BE/.env` và cấu hình các thông số cần thiết (`RPC_URL`, `PRIVATE_KEY`).
2. Triển khai MyNFT lên Sepolia:
   ```powershell
   cd BE
   npm run deploy:mynft:sepolia
   ```

## Lưu ý quan trọng

- Luôn giữ bí mật các khóa riêng tư (`PRIVATE_KEY`) và API keys.
- Tệp `.env` đã được cấu hình trong `.gitignore` để tránh bị đẩy lên GitHub.
- Sau khi triển khai Smart Contract mới, đừng quên cập nhật địa chỉ hợp đồng trong tệp `.env` của Frontend.