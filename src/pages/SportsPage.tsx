import { motion } from 'framer-motion';
import { Trophy, TrendingUp, ArrowRight, Flame, Users, Zap } from 'lucide-react';
import { Header } from '@/layout/Header';
import { LiveScoreTicker } from '@/sections/LiveScoreTicker';
import { sportsTopics, posts } from '@/lib/mockData';
import { PostCard } from '@/components/PostCard';
import { cn } from '@/lib/utils';

const leagues = [
  { name: 'Premier League', followers: '45.2M', color: '#3c1e5e', trending: true },
  { name: 'La Liga', followers: '38.1M', color: '#f59e0b', trending: false },
  { name: 'Champions League', followers: '82.5M', color: '#1d4ed8', trending: true },
  { name: 'NBA', followers: '56.3M', color: '#dc2626', trending: true },
];

const matchStats = [
  { label: 'Matches Today', value: '24', change: '+3' },
  { label: 'Live Now', value: '8', change: 'HOT' },
  { label: 'Goals Scored', value: '47', change: '+12' },
];

export function SportsPage() {
  const sportsPosts = posts.filter(post => 
    post.content.toLowerCase().includes('transfer') ||
    post.content.toLowerCase().includes('match') ||
    post.content.toLowerCase().includes('goal')
  );

  return (
    <div>
      <Header title="Sports" settingsOptions={[
        { label: "Show Live Ticker", description: "Display live score ticker at top", type: "toggle", defaultValue: true },
        { label: "Auto-refresh Scores", description: "Refresh live scores automatically", type: "toggle", defaultValue: true },
        { label: "Show All Sports", description: "Include non-football sports", type: "toggle", defaultValue: true },
        { type: "divider", label: "" },
        { label: "Favourite Leagues", description: "Manage your league preferences", type: "link", href: "/settings" },
      ]} />
      
      {/* Live Scores */}
      <LiveScoreTicker />

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2 p-4 border-b border-[#2f3336]">
        {matchStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="glass-card p-3 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-2xl font-bold text-[#ef4444]">{stat.value}</p>
            <p className="text-[10px] text-[#71767b]">{stat.label}</p>
            <span className={cn(
              "text-[10px] px-1.5 py-0.5 rounded-full",
              stat.change === 'HOT' ? "bg-[#ef4444]/20 text-[#ef4444]" : "bg-green-500/20 text-green-400"
            )}>
              {stat.change}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Featured Leagues */}
      <div className="p-4 border-b border-[#2f3336]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#ef4444]" />
            <h2 className="text-lg font-bold">Featured Leagues</h2>
          </div>
          <button className="text-[#ef4444] text-sm hover:underline flex items-center gap-1">
            View all
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {leagues.map((league, index) => (
            <motion.div
              key={league.name}
              className="glass-card p-4 min-w-[160px] cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, borderColor: 'rgba(239, 68, 68, 0.4)' }}
            >
              {league.trending && (
                <div className="absolute top-2 right-2">
                  <span className="text-[10px] text-[#ef4444] bg-[#ef4444]/10 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <Flame className="w-3 h-3" />
                    HOT
                  </span>
                </div>
              )}
              <div 
                className="w-10 h-10 rounded-full mb-3 flex items-center justify-center"
                style={{ 
                  backgroundColor: league.color,
                  boxShadow: `0 0 15px ${league.color}50`
                }}
              >
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-sm">{league.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Users className="w-3 h-3 text-[#71767b]" />
                <p className="text-[#71767b] text-xs">{league.followers}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="p-4 border-b border-[#2f3336]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#ef4444]" />
            <h2 className="text-lg font-bold">Trending Topics</h2>
          </div>
          <button className="text-[#71767b] text-sm hover:text-[#ef4444] transition-colors">
            See all
          </button>
        </div>
        <div className="space-y-3">
          {sportsTopics.slice(0, 4).map((topic, index) => (
            <motion.div
              key={topic.id}
              className="flex items-center justify-between p-3 bg-[#16181c] rounded-xl hover:bg-red-500/10 cursor-pointer transition-all border border-transparent hover:border-red-500/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ef4444] via-[#dc2626] to-[#b91c1c] flex items-center justify-center glow-red">
                  <span className="text-white font-bold text-sm">#</span>
                </div>
                <div>
                  <p className="font-bold text-sm">{topic.name}</p>
                  <p className="text-[#71767b] text-xs">{topic.posts}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {topic.trending && (
                  <span className="text-[10px] text-[#ef4444] bg-[#ef4444]/10 px-2 py-0.5 rounded-full">
                    Trending
                  </span>
                )}
                <ArrowRight className="w-4 h-4 text-[#71767b]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sports Feed */}
      <div>
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2f3336]">
          <Zap className="w-5 h-5 text-[#ef4444]" />
          <h2 className="text-lg font-bold">Sports Feed</h2>
        </div>
        {sportsPosts.length > 0 ? (
          sportsPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}