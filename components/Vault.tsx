"use client";

import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  usePublicClient,
  useReadContract,
} from "wagmi";
import { erc20Abi, parseUnits } from "viem";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import { CONTRACT_ADDRESS, USDC_ADDRESS, VAULT_ABI } from "../constants/index";

export function Vault() {
  const { address: userAddress } = useAccount();
  const { toast } = useToast();
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const { writeContractAsync } = useWriteContract();
  const [isDepositLoading, setIsDepositLoading] = useState(false);
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false);
  const publicClient = usePublicClient();

  const { refetch: refetchUserBalance } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ABI,
    functionName: "balanceOf",
    args: [userAddress as `0x${string}`],
  });

  const { refetch: refetchTotalAssets } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ABI,
    functionName: "totalAssets",
  });

  const handleDeposit = async () => {
    try {
      setIsDepositLoading(true);
      const parsedAmount = parseUnits(depositAmount, 6);
      const approveTxHash = await writeContractAsync({
        address: USDC_ADDRESS as `0x${string}`,
        abi: erc20Abi,
        functionName: "approve",
        args: [CONTRACT_ADDRESS as `0x${string}`, parsedAmount],
      });
      await publicClient?.waitForTransactionReceipt({
        hash: approveTxHash,
      });

      const txHash = await writeContractAsync({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: VAULT_ABI,
        functionName: "deposit",
        args: [parsedAmount],
      });
      await publicClient?.waitForTransactionReceipt({ hash: txHash });

      await Promise.all([refetchUserBalance(), refetchTotalAssets()]);

      toast({
        title: "Deposit successful",
        description: `Successfully deposited ${depositAmount} tokens`,
        variant: "success",
      });
      setDepositAmount("");
      setIsDepositLoading(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      setIsDepositLoading(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      setIsWithdrawLoading(true);
      const parsedAmount = parseUnits(withdrawAmount, 6);
      const txHash = await writeContractAsync({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: VAULT_ABI,
        functionName: "withdraw",
        args: [parsedAmount],
      });
      await publicClient?.waitForTransactionReceipt({ hash: txHash });

      await Promise.all([refetchUserBalance(), refetchTotalAssets()]);

      toast({
        title: "Withdrawal successful",
        description: `Successfully withdrew ${withdrawAmount} shares`,
        variant: "success",
      });
      setWithdrawAmount("");
      setIsWithdrawLoading(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      setIsWithdrawLoading(false);
    }
  };

  if (!userAddress) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Vault</CardTitle>
          <CardDescription>
            Please connect your wallet to interact with the vault
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-indigo-50/90 via-purple-50/90 to-pink-50/90 dark:from-indigo-950/90 dark:via-purple-950/90 dark:to-pink-950/90 backdrop-blur-sm border border-white/20 shadow-xl mb-10">
      <CardHeader>
        <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Vault
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Deposit and withdraw from the vault
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="deposit" className="text-gray-700 dark:text-gray-200">
            Deposit Amount
          </Label>
          <div className="flex space-x-2">
            <Input
              id="deposit"
              type="number"
              placeholder="0.0"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-purple-100 dark:border-purple-900"
            />
            <Button
              onClick={handleDeposit}
              disabled={!depositAmount || isDepositLoading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-6 transition-all duration-200 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50"
            >
              {isDepositLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                  Depositing...
                </div>
              ) : (
                "Deposit"
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="withdraw"
            className="text-gray-700 dark:text-gray-200"
          >
            Withdraw Amount
          </Label>
          <div className="flex space-x-2">
            <Input
              id="withdraw"
              type="number"
              placeholder="0.0"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-purple-100 dark:border-purple-900"
            />
            <Button
              onClick={handleWithdraw}
              disabled={!withdrawAmount || isWithdrawLoading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6 transition-all duration-200 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50"
            >
              {isWithdrawLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                  Withdrawing...
                </div>
              ) : (
                "Withdraw"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
