'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { formatUnits } from "viem";
import useHoverEffect from '../../hooks/useHoverEffect';
import { staggerContainer, textVariant } from "../../libs/motion";
import {
    SectionBadge,
    SectionDescription,
    SectionHeadingHighlighted,
    SectionTitle,
    SectionTitleFade,
    SectionWrapperRounded,
} from "../lunar/Section";
import VaultAccessInline from '@/components/VaultAccessInline';
import { CONTRACT_ADDRESS, VAULT_ABI } from "@/constants/index";

export function SecondaryFeatures() {
    const titleRef = useRef(null);
    const titleRef2 = useRef(null);
    const rezyRef = useRef(null);

    useHoverEffect(titleRef);
    useHoverEffect(titleRef2);
    useHoverEffect(rezyRef);

    // Get vault data
    const { data: totalAssets } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: VAULT_ABI,
        functionName: "totalAssets",
    });

    const { data: totalSupply } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: VAULT_ABI,
        functionName: "totalSupply",
    });

    // Format vault stats
    const formatTVL = () => {
        if (!totalAssets) return "0";
        const formatted = formatUnits(totalAssets, 6);
        const number = parseFloat(formatted);
        
        if (number >= 1000000) {
            return `$${(number / 1000000).toFixed(1)}M`;
        } else if (number >= 1000) {
            return `$${(number / 1000).toFixed(1)}K`;
        } else {
            return `$${number.toLocaleString()}`;
        }
    };

    const formatShares = () => {
        if (!totalSupply) return "0";
        const formatted = formatUnits(totalSupply, 6);
        const number = parseFloat(formatted);
        
        if (number >= 1000000) {
            return `${(number / 1000000).toFixed(1)}M`;
        } else if (number >= 1000) {
            return `${(number / 1000).toFixed(1)}K`;
        } else {
            return number.toLocaleString();
        }
    };

    // Calculate estimated daily yield (16% APY / 365 days)
    const getDailyYield = () => {
        if (!totalAssets) return "$0";
        const tvl = parseFloat(formatUnits(totalAssets, 6));
        const dailyYield = (tvl * 0.16) / 365; // 16% APY divided by 365 days
        
        if (dailyYield >= 1000) {
            return `$${(dailyYield / 1000).toFixed(1)}K`;
        } else {
            return `$${dailyYield.toFixed(0)}`;
        }
    };

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
        >
            <SectionWrapperRounded>
                <motion.div
                    variants={textVariant(0.25)}
                    className=" grid gap-4 lg:grid-cols-1 lg:gap-8">
                    <SectionHeadingHighlighted>
                        <SectionBadge>Ronin Rewards</SectionBadge>
                        <SectionTitle ref={titleRef}>
                            <div ref={titleRef}>
                                Ready to maximize yields?
                            </div>
                            <SectionTitleFade>
                                <div ref={titleRef2}>
                                    Our AI has your strategy
                                </div>
                            </SectionTitleFade>
                        </SectionTitle>

                        <SectionDescription>
                            <motion.div
                                ref={rezyRef}>
                                Join the Shōgun and let our advanced algorithms
                                automatically atomically allocate your crypto into the highest-yielding DeFi opportunities.
                            </motion.div>
                        </SectionDescription>
                    </SectionHeadingHighlighted>
                    <div className="canvas-container" style={{ position: 'relative', width: '100%', height: '400px' }}>
                        <div 
                            className="relative transform-gpu overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),var(--spotlight-color-stops))] relative w-full rounded-xl bg-white/10 p-6" 
                            style={{
                                '--x': '50%', 
                                '--y': '50%', 
                                '--spotlight-color-stops': '#1cd1c6,#407cff,rgba(0, 255, 247, 0.2)', 
                                '--spotlight-size': '250px',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div className="absolute inset-px rounded-[calc(0.75rem-1px)] bg-zinc-800/90"></div>
                            <svg className="absolute -top-1/2 right-0 h-[200%] w-2/3 skew-y-12 stroke-white/10 stroke-[1.5] [mask-image:linear-gradient(-85deg,black,transparent)]">
                                <defs>
                                    <pattern id="grid-pattern" viewBox="0 0 64 64" width="48" height="48" patternUnits="userSpaceOnUse" x="0" y="0">
                                        <path d="M64 0H0V64" fill="none"></path>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" stroke-width="0" fill="url(#grid-pattern)"></rect>
                                <rect className="fill-white/2.5 transition duration-500 hover:fill-white/5" stroke-width="0" width="47" height="47" x="241" y="97"></rect>
                                <rect className="fill-white/2.5 transition duration-500 hover:fill-white/5" stroke-width="0" width="47" height="47" x="49" y="145"></rect>
                                <rect className="fill-white/2.5 transition duration-500 hover:fill-white/5" stroke-width="0" width="47" height="47" x="145" y="193"></rect>
                            </svg>
                            <div className="relative flex flex-col w-full h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="font-belgro text-white/80 text-sm">Strategy</div>
                                        <div className="font-basement text-basement-cyan text-lg">AI USDC Yield Optimizer</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-belgro text-white/80 text-sm">APY</div>
                                        <div className="font-basement text-basement-cyan text-lg">16%</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 py-3 border-y border-white/10">
                                    <div>
                                        <div className="text-xs text-white/60 mb-1">Total Deposited</div>
                                        <div className="text-sm font-basement text-white">{formatTVL()}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/60 mb-1">Daily Yield</div>
                                        <div className="text-sm font-basement text-basement-cyan">+{getDailyYield()}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/60 mb-1">Total Shares</div>
                                        <div className="text-sm font-basement text-white">{formatShares()}</div>
                                    </div>
                                </div>
                                
                                <div className="flex-grow flex flex-col justify-end">
                                    <VaultAccessInline />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </SectionWrapperRounded>
        </motion.div>
    )
}
