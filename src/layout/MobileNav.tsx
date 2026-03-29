import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Search, Bell, Mail, Zap,
  Trophy, Target, TrendingUp, Settings, X,
  Radio, Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { currentUser } from '@/lib/mockData';

// ── Bottom bar — Messages & Notifications moved up ──
const bottomNavItems = [
  { icon: Home,  label: 'Home',          href: '/' },
  { icon: Mail,  label: 'Messages',      href: '/messages',      badge: 2  },
  { icon: Zap,   label: 'Live',          href: '/live' },
  { icon: Bell,  label: 'Notifications', href: '/notifications', badge: 17 },
  { icon: Search,label: 'Explore',       href: '/explore' },
];

// ── Drawer ──
const menuItems = [
  { icon: Home,       label: 'Home',          href: '/' },
  { icon: Radio,      label: 'Live',          href: '/live' },
  { icon: Mail,       label: 'Messages',      href: '/messages',      badge: 2  },
  { icon: Bell,       label: 'Notifications', href: '/notifications', badge: 17 },
  { icon: Search,     label: 'Explore',       href: '/explore' },
  { icon: Users,      label: 'Communities',   href: '/communities' },
  { icon: Trophy,     label: 'Sports',        href: '/sports' },
  { icon: Target,     label: 'Predictions',   href: '/predictions' },
  { icon: TrendingUp, label: 'Leaderboard',   href: '/leaderboard' },
  { icon: Settings,   label: 'Settings',      href: '/settings' },
];

export function MobileNav() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const activeLabel = menuItems.find(i => i.href === location.pathname)?.label || 'Home';

  useEffect(() => {
    const handler = () => setMenuOpen(prev => !prev);
    window.addEventListener('toggle-mobile-menu', handler);
    return () => window.removeEventListener('toggle-mobile-menu', handler);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const go = (href: string) => { navigate(href); };

  return (
    <>
      {/* ── Slide-in Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40 md:hidden"
              onClick={() => setMenuOpen(false)} />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-[#0d0d0d] border-r border-white/10 z-50 md:hidden flex flex-col">

              {/* Profile header */}
              <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-white/5">
                <button onClick={() => go('/profile')}
                  className="flex items-center gap-3 flex-1 hover:opacity-80 transition-opacity text-left">
                  <Avatar className="w-12 h-12 ring-2 ring-red-500/50">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white">{currentUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{currentUser.name}</p>
                    <p className="text-[#71767b] text-sm">{currentUser.handle}</p>
                  </div>
                </button>
                <button onClick={() => setMenuOpen(false)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-[#71767b]" />
                </button>
              </div>

              {/* Following / Followers */}
              <div className="flex gap-4 px-5 py-3 border-b border-white/5">
                <span className="text-sm"><span className="font-bold">{currentUser.following}</span> <span className="text-[#71767b]">Following</span></span>
                <span className="text-sm"><span className="font-bold">{currentUser.followers}</span> <span className="text-[#71767b]">Followers</span></span>
              </div>

              {/* Nav items */}
              <nav className="flex-1 overflow-y-auto py-3">
                {menuItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeLabel === item.label;
                  return (
                    <button key={item.label} onClick={() => go(item.href)}
                      className={cn('w-full flex items-center gap-4 px-5 py-3 transition-all relative text-left',
                        isActive ? 'text-[#ef4444]' : 'text-[#e7e9ea] hover:bg-white/5')}>
                      <div className="relative">
                        <Icon className="w-6 h-6" />
                        {'badge' in item && item.badge && (
                          <span className="absolute -top-1 -right-2 w-4 h-4 bg-[#ef4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                            {(item.badge as number) > 9 ? '9+' : item.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-lg font-medium">{item.label}</span>
                      {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#ef4444] rounded-full" />}
                    </button>
                  );
                })}
              </nav>

              {/* Bottom buttons */}
              <div className="px-5 py-4 border-t border-white/5 flex gap-3">
                <button onClick={() => go('/wallet')}
                  className="flex-1 py-2.5 border border-white/10 rounded-full font-medium text-sm text-white hover:bg-white/5 transition-colors">
                  Wallet
                </button>
                <button className="flex-1 py-2.5 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-full font-bold text-white text-sm">
                  Post
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Bottom Nav Bar ── */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-[#ef4444]/30 z-40 md:hidden">
        <div className="flex items-center justify-around py-2">
          {bottomNavItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            const isLive   = item.label === 'Live';
            return (
              <motion.button key={item.label}
                onClick={() => go(item.href)}
                className={cn('relative flex flex-col items-center justify-center p-2 min-w-[60px]', isLive && '-mt-6')}
                whileTap={{ scale: 0.9 }}>
                {isLive ? (
                  <div className="w-14 h-14 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-full flex items-center justify-center shadow-lg shadow-red-500/40">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      <Icon className={cn('w-6 h-6 transition-colors', isActive ? 'text-[#ef4444] stroke-[2.5px]' : 'text-[#71767b] stroke-2')} />
                      {'badge' in item && item.badge && (
                        <span className="absolute -top-1 -right-2 w-4 h-4 bg-[#ef4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {(item.badge as number) > 9 ? '9+' : item.badge}
                        </span>
                      )}
                    </div>
                    <span className={cn('text-[10px] mt-1 transition-colors', isActive ? 'text-[#ef4444] font-medium' : 'text-[#71767b]')}>
                      {item.label}
                    </span>
                  </>
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>
    </>
  );
}