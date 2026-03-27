import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Crown, Medal, Flame, Trophy, Globe } from 'lucide-react';
import { Header } from '@/layout/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const tabs = ['Global', 'Friends', 'Weekly', 'Monthly'];

const leaderboardData = [
  { rank: 1, name: 'SportsGuru', handle: '@sportsguru', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guru', accuracy: '94%', predictions: 312, streak: 12, points: 9840, change: 'up' },
  { rank: 2, name: 'BetMaster', handle: '@betmaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=master', accuracy: '91%', predictions: 287, streak: 9, points: 8920, change: 'up' },
  { rank: 3, name: 'TipKing', handle: '@tipking', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=king', accuracy: '89%', predictions: 265, streak: 7, points: 8100, change: 'down' },
  { rank: 4, name: 'FootballFan', handle: '@footballfan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fan', accuracy: '86%', predictions: 241, streak: 5, points: 7340, change: 'up' },
  { rank: 5, name: 'GoalHunter', handle: '@goalhunter', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=goal', accuracy: '84%', predictions: 230, streak: 4, points: 6890, change: 'same' },
  { rank: 6, name: 'MatchWizard', handle: '@matchwizard', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wizard', accuracy: '82%', predictions: 218, streak: 3, points: 6200, change: 'down' },
  { rank: 7, name: 'SportX Fan', handle: '@sportx_fan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sportx', accuracy: '78%', predictions: 47, streak: 2, points: 3400, change: 'up', isCurrentUser: true },
  { rank: 8, name: 'PredictPro', handle: '@predictpro', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pro', accuracy: '76%', predictions: 189, streak: 1, points: 5100, change: 'down' },
  { rank: 9, name: 'ScoreKing', handle: '@scoreking', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=score', accuracy: '74%', predictions: 175, streak: 0, points: 4800, change: 'up' },
  { rank: 10, name: 'TacticsGod', handle: '@tacticsgod', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tactics', accuracy: '72%', predictions: 160, streak: 0, points: 4500, change: 'same' },
];

const topThreeColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
const topThreeRings = ['ring-yellow-400', 'ring-gray-300', 'ring-amber-600'];
const topThreeLabels = ['1st', '2nd', '3rd'];

const rankIcons: Record<number, ReactNode> = {
  1: <Crown className="w-4 h-4 text-yellow-400" />,
  2: <Medal className="w-4 h-4 text-gray-400" />,
  3: <Medal className="w-4 h-4 text-amber-600" />,
};

export function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('Global');

  const topThree = leaderboardData.slice(0, 3);

  return (
    <div>
      <Header
        title="Leaderboard"
        settingsOptions={[
          { label: "Show Friends Only", description: "Filter to people you follow", type: "toggle", defaultValue: false },
          { label: "Show Points", description: "Display points alongside rank", type: "toggle", defaultValue: true },
          { label: "Show Streak", description: "Display prediction streaks", type: "toggle", defaultValue: true },
          { type: "divider", label: "" },
          { label: "Leaderboard Settings", type: "link", href: "/settings" },
        ]}
      />

      {/* Tabs */}
      <div className="flex border-b border-[#2f3336]">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-3 text-center font-medium transition-colors relative text-sm",
              activeTab === tab ? "text-white" : "text-[#71767b] hover:text-[#e7e9ea]"
            )}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-[#ef4444] to-[#dc2626] rounded-full"
                layoutId="leaderboardTab"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="p-4">

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-4 mb-8 mt-4">
          {[topThree[1], topThree[0], topThree[2]].map((user, i) => {
            const actualRank = i === 0 ? 2 : i === 1 ? 1 : 3;
            const height = actualRank === 1 ? 'h-32' : actualRank === 2 ? 'h-24' : 'h-20';
            return (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="relative">
                  <Avatar className={`w-14 h-14 ring-2 ${topThreeRings[actualRank - 1]}`}>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-black"
                    style={{ backgroundColor: topThreeColors[actualRank - 1] }}>
                    {actualRank}
                  </div>
                </div>
                <p className="text-xs font-semibold text-center truncate w-16">{user.name}</p>
                <p className="text-xs text-[#71767b]">{user.accuracy}</p>
                <div className={cn("w-16 rounded-t-lg flex items-end justify-center pb-2", height)}
                  style={{ backgroundColor: `${topThreeColors[actualRank - 1]}20`, border: `1px solid ${topThreeColors[actualRank - 1]}40` }}>
                  <span className="text-xs font-bold" style={{ color: topThreeColors[actualRank - 1] }}>
                    {topThreeLabels[actualRank - 1]}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: Globe, label: 'Total Players', value: '24.8K' },
            { icon: Trophy, label: 'Top Accuracy', value: '94%' },
            { icon: Flame, label: 'Longest Streak', value: '12' },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                <Icon className="w-4 h-4 text-[#ef4444] mx-auto mb-1" />
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-xs text-[#71767b]">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Full Leaderboard List */}
        <div className="space-y-2">
          {leaderboardData.map((user, i) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer hover:bg-white/5",
                user.isCurrentUser
                  ? "border-[#ef4444]/40 bg-red-500/5"
                  : "border-white/5"
              )}
            >
              {/* Rank */}
              <div className="w-8 flex items-center justify-center">
                {rankIcons[user.rank] || (
                  <span className={cn("text-sm font-bold", user.isCurrentUser ? "text-[#ef4444]" : "text-[#71767b]")}>
                    {user.rank}
                  </span>
                )}
              </div>

              {/* Avatar */}
              <Avatar className={cn("w-10 h-10", user.isCurrentUser && "ring-2 ring-[#ef4444]")}>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className={cn("font-semibold text-sm truncate", user.isCurrentUser && "text-[#ef4444]")}>
                    {user.name}
                  </p>
                  {user.isCurrentUser && (
                    <span className="text-xs bg-red-500/20 text-[#ef4444] px-1.5 py-0.5 rounded-full shrink-0">You</span>
                  )}
                </div>
                <p className="text-xs text-[#71767b]">{user.handle}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-right">
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold">{user.accuracy}</p>
                  <p className="text-xs text-[#71767b]">accuracy</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold flex items-center gap-1">
                    <Flame className="w-3 h-3 text-[#ef4444]" />{user.streak}
                  </p>
                  <p className="text-xs text-[#71767b]">streak</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#ef4444]">{user.points.toLocaleString()}</p>
                  <p className="text-xs text-[#71767b]">pts</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}