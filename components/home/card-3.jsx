"use client"

import { motion } from 'framer-motion';
import { textVariant } from "@/libs/motion";

import { GridPattern } from "@/components/lunar/GridPattern";
import { SpotlightCard } from "@/components/lunar/SpotlightCard";

export default function Card3() {
    const totalTVL = "1.2M"; // Replace with actual TVL amount

    return (
        <motion.div
            variants={textVariant(1.4)}
            className="w-full h-full">
            <SpotlightCard
                from="#1cd1c6"
                via="#407cff"
                size={300}
                className="relative w-full h-full min-h-[280px] rounded-[--radius] bg-white/10 p-8 [--radius:theme(borderRadius.2xl)]">
                <div className="absolute inset-px rounded-[calc(var(--radius)-1px)] bg-zinc-800/90"></div>

                <GridPattern
                    offsetX={0}
                    offsetY={0}
                    size={64}
                    className="absolute -inset-px h-full w-full stroke-white/10 stroke-[4] [mask-image:radial-gradient(white,transparent_70%)] [stroke-dasharray:5_6] [stroke-dashoffset:10]">
                </GridPattern>

                {/* Flex container for text and amount */}
                <div className="relative flex items-center justify-between w-full">
                    {/* Text to the left */}
                    <div className="font-display text-lg font-semibold text-white font-belgro">
                        Total Value <br />
                        <span className="text-basement-cyan">Locked (TVL)</span>
                    </div>

                    {/* Amount to the right */}
                    <div className="font-display text-lg font-semibold text-basement-cyan font-belgro">
                        ${totalTVL}
                    </div>
                </div>
            </SpotlightCard>
        </motion.div>
    )
}
