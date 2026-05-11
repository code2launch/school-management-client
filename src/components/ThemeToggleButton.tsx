'use client';

import { useEffect, useState } from 'react';
import { SunMedium, Moon } from 'lucide-react';

export default function ThemeToggleButton({ className = '' }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored ? stored === 'dark' : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`relative inline-flex h-9 w-16 items-center rounded-full border border-border bg-secondary transition-colors duration-300 hover:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
    >
      <span
        className={`absolute left-1 flex h-7 w-7 items-center justify-center rounded-full shadow-sm transition-transform duration-300 ${
          dark
            ? 'translate-x-7 bg-primary text-primary-foreground'
            : 'translate-x-0 bg-white text-amber-500'
        }`}
      >
        {dark ? <Moon size={14} /> : <SunMedium size={14} />}
      </span>
      <span className="sr-only">{dark ? 'Switch to light' : 'Switch to dark'}</span>
    </button>
  );
}
