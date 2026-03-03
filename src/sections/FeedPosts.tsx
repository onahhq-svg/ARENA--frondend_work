import { motion } from 'framer-motion';
import { PostCard } from '@/components/PostCard';
import { PostComposer } from '@/components/PostComposer';
import { posts } from '@/lib/mockData';

export function FeedPosts() {
  return (
    <div className="w-full min-w-0 overflow-hidden">
      <PostComposer />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
      >
        {posts.map((post) => (
          <motion.div
            key={post.id}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
              }
            }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </motion.div>

      {/* Loading indicator */}
      <div className="py-8 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1d9bf0] border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}