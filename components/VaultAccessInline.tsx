'use client';

import { useDisclosure } from '@nextui-org/react';
import { useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { CONTRACT_ADDRESS, VAULT_ABI } from '@/constants/index';
import TransactionModal from '@/components/modals';

export default function VaultAccessInline() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Get total assets in vault
  const { data: totalAssets } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ABI,
    functionName: 'totalAssets',
  });

  const formatTotalAssets = () => {
    if (!totalAssets) return '$0';
    const formatted = formatUnits(totalAssets, 6);
    const number = parseFloat(formatted);

    // Format with commas for thousands
    if (number >= 1000000) {
      return `$${(number / 1000000).toFixed(1)}M`;
    } else if (number >= 1000) {
      return `$${(number / 1000).toFixed(1)}K`;
    } else {
      return `$${number.toLocaleString()}`;
    }
  };

  return (
    <div className="mt-6 p-5 bg-white/5 backdrop-blur-sm border border-basement-cyan/20 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 rounded-full bg-basement-cyan animate-pulse"></div>
          <div>
            <p className="text-base font-basement text-white/90">
              <span className="text-basement-cyan font-bold">
                Vault is Live!
              </span>{' '}
              Join the Samurai warriors.
            </p>
            <p className="text-sm text-white/60 mt-1">
              Total Vault Assets:{' '}
              <span className="text-basement-cyan font-bold">
                {formatTotalAssets()}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="text-xs text-green-400 font-basement">ACTIVE</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-white/60">
          Multi-token deposits • AI-powered yields
        </p>
        <button
          onClick={onOpen}
          className="text-sm bg-basement-cyan text-black font-basement font-bold px-6 py-2 rounded-md hover:bg-cyan-400 transition-all duration-200 hover:scale-105 flex items-center gap-2"
        >
          <span>⚔️</span>
          Access Vault
        </button>
      </div>

      <TransactionModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
