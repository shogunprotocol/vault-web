'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import useHoverEffect from '@/hooks/useHoverEffect';
import { staggerContainer, textVariant } from "@/libs/motion";
import s from '@/components/home-page/home.module.scss';
import React from 'react';
import Link from 'next/link';

const TitlesContainer = React.memo(() => {
    const titleRef = useRef(null);
    const titleRef2 = useRef(null);
    const rezyRef = useRef(null);
    const containerRef = useRef(null);

    // Track if the component has been animated already
    const [hasAnimated, setHasAnimated] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useHoverEffect(titleRef);
    useHoverEffect(titleRef2);
    useHoverEffect(rezyRef);

    // Use intersection observer to track visibility
    useEffect(() => {
        if (!containerRef.current) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 } // 10% visibility triggers
        );
        
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={containerRef}
            variants={staggerContainer}
            // Only run the animation once
            initial={!hasAnimated ? "hidden" : "show"}
            animate={isVisible || hasAnimated ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            onAnimationComplete={() => {
                // Once the animation completes, mark it as done
                if (!hasAnimated) setHasAnimated(true);
            }}
            className="titles-container"
        >
            <motion.h1
                variants={textVariant(0.5)}
                className={s.title}
            >
                <motion.div
                    variants={textVariant(0.6)}
                    className={`font-basement ${s.studioRezy} `}
                    ref={rezyRef}
                >
                    Shōgun
                </motion.div>
                <motion.div
                    variants={textVariant(0.8)}
                    className={`font-aeonik text-5xl pb-2 ${s.titleText} `} ref={titleRef}>
                    | AI-Powered DeFi Yield Optimization ++
                </motion.div>
                <motion.div
                    variants={textVariant(1)}
                    className={`font-aeonik text-lg ${s.titleText2} relative`} ref={titleRef2}>
                    <span className="relative z-10 text-black"> Our AI automatically SLICES your crypto into the highest-yielding DeFi opportunities. </span>
                    <div className="absolute inset-0 bg-basement-cyan rounded-base"></div>
                </motion.div>
                <motion.div
                    variants={textVariant(1.2)}
                    className={`font-aeonik text-lg ${s.titleText2} relative`} ref={titleRef2}>
                    <span className="relative z-10 text-black"> ice cold decision making. no fear. no FOMO. </span>
                    <div className="absolute inset-0 bg-white rounded-base"></div>
                </motion.div>
                <motion.div
                    variants={textVariant(1.4)}
                    className={`font-aeonik text-lg pt-20 ${s.titleText2} `} ref={titleRef2}>
                    propose strategies to the AI ronin council. STAKE YOUR HONOR.
                </motion.div>
            </motion.h1>

            {/* CTA Buttons - Mismo estilo que el resto */}
            <motion.div
                variants={textVariant(1.6)}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16"
            >
                <Link href="/vault">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative"
                    >
                        <div className="px-8 py-4 bg-basement-cyan text-black font-basement font-bold text-lg uppercase tracking-wider hover:bg-cyan-400 transition-colors duration-200">
                            ⚔️ ENTER THE VAULT
                        </div>
                    </motion.div>
                </Link>
                
                <Link href="/council">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative"
                    >
                        <div className="px-8 py-4 border border-white/20 text-white font-basement font-bold text-lg uppercase tracking-wider hover:bg-white/10 transition-colors duration-200">
                            🏛️ THE COUNCIL
                        </div>
                    </motion.div>
                </Link>
            </motion.div>
        </motion.div>
    );
});

TitlesContainer.displayName = 'TitlesContainer';

export default TitlesContainer;

