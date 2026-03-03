import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SettingsOption {
  label: string;
  description?: string;
  type: 'toggle' | 'link' | 'divider';
  defaultValue?: boolean;
  href?: string;
}

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  tabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  settingsOptions?: SettingsOption[];
}

export function Header({ 
  title, 
  showBack = false, 
  tabs = ['For You', 'Following'], 
  activeTab = 'For You',
  onTabChange,
  settingsOptions,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    settingsOptions?.forEach(opt => {
      if (opt.type === 'toggle') initial[opt.label] = opt.defaultValue ?? true;
    });
    return initial;
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (label: string) => {
    setToggleStates(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 backdrop-blur-md transition-all duration-300",
        scrolled ? "bg-black/95 border-b border-[#ef4444]/20" : "bg-black/70"
      )}
    >
      <div className="border-b border-[#2f3336]">
        <div className="flex items-center justify-between px-4 h-14">
          {showBack ? (
            <motion.button 
              className="p-2 -ml-2 rounded-full hover:bg-red-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          ) : (
            <button className="lg:hidden" onClick={() => window.dispatchEvent(new Event('toggle-mobile-menu'))}>
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
              </div>
            </button>
          )}
          
          {title && (
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{title}</h1>
              {title === 'Sports' && (
                <span className="text-xs text-[#ef4444] bg-[#ef4444]/10 px-2 py-0.5 rounded-full">LIVE</span>
              )}
            </div>
          )}
          
          {settingsOptions && settingsOptions.length > 0 ? (
            <div className="relative" ref={dropdownRef}>
              <motion.button 
                className={cn(
                  "p-2 rounded-full transition-colors",
                  settingsOpen ? "bg-red-500/20 text-[#ef4444]" : "hover:bg-red-500/10 text-[#e7e9ea]"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSettingsOpen(!settingsOpen)}
              >
                <Settings className="w-5 h-5" />
              </motion.button>

              <AnimatePresence>
                {settingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-72 bg-[#16181c] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="font-bold text-sm">{title} Preferences</p>
                      <p className="text-xs text-[#71767b]">Customize your {title?.toLowerCase()} experience</p>
                    </div>
                    <div className="py-2">
                      {settingsOptions.map((option, i) => {
                        if (option.type === 'divider') {
                          return <div key={i} className="my-2 border-t border-white/5" />;
                        }
                        if (option.type === 'toggle') {
                          return (
                            <div
                              key={option.label}
                              className="flex items-center justify-between px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors"
                              onClick={() => toggleOption(option.label)}
                            >
                              <div>
                                <p className="text-sm font-medium">{option.label}</p>
                                {option.description && (
                                  <p className="text-xs text-[#71767b]">{option.description}</p>
                                )}
                              </div>
                              <div className={cn(
                                "w-10 h-5 rounded-full transition-colors relative flex-shrink-0",
                                toggleStates[option.label] ? "bg-[#ef4444]" : "bg-white/20"
                              )}>
                                <div className={cn(
                                  "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform",
                                  toggleStates[option.label] ? "translate-x-5" : "translate-x-0.5"
                                )} />
                              </div>
                            </div>
                          );
                        }
                        if (option.type === 'link') {
                          return (
                            <a
                              key={option.label}
                              href={option.href ?? '#'}
                              className="flex items-center justify-between px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors"
                            >
                              <div>
                                <p className="text-sm font-medium">{option.label}</p>
                                {option.description && (
                                  <p className="text-xs text-[#71767b]">{option.description}</p>
                                )}
                              </div>
                              <ChevronRight className="w-4 h-4 text-[#71767b]" />
                            </a>
                          );
                        }
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="w-9 h-9" />
          )}
        </div>

        {!title && (
          <div className="flex relative">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={cn(
                  "flex-1 py-3 text-center font-medium transition-colors relative",
                  activeTab === tab ? "text-white" : "text-[#71767b] hover:text-[#e7e9ea]"
                )}
                onClick={() => onTabChange?.(tab)}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-gradient-to-r from-[#ef4444] to-[#dc2626] rounded-full"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}