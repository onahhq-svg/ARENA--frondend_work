import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Flame, Users, Radio } from 'lucide-react';
import { trendingTopics, users } from '@/lib/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const liveMatches = [
  { id: 'l1', teams: 'Man City vs Arsenal',   score: '2 - 1', time: "67'", sport: '⚽' },
  { id: 'l2', teams: 'Real Madrid vs Barca',  score: '3 - 2', time: "78'", sport: '⚽' },
  { id: 'l3', teams: 'Lakers vs Warriors',    score: '89-84', time: "Q3",  sport: '🏀' },
];

export function RightSidebar() {
  const navigate = useNavigate();
  const [followedUsers,     setFollowedUsers]     = useState<Set<string>>(new Set());
  const [showMoreUsers,     setShowMoreUsers]     = useState(false);
  const [showMoreTrending,  setShowMoreTrending]  = useState(false);
  const [searchQuery,       setSearchQuery]       = useState('');

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

  const visibleUsers  = showMoreUsers    ? users          : users.slice(0, 3);
  const visibleTopics = showMoreTrending ? trendingTopics : trendingTopics.slice(0, 5);

  const filteredTopics = searchQuery
    ? trendingTopics.filter(t => t.topic.toLowerCase().includes(searchQuery.toLowerCase()) || t.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : visibleTopics;

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="h-full overflow-y-auto py-4 px-4 space-y-4">

      {/* Search — now functional */}
      <div className="sticky top-0 bg-black pb-2 z-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71767b]" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search ARENA"
            className="w-full h-10 pl-11 pr-4 bg-[#16181c] border border-transparent focus:border-[#ef4444]/50 rounded-full text-[#e7e9ea] text-sm placeholder:text-[#71767b] outline-none transition-colors"
          />
        </div>
        {/* Live search results */}
        {searchQuery && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            className="mt-2 bg-[#16181c] border border-white/10 rounded-xl overflow-hidden">
            {filteredTopics.length > 0 ? (
              filteredTopics.slice(0, 4).map(topic => (
                <button key={topic.id}
                  onClick={() => { navigate(`/explore?q=${encodeURIComponent(topic.topic)}`); setSearchQuery(''); }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left">
                  <Flame className="w-4 h-4 text-[#ef4444] shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">#{topic.topic}</p>
                    <p className="text-xs text-[#71767b]">{topic.category} · {topic.posts}</p>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-[#71767b]">No results for "{searchQuery}"</div>
            )}
          </motion.div>
        )}
      </div>

      {/* Live Now — now navigates to Live page */}
      <motion.div className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
            <Radio className="w-4 h-4 text-[#ef4444]" />
            <h2 className="font-bold text-sm">Live Now</h2>
          </div>
          <button onClick={() => navigate('/live')} className="text-xs text-[#ef4444] hover:underline">
            See all
          </button>
        </div>
        <div className="divide-y divide-white/5">
          {liveMatches.map(match => (
            <button key={match.id}
              onClick={() => navigate('/live')}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#ef4444]/5 transition-colors text-left">
              <div className="flex items-center gap-2">
                <span className="text-base">{match.sport}</span>
                <span className="text-sm font-medium text-[#e7e9ea]">{match.teams}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[#ef4444] font-bold text-sm">{match.score}</span>
                <span className="text-xs text-[#71767b] bg-[#ef4444]/10 px-1.5 py-0.5 rounded">{match.time}</span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Trending — now navigates to Explore */}
      <motion.div className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#ef4444]" />
            <h2 className="font-bold text-sm">Trending</h2>
          </div>
          <button onClick={() => navigate('/explore')} className="text-xs text-[#ef4444] hover:underline">
            See all
          </button>
        </div>
        <div className="divide-y divide-white/5">
          {visibleTopics.map((topic, i) => (
            <button key={topic.id}
              onClick={() => navigate(`/explore?q=${encodeURIComponent(topic.topic)}`)}
              className="w-full px-4 py-3 hover:bg-[#ef4444]/5 transition-colors text-left">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs text-[#ef4444] font-bold">#{i + 1}</span>
                <p className="text-xs text-[#71767b]">{topic.category}</p>
              </div>
              <p className="font-bold text-sm text-[#e7e9ea]">#{topic.topic}</p>
              <p className="text-xs text-[#71767b]">{topic.posts}</p>
            </button>
          ))}
        </div>
        <button onClick={() => setShowMoreTrending(!showMoreTrending)}
          className="w-full px-4 py-3 text-[#ef4444] text-sm hover:bg-red-500/5 transition-colors text-left">
          {showMoreTrending ? 'Show less' : 'Show more'}
        </button>
      </motion.div>

      {/* Who to Follow — navigate to user profile */}
      <motion.div className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <Users className="w-4 h-4 text-[#ef4444]" />
          <h2 className="font-bold text-sm">Who to follow</h2>
        </div>
        <div className="divide-y divide-white/5">
          {visibleUsers.map(user => {
            const isFollowing = followedUsers.has(user.id);
            return (
              <div key={user.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors">
                <button onClick={() => navigate(`/user/${user.id}`)} className="shrink-0">
                  <Avatar className="w-9 h-9 ring-1 ring-red-500/30">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white text-sm">{user.name[0]}</AvatarFallback>
                  </Avatar>
                </button>
                <button onClick={() => navigate(`/user/${user.id}`)} className="flex-1 min-w-0 text-left">
                  <p className="font-bold text-sm truncate hover:underline">{user.name}</p>
                  <p className="text-[#71767b] text-xs truncate">{user.handle}</p>
                </button>
                <button
                  onClick={() => toggleFollow(user.id)}
                  className={cn('px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0',
                    isFollowing
                      ? 'border border-white/20 text-white hover:border-red-500/50 hover:text-[#ef4444]'
                      : 'bg-white text-black hover:bg-white/90')}>
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
        </div>
        <button onClick={() => setShowMoreUsers(!showMoreUsers)}
          className="w-full px-4 py-3 text-[#ef4444] text-sm hover:bg-red-500/5 transition-colors text-left">
          {showMoreUsers ? 'Show less' : 'Show more'}
        </button>
      </motion.div>

      {/* Footer */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 px-2 text-xs text-[#71767b]">
        <a href="#" className="hover:text-[#ef4444] transition-colors">Terms</a>
        <a href="#" className="hover:text-[#ef4444] transition-colors">Privacy</a>
        <a href="#" className="hover:text-[#ef4444] transition-colors">Cookies</a>
        <span>© 2025 ARENA</span>
      </div>
    </div>
  );
}