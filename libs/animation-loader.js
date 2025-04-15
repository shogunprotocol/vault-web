import { useEffect } from 'react';

export function useAnimationLoader() {
  useEffect(() => {
    // Load GSAP after everything else has initialized
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);
      gsap.defaults({ ease: 'none' });
      ScrollTrigger.defaults({ markers: false });
    };
    
    // Defer GSAP loading
    setTimeout(loadGSAP, 1000);
  }, []);
  
  return null;
}
