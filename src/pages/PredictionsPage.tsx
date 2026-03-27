import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, TrendingUp, Plus, 
  Zap, Crown, BarChart3, BadgeCheck, ChevronRight,
  Check, X, Clock} from 'lucide-react';
import { Header } from '@/layout/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { users } from '@/lib/mockData';

// ─── Mock tipster predictions feed ────────────────────────────────────────────
const tipsterFeed = [
  {
    id: 'tp1',
    tipster: { ...users[0], accuracy: '78%', totalPreds: 320, isTipster: true },
    sport: 'Football', emoji: '⚽',
    home: 'Arsenal', away: 'Chelsea',
    pick: 'Arsenal Win', odds: '1.85',
    kickoff: 'Today 20:00', status: 'pending',
    analysis: 'Arsenal are unbeaten in 8 home games. Chelsea missing key defenders. Value is here.',
    votes: { yes: 342, no: 128 },
  },
  {
    id: 'tp2',
    tipster: { ...users[1], accuracy: '65%', totalPreds: 180, isTipster: true },
    sport: 'Basketball', emoji: '🏀',
    home: 'Lakers', away: 'Warriors',
    pick: 'Over 224.5 pts', odds: '1.90',
    kickoff: 'Today 02:30', status: 'pending',
    analysis: 'Both offenses are firing right now. Last 3 meetings averaged 238 points.',
    votes: { yes: 210, no: 89 },
  },
  {
    id: 'tp3',
    tipster: { ...users[2], accuracy: '71%', totalPreds: 250, isTipster: true },
    sport: 'Football', emoji: '⚽',
    home: 'PSG', away: 'Lyon',
    pick: 'Both Teams Score', odds: '1.70',
    kickoff: 'Tomorrow 21:00', status: 'pending',
    analysis: 'Lyon have scored in 9 of their last 10 away games. PSG leaky at back recently.',
    votes: { yes: 189, no: 67 },
  },
  {
    id: 'tp4',
    tipster: { ...users[3], accuracy: '58%', totalPreds: 95, isTipster: true },
    sport: 'Tennis', emoji: '🎾',
    home: 'Djokovic', away: 'Alcaraz',
    pick: 'Djokovic Win', odds: '2.10',
    kickoff: 'Tomorrow 14:00', status: 'pending',
    analysis: 'Djokovic has won 6 of the last 8 meetings. Clay surface suits him perfectly.',
    votes: { yes: 445, no: 302 },
  },
  {
    id: 'tp5',
    tipster: { ...users[0], accuracy: '78%', totalPreds: 320, isTipster: true },
    sport: 'Football', emoji: '⚽',
    home: 'Man City', away: 'Spurs',
    pick: 'Man City -1.5', odds: '1.75',
    kickoff: 'Saturday 17:30', status: 'pending',
    analysis: 'City at home are virtually unstoppable. Spurs away record is poor this season.',
    votes: { yes: 567, no: 145 },
  },
];

const topTipsters = [
  { user: users[0], accuracy: '78%', streak: 4,  totalPreds: 320 },
  { user: users[1], accuracy: '65%', streak: 2,  totalPreds: 180 },
  { user: users[2], accuracy: '71%', streak: 6,  totalPreds: 250 },
];

const sportFilters = [
  { id: 'all',        label: 'All',        emoji: '🏆' },
  { id: 'Football',   label: 'Football',   emoji: '⚽' },
  { id: 'Basketball', label: 'Basketball', emoji: '🏀' },
  { id: 'Tennis',     label: 'Tennis',     emoji: '🎾' },
  { id: 'Cricket',    label: 'Cricket',    emoji: '🏏' },
];

