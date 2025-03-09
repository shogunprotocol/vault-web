'use client';

import { useDisclosure } from "@nextui-org/react";
import { Application } from '@splinetool/runtime';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import useHoverEffect from '../../hooks/useHoverEffect';
import { staggerContainer, textVariant } from "../../libs/motion";
import Button from "../lunar/Button";
import { GridPattern } from "../lunar/GridPattern";
import { SectionTitle, SectionTitleFade, SectionWrapper } from "../lunar/Section";
import { SpotlightCard } from "../lunar/SpotlightCard";
import TransactionModal from "../modals";

const VaultActionCards = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [transactionType, setTransactionType] = useState('deposit');

    const titleRef = useRef(null);
    const titleRef2 = useRef(null);
    const rezyRef = useRef(null);

    useHoverEffect(titleRef);
    useHoverEffect(titleRef2);
    useHoverEffect(rezyRef);

    const canvasRef = useRef(null);

    const gridBlocks = [
        [2, 5],
        [3, 1],
        [4, 3],
    ];

    useEffect(() => {
        if (canvasRef.current) {
            const app = new Application(canvasRef.current);
            app.load('https://prod.spline.design/iGbfEoVSWBE4GOHq/scene.splinecode');
        }
    }, []);

    const handleAction = (type) => {
        setTransactionType(type);
        onOpen();
    };

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            className="relative"
            viewport={{ once: false, amount: 0.1 }}
        >
            <SectionWrapper>
                <motion.div
                    variants={textVariant(0.2)}
                    className="flex flex-col items-center justify-center">

                    <h1 className="group text-center font-display text-2xl font-light leading-tight lg:text-4xl z-10 mb-8">
                        <SectionTitle>
                            <div className='font-basement uppercase' ref={rezyRef}>
                                Smart Yield Vaults
                            </div>
                            <SectionTitleFade>
                                <div className='font-basement text-lg p-2 uppercase text-basement-cyan' ref={titleRef}>
                                    Automated DeFi Strategies
                                </div>
                            </SectionTitleFade>
                        </SectionTitle>
                    </h1>

                    <motion.div
                        variants={textVariant(0.4)}
                        className="relative mx-auto w-full max-w-4xl z-10">
                        <div className="relative flex flex-col items-center justify-center w-full h-full">
                            <canvas ref={canvasRef} className="w-full h-[300px]" />

                            <div className="absolute top-1/2 left-[-100px] -translate-y-1/2">
                                <Button onClick={() => handleAction('deposit')} text="Deposit" />
                            </div>
                            <div className="absolute top-1/2 right-[-100px] -translate-y-1/2">
                                <Button onClick={() => handleAction('withdraw')} text="Withdraw" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={textVariant(1.1)}
                        className="flex w-full max-w-3xl mx-auto mt-6">
                        <SpotlightCard
                            from="#1cd1c6"
                            via="#407cff"
                            size={250}
                            className="relative w-full rounded-xl bg-white/10 p-6">
                            <div className="absolute inset-px rounded-[calc(0.75rem-1px)] bg-zinc-800/90"></div>

                            <GridPattern
                                size={48}
                                offsetX={0}
                                offsetY={0}
                                className="absolute -top-1/2 right-0 h-[200%] w-2/3 skew-y-12 stroke-white/10 stroke-[1.5] [mask-image:linear-gradient(-85deg,black,transparent)]">
                                {gridBlocks.map(([row, column], index) => (
                                    <GridPattern.Block
                                        key={index}
                                        row={row}
                                        column={column}
                                        className="fill-white/2.5 transition duration-500 hover:fill-white/5"
                                    />
                                ))}
                            </GridPattern>

                            <div className="relative flex flex-col w-full">
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
                                        <div className="text-xs text-white/60 mb-1">Deposited</div>
                                        <div className="text-sm font-basement text-white">1,000 USDC</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/60 mb-1">Earned</div>
                                        <div className="text-sm font-basement text-basement-cyan">+70 USDC</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/60 mb-1">Next Reward</div>
                                        <div className="text-sm font-basement text-white">12h 30m</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-3">
                                    <div className="text-xs text-white/60">24h Performance:</div>
                                    <div className="text-xs text-green-400 font-medium">↗ +2.1%</div>
                                </div>
                            </div>
                        </SpotlightCard>
                    </motion.div>
                </motion.div>
            </SectionWrapper>

            <TransactionModal
                isOpen={isOpen}
                onClose={onClose}
                type={transactionType}
            />
        </motion.div>
    );
};

export default VaultActionCards;
