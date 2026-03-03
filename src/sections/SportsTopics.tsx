import { motion } from 'framer-motion';
import { TrendingUp, Users } from 'lucide-react';
import { sportsTopics } from '@/lib/mockData';
import { Button } from '@/components/ui/button';

export function SportsTopics() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Sports Conversations</h2>
        <button className="text-[#1d9bf0] text-sm hover:underline">View all</button>
      </div>

      <div className="grid gap-3">
        {sportsTopics.map((topic, index) => (
          <motion.div
            key={topic.id}
            className="glass-card p-4 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.01,
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {topic.trending && (
                    <span className="flex items-center gap-1 text-xs text-[#f59e0b]">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-lg text-[#e7e9ea]">{topic.name}</h3>
                <p className="text-[#71767b] text-sm">{topic.hashtag}</p>
                <div className="flex items-center gap-1 mt-2 text-[#71767b] text-xs">
                  <Users className="w-3 h-3" />
                  <span>{topic.posts}</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="rounded-full border-[#536471] text-[#1d9bf0] hover:bg-[#1d9bf0]/10 hover:border-[#1d9bf0]"
              >
                Follow
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
