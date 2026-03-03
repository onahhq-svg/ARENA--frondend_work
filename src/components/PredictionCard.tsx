import { motion } from 'framer-motion';
import { Target, Clock, MoreHorizontal, BadgeCheck, TrendingUp, Users, Zap } from 'lucide-react';
import type { Prediction } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Poll } from './Poll';


interface PredictionCardProps {
  prediction: Prediction;
}

export function PredictionCard({ prediction }: PredictionCardProps) {
  return (
    <motion.div 
      className="glass-card p-4 border-red-500/30 hover:border-red-500/50 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        boxShadow: '0 0 30px rgba(239, 68, 68, 0.2)',
        y: -2
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ef4444] via-[#dc2626] to-[#b91c1c] flex items-center justify-center glow-red">
            <Target className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-[#ef4444] uppercase tracking-wider font-bold">Prediction</p>
            <p className="text-xs text-[#71767b]">{prediction.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#ef4444] bg-[#ef4444]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Hot
          </span>
          <button className="p-1 rounded-full hover:bg-red-500/10 transition-colors">
            <MoreHorizontal className="w-4 h-4 text-[#71767b]" />
          </button>
        </div>
      </div>

      {/* Question */}
      <h3 className="text-lg font-bold text-[#e7e9ea] mb-2">
        {prediction.question}
      </h3>

      {/* Stats Row */}
      <div className="flex items-center gap-4 mb-4 text-xs text-[#71767b]">
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          <span>{prediction.totalVotes.toLocaleString()} votes</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          <span>87% accuracy</span>
        </div>
      </div>

      {/* Poll */}
      <Poll 
        options={prediction.options} 
        totalVotes={prediction.totalVotes}
      />

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.05]">
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6 ring-1 ring-red-500/50">
            <AvatarImage src={prediction.creator.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white text-xs">
              {prediction.creator.name[0]}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-[#71767b]">{prediction.creator.name}</span>
          {prediction.creator.verified && (
            <BadgeCheck className="w-3 h-3 text-[#ef4444] fill-[#ef4444]" />
          )}
        </div>
        <div className="flex items-center gap-1 text-[#71767b] text-xs">
          <Clock className="w-3 h-3" />
          <span>Ends in {prediction.endsIn}</span>
        </div>
      </div>
    </motion.div>
  );
}
