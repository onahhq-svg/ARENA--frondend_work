import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Flame, TrendingUp, Activity } from 'lucide-react';
import { ScoreCard } from '@/components/ScoreCard';
import { liveMatches } from '@/lib/mockData';

export function LiveScoreTicker() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 220;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative border-b border-[#ef4444]/30 bg-gradient-to-r from-[#0a0a0a] via-[#1a0a0a] to-[#0a0a0a]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ef4444] animate-live-pulse-red" />
            <h2 className="text-sm font-bold text-[#e7e9ea]">Live Matches</h2>
          </div>
          <span className="text-xs text-[#71767b] bg-[#ef4444]/10 px-2 py-0.5 rounded-full">
            {liveMatches.length} games
          </span>
        </div>
        <div className="flex items-center gap-2">
          <motion.button 
            onClick={() => scroll('left')}
            className="p-1.5 rounded-full bg-[#ef4444]/10 hover:bg-[#ef4444]/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-4 h-4 text-[#ef4444]" />
          </motion.button>
          <motion.button 
            onClick={() => scroll('right')}
            className="p-1.5 rounded-full bg-[#ef4444]/10 hover:bg-[#ef4444]/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-4 h-4 text-[#ef4444]" />
          </motion.button>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="flex items-center gap-4 px-4 pb-2 text-xs">
        <div className="flex items-center gap-1 text-[#ef4444]">
          <Flame className="w-3 h-3" />
          <span>Hot Matches</span>
        </div>
        <div className="flex items-center gap-1 text-[#71767b]">
          <TrendingUp className="w-3 h-3" />
          <span>2.4M watching</span>
        </div>
        <div className="flex items-center gap-1 text-[#71767b]">
          <Activity className="w-3 h-3" />
          <span>Live odds updating</span>
        </div>
      </div>

      {/* Scrolling Container */}
      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-3 snap-x snap-mandatory"
      >
        {liveMatches.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="snap-start"
          >
            <ScoreCard match={match} showStats={index === 0} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
