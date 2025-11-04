# BE - Hardhat (MyNFT)

This backend is a Hardhat project to develop, test, and deploy smart contracts (Storage, Ballot, MyNFT).

## Install

```powershell
Set-Location -Path 'D:\my-nft-app\BE'
npm install
```

## Local dev

```powershell
npx hardhat compile
npx hardhat test  # tests live in `tests/`
```

Start a local node + deploy:

```powershell
npm run node
npm run deploy:storage
npm run deploy:mynft
```

## Sepolia deploy

1. Create `.env` from `.env.example` and fill:

```
SEPOLIA_RPC_URL=...
PRIVATE_KEY=0x...
ETHERSCAN_API_KEY=...
```

2. Deploy:

```powershell
npm run deploy:mynft:sepolia
```

3. Verify (optional):

```powershell
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

## Notes

- Unified structure:
  - Tests: `tests/` (Hardhat JS tests). Remix Solidity test lives in `tests/remix/` and is ignored by Hardhat.
  - Scripts: `scripts/` (Hardhat). Remix helper scripts live in `scripts/remix/`.
- Ethers v6 APIs are used in tests and deploy scripts.
