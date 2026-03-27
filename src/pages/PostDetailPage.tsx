import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, MessageCircle, Repeat2, Share, Bookmark, BadgeCheck, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { posts, users, currentUser } from '@/lib/mockData';

const mockReplies = [
  { id: 'r1', user: users[1], content: "Absolutely agree! The second half was incredible 🔥", timestamp: '2m',  likes: 12,  liked: false },
  { id: 'r2', user: users[2], content: "That goal in the 89th minute... unreal scenes",         timestamp: '5m',  likes: 34,  liked: false },
  { id: 'r3', user: users[3], content: "Best match of the season so far, no debate",             timestamp: '8m',  likes: 8,   liked: false },
  { id: 'r4', user: users[0], content: "Can't believe what I just witnessed 😤",                 timestamp: '12m', likes: 56,  liked: true  },
];

export function PostDetailPage() {
  const { postId } = useParams();
  const navigate   = useNavigate();

  const post = posts.find(p => p.id === postId) || posts[0];

  const [liked,      setLiked]      = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [retweeted,  setRetweeted]  = useState(false);
  const [likeCount,  setLikeCount]  = useState(post.stats.likes);
  const [replies,    setReplies]    = useState(mockReplies);
  const [replyText,  setReplyText]  = useState('');

  const fmt = (n: number) => n >= 1000 ? (n/1000).toFixed(1)+'K' : String(n);

  const sendReply = () => {
    if (!replyText.trim()) return;
    setReplies(prev => [{
      id: `r${Date.now()}`, user: currentUser,
      content: replyText, timestamp: 'now', likes: 0, liked: false,
    }, ...prev]);
    setReplyText('');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-white/10 flex items-center gap-4 px-4 py-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-lg">Post</h1>
      </div>

      {/* Main Post */}
      <div className="px-4 pt-4 pb-3 border-b border-white/10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(`/user/${post.user.id}`)}>
            <Avatar className="w-12 h-12 ring-2 ring-[#ef4444]/30">
              <AvatarImage src={post.user.avatar} />
              <AvatarFallback className="bg-[#ef4444]/20 text-[#ef4444]">{post.user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-white hover:underline">{post.user.name}</span>
                {post.user.verified && <BadgeCheck className="w-4 h-4 text-[#ef4444] fill-[#ef4444]" />}
              </div>
              <span className="text-sm text-[#71767b]">{post.user.handle}</span>
            </div>
          </div>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <MoreHorizontal className="w-5 h-5 text-[#71767b]" />
          </button>
        </div>

        <p className="text-[17px] text-[#e7e9ea] leading-relaxed mb-3">{post.content}</p>

        {post.media && post.media.length > 0 && (
          <div className="rounded-2xl overflow-hidden mb-3">
            <img src={post.media[0]} alt="" className="w-full object-cover max-h-80" />
          </div>
        )}

        <p className="text-sm text-[#71767b] mb-3">{post.timestamp} · Arena Sports</p>

        {/* Stats */}
        <div className="flex gap-5 py-3 border-y border-white/10 text-sm">
          <span><strong>{fmt(post.stats.retweets)}</strong> <span className="text-[#71767b]">Reposts</span></span>
          <span><strong>{fmt(post.stats.replies)}</strong> <span className="text-[#71767b]">Replies</span></span>
          <span><strong>{fmt(likeCount)}</strong> <span className="text-[#71767b]">Likes</span></span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 max-w-xs">
          {[
            { icon: MessageCircle, action: () => {},                               active: false,      color: 'hover:text-[#ef4444] hover:bg-red-500/10' },
            { icon: Repeat2,       action: () => setRetweeted(r => !r),            active: retweeted,  color: 'hover:text-green-400 hover:bg-green-500/10' },
            { icon: Heart,         action: () => { setLiked(l => !l); setLikeCount(c => liked ? c-1 : c+1); }, active: liked, color: 'hover:text-[#ef4444] hover:bg-red-500/10' },
            { icon: Share,         action: () => {},                               active: false,      color: 'hover:text-[#ef4444] hover:bg-red-500/10' },
            { icon: Bookmark,      action: () => setBookmarked(b => !b),           active: bookmarked, color: 'hover:text-[#ef4444] hover:bg-red-500/10' },
          ].map(({ icon: Icon, action, active, color }, i) => (
            <button key={i} onClick={action}
              className={cn('p-2 rounded-full transition-colors text-[#71767b]', color,
                active && (Icon === Heart || Icon === Bookmark || Icon === Repeat2) && 'text-[#ef4444]',
                active && Icon === Repeat2 && 'text-green-400')}>
              <Icon className={cn('w-5 h-5', active && (Icon === Heart || Icon === Bookmark) && 'fill-current')} />
            </button>
          ))}
        </div>
      </div>

      {/* Reply composer */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
        <Avatar className="w-9 h-9 shrink-0">
          <AvatarImage src={currentUser.avatar} />
          <AvatarFallback className="bg-[#ef4444]/20 text-[#ef4444]">{currentUser.name[0]}</AvatarFallback>
        </Avatar>
        <input value={replyText} onChange={e => setReplyText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendReply()}
          placeholder="Post your reply..."
          className="flex-1 bg-transparent text-white placeholder:text-[#555] text-sm outline-none py-2" />
        <motion.button whileTap={{ scale: 0.95 }} onClick={sendReply} disabled={!replyText.trim()}
          className={cn('px-4 py-1.5 rounded-full text-sm font-bold transition-all',
            replyText.trim() ? 'bg-gradient-to-r from-[#dc2626] to-[#ef4444] text-white' : 'bg-white/10 text-[#555] cursor-not-allowed')}>
          Reply
        </motion.button>
      </div>

      {/* Replies */}
      <div className="divide-y divide-white/5">
        <AnimatePresence>
          {replies.map((reply, i) => (
            <motion.div key={reply.id}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="flex gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors">
              <Avatar className="w-10 h-10 shrink-0 cursor-pointer" onClick={() => navigate(`/user/${reply.user.id}`)}>
                <AvatarImage src={reply.user.avatar} />
                <AvatarFallback>{reply.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  <button onClick={() => navigate(`/user/${reply.user.id}`)} className="font-bold text-sm hover:underline">{reply.user.name}</button>
                  <span className="text-[#71767b] text-xs">{reply.user.handle} · {reply.timestamp}</span>
                  <button className="ml-auto p-1 rounded-full hover:bg-white/10">
                    <MoreHorizontal className="w-3.5 h-3.5 text-[#71767b]" />
                  </button>
                </div>
                <p className="text-sm text-[#e7e9ea] mb-2">{reply.content}</p>
                <div className="flex items-center gap-4 text-[#71767b]">
                  <button className="hover:text-[#ef4444] transition-colors"><MessageCircle className="w-3.5 h-3.5" /></button>
                  <button className="hover:text-green-400 transition-colors"><Repeat2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setReplies(prev => prev.map(r => r.id === reply.id ? { ...r, liked: !r.liked, likes: r.liked ? r.likes-1 : r.likes+1 } : r))}
                    className={cn('flex items-center gap-1 text-xs transition-colors', reply.liked ? 'text-[#ef4444]' : 'hover:text-[#ef4444]')}>
                    <Heart className={cn('w-3.5 h-3.5', reply.liked && 'fill-current')} />
                    <span>{reply.likes}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}