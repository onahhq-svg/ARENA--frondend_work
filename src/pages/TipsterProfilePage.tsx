import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, BadgeCheck, Bell, BellOff, Crown, Target, Trophy,
  TrendingUp, Flame, Calendar, Star, Filter, ChevronRight, Lock
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { users } from '@/lib/mockData';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const activePredictions = [
  { id: 'a1', sport: 'Football', emoji: '⚽', home: 'Arsenal',  away: 'Chelsea',  pick: 'Arsenal Win',    odds: '1.85', kickoff: 'Today 20:00',  status: 'pending' },
  { id: 'a2', sport: 'Basketball', emoji: '🏀', home: 'Lakers', away: 'Warriors', pick: 'Over 224.5 pts', odds: '1.90', kickoff: 'Today 02:30',  status: 'pending' },
  { id: 'a3', sport: 'Football', emoji: '⚽', home: 'PSG',      away: 'Lyon',     pick: 'Both Teams Score', odds: '1.70', kickoff: 'Tomorrow 21:00', status: 'pending' },
];

const predictionHistory = [
  { id: 'h1', sport: '⚽', match: 'Man City vs Arsenal',    pick: 'Man City Win',   score: '3-1', result: 'WIN',  odds: '1.65' },
  { id: 'h2', sport: '🏀', match: 'Celtics vs Heat',        pick: 'Celtics -5.5',  score: '112-98', result: 'WIN',  odds: '1.91' },
  { id: 'h3', sport: '⚽', match: 'Barcelona vs Real Madrid', pick: 'Over 2.5',    score: '1-2', result: 'WIN',  odds: '1.55' },
  { id: 'h4', sport: '⚽', match: 'Liverpool vs Spurs',      pick: 'Liverpool Win', score: '1-1', result: 'LOSS', odds: '1.72' },
  { id: 'h5', sport: '🎾', match: 'Djokovic vs Alcaraz',     pick: 'Djokovic Win',  score: '2-3', result: 'LOSS', odds: '1.80' },
  { id: 'h6', sport: '⚽', match: 'Inter vs Juventus',       pick: 'Both Score',    score: '2-1', result: 'WIN',  odds: '1.68' },
  { id: 'h7', sport: '🏀', match: 'Nuggets vs Suns',         pick: 'Under 230.5',   score: '108-104', result: 'WIN',  odds: '1.88' },
  { id: 'h8', sport: '⚽', match: 'Bayern vs Dortmund',      pick: 'Bayern Win',    score: '0-1', result: 'LOSS', odds: '1.60' },
];

const sportAccuracy = [
  { sport: 'Football',   emoji: '⚽', pct: 71, wins: 48, total: 67 },
  { sport: 'Basketball', emoji: '🏀', pct: 65, wins: 26, total: 40 },
  { sport: 'Tennis',     emoji: '🎾', pct: 58, wins: 14, total: 24 },
  { sport: 'Cricket',    emoji: '🏏', pct: 62, wins: 8,  total: 13 },
];

const last10 = ['W','W','L','W','W','W','L','W','L','W'];

