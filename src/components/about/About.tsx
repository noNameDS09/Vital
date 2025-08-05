'use client';
import React from 'react';
import { motion } from 'framer-motion';

import { GlowingEffectDemo } from '@/components/glow/Glow'
const LearnMore = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="bg-[var(--background)] text-[var(--foreground)] min-h-screen py-20 mt-10 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem] rounded-full bg-[var(--sidebar-primary)] opacity-10 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 10,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
      <div className="container mx-auto max-w-7xl">
        <motion.div
          variants={sectionVariants}
          className="text-center mb-20"
        >
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">
            Transforming ICU Care with <span className="text-[var(--primary)]">VITAL</span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto">
            Our multi-agent AI system provides an unprecedented level of vigilance, ensuring no subtle sign of patient deterioration is ever missed.
          </p>
        </motion.div>

        <GlowingEffectDemo />

        <motion.div variants={sectionVariants} className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-4">Ready to See VITAL in Action?</h2>
          <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto mb-8">
            Experience the power of proactive patient care and discover how our solution can reduce mortality rates and improve outcomes in your ICU.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl text-[var(--primary-foreground)] bg-[var(--primary)] font-semibold text-lg shadow-xl"
            >
              Request a Demo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl text-[var(--foreground)] border border-[var(--border)] bg-[var(--card)] font-semibold text-lg shadow-xl"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LearnMore;
