'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Import the SplineCanvas with a custom loading component
const SplineCanvas = dynamic(() => import('@/components/SplineCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm rounded-lg">
      <div className="text-center">
        <div className="font-basement text-lg text-basement-cyan">Loading Council Model</div>
        <div className="w-32 h-1 bg-gray-800 mt-2 mx-auto rounded overflow-hidden">
          <div className="h-full bg-cyan-500 rounded animate-pulse" style={{width: '60%'}}></div>
        </div>
      </div>
    </div>
  )
});

interface CouncilSplineCanvasProps {
  splineUrl: string;
  className?: string;
  onLoad?: (app: any) => void;
}

export default function CouncilSplineCanvas({ splineUrl, className = '', onLoad }: CouncilSplineCanvasProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="relative w-full h-full">
      {/* Custom loading UI */}
      {!isLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm rounded-lg">
          <div className="text-center">
            <div className="font-basement text-lg text-basement-cyan">Loading Council 3D</div>
            <div className="w-32 h-1 bg-gray-800 mt-2 mx-auto rounded overflow-hidden">
              <div className="h-full bg-cyan-500 rounded animate-pulse" style={{width: '70%'}}></div>
            </div>
          </div>
        </div>
      )}
      
      {/* The actual SplineCanvas with loading UI hidden */}
      <SplineCanvas
        splineUrl={splineUrl}
        onLoad={(app) => {
          console.log('Council SplineCanvas loaded');
          setIsLoaded(true);
          if (onLoad) onLoad(app);
        }}
        className={className}
        hideLoadingUI={true}
        {...{ "data-component": "council-spline" }}
      />
    </div>
  );
} 