"use client";

import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  usePublicClient,
  useReadContract,
} from "wagmi";
import { erc20Abi, parseUnits } from "viem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CONTRACT_ADDRESS, USDC_ADDRESS, VAULT_ABI } from "@/constants";

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
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 mb-10">
      <CardHeader>
        <CardTitle>Vault</CardTitle>
        <CardDescription>Deposit and withdraw from the vault</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="deposit">Deposit Amount</Label>
          <div className="flex space-x-2">
            <Input
              id="deposit"
              type="number"
              placeholder="0.0"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
            <Button
              onClick={handleDeposit}
              disabled={!depositAmount || isDepositLoading}
            >
              {isDepositLoading ? "Depositing..." : "Deposit"}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="withdraw">Withdraw Amount</Label>
          <div className="flex space-x-2">
            <Input
              id="withdraw"
              type="number"
              placeholder="0.0"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
            <Button
              onClick={handleWithdraw}
              disabled={!withdrawAmount || isWithdrawLoading}
            >
              {isWithdrawLoading ? "Withdrawing..." : "Withdraw"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
