'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import useHoverEffect from '@/hooks/useHoverEffect';
import { staggerContainer, textVariant } from "@/libs/motion";
import Button from "@/components/lunar/Button";
import { SectionTitle, SectionTitleFade, SectionWrapper } from "@/components/lunar/Section";
import dynamic from 'next/dynamic';
import { useScrollLock } from '@/libs/useScrollLock';
import { useSiteReady } from '@/libs/site-ready-context';

// Import Spline dynamically to ensure it only loads on the client
const SplineCanvas = dynamic(() => import('@/components/SplineCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm rounded-lg">
      <div className="text-center">
        <div className="font-basement text-base text-basement-cyan">Loading 3D Model</div>
        <div className="w-32 h-1 bg-gray-800 mt-2 mx-auto rounded overflow-hidden">
          <div className="h-full bg-cyan-500 rounded animate-pulse" style={{width: '60%'}}></div>
        </div>
      </div>
    </div>
  )
});

// Lazy load sub-components
const LazyAeroStats = dynamic(() => import('@/components/sections/aero-stats').then(mod => ({ default: mod.AeroStats })), {
  ssr: false,
  loading: () => <div className="min-h-[200px]" />
});

const LazyMarqueeBrands = dynamic(() => import('@/components/marquee-brands'), {
  ssr: false
});

export function Hero() {
    const router = useRouter();
    const titleRef = useRef(null);
    const titleRef2 = useRef(null);
    const rezyRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [splineLoaded, setSplineLoaded] = useState(false);
    const sectionRef = useRef(null);
    
    // Council scene Spline URL
    const splineUrl = "https://prod.spline.design/lgFTxPu1sReA4dZx/scene.splinecode";

    useHoverEffect(titleRef);
    useHoverEffect(titleRef2);
    useHoverEffect(rezyRef);

    // Track visibility of the Spline section
    useEffect(() => {
        if (!sectionRef.current) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const goToDapp = () => {
        router.push('/council');
    };

    const isScrolling = useScrollLock();
    const { isFullyLoaded, animationsEnabled } = useSiteReady();

    // Use simplified version until fully loaded
    if (!isFullyLoaded || !animationsEnabled) {
        return (
            <div className="relative pt-32">
                <SectionWrapper className="py-8 lg:py-16">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="group text-center font-display text-3xl font-light leading-tight lg:text-5xl z-10 mb-12">
                            <div className="font-basement uppercase">
                                The Council of Ronin
                            </div>
                            <div className="font-aeonik">
                                Pitch your DeFi strategy and earn rewards for successful strategies.
                            </div>
                        </h1>
                        <div className="w-full h-[400px] bg-zinc-900/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <div className="font-basement text-lg text-basement-cyan">3D Experience</div>
                                <div className="text-sm text-white/60 mt-1">Loading page content...</div>
                            </div>
                        </div>
                    </div>
                </SectionWrapper>
            </div>
        );
    }

    return (
        <>
            {!isScrolling ? (
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
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

                            <div 
                                ref={sectionRef} 
                                id="spline-section" 
                                className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden"
                                style={{ height: '400px' }}
                            >
                                {!splineLoaded ? (
                                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm">
                                        <div className="text-center">
                                            <div className="font-basement text-lg text-basement-cyan">Loading 3D</div>
                                            <div className="w-32 h-1 bg-gray-800 mt-2 mx-auto rounded overflow-hidden">
                                                <div className="h-full bg-cyan-500 rounded animate-pulse" style={{width: '70%'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                                
                                {/* Only render SplineCanvas when we're ready for it */}
                                <div className="w-full h-full" style={{ display: splineLoaded ? 'block' : 'none' }}>
                                    <SplineCanvas 
                                        splineUrl={splineUrl}
                                        onLoad={() => setSplineLoaded(true)}
                                        className="rounded-lg"
                                    />
                                </div>
                                
                                {/* This invisible SplineCanvas just handles loading */}
                                <div className="opacity-0 pointer-events-none absolute top-0 left-0 w-1 h-1">
                                    <SplineCanvas 
                                        splineUrl={splineUrl}
                                        onLoad={() => setSplineLoaded(true)}
                                    />
                                </div>
                            </div>

                            <div className="mt-8">
                                <Button onClick={goToDapp} text="Pitch your strategy" />
                            </div>
                        </motion.div>
                    </SectionWrapper>
                    {/* Lazy load these components only when needed */}
                    {isVisible && isFullyLoaded && (
                        <>
                            <LazyAeroStats />
                            <LazyMarqueeBrands />
                        </>
                    )}
                </motion.div>
            ) : (
                <div className="relative pt-32">
                    <SectionWrapper className="py-8 lg:py-16">
                        <div className="flex flex-col items-center justify-center">
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
                        </div>
                    </SectionWrapper>
                </div>
            )}
        </>
    )
}
