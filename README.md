# My NFT App (Monorepo)

A simple monorepo that contains:

- BE (Hardhat + Ethers v6): Smart contracts, tests, and deployment scripts
- FE (React): Minimal UI that can consume the deployed contract

This README is for the entire project at the repository root.

## Prerequisites

- Node.js 18+ and npm
- Windows PowerShell (commands below are PowerShell-friendly)
- Optional: MetaMask and a Sepolia testnet account if you plan to deploy to testnet

## Project structure

```
my-nft-app/
  BE/                 # Hardhat workspace (Solidity contracts, tests, scripts)
  FE/                 # React app (frontend)
  .gitignore          # Root ignore for both FE and BE
  README.md           # This file
```

BE highlights:

- Solidity: 0.8.30
- Tooling: hardhat ^2.19, @nomicfoundation/hardhat-toolbox ^4, ethers ^6
- OZ Contracts: ^4.9.3
- Tests (Mocha/Chai) under `BE/tests`

## Setup

Install dependencies for both workspaces.

```powershell
# From repo root
Set-Location -Path 'BE'
npm install

Set-Location -Path '..\FE'
npm install

# Go back to repo root when done
Set-Location -Path '..'
```

## Backend (Hardhat)

### Useful scripts

Run these from `BE/`:

```powershell
# Compile
npm run compile

# Run tests
npm test

# Start a local Hardhat node
npm run node

# Deploy contracts to local node (in another terminal)
# Make sure you have the local node running first
npm run deploy:mynft
npm run deploy:storage
```

### Deploy to Sepolia

1. Create `BE/.env` with:

```
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/<YOUR_ALCHEMY_KEY>
PRIVATE_KEY=<YOUR_WALLET_PRIVATE_KEY>
ETHERSCAN_API_KEY=<YOUR_ETHERSCAN_API_KEY>
```

2. Deploy MyNFT to Sepolia:

```powershell
Set-Location -Path 'BE'
npm run deploy:mynft:sepolia
```

The script will print the deployed address. Example (from a previous run):

```
MyNFT deployed at: <DEPLOYED_ADDRESS>
```

3. (Optional) Verify on Etherscan after a few minutes:

```powershell
npm run verify:mynft:sepolia -- <DEPLOYED_ADDRESS>
```

## Frontend (React)

Run from `FE/`:

```powershell
npm start
```

If your FE needs the contract address, add a small config file like `FE/src/utils/addresses.js`:

```js
export const MYNFT_ADDRESS = "<DEPLOYED_ADDRESS>";
```

The ABI is already provided at `FE/src/utils/MyNFT.json`. If you recompile contracts and ABI changes, re-copy the fresh artifact as needed.

## Git & GitHub

This project is now a single Git repository at the root (FE is not a nested repo anymore).

To push everything to GitHub (replace the URL with your repo):

```powershell
Set-Location -Path 'D:\my-nft-app'
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

## Troubleshooting

- PowerShell command separators like `||` are not supported; run commands separately or use `if (...) { ... }` blocks.
- Line ending warnings (LF↔CRLF) on Windows are harmless. You can add a `.gitattributes` to normalize line endings if desired.
- Hardhat tests failing after dependency updates? Reinstall in `BE/` and ensure `ethers` is v6 as expected.

## Notes

- Contracts live in `BE/contracts`. Main NFT contract is `MyNFT.sol`.
- Local development uses the Hardhat network; testnet deployment uses Sepolia via `.env` values.
- Keep secrets (private keys, RPC URLs) out of Git. `.gitignore` already excludes `.env` files.
