import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Lock, Globe, ChevronRight, Plus } from 'lucide-react';
import { Header } from '@/layout/Header';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const tabs = ['Discover', 'My Communities', 'Trending'];

const communities = [
  { id: '1', name: 'Premier League Fans', members: '124K', category: 'Football', privacy: 'public', emoji: '⚽', joined: false },
  { id: '2', name: 'NBA Talk', members: '98K', category: 'Basketball', privacy: 'public', emoji: '🏀', joined: true },
  { id: '3', name: 'Champions League', members: '210K', category: 'Football', privacy: 'public', emoji: '🏆', joined: false },
  { id: '4', name: 'Fantasy Football HQ', members: '55K', category: 'Fantasy', privacy: 'private', emoji: '🎯', joined: true },
  { id: '5', name: 'Tennis World', members: '34K', category: 'Tennis', privacy: 'public', emoji: '🎾', joined: false },
  { id: '6', name: 'Prediction Masters', members: '18K', category: 'Predictions', privacy: 'private', emoji: '🔮', joined: false },
];

export function CommunitiesPage() {
  const [activeTab, setActiveTab] = useState('Discover');
  const [joined, setJoined] = useState<Set<string>>(new Set(['2', '4']));

  const toggleJoin = (id: string) => {
    setJoined(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const displayed = activeTab === 'My Communities'
    ? communities.filter(c => joined.has(c.id))
    : communities;

  return (
    <div>
      <Header
        title="Communities"
        settingsOptions={[
          { label: 'Show Suggested Communities', type: 'toggle', defaultValue: true },
          { label: 'Community Notifications', type: 'toggle', defaultValue: true },
          { type: 'divider', label: '' },
          { label: 'Manage Communities', type: 'link', href: '/settings' },
        ]}
      />

      {/* Search */}
      <div className="px-4 py-3 border-b border-white/5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71767b]" />
          <Input placeholder="Search communities" className="pl-10 bg-white/5 border-none rounded-full text-white placeholder:text-[#71767b]" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={cn("flex-1 py-3 text-sm font-medium transition-colors relative",
              activeTab === tab ? "text-white" : "text-[#71767b] hover:text-white")}>
            {tab}
            {activeTab === tab && <motion.div layoutId="commTab" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#ef4444] rounded-full" />}
          </button>
        ))}
      </div>

      {/* Create Community Button */}
      <div className="px-4 py-3 border-b border-white/5">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-[#ef4444]/40 text-[#ef4444] hover:bg-red-500/10 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" /> Create a Community
        </button>
      </div>

      {/* Communities List */}
      <div className="divide-y divide-white/5">
        {displayed.map((community, i) => (
          <motion.div key={community.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4 px-4 py-4 hover:bg-white/5 cursor-pointer transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-900/20 border border-red-500/20 flex items-center justify-center text-2xl shrink-0">
              {community.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold truncate">{community.name}</p>
                {community.privacy === 'private'
                  ? <Lock className="w-3 h-3 text-[#71767b] shrink-0" />
                  : <Globe className="w-3 h-3 text-[#71767b] shrink-0" />}
              </div>
              <p className="text-xs text-[#71767b]">{community.members} members · {community.category}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); toggleJoin(community.id); }}
              className={cn("px-4 py-1.5 rounded-full text-sm font-semibold transition-all shrink-0",
                joined.has(community.id)
                  ? "border border-white/20 text-white hover:border-red-500/50 hover:text-[#ef4444]"
                  : "bg-white text-black hover:bg-white/90"
              )}>
              {joined.has(community.id) ? 'Joined' : 'Join'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
