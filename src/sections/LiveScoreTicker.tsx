import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const liveMatches = [
  { id: 'm1', homeLogo: '🔵', homeAbbr: 'MCI', homeScore: 2, awayLogo: '🔴', awayAbbr: 'ARS', awayScore: 1, minute: "67'" },
  { id: 'm4', homeLogo: '🟡', homeAbbr: 'RMA', homeScore: 3, awayLogo: '🔵', awayAbbr: 'BAR', awayScore: 2, minute: "78'" },
  { id: 'm2', homeLogo: '❤️', homeAbbr: 'LIV', homeScore: 1, awayLogo: '💙', awayAbbr: 'CHE', awayScore: 1, minute: "45'" },
  { id: 'm6', homeLogo: '🔴', homeAbbr: 'BAY', homeScore: 2, awayLogo: '🔵', awayAbbr: 'PSG', awayScore: 0, minute: "52'" },
  { id: 'm8', homeLogo: '💜', homeAbbr: 'LAL', homeScore: 98, awayLogo: '💙', awayAbbr: 'GSW', awayScore: 102, minute: "Q3" },
];

export function LiveScoreTicker() {
  const navigate = useNavigate();

  return (
    <div className="border-b border-white/5 bg-black">
      {/* Header row */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
          <span className="text-xs font-bold text-[#ef4444]">Live Matches</span>
          <span className="text-xs text-[#71767b]">{liveMatches.length} games</span>
        </div>
        <button onClick={() => navigate('/live')} className="text-xs text-[#ef4444] font-semibold hover:underline">
          See all
        </button>
      </div>

      {/* Score cards — horizontal format: logo abbr · score:score · abbr logo */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
        {liveMatches.map((match, i) => (
          <motion.button key={match.id}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            onClick={() => navigate('/live')}
            className="flex items-center gap-1.5 bg-white/[0.04] border border-white/8 rounded-xl px-3 py-2 hover:bg-white/[0.08] hover:border-[#ef4444]/30 transition-all shrink-0 active:scale-95">

            {/* Home */}
            <span className="text-base leading-none">{match.homeLogo}</span>
            <span className="text-xs font-bold text-[#e7e9ea]">{match.homeAbbr}</span>

            {/* Score */}
            <div className="flex items-center gap-0.5 mx-1">
              <span className="text-xs font-black text-white">{match.homeScore}</span>
              <span className="text-[10px] text-[#71767b] mx-0.5">:</span>
              <span className="text-xs font-black text-white">{match.awayScore}</span>
            </div>

            {/* Away */}
            <span className="text-xs font-bold text-[#e7e9ea]">{match.awayAbbr}</span>
            <span className="text-base leading-none">{match.awayLogo}</span>

            {/* Live minute */}
            <div className="flex items-center gap-0.5 ml-1.5 bg-[#ef4444]/15 rounded-full px-1.5 py-0.5">
              <span className="w-1 h-1 rounded-full bg-[#ef4444] animate-pulse" />
              <span className="text-[9px] text-[#ef4444] font-bold">{match.minute}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}