// ─── Page ─────────────────────────────────────────────────────────────────────
export function TipsterProfilePage() {
  const navigate       = useNavigate();
  const { tipsterId }  = useParams();
  const user           = users.find(u => u.id === tipsterId) || users[0];

  const [tab,        setTab]        = useState('Overview');
  const [following,  setFollowing]  = useState(false);
  const [notified,   setNotified]   = useState(false);
  const [filterSport, setFilterSport] = useState('All');

  const tabs       = ['Overview', 'Active', 'History', 'Analytics'];
  const sportFilters = ['All', '⚽', '🏀', '🎾', '🏏'];

  const filteredHistory = filterSport === 'All'
    ? predictionHistory
    : predictionHistory.filter(p => p.sport === filterSport);

  const wins   = predictionHistory.filter(p => p.result === 'WIN').length;
  const total  = predictionHistory.length;
  const acc    = Math.round((wins / total) * 100);

  return (
    <div className="min-h-screen bg-black">

      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-white/10 flex items-center gap-3 px-4 py-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <Crown className="w-4 h-4 text-yellow-400" />
        <div className="flex-1 min-w-0">
          <h1 className="font-bold truncate">{user.name}</h1>
          <p className="text-xs text-[#71767b]">Tipster · {acc}% accuracy</p>
        </div>
      </div>

      {/* ── Cover ── */}
      <div className="h-32 bg-gradient-to-br from-yellow-500/20 via-[#ef4444]/20 to-black relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 text-8xl">🏆</div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* ── Header card ── */}
      <div className="px-4 -mt-12 pb-4 border-b border-white/10">
        <div className="flex items-end justify-between mb-3">
          <div className="relative">
            <Avatar className="w-20 h-20 border-4 border-black ring-2 ring-yellow-500/40">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-[#ef4444] text-white text-2xl">{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-black">
              <Crown className="w-3 h-3 text-black" />
            </div>
          </div>
          <div className="flex items-center gap-2 pb-1">
            {following && (
              <button onClick={() => setNotified(n => !n)}
                className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                {notified ? <Bell className="w-4 h-4 text-[#ef4444]" /> : <BellOff className="w-4 h-4 text-[#71767b]" />}
              </button>
            )}
            <button onClick={() => setFollowing(f => !f)}
              className={cn('px-5 py-2 rounded-full text-sm font-bold transition-all',
                following
                  ? 'border border-white/20 text-white hover:border-red-500/50 hover:text-[#ef4444]'
                  : 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-black shadow-lg shadow-yellow-500/20')}>
              {following ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-0.5">
          <h2 className="font-black text-xl">{user.name}</h2>
          {user.verified && <BadgeCheck className="w-5 h-5 text-[#ef4444] fill-[#ef4444]" />}
          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
            <Crown className="w-3 h-3" /> Tipster
          </span>
        </div>
        <p className="text-[#71767b] text-sm mb-2">{user.handle}</p>
        <p className="text-[#e7e9ea] text-sm mb-3 leading-relaxed">
          Professional football and basketball predictions. 3+ years of consistent returns. 
          Specialising in value bets and over/unders. 🎯
        </p>
        <div className="flex items-center gap-1 text-xs text-[#71767b] mb-4">
          <Calendar className="w-3.5 h-3.5" /><span>Joined March 2024</span>
          <span className="mx-2">·</span>
          <span><strong className="text-white">12.4K</strong> followers</span>
          <span className="mx-2">·</span>
          <span><strong className="text-white">320</strong> predictions</span>
        </div>

        {/* VIP subscribe */}
        <button className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-yellow-500/10 to-yellow-400/5 border border-yellow-500/30 rounded-xl hover:border-yellow-500/60 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Lock className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-yellow-400">Subscribe to VIP Picks</p>
              <p className="text-xs text-[#71767b]">Get exclusive predictions · From $9.99/mo</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-yellow-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* ── Tabs ── */}
      <div className="flex border-b border-white/10 sticky top-[57px] bg-black z-30">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn('flex-1 py-3 text-xs font-semibold transition-colors relative',
              tab === t ? 'text-white' : 'text-[#71767b] hover:text-white')}>
            {t}
            {tab === t && <motion.div layoutId="tipsterTab" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-yellow-400 rounded-full" />}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {tab === 'Overview' && (
        <div className="p-4 space-y-4">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Total Predictions', value: '320',    icon: Target,    color: 'text-blue-400',   bg: 'bg-blue-500/10'   },
              { label: 'Accuracy',           value: `${acc}%`, icon: Trophy,   color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
              { label: 'Win Streak',         value: '4',      icon: Flame,     color: 'text-[#ef4444]',  bg: 'bg-red-500/10'    },
              { label: 'Avg Odds',           value: '1.74',   icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/10'  },
            ].map(stat => (
              <div key={stat.label} className={cn('p-4 rounded-xl border border-white/5', stat.bg)}>
                <stat.icon className={cn('w-5 h-5 mb-2', stat.color)} />
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-xs text-[#71767b] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Win/Loss bar */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-sm">Overall Record</p>
              <span className="text-xs text-[#71767b]">{wins}W – {total - wins}L</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
              <motion.div initial={{ width: 0 }} animate={{ width: `${acc}%` }} transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-l-full" />
              <div className="flex-1 bg-[#ef4444]/40 rounded-r-full" />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-xs text-green-400">{acc}% Win Rate</span>
              <span className="text-xs text-[#ef4444]">{100-acc}% Loss Rate</span>
            </div>
          </div>

          {/* Last 10 results */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <p className="font-bold text-sm mb-3">Last 10 Results</p>
            <div className="flex items-center gap-1.5">
              {last10.map((r, i) => (
                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }}
                  className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black',
                    r === 'W' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-[#ef4444] border border-red-500/30')}>
                  {r}
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-[#71767b] mt-2">{last10.filter(r => r==='W').length}/10 wins in last 10 predictions</p>
          </div>
        </div>
      )}

      {/* ── ACTIVE PREDICTIONS TAB ── */}
      {tab === 'Active' && (
        <div className="p-4 space-y-3">
          <p className="text-xs text-[#71767b] font-semibold uppercase tracking-wider mb-2">
            {activePredictions.length} active predictions
          </p>
          <AnimatePresence>
            {activePredictions.map((pred, i) => (
              <motion.div key={pred.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{pred.emoji}</span>
                    <div>
                      <p className="text-xs text-[#71767b] font-medium">{pred.sport}</p>
                      <p className="font-bold text-sm">{pred.home} vs {pred.away}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full font-semibold">PENDING</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div>
                    <p className="text-xs text-[#71767b]">Pick</p>
                    <p className="text-sm font-bold text-[#ef4444]">{pred.pick}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#71767b]">Odds</p>
                    <p className="text-sm font-bold text-white">{pred.odds}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#71767b]">Kickoff</p>
                    <p className="text-xs font-semibold text-white">{pred.kickoff}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ── HISTORY TAB ── */}
      {tab === 'History' && (
        <div>
          {/* Sport filter */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 overflow-x-auto no-scrollbar">
            <Filter className="w-4 h-4 text-[#71767b] shrink-0" />
            {sportFilters.map(f => (
              <button key={f} onClick={() => setFilterSport(f)}
                className={cn('px-3 py-1.5 rounded-full text-sm font-semibold shrink-0 transition-all',
                  filterSport === f ? 'bg-[#ef4444] text-white' : 'bg-white/5 text-[#71767b] hover:bg-white/10')}>
                {f}
              </button>
            ))}
          </div>

          <div className="divide-y divide-white/5">
            <AnimatePresence>
              {filteredHistory.map((pred, i) => (
                <motion.div key={pred.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors">
                  <span className="text-xl shrink-0">{pred.sport}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{pred.match}</p>
                    <p className="text-xs text-[#71767b]">Pick: <span className="text-white">{pred.pick}</span></p>
                    <p className="text-xs text-[#71767b]">Score: {pred.score} · Odds: {pred.odds}</p>
                  </div>
                  <div className={cn('px-3 py-1.5 rounded-full text-xs font-black shrink-0',
                    pred.result === 'WIN'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-red-500/20 text-[#ef4444] border border-red-500/30')}>
                    {pred.result === 'WIN' ? '✓ WIN' : '✗ LOSS'}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* ── ANALYTICS TAB ── */}
      {tab === 'Analytics' && (
        <div className="p-4 space-y-4">
          {/* By sport */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <p className="font-bold text-sm mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" /> Accuracy by Sport
            </p>
            <div className="space-y-3">
              {sportAccuracy.map(s => (
                <div key={s.sport}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm flex items-center gap-1.5">{s.emoji} {s.sport}</span>
                    <span className="text-sm font-bold">{s.pct}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${s.pct}%` }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className={cn('h-full rounded-full', s.pct >= 70 ? 'bg-green-400' : s.pct >= 60 ? 'bg-yellow-400' : 'bg-[#ef4444]')} />
                  </div>
                  <p className="text-xs text-[#71767b] mt-0.5">{s.wins}W / {s.total - s.wins}L</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trend chart — simple visual */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <p className="font-bold text-sm mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" /> Last 30 Predictions
            </p>
            <div className="flex items-end gap-1 h-20">
              {[1,1,0,1,1,1,0,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,0,1,1,1,0,1,1,1].map((isWin, i) => {
                const height = isWin ? 60 + ((i * 13) % 40) : 20 + ((i * 9) % 30);
                return (
                  <motion.div key={i}
                    initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: i * 0.02 }}
                    style={{ height: `${height}%`, originY: 1 }}
                    className={cn('flex-1 rounded-t-sm', isWin ? 'bg-green-500/60' : 'bg-[#ef4444]/60')} />
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-[#71767b]">
              <span>30 predictions ago</span><span>Now</span>
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" />Wins</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#ef4444] inline-block" />Losses</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}