"use client"

import { motion } from 'framer-motion';
import { textVariant } from "@/libs/motion";

import { Users, Vote, Coins } from "lucide-react";
import Link from "next/link";
import { GridPattern } from "@/components/lunar/GridPattern";
import { SpotlightCard } from "@/components/lunar/SpotlightCard";

export default function Card4() {
    const gridBlocks = [
        [2, 5],
        [3, 1],
        [4, 3],
    ]

    return (
        <motion.div
            variants={textVariant(1.2)}
            className="w-full h-full">
            <Link href="/vault" passHref>
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

                    <div className="relative flex flex-col items-center justify-between text-center h-full">
                        <div className="space-y-4">
                            <div className="group inline-flex items-center gap-2 rounded-lg bg-white/5 px-5 py-2.5 font-display text-xs font-medium tracking-wide text-white transition hover:bg-white/10">
                                <span className="relative bg-gradient-to-r from-cyan-400 to-blue-400 px-4 py-3 rounded-sm flex items-center justify-center">
                                    <Users className="w-4 h-4 text-white" />
                                </span>
                                <span className="relative h-5 w-px bg-white/10"></span>
                                <span className="group-hover relative mt-px font-display font-medium text-white/50 transition duration-300 group-hover:text-white/100">
                                    <Vote className="w-4 h-4" />
                                </span>
                            </div>

                            <div className="space-y-2">
                                <div className="font-display text-sm font-semibold text-white font-belgro">
                                    Ronin Council DAO
                                </div>
                                <div className="font-display text-xs text-white/70 font-belgro leading-relaxed">
                                    Join the AI Ronin Council.<br />
                                    Propose strategies.<br />
                                    <span className="text-cyan-400">Stake your honor.</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA at bottom - estilo original */}
                        <div className="w-full">
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <div className="flex items-center gap-2 text-xs text-white/70">
                                    <Coins className="w-3 h-3" />
                                    <span>Deposit first</span>
                                </div>
                                <div className="text-xs font-basement text-basement-cyan uppercase tracking-wider">
                                    PARTICIPATE →
                                </div>
                            </div>
                        </div>
                    </div>
                </SpotlightCard>
            </Link>
        </motion.div>
    )
}
