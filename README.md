# IdrisDSCengine

## Overview

**IdrisDSCengine** is the core contract of the **Idris Decentralized Stablecoin (DSC) System**. This protocol is designed to ensure a 1:1 peg between the DSC token and the US dollar by enforcing an over-collateralized model.

Key properties of the system:
- **Exogenously Collateralized:** Uses external assets as collateral (WETH, WBTC, etc.).
- **Dollar Pegged:** Maintains a value of $1 per DSC.
- **Algorithmically Stable:** Implements automated mechanisms to ensure stability.

This contract manages:
- Depositing and withdrawing collateral
- Minting and burning DSC tokens
- Liquidation of undercollateralized positions

## Features
- **Overcollateralization:** Ensures collateral value is always greater than DSC minted.
- **Efficient Minting & Redemption:** Users can mint DSC by depositing collateral and redeem collateral by burning DSC.
- **Health Factor Enforcement:** Liquidation mechanisms maintain system solvency.
- **Chainlink Price Feeds:** Ensures accurate collateral valuation.
- **No Governance & Fees:** Unlike MakerDAO’s DAI, this system has no governance or fees.

## Smart Contract Architecture

### Contract: `IdrisDSCengine`

### Imports
- `AggregatorV3Interface` (Chainlink for price feeds)
- `ReentrancyGuard` (Prevents reentrancy attacks)
- `IERC20` (ERC-20 token interface)
- `IdrisStablecoin` (DSC token contract)

### State Variables
- **`i_dsc`**: Reference to the DSC token contract.
- **Collateral Management:** Mappings for collateral deposits and price feeds.
- **Liquidation Parameters:** Constants defining liquidation threshold, bonus, and precision.

### Modifiers
- `moreThanZero(uint256 amount)`: Ensures the amount is greater than zero.
- `isAllowedToken(address token)`: Ensures token is in the allowed collateral list.

### Events
- `CollateralDeposited(user, token, amount)`: Logs collateral deposits.
- `CollateralRedeemed(redeemFrom, redeemTo, token, amount)`: Logs collateral redemptions.

## Core Functions

### **User Actions**
- `depositCollateralAndMintDsc(token, amountCollateral, amountDscToMint)`: Deposits collateral and mints DSC in one transaction.
- `redeemCollateralForDsc(token, amountCollateral, amountDscToBurn)`: Burns DSC and withdraws collateral.
- `redeemCollateral(token, amountCollateral)`: Withdraws collateral (if no DSC is minted).
- `burnDsc(amount)`: Burns DSC to reduce debt risk.

### **Liquidation Mechanism**
- `liquidate(collateral, user, debtToCover)`: Liquidates undercollateralized accounts by burning DSC and claiming collateral with a bonus.

### **Collateral & Health Factor Calculation**
- `calculateHealthFactor(totalDscMinted, collateralValueInUsd)`: Computes user’s health factor.
- `getAccountCollateralValue(user)`: Returns total collateral value in USD.
- `getTokenAmountFromUsd(token, usdAmountInWei)`: Converts USD value to token amount.

### **Internal Functions**
- `_redeemCollateral(token, amount, from, to)`: Handles collateral withdrawals.
- `_burnDsc(amount, onBehalfOf, from)`: Handles DSC burning.
- `_healthFactor(user)`: Computes the health factor.
- `revertIfHealthFactorIsBroken(user)`: Prevents transactions that break the health factor.

## Deployment & Integration
- **Prerequisites:** Requires integration with `IdrisStablecoin` and Chainlink price feeds.
- **Compatible Tokens:** Supports WETH, WBTC, and other predefined ERC-20 tokens.

## Security Considerations
- Uses `ReentrancyGuard` to prevent reentrancy attacks.
- Implements strict access control via modifiers.
- Ensures price accuracy using Chainlink Oracles.
- Enforces overcollateralization to protect the DSC peg.

## Future Improvements
- Add multi-collateral support for broader asset backing.
- Implement automated liquidation bots for efficiency.
- Introduce stability fees or governance mechanisms.

## License
This project is licensed under the **MIT License**.

## Author
Developed by **Obaka Idris**.

---

### Contribution & Feedback
For contributions, suggestions, or bug reports, open an issue or submit a pull request.

