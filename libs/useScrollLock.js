import { useState, useEffect } from 'react';
import { throttle } from './throttle';

export function useScrollLock() {
  const [isScrolling, setIsScrolling] = useState(false);
  
  useEffect(() => {
    let scrollTimer;
    
    const handleScroll = throttle(() => {
      if (!isScrolling) setIsScrolling(true);
      
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    }, 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, [isScrolling]);
  
  return isScrolling;
}
