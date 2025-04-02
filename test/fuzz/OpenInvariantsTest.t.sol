// // SPDX-License-Identifier: MIT

// pragma solidity ^0.8.28;

// import {Test} from "forge-std/Test.sol";
// import{StdInvariant} from "forge-std/Test.sol";
// import{DeployIdrisDSC} from "script/DeployIdrisDSC.s.sol";
// import{IdrisDSCengine} from "src/IdrisDSCengine.sol";
// import{IdrisStablecoin} from "src/IdrisStablecoin.sol";
// import{HelperConfig} from "script/HelperConfig.s.sol";
// import {IERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

// contract OpenInvariantsTest is StdInvariant, Test{
//     DeployIdrisDSC deployer;
//     IdrisDSCengine dsc;
//     IdrisStablecoin isc;
//     HelperConfig config;
//     IERC20 weth;
//     IERC20 wbtc;

//     function setUp() external {
//         deployer = new DeployIdrisDSC();
//         (isc, dsc, config) = deployer.run();
//         (,, address wethAddress, address wbtcAddress,) = config.activeNetworkConfig();
//         weth = IERC20(wethAddress);
//         wbtc = IERC20(wbtcAddress);
//         targetContract(address(dsc));
//         targetContract(address(dsc));

//     }

//     function invariantProtocolMustHaveMoreValueThanTotalSuppy() public view{
//         uint256 totalSupply = isc.totalSupply();
//         uint256 totalWethDeposited = IERC20(weth).balanceOf(address(dsc));
//         uint256 totalBtcDeposited = IERC20(wbtc).balanceOf(address(dsc));

//         uint256 wethValue = dsc.getUsdValue(address(weth), totalWethDeposited);
//         uint256 wbtcValue = dsc.getUsdValue(address(wbtc), totalBtcDeposited);

//         assert(wethValue + wbtcValue >= totalSupply);

//     }
// }
