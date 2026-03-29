import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X, Flame, TrendingUp, Users, Trophy, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trendingTopics, users, posts } from '@/lib/mockData';
import { PostCard } from '@/components/PostCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const categories = [
  { id: 'all',        label: 'All',        icon: Zap      },
  { id: 'football',   label: 'Football',   icon: Trophy   },
  { id: 'basketball', label: 'Basketball', icon: TrendingUp },
  { id: 'trending',   label: 'Trending',   icon: Flame    },
  { id: 'people',     label: 'People',     icon: Users    },
];

export function ExplorePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query,     setQuery]     = useState(searchParams.get('q') || '');
  const [active,    setActive]    = useState('all');
  const [searching, setSearching] = useState(!!searchParams.get('q'));

  // Sync URL param to search input
  useEffect(() => {
    const q = searchParams.get('q');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (q) { setQuery(q); setSearching(true); }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) setSearching(true);
  };

  const clearSearch = () => {
    setQuery('');
    setSearching(false);
  };

  // Filter results based on query
  const filteredPosts  = posts.filter(p =>
    p.content.toLowerCase().includes(query.toLowerCase()) ||
    p.user.name.toLowerCase().includes(query.toLowerCase())
  );
  const filteredUsers  = users.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.handle.toLowerCase().includes(query.toLowerCase())
  );
  const filteredTopics = trendingTopics.filter(t =>
    t.topic.toLowerCase().includes(query.toLowerCase()) ||
    t.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Sticky search header */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur border-b border-white/5 px-4 py-3">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71767b]" />
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); if (!e.target.value) setSearching(false); }}
            placeholder="Search ARENA..."
            className="w-full h-11 pl-11 pr-10 bg-[#16181c] border border-transparent focus:border-[#ef4444]/50 rounded-full text-white text-sm placeholder:text-[#71767b] outline-none transition-colors"
            autoFocus
          />
          {query && (
            <button type="button" onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors">
              <X className="w-4 h-4 text-[#71767b]" />
            </button>
          )}
        </form>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto border-b border-white/5">
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setActive(cat.id)}
            className={cn('flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all shrink-0',
              active === cat.id
                ? 'bg-[#ef4444] text-white shadow-lg shadow-red-500/20'
                : 'bg-white/5 text-[#71767b] hover:bg-white/10 hover:text-white')}>
            <cat.icon className="w-3.5 h-3.5" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── SEARCH RESULTS ── */}
      {searching && query ? (
        <div className="divide-y divide-white/5">
          {/* People results */}
          {(active === 'all' || active === 'people') && filteredUsers.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-white/[0.02]">
                <p className="text-xs font-bold text-[#71767b] uppercase tracking-wider">People</p>
              </div>
              {filteredUsers.map(user => (
                <motion.button key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={() => navigate(`/user/${user.id}`)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors text-left">
                  <Avatar className="w-10 h-10 ring-1 ring-[#ef4444]/30">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">{user.name}</p>
                    <p className="text-xs text-[#71767b]">{user.handle}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Topic results */}
          {(active === 'all' || active === 'trending') && filteredTopics.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-white/[0.02]">
                <p className="text-xs font-bold text-[#71767b] uppercase tracking-wider">Topics</p>
              </div>
              {filteredTopics.map(topic => (
                <motion.button key={topic.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={() => setQuery(`#${topic.topic}`)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors text-left">
                  <div className="w-10 h-10 rounded-full bg-[#ef4444]/10 flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5 text-[#ef4444]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">#{topic.topic}</p>
                    <p className="text-xs text-[#71767b]">{topic.category} · {topic.posts}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Post results */}
          {(active === 'all' || active === 'football' || active === 'basketball') && filteredPosts.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-white/[0.02]">
                <p className="text-xs font-bold text-[#71767b] uppercase tracking-wider">Posts</p>
              </div>
              {filteredPosts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
          )}

          {/* No results */}
          {filteredPosts.length === 0 && filteredUsers.length === 0 && filteredTopics.length === 0 && (
            <div className="py-20 text-center px-6">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-bold text-lg">No results for "{query}"</p>
              <p className="text-sm text-[#71767b] mt-1">Try different keywords or check spelling</p>
            </div>
          )}
        </div>
      ) : (
        /* ── DISCOVERY VIEW (no search) ── */
        <div>
          {/* Trending topics */}
          <div className="px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-[#ef4444]" />
              <h2 className="font-bold">Trending Topics</h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {trendingTopics.slice(0, 6).map((topic, i) => (
                <motion.button key={topic.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  onClick={() => { setQuery(topic.topic); setSearching(true); }}
                  className="flex flex-col items-start p-3 bg-white/[0.03] border border-white/5 rounded-xl hover:border-[#ef4444]/30 hover:bg-[#ef4444]/5 transition-all text-left">
                  <span className="text-xs text-[#ef4444] font-bold mb-1">#{i + 1} {topic.category}</span>
                  <span className="font-bold text-sm">#{topic.topic}</span>
                  <span className="text-xs text-[#71767b] mt-0.5">{topic.posts}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Suggested people */}
          <div className="px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-[#ef4444]" />
              <h2 className="font-bold">Who to Follow</h2>
            </div>
            <div className="space-y-1">
              {users.slice(0, 4).map((user, i) => (
                <motion.div key={user.id}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 py-2">
                  <button onClick={() => navigate(`/user/${user.id}`)}>
                    <Avatar className="w-10 h-10 ring-1 ring-[#ef4444]/30">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                  </button>
                  <button onClick={() => navigate(`/user/${user.id}`)} className="flex-1 min-w-0 text-left">
                    <p className="font-bold text-sm hover:underline">{user.name}</p>
                    <p className="text-xs text-[#71767b]">{user.handle}</p>
                  </button>
                  <button className="px-3 py-1.5 bg-white text-black text-xs font-bold rounded-full hover:bg-white/90 transition-colors shrink-0">
                    Follow
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Trending posts */}
          <div>
            <div className="px-4 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#ef4444]" />
                <h2 className="font-bold">Trending Posts</h2>
              </div>
            </div>
            {posts.slice(0, 5).map(post => <PostCard key={post.id} post={post} />)}
          </div>
        </div>
      )}
    </div>
  );
}