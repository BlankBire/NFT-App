# My NFT Frontend

Phần này của dự án chứa mã nguồn cho giao diện ứng dụng React (Frontend), cho phép người dùng tương tác với Smart Contract để mint và quản lý NFT.

## Công nghệ sử dụng

- **React:** Thư viện JavaScript để xây dựng giao diện người dùng.
- **Ethers.js (v5.7):** Thư viện để tương tác với mạng Ethereum.
- **Vanilla CSS:** Để tạo kiểu cho ứng dụng với giao diện hiện đại và tối giản.

## Khởi chạy ứng dụng

Đảm bảo đang ở trong thư mục `FE/`:

1. **Cài đặt phụ thuộc:**
   ```powershell
   npm install
   ```

2. **Cấu hình môi trường:**
   Tạo tệp `.env` dựa trên hướng dẫn bên dưới.

3. **Chạy ứng dụng ở chế độ phát triển:**
   ```powershell
   npm start
   ```
   Ứng dụng sẽ chạy tại [http://localhost:3000](http://localhost:3000).

## Cấu hình biến môi trường (.env)

Ứng dụng yêu cầu một số biến môi trường để hoạt động chính xác. Hãy tạo tệp `.env` trong thư mục `FE/` với nội dung sau:

```env
REACT_APP_CONTRACT_ADDRESS="ĐỊA_CHỈ_HỢP_ĐỒNG_ĐÃ_TRIỂN_KHAI"
REACT_APP_METADATA_URI="LINK_METADATA_IPFS_MẶC_ĐỊNH"
```

> [!IMPORTANT]
> Phải khởi động lại server (`npm start`) sau khi thay đổi tệp `.env`.

## Cấu trúc mã nguồn

- `src/App.js`: Thành phần chính chứa logic kết nối ví và tương tác với contract.
- `src/utils/MyNFT.json`: Tệp chứa ABI của Smart Contract.
- `src/App.css`: Chứa các quy tắc CSS cho giao diện người dùng.

## Chức năng chính

- **Connect Wallet:** Cho phép người dùng kết nối với ví MetaMask.
- **Mint NFT:** Người dùng có thể thanh toán một khoản phí nhỏ để đúc NFT mới.
- **View NFT Info:** Xem thông tin chi tiết của một NFT dựa trên Token ID.
- **My Collection:** Hiển thị danh sách tất cả các NFT mà người dùng đang sở hữu.

---