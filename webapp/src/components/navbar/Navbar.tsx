'use client'

import React from 'react';
import { ShieldAlert, Lightbulb, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import LanguageSwitcher from '../translate/LanguageSwitcher';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4 border-b border-[var(--sidebar-border)] bg-[var(--sidebar)] text-[var(--sidebar-foreground)] shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ShieldAlert className="text-[var(--sidebar-primary)]" size={32} />
          <span className="text-2xl font-bold tracking-tight">
            VITAL
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#"
            className="text-[var(--sidebar-foreground)] hover:text-[var(--sidebar-primary)] transition-colors"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-[var(--sidebar-foreground)] hover:text-[var(--sidebar-primary)] transition-colors"
          >
            Patients
          </a>
          <a
            href="#"
            className="text-[var(--sidebar-foreground)] hover:text-[var(--sidebar-primary)] transition-colors"
          >
            Alerts
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-[var(--sidebar-foreground)] hover:text-[var(--sidebar-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--sidebar-ring)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Lightbulb size={24} /> : <Moon size={24} />}
          </button>

          <div className="hidden md:block">
            <span className="text-[var(--sidebar-foreground)]">Jane Doe, RN</span>
          </div>
        </div>
        {/* <LanguageSwitcher /> */}
      </div>
    </nav>
  );
};

export default Navbar;
