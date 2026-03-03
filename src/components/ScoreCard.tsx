import { motion } from 'framer-motion';
import { LiveIndicator } from './LiveIndicator';
import type { Match } from '@/types';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react';

interface ScoreCardProps {
  match: Match;
  className?: string;
  showStats?: boolean;
}

export function ScoreCard({ match, className, showStats = false }: ScoreCardProps) {
  return (
    <motion.div 
      className={cn(
        "glass-card p-3 min-w-[200px] cursor-pointer select-none border-red-500/20",
        className
      )}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 0 25px rgba(239, 68, 68, 0.2)'
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* League & Live Indicator */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-[#ef4444] uppercase tracking-wider font-medium">
          {match.league}
        </span>
        {match.isLive && <LiveIndicator size="sm" showText={false} variant="red" />}
      </div>

      {/* Teams & Score */}
      <div className="space-y-2">
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg"
              style={{ 
                backgroundColor: match.homeTeam.color,
                boxShadow: `0 0 10px ${match.homeTeam.color}40`
              }}
            >
              {match.homeTeam.abbr[0]}
            </div>
            <span className="text-sm font-medium">{match.homeTeam.abbr}</span>
          </div>
          <motion.span 
            className="text-xl font-bold text-[#e7e9ea]"
            key={match.homeTeam.score}
            initial={{ scale: 1.2, color: '#ef4444' }}
            animate={{ scale: 1, color: '#e7e9ea' }}
            transition={{ duration: 0.3 }}
          >
            {match.homeTeam.score}
          </motion.span>
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg"
              style={{ 
                backgroundColor: match.awayTeam.color,
                boxShadow: `0 0 10px ${match.awayTeam.color}40`
              }}
            >
              {match.awayTeam.abbr[0]}
            </div>
            <span className="text-sm font-medium">{match.awayTeam.abbr}</span>
          </div>
          <motion.span 
            className="text-xl font-bold text-[#e7e9ea]"
            key={match.awayTeam.score}
            initial={{ scale: 1.2, color: '#ef4444' }}
            animate={{ scale: 1, color: '#e7e9ea' }}
            transition={{ duration: 0.3 }}
          >
            {match.awayTeam.score}
          </motion.span>
        </div>
      </div>

      {/* Match Time & Viewers */}
      <div className="mt-2 pt-2 border-t border-white/[0.05] flex items-center justify-between">
        <span className={cn(
          "text-xs font-bold",
          match.isLive ? "text-[#ef4444]" : "text-[#71767b]"
        )}>
          {match.time}
        </span>
        <div className="flex items-center gap-1 text-[#71767b] text-[10px]">
          <Users className="w-3 h-3" />
          <span>{Math.floor(Math.random() * 500 + 100)}K</span>
        </div>
      </div>

      {/* Mini Stats */}
      {showStats && (
        <div className="mt-2 pt-2 border-t border-white/[0.05] grid grid-cols-3 gap-1 text-[10px]">
          <div className="text-center">
            <span className="text-[#71767b]">Possession</span>
            <div className="flex gap-1 mt-0.5">
              <div className="h-1 bg-[#ef4444] rounded-full" style={{ width: '55%' }} />
              <div className="h-1 bg-[#374151] rounded-full flex-1" />
            </div>
          </div>
          <div className="text-center">
            <span className="text-[#71767b]">Shots</span>
            <p className="text-[#e7e9ea] font-bold">8 - 5</p>
          </div>
          <div className="text-center">
            <span className="text-[#71767b]">Corners</span>
            <p className="text-[#e7e9ea] font-bold">4 - 2</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
