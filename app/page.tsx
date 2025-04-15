'use client';

import { default as dynamicImport } from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';

// Dynamic imports with SSR disabled for components using Spline
const HomePage = dynamicImport(() => import('../components/home-page/index'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[80vh] bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4">Vault</h1>
        <p>Loading the experience...</p>
      </div>
    </div>
  )
});

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // This will run once the initial JavaScript bundle has executed
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800); // Give the browser time to handle initial load
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <h1 className="text-4xl mb-4 font-basement">Vault</h1>
          <div className="animate-pulse">Loading the experience...</div>
        </div>
      </div>
    );
  }
  
  return (
    <Suspense fallback={null}>
      <HomePage />
    </Suspense>
  );
}
