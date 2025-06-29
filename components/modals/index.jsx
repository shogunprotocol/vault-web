import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Button as NextUIButton, Tooltip, Tabs, Tab } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import Button from "../lunar/Button";
import { useAccount, useWriteContract, usePublicClient, useReadContract } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { useToast } from "../../hooks/use-toast";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CONTRACT_ADDRESS, USDC_ADDRESS, WBTW_ADDRESS, WETH_ADDRESS, VAULT_ABI, TESTNET_TOKEN_ABI } from "../../constants";

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
};

// Mint limits for testnet faucets
const MINT_LIMITS = {
  USDC: { amount: 10000, symbol: 'USDC' }, // 10,000 USDC max per faucet
  WBTW: { amount: 1, symbol: 'WBTC' }, // 1 WBTC max per faucet  
  WETH: { amount: 10, symbol: 'WETH' }, // 10 WETH max per faucet
};

const strategies = [
  {
    name: "deBridge",
    description: "Cross-chain bridging from Sonic to Arbitrum for Aave yield",
    icon: "🌉",
    details: "Secure cross-chain asset transfer to access higher Aave yields on Arbitrum",
    status: "Active",
    protocol: "Sonic to Arbitrum",
  },
  {
    name: "Beefy Finance",
    description: "Auto-compounding yield optimizer across multiple protocols",
    icon: "🐮",
    details: "Automated yield compounding to maximize returns with minimal gas costs",
    status: "Active",
    protocol: "Beefy",
  },
  {
    name: "Silo Finance",
    description: "Isolated lending markets with optimized risk management",
    icon: "💰",
    details: "AI-driven position management for maximum capital efficiency",
    status: "Active",
    protocol: "Silo",
  },
];

