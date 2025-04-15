'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Application } from '@splinetool/runtime';

// Directly import SplineCanvas
const SplineCanvas = dynamic(() => import('@/components/SplineCanvas'), {
  ssr: false
});

interface VaultSplineCanvasProps {
  splineUrl: string;
  className?: string;
  onLoad?: (app: Application) => void;
}

export default function VaultSplineCanvas({ splineUrl, className = '', onLoad }: VaultSplineCanvasProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="relative w-full h-full">
      {/* Custom loading UI */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm rounded-lg">
          <div className="text-center">
            <div className="font-basement text-lg text-basement-cyan">Loading Vault Model</div>
            <div className="w-32 h-1 bg-gray-800 mt-2 mx-auto rounded overflow-hidden">
              <div className="h-full bg-cyan-500 rounded animate-pulse" style={{width: '70%'}}></div>
            </div>
          </div>
        </div>
      )}
      
      <SplineCanvas
        splineUrl={splineUrl}
        onLoad={(app) => {
          console.log('VaultSplineCanvas loaded');
          setIsLoaded(true);
          if (onLoad) onLoad(app);
        }}
        className={className}
        hideLoadingUI={true}
        waitForSiteReady={false}  // Don't wait for site ready
      />
    </div>
  );
} 