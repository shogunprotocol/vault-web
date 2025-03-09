"use client"
import { motion } from 'framer-motion';
import { textVariant } from "../../libs/motion";

import { SpotlightCard } from "../lunar/SpotlightCard";

export default function Card2() {
    return (
        <motion.div
            variants={textVariant(1.3)}
            className="relative sm:col-start-3 sm:row-start-2 lg:row-start-3 items-center gap-2">
            <SpotlightCard
                from="#0000ff"
                via="#407cff"
                size={300}
                className="relative mx-auto w-full max-w-sm rounded-[--radius] p-8 [--radius:theme(borderRadius.2xl)]">

                <div className="absolute inset-px rounded-[calc(var(--radius)-1px)] bg-zinc-800/90 glassmorphism"></div>

                {/* Adjusted layout with flex container */}
                <div className="relative flex items-center justify-start">

                    {/* Text */}
                    <div className="font-display text-xs font-semibold text-white sm:text-xs lg:text-sm font-belgro ml-4">
                        Built using Astar, The Graph, Next.js, Thirdweb and GSAP.
                    </div>
                </div>
            </SpotlightCard>
        </motion.div>
    )
}


