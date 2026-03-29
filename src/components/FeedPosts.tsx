import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PostCard } from '@/components/PostCard';
import { PostComposer } from '@/components/PostComposer';
import { posts } from '@/lib/mockData';
import { mockVideos } from '@/lib/videoData';
import { ReelsViewer, type ReelVideo } from '@/components/ReelsViewer';
import { Play, Heart, MessageCircle, Repeat2, BadgeCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

// Build mixed feed — video every 3 posts
function buildFeed() {
  const feed: Array<{ type: 'post'; id: string } | { type: 'video'; id: string }> = [];
  let vi = 0;
  posts.forEach((post, i) => {
    feed.push({ type: 'post', id: post.id });
    if ((i + 1) % 3 === 0 && vi < mockVideos.length) {
      feed.push({ type: 'video', id: mockVideos[vi].id });
      vi++;
    }
  });
  return feed;
}

const feed = buildFeed();

// Convert mockVideos to ReelVideo format
const reelVideos: ReelVideo[] = mockVideos.map(v => ({
  id: v.id, user: { id: v.user.id, name: v.user.name, handle: v.user.handle, avatar: v.user.avatar, verified: v.user.verified },
  caption: v.caption, category: v.category, emoji: v.emoji,
  likes: v.likes, comments: v.comments, reposts: v.reposts, thumbnail: v.thumbnail,
}));

// Inline video preview card — tapping opens reels
function VideoPreviewCard({ video, onTap }: { video: typeof mockVideos[0]; onTap: () => void }) {
  const navigate = useNavigate();
  const fmt = (n: number) => n >= 1000 ? (n/1000).toFixed(1)+'K' : String(n);

  return (
    <div className="border-b border-[#2f3336] px-4 py-3">
      {/* Author */}
      <div className="flex items-center gap-3 mb-2">
        <button onClick={() => navigate(`/user/${video.user.id}`)}>
          <Avatar className="w-9 h-9 ring-1 ring-[#ef4444]/30">
            <AvatarImage src={video.user.avatar} />
            <AvatarFallback>{video.user.name[0]}</AvatarFallback>
          </Avatar>
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <button onClick={() => navigate(`/user/${video.user.id}`)} className="font-bold text-sm hover:underline truncate">{video.user.name}</button>
            {video.user.verified && <BadgeCheck className="w-3.5 h-3.5 text-[#ef4444] fill-[#ef4444]" />}
            <span className="text-xs bg-[#ef4444]/15 text-[#ef4444] px-1.5 py-0.5 rounded-full ml-1">{video.emoji} {video.category}</span>
          </div>
          <p className="text-xs text-[#71767b]">{video.user.handle}</p>
        </div>
      </div>

      {/* Caption */}
      <p className="text-sm text-[#e7e9ea] mb-2 line-clamp-2">{video.caption}</p>

      {/* Thumbnail — tap to open reels */}
      <div onClick={onTap} className="relative rounded-2xl overflow-hidden cursor-pointer"
        style={{ aspectRatio: '16/9' }}>
        <img src={video.thumbnail} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur flex items-center justify-center border border-white/20">
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur rounded-full px-2 py-0.5">
          <span className="text-white text-xs font-semibold">Tap to watch</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 mt-2">
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm text-[#71767b] hover:text-[#ef4444] hover:bg-red-500/10 transition-all">
          <Heart className="w-4 h-4" /><span>{fmt(video.likes)}</span>
        </button>
        <button onClick={onTap} className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm text-[#71767b] hover:text-[#ef4444] hover:bg-red-500/10 transition-all">
          <MessageCircle className="w-4 h-4" /><span>{fmt(video.comments)}</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm text-[#71767b] hover:text-green-400 hover:bg-green-500/10 transition-all">
          <Repeat2 className="w-4 h-4" /><span>{fmt(video.reposts)}</span>
        </button>
      </div>
    </div>
  );
}

export function FeedPosts() {
  const [reelsOpen,  setReelsOpen]  = useState(false);
  const [reelStart,  setReelStart]  = useState(0);

  const openReels = (videoId: string) => {
    const idx = reelVideos.findIndex(v => v.id === videoId);
    setReelStart(idx >= 0 ? idx : 0);
    setReelsOpen(true);
  };

  return (
    <div className="w-full min-w-0 overflow-hidden">
      <PostComposer />
      <motion.div initial="hidden" animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }}>
        {feed.map(item => (
          <motion.div key={`${item.type}-${item.id}`}
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}>
            {item.type === 'post'
              ? <PostCard post={posts.find(p => p.id === item.id)!} />
              : <VideoPreviewCard
                  video={mockVideos.find(v => v.id === item.id)!}
                  onTap={() => openReels(item.id)}
                />
            }
          </motion.div>
        ))}
      </motion.div>

      <div className="py-8 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#ef4444] border-t-transparent rounded-full animate-spin" />
      </div>

      {/* Reels fullscreen viewer */}
      <AnimatePresence>
        {reelsOpen && (
          <ReelsViewer videos={reelVideos} startIndex={reelStart} onClose={() => setReelsOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}