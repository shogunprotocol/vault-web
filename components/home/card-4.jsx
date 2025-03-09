"use client"

import { motion } from 'framer-motion';
import { textVariant } from "../../libs/motion";

import { JapaneseYen } from "lucide-react";
import Link from "next/link";
import { GridPattern } from "../lunar/GridPattern";
import { SpotlightCard } from "../lunar/SpotlightCard";
export default function Card4() {
    const gridBlocks = [
        [2, 5],
        [3, 1],
        [4, 3],
    ]

    return (
        <motion.div
            variants={textVariant(1.2)}
            className="col sm:col-start-3 sm:row-start-2 items-center gap-4">
            <Link href="https://key3.eventos.tokyo/web/portal/744/event/7845" passHref>
                <SpotlightCard
                    from="#1cd1c6"
                    via="#407cff"
                    size={300}
                    className="relative mx-auto w-full max-w-sm rounded-[--radius] bg-white/10 p-8 [--radius:theme(borderRadius.2xl)]">
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

                    {/* Adjusted layout with flex container */}
                    <div className="relative flex items-center justify-end">
                        {/* Link */}

                        <div
                            className="group inline-flex items-center gap-2 rounded-lg bg-white/5 px-5 py-2.5 font-display text-xs font-medium tracking-wide text-white transition hover:bg-white/10">
                            <span className="relative bg-white px-4 py-3 rounded-sm flex items-center justify-center">
                                <span className="absolute w-3 h-3 rounded-full bg-cyan-400"></span>
                            </span>
                            <span className="relative h-5 w-px bg-white/10"></span>
                            <span className="group-hover relative mt-px font-display font-medium text-white/50 transition duration-300 group-hover:text-white/100">
                                <JapaneseYen />
                            </span>
                        </div>

                        {/* Text */}
                        <div className="font-display text-xs font-semibold text-white sm:text-xs lg:text-sm font-belgro ml-4">
                            Sonic DeFAI Hackathon 2025
                        </div>
                    </div>
                </SpotlightCard>
            </Link>

        </motion.div>
    )
}
