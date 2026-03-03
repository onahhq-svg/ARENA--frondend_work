import { motion } from 'framer-motion';
import { Search, TrendingUp, Hash } from 'lucide-react';
import { Header } from '@/layout/Header';
import { Input } from '@/components/ui/input';
import { trendingTopics, sportsTopics } from '@/lib/mockData';

export function ExplorePage() {
  return (
    <div>
      <Header title="Explore" />
      
      {/* Search Bar */}
      <div className="p-4 border-b border-[#2f3336]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71767b]" />
          <Input 
            placeholder="Search SportX"
            className="w-full h-12 pl-12 bg-[#16181c] border-none rounded-full text-[#e7e9ea] placeholder:text-[#71767b] focus:ring-2 focus:ring-[#1d9bf0]"
          />
        </div>
      </div>

      {/* Trending Section */}
      <div className="border-b border-[#2f3336]">
        <h2 className="text-xl font-bold px-4 py-4">Trending</h2>
        {trendingTopics.map((topic, index) => (
          <motion.div 
            key={topic.id}
            className="px-4 py-3 hover:bg-white/[0.03] cursor-pointer transition-colors border-b border-[#2f3336] last:border-b-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 4 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[#71767b]">{topic.category}</p>
                <p className="font-bold text-[#e7e9ea] text-lg">#{topic.topic}</p>
                <p className="text-xs text-[#71767b]">{topic.posts}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#16181c] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#1d9bf0]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sports Topics */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Sports Topics</h2>
        <div className="flex flex-wrap gap-2">
          {sportsTopics.map((topic, index) => (
            <motion.button
              key={topic.id}
              className="flex items-center gap-2 px-4 py-2 bg-[#16181c] rounded-full hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0] transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Hash className="w-4 h-4" />
              <span className="text-sm font-medium">{topic.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
