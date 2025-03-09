'use client';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { staggerContainer, textVariant } from "../../libs/motion";
import s from './home.module.scss';

const VideoContainer = () => {
    const [isLoading, setIsLoading] = useState(true);
    
    // Lower resolution video for mobile devices
    const videoSrc = {
        highRes: "https://mx-assets.ams3.digitaloceanspaces.com/videos/multiversx-header-2k.mp4#t=0.1",
        lowRes: "/video/540p_belt.mp4"
    };
    
    // Detect if on mobile for responsive optimization
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        // Simple mobile detection
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    // Video source based on device
    const currentSrc = isMobile ? videoSrc.lowRes : videoSrc.highRes;

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
        >
            {isLoading && (
                <div className={s.videoPlaceholder}>
                    {/* Optional loading indicator or static placeholder image */}
                </div>
            )}
            
            <motion.video
                variants={textVariant(0.3)}
                autoPlay 
                muted 
                loop 
                className={s.backgroundVideo}
                preload="auto"
                poster="/images/placeholder-video.png" // Add a poster image
                onCanPlay={() => setIsLoading(false)}
                style={{ opacity: isLoading ? 0 : 1 }}
                playsInline
            >
                <source
                    src={currentSrc}
                    type="video/mp4"
                />
                {/* Add WebM format for better performance in supported browsers */}
                <source 
                    src={currentSrc.replace('.mp4', '.webm')}
                    type="video/webm"
                />
            </motion.video>
        </motion.div>
    );
};

export default VideoContainer;
