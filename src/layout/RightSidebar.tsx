import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Flame, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { trendingTopics, users } from '@/lib/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function RightSidebar() {
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());
  const [showMoreUsers, setShowMoreUsers] = useState(false);
  const [showMoreTrending, setShowMoreTrending] = useState(false);

  const toggleFollow = (userId: string) => {
    setFollowedUsers(prev => {
      const next = new Set(prev);
      if (next.has(userId)) {
        next.delete(userId);
      } else {
        next.add(userId);
      }
      return next;
    });
  };

  const visibleUsers = showMoreUsers ? users : users.slice(0, 3);
  const visibleTopics = showMoreTrending ? trendingTopics : trendingTopics.slice(0, 5);

  return (
    <div className="h-full overflow-y-auto py-4 px-6 space-y-4">
      {/* Search */}
      <div className="sticky top-0 bg-black pb-2 z-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71767b]" />
          <Input 
            placeholder="Search SportX"
            className="w-full h-11 pl-12 bg-[#16181c] border-none rounded-full text-[#e7e9ea] placeholder:text-[#71767b] focus:ring-2 focus:ring-[#ef4444]"
          />
        </div>
      </div>

      {/* Trending */}
      <motion.div 
        className="glass-card overflow-hidden border-red-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05]">
          <Flame className="w-5 h-5 text-[#ef4444]" />
          <h2 className="text-xl font-bold">Trending for you</h2>
        </div>
        <div>
          {visibleTopics.map((topic, index) => (
            <motion.div 
              key={topic.id}
              className={cn(
                "px-4 py-3 hover:bg-red-500/5 cursor-pointer transition-colors border-b border-white/[0.03] last:border-b-0",
                index === 0 && "bg-red-500/5"
              )}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#ef4444] font-bold">#{index + 1}</span>
                <p className="text-xs text-[#71767b]">{topic.category}</p>
              </div>
              <p className="font-bold text-[#e7e9ea]">#{topic.topic}</p>
              <p className="text-xs text-[#71767b]">{topic.posts}</p>
            </motion.div>
          ))}
        </div>
        <button 
          onClick={() => setShowMoreTrending(!showMoreTrending)}
          className="w-full px-4 py-3 text-[#ef4444] text-sm hover:bg-red-500/5 transition-colors text-left"
        >
          {showMoreTrending ? 'Show less' : 'Show more'}
        </button>
      </motion.div>

      {/* Live Matches Mini */}
      <motion.div 
        className="glass-card overflow-hidden border-red-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ef4444] animate-live-pulse-red" />
            <h2 className="font-bold">Live Now</h2>
          </div>
          <span className="text-xs text-[#ef4444]">8 matches</span>
        </div>
        <div className="p-3 space-y-2">
          {[
            { teams: 'MCI vs ARS', score: '2 - 1', time: "67'" },
            { teams: 'RMA vs BAR', score: '3 - 2', time: "78'" },
            { teams: 'LIV vs CHE', score: '1 - 1', time: "45'" },
          ].map((match, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-white/[0.03] rounded-lg hover:bg-red-500/10 cursor-pointer transition-colors">
              <span className="text-sm font-medium">{match.teams}</span>
              <div className="flex items-center gap-2">
                <span className="text-[#ef4444] font-bold">{match.score}</span>
                <span className="text-xs text-[#71767b]">{match.time}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Who to Follow */}
      <motion.div 
        className="glass-card overflow-hidden border-red-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05]">
          <Users className="w-5 h-5 text-[#ef4444]" />
          <h2 className="text-xl font-bold">Who to follow</h2>
        </div>
        <div>
          {visibleUsers.map((user) => {
            const isFollowing = followedUsers.has(user.id);
            return (
              <motion.div 
                key={user.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-red-500/5 cursor-pointer transition-colors"
                whileHover={{ x: 4 }}
              >
                <Avatar className="w-10 h-10 ring-1 ring-red-500/30">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{user.name}</p>
                  <p className="text-[#71767b] text-sm truncate">{user.handle}</p>
                </div>
                <Button
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); toggleFollow(user.id); }}
                  className={cn(
                    "font-bold rounded-full text-sm px-4 transition-all",
                    isFollowing
                      ? "bg-transparent border border-white/30 text-white hover:border-red-500/50 hover:text-[#ef4444] hover:bg-red-500/10"
                      : "bg-white text-black hover:bg-white/90"
                  )}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              </motion.div>
            );
          })}
        </div>
        <button
          onClick={() => setShowMoreUsers(!showMoreUsers)}
          className="w-full px-4 py-3 text-[#ef4444] text-sm hover:bg-red-500/5 transition-colors text-left"
        >
          {showMoreUsers ? 'Show less' : 'Show more'}
        </button>
      </motion.div>

      {/* Footer Links */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 px-4 text-xs text-[#71767b]">
        <a href="#" className="hover:text-[#ef4444] transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-[#ef4444] transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-[#ef4444] transition-colors">Cookie Policy</a>
        <a href="#" className="hover:text-[#ef4444] transition-colors">Accessibility</a>
        <a href="#" className="hover:text-[#ef4444] transition-colors">Ads info</a>
        <span>© 2024 SportX, Inc.</span>
      </div>
    </div>
  );
}