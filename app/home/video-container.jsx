
'use client';
import { motion } from 'framer-motion';
import React from 'react';
import { staggerContainer, textVariant } from "../../libs/motion";
import s from './home.module.scss';

const VideoContainer = () => {
    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
        >
            <motion.video
                variants={textVariant(0.3)}
                autoPlay muted loop className={s.backgroundVideo}>
                <source
                    src="https://mx-assets.ams3.digitaloceanspaces.com/videos/multiversx-header-2k.mp4#t=0.1"
                    type="video/mp4"
                />
            </motion.video>
        </motion.div>

    );
};

export default VideoContainer;
