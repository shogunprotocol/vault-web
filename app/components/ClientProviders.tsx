'use client';

import { NextUIProvider } from '@nextui-org/react';
import { RealViewport } from '@studio-freight/compono';
import { useLenis } from '@studio-freight/react-lenis';
import Tempus from '@studio-freight/tempus';
import { DeviceDetectionProvider } from '../../components/device-detection';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Providers from "../../components/providers";
import { useStore } from '../../libs/store';
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import type { ReactNode } from 'react';

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
  const lenis = useLenis(ScrollTrigger.update);
  useEffect(ScrollTrigger.refresh, [lenis]);

  const isNavOpened = useStore(({ isNavOpened }) => isNavOpened);

  useEffect(() => {
    if (isNavOpened) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [lenis, isNavOpened]);

  return (
    <>
      <RealViewport />
      <DeviceDetectionProvider>
        <NextUIProvider>
          <Providers>
              {children}
              <Toaster richColors />
          </Providers>
        </NextUIProvider>
      </DeviceDetectionProvider>
    </>
  );
} 