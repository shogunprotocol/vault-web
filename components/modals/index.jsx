import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Button as NextUIButton, Tooltip } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import Button from "../lunar/Button";
import { useAccount, useWriteContract, usePublicClient, useReadContract } from "wagmi";
import { erc20Abi, parseUnits, formatUnits } from "viem";
import { useToast } from "../../hooks/use-toast";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CONTRACT_ADDRESS, USDC_ADDRESS, VAULT_ABI } from "../../constants";

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

const TransactionModal = ({ isOpen, onClose, type = 'deposit' }) => {
    const { address: userAddress } = useAccount();
    const { writeContractAsync } = useWriteContract();
    const publicClient = usePublicClient();
    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showStrategies, setShowStrategies] = useState(false);
    const { toast } = useToast();

    // Add both success and error sound refs
    const successAudioRef = useRef(new Audio('/audio/samurai-sword.mp3'));
    const errorAudioRef = useRef(new Audio('/audio/error.mp3')); // Add an error sound if you have one

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

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = async () => {
        if (!amount || isLoading) return;

        try {
            setIsLoading(true);
            const parsedAmount = parseUnits(amount, 6);

            if (type === 'deposit') {
                try {
                    // First approve USDC spending
                    const approveTxHash = await writeContractAsync({
                        address: USDC_ADDRESS,
                        abi: erc20Abi,
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
                    const txHash = await writeContractAsync({
                        address: CONTRACT_ADDRESS,
                        abi: VAULT_ABI,
                        functionName: "deposit",
                        args: [parsedAmount],
                    });
                    
                    await publicClient?.waitForTransactionReceipt({ hash: txHash });
                    successAudioRef.current.play();

                    toast({
                        title: "⚔️ Deposit Successful",
                        description: `${amount} USDC successfully powered up`,
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
                    const txHash = await writeContractAsync({
                        address: CONTRACT_ADDRESS,
                        abi: VAULT_ABI,
                        functionName: "withdraw",
                        args: [parsedAmount],
                    });
                    
                    await publicClient?.waitForTransactionReceipt({ hash: txHash });
                    successAudioRef.current.play();

                    toast({
                        title: "⚔️ Withdrawal Successful",
                        description: `${amount} USDC successfully withdrawn`,
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

    // Add an effect to refresh balances when modal opens
    useEffect(() => {
        if (isOpen) {
            Promise.all([
                refetchUserBalance(),
                refetchTotalAssets()
            ]);
        }
    }, [isOpen, refetchUserBalance, refetchTotalAssets]);

    // Cleanup audio on unmount
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
            size="2xl"
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
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/25 backdrop-opacity-20"
            }}
        >
            <ModalContent className="bg-black-tr">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 flex items-center text-white uppercase hover:text-basement-cyan font-basement z-50 transition-colors duration-200"
                >
                    Close | X
                </button>
                
                <ModalHeader className="flex flex-col gap-1">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-basement-cyan/10 text-2xl">
                            {type === 'deposit' ? '⚡' : '💎'}
                        </div>
                        <div>
                            <h2 className="font-basement text-basement-cyan text-xl">
                                {type === 'deposit' ? 'Power Up Your Assets' : 'Strategic Withdrawal'}
                            </h2>
                            <p className="text-sm text-gray-400">
                                {type === 'deposit' 
                                    ? 'Your funds will be optimally distributed by our AI' 
                                    : 'Withdraw your optimized assets'}
                            </p>
                        </div>
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

                <ModalBody className="font-aeonik text-white">
                    <div className="relative">
                        <Input
                            autoFocus
                            type="number"
                            label={`${type === 'deposit' ? 'Deposit' : 'Withdraw'} Amount`}
                            placeholder="Enter amount in USDC"
                            variant="bordered"
                            value={amount}
                            onChange={handleAmountChange}
                            classNames={{
                                label: "text-xs font-basement text-basement-cyan pb-8",
                                input: "bg-white/5",
                                inputWrapper: "border-white/10 hover:border-basement-cyan/50 transition-colors duration-200",
                            }}
                        />
                        {type === 'deposit' && (
                            <div className="absolute right-0 -bottom-6 text-xs text-gray-500">
                                Available: {/* Add user USDC balance here */} USDC
                            </div>
                        )}
                    </div>

                    <NextUIButton
                        className="w-full mt-8 bg-white/5 hover:bg-white/10 text-basement-cyan font-basement group transition-all duration-200"
                        onClick={() => setShowStrategies(!showStrategies)}
                    >
                        <span className="flex items-center gap-2">
                            <span className={`transform transition-transform duration-200 ${showStrategies ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                            AI Strategy Overview
                            <span className="text-xs text-gray-500 ml-2 group-hover:text-basement-cyan">
                                {showStrategies ? 'Hide Details' : 'View Details'}
                            </span>
                        </span>
                    </NextUIButton>

                    {showStrategies && (
                        <div className="mt-4 space-y-4">
                            {strategies.map((strategy) => (
                                <div
                                    key={strategy.name}
                                    className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 transition-all duration-200 hover:scale-[1.02] group"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-basement-cyan/10 transition-colors duration-200">
                                                <span className="text-xl">{strategy.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-basement text-basement-cyan flex items-center gap-2">
                                                    {strategy.name}
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                                                        {strategy.status}
                                                    </span>
                                                </h3>
                                                <p className="text-xs text-gray-500">{strategy.protocol}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400">{strategy.description}</p>
                                    <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-white/10">
                                        {strategy.details}
                                    </p>
                                </div>
                            ))}
                            
                            <div className="p-4 rounded-lg bg-gradient-to-r from-basement-cyan/5 to-transparent border border-basement-cyan/20">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-basement-cyan/10 text-xl">🤖</div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">
                                            <span className="text-basement-cyan font-bold">AI Security Guarantee:</span>{' '}
                                            Your assets never leave our secure smart contracts.
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            The AI only optimizes allocation between vetted strategies while maintaining full asset security.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </ModalBody>

                <ModalFooter>
                    <Button
                        text={
                            isLoading
                                ? `${type === 'deposit' ? '⚡ Powering Up...' : '💎 Withdrawing...'}`
                                : `${type === 'deposit' ? '⚡ Deposit' : '💎 Strategic Withdraw'}`
                        }
                        onClick={handleSubmit}
                        disabled={!amount || isLoading}
                    />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default TransactionModal;
