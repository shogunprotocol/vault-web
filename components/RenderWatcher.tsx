'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { useSiteReady } from '@/libs/site-ready-context';

interface RenderWatcherProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  delay?: number;
  forceRender?: boolean;
}

/**
 * RenderWatcher only renders its children when they become visible in the viewport
 * and when animations are enabled in the site context.
 * 
 * This helps improve performance by delaying the loading of heavy components.
 */
export default function RenderWatcher({
  children,
  fallback,
  rootMargin = '0px',
  threshold = 0.1,
  delay = 500,
  forceRender = false
}: RenderWatcherProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const timerRef = useRef<number | null>(null);
  const { animationsEnabled } = useSiteReady();
  
  useEffect(() => {
    // If forceRender is true, render immediately regardless of visibility
    if (forceRender) {
      setShouldRender(true);
      return;
    }
    
    // Don't bother setting up the observer if animations aren't enabled yet
    if (!animationsEnabled) {
      return;
    }
    
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);
        
        // Clear any existing timer to prevent memory leaks
        if (timerRef.current !== null) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        
        if (isIntersecting) {
          // Delay rendering slightly to prioritize visible UI elements
          timerRef.current = window.setTimeout(() => {
            setShouldRender(true);
            // Once rendered, disconnect the observer
            observer.disconnect();
            timerRef.current = null;
          }, delay);
        }
      },
      { rootMargin, threshold }
    );
    
    observer.observe(containerRef.current);
    
    // Clean up function
    return () => {
      observer.disconnect();
      
      // Clear any pending timers
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [animationsEnabled, forceRender, rootMargin, threshold, delay]);
  
  return (
    <div ref={containerRef} style={{ minHeight: '50px' }}>
      {shouldRender ? children : fallback || null}
    </div>
  );
} 