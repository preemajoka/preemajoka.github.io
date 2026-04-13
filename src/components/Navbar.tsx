import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, Github, Linkedin, Mail, Settings, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Profile', path: '/profile' },
  { name: 'Projects', path: '/projects' },
];

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-[var(--fg)] text-[var(--bg)] border-2 border-[var(--border)] shadow-[2px_2px_0px_0px_var(--border)] group-hover:shadow-none group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all">
                <Settings size={20} className="animate-spin-slow" />
              </div>
              <span className="text-xl font-black tracking-tighter text-[var(--fg)] uppercase">
                Pree&apos;s<span className="text-[var(--accent-red)]"> Portfolio</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 text-sm font-black uppercase tracking-widest transition-all",
                  location.pathname === item.path 
                    ? "bg-[var(--fg)] text-[var(--bg)] shadow-[4px_4px_0px_0px_var(--accent-red)]" 
                    : "text-zinc-500 hover:text-[var(--fg)] hover:bg-[var(--pixel-dot)]"
                )}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 border-l-2 border-[var(--pixel-dot)] ml-6 pl-6">
              <button 
                onClick={toggleTheme}
                className="p-2 text-zinc-500 hover:text-[var(--accent-yellow)] transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <a href="https://linkedin.com/in/preeyansh-arora-majoka" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-[var(--accent-blue)] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/pree1010" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-[var(--fg)] transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-500 hover:text-zinc-900 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-100 bg-white"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    location.pathname === item.path 
                      ? "bg-zinc-100 text-zinc-900" 
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
