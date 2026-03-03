import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Radio,
  Search,
  Users,
  Trophy,
  Target,
  TrendingUp,
  Mail,
  Bell,
  User,
  Pin,
  MoreHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PostButton } from '@/components/PostComposer';
import { currentUser } from '@/lib/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
  isLive?: boolean;
}

const navItems: NavItem[] = [
  { icon: Home,       label: 'Home',         href: '/' },
  { icon: Radio,      label: 'Live',         href: '/live', isLive: true },
  { icon: Search,     label: 'Explore',      href: '/explore' },
  { icon: Users,      label: 'Communities',  href: '/communities' },
  { icon: Trophy,     label: 'Sports',       href: '/sports' },
  { icon: Target,     label: 'Predictions',  href: '/predictions' },
  { icon: TrendingUp, label: 'Leaderboard',  href: '/leaderboard' },
  { icon: Mail,       label: 'Messages',     href: '/messages', badge: 2 },
  { icon: Bell,       label: 'Notifications',href: '/notifications', badge: 17 },
  { icon: User,       label: 'Profile',      href: '/profile' },
];

interface SidebarProps {
  onExpandChange?: (expanded: boolean) => void;
}

export function Sidebar({ onExpandChange }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('Home');
  const [expanded, setExpanded] = useState(false);
  const [locked, setLocked] = useState(false);

  const isOpen = expanded || locked;

  return (
    <motion.div
      className="flex flex-col h-full py-4 overflow-hidden border-r border-[#2f3336]"
      animate={{ width: isOpen ? 240 : 72 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      onMouseEnter={() => { if (!locked) { setExpanded(true); onExpandChange?.(true); } }}
      onMouseLeave={() => { if (!locked) { setExpanded(false); onExpandChange?.(false); } }}
    >
      {/* Logo + Lock toggle */}
      <div className="flex items-center justify-between px-4 mb-6 h-12">
        <motion.div
          className="w-10 h-10 rounded-full overflow-hidden cursor-pointer flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/logo.jpg" alt="Arena" className="w-full h-full object-cover" />
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.button
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              onClick={() => { const next = !locked; setLocked(next); onExpandChange?.(next); }}
              className={cn(
                "p-1.5 rounded-full transition-colors ml-auto",
                locked ? "text-[#ef4444] bg-red-500/10" : "text-[#71767b] hover:text-white hover:bg-white/10"
              )}
              title={locked ? "Unlock sidebar" : "Lock sidebar open"}
            >
              <Pin className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;

          return (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={() => setActiveItem(item.label)}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all relative group",
                isActive
                  ? "bg-red-500/10 text-[#ef4444]"
                  : "text-[#e7e9ea] hover:bg-white/5 hover:text-white"
              )}
              whileTap={{ scale: 0.97 }}
            >
              {/* Icon */}
              <div className="relative flex-shrink-0">
                <Icon className={cn(
                  "w-6 h-6 transition-colors",
                  isActive ? "text-[#ef4444] stroke-[2.5px]" : "stroke-2"
                )} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#ef4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
                {item.isLive && !item.badge && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ef4444] rounded-full animate-pulse" />
                )}
              </div>

              {/* Label */}
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.15 }}
                    className={cn(
                      "text-base font-medium whitespace-nowrap overflow-hidden",
                      isActive && "font-bold text-[#ef4444]"
                    )}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="sidebarActive"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#ef4444] rounded-full"
                />
              )}
            </motion.a>
          );
        })}
      </nav>

      {/* Post Button */}
      <div className="px-2 mt-4 mb-4">
        <PostButton className="w-full h-11 bg-gradient-to-r from-[#dc2626] to-[#ef4444] hover:from-[#b91c1c] hover:to-[#dc2626] text-white font-bold rounded-full shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2 overflow-hidden" />
      </div>

      {/* User Profile — click to go to Profile page */}
      <div className="px-2 mt-auto">
        <motion.a
          href="/profile"
          className="flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all group"
          whileTap={{ scale: 0.97 }}
          title="View Profile"
        >
          <div className="relative flex-shrink-0">
            <Avatar className="w-9 h-9 ring-2 ring-red-500/40">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white text-sm">
                {currentUser.name[0]}
              </AvatarFallback>
            </Avatar>
            {/* Profile indicator dot */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#ef4444] rounded-full border-2 border-black flex items-center justify-center">
              <span className="w-1 h-1 bg-white rounded-full" />
            </span>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.15 }}
                className="flex-1 min-w-0 flex items-center justify-between"
              >
                <div className="min-w-0">
                  <p className="font-bold text-sm truncate">{currentUser.name}</p>
                  <p className="text-[#ef4444] text-xs truncate group-hover:underline">View Profile →</p>
                </div>
                <MoreHorizontal className="w-4 h-4 text-[#71767b] flex-shrink-0" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.a>
      </div>
    </motion.div>
  );
}