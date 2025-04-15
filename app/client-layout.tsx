// app/client-layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { RootProvider } from './providers';
import { SiteReadyProvider } from '@/libs/site-ready-context';
import LoadingScreen from '@/components/LoadingScreen';
import { useSiteReady } from '@/libs/site-ready-context';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isFullyLoaded, animationsEnabled } = useSiteReady(); 
  const [enableSmooth, setEnableSmooth] = useState(false);
  
  useEffect(() => {
    // Only enable smooth scrolling after full load AND animations are enabled
    if (isFullyLoaded && animationsEnabled) {
      // Wait a bit longer to ensure DOM is settled
      const timer = setTimeout(() => {
        console.log('🎯 Enabling smooth scrolling');
        setEnableSmooth(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isFullyLoaded, animationsEnabled]);

  return (
    <SiteReadyProvider>
      <LoadingScreen />
      <RootProvider>
        {children}
      </RootProvider>
    </SiteReadyProvider>
  );
}