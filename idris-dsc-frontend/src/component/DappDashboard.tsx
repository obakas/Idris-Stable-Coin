"use client";

import { useState, useEffect } from "react";
import { writeContract, readContract, waitForTransactionReceipt } from "@wagmi/core";
import { parseEther, formatEther } from "viem";
import toast from "react-hot-toast";
import {stableCoinABI, stableCoinAddress} from "@/constants";
import { useChainId, useConfig, useAccount } from "wagmi";

export default function DappDashboard(){
    const [isMinting, setIsMinting] = useState(false);
    const [isBurning, setIsBurning] = useState(false);
    const [fundAmount, setFundAmount] = useState("");
    const [isFetchingBalance, setIsFetchingBalance] = useState(false);
    const config = useConfig();
    const chainId = useChainId();
    const { address: userAddress } = useAccount();


    const fetchBalance = async () => {
        if (!userAddress) return;
        setIsFetchingBalance(true);
        try {
            const balance = await readContract(config,{
            address: stableCoinAddress,
            abi: stableCoinABI,
            functionName: "getAddressToAmmountFunded",
            args: [userAddress],
            chainId,
        });
        setUserBalance(formatEther(balance as bigint));
        } catch (err: any) {
        toast.error(`Couldn't fetch balance: ${err.message || err}`);
        } finally {
        setIsFetchingBalance(false);
        }
    };

    const handleMint = async() => {
        setIsMinting(true);
        const toastId = toast.loading("Minting 100 DSC...");

        try{
            const tx = await writeContract(config, {
                address: stableCoinAddress,
                abi: stableCoinABI,
                functionName: 'mintDsc',
                chainId,
                value: parseEther(fundAmount),
            });
            await waitForTransactionReceipt(config,{ hash: tx });
            toast.success("Minting complete!", { id: toastId });
            fetchBalance();
        } catch (err: any) {
            toast.error(`Minting failed: ${err.message || err}`, { id: toastId });
        } finally {
            setIsMinting(false);
        }
    };

    const handleBurn = async() => {
        setIsMinting(true);
        const toastId = toast.loading("Burning 100 DSC...");
    }
    
    return (
        <div className="space-y-4">
            {/* <div className="text-sm text-gray-700">
                <p>Your address: {address}</p>
                <p>DSC Balance: {Number(balance) / 1e18}</p>
            </div> */}

            {/* mint */}
            <button
            onClick={handleMint}
            disabled={isMinting}
            className={`w-full py-2 px-4 rounded-md transition-colors duration-200
            ${isMinting ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}
            text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
        >
            {isMinting ? (
            <span className="flex items-center justify-center gap-2">
                <Spinner /> Minting 100 DSC...
            </span>
            ) : (
            "Mint 100 DSC"
            )}
            </button>

            {/* burn */}
            <button
            onClick={handleBurn}
            disabled={isBurning}
            className={`w-full py-2 px-4 rounded-md transition-colors duration-200
            ${isBurning ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}
            text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
        >
            {isBurning ? (
            <span className="flex items-center justify-center gap-2">
                <Spinner /> Burning 100 DSC...
            </span>
            ) : (
            "Burn 100 DSC"
            )}
            </button>
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