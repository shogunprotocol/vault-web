// components/LoadingScreen.jsx
'use client';

import { useEffect, useState } from 'react';
import { useSiteReady } from '@/libs/site-ready-context';

export default function LoadingScreen() {
  const { isReady, isFullyLoaded, loadingStage } = useSiteReady();
  const [progress, setProgress] = useState(0);
  const [debugVisible, setDebugVisible] = useState(false);
  
  // Tap 5 times to show debug info
  const [tapCount, setTapCount] = useState(0);
  
  const handleTap = () => {
    setTapCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setDebugVisible(true);
        return 0;
      }
      return newCount;
    });
  };
  
  useEffect(() => {
    // Use requestAnimationFrame for smoother progress updates
    let rafId;
    let prevTimestamp = 0;
    
    const updateProgress = (timestamp) => {
      // Only update every ~100ms
      if (timestamp - prevTimestamp > 100) {
        prevTimestamp = timestamp;
        
        setProgress((prev) => {
          if (prev >= 95) return prev;
          return Math.min(prev + Math.random() * 5, 95);
        });
      }
      
      if (!isFullyLoaded) {
        rafId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
      }
    };
    
    rafId = requestAnimationFrame(updateProgress);
    
    return () => cancelAnimationFrame(rafId);
  }, [isFullyLoaded]);

  if (isFullyLoaded) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
      style={{ 
        opacity: isReady && progress > 80 ? 1 - ((progress - 80) * 5) / 100 : 1,
        pointerEvents: isFullyLoaded ? 'none' : 'auto',
        transition: 'opacity 0.5s ease-in-out',
      }}
      onClick={handleTap}
    >
      <div className="text-center text-white">
        <h1 className="text-4xl mb-8 font-basement">Vault</h1>
        <div className="w-64 bg-gray-800 rounded-full h-2.5 mb-4">
          <div 
            className="bg-basement-cyan h-2.5 rounded-full" 
            style={{ width: `${progress}%`, transition: 'width 0.3s ease-out' }}
          ></div>
        </div>
        <p className="text-sm text-gray-400 mb-2">
          {progress < 100 ? loadingStage : 'Ready'}
        </p>
        
        {/* Debug info - visible after 5 taps */}
        {debugVisible && (
          <div className="mt-4 p-2 bg-gray-900 rounded text-left text-xs max-w-xs mx-auto overflow-auto max-h-40">
            <div>Stage: {loadingStage}</div>
            <div>Progress: {progress.toFixed(0)}%</div>
            <div>Ready: {isReady ? 'Yes' : 'No'}</div>
            <div>Fully Loaded: {isFullyLoaded ? 'Yes' : 'No'}</div>
            <div className="mt-2 font-bold">Tap here to dismiss</div>
          </div>
        )}
      </div>
    </div>
  );
}