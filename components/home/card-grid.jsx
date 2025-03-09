// CardGrid.js


'use client';
import { motion } from 'framer-motion';
import React from 'react';
import { staggerContainer } from "../../libs/motion";
import Card1 from './card-1';
import Card2 from './card-2';
import Card3 from './card-3';
import Card4 from './card-4';
import Card5 from './card-5';
const CardGrid = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="p-w sm:p-4 lg:p-20 align-end">
      <div className="grid grid-cols-1 sm:grid sm:grid-cols-4 lg:grid-cols-2 grid-rows-3 lg:grid-rows-3 gap-2 md:gap-2">
        <Card1 />
        <Card2 />
        <Card3 />
        <Card4 />
        <Card5 />
      </div>
    </motion.div>
  );
};

export default CardGrid;

