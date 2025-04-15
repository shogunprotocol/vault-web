'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { textVariant } from "@/libs/motion";

const sponsors = [
  {
    name: 'Shogun',
    logo: '/images/logo/shogun_logo.png',
    alt: 'Shogun Logo'
  },
  {
    name: 'Allora',
    logo: '/images/logo/allora-logo-white.png',
    alt: 'Allora Logo'
  },
  {
    name: 'Sonic',
    logo: '/images/logo/sonic-logo.png',
    alt: 'Sonic Logo'
  },
  {
    name: 'deBridge',
    logo: '/images/logo/debridge-logo.png',
    alt: 'deBridge Logo'
  },
  {
    name: 'AI Cult',
    logo: '/images/logo/ai-cult-icon.png',
    alt: 'AI Cult Logo'
  }
];

export default function Sponsors() {
  return (
    <motion.div variants={textVariant(1.0)} className="mt-8 mb-16 w-full">
      <h2 className="text-xl font-basement mb-8 opacity-80 uppercase text-basement-cyan">Sponsors</h2>
      <div className="flex flex-wrap justify-center gap-8 items-center max-w-4xl mx-auto">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.name}
            className="w-40 h-16 bg-zinc-900/80 backdrop-blur-sm rounded flex items-center justify-center p-3 hover:bg-zinc-800/90 transition-all border border-white/10"
          >
            <Image 
              src={sponsor.logo}
              alt={sponsor.alt}
              width={120}
              height={40}
              className="max-w-full max-h-full object-contain"
              style={{ filter: 'brightness(1) contrast(1.1)' }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
} 