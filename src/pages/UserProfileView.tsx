import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Link as LinkIcon, Calendar, BadgeCheck, MessageCircle, MoreHorizontal, Heart, Repeat2, Share } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { users } from '@/lib/mockData';

const tabs = ['Posts', 'Replies', 'Media', 'Predictions'];

const mockUserPosts = [
  { id: 'p1', text: 'What a match last night! Arsenal were absolutely brilliant in the second half. Saka is unstoppable this season 🔥 #AFC', time: '2h', likes: 1240, replies: 89, retweets: 340 },
  { id: 'p2', text: 'My prediction for the weekend: Man City 2-1 Arsenal. Haaland to score first. Who agrees? 🎯', time: '5h', likes: 890, replies: 234, retweets: 120 },
  { id: 'p3', text: 'El Clasico tonight. Real Madrid have the edge but Barcelona at home is always dangerous. 50/50 for me.', time: '1d', likes: 2300, replies: 445, retweets: 678 },
];

export function UserProfileView() {
  const navigate   = useNavigate();
  const { userId } = useParams();

  // Find user from mock data, fallback to first user
  const user = users.find(u => u.id === userId) || users[0];

  const [tab,       setTab]       = useState('Posts');
  const [following, setFollowing] = useState(false);

  const fmt = (n: number) => {
    if (n >= 1000000) return `${(n/1000000).toFixed(1)}M`;
    if (n >= 1000)    return `${(n/1000).toFixed(1)}K`;
    return String(n);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} className="min-h-screen bg-black">

      {/* Sticky header */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-white/10 flex items-center gap-4 px-4 py-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-bold leading-tight">{user.name}</h1>
          <p className="text-xs text-[#71767b]">324 posts</p>
        </div>
      </div>

      {/* Cover */}
      <div className="h-36 bg-gradient-to-br from-[#ef4444]/40 via-[#dc2626]/20 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Avatar + Follow row */}
      <div className="px-4 flex items-end justify-between -mt-12 mb-3">
        <Avatar className="w-20 h-20 border-4 border-black ring-2 ring-[#ef4444]/30">
          <AvatarImage src={user.avatar} />
          <AvatarFallback className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white text-2xl">{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2 pb-1">
          <button onClick={() => navigate('/messages')} className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
            <MessageCircle className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
          <button
            onClick={() => setFollowing(f => !f)}
            className={cn('px-5 py-2 rounded-full text-sm font-bold transition-all',
              following
                ? 'border border-white/20 text-white hover:border-red-500/50 hover:text-[#ef4444]'
                : 'bg-white text-black hover:bg-white/90')}>
            {following ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>

      {/* Bio section */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-1.5 mb-0.5">
          <h2 className="font-black text-xl">{user.name}</h2>
          {user.verified && <BadgeCheck className="w-5 h-5 text-[#ef4444] fill-[#ef4444]" />}
        </div>
        <p className="text-[#71767b] text-sm mb-2">{user.handle}</p>
        <p className="text-[#e7e9ea] text-sm mb-3 leading-relaxed">
          {user.bio || 'Sports enthusiast. Prediction master. Making calls since day one. 🏆'}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#71767b] mb-3">
          {user.location && (
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{user.location}</span>
          )}
          <span className="flex items-center gap-1"><LinkIcon className="w-3.5 h-3.5" />arena.app</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Joined March 2024</span>
        </div>
        <div className="flex gap-5 text-sm">
          <span><strong className="text-white">{fmt(user.following || 842)}</strong> <span className="text-[#71767b]">Following</span></span>
          <span><strong className="text-white">{fmt(user.followers || 12400)}</strong> <span className="text-[#71767b]">Followers</span></span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 sticky top-[57px] bg-black z-30">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn('flex-1 py-3 text-sm font-medium transition-colors relative',
              tab === t ? 'text-white' : 'text-[#71767b] hover:text-white')}>
            {t}
            {tab === t && <motion.div layoutId="userProfileTab" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#ef4444] rounded-full" />}
          </button>
        ))}
      </div>

      {/* Posts tab */}
      {tab === 'Posts' && (
        <div className="divide-y divide-white/5">
          {mockUserPosts.map((post, i) => (
            <motion.div key={post.id}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/post/${post.id}`)}
              className="flex gap-3 px-4 py-3 hover:bg-white/[0.02] cursor-pointer transition-colors">
              <Avatar className="w-10 h-10 shrink-0">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <span className="font-bold text-sm">{user.name}</span>
                  {user.verified && <BadgeCheck className="w-3.5 h-3.5 text-[#ef4444] fill-[#ef4444]" />}
                  <span className="text-[#71767b] text-xs">{user.handle} · {post.time}</span>
                </div>
                <p className="text-sm text-[#e7e9ea] mb-2">{post.text}</p>
                <div className="flex items-center gap-5 text-[#71767b]">
                  <button onClick={e => { e.stopPropagation(); navigate(`/post/${post.id}`); }} className="flex items-center gap-1 text-xs hover:text-[#ef4444] transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" /><span>{fmt(post.replies)}</span>
                  </button>
                  <button onClick={e => e.stopPropagation()} className="flex items-center gap-1 text-xs hover:text-green-400 transition-colors">
                    <Repeat2 className="w-3.5 h-3.5" /><span>{fmt(post.retweets)}</span>
                  </button>
                  <button onClick={e => e.stopPropagation()} className="flex items-center gap-1 text-xs hover:text-[#ef4444] transition-colors">
                    <Heart className="w-3.5 h-3.5" /><span>{fmt(post.likes)}</span>
                  </button>
                  <button onClick={e => e.stopPropagation()} className="hover:text-[#ef4444] transition-colors">
                    <Share className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Other tabs — empty states */}
      {tab !== 'Posts' && (
        <div className="py-20 text-center px-6">
          <p className="text-4xl mb-3">{tab === 'Replies' ? '💬' : tab === 'Media' ? '🖼️' : '🎯'}</p>
          <p className="font-bold text-white">No {tab.toLowerCase()} yet</p>
          <p className="text-sm text-[#71767b] mt-1">{user.name} hasn't posted any {tab.toLowerCase()} yet.</p>
        </div>
      )}
    </motion.div>
  );
}