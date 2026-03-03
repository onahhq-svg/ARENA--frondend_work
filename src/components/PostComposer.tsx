import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image, BarChart3, Smile, Calendar, MapPin,
  Target, Zap, X, Globe
} from 'lucide-react';
import { currentUser } from '@/lib/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ─── Floating Modal ───────────────────────────────────────────────────────────
function PostModal({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState('');
  const [posted, setPosted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  const handlePost = () => {
    if (!text.trim()) return;
    setPosted(true);
    setTimeout(() => onClose(), 1200);
  };

  const canPost = text.trim().length > 0;
  const charPercent = Math.min((text.length / 280) * 100, 100);
  const isNearLimit = text.length > 240;
  const overLimit = text.length > 280;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-start justify-center pt-16 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.97 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-xl bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-[#71767b]" />
          </button>
          <span className="text-sm font-semibold text-[#71767b]">New Post</span>
          <div className="w-8" />
        </div>

        {/* Composer */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex gap-3">
            <Avatar className="w-11 h-11 shrink-0 ring-2 ring-red-500/30">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white">
                {currentUser.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-bold mb-1">{currentUser.name}</p>
              <textarea
                ref={textareaRef}
                placeholder="What's happening in sports?"
                value={text}
                onChange={handleTextChange}
                className="w-full bg-transparent text-lg text-[#e7e9ea] placeholder:text-[#536471] resize-none outline-none min-h-[100px] max-h-[300px]"
                rows={3}
              />
            </div>
          </div>

          {/* Audience */}
          <div className="flex items-center gap-1.5 text-[#ef4444] text-xs ml-14 mb-3 cursor-pointer hover:bg-red-500/10 rounded-full px-2 py-1 w-fit transition-colors">
            <Globe className="w-3.5 h-3.5" />
            <span className="font-medium">Everyone can reply</span>
          </div>

          <div className="border-t border-white/5" />
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-0.5">
            {[Image, BarChart3, Smile, Calendar, MapPin].map((Icon, i) => (
              <button key={i} className="p-2 rounded-full text-[#ef4444] hover:bg-red-500/10 transition-colors">
                <Icon className="w-5 h-5" />
              </button>
            ))}
            <button className="p-2 rounded-full text-[#ef4444] hover:bg-red-500/10 transition-colors flex items-center gap-1">
              <Target className="w-5 h-5" />
              <span className="text-xs font-medium">Prediction</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Char counter */}
            {text.length > 0 && (
              <div className="relative w-7 h-7 flex items-center justify-center">
                <svg className="w-7 h-7 -rotate-90 absolute" viewBox="0 0 28 28">
                  <circle cx="14" cy="14" r="11" fill="none" stroke="#333" strokeWidth="2.5" />
                  <circle cx="14" cy="14" r="11" fill="none"
                    stroke={overLimit ? '#ef4444' : isNearLimit ? '#f59e0b' : '#ef4444'}
                    strokeWidth="2.5"
                    strokeDasharray={`${(charPercent / 100) * 69.1} 69.1`}
                    className="transition-all"
                  />
                </svg>
                {isNearLimit && (
                  <span className={cn("text-[10px] font-bold z-10", overLimit ? "text-[#ef4444]" : "text-[#71767b]")}>
                    {280 - text.length}
                  </span>
                )}
              </div>
            )}

            <AnimatePresence mode="wait">
              {posted ? (
                <motion.div
                  key="posted"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="h-9 px-5 rounded-full bg-green-500 text-white font-bold flex items-center gap-1.5 text-sm"
                >
                  ✓ Posted!
                </motion.div>
              ) : (
                <motion.div key="btn">
                  <Button
                    onClick={handlePost}
                    className={cn(
                      "h-9 px-5 rounded-full font-bold transition-all text-sm",
                      canPost && !overLimit
                        ? "bg-gradient-to-r from-[#dc2626] to-[#ef4444] hover:from-[#b91c1c] hover:to-[#dc2626] text-white shadow-lg shadow-red-500/30"
                        : "bg-[#ef4444]/30 text-white/40 cursor-not-allowed"
                    )}
                    disabled={!canPost || overLimit}
                  >
                    <Zap className="w-4 h-4 mr-1" /> Post
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Inline Trigger (shown on Home feed) ──────────────────────────────────────
export function PostComposer() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Inline trigger bar */}
      <div
        className="border-b border-[#ef4444]/20 px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
        onClick={() => setModalOpen(true)}
      >
        <div className="flex gap-3 items-center">
          <Avatar className="w-11 h-11 shrink-0 ring-2 ring-red-500/30">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white">
              {currentUser.name[0]}
            </AvatarFallback>
          </Avatar>
          <span className="flex-1 text-[#536471] text-lg">What's happening in sports?</span>
          <div className="bg-gradient-to-r from-[#dc2626] to-[#ef4444] text-white font-bold rounded-full px-4 py-1.5 text-sm flex items-center gap-1.5 shadow-lg shadow-red-500/20">
            <Zap className="w-3.5 h-3.5" /> Post
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && <PostModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

// ─── Exported trigger for Sidebar / MobileNav ────────────────────────────────
export function PostButton({ className, showLabel = true }: { className?: string; showLabel?: boolean }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setModalOpen(true)} className={className}>
        <Zap className="w-5 h-5 flex-shrink-0" />
        {showLabel && <span>Post</span>}
      </button>
      <AnimatePresence>
        {modalOpen && <PostModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}