"use client"

import { motion } from 'framer-motion';
import { textVariant } from "@/libs/motion";
import { DotPattern } from "@/components/lunar/DotPattern";
import { SpotlightCard } from "@/components/lunar/SpotlightCard";
import { Twitter, Users, Bell, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Card5() {

    return (
        <motion.div
            variants={textVariant(1.5)}
            className="w-full h-full">
            <Link href="https://x.com/shogun_fi" target="_blank" rel="noopener noreferrer">
                <SpotlightCard
                    from="#1d4ed8"
                    via="#3b82f6"
                    size={300}
                    className="relative w-full h-full min-h-[280px] rounded-[--radius] bg-white/10 p-8 [--radius:theme(borderRadius.2xl)]">
                    <div className="absolute inset-px rounded-[calc(var(--radius)-1px)] bg-zinc-800/90"></div>

                    <DotPattern
                        size={32}
                        radius={1.5}
                        offset-x={0}
                        offset-y={0}
                        className="absolute inset-0 h-full w-full fill-white/10 [mask-image:radial-gradient(white,transparent_85%)]"
                    />

                    <div className="relative flex flex-col items-center justify-center text-center space-y-4 h-full">
                        <div className="group inline-flex items-center gap-2 rounded-lg bg-blue-500/20 px-5 py-2.5 font-display text-xs font-medium tracking-wide text-white transition hover:bg-blue-500/30">
                            <span className="relative bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-3 rounded-sm flex items-center justify-center">
                                <Twitter className="w-4 h-4 text-white" />
                            </span>
                            <span className="relative h-5 w-px bg-white/10"></span>
                            <span className="group-hover relative mt-px font-display font-medium text-white/50 transition duration-300 group-hover:text-white/100">
                                <Users className="w-4 h-4" />
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div className="font-display text-lg font-semibold text-white font-belgro">
                                Join Our Community
                            </div>
                            <div className="font-display text-sm text-white/70 font-belgro leading-relaxed">
                                Follow <span className="text-blue-400">@shogun_fi</span> for:<br />
                                Strategy updates • Early access<br />
                                <span className="text-blue-400">Community insights</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-blue-400">
                            <Bell className="w-3 h-3" />
                            <span>Never miss an update</span>
                        </div>
                    </div>
                </SpotlightCard>
            </Link>
        </motion.div>
    )
}
