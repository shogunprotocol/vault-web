'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import s from '@/components/home-page/home.module.scss';
import { useSiteReady } from '@/libs/site-ready-context';

const VideoContainer = React.memo(() => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadFailed, setLoadFailed] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef(null);
    const { isFullyLoaded } = useSiteReady();
    
    // Track if component is visible in viewport
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    
    // Set up intersection observer to track visibility
    useEffect(() => {
        if (!containerRef.current) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                
                // If video was already loaded and is now visible again, make sure it's playing
                if (entry.isIntersecting && videoLoaded && videoRef.current) {
                    videoRef.current.play().catch(err => {
                        console.warn('Could not resume video playback:', err);
                    });
                }
            },
            { threshold: 0.1 } // 10% of the element is visible
        );
        
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [videoLoaded]);
    
    // Set up video loading - only done once
    useEffect(() => {
        if (!isFullyLoaded || !videoRef.current) return;
        
        // Only load the video once
        if (videoLoaded) return;
        
        console.log('🎬 Starting video setup');
        
        // Direct source assignment and loading
        videoRef.current.src = "/video/540p_belt.mp4";
        videoRef.current.load();
        
        // Set fallback timeout in case video never loads
        const fallbackTimer = setTimeout(() => {
            console.log('⚠️ Video load timed out, showing placeholder');
            setLoadFailed(true);
            setIsLoading(false);
        }, 8000);
        
        // Play video as soon as it's ready
        const handleCanPlay = () => {
            console.log('✅ Video can play now, starting playback');
            try {
                videoRef.current.play();
                setIsLoading(false);
                setVideoLoaded(true);
            } catch (err) {
                console.error('❌ Video play error:', err);
                setLoadFailed(true);
                setIsLoading(false);
            }
        };
        
        videoRef.current.addEventListener('canplay', handleCanPlay);
        videoRef.current.addEventListener('error', () => {
            console.error('❌ Video load error');
            setLoadFailed(true);
            setIsLoading(false);
        });
        
        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('canplay', handleCanPlay);
            }
            clearTimeout(fallbackTimer);
        };
    }, [isFullyLoaded, videoLoaded]);
    
    // Maintain video playback when scrolling back to view
    useEffect(() => {
        if (isVisible && videoLoaded && videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(err => {
                console.warn('Failed to resume video:', err);
            });
        }
    }, [isVisible, videoLoaded]);
    
    return (
        <div ref={containerRef} className={s.videoContainer}>
            {/* Placeholder/overlay - only shown during loading or on failure */}
            {(isLoading || loadFailed) && (
                <div 
                    className="video-placeholder"
                    style={{ 
                        backgroundImage: `url('/images/placeholder-video.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: isLoading || loadFailed ? 1 : 0,
                        transition: 'opacity 0.8s ease-in-out',
                        zIndex: 2
                    }}
                >
                    {isLoading && !loadFailed && (
                        <div className="loading-indicator flex items-center justify-center h-full">
                            <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                                <div className="text-white">Loading video...</div>
                                <div className="w-full bg-gray-700 h-1 mt-2">
                                    <div className="bg-cyan-400 h-1 animate-pulse" style={{width: '70%'}}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            {/* Video element */}
            <video
                ref={videoRef}
                className="background-video"
                muted
                loop
                playsInline
                autoPlay
                poster="/images/placeholder-video.png"
                style={{ 
                    opacity: !isLoading && !loadFailed ? 1 : 0,
                    transition: 'opacity 0.8s ease-in-out'
                }}
            />
        </div>
    );
});

VideoContainer.displayName = 'VideoContainer';

export default VideoContainer;
