"use client"

import { motion } from 'framer-motion';
import { textVariant } from "@/libs/motion";
import { DotPattern } from "@/components/lunar/DotPattern";
import { SpotlightCard } from "@/components/lunar/SpotlightCard";

export default function Card5() {

    const lottieStyle = {
        width: '150px', // set a specific width
        height: '150px' // set a specific height
    };

    return (
        <motion.div
            variants={textVariant(1.5)}
            className="flex sm:col-start-4 sm:row-start-3 items-center">
            <SpotlightCard
                from="#1cd1c6"
                via="#407cff"
                size={300}
                className="relative mx-auto w-full max-w-2xl rounded-[--radius] bg-white/10 p-8 [--radius:theme(borderRadius.2xl)]">
                <div className="absolute inset-px rounded-[calc(var(--radius)-1px)] bg-zinc-800/90"></div>

                <DotPattern
                    size={32}
                    radius={1.5}
                    offset-x={0}
                    offset-y={0}
                    className="absolute inset-0 h-full w-full fill-white/10 [mask-image:radial-gradient(white,transparent_85%)]"
                />

                <div className="relative flex justify-center items-center h-full">
                    <div className="font-display text-lg font-semibold text-white md:text-2xl">
                        Join the AI Ronin Council<span className="text-basement-cyan">.</span><br />
                        Propose strategies<span className="text-basement-cyan">.</span><br />
                        Stake your honor<span className="text-basement-cyan">.</span><br />
                        <span className="text-basement-cyan">Maximize yield</span>.
                    </div>
                </div>
            </SpotlightCard>
        </motion.div>
    )
}
