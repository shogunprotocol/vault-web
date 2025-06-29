"use client"

import { motion } from 'framer-motion';
import { textVariant } from "@/libs/motion";
import { GridPattern } from "@/components/lunar/GridPattern";
import { SpotlightCard } from "@/components/lunar/SpotlightCard";
import { useDisclosure } from "@nextui-org/react";
import TransactionModal from "@/components/modals";

export default function Card1() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const gridBlocks = [
        [2, 5],
        [3, 1],
        [4, 3],
    ]

    const count = 16;

    return (
        <motion.div
            variants={textVariant(1.1)}
            className="w-full h-full">
            <button onClick={onOpen} className="block h-full w-full text-left">
                <SpotlightCard
                    from="#1cd1c6"
                    via="#407cff"
                    size={300}
                    className="relative w-full h-full min-h-[280px] rounded-[--radius] bg-white/10 p-8 [--radius:theme(borderRadius.2xl)] hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <div className="absolute inset-px rounded-[calc(var(--radius)-1px)] bg-zinc-800/90"></div>

                    <GridPattern
                        size={64}
                        offsetX={0}
                        offsetY={0}
                        className="absolute -top-1/2 right-0 h-[200%] w-2/3 skew-y-12 stroke-white/10 stroke-[2] [mask-image:linear-gradient(-85deg,black,transparent)]">
                        {gridBlocks.map(([row, column], index) => (
                            <GridPattern.Block
                                key={index}
                                row={row}
                                column={column}
                                className="fill-white/2.5 transition duration-500 hover:fill-white/5"
                            />
                        ))}
                    </GridPattern>

                    <div className="relative flex flex-col w-full h-full justify-between">
                        <div>
                            <div className="font-display text-lg font-semibold text-white font-belgro md:text-2xl">
                                Current <br />
                                <span className="text-basement-cyan">APY</span>
                            </div>

                            <div className="text-7xl font-bold text-right font-basement text-basement-cyan mt-4">
                                {count}%
                            </div>
                        </div>

                        {/* CTA at bottom - estilo original */}
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                            <span className="text-sm text-white/70 font-aeonik">Start earning</span>
                            <div className="text-sm font-basement text-basement-cyan uppercase tracking-wider">
                                DEPOSIT →
                            </div>
                        </div>
                    </div>
                </SpotlightCard>
            </button>
            
            <TransactionModal
                isOpen={isOpen}
                onClose={onClose}
            />
        </motion.div>
    )
}
