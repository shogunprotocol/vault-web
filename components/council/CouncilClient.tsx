'use client';

import { Layout } from '@/layouts/default';
import { Suspense, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, textVariant } from "@/libs/motion";
import useHoverEffect from '@/hooks/useHoverEffect';
import { SectionTitle, SectionTitleFade, SectionWrapper } from "@/components/lunar/Section";
import dynamic from 'next/dynamic';
import { useSiteReady } from '@/libs/site-ready-context';
import { GridPattern } from "@/components/lunar/GridPattern";
import { SpotlightCard } from "@/components/lunar/SpotlightCard";
import Sponsors from './sponsors';
import ComingSoonInline from '@/components/ComingSoonInline';

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

export default function CouncilClient() {
  const titleRef = useRef(null);
  const titleRef2 = useRef(null);
  const splineRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { isFullyLoaded, animationsEnabled } = useSiteReady();
  
  // Council page Spline URL - same as in the hero section
  const splineUrl = "https://prod.spline.design/lgFTxPu1sReA4dZx/scene.splinecode";

  useHoverEffect(titleRef);
  useHoverEffect(titleRef2);
  
  // Sample grid blocks for card backgrounds
  const gridBlocks = [
    [2, 5],
    [3, 1],
    [4, 3],
  ];
  
  // Track visibility of the Spline section
  useEffect(() => {
    if (!splineRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(splineRef.current);
    return () => observer.disconnect();
  }, []);

  // Force content to appear on the correct page
  useEffect(() => {
    // Check if we're on the council page
    if (typeof window !== 'undefined') {
      const isCouncilPage = window.location.pathname.includes('/council');
      if (isCouncilPage) {
        console.log('Council page loaded, ensuring content is visible');
        // Content should be visible on this page
      }
    }
  }, []);

  return (
    <Suspense fallback={
      <div className="min-h-[80vh] bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4 font-basement">The Council of Ronin</h1>
          <p className="animate-pulse">Loading the wisdom of the ancients...</p>
        </div>
      </div>
    }>
      <Layout theme="dark" className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full"
        >
          <SectionWrapper className="relative py-8 lg:py-16 mt-16">
            <motion.div
              variants={textVariant(0.2)}
              className="w-full max-w-4xl mx-auto">

              <h1 className="group text-center font-display text-3xl font-light leading-tight lg:text-5xl z-10 mb-12">
                <SectionTitle className="flex flex-col items-center justify-center">
                  <div className="font-basement uppercase" ref={titleRef}>
                    The Council of Ronin
                  </div>
                  <SectionTitleFade className="flex flex-col items-center justify-center">
                    <div className="font-aeonik" ref={titleRef2}>
                      Pitch your DeFi strategy and earn rewards for successful strategies.
                    </div>
                  </SectionTitleFade>
                </SectionTitle>
              </h1>

              <div 
                ref={splineRef}
                className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden"
                style={{ height: '400px' }}
              >
                {/* Only render SplineCanvas if animations are enabled */}
                {animationsEnabled ? (
                  <SplineCanvas 
                    splineUrl={splineUrl} 
                    className="rounded-lg"
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'rgba(20, 20, 20, 0.2)'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm rounded-lg">
                    <div className="text-center">
                      <div className="font-basement text-lg text-basement-cyan">3D Experience</div>
                      <div className="text-sm text-white/60 mt-1">Loading resources...</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 mb-12">
                <button
                  className="px-8 py-3 bg-basement-cyan text-black font-basement uppercase rounded-lg hover:bg-cyan-400 transition-colors"
                  onClick={() => { /* add your action here */ }}
                >
                  Pitch your strategy
                </button>
              </div>
              
              {/* APY Section */}
              <motion.div variants={textVariant(0.6)} className="mb-16">
                <div className="text-center mb-2 opacity-80">
                  <span className="text-base uppercase">Current APY</span>
                </div>
                <div className="text-center">
                  <span className="text-4xl md:text-6xl font-basement text-basement-cyan">
                    16%
                  </span>
                  <div className="text-sm opacity-60 mt-1">
                    (Annual Percentage Yield)
                  </div>
                </div>
              </motion.div>
              
              {/* Strategy Card */}
              <motion.div variants={textVariant(0.8)} className="mb-16 max-w-3xl mx-auto">
                <SpotlightCard
                  size={250}
                  className="relative w-full rounded-xl bg-white/10 p-6"
                  style={{ minHeight: '450px' }}
                >
                  <div className="absolute inset-px rounded-[calc(0.75rem-1px)] bg-zinc-800/90"></div>

                  <GridPattern
                    size={48}
                    offsetX={0}
                    offsetY={0}
                    className="absolute -top-1/2 right-0 h-[200%] w-2/3 skew-y-12 stroke-white/10 stroke-[1.5] [mask-image:linear-gradient(-85deg,black,transparent)]"
                  >
                    {gridBlocks.map(([row, column], index) => (
                      <GridPattern.Block
                        key={index}
                        row={row}
                        column={column}
                        className="fill-white/2.5 transition duration-500 hover:fill-white/5"
                      />
                    ))}
                  </GridPattern>

                  <div className="relative flex flex-col w-full h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-belgro text-white/80 text-sm">Current Strategy</div>
                        <div className="font-basement text-basement-cyan text-lg">AI USDC Yield Optimizer</div>
                      </div>
                      <div className="text-right">
                        <div className="font-belgro text-white/80 text-sm">APY</div>
                        <div className="font-basement text-basement-cyan text-lg">16%</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-3 border-y border-white/10">
                      <div>
                        <div className="text-xs text-white/60 mb-1">Total Value Locked</div>
                        <div className="text-sm font-basement text-white">$5.2M</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/60 mb-1">Votes</div>
                        <div className="text-sm font-basement text-basement-cyan">1,342</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/60 mb-1">Reward Pool</div>
                        <div className="text-sm font-basement text-white">$80,000</div>
                      </div>
                    </div>

                    {/* Add the inline coming soon component with proper spacing */}
                    <div className="flex-grow flex flex-col justify-end">
                      <ComingSoonInline />
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
              
              {/* Sponsors Section */}
              <Sponsors />
            </motion.div>
          </SectionWrapper>
        </motion.div>
      </Layout>
    </Suspense>
  );
} 