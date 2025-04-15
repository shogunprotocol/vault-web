'use client';

import { Layout } from '@/layouts/default';
import CardGrid from '@/components/home/card-grid';
import s from '@/components/home-page/home.module.scss';
import TitlesContainer from '@/components/home-page/titles-container';
import VideoContainer from '@/components/home-page/video-container';
import { Suspense, useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useSiteReady } from '@/libs/site-ready-context';
import React from 'react';

// Lazy load heavy components
const LazySecondaryFeatures = dynamic(() => import('@/components/sections/features').then(mod => ({ default: mod.SecondaryFeatures })), {
  ssr: false,
  loading: () => <div className="min-h-[400px]" />
});

const LazyHero = dynamic(() => import('@/components/sections/council').then(mod => ({ default: mod.Hero })), {
  ssr: false,
  loading: () => <div className="min-h-[400px]" />
});

// Memoize the Home component to prevent re-renders
const Home = React.memo(() => {
  const { isFullyLoaded } = useSiteReady();
  const [componentsLoaded, setComponentsLoaded] = useState(false);
  const heroSectionRef = useRef(null);
  
  // Ensure we prioritize loading essentials first
  useEffect(() => {
    if (isFullyLoaded && !componentsLoaded) {
      // Preload images needed for the hero section
      const preloadImage = (src) => {
        const img = new Image();
        img.src = src;
      };
      
      // Preload the placeholder for better initial display
      preloadImage('/images/placeholder-video.png');
      setComponentsLoaded(true);
    }
  }, [isFullyLoaded, componentsLoaded]);
  
  return (
    <Layout theme="dark" className={s.home}>
      <div className="relative" id="hero-section" ref={heroSectionRef}>
        {/* Video section with content overlay */}
        <div className={s['video-wrapper']}>
          {/* Memoized components will maintain their state */}
          <VideoContainer />
          <div className={s.container}>
            <section className={s.content}>
              <TitlesContainer />
            </section>
            <div className={s.cardGridContainer}>
              <CardGrid />
            </div>
          </div>
        </div>
      </div>
      
      {/* Only load these components once the main content is stable */}
      {componentsLoaded && (
        <div>
          <LazySecondaryFeatures />
          <LazyHero />
        </div>
      )}
    </Layout>
  );
});

Home.displayName = 'HomePage';

// Wrap in Suspense at the export level
export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <Home />
    </Suspense>
  );
}
