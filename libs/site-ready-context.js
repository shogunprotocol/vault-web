'use client';
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { preloadResources } from '@/libs/preloadResources';
import { startMeasure, endMeasure, reportPerformance } from '@/libs/performance-monitor';

const SiteReadyContext = createContext({
  isReady: false,
  isFullyLoaded: false,
  loadingStage: 'initial',
  animationsEnabled: false,
});

export function SiteReadyProvider({ children }) {
  const [isReady, setIsReady] = useState(false);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [loadingStage, setLoadingStage] = useState('initial');
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const timeoutsRef = useRef([]);
  
  useEffect(() => {
    console.log('⚔️ Summoning the Ronin Council');

    // Clear all timeouts when unmounting
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);
  
  useEffect(() => {
    console.log('⚔️ Summoning the Ronin Council');
    startMeasure('TotalLoadTime');
    
    // Stage 1: Set initial loading state with a Shogun-themed message
    setLoadingStage('preparing-dojo');
    
    // Wait a bit to ensure UI is ready before starting resource loading
    const initialTimer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    timeoutsRef.current.push(initialTimer);
    
    // Stage 2: Preload resources
    if (isReady) {
      console.log('🏯 Gathering Ronin warriors');
      startMeasure('ResourcePreload');
      
      preloadResources()
        .then(() => {
          endMeasure('ResourcePreload');
          console.log('⚡ AI strategy engines online');
          setLoadingStage('forging-katana');
          
          // Wait a bit to ensure everything is rendered
          const postLoadTimer = setTimeout(() => {
            document.body.style.overflow = "auto";
            setIsFullyLoaded(true);
            setLoadingStage('honor-bound');
            endMeasure('TotalLoadTime');
            
            // Report overall performance
            const perfTimer = setTimeout(reportPerformance, 800);
            timeoutsRef.current.push(perfTimer);
            
            // Enable animations after a small delay - staggered approach
            const enableBasicAnimTimer = setTimeout(() => {
              // First enable basic animations
              console.log('⚔️ Deploying Ronin strategies');
              setAnimationsEnabled(true);
              
              // Then do some cleanup to reduce memory pressure
              const cleanupTimer = setTimeout(() => {
                console.log('🔥 Optimizing battle performance');
                // Force a garbage collection friendly state
                const gcPrompt = () => {
                  const arr = new Array(1000).fill(0);
                  arr.length = 0;
                };
                gcPrompt();
              }, 1500);
              
              timeoutsRef.current.push(cleanupTimer);
            }, 800);
            
            timeoutsRef.current.push(enableBasicAnimTimer);
          }, 300);
          
          timeoutsRef.current.push(postLoadTimer);
        });
    }
    
    // Initially disable scrolling
    document.body.style.overflow = "hidden";
    console.log('🛡️ Securing the perimeter');
    
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [isReady]);
  
  useEffect(() => {
    if (isFullyLoaded && animationsEnabled) {
      // A short delay to ensure everything is settled
      const scrollTimer = setTimeout(() => {
        console.log('🏯 Shogun fortress operational');
        document.body.style.overflow = 'auto'; // Make sure scrolling is enabled
        
        // Set a short timer to check for any scroll issues
        const scrollCheckTimer = setTimeout(() => {
          const scrollY = window.scrollY;
          console.log(`Council chamber depth: ${scrollY}px`);
          
          // Try to scroll a tiny bit to "prime" the scroll system
          if (scrollY === 0) {
            window.scrollTo(0, 1);
            window.scrollTo(0, 0);
          }
        }, 100);
        
        timeoutsRef.current.push(scrollCheckTimer);
      }, 300);
      
      timeoutsRef.current.push(scrollTimer);
    }
  }, [isFullyLoaded, animationsEnabled]);
  
  return (
    <SiteReadyContext.Provider value={{ 
      isReady, 
      isFullyLoaded, 
      loadingStage,
      animationsEnabled 
    }}>
      {children}
    </SiteReadyContext.Provider>
  );
}

export function useSiteReady() {
  return useContext(SiteReadyContext);
}
