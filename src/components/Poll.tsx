import { useState } from 'react';
import { motion } from 'framer-motion';
import type { PollOption } from '@/types';
import { cn } from '@/lib/utils';
import { Check, TrendingUp } from 'lucide-react';

interface PollProps {
  options: PollOption[];
  totalVotes: number;
  onVote?: (optionId: string) => void;
}

export function Poll({ options, totalVotes, onVote }: PollProps) {
  const [votedOption, setVotedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (optionId: string) => {
    if (hasVoted) return;
    setVotedOption(optionId);
    setHasVoted(true);
    onVote?.(optionId);
  };

  const formatVotes = (num: number): string => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const maxPercentage = Math.max(...options.map(o => o.percentage));

  return (
    <div className="space-y-2 my-3">
      {options.map((option) => {
        const isVoted = votedOption === option.id;
        const isLeading = option.percentage === maxPercentage && hasVoted;
        const showResults = hasVoted;

        return (
          <motion.button
            key={option.id}
            className={cn(
              "relative w-full text-left rounded-lg overflow-hidden transition-all",
              !hasVoted && "hover:bg-red-500/10 border border-[#2f3336] hover:border-red-500/40",
              hasVoted && "cursor-default",
              isLeading && "border-red-500/50"
            )}
            onClick={() => handleVote(option.id)}
            whileTap={!hasVoted ? { scale: 0.98 } : undefined}
          >
            {/* Progress Bar Background */}
            {showResults && (
              <motion.div 
                className={cn(
                  "absolute inset-0 rounded-lg",
                  isVoted ? "bg-gradient-to-r from-[#ef4444]/40 to-[#dc2626]/30" : "bg-[#333]/50",
                  isLeading && "bg-gradient-to-r from-[#ef4444]/50 to-[#dc2626]/40"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${option.percentage}%` }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              />
            )}

            {/* Content */}
            <div className="relative flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "font-medium text-sm",
                  isVoted && "text-[#ef4444]",
                  isLeading && "font-bold"
                )}>
                  {option.text}
                </span>
                {isLeading && showResults && (
                  <span className="text-[10px] text-[#ef4444] bg-[#ef4444]/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" />
                    Leading
                  </span>
                )}
              </div>
              
              {showResults && (
                <div className="flex items-center gap-2">
                  {isVoted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="w-5 h-5 rounded-full bg-[#ef4444] flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                  <span className={cn(
                    "font-bold text-sm",
                    isVoted ? "text-[#ef4444]" : "text-[#e7e9ea]"
                  )}>
                    {option.percentage}%
                  </span>
                </div>
              )}
            </div>
          </motion.button>
        );
      })}

      {/* Total Votes */}
      <div className="flex items-center justify-between">
        <p className="text-[#71767b] text-sm">
          {formatVotes(totalVotes)} votes
        </p>
        {hasVoted && (
          <p className="text-[#ef4444] text-xs flex items-center gap-1">
            <Check className="w-3 h-3" />
            You voted
          </p>
        )}
      </div>
    </div>
  );
}
