import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, MessageCircle, Repeat2, Share, Bookmark,
  BadgeCheck, VolumeX, Volume2, Play, X, Send
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { users } from '@/lib/mockData';
import { mockVideos } from '@/lib/videoData';

const mockVideoComments = [
  { id: 'vc1', user: users[1], text: 'Absolute scenes 🔥', time: '2m' },
  { id: 'vc2', user: users[2], text: 'Best goal of the season easily', time: '5m' },
  { id: 'vc3', user: users[3], text: 'Called it!! 🎯', time: '8m' },
];

function CommentOverlay({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState('');
  const [comments, setComments] = useState(mockVideoComments);

  const send = () => {
    if (!text.trim()) return;
    setComments(prev => [{ id: Date.now().toString(), user: users[0], text, time: 'now' }, ...prev]);
    setText('');
  };

  return (
    <motion.div
      initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25 }}
      className="absolute inset-x-0 bottom-0 h-[70%] bg-black/95 backdrop-blur-sm rounded-t-2xl z-50 flex flex-col border-t border-white/10">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <p className="font-bold text-sm">{comments.length + 1240} Comments</p>
        <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-white/5">
        {comments.map(c => (
          <div key={c.id} className="flex gap-3 px-4 py-3">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarImage src={c.user.avatar} />
              <AvatarFallback className="text-xs">{c.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold">{c.user.name}</span>
                <span className="text-[10px] text-[#71767b]">{c.time}</span>
              </div>
              <p className="text-sm text-[#e7e9ea]">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-white/10 flex gap-2 items-center">
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarImage src={users[0].avatar} />
          <AvatarFallback className="text-xs">{users[0].name[0]}</AvatarFallback>
        </Avatar>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Add a comment..."
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-[#71767b] outline-none focus:border-[#ef4444]/50"
        />
        <button
          onClick={send}
          disabled={!text.trim()}
          className={cn('p-2 rounded-full transition-colors', text.trim() ? 'bg-[#ef4444] text-white' : 'bg-white/10 text-[#71767b]')}>
          <Send className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

interface VideoCardProps {
  video: typeof mockVideos[0];
}

export function VideoCard({ video }: VideoCardProps) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [liked,        setLiked]        = useState(false);
  const [saved,        setSaved]        = useState(false);
  const [reposted,     setReposted]     = useState(false);
  const [muted,        setMuted]        = useState(true);
  const [playing,      setPlaying]      = useState(false);
  const [following,    setFollowing]    = useState(false);
  const [likeCount,    setLikeCount]    = useState(video.likes);
  const [showComments, setShowComments] = useState(false);

  const fmt = (n: number) => n >= 1000 ? (n / 1000).toFixed(1) + 'K' : String(n);

  return (
    <div ref={containerRef} className="border-b border-[#2f3336] bg-black">
      {/* Author row */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="cursor-pointer" onClick={() => navigate(`/user/${video.user.id}`)}>
          <Avatar className="w-10 h-10 ring-2 ring-[#ef4444]/30">
            <AvatarImage src={video.user.avatar} />
            <AvatarFallback className="bg-[#ef4444]/20 text-[#ef4444]">{video.user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate(`/user/${video.user.id}`)}
              className="font-bold text-sm hover:underline truncate">
              {video.user.name}
            </button>
            {video.user.verified && <BadgeCheck className="w-3.5 h-3.5 text-[#ef4444] fill-[#ef4444] shrink-0" />}
            <span className="text-xs bg-[#ef4444]/15 text-[#ef4444] px-1.5 py-0.5 rounded-full ml-1 shrink-0">
              {video.emoji} {video.category}
            </span>
          </div>
          <p className="text-xs text-[#71767b]">{video.user.handle}</p>
        </div>
        <button
          onClick={() => setFollowing(f => !f)}
          className={cn('px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0',
            following
              ? 'border border-white/20 text-white'
              : 'bg-white text-black hover:bg-white/90')}>
          {following ? 'Following' : 'Follow'}
        </button>
      </div>

      {/* Caption */}
      <p className="px-4 pb-2 text-sm text-[#e7e9ea] leading-relaxed">{video.caption}</p>

      {/* Video area */}
      <div
        className="relative mx-4 mb-3 rounded-2xl overflow-hidden bg-black cursor-pointer"
        style={{ aspectRatio: '9/16', maxHeight: '480px' }}
        onClick={() => setPlaying(p => !p)}>

        <img src={video.thumbnail} alt="video" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Play button */}
        <AnimatePresence>
          {!playing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur flex items-center justify-center border border-white/20">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mute toggle */}
        <button
          onClick={e => { e.stopPropagation(); setMuted(m => !m); }}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center border border-white/20 hover:bg-black/70 transition-colors">
          {muted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
        </button>

        {/* Comment overlay */}
        <AnimatePresence>
          {showComments && <CommentOverlay onClose={() => setShowComments(false)} />}
        </AnimatePresence>
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-1 px-4 pb-3">
        <button
          onClick={() => { setLiked(l => !l); setLikeCount(c => liked ? c - 1 : c + 1); }}
          className={cn('flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold transition-all',
            liked ? 'text-[#ef4444] bg-red-500/10' : 'text-[#71767b] hover:text-[#ef4444] hover:bg-red-500/10')}>
          <Heart className={cn('w-4 h-4', liked && 'fill-current')} />
          <span>{fmt(likeCount)}</span>
        </button>

        <button
          onClick={() => setShowComments(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold text-[#71767b] hover:text-[#ef4444] hover:bg-red-500/10 transition-all">
          <MessageCircle className="w-4 h-4" />
          <span>{fmt(video.comments)}</span>
        </button>

        <button
          onClick={() => setReposted(r => !r)}
          className={cn('flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold transition-all',
            reposted ? 'text-green-400 bg-green-500/10' : 'text-[#71767b] hover:text-green-400 hover:bg-green-500/10')}>
          <Repeat2 className="w-4 h-4" />
          <span>{fmt(video.reposts + (reposted ? 1 : 0))}</span>
        </button>

        <button className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold text-[#71767b] hover:text-[#ef4444] hover:bg-red-500/10 transition-all">
          <Share className="w-4 h-4" />
        </button>

        <div className="flex-1" />

        <button
          onClick={() => setSaved(s => !s)}
          className={cn('p-2 rounded-full transition-all',
            saved ? 'text-[#ef4444]' : 'text-[#71767b] hover:text-[#ef4444] hover:bg-red-500/10')}>
          <Bookmark className={cn('w-4 h-4', saved && 'fill-current')} />
        </button>
      </div>
    </div>
  );
}