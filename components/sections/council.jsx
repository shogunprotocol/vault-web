'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import useHoverEffect from '@/hooks/useHoverEffect';
import { staggerContainer, textVariant } from "@/libs/motion";
import Button from "@/components/lunar/Button";
import { SectionTitle, SectionTitleFade, SectionWrapper } from "@/components/lunar/Section";
import MarqueeBrands from '@/components/marquee-brands';
import { AeroStats } from '@/components/sections/aero-stats';
import dynamic from 'next/dynamic';

// Import Spline dynamically to ensure it only loads on the client
const SplineCanvas = dynamic(() => import('@/components/SplineCanvas'), {
  ssr: false
});

export function Hero() {
    const router = useRouter();

    const titleRef = useRef(null);
    const titleRef2 = useRef(null);
    const rezyRef = useRef(null);

    useHoverEffect(titleRef);
    useHoverEffect(titleRef2);
    useHoverEffect(rezyRef);

    const goToDapp = () => {
        router.push('/council');
    };

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            className="relative pt-32"
            viewport={{ once: false, amount: 0.1 }}
        >
            <SectionWrapper className="py-8 lg:py-16">
                <motion.div
                    variants={textVariant(0.2)}
                    className="flex flex-col items-center justify-center">

                    <h1 className="group text-center font-display text-3xl font-light leading-tight lg:text-5xl z-10 mb-12">
                        <SectionTitle>
                            <div className="font-basement uppercase" ref={titleRef}>
                                The Council of Ronin
                            </div>
                            <SectionTitleFade>
                                <div className="font-aeonik" ref={titleRef2}>
                                    Pitch your DeFi strategy and earn rewards for successful strategies.
                                </div>
                            </SectionTitleFade>
                        </SectionTitle>
                    </h1>

                    <div className="relative w-full">
                        <SplineCanvas splineUrl="https://prod.spline.design/lgFTxPu1sReA4dZx/scene.splinecode" />
                    </div>

                    <div className="mt-8">
                        <Button onClick={goToDapp} text="Pitch your strategy" />
                    </div>
                </motion.div>
            </SectionWrapper>
            <AeroStats />
            <MarqueeBrands />
        </motion.div>
    )
}
