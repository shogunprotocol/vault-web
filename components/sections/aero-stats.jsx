'use client';

import { Application } from '@splinetool/runtime';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import useHoverEffect from '../../hooks/useHoverEffect';
import { staggerContainer, textVariant } from "../../libs/motion";
import { SectionTitle, SectionTitleFade, SectionWrapper } from "../lunar/Section";

export function AeroStats() {
    const router = useRouter();

    const titleRef = useRef(null);
    const rezyRef = useRef(null);
    const titleRef2 = useRef(null);
    const apyRef = useRef(null);

    useHoverEffect(titleRef);
    useHoverEffect(rezyRef);
    useHoverEffect(titleRef2);
    useHoverEffect(apyRef);

    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const app = new Application(canvasRef.current);
            app.load('https://prod.spline.design/oIny4XXPAeh8FkXp/scene.splinecode');
        }
    }, []);

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            className="relative"
            viewport={{ once: false, amount: 0.1 }}
        >
            <SectionWrapper>
                <motion.div
                    variants={textVariant(0.2)}

                    className="flex flex-col items-center justify-center">

                    <h1 className="group text-center font-display text-3xl font-light leading-tight lg:text-5xl z-10">

                        <SectionTitle >

                            <div className='font-basement uppercase' ref={rezyRef}>
                                current apy
                            </div>
                            <SectionTitleFade>
                                <div className='font-basement text-xl p-4 uppercase' ref={titleRef}>
                                    (Annual Percentage Yield)
                                </div>
                            </SectionTitleFade>
                        </SectionTitle>
                    </h1>

                    <motion.div
                        variants={textVariant(0.4)}
                        className="relative mx-auto w-full z-10">
                        <div className="relative flex flex-col items-center justify-center w-full h-full p-4">
                            <div className="flex w-full mx-auto p-4">
                                <canvas ref={canvasRef} className="relative top-1/2 left-0 w-full h-full z-1" />
                                <div ref={apyRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl font-basement text-white">7%</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </SectionWrapper>
        </motion.div>
    )
}