const TransactionModal = ({ isOpen, onClose, shouldOpenToMint = false }) => {
    const { address: userAddress } = useAccount();
    const { writeContractAsync } = useWriteContract();
    const publicClient = usePublicClient();
    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('deposit');
    const [selectedToken, setSelectedToken] = useState('USDC');
    const [selectedMintToken, setSelectedMintToken] = useState('USDC');
    const { toast } = useToast();

    // Add both success and error sound refs
    const successAudioRef = useRef(new Audio('/audio/samurai-sword.mp3'));
    const errorAudioRef = useRef(new Audio('/audio/error.mp3'));

    // Play sword sound function
    const playSwordSound = () => {
        try {
            successAudioRef.current.volume = 0.5;
            successAudioRef.current.play().catch(console.error);
        } catch (error) {
            console.error('Error playing sword sound:', error);
        }
    };

    // Contract read hooks for balances
    const { data: userBalance, refetch: refetchUserBalance } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: VAULT_ABI,
        functionName: "balanceOf",
        args: [userAddress],
    });

    const { data: totalAssets, refetch: refetchTotalAssets } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: VAULT_ABI,
        functionName: "totalAssets",
    });

    // Token balance hooks
    const { data: usdcBalance } = useReadContract({
        address: USDC_ADDRESS,
        abi: TESTNET_TOKEN_ABI,
        functionName: "balanceOf",
        args: [userAddress],
    });

    const { data: wbtwBalance } = useReadContract({
        address: WBTW_ADDRESS,
        abi: TESTNET_TOKEN_ABI,
        functionName: "balanceOf",
        args: [userAddress],
    });

    const { data: wethBalance } = useReadContract({
        address: WETH_ADDRESS,
        abi: TESTNET_TOKEN_ABI,
        functionName: "balanceOf",
        args: [userAddress],
    });

    // Get available balance for selected token
    const getAvailableBalance = () => {
        const balances = {
            USDC: usdcBalance,
            WBTW: wbtwBalance,
            WETH: wethBalance,
        };
        
        // Use different token based on active tab
        const tokenKey = activeTab === 'mint' ? selectedMintToken : selectedToken;
        const balance = balances[tokenKey];
        const tokenConfig = TOKENS[tokenKey];
        
        if (!balance || !tokenConfig) return "0";
        
        return formatUnits(balance, tokenConfig.decimals);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = async () => {
        if (!amount || isLoading) return;

        try {
            setIsLoading(true);
            const selectedTokenConfig = TOKENS[selectedToken];
            const parsedAmount = parseUnits(amount, selectedTokenConfig.decimals);

            if (activeTab === 'deposit') {
                try {
                    // First approve token spending
                    const approveTxHash = await writeContractAsync({
                        address: selectedTokenConfig.address,
                        abi: TESTNET_TOKEN_ABI,
                        functionName: "approve",
                        args: [CONTRACT_ADDRESS, parsedAmount],
                    });
                    
                    await publicClient?.waitForTransactionReceipt({
                        hash: approveTxHash,
                    });
                } catch (error) {
                    if (error.message.includes('User rejected') || error.message.includes('User denied')) {
                        errorAudioRef.current.play();
                        toast({
                            title: "Transaction Cancelled",
                            description: "You rejected the approval request",
                            variant: "warning",
                        });
                        throw new Error('User cancelled approval');
                    }
                    throw error;
                }

                try {
                    // Use depositToken function for multi-token support
                    const txHash = await writeContractAsync({
                        address: CONTRACT_ADDRESS,
                        abi: VAULT_ABI,
                        functionName: "depositToken",
                        args: [
                            selectedTokenConfig.address,
                            parsedAmount,
                            userAddress,
                        ],
                    });
                    
                    await publicClient?.waitForTransactionReceipt({ hash: txHash });
                    playSwordSound();

                    toast({
                        title: "⚔️ Deposit Successful",
                        description: `${amount} ${selectedTokenConfig.symbol} successfully powered up`,
                        variant: "success",
                    });
                } catch (error) {
                    if (error.message.includes('User rejected') || error.message.includes('User denied')) {
                        errorAudioRef.current.play();
                        toast({
                            title: "Transaction Cancelled",
                            description: "You rejected the deposit request",
                            variant: "warning",
                        });
                        throw new Error('User cancelled deposit');
                    }
                    throw error;
                }
            } else {
                try {
                    // Withdraw in shares (using 6 decimals like USDC for shares)
                    const shareAmount = parseUnits(amount, 6);
                    const txHash = await writeContractAsync({
                        address: CONTRACT_ADDRESS,
                        abi: VAULT_ABI,
                        functionName: "withdraw",
                        args: [shareAmount, userAddress, userAddress],
                    });
                    
                    await publicClient?.waitForTransactionReceipt({ hash: txHash });
                    playSwordSound();

                    toast({
                        title: "⚔️ Withdrawal Successful",
                        description: `${amount} shares successfully withdrawn`,
                        variant: "success",
                    });
                } catch (error) {
                    if (error.message.includes('User rejected') || error.message.includes('User denied')) {
                        errorAudioRef.current.play();
                        toast({
                            title: "Transaction Cancelled",
                            description: "You rejected the withdrawal request",
                            variant: "warning",
                        });
                        throw new Error('User cancelled withdrawal');
                    }
                    throw error;
                }
            }

            await Promise.all([
                refetchUserBalance(),
                refetchTotalAssets()
            ]);
            
            setAmount("");
            onClose();
        } catch (error) {
            console.error(error);
            // Only show error toast for non-user rejection errors
            if (!error.message.includes('User cancelled')) {
                errorAudioRef.current.play();
                toast({
                    title: "Transaction Failed",
                    description: "An unexpected error occurred. Please try again.",
                    variant: "destructive",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleMint = async () => {
        if (isLoading) return;

        try {
            setIsLoading(true);
            const selectedTokenConfig = TOKENS[selectedMintToken];
            const mintLimit = MINT_LIMITS[selectedMintToken];
            const mintAmount = parseUnits(mintLimit.amount.toString(), selectedTokenConfig.decimals);

            const txHash = await writeContractAsync({
                address: selectedTokenConfig.address,
                abi: TESTNET_TOKEN_ABI,
                functionName: "faucet",
                args: [mintAmount],
            });
            
            await publicClient?.waitForTransactionReceipt({ hash: txHash });
            playSwordSound();

            toast({
                title: "🚰 Mint Successful",
                description: `${mintLimit.amount} ${mintLimit.symbol} successfully minted to your wallet`,
                variant: "success",
            });

        } catch (error) {
            console.error(error);
            if (error.message.includes('User rejected') || error.message.includes('User denied')) {
                errorAudioRef.current.play();
                toast({
                    title: "Transaction Cancelled",
                    description: "You rejected the mint request",
                    variant: "warning",
                });
            } else {
                toast({
                    title: "Mint Failed",
                    description: error.message || "Minting failed. You may have reached the daily limit.",
                    variant: "destructive",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            Promise.all([
                refetchUserBalance(),
                refetchTotalAssets()
            ]);
            
            // Set mint tab if opened from header
            if (shouldOpenToMint) {
                setActiveTab('mint');
            }
        }
    }, [isOpen, shouldOpenToMint, refetchUserBalance, refetchTotalAssets]);

    useEffect(() => {
        if (!isOpen) {
            setActiveTab('deposit');
            setAmount("");
        }
    }, [isOpen]);

    useEffect(() => {
        return () => {
            successAudioRef.current.pause();
            successAudioRef.current.currentTime = 0;
            errorAudioRef.current.pause();
            errorAudioRef.current.currentTime = 0;
        };
    }, []);

    if (!userAddress) {
        return (
            <Modal 
                isOpen={isOpen} 
                onClose={onClose} 
                className="bg-black-tr"
                size="md"
            >
                <ModalContent className="bg-black-tr">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 flex items-center text-white uppercase hover:text-basement-cyan font-basement z-50 transition-colors duration-200"
                    >
                        Close | X
                    </button>
                    
                    <ModalHeader className="flex flex-col gap-1 font-basement text-basement-cyan">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">⚔️</span>
                            <span>Join the Ronin Council</span>
                        </div>
                    </ModalHeader>
                    
                    <ModalBody className="flex flex-col items-center justify-center py-8">
                        <div className="text-7xl mb-6 animate-pulse">🔮</div>
                        <h3 className="text-2xl font-basement text-white mb-6">Connect Your Wallet</h3>
                        
                        <div className="w-full flex justify-center mb-8">
                            <div className="transform hover:scale-105 transition-transform duration-200">
                                <ConnectButton 
                                    chainStatus="icon"
                                    showBalance={false}
                                />
                            </div>
                        </div>

                        <div className="space-y-4 w-full">
                            <p className="text-gray-400 text-center text-sm">
                                Join the future of DeFi. Access AI-powered yield optimization and start earning smarter returns.
                            </p>
                            
                            <div className="bg-gradient-to-r from-basement-cyan/5 to-transparent border border-basement-cyan/20 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-basement-cyan/10 text-xl">
                                        🤖
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">
                                            <span className="text-basement-cyan font-bold">AI Advantage:</span>{' '}
                                            Our AI automatically manages your position across multiple strategies for optimal yields.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 mt-6">
                                {strategies.map((strategy, index) => (
                                    <div 
                                        key={index}
                                        className="p-3 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center"
                                    >
                                        <span className="text-2xl mb-2">{strategy.icon}</span>
                                        <span className="text-xs text-gray-400">{strategy.protocol}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
    }

    return (
        <Modal
            backdrop="opaque"
            isOpen={isOpen}
            size="3xl"
            motionProps={{
                variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: 0.3, ease: "easeOut" },
                    },
                    exit: {
                        y: -20,
                        opacity: 0,
                        transition: { duration: 0.2, ease: "easeIn" },
                    },
                }
            }}
            classNames={{
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/25 backdrop-opacity-20",
                wrapper: "flex items-center justify-center p-4",
                base: "w-full max-w-4xl h-auto min-h-[700px] max-h-[95vh] overflow-y-auto"
            }}
        >
            <ModalContent className="bg-black-tr min-h-[700px] max-h-[95vh] flex flex-col overflow-hidden" style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)', border: '1px solid rgba(0, 255, 247, 0.3)' }}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 flex items-center text-white uppercase hover:text-basement-cyan font-basement z-50 transition-colors duration-200"
                >
                    Close | X
                </button>
                
                <ModalHeader className="flex flex-col gap-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-basement-cyan/10 text-2xl">
                            ⚔️
                        </div>
                        <div>
                            <h2 className="font-basement text-basement-cyan text-xl">
                                Samurai Vault
                            </h2>
                            <p className="text-sm text-gray-400">
                                Multi-token AI-powered yield optimization
                            </p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="w-full mb-4">
                        <Tabs 
                            selectedKey={activeTab} 
                            onSelectionChange={setActiveTab}
                            classNames={{
                                tabList: "gap-2 w-full relative rounded-lg bg-white/5 p-1",
                                cursor: "w-full bg-basement-cyan/20 border border-basement-cyan/50",
                                tab: "max-w-fit px-4 h-10 font-basement",
                                tabContent: "group-data-[selected=true]:text-basement-cyan"
                            }}
                        >
                            <Tab key="deposit" title={
                                <div className="flex items-center gap-2">
                                    <span>⚡</span>
                                    <span>Deposit</span>
                                </div>
                            } />
                            <Tab key="withdraw" title={
                                <div className="flex items-center gap-2">
                                    <span>💎</span>
                                    <span>Withdraw</span>
                                </div>
                            } />
                            <Tab key="mint" title={
                                <div className="flex items-center gap-2">
                                    <span>🚰</span>
                                    <span>Mint</span>
                                </div>
                            } />
                        </Tabs>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <Tooltip content="Your current share of the vault's total assets">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 cursor-help transition-all duration-200 hover:border-basement-cyan/50">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="text-sm text-gray-400">Your Position</p>
                                    <div className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                                        <span className="text-xs text-green-400">Active</span>
                                    </div>
                                </div>
                                <p className="text-xl font-bold text-basement-cyan">
                                    {userBalance ? formatUnits(userBalance, 6) : "0"} shares
                                </p>
                            </div>
                        </Tooltip>
                        
                        <Tooltip content="Total value locked in the vault">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 cursor-help transition-all duration-200 hover:border-basement-cyan/50">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="text-sm text-gray-400">Vault TVL</p>
                                    <div className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                                        <span className="text-xs text-purple-400">Growing</span>
                                    </div>
                                </div>
                                <p className="text-xl font-bold text-basement-cyan">
                                    {totalAssets ? formatUnits(totalAssets, 6) : "0"} USDC
                                </p>
                            </div>
                        </Tooltip>
                    </div>
                </ModalHeader>

                <ModalBody className="font-aeonik text-white flex-1 p-6" style={{ minHeight: '400px', maxHeight: '500px', overflowY: 'auto' }}>
                    {/* Token Selector - Show for deposits and minting */}
                    {activeTab === 'deposit' ? (
                        <div className="space-y-2 mb-6">
                            <label className="text-sm font-basement text-basement-cyan">
                                Select Token
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {Object.entries(TOKENS).map(([key, token]) => (
                                    <button
                                        key={key}
                                        onClick={() => setSelectedToken(key)}
                                        className={`p-3 rounded-lg border transition-all duration-200 ${
                                            selectedToken === key
                                                ? 'bg-gradient-to-r from-basement-cyan/20 to-basement-cyan/10 text-basement-cyan border-basement-cyan/50'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-basement-cyan/20'
                                        }`}
                                    >
                                        <div className="text-2xl mb-1">{token.icon}</div>
                                        <div className="text-sm font-basement">{token.symbol}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : activeTab === 'mint' ? (
                        <div className="space-y-2 mb-6">
                            <label className="text-sm font-basement text-basement-cyan">
                                Select Token to Mint
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {Object.entries(TOKENS).map(([key, token]) => {
                                    const mintLimit = MINT_LIMITS[key];
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setSelectedMintToken(key)}
                                            className={`p-3 rounded-lg border transition-all duration-200 ${
                                                selectedMintToken === key
                                                    ? 'bg-gradient-to-r from-basement-cyan/20 to-basement-cyan/10 text-basement-cyan border-basement-cyan/50'
                                                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-basement-cyan/20'
                                            }`}
                                        >
                                            <div className="text-2xl mb-1">{token.icon}</div>
                                            <div className="text-sm font-basement">{token.symbol}</div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                {mintLimit.amount} max
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        /* Spacer for withdraw tab to maintain same height */
                        <div className="space-y-2 mb-6">
                            <div className="text-sm font-basement text-basement-cyan opacity-50">
                                Withdraw Mode
                            </div>
                            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                <div className="text-center">
                                    <div className="text-2xl mb-2">💎</div>
                                    <div className="text-sm font-basement text-white/70">
                                        Withdraw your vault shares for USDC
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'mint' ? (
                        /* Mint mode - show mint info instead of input */
                        <div className="relative space-y-6">
                            <div className="p-6 rounded-xl bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/40">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-xl bg-orange-500/20 text-3xl">
                                        🚰
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-orange-300 mb-2">
                                            Testnet Token Faucet
                                        </h3>
                                        <p className="text-base text-gray-300">
                                            Get free {TOKENS[selectedMintToken]?.symbol} tokens for testing the vault
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                                        <div className="text-sm text-gray-400 mb-1">Amount to mint:</div>
                                        <div className="text-xl font-bold text-orange-300">
                                            {MINT_LIMITS[selectedMintToken]?.amount} {TOKENS[selectedMintToken]?.symbol}
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                                        <div className="text-sm text-gray-400 mb-1">Current balance:</div>
                                        <div className="text-xl font-bold text-basement-cyan">
                                            {getAvailableBalance()} {TOKENS[selectedMintToken]?.symbol}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-400/20">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400 text-lg">✅</span>
                                        <span className="text-green-300 font-medium">
                                            Free testnet tokens • No gas fees • Instant minting
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="relative">
                            <Input
                                autoFocus
                                type="number"
                                label={activeTab === 'deposit' ? `Deposit Amount (${TOKENS[selectedToken]?.symbol || 'Token'})` : 'Withdraw Amount (Shares)'}
                                placeholder={activeTab === 'deposit' ? `Enter amount in ${TOKENS[selectedToken]?.symbol || 'tokens'}` : 'Enter shares to withdraw'}
                                variant="bordered"
                                value={amount}
                                onChange={handleAmountChange}
                                classNames={{
                                    label: "text-xs font-basement text-basement-cyan pb-8",
                                    input: "bg-white/5",
                                    inputWrapper: "border-white/10 hover:border-basement-cyan/50 transition-colors duration-200",
                                }}
                            />
                            {activeTab === 'deposit' && (
                                <div className="absolute right-0 -bottom-6 text-xs text-gray-500">
                                    Available: {getAvailableBalance()} {TOKENS[selectedToken]?.symbol || 'Token'}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Spacer to maintain consistent modal height */}
                    <div className="mt-8 p-4 rounded-lg bg-gradient-to-r from-basement-cyan/5 to-transparent border border-basement-cyan/20">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-basement-cyan/10 text-lg shrink-0">🤖</div>
                            <div>
                                <p className="text-xs text-gray-400 mb-1">
                                    <span className="text-basement-cyan font-bold">AI Powered:</span>{' '}
                                    Your assets are automatically optimized across multiple DeFi strategies.
                                </p>
                                <p className="text-xs text-gray-500">
                                    Multi-token deposits • Automated rebalancing • Maximum yields
                                </p>
                            </div>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter className="p-6 border-t border-basement-cyan/20">
                    <div className="w-full">
                        <Button
                            text={
                                isLoading
                                    ? `${activeTab === 'deposit' ? '⚡ Powering Up...' : activeTab === 'withdraw' ? '💎 Withdrawing...' : '🚰 Minting...'}`
                                    : `${activeTab === 'deposit' ? `⚡ Deposit ${TOKENS[selectedToken]?.symbol || 'Token'}` : activeTab === 'withdraw' ? '💎 Strategic Withdraw' : `🚰 Mint ${MINT_LIMITS[selectedMintToken]?.amount} ${TOKENS[selectedMintToken]?.symbol}`}`
                            }
                            onClick={activeTab === 'mint' ? handleMint : handleSubmit}
                            disabled={activeTab === 'mint' ? isLoading : (!amount || isLoading)}
                            style={{ width: '100%', fontSize: '16px', padding: '16px 24px', minHeight: '56px' }}
                        />
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default TransactionModal;
