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
} from 'lucide-react';
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
  { icon: Home, label: 'Home', href: '/' },
  { icon: Radio, label: 'Live', href: '/live', isLive: true },
  { icon: Search, label: 'Explore', href: '/explore' },
  { icon: Users, label: 'Communities', href: '/communities' },
  { icon: Trophy, label: 'Sports', href: '/sports' },
  { icon: Target, label: 'Predictions', href: '/predictions' },
  { icon: TrendingUp, label: 'Leaderboard', href: '/leaderboard' },
  { icon: Mail, label: 'Messages', href: '/messages', badge: 2 },
  { icon: Bell, label: 'Notifications', href: '/notifications', badge: 17 },
  { icon: User, label: 'Profile', href: '/profile' },
];

interface SidebarProps {
  onExpandChange?: (expanded: boolean) => void;
}

export function Sidebar({ onExpandChange }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('Home');
  const [expanded, setExpanded] = useState(false);
  const [locked, setLocked] = useState(false);

  const isOpen = expanded || locked;

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("arena_user");
    window.location.href = "/auth/login";
  };

  return (
    <motion.div
      className="flex flex-col h-full py-4 overflow-hidden border-r border-[#2f3336] bg-black"
      animate={{ width: isOpen ? 240 : 72 }}
      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => {
        if (!locked) {
          setExpanded(true);
          onExpandChange?.(true);
        }
      }}
      onMouseLeave={() => {
        if (!locked) {
          setExpanded(false);
          onExpandChange?.(false);
        }
      }}
    >
      {/* Logo + Lock */}
      <div className="flex items-center justify-between px-4 mb-6 h-12">
        <motion.div
          className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
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
              onClick={() => {
                const next = !locked;
                setLocked(next);
                onExpandChange?.(next);
              }}
              className={`p-1.5 rounded-full ml-auto ${
                locked
                  ? "text-red-500 bg-red-500/10"
                  : "text-[#71767b] hover:text-white hover:bg-white/10"
              }`}
            >
              <Pin className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;

          return (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={() => setActiveItem(item.label)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition ${
                isActive
                  ? "bg-red-500/10 text-red-500"
                  : "text-[#e7e9ea] hover:bg-white/5"
              }`}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative">
                <Icon className="w-6 h-6" />

                {item.badge && (
                  <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full px-1">
                    {item.badge}
                  </span>
                )}

                {item.isLive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                )}
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    className="text-sm"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.a>
          );
        })}
      </nav>

      {/* POST BUTTON */}
      <div className="px-2 my-4">
        <PostButton />
      </div>

      {/* PROFILE + LOGOUT */}
      <div className="px-2 mt-auto space-y-2">

        {/* Profile */}
        <motion.a
          href="/profile"
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-red-500/10"
        >
          <Avatar className="w-9 h-9">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
          </Avatar>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-sm font-bold">{currentUser.name}</p>
                <p className="text-xs text-red-500">Profile</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.a>

        {/* LOGOUT */}
        <motion.button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-2 rounded-xl text-red-500 hover:bg-red-500/10"
        >
          <div className="w-9 text-center">⎋</div>

          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}