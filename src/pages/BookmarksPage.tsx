import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Trash2 } from 'lucide-react';
import { Header } from '@/layout/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Heart, MessageCircle, Repeat2 } from 'lucide-react';

const KEY = 'arena_bookmarks';

interface BookmarkedPost {
  id: string; userId: string; userName: string; userHandle: string;
  userAvatar: string; content: string; timestamp: string;
  likes: number; replies: number; retweets: number; savedAt: string;
}

function getBookmarks(): BookmarkedPost[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}

function removeBookmark(postId: string) {
  localStorage.setItem(KEY, JSON.stringify(getBookmarks().filter(b => b.id !== postId)));
}

const tabs = ['All', 'Posts'];

export function BookmarksPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [bookmarks, setBookmarks] = useState<BookmarkedPost[]>(() => getBookmarks());

  const handleRemove = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    removeBookmark(postId);
    setBookmarks(getBookmarks());
  };

  const fmt = (n: number) => n >= 1000 ? (n/1000).toFixed(1)+'K' : String(n);

  return (
    <div>
      <Header title="Bookmarks"
        settingsOptions={[
          { label: 'Sort by Newest', type: 'toggle', defaultValue: true },
          { label: 'Show Post Previews', type: 'toggle', defaultValue: true },
          { type: 'divider', label: '' },
          { label: 'Clear All Bookmarks', type: 'link', href: '#' },
        ]}
      />
      <div className="flex border-b border-white/10">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={cn('flex-1 py-3 text-sm font-medium transition-colors relative',
              activeTab === tab ? 'text-white' : 'text-[#71767b] hover:text-white')}>
            {tab}
            {activeTab === tab && <motion.div layoutId="bookmarkTab" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#ef4444] rounded-full" />}
          </button>
        ))}
      </div>
      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#ef4444]/10 flex items-center justify-center mb-4">
            <Bookmark className="w-8 h-8 text-[#ef4444]/50" />
          </div>
          <p className="font-bold text-lg">No bookmarks yet</p>
          <p className="text-sm text-[#71767b] mt-1">Tap the bookmark icon on any post to save it here</p>
        </div>
      ) : (
        <AnimatePresence>
          {bookmarks.map((item, i) => (
            <motion.div key={item.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => navigate(`/post/${item.id}`)}
              className="flex gap-3 px-4 py-3 border-b border-[#2f3336] hover:bg-white/[0.02] cursor-pointer transition-colors">
              <div className="shrink-0" onClick={e => { e.stopPropagation(); navigate(`/user/${item.userId}`); }}>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={item.userAvatar} />
                  <AvatarFallback className="bg-[#ef4444]/20 text-[#ef4444]">{item.userName[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  <button onClick={e => { e.stopPropagation(); navigate(`/user/${item.userId}`); }}
                    className="font-bold text-sm hover:underline truncate">{item.userName}</button>
                  <span className="text-[#71767b] text-xs">{item.userHandle} · {item.timestamp}</span>
                </div>
                <p className="text-sm text-[#e7e9ea] mb-2 line-clamp-3">{item.content}</p>
                <div className="flex items-center gap-4 text-xs text-[#71767b]">
                  <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{fmt(item.replies)}</span>
                  <span className="flex items-center gap-1"><Repeat2 className="w-3.5 h-3.5" />{fmt(item.retweets)}</span>
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{fmt(item.likes)}</span>
                </div>
                <p className="text-[10px] text-[#71767b]/60 mt-1.5">Saved {item.savedAt}</p>
              </div>
              <button onClick={e => handleRemove(e, item.id)}
                className="p-2 rounded-full hover:bg-red-500/10 hover:text-[#ef4444] text-[#71767b] transition-colors shrink-0 self-start">
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
