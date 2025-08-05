'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  MessageCircleMore,
  AlertTriangle,
  HeartPulse,
  LineChart,
  GitPullRequest,
  CheckCircle,
} from 'lucide-react';

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
      className="bg-[var(--background)] text-[var(--foreground)] min-h-screen py-20 px-4 sm:px-6 lg:px-8"
    >
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

        <motion.div variants={sectionVariants} className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works: The Multi-Agent System</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
              <Brain size={48} className="text-[var(--primary)] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Patient Agent</h3>
              <p className="text-[var(--muted-foreground)]">
                Continuously analyzes individual vital signs, identifying micro-trends and anomalies specific to each patient's baseline.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
              <LineChart size={48} className="text-[var(--primary)] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Environment Agent</h3>
              <p className="text-[var(--muted-foreground)]">
                Processes external factors like medication schedules, lab results, and ICU environment data to provide critical context.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
              <MessageCircleMore size={48} className="text-[var(--primary)] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Collaborative Intelligence</h3>
              <p className="text-[var(--muted-foreground)]">
                The agents collaborate, cross-referencing their findings to generate highly accurate, contextual alerts and explanations.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={sectionVariants} className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg flex items-start space-x-4">
              <HeartPulse size={24} className="text-[var(--primary)] flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold mb-2">Real-time Data Ingestion</h4>
                <p className="text-[var(--muted-foreground)]">
                  Seamlessly integrates with patient monitors to analyze vital signs like heart rate, SpO₂, and blood pressure in real-time.
                </p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg flex items-start space-x-4">
              <GitPullRequest size={24} className="text-[var(--primary)] flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold mb-2">Predictive ML Models</h4>
                <p className="text-[var(--muted-foreground)]">
                  Sophisticated machine learning models predict critical events, giving doctors and nurses a proactive advantage.
                </p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg flex items-start space-x-4">
              <CheckCircle size={24} className="text-[var(--primary)] flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold mb-2">Explainable AI</h4>
                <p className="text-[var(--muted-foreground)]">
                  Utilizes advanced Explainable AI (XAI) techniques to provide clear reasons for every alert, fostering trust and faster decision-making.
                </p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg flex items-start space-x-4">
              <AlertTriangle size={24} className="text-[var(--primary)] flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold mb-2">Intuitive Alerting System</h4>
                <p className="text-[var(--muted-foreground)]">
                  Features a role-based alerting system that delivers prioritized, actionable notifications to the right medical professional.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={sectionVariants} className="text-center">
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
