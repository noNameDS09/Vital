'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BarChart2, ShieldCheck } from 'lucide-react';
import { Inter, Roboto } from 'next/font/google';


const inter = Inter({
    weight: ['400', '700'],
    subsets: ['latin'],
    
})

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
})

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="relative overflow-hidden w-full min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)] py-20">
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
      
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4">
            <span className={`${roboto.className} text-[var(--primary)]`}>VITAL</span>
            . Intelligent Patient Monitoring.
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-[var(--muted-foreground)] max-w-4xl mx-auto">
            The next generation of ICU monitoring. VITAL uses an intelligent multi-agent system to predict and prevent patient deterioration with unparalleled accuracy.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
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
            Learn More
          </motion.button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
            <div className="flex items-center space-x-4 mb-4">
              <Sparkles size={40} className="text-[var(--primary)]" />
              <h3 className="text-xl font-bold">Predictive AI</h3>
            </div>
            <p className="text-[var(--muted-foreground)]">
              Proactively identify subtle signs of patient deterioration before they become critical, giving medical staff a crucial window for intervention.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
            <div className="flex items-center space-x-4 mb-4">
              <BarChart2 size={40} className="text-[var(--primary)]" />
              <h3 className="text-xl font-bold">Explainable Insights</h3>
            </div>
            <p className="text-[var(--muted-foreground)]">
              Get clear, data-driven explanations for every alert, so you can understand the "why" behind the "what" and act with confidence.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
            <div className="flex items-center space-x-4 mb-4">
              <ShieldCheck size={40} className="text-[var(--primary)]" />
              <h3 className="text-xl font-bold">Real-time Security</h3>
            </div>
            <p className="text-[var(--muted-foreground)]">
              Secure, real-time data processing and role-based alerts ensure the right information reaches the right person at the right time.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
