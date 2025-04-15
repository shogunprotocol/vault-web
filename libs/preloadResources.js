import { startMeasure, endMeasure } from './performance-monitor';

export async function preloadResources() {
  console.log('📋 Starting resource preloading');
  return new Promise(async (resolve) => {
    try {
      // Preload Spline runtime
      console.log('🔍 Preloading Spline runtime');
      startMeasure('SplineRuntimePreload');
      await import('@splinetool/runtime').catch(error => {
        console.warn('Spline runtime preload warning:', error);
      });
      endMeasure('SplineRuntimePreload');
      console.log('✅ Spline runtime preloaded');
      
      // Preload main video with better error handling
      console.log('🎬 Preloading video');
      startMeasure('VideoPreload');
      
      const videoPromise = new Promise((resolveVideo) => {
        // Using fetch instead of video element for more reliable caching
        fetch('/video/540p_belt.mp4', { method: 'HEAD' })
          .then(() => {
            console.log('✅ Video URL request successful');
            resolveVideo();
          })
          .catch(err => {
            console.warn('⚠️ Video preload warning:', err);
            resolveVideo();
          });
        
        // Add a more aggressive timeout just for video
        setTimeout(() => {
          console.log('⚠️ Video preload timeout');
          resolveVideo();
        }, 800);
      });
      
      // Set a shorter timeout
      const timeoutPromise = new Promise((resolveTimeout) => {
        setTimeout(() => {
          console.log('⚠️ Resource preload timeout reached');
          resolveTimeout();
        }, 1200);  // Even shorter timeout
      });
      
      // Wait for either video or timeout
      await Promise.race([videoPromise, timeoutPromise]);
      endMeasure('VideoPreload');
      
      // Check font loading
      if (document.fonts) {
        console.log('🔤 Checking font loading status');
        startMeasure('FontsCheck');
        try {
          // Set timeout for font loading as well
          const fontPromise = document.fonts.ready;
          const fontTimeoutPromise = new Promise(resolve => setTimeout(resolve, 800));
          await Promise.race([fontPromise, fontTimeoutPromise]);
        } catch (fontError) {
          console.warn('⚠️ Font loading warning:', fontError);
        }
        endMeasure('FontsCheck');
        console.log('✅ Fonts loaded or timeout reached');
      }
      
      console.log('🎉 All resources preloaded');
      resolve();
    } catch (error) {
      console.error('❌ Error in preloadResources:', error);
      resolve(); // Resolve anyway to prevent blocking
    }
  });
}
