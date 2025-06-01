"use client";

import { useState, useEffect } from "react";
import { writeContract, readContract, waitForTransactionReceipt } from "@wagmi/core";
import { parseEther, formatEther } from "viem";
import toast from "react-hot-toast";
import { stableCoinABI, stableCoinAddress } from "@/constants";
import { useChainId, useConfig, useAccount } from "wagmi";


type CollateralItem = {
    symbol: string;
    amount: string;
    value: string; // USD value
};

export default function UserDashboard() {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const config = useConfig();

    const [dscBalance, setDscBalance] = useState<string>("0");
    const [healthFactor, setHealthFactor] = useState<number>(0);
    const [collaterals, setCollaterals] = useState<CollateralItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMinting, setIsMinting] = useState(false);

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            if (!isConnected || !address) return;

            try {
                setIsLoading(true);

                // Fetch DSC balance
                const balance = await readContract(config, {
                    address: stableCoinAddress,
                    abi: stableCoinABI,
                    functionName: "getAccountInformation",
                    args: [address],
                    chainId
                });
                setDscBalance(formatEther(balance as bigint));

                // Mock health factor (replace with actual contract call)
                setHealthFactor(1.85);

                // Mock collateral data
                setCollaterals([
                    { symbol: "ETH", amount: "1.5", value: "$3,000" },
                    { symbol: "WBTC", amount: "0.2", value: "$5,800" },
                    { symbol: "LINK", amount: "150", value: "$2,100" }
                ]);

            } catch (error) {
                toast.error("Error fetching user data");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, [isConnected, address, chainId]);

    const handleMintDSC = async () => {
        if (!address) {
            toast.error("Please connect wallet");
            return;
        }

        try {
            setIsMinting(true);
            const amount = parseEther("100"); // Mint 100 DSC

            const hash = await writeContract(config, {
                address: stableCoinAddress,
                abi: stableCoinABI,
                functionName: "mintDsc",
                args: [address, amount],
                chainId
            });

            const receipt = await waitForTransactionReceipt(config, { hash });

            if (receipt.status === "success") {
                toast.success("Successfully minted DSC!");
                // Update balance
                const newBalance = await readContract(config, {
                    address: stableCoinAddress,
                    abi: stableCoinABI,
                    functionName: "getAccountInformation",
                    args: [address],
                    chainId
                });
                setDscBalance(formatEther(newBalance as bigint));
            }
        } catch (error) {
            toast.error("Minting failed");
            console.error(error);
        } finally {
            setIsMinting(false);
        }
    };

    const handleDepositCollateral = () => {
        toast.success("Deposit functionality would open here");
        // Actual implementation would connect to collateral contract
    };

    if (!isConnected) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Wallet Not Connected</h2>
                    <p className="text-gray-600">Please connect your wallet to view your dashboard</p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4"><Spinner /> Loading Dashboard...</h2>
                    <p className="text-gray-600">Fetching your account data</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">User Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* DSC Balance Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-md p-6 border border-blue-100">
                    <div className="flex items-center mb-4">
                        <div className="bg-indigo-500 rounded-lg p-2 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-700">DSC Balance</h2>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{dscBalance} DSC</p>
                </div>

                {/* Health Factor Card */}
                <div className={`rounded-2xl shadow-md p-6 border ${healthFactor < 1.5 ? "bg-gradient-to-br from-rose-50 to-amber-100 border-amber-200" : "bg-gradient-to-br from-emerald-50 to-green-100 border-green-100"
                    }`}>
                    <div className="flex items-center mb-4">
                        <div className={`rounded-lg p-2 mr-4 ${healthFactor < 1.5 ? "bg-amber-500" : "bg-green-500"
                            }`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-700">Health Factor</h2>
                    </div>
                    <div className="flex items-baseline">
                        <p className="text-3xl font-bold text-gray-900">{healthFactor.toFixed(2)}</p>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${healthFactor > 2 ? "bg-green-100 text-green-800" :
                                healthFactor > 1.5 ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
                            }`}>
                            {healthFactor > 2 ? "Excellent" : healthFactor > 1.5 ? "Moderate" : "Danger"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Collateral Section */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Your Collateral</h2>
                    <button
                        onClick={handleDepositCollateral}
                        className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Deposit Collateral
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 text-gray-500 text-sm">
                            <tr>
                                <th className="py-3 px-4 text-left">Asset</th>
                                <th className="py-3 px-4 text-left">Amount</th>
                                <th className="py-3 px-4 text-left">Value</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {collaterals.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center">
                                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                                            <span className="font-medium">{item.symbol}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 font-medium">{item.amount}</td>
                                    <td className="py-4 px-4 text-gray-600">{item.value}</td>
                                    <td className="py-4 px-4">
                                        <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                            Manage
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mint DSC Card */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl shadow-md p-6 border border-indigo-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Mint DSC Tokens</h2>
                        <p className="text-gray-600 max-w-lg">
                            Mint DSC tokens against your collateral. Ensure your health factor remains safe to avoid liquidation.
                        </p>
                    </div>
                    <button
                        onClick={handleMintDSC}
                        disabled={isMinting}
                        className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition duration-200 ${isMinting
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
                            }`}
                    >
                        {isMinting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <Spinner /> Processing...
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                                Mint DSC
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      ></path>
    </svg>
  );
}