import { motion } from 'framer-motion';
import { Target, TrendingUp, Award } from 'lucide-react';
import { PredictionCard } from '@/components/PredictionCard';
import { predictions } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export function PredictionsHub() {
  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Predictions</h2>
            <p className="text-[#71767b] text-sm">Make your picks & win</p>
          </div>
        </div>
        <button className="text-[#1d9bf0] text-sm hover:underline">View all</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard 
          icon={Target} 
          value="12.5K" 
          label="Active" 
          color="from-purple-500 to-pink-500"
        />
        <StatCard 
          icon={TrendingUp} 
          value="89%" 
          label="Accuracy" 
          color="from-green-500 to-emerald-500"
        />
        <StatCard 
          icon={Award} 
          value="2.1M" 
          label="Votes" 
          color="from-blue-500 to-cyan-500"
        />
      </div>

      {/* Prediction Cards */}
      <div className="space-y-4">
        {predictions.map((prediction) => (
          <PredictionCard key={prediction.id} prediction={prediction} />
        ))}
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
}

function StatCard({ icon: Icon, value, label, color }: StatCardProps) {
  return (
    <motion.div 
      className="glass-card p-3 text-center"
      whileHover={{ scale: 1.02 }}
    >
      <div className={cn(
        "w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center bg-gradient-to-br",
        color
      )}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs text-[#71767b]">{label}</p>
    </motion.div>
  );
}
