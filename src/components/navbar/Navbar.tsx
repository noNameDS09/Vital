'use client'

import React, { useEffect, useState } from 'react';
import { ShieldAlert, Lightbulb, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const router = useRouter()
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos < 50 || currentScrollPos < prevScrollPos) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <AnimatePresence>
      <motion.nav
        key="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed top-0 left-0 w-full z-50 px-4 py-3 border-b border-[var(--sidebar-border)] bg-[var(--sidebar)] text-[var(--sidebar-foreground)] shadow-md backdrop-blur-sm "
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <button onClick={()=> router.push('/')} className="flex items-center space-x-2 hover:cursor-pointer">
            <ShieldAlert className="text-[var(--sidebar-primary)]" size={28} />
            <span  className="text-xl font-bold tracking-tight">VITAL</span>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {['Dashboard'].map((item) => (
              <button
                key={item}
                // href=""
                onClick={() => router.push(`/profile`)}
                className="text-[var(--sidebar-foreground)] hover:text-[var(--sidebar-primary)] transition-colors text-sm font-medium"
              >
                {item}
              </button>
            ))}
              <button
                // key={item}
                // href=""
                onClick={() => router.push(`/about}`)}
                className="text-[var(--sidebar-foreground)] hover:text-[var(--sidebar-primary)] transition-colors text-sm font-medium"
              >
                About
              </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full text-[var(--sidebar-foreground)] hover:text-[var(--sidebar-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--sidebar-ring)]"
            >
              {theme === 'dark' ? <Lightbulb size={22} /> : <Moon size={22} />}
            </button>

            <button onClick={()=> router.push('/profile')} className="hidden md:block text-sm font-medium text-[var(--sidebar-foreground)] hover:cursor-pointer">
              User
            </button>
          </div>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};

export default Navbar;
