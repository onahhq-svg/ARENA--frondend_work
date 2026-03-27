import { motion } from 'framer-motion';
import { PostCard } from '@/components/PostCard';
import { VideoCard } from '@/components/VideoCard';
import { PostComposer } from '@/components/PostComposer';
import { posts } from '@/lib/mockData';
import { mockVideos } from '@/lib/videoData';

function buildFeed() {
  const feed: Array<{ type: 'post'; id: string } | { type: 'video'; id: string }> = [];
  let videoIndex = 0;
  posts.forEach((post, i) => {
    feed.push({ type: 'post', id: post.id });
    if ((i + 1) % 3 === 0 && videoIndex < mockVideos.length) {
      feed.push({ type: 'video', id: mockVideos[videoIndex].id });
      videoIndex++;
    }
  });
  return feed;
}

const feed = buildFeed();

export function FeedPosts() {
  return (
    <div className="w-full min-w-0 overflow-hidden">
      <PostComposer />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
        }}>
        {feed.map(item => (
          <motion.div
            key={`${item.type}-${item.id}`}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } }
            }}>
            {item.type === 'post'
              ? <PostCard post={posts.find(p => p.id === item.id)!} />
              : <VideoCard video={mockVideos.find(v => v.id === item.id)!} />
            }
          </motion.div>
        ))}
      </motion.div>
      <div className="py-8 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#ef4444] border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}