'use client';

import { motion } from 'framer-motion';
import { useRef } from "react";
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
import VaultActionCards from './vault-action-cards';


export function SecondaryFeatures() {

    const titleRef = useRef(null);
    const titleRef2 = useRef(null);
    const rezyRef = useRef(null);

    useHoverEffect(titleRef);
    useHoverEffect(titleRef2);
    useHoverEffect(rezyRef);
    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
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
                                Join the AI Cult of Ronin and let our advanced algorithms
                                automatically atomically allocate your crypto into the highest-yielding DeFi opportunities.
                            </motion.div>
                        </SectionDescription>
                    </SectionHeadingHighlighted>
                    <VaultActionCards />
                </motion.div>
            </SectionWrapperRounded>
        </motion.div>
    )
}
