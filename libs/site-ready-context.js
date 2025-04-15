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
    console.log('🚀 Starting site loading sequence');

    // Clear all timeouts when unmounting
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);
  
  useEffect(() => {
    console.log('🚀 Starting site loading sequence');
    startMeasure('TotalLoadTime');
    
    // Stage 1: Set initial loading state
    setLoadingStage('ui-ready');
    
    // Wait a bit to ensure UI is ready before starting resource loading
    const initialTimer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    timeoutsRef.current.push(initialTimer);
    
    // Stage 2: Preload resources
    if (isReady) {
      console.log('🔄 Starting resource preloading');
      startMeasure('ResourcePreload');
      
      preloadResources()
        .then(() => {
          endMeasure('ResourcePreload');
          console.log('📦 Resources preloaded');
          setLoadingStage('enabling-scroll');
          
          // Wait a bit to ensure everything is rendered
          const postLoadTimer = setTimeout(() => {
            document.body.style.overflow = "auto";
            setIsFullyLoaded(true);
            setLoadingStage('complete');
            endMeasure('TotalLoadTime');
            
            // Report overall performance
            const perfTimer = setTimeout(reportPerformance, 800);
            timeoutsRef.current.push(perfTimer);
            
            // Enable animations after a small delay - staggered approach
            const enableBasicAnimTimer = setTimeout(() => {
              // First enable basic animations
              console.log('🎭 Enabling basic animations');
              setAnimationsEnabled(true);
              
              // Then do some cleanup to reduce memory pressure
              const cleanupTimer = setTimeout(() => {
                console.log('🧹 Running post-animation cleanup');
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
    console.log('🛑 Scrolling disabled during load');
    
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [isReady]);
  
  useEffect(() => {
    if (isFullyLoaded && animationsEnabled) {
      // A short delay to ensure everything is settled
      const scrollTimer = setTimeout(() => {
        console.log('🖱 Ensuring smooth scrolling is ready');
        document.body.style.overflow = 'auto'; // Make sure scrolling is enabled
        
        // Set a short timer to check for any scroll issues
        const scrollCheckTimer = setTimeout(() => {
          const scrollY = window.scrollY;
          console.log(`Current scroll position: ${scrollY}px`);
          
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
