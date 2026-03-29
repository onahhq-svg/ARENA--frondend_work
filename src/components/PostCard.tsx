import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Repeat2, Heart, Share, Bookmark, MoreHorizontal, BadgeCheck, TrendingUp, Flame } from 'lucide-react';
import type { Post } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { addBookmark, removeBookmark, isBookmarked } from '@/lib/bookmarkStore';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();
  const [liked,      setLiked]      = useState(false);
  const [bookmarked, setBookmarked] = useState(() => isBookmarked(post.id));
  const [retweeted,  setRetweeted]  = useState(false);
  const [likeCount,  setLikeCount]  = useState(post.stats.likes);
  const [rtCount,    setRtCount]    = useState(post.stats.retweets);

  const goToPost    = () => navigate(`/post/${post.id}`);
  const goToProfile = (e: React.MouseEvent) => { e.stopPropagation(); navigate(`/user/${post.user.id}`); };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(l => !l);
    setLikeCount(c => liked ? c - 1 : c + 1);
  };
  const handleRetweet = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRetweeted(r => !r);
    setRtCount(c => retweeted ? c - 1 : c + 1);
  };
  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarked) {
      removeBookmark(post.id);
      setBookmarked(false);
    } else {
      addBookmark({
        id:          post.id,
        userId:      post.user.id,
        userName:    post.user.name,
        userHandle:  post.user.handle,
        userAvatar:  post.user.avatar,
        content:     post.content,
        timestamp:   post.timestamp,
        likes:       post.stats.likes,
        replies:     post.stats.replies,
        retweets:    post.stats.retweets,
        savedAt:     new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      });
      setBookmarked(true);
    }
  };

  const isHot = post.stats.likes > 10000;
  const fmt = (n: number) => n >= 1000 ? (n/1000).toFixed(1)+'K' : String(n);

  return (
    <motion.article
      onClick={goToPost}
      className={cn(
        "border-b border-[#2f3336] px-4 py-3 hover:bg-white/[0.02] transition-colors cursor-pointer w-full min-w-0 overflow-hidden",
        isHot && "border-l-2 border-l-[#ef4444]/50"
      )}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
    >
      {post.isRepost && (
        <div className="flex items-center gap-2 text-[#71767b] text-sm mb-2 ml-12">
          <Repeat2 className="w-4 h-4" /><span>{post.repostedBy} reposted</span>
        </div>
      )}
      {isHot && (
        <div className="flex items-center gap-1 text-[#ef4444] text-xs mb-2 ml-12">
          <Flame className="w-3 h-3" /><span className="font-medium">Trending post</span>
          <TrendingUp className="w-3 h-3 ml-1" />
        </div>
      )}

      <div className="flex gap-3">
        {/* Clickable Avatar → /user/:id */}
        <div className="relative shrink-0 cursor-pointer" onClick={goToProfile}>
          <Avatar className={cn("w-12 h-12 hover:opacity-80 transition-opacity", post.user.verified && "ring-2 ring-[#ef4444]/50")}>
            <AvatarImage src={post.user.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white">{post.user.name[0]}</AvatarFallback>
          </Avatar>
          {post.user.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#ef4444] rounded-full flex items-center justify-center">
              <BadgeCheck className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            {/* Clickable name → /user/:id */}
            <button onClick={goToProfile} className="font-bold text-[#e7e9ea] truncate hover:underline">
              {post.user.name}
            </button>
            {post.user.verified && <BadgeCheck className="w-4 h-4 text-[#ef4444] fill-[#ef4444] shrink-0" />}
            <span className="text-[#71767b] truncate text-sm">{post.user.handle}</span>
            <span className="text-[#71767b]">·</span>
            <span className="text-[#71767b] text-sm">{post.timestamp}</span>
            <button onClick={e => e.stopPropagation()}
              className="ml-auto p-1 rounded-full hover:bg-red-500/10 hover:text-[#ef4444] transition-colors">
              <MoreHorizontal className="w-4 h-4 text-[#71767b]" />
            </button>
          </div>

          <p className="text-[15px] text-[#e7e9ea] leading-normal whitespace-pre-wrap mb-3">{post.content}</p>

          {post.media && post.media.length > 0 && (
            <div className={cn("grid gap-2 mb-3 rounded-2xl overflow-hidden", post.media.length === 1 ? "grid-cols-1" : "grid-cols-2")}>
              {post.media.map((url, i) => (
                <img key={i} src={url} alt="Post media" className="w-full object-cover max-h-[300px]" />
              ))}
            </div>
          )}

          {/* Action bar */}
          <div className="flex items-center justify-between max-w-md">
            <button onClick={e => { e.stopPropagation(); goToPost(); }}
              className="group flex items-center gap-1.5 text-[#71767b] hover:text-[#ef4444] transition-colors">
              <div className="p-2 rounded-full group-hover:bg-red-500/10 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-sm">{fmt(post.stats.replies)}</span>
            </button>

            <button onClick={handleRetweet}
              className={cn("group flex items-center gap-1.5 transition-colors", retweeted ? "text-green-400" : "text-[#71767b] hover:text-green-400")}>
              <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
                <Repeat2 className="w-4 h-4" />
              </div>
              <span className="text-sm">{fmt(rtCount)}</span>
            </button>

            <button onClick={handleLike}
              className={cn("group flex items-center gap-1.5 transition-colors", liked ? "text-[#ef4444]" : "text-[#71767b] hover:text-[#ef4444]")}>
              <div className="p-2 rounded-full group-hover:bg-red-500/10 transition-colors">
                <Heart className={cn("w-4 h-4", liked && "fill-current")} />
              </div>
              <span className="text-sm">{fmt(likeCount)}</span>
            </button>

            <button onClick={e => e.stopPropagation()}
              className="group text-[#71767b] hover:text-[#ef4444] transition-colors">
              <div className="p-2 rounded-full group-hover:bg-red-500/10 transition-colors">
                <Share className="w-4 h-4" />
              </div>
            </button>

            <button onClick={handleBookmark}
              className={cn("p-2 rounded-full transition-colors", bookmarked ? "text-[#ef4444]" : "text-[#71767b] hover:text-[#ef4444] hover:bg-red-500/10")}>
              <Bookmark className={cn("w-4 h-4", bookmarked && "fill-current")} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}