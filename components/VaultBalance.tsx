"use client";

import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { CONTRACT_ADDRESS, VAULT_ABI } from "@/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 mb-10">
      <CardHeader>
        <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Vault Overview
        </CardTitle>
        <CardDescription>Current vault statistics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Your Balance
            </p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {userBalance ? formatUnits(userBalance, 6) : "0"} shares
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Assets
            </p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {totalAssets ? formatUnits(totalAssets, 6) : "0"} USDC
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
