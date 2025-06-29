// CardGrid.js

'use client';
import { motion } from 'framer-motion';
import React from 'react';
import { staggerContainer } from "@/libs/motion";
import Card1 from '@/components/home/card-1';
import Card3 from '@/components/home/card-3';
import Card4 from '@/components/home/card-4';
import Card5 from '@/components/home/card-5';

const CardGrid = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="w-full max-w-7xl mx-auto p-4 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 auto-rows-fr">
        <Card4 />
        <Card5 />
        <Card1 />
        <Card3 />
      </div>
    </motion.div>
  );
};

export default CardGrid;

