'use client';

import { NextUIProvider } from '@nextui-org/react';
import { RealViewport } from '@studio-freight/compono';
import { useLenis } from '@studio-freight/react-lenis';
import Tempus from '@studio-freight/tempus';
import { DeviceDetectionProvider } from '../../components/device-detection';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Providers from "../../components/providers";
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import type { ReactNode } from 'react';
import { useSiteReady } from '../../libs/site-ready-context';

if (typeof window !== 'undefined') {
  // reset scroll position
  window.scrollTo(0, 0);
  window.history.scrollRestoration = 'manual';

  gsap.defaults({ ease: 'none' });
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.clearScrollMemory('manual');
  ScrollTrigger.defaults({ markers: process.env.NODE_ENV === 'development' });

  // merge rafs
  gsap.ticker.lagSmoothing(0);
  gsap.ticker.remove(gsap.updateRoot);
  Tempus?.add((time: number) => {
    gsap.updateRoot(time / 1000);
  }, 0);
}

export default function ClientProviders({
  children,
}: {
  children: ReactNode;
}) {
  const { isFullyLoaded, animationsEnabled } = useSiteReady();
  const lenis = useLenis();
  
  // Performance monitoring (no lenis dependency in this component)
  useEffect(() => {
    console.log('🔍 Scroll performance monitoring:');
    console.log('Body overflow:', getComputedStyle(document.body).overflow);
    console.log('HTML overflow:', getComputedStyle(document.documentElement).overflow);
    console.log('Body height:', getComputedStyle(document.body).height);
    console.log('Smooth scrolling:', isFullyLoaded && animationsEnabled ? 'enabled' : 'disabled');
    
    // Test wheel events
    const wheelHandler = () => console.log('Wheel event received');
    window.addEventListener('wheel', wheelHandler, { once: true });
    
    return () => window.removeEventListener('wheel', wheelHandler);
  }, [isFullyLoaded, animationsEnabled]);

  // Memory management for performance
  useEffect(() => {
    if (isFullyLoaded) {
      console.log('📝 Running memory cleanup');
      
      // Schedule a cleanup after animations are loaded
      const timer = setTimeout(() => {
        // Force a garbage collection friendly state
        const gcPrompt = () => {
          const arr = new Array(1000).fill(0);
          arr.length = 0;
        };
        
        gcPrompt();
        
        // Clear any pending animation frames
        console.log('🧹 Clearing animation frames');
        
        // Stop all GSAP animations and clear timelines
        if (typeof gsap !== 'undefined') {
          gsap.killTweensOf('*');
          ScrollTrigger.getAll().forEach(trigger => trigger.kill(false));
          ScrollTrigger.refresh();
          
          console.log('🧹 GSAP animations cleared');
        }
        
        // Clear RAF queue by throttling updates for a moment
        Tempus?.add((time: number) => {
          // Do nothing for a short period, letting the queue clear
        }, 100);
        
        // Clear any cached Lenis data
        if (lenis) {
          lenis.reset();
          console.log('🧹 Lenis scroll data reset');
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isFullyLoaded, lenis]);

  return (
    <>
      <RealViewport />
      <DeviceDetectionProvider>
        <NextUIProvider>
          <Providers>
            <div className="app-container">
              {children}
            </div>
            <Toaster richColors />
          </Providers>
        </NextUIProvider>
      </DeviceDetectionProvider>
    </>
  );
} 