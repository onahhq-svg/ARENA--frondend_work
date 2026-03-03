import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Award, Filter, Plus, Flame, Zap, Crown, BarChart3 } from 'lucide-react';
import { Header } from '@/layout/Header';
import { PredictionCard } from '@/components/PredictionCard';
import { predictions } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', name: 'All', icon: Target },
  { id: 'football', name: 'Football', icon: Flame },
  { id: 'basketball', name: 'Basketball', icon: TrendingUp },
  { id: 'my', name: 'My Predictions', icon: Award },
];

const topPredictors = [
  { name: 'SportsGuru', accuracy: '94%', streak: '12', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guru' },
  { name: 'BetMaster', accuracy: '91%', streak: '9', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=master' },
  { name: 'TipKing', accuracy: '89%', streak: '7', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=king' },
];

export function PredictionsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div>
      <Header title="Predictions" settingsOptions={[
        { label: "Show My Predictions First", description: "Prioritise your own predictions", type: "toggle", defaultValue: false },
        { label: "Show Accuracy Stats", description: "Display accuracy percentages", type: "toggle", defaultValue: true },
        { label: "Allow Poll Notifications", description: "Notify when your poll gets votes", type: "toggle", defaultValue: true },
        { type: "divider", label: "" },
        { label: "Prediction Privacy", description: "Control who sees your predictions", type: "link", href: "/settings" },
      ]} />

      {/* Hero Stats */}
      <div className="p-4 bg-gradient-to-br from-red-900/40 via-black to-orange-900/30 border-b border-[#ef4444]/30">
        <div className="text-center mb-6">
          <motion.div 
            className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ef4444] via-[#dc2626] to-[#b91c1c] mx-auto mb-3 flex items-center justify-center glow-red-strong"
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(239, 68, 68, 0.4)',
                '0 0 50px rgba(239, 68, 68, 0.6)',
                '0 0 20px rgba(239, 68, 68, 0.4)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Target className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-1">Make Your Predictions</h2>
          <p className="text-[#71767b]">Vote on matches, track your accuracy, climb the leaderboard</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <StatBox value="12.5K" label="Active" color="red" icon={Zap} />
          <StatBox value="89%" label="Top Accuracy" color="orange" icon={TrendingUp} />
          <StatBox value="2.1M" label="Total Votes" color="red" icon={BarChart3} />
        </div>
      </div>

      {/* Top Predictors */}
      <div className="p-4 border-b border-[#2f3336]">
        <div className="flex items-center gap-2 mb-3">
          <Crown className="w-5 h-5 text-[#f59e0b]" />
          <h3 className="font-bold">Top Predictors</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {topPredictors.map((predictor, index) => (
            <motion.div
              key={predictor.name}
              className="glass-card p-3 min-w-[140px] flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <img src={predictor.avatar} alt={predictor.name} className="w-10 h-10 rounded-full" />
                {index === 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#f59e0b] rounded-full flex items-center justify-center">
                    <Crown className="w-2.5 h-2.5 text-black" />
                  </div>
                )}
              </div>
              <div>
                <p className="font-bold text-sm">{predictor.name}</p>
                <p className="text-[#ef4444] text-xs">{predictor.accuracy}</p>
                <p className="text-[#71767b] text-[10px]">{predictor.streak} win streak</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 p-4 border-b border-[#2f3336] overflow-x-auto scrollbar-hide">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <motion.button
              key={cat.id}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all",
                activeCategory === cat.id 
                  ? "bg-gradient-to-r from-[#dc2626] to-[#ef4444] text-white shadow-lg shadow-red-500/30" 
                  : "bg-[#16181c] text-[#71767b] hover:bg-red-500/10 hover:text-[#ef4444]"
              )}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{cat.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Create Prediction Button */}
      <div className="p-4 border-b border-[#2f3336]">
        <Button className="w-full h-12 bg-gradient-to-r from-[#dc2626] to-[#ef4444] hover:from-[#b91c1c] hover:to-[#dc2626] text-white font-bold rounded-full shadow-lg shadow-red-500/30 animate-glow-pulse">
          <Plus className="w-5 h-5 mr-2" />
          Create New Prediction
        </Button>
      </div>

      {/* Active Predictions */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Active Predictions</h3>
          <button className="flex items-center gap-1 text-[#71767b] text-sm hover:text-[#ef4444] transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {predictions.map((prediction, index) => (
          <motion.div
            key={prediction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PredictionCard prediction={prediction} />
          </motion.div>
        ))}
      </div>

      {/* Leaderboard Teaser */}
      <div className="p-4 border-t border-[#2f3336]">
        <div className="glass-card p-4 text-center border-red-500/30">
          <Award className="w-8 h-8 text-[#ef4444] mx-auto mb-2" />
          <h3 className="font-bold mb-1">Leaderboard</h3>
          <p className="text-[#71767b] text-sm mb-3">See who&apos;s making the best predictions</p>
          <Button variant="outline" className="rounded-full border-[#ef4444]/50 text-[#ef4444] hover:bg-red-500/10">
            View Leaderboard
          </Button>
        </div>
      </div>
    </div>
  );
}

interface StatBoxProps {
  value: string;
  label: string;
  color: 'red' | 'orange' | 'green';
  icon: React.ElementType;
}

function StatBox({ value, label, color, icon: Icon }: StatBoxProps) {
  const colorClasses = {
    red: 'from-red-500/20 to-red-600/20 border-red-500/30 text-[#ef4444]',
    orange: 'from-orange-500/20 to-orange-600/20 border-orange-500/30 text-[#f97316]',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30 text-[#22c55e]',
  };

  return (
    <motion.div 
      className={cn(
        "bg-gradient-to-br border rounded-xl p-3 text-center",
        colorClasses[color]
      )}
      whileHover={{ scale: 1.02 }}
    >
      <Icon className="w-5 h-5 mx-auto mb-1 opacity-80" />
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs opacity-70">{label}</p>
    </motion.div>
  );
}