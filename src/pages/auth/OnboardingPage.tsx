import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap } from 'lucide-react';

const slides = [
  {
    emoji: '⚡',
    title: 'Play Smart,\nPlay Safe',
    desc: 'Follow verified tipsters, join trusted communities and make informed decisions every time.',
    bg: 'from-[#ef4444]/20 via-black to-black',
  },
  {
    emoji: '🎯',
    title: 'Clarity Wins\nEvery Time',
    desc: 'Track prediction history, monitor tipster accuracy and play with confidence backed by data.',
    bg: 'from-[#f97316]/20 via-black to-black',
  },
];

interface OnboardingPageProps {
  onFinish: () => void;
}

export function OnboardingPage({ onFinish }: OnboardingPageProps) {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < slides.length - 1) setIndex(i => i + 1);
    else onFinish();
  };

  const slide = slides[index];

  return (
    <div className={`min-h-screen bg-gradient-to-b ${slide.bg} text-white flex flex-col`}>
      {/* Skip */}
      <div className="flex justify-end px-6 pt-6">
        <button onClick={onFinish} className="text-sm text-white/50 hover:text-white transition-colors">
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div key={index}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-6">
            <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-5xl backdrop-blur">
              {slide.emoji}
            </div>
            <h1 className="text-3xl font-black leading-tight whitespace-pre-line">
              {slide.title}
            </h1>
            <p className="text-[#71767b] text-base leading-relaxed max-w-xs">
              {slide.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className="px-6 pb-10 space-y-6">
        {/* Dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <motion.div key={i} animate={{ width: i === index ? 24 : 8 }}
              className={`h-2 rounded-full transition-colors ${i === index ? 'bg-[#ef4444]' : 'bg-white/20'}`} />
          ))}
        </div>

        {/* Next / Start */}
        <motion.button whileTap={{ scale: 0.97 }} onClick={next}
          className="w-full py-4 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-2xl font-black text-white text-base flex items-center justify-center gap-2 shadow-lg shadow-red-500/30">
          {index < slides.length - 1 ? (
            <><span>Next</span><ChevronRight className="w-5 h-5" /></>
          ) : (
            <><Zap className="w-5 h-5 fill-white" /><span>Start Your Game</span></>
          )}
        </motion.button>
      </div>
    </div>
  );
}