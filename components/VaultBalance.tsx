"use client";

import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { CONTRACT_ADDRESS, VAULT_ABI } from "../constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export function VaultBalance() {
  const { address: userAddress } = useAccount();

  const { data: userBalance } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ABI,
    functionName: "balanceOf",
    args: [userAddress as `0x${string}`],
  });

  const { data: totalAssets } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ABI,
    functionName: "totalAssets",
  });

  return (
    <Card className="bg-gradient-to-br from-indigo-50/90 via-purple-50/90 to-pink-50/90 dark:from-indigo-950/90 dark:via-purple-950/90 dark:to-pink-950/90 backdrop-blur-sm border border-white/20 shadow-xl mb-10">
      <CardHeader>
        <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Vault Overview
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Current vault statistics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-xl bg-gradient-to-br from-white/80 to-white/40 dark:from-black/40 dark:to-black/20 backdrop-blur-sm border border-white/20 shadow-lg transition-transform duration-200 hover:scale-105">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Your Balance
            </p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              {userBalance ? formatUnits(userBalance, 6) : "0"} shares
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-white/80 to-white/40 dark:from-black/40 dark:to-black/20 backdrop-blur-sm border border-white/20 shadow-lg transition-transform duration-200 hover:scale-105">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Total Assets
            </p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              {totalAssets ? formatUnits(totalAssets, 6) : "0"} USDC
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
