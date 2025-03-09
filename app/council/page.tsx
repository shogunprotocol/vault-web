'use client';

import { Layout } from 'layouts/default';
import { Suspense, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Application } from '@splinetool/runtime';
import { staggerContainer, textVariant } from "../../libs/motion";
import useHoverEffect from '../../hooks/useHoverEffect';
import { SectionTitle, SectionTitleFade, SectionWrapper } from "../../components/lunar/Section";

export default function TheCouncil() {
  const titleRef = useRef(null);
  const titleRef2 = useRef(null);
  const canvasRef = useRef(null);

  useHoverEffect(titleRef);
  useHoverEffect(titleRef2);

  useEffect(() => {
    if (canvasRef.current) {
      const app = new Application(canvasRef.current);
      app.load('https://prod.spline.design/lgFTxPu1sReA4dZx/scene.splinecode');
    }
  }, []);

  return (
    <Suspense fallback={null}>
      <Layout theme="dark" className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
        >
          <SectionWrapper className="relative pt-64 py-8 lg:py-16">
            <motion.div
              variants={textVariant(0.2)}>

              <h1 className="group text-center font-display text-3xl font-light leading-tight lg:text-5xl z-10 mb-12 pt-10">
                <SectionTitle className="flex flex-col items-center justify-center pt-10">
                  <div className="font-basement uppercase" ref={titleRef}>
                    The Council of Ronin
                  </div>
                  <SectionTitleFade className="flex flex-col items-center justify-center">
                    <div className="font-aeonik" ref={titleRef2}>
                      The wisdom of the ancients will be revealed soon
                    </div>
                  </SectionTitleFade>
                </SectionTitle>
              </h1>

              <div className="relative w-full">
                <canvas ref={canvasRef} className="w-full h-[400px]" />
              </div>

              <div className="text-lg opacity-70 mt-8">
                Return to witness the awakening
              </div>
            </motion.div>
          </SectionWrapper>
        </motion.div>
      </Layout>
    </Suspense>
  );
}
