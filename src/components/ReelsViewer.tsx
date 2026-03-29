import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Heart, MessageCircle, Repeat2, Share,
  Bookmark, Volume2, VolumeX, Play,
  ChevronUp, ChevronDown, Send, BadgeCheck
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const mockVideoComments = [
  { id: 'c1', user: { name: 'Arsenal Fan', handle: '@arsenal_fan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=af' }, text: 'Absolute worldie ??', time: '2m' },
  { id: 'c2', user: { name: 'FootballDaily', handle: '@fd', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fd' }, text: 'Goal of the season easily', time: '5m' },
  { id: 'c3', user: { name: 'TipKing', handle: '@tipking', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tk' }, text: 'Called it!! ??', time: '8m' },
];

export interface ReelVideo {
  id: string;
  user: { id: string; name: string; handle: string; avatar: string; verified?: boolean; };
  caption: string; category: string; emoji: string;
  likes: number; comments: number; reposts: number; thumbnail: string;
}

interface ReelsViewerProps {
  videos: ReelVideo[];
  startIndex?: number;
  onClose: () => void;
}

function ReelItem({ video }: { video: ReelVideo }) {
  const navigate = useNavigate();
  const [liked,        setLiked]        = useState(false);
  const [saved,        setSaved]        = useState(false);
  const [muted,        setMuted]        = useState(true);
  const [playing,      setPlaying]      = useState(true);
  const [following,    setFollowing]    = useState(false);
  const [likeCount,    setLikeCount]    = useState(video.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText,  setCommentText]  = useState('');
  const [comments,     setComments]     = useState(mockVideoComments);

  const fmt = (n: number) => n >= 1000 ? (n/1000).toFixed(1)+'K' : String(n);

  const sendComment = () => {
    if (!commentText.trim()) return;
    setComments(prev => [{ id: Date.now().toString(), user: { name: 'You', handle: '@you', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you' }, text: commentText, time: 'now' }, ...prev]);
    setCommentText('');
  };

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
      <img src={video.thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

      <div className="absolute inset-0 z-10" onClick={() => setPlaying(p => !p)}>
        <AnimatePresence>
          {!playing && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
                <Play className="w-7 h-7 text-white fill-white ml-1" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute top-0 inset-x-0 z-20 px-4 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur rounded-full px-3 py-1.5">
          <span className="text-base">{video.emoji}</span>
          <span className="text-white text-xs font-bold">{video.category}</span>
        </div>
        <button onClick={() => setMuted(m => !m)} className="w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center">
          {muted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
        </button>
      </div>

      <div className="absolute right-3 bottom-32 z-20 flex flex-col items-center gap-5">
        <button onClick={e => { e.stopPropagation(); setLiked(l => !l); setLikeCount(c => liked ? c-1 : c+1); }} className="flex flex-col items-center gap-1">
          <div className={cn('w-11 h-11 rounded-full bg-black/40 backdrop-blur flex items-center justify-center', liked && 'bg-[#ef4444]/30')}>
            <Heart className={cn('w-5 h-5 text-white', liked && 'fill-[#ef4444] text-[#ef4444]')} />
          </div>
          <span className="text-white text-xs font-semibold drop-shadow">{fmt(likeCount)}</span>
        </button>
        <button onClick={e => { e.stopPropagation(); setShowComments(true); }} className="flex flex-col items-center gap-1">
          <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-xs font-semibold drop-shadow">{fmt(video.comments)}</span>
        </button>
        <button onClick={e => e.stopPropagation()} className="flex flex-col items-center gap-1">
          <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur flex items-center justify-center">
            <Repeat2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-xs font-semibold drop-shadow">{fmt(video.reposts)}</span>
        </button>
        <button onClick={e => e.stopPropagation()} className="flex flex-col items-center gap-1">
          <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur flex items-center justify-center">
            <Share className="w-5 h-5 text-white" />
          </div>
        </button>
        <button onClick={e => { e.stopPropagation(); setSaved(s => !s); }} className="flex flex-col items-center gap-1">
          <div className={cn('w-11 h-11 rounded-full bg-black/40 backdrop-blur flex items-center justify-center', saved && 'bg-[#ef4444]/30')}>
            <Bookmark className={cn('w-5 h-5 text-white', saved && 'fill-[#ef4444] text-[#ef4444]')} />
          </div>
        </button>
      </div>

      <div className="absolute bottom-0 inset-x-0 z-20 px-4 pb-6">
        <button onClick={e => { e.stopPropagation(); navigate(`/user/${video.user.id}`); }} className="flex items-center gap-2 mb-2">
          <Avatar className="w-9 h-9 ring-2 ring-white/30">
            <AvatarImage src={video.user.avatar} />
            <AvatarFallback className="text-xs">{video.user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1">
            <span className="text-white font-bold text-sm drop-shadow">{video.user.name}</span>
            {video.user.verified && <BadgeCheck className="w-3.5 h-3.5 text-[#ef4444] fill-[#ef4444]" />}
          </div>
          <button onClick={e => { e.stopPropagation(); setFollowing(f => !f); }}
            className={cn('ml-2 px-3 py-1 rounded-full text-xs font-bold border transition-all',
              following ? 'border-white/40 text-white' : 'border-white text-white bg-white/20 backdrop-blur')}>
            {following ? 'Following' : 'Follow'}
          </button>
        </button>
        <p className="text-white text-sm leading-relaxed drop-shadow line-clamp-2">{video.caption}</p>
      </div>

      <AnimatePresence>
        {showComments && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 z-30" onClick={() => setShowComments(false)} />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute inset-x-0 bottom-0 h-[70%] bg-[#0d0d0d] rounded-t-2xl z-40 flex flex-col"
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <p className="font-bold text-sm">{comments.length + 1200} Comments</p>
                <button onClick={() => setShowComments(false)} className="p-1.5 rounded-full hover:bg-white/10"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-white/5">
                {comments.map(c => (
                  <div key={c.id} className="flex gap-3 px-4 py-3">
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarImage src={c.user.avatar} />
                      <AvatarFallback className="text-xs">{c.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold">{c.user.name}</span>
                        <span className="text-[10px] text-[#71767b]">{c.time}</span>
                      </div>
                      <p className="text-sm">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-white/10 flex gap-2 items-center">
                <input value={commentText} onChange={e => setCommentText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendComment()}
                  placeholder="Add a comment..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-[#71767b] outline-none focus:border-[#ef4444]/50" />
                <button onClick={sendComment} disabled={!commentText.trim()}
                  className={cn('p-2 rounded-full transition-colors', commentText.trim() ? 'bg-[#ef4444] text-white' : 'bg-white/10 text-[#71767b]')}>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ReelsViewer({ videos, startIndex = 0, onClose }: ReelsViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const touchStartY = useRef(0);

  const prev = () => { if (currentIndex > 0) setCurrentIndex(i => i - 1); };
  const next = () => { if (currentIndex < videos.length - 1) setCurrentIndex(i => i + 1); };

  const handleTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (diff > 50) next();
    if (diff < -50) prev();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') prev();
      if (e.key === 'ArrowDown') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentIndex]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex flex-col"
      onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <button onClick={onClose} className="absolute top-4 left-4 z-50 w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
        <X className="w-5 h-5 text-white" />
      </button>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2">
        <button onClick={prev} disabled={currentIndex === 0}
          className={cn('w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center', currentIndex === 0 ? 'opacity-30' : 'hover:bg-black/70')}>
          <ChevronUp className="w-5 h-5 text-white" />
        </button>
        <button onClick={next} disabled={currentIndex === videos.length - 1}
          className={cn('w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center', currentIndex === videos.length - 1 ? 'opacity-30' : 'hover:bg-black/70')}>
          <ChevronDown className="w-5 h-5 text-white" />
        </button>
      </div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex gap-1">
        {videos.map((_, i) => (
          <div key={i} className={cn('h-1 rounded-full transition-all', i === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40')} />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={currentIndex}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.2 }}
          className="w-full h-full max-w-sm mx-auto">
          <ReelItem video={videos[currentIndex]} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
