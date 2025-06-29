'use client';

import { useState, useEffect } from 'react';
import {
  useAccount,
  useWriteContract,
  usePublicClient,
  useReadContract,
} from 'wagmi';
import { parseUnits } from 'viem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  CONTRACT_ADDRESS,
  USDC_ADDRESS,
  WBTW_ADDRESS,
  WETH_ADDRESS,
  VAULT_ABI,
  TESTNET_TOKEN_ABI,
} from '@/constants/index';

// Token configuration
const TOKENS = {
  USDC: {
    address: USDC_ADDRESS,
    name: 'USDC',
    symbol: 'USDC',
    decimals: 6,
    icon: '💵',
  },
  WBTW: {
    address: WBTW_ADDRESS,
    name: 'Wrapped BTW',
    symbol: 'WBTW',
    decimals: 8,
    icon: '₿',
  },
  WETH: {
    address: WETH_ADDRESS,
    name: 'Wrapped ETH',
    symbol: 'WETH',
    decimals: 18,
    icon: '⟠',
  },
} as const;

type TokenKey = keyof typeof TOKENS;

export function Vault() {
  const { address: userAddress } = useAccount();
  const { toast } = useToast();
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState<TokenKey>('USDC');
  const { writeContractAsync } = useWriteContract();
  const [isDepositLoading, setIsDepositLoading] = useState(false);
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false);
  const publicClient = usePublicClient();

  // Play sword sound function
  const playSwordSound = () => {
    try {
      const audio = new Audio('/audio/samurai-sword.mp3');
      audio.volume = 0.5;
      audio.play().catch(console.error);
    } catch (error) {
      console.error('Error playing sword sound:', error);
    }
  };

  const { refetch: refetchUserBalance } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ABI,
    functionName: 'balanceOf',
    args: [userAddress as `0x${string}`],
  });

  const { refetch: refetchTotalAssets } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ABI,
    functionName: 'totalAssets',
  });

  const handleDeposit = async () => {
    if (!depositAmount) return;

    try {
      setIsDepositLoading(true);
      const selectedTokenConfig = TOKENS[selectedToken];
      const parsedAmount = parseUnits(
        depositAmount,
        selectedTokenConfig.decimals,
      );

      // Approve token spending
      const approveTxHash = await writeContractAsync({
        address: selectedTokenConfig.address as `0x${string}`,
        abi: TESTNET_TOKEN_ABI,
        functionName: 'approve',
        args: [CONTRACT_ADDRESS as `0x${string}`, parsedAmount],
      });
      await publicClient?.waitForTransactionReceipt({
        hash: approveTxHash,
      });

      // Deposit token
      const txHash = await writeContractAsync({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: VAULT_ABI,
        functionName: 'depositToken',
        args: [
          selectedTokenConfig.address as `0x${string}`,
          parsedAmount,
          userAddress as `0x${string}`,
        ],
      });
      await publicClient?.waitForTransactionReceipt({ hash: txHash });

      await Promise.all([refetchUserBalance(), refetchTotalAssets()]);

      // Play sword sound on successful deposit
      playSwordSound();

      toast({
        title: 'Deposit successful',
        description: `Successfully deposited ${depositAmount} ${selectedTokenConfig.symbol}`,
        variant: 'success',
      });
      setDepositAmount('');
      setIsDepositLoading(false);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Please enter a valid amount',
        variant: 'destructive',
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
        functionName: 'withdraw',
        args: [
          parsedAmount,
          userAddress as `0x${string}`,
          userAddress as `0x${string}`,
        ],
      });
      await publicClient?.waitForTransactionReceipt({ hash: txHash });

      await Promise.all([refetchUserBalance(), refetchTotalAssets()]);

      toast({
        title: 'Withdrawal successful',
        description: `Successfully withdrew ${withdrawAmount} shares`,
        variant: 'success',
      });
      setWithdrawAmount('');
      setIsWithdrawLoading(false);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Please enter a valid amount',
        variant: 'destructive',
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
        {/* Token Selector */}
        <div className="space-y-2">
          <Label className="text-gray-700 dark:text-gray-200">
            Select Token
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(TOKENS).map(([key, token]) => (
              <button
                key={key}
                onClick={() => setSelectedToken(key as TokenKey)}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  selectedToken === key
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-purple-300'
                    : 'bg-white/50 dark:bg-black/20 border-purple-100 dark:border-purple-900 hover:bg-white/70 dark:hover:bg-black/30'
                }`}
              >
                <div className="text-2xl mb-1">{token.icon}</div>
                <div className="text-sm font-medium">{token.symbol}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="deposit" className="text-gray-700 dark:text-gray-200">
            Deposit Amount ({TOKENS[selectedToken].symbol})
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
                `Deposit ${TOKENS[selectedToken].symbol}`
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
                'Withdraw'
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
