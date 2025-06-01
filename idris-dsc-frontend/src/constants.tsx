export const stableCoinAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";


export const stableCoinABI = [
  {
    "type": "constructor",
    "inputs": [
      { "name": "tokenAddresses", "type": "address[]", "internalType": "address[]" },
      { "name": "priceFeedAddresses", "type": "address[]", "internalType": "address[]" },
      { "name": "dscAddress", "type": "address", "internalType": "address" }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "burnDsc",
    "inputs": [
      { "name": "amount", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "calculateHealthFactor",
    "inputs": [
      { "name": "totalDscMinted", "type": "uint256", "internalType": "uint256" },
      { "name": "collateralValueInUsd", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [
      { "name": "", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "depositCollateral",
    "inputs": [
      { "name": "tokenCollateralAddress", "type": "address", "internalType": "address" },
      { "name": "amountCollateral", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "depositCollateralAndMintDsc",
    "inputs": [
      { "name": "tokenCollateralAddress", "type": "address", "internalType": "address" },
      { "name": "amountCollateral", "type": "uint256", "internalType": "uint256" },
      { "name": "amountDscToMint", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getAccountCollateralValue",
    "inputs": [
      { "name": "user", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "totalCollateralValueInUsd", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAccountInformation",
    "inputs": [
      { "name": "user", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "totalDscMinted", "type": "uint256", "internalType": "uint256" },
      { "name": "collateralValueInUsd", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getCollateralBalanceOfUser",
    "inputs": [
      { "name": "user", "type": "address", "internalType": "address" },
      { "name": "token", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getCollateralTokenPriceFeed",
    "inputs": [
      { "name": "token", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "", "type": "address", "internalType": "address" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getCollateralTokens",
    "inputs": [],
    "outputs": [
      { "name": "", "type": "address[]", "internalType": "address[]" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getDsc",
    "inputs": [],
    "outputs": [
      { "name": "", "type": "address", "internalType": "address" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getHealthFactor",
    "inputs": [
      { "name": "user", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "liquidate",
    "inputs": [
      { "name": "collateral", "type": "address", "internalType": "address" },
      { "name": "user", "type": "address", "internalType": "address" },
      { "name": "debtToCover", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "mintDsc",
    "inputs": [
      { "name": "amountDscToMint", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "redeemCollateral",
    "inputs": [
      { "name": "tokenCollateralAddress", "type": "address", "internalType": "address" },
      { "name": "amountCollateral", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "redeemCollateralForDsc",
    "inputs": [
      { "name": "tokenCollateralAddress", "type": "address", "internalType": "address" },
      { "name": "amountCollateral", "type": "uint256", "internalType": "uint256" },
      { "name": "amountDscToBurn", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
]
