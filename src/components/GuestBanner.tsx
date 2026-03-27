import { motion } from 'framer-motion';
import { Zap, X } from 'lucide-react';
import { useState } from 'react';

interface GuestBannerProps {
  onSignIn: () => void;
}

export function GuestBanner({ onSignIn }: GuestBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -60, opacity: 0 }}
      transition={{ type: 'spring', damping: 20 }}
      className="sticky top-0 z-50 bg-gradient-to-r from-[#dc2626] to-[#ef4444] px-4 py-3 flex items-center gap-3 shadow-lg shadow-red-500/20"
    >
      {/* Logo */}
      <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
        <Zap className="w-4 h-4 text-white fill-white" />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-xs font-bold leading-tight">
          You're browsing as a guest
        </p>
        <p className="text-white/70 text-xs truncate">
          Sign in to like, comment, predict & more
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onSignIn}
          className="bg-white text-[#ef4444] text-xs font-black px-3 py-1.5 rounded-full hover:bg-white/90 transition-colors"
        >
          Sign In
        </button>
        <button
          onClick={onSignIn}
          className="border border-white/40 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors hidden sm:block"
        >
          Create Account
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    </motion.div>
  );
}