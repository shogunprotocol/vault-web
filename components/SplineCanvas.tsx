'use client';

import React, { useRef, useState, useEffect, memo, useCallback } from 'react';
import { startMeasure, endMeasure } from '@/libs/performance-monitor';
import { useSiteReady } from '@/libs/site-ready-context';
import { Application } from '@splinetool/runtime';
import RenderWatcher from '@/components/RenderWatcher';

// Extend interface to support both the new scene prop and the legacy splineUrl prop
interface SplineCanvasProps {
  scene?: string;
  splineUrl?: string; // For backward compatibility
  onLoad?: (app: Application) => void;
  className?: string;
  style?: React.CSSProperties;
  waitForSiteReady?: boolean;
  hideLoadingUI?: boolean;
}

const SplineCanvas = memo(
  ({ scene, splineUrl, onLoad, className = '', style = {}, waitForSiteReady = true, hideLoadingUI = false, ...props }: SplineCanvasProps) => {
    // Use scene if provided, otherwise fall back to splineUrl for backward compatibility
    const sceneUrl = scene || splineUrl || '';
    
    // Warn about deprecated prop in development
    useEffect(() => {
      if (process.env.NODE_ENV === 'development' && !scene && splineUrl) {
        console.warn('The splineUrl prop is deprecated. Please use scene instead.');
      }
    }, [scene, splineUrl]);
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const appRef = useRef<Application | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);
    const { animationsEnabled } = useSiteReady();

    const loadSpline = useCallback(async () => {
      if (!canvasRef.current || !sceneUrl) return;
      
      try {
        setLoading(true);
        startMeasure(`SplineLoad-${sceneUrl.substring(sceneUrl.lastIndexOf('/') + 1)}`);
        
        // Create a new Spline app instance
        const app = new Application(canvasRef.current);
        
        // Load the scene
        await app.load(sceneUrl);
        
        // Store the app instance for cleanup
        appRef.current = app;
        
        // Signal that loading is complete
        setLoading(false);
        endMeasure(`SplineLoad-${sceneUrl.substring(sceneUrl.lastIndexOf('/') + 1)}`);
        
        // Call the onLoad callback if provided
        if (onLoad) onLoad(app);
      } catch (err) {
        console.error('Failed to load Spline scene:', err);
        setError(err instanceof Error ? err : new Error('Failed to load Spline scene'));
        setLoading(false);
      }
    }, [sceneUrl, onLoad]);

    useEffect(() => {
      // Only load when animations are enabled or we're not waiting for site ready
      if ((waitForSiteReady && !animationsEnabled) || !canvasRef.current) {
        return;
      }
      
      loadSpline();
      
      // Cleanup function
      return () => {
        if (appRef.current) {
          try {
            // Clean up any resources used by the Spline app
            console.log('🧹 Cleaning up Spline resources');
            
            // Force dispose of the app
            if (typeof appRef.current.dispose === 'function') {
              appRef.current.dispose();
            }
            
            // Clear any references to the app
            if (canvasRef.current) {
              const gl = canvasRef.current.getContext('webgl2') || canvasRef.current.getContext('webgl');
              if (gl) {
                // Force WebGL context loss to free GPU resources
                const loseContextExt = gl.getExtension('WEBGL_lose_context');
                if (loseContextExt) {
                  loseContextExt.loseContext();
                }
                
                // Clear WebGL context
                gl.finish();
              }
              
              // Clear canvas
              const ctx2d = canvasRef.current.getContext('2d');
              if (ctx2d) {
                ctx2d.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
              }
            }
            
            appRef.current = null;
            
            // Force a small garbage collection hint
            setTimeout(() => {
              const arr = new Array(100).fill(0);
              arr.length = 0;
            }, 100);
          } catch (e) {
            console.error('Error during Spline cleanup:', e);
          }
        }
      };
    }, [animationsEnabled, waitForSiteReady, loadSpline]);

    const renderContent = () => (
      <>
        {error ? (
          <div className="spline-error flex items-center justify-center text-center p-4 bg-zinc-900/80 rounded-lg h-full">
            <div>
              <div className="font-basement text-lg text-basement-cyan">3D Visualization</div>
              <div className="text-sm text-white/70 mt-1">Failed to load 3D content</div>
            </div>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className={`spline-canvas ${className}`}
            style={{
              ...style,
              opacity: loading ? 0 : 1,
              transition: 'opacity 0.5s ease-in-out',
              width: '100%',
              height: '100%',
            }}
          />
        )}
        {loading && !hideLoadingUI && (
          <div className="spline-loading absolute inset-0 flex items-center justify-center text-center bg-zinc-900/80 backdrop-blur-sm rounded-lg z-10">
            <div>
              <div className="font-basement text-lg text-basement-cyan">Loading 3D</div>
              <div className="w-32 h-1 bg-gray-800 mt-2 mx-auto rounded overflow-hidden">
                <div className="h-full bg-cyan-500 rounded animate-pulse" style={{width: '70%'}}></div>
              </div>
            </div>
          </div>
        )}
      </>
    );

    // If we need to wait for the site to be ready, wrap with RenderWatcher
    if (waitForSiteReady) {
      return (
        <RenderWatcher 
          fallback={
            <div 
              className="spline-placeholder flex items-center justify-center text-center bg-zinc-900/60 backdrop-blur-sm rounded-lg" 
              style={{ ...style, minHeight: '200px' }}
            >
              <div>
                <div className="font-basement text-lg text-basement-cyan">3D Experience</div>
                <div className="text-sm text-white/60 mt-1">Loading resources...</div>
              </div>
            </div>
          }
          threshold={0.05}
          delay={200}
        >
          <div className="relative w-full h-full">
            {renderContent()}
          </div>
        </RenderWatcher>
      );
    }

    // Otherwise just render directly
    return (
      <div className="relative w-full h-full">
        {renderContent()}
      </div>
    );
  }
);

SplineCanvas.displayName = 'SplineCanvas';

export default SplineCanvas; 