'use client';

import { Cursor, CustomHead } from '@studio-freight/compono'
import { useLenis } from '@studio-freight/react-lenis'
import { Lenis } from '@studio-freight/react-lenis'
import cn from 'clsx'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Scrollbar } from '@/components/scrollbar'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense, useState } from 'react'
import s from '@/layouts/default/layout.module.scss'
import Link from 'next/link'
import { throttle } from '../../libs/throttle'
import { useSiteReady } from '../../libs/site-ready-context'

// Create a separate component for the scroll handling
function ScrollHandler() {
  const lenis = useLenis()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Handle hash scrolling when the URL changes
    const hash = window.location.hash
    if (hash && lenis) {
      lenis.scrollTo(hash)
    }
  }, [lenis, pathname, searchParams])

  return null
}

export function Layout({
  seo = { title: '', description: '', image: '', keywords: '' },
  children,
  theme = 'light',
  className,
}) {
  const { isFullyLoaded, animationsEnabled } = useSiteReady();
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [smoothScrollEnabled, setSmoothScrollEnabled] = useState(false);
  
  // Enable smooth scrolling only after site is fully loaded and ready
  useEffect(() => {
    if (isFullyLoaded && animationsEnabled) {
      // First show scrollbar
      setShowScrollbar(true);
      
      // Then enable smooth scrolling with a slight delay to prevent jank
      const timer = setTimeout(() => {
        setSmoothScrollEnabled(true);
        console.log('🔄 Smooth scrolling enabled');
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isFullyLoaded, animationsEnabled]);
  
  const content = (
    <div className={cn(`theme-${theme}`, s.layout, className)}>
      <Cursor />
      {showScrollbar && <Scrollbar />}
      <Header />
      <Suspense fallback={null}>
        <ScrollHandler />
      </Suspense>
      <main className={s.main}>{children}</main>
      <Footer />
    </div>
  );
  
  return (
    <>
      <CustomHead {...seo} />
      <Lenis root options={{
        duration: smoothScrollEnabled ? 0.8 : 0,
        smoothWheel: smoothScrollEnabled,
        smoothTouch: smoothScrollEnabled,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        normalizeWheel: true,
        syncTouch: true,
      }}>
        {content}
      </Lenis>
    </>
  );
}
