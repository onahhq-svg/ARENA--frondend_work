import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Repeat2, 
  Heart, 
  Share, 
  Bookmark,
  MoreHorizontal,
  BadgeCheck,
  TrendingUp,
  Flame
} from 'lucide-react';
import type { Post } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  const [likeCount, setLikeCount] = useState(post.stats.likes);
  const [retweetCount, setRetweetCount] = useState(post.stats.retweets);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleRetweet = () => {
    setRetweeted(!retweeted);
    setRetweetCount(prev => retweeted ? prev - 1 : prev + 1);
  };

  const isHot = post.stats.likes > 10000;

  return (
    <motion.article 
      className={cn(
        "border-b border-[#2f3336] px-4 py-3 hover:bg-white/[0.02] transition-colors cursor-pointer w-full min-w-0 overflow-hidden",
        isHot && "border-l-2 border-l-[#ef4444]/50"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Repost Indicator */}
      {post.isRepost && (
        <div className="flex items-center gap-2 text-[#71767b] text-sm mb-2 ml-12">
          <Repeat2 className="w-4 h-4" />
          <span>{post.repostedBy} reposted</span>
        </div>
      )}

      {/* Hot Badge */}
      {isHot && (
        <div className="flex items-center gap-1 text-[#ef4444] text-xs mb-2 ml-12">
          <Flame className="w-3 h-3" />
          <span className="font-medium">Trending post</span>
          <TrendingUp className="w-3 h-3 ml-1" />
        </div>
      )}

      <div className="flex gap-3">
        {/* Avatar */}
        <div className="relative">
          <Avatar className={cn(
            "w-12 h-12 shrink-0",
            post.user.verified && "ring-2 ring-[#ef4444]/50"
          )}>
            <AvatarImage src={post.user.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white">
              {post.user.name[0]}
            </AvatarFallback>
          </Avatar>
          {post.user.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#ef4444] rounded-full flex items-center justify-center">
              <BadgeCheck className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-1 mb-1">
            <span className="font-bold text-[#e7e9ea] truncate">{post.user.name}</span>
            {post.user.verified && (
              <BadgeCheck className="w-4 h-4 text-[#ef4444] fill-[#ef4444]" />
            )}
            <span className="text-[#71767b] truncate">{post.user.handle}</span>
            <span className="text-[#71767b]">·</span>
            <span className="text-[#71767b] hover:underline">{post.timestamp}</span>
            <button className="ml-auto p-1 rounded-full hover:bg-red-500/10 hover:text-[#ef4444] transition-colors">
              <MoreHorizontal className="w-4 h-4 text-[#71767b]" />
            </button>
          </div>

          {/* Text Content */}
          <p className="text-[15px] text-[#e7e9ea] leading-normal whitespace-pre-wrap mb-3">
            {post.content}
          </p>

          {/* Media */}
          {post.media && post.media.length > 0 && (
            <div className={cn(
              "grid gap-2 mb-3 rounded-2xl overflow-hidden",
              post.media.length === 1 ? "grid-cols-1" : "grid-cols-2"
            )}>
              {post.media.map((url, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={url}
                    alt="Post media"
                    className="w-full object-cover max-h-[300px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          )}

          {/* Action Bar */}
          <div className="flex items-center justify-between max-w-md">
            <ActionButton 
              icon={MessageCircle} 
              count={post.stats.replies} 
              hoverColor="group-hover:text-[#ef4444] group-hover:bg-red-500/10"
            />
            <ActionButton 
              icon={Repeat2} 
              count={retweetCount} 
              active={retweeted}
              activeColor="text-[#22c55e]"
              hoverColor="group-hover:text-[#22c55e] group-hover:bg-green-500/10"
              onClick={handleRetweet}
            />
            <ActionButton 
              icon={Heart} 
              count={likeCount} 
              active={liked}
              activeColor="text-[#ef4444]"
              hoverColor="group-hover:text-[#ef4444] group-hover:bg-red-500/10"
              onClick={handleLike}
              filledWhenActive
            />
            <ActionButton 
              icon={Share} 
              hoverColor="group-hover:text-[#ef4444] group-hover:bg-red-500/10"
            />
            <button 
              className={cn(
                "p-2 rounded-full transition-colors",
                bookmarked ? "text-[#ef4444]" : "text-[#71767b] hover:text-[#ef4444] hover:bg-red-500/10"
              )}
              onClick={() => setBookmarked(!bookmarked)}
            >
              <Bookmark className={cn("w-4 h-4", bookmarked && "fill-current")} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

interface ActionButtonProps {
  icon: React.ElementType;
  count?: number;
  active?: boolean;
  activeColor?: string;
  hoverColor: string;
  onClick?: () => void;
  filledWhenActive?: boolean;
}

function ActionButton({ 
  icon: Icon, 
  count, 
  active, 
  activeColor, 
  hoverColor,
  onClick,
  filledWhenActive
}: ActionButtonProps) {
  return (
    <button 
      className={cn(
        "group flex items-center gap-2 text-[#71767b] transition-colors",
        active && activeColor
      )}
      onClick={onClick}
    >
      <div className={cn("p-2 rounded-full transition-colors", hoverColor)}>
        <Icon className={cn("w-4 h-4", active && filledWhenActive && "fill-current")} />
      </div>
      {count !== undefined && (
        <span className="text-sm">{count >= 1000 ? (count / 1000).toFixed(1) + 'K' : count}</span>
      )}
    </button>
  );
}