// ─── Prediction Card ──────────────────────────────────────────────────────────
function TipsterPredCard({ pred }: { pred: typeof tipsterFeed[0] }) {
  const navigate  = useNavigate();
  const [voted, setVoted] = useState<'yes' | 'no' | null>(null);
  const [votes, setVotes] = useState(pred.votes);
  const [expanded, setExpanded] = useState(false);
  const total = votes.yes + votes.no;
  const yesPct = Math.round((votes.yes / total) * 100);

  const vote = (v: 'yes' | 'no') => {
    if (voted) return;
    setVoted(v);
    setVotes(prev => ({ ...prev, [v]: prev[v] + 1 }));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden hover:border-white/15 transition-all">

      {/* Tipster header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 cursor-pointer"
        onClick={() => navigate(`/tipster/${pred.tipster.id}`)}>
        <div className="relative">
          <Avatar className="w-10 h-10 ring-2 ring-yellow-500/30">
            <AvatarImage src={pred.tipster.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-[#ef4444] text-white text-sm">{pred.tipster.name[0]}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center border border-black">
            <Crown className="w-2.5 h-2.5 text-black" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm hover:underline">{pred.tipster.name}</span>
            {pred.tipster.verified && <BadgeCheck className="w-3.5 h-3.5 text-[#ef4444] fill-[#ef4444]" />}
            <span className="text-xs bg-yellow-500/15 text-yellow-400 px-1.5 py-0.5 rounded-full font-semibold">Tipster</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#71767b]">
            <span className="text-green-400 font-semibold">{pred.tipster.accuracy} acc</span>
            <span>·</span>
            <span>{pred.tipster.totalPreds} predictions</span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-[#71767b]" />
      </div>

      {/* Match info */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{pred.emoji}</span>
            <div>
              <p className="text-xs text-[#71767b] font-medium">{pred.sport}</p>
              <p className="font-bold text-sm">{pred.home} vs {pred.away}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#71767b]">
            <Clock className="w-3 h-3" />
            <span>{pred.kickoff}</span>
          </div>
        </div>

        {/* Pick */}
        <div className="flex items-center justify-between py-2.5 px-3 bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-xl mb-3">
          <div>
            <p className="text-xs text-[#71767b]">Tipster's Pick</p>
            <p className="font-black text-[#ef4444]">{pred.pick}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#71767b]">Odds</p>
            <p className="font-black text-white">{pred.odds}</p>
          </div>
        </div>

        {/* Analysis toggle */}
        <button onClick={() => setExpanded(e => !e)}
          className="text-xs text-[#71767b] hover:text-white transition-colors mb-2 flex items-center gap-1">
          {expanded ? 'Hide' : 'Show'} analysis
          <ChevronRight className={cn('w-3 h-3 transition-transform', expanded && 'rotate-90')} />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="text-xs text-[#e7e9ea] leading-relaxed mb-3 bg-white/5 rounded-lg px-3 py-2">
              {pred.analysis}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Community vote */}
        <div className="space-y-2">
          <p className="text-xs text-[#71767b]">Community agrees? <span className="text-white font-semibold">{total} votes</span></p>
          <div className="flex gap-2">
            <button onClick={() => vote('yes')} disabled={!!voted}
              className={cn('flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-bold transition-all border',
                voted === 'yes' ? 'bg-green-500/20 border-green-500/40 text-green-400' :
                voted ? 'bg-white/5 border-white/5 text-[#71767b] cursor-not-allowed' :
                'bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20')}>
              <Check className="w-4 h-4" /> Yes · {voted ? `${yesPct}%` : votes.yes}
            </button>
            <button onClick={() => vote('no')} disabled={!!voted}
              className={cn('flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-bold transition-all border',
                voted === 'no' ? 'bg-red-500/20 border-red-500/40 text-[#ef4444]' :
                voted ? 'bg-white/5 border-white/5 text-[#71767b] cursor-not-allowed' :
                'bg-red-500/10 border-red-500/20 text-[#ef4444] hover:bg-red-500/20')}>
              <X className="w-4 h-4" /> No · {voted ? `${100 - yesPct}%` : votes.no}
            </button>
          </div>
          {voted && (
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              className="h-2 bg-white/10 rounded-full overflow-hidden flex">
              <div style={{ width: `${yesPct}%` }} className="h-full bg-green-400 rounded-l-full transition-all duration-500" />
              <div className="flex-1 bg-[#ef4444]/60 rounded-r-full" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function PredictionsPage() {
  const navigate    = useNavigate();
  const isTipster   = localStorage.getItem('arena_role') === 'tipster';
  const [filter, setFilter] = useState('all');
  const [tab,    setTab]    = useState('feed');

  const filtered = filter === 'all' ? tipsterFeed : tipsterFeed.filter(p => p.sport === filter);

  return (
    <div className="min-h-screen">
      <Header title="Predictions" settingsOptions={[
        { label: 'Show My Predictions First', type: 'toggle', defaultValue: false },
        { label: 'Show Accuracy Stats',       type: 'toggle', defaultValue: true  },
        { type: 'divider', label: '' },
        { label: 'Prediction Privacy', type: 'link', href: '/settings' },
      ]} />

      {/* Hero */}
      <div className="px-4 py-5 bg-gradient-to-br from-red-900/30 via-black to-yellow-900/20 border-b border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ef4444] to-[#dc2626] flex items-center justify-center shadow-lg shadow-red-500/30">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-black text-lg">Tipster Predictions</h2>
            <p className="text-xs text-[#71767b]">Live picks from verified tipsters</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Zap,       value: '12.5K', label: 'Active Picks'  },
            { icon: TrendingUp, value: '78%',  label: 'Top Accuracy'  },
            { icon: BarChart3, value: '2.1M',  label: 'Total Votes'   },
          ].map(s => (
            <div key={s.label} className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
              <s.icon className="w-4 h-4 mx-auto mb-1 text-[#ef4444]" />
              <p className="font-black text-white">{s.value}</p>
              <p className="text-[10px] text-[#71767b]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Tipsters */}
      <div className="px-4 py-3 border-b border-white/5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-yellow-400" />
            <h3 className="font-bold text-sm">Top Tipsters</h3>
          </div>
          <button onClick={() => navigate('/leaderboard')} className="text-xs text-[#ef4444] hover:underline">See all</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {topTipsters.map((t, i) => (
            <motion.div key={t.user.id} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              onClick={() => navigate(`/tipster/${t.user.id}`)}
              className="flex items-center gap-2.5 bg-white/5 border border-white/5 rounded-xl px-3 py-2.5 min-w-[160px] cursor-pointer hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all shrink-0">
              <div className="relative">
                <Avatar className="w-9 h-9 ring-1 ring-yellow-500/30">
                  <AvatarImage src={t.user.avatar} />
                  <AvatarFallback className="text-xs">{t.user.name[0]}</AvatarFallback>
                </Avatar>
                {i === 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center border border-black">
                    <Crown className="w-2.5 h-2.5 text-black" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs truncate">{t.user.name}</p>
                <p className="text-green-400 text-xs font-semibold">{t.accuracy}</p>
                <p className="text-[#71767b] text-[10px]">{t.streak} win streak 🔥</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {[
          { id: 'feed',   label: 'Tipster Feed' },
          { id: 'mine',   label: isTipster ? 'My Picks' : 'My Votes' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={cn('flex-1 py-3 text-sm font-semibold transition-colors relative',
              tab === t.id ? 'text-white' : 'text-[#71767b] hover:text-white')}>
            {t.label}
            {tab === t.id && <motion.div layoutId="predTab" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#ef4444] rounded-full" />}
          </button>
        ))}
      </div>

      {/* Sport filters */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto border-b border-white/5">
        {sportFilters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all',
              filter === f.id ? 'bg-[#ef4444] text-white' : 'bg-white/5 text-[#71767b] hover:bg-white/10')}>
            <span>{f.emoji}</span>{f.label}
          </button>
        ))}
      </div>

      {/* FEED TAB */}
      {tab === 'feed' && (
        <div className="p-4 space-y-4">
          <AnimatePresence>
            {filtered.map(pred => (
              <TipsterPredCard key={pred.id} pred={pred} />
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-bold">No predictions found</p>
              <p className="text-sm text-[#71767b] mt-1">Try a different sport filter</p>
            </div>
          )}
        </div>
      )}

      {/* MY PICKS / VOTES TAB */}
      {tab === 'mine' && (
        <div className="p-4">
          {isTipster ? (
            <div className="space-y-4">
              {/* Post new prediction CTA */}
              <button onClick={() => navigate(`/tipster/${users[0].id}`)}
                className="w-full flex items-center justify-between px-4 py-4 bg-gradient-to-r from-[#ef4444]/10 to-[#dc2626]/5 border border-[#ef4444]/30 rounded-2xl hover:border-[#ef4444]/60 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ef4444]/20 flex items-center justify-center">
                    <Plus className="w-5 h-5 text-[#ef4444]" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm">Post a New Prediction</p>
                    <p className="text-xs text-[#71767b]">Share your pick with your followers</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#ef4444] group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* My active predictions */}
              <p className="text-xs text-[#71767b] font-semibold uppercase tracking-wider">Your active predictions</p>
              {tipsterFeed.slice(0, 2).map(pred => (
                <TipsterPredCard key={pred.id} pred={pred} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Become tipster CTA */}
              <button onClick={() => { localStorage.setItem('arena_role', 'tipster'); window.location.reload(); }}
                className="w-full flex items-center justify-between px-4 py-4 bg-gradient-to-r from-yellow-500/10 to-yellow-400/5 border border-yellow-500/30 rounded-2xl hover:border-yellow-500/60 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <Crown className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm text-yellow-400">Become a Tipster</p>
                    <p className="text-xs text-[#71767b]">Post predictions and grow your audience</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-yellow-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Voted predictions */}
              <p className="text-xs text-[#71767b] font-semibold uppercase tracking-wider">Predictions you voted on</p>
              <div className="py-12 text-center">
                <p className="text-3xl mb-3">🗳️</p>
                <p className="font-bold text-sm">No votes yet</p>
                <p className="text-xs text-[#71767b] mt-1">Vote on predictions in the feed to see them here</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { PredictionsPage as PredictionsHub };