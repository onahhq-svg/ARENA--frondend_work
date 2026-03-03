import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, ChevronUp, Clock, Send,
  Target, ChevronLeft, Shirt,
  Maximize2, Volume2, VolumeX, Pause, Play,
  Tv2, Lock
} from 'lucide-react';
import { Header } from '@/layout/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { users } from '@/lib/mockData';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Match {
  id: string;
  home: string; homeAbbr: string; homeLogo: string;
  away: string; awayAbbr: string; awayLogo: string;
  homeScore: number; awayScore: number;
  minute: string; status: 'live' | 'upcoming' | 'finished';
  time?: string;
}
interface League { id: string; name: string; country: string; flag: string; matches: Match[]; }

// ─── Mock Data ────────────────────────────────────────────────────────────────
const dates = [
  { label: 'Yesterday', short: 'YST' },
  { label: 'Today', short: 'TODAY' },
  { label: 'Tomorrow', short: 'TMR' },
  { label: 'Sat 8', short: 'SAT 8' },
  { label: 'Sun 9', short: 'SUN 9' },
];

const leagues: League[] = [
  {
    id: 'pl', name: 'Premier League', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    matches: [
      { id: 'm1', home: 'Man City', homeAbbr: 'MCI', homeLogo: '🔵', away: 'Arsenal', awayAbbr: 'ARS', awayLogo: '🔴', homeScore: 2, awayScore: 1, minute: "67'", status: 'live' },
      { id: 'm2', home: 'Liverpool', homeAbbr: 'LIV', homeLogo: '❤️', away: 'Chelsea', awayAbbr: 'CHE', awayLogo: '💙', homeScore: 1, awayScore: 1, minute: "45'", status: 'live' },
      { id: 'm3', home: 'Man United', homeAbbr: 'MUN', homeLogo: '🔴', away: 'Tottenham', awayAbbr: 'TOT', awayLogo: '⚪', homeScore: 0, awayScore: 0, minute: '15:00', status: 'upcoming', time: '15:00' },
    ]
  },
  {
    id: 'laliga', name: 'La Liga', country: 'Spain', flag: '🇪🇸',
    matches: [
      { id: 'm4', home: 'Real Madrid', homeAbbr: 'RMA', homeLogo: '🟡', away: 'Barcelona', awayAbbr: 'BAR', awayLogo: '🔵', homeScore: 3, awayScore: 2, minute: "78'", status: 'live' },
      { id: 'm5', home: 'Atletico', homeAbbr: 'ATL', homeLogo: '🔴', away: 'Sevilla', awayAbbr: 'SEV', awayLogo: '⚪', homeScore: 0, awayScore: 0, minute: '20:00', status: 'upcoming', time: '20:00' },
    ]
  },
  {
    id: 'ucl', name: 'Champions League', country: 'Europe', flag: '⭐',
    matches: [
      { id: 'm6', home: 'Bayern', homeAbbr: 'BAY', homeLogo: '🔴', away: 'PSG', awayAbbr: 'PSG', awayLogo: '🔵', homeScore: 2, awayScore: 0, minute: "52'", status: 'live' },
      { id: 'm7', home: 'Inter', homeAbbr: 'INT', homeLogo: '⚫', away: 'Dortmund', awayAbbr: 'BVB', awayLogo: '🟡', homeScore: 1, awayScore: 2, minute: "FT", status: 'finished' },
    ]
  },
  {
    id: 'bundesliga', name: 'Bundesliga', country: 'Germany', flag: '🇩🇪',
    matches: [
      { id: 'm8', home: 'Leipzig', homeAbbr: 'RBL', homeLogo: '🔴', away: 'Leverkusen', awayAbbr: 'LEV', awayLogo: '⚫', homeScore: 0, awayScore: 0, minute: '18:30', status: 'upcoming', time: '18:30' },
    ]
  },
];

const matchEvents = [
  { id: 'e1', minute: "67'", type: 'goal', team: 'home', player: 'Haaland', detail: 'Goal! Tap-in from close range', icon: '⚽' },
  { id: 'e2', minute: "61'", type: 'goal', team: 'home', player: 'De Bruyne', detail: 'Brilliant long range strike', icon: '⚽' },
  { id: 'e3', minute: "55'", type: 'yellow', team: 'away', player: 'Saliba', detail: 'Yellow Card — Tactical foul', icon: '🟨' },
  { id: 'e4', minute: "45'", type: 'info', team: null, player: '', detail: 'Half Time', icon: '⏱️' },
  { id: 'e5', minute: "38'", type: 'goal', team: 'away', player: 'Saka', detail: 'Powerful header', icon: '⚽' },
  { id: 'e6', minute: "22'", type: 'sub', team: 'home', player: 'Foden → Doku', detail: 'Substitution', icon: '🔄' },
  { id: 'e7', minute: "1'", type: 'info', team: null, player: '', detail: 'Kick Off', icon: '🏁' },
];

const liveComments = [
  { id: 'c1', user: users[0], text: "What a save!! 🧤", time: "67'", likes: 124 },
  { id: 'c2', user: users[1], text: "City are dominating this half completely", time: "65'", likes: 89 },
  { id: 'c3', user: users[2], text: "Arsenal need to get back into this quick ⏱️", time: "63'", likes: 56 },
  { id: 'c4', user: users[3], text: "GOAL!! Haaland makes it 2-0!! 🔥🔥🔥", time: "61'", likes: 342 },
];

const lineups = {
  home: ['Ederson', 'Walker', 'Dias', 'Akanji', 'Gvardiol', 'Rodri', 'De Bruyne', 'Bernardo', 'Foden', 'Doku', 'Haaland'],
  away: ['Raya', 'Ben White', 'Saliba', 'Gabriel', 'Zinchenko', 'Partey', 'Rice', 'Odegaard', 'Saka', 'Havertz', 'Martinelli'],
};

const stats = [
  { label: 'Possession', home: '58%', away: '42%', homeVal: 58 },
  { label: 'Shots', home: '8', away: '5', homeVal: 62 },
  { label: 'Shots on Target', home: '4', away: '2', homeVal: 67 },
  { label: 'Corners', home: '4', away: '2', homeVal: 67 },
  { label: 'Fouls', home: '7', away: '11', homeVal: 39 },
  { label: 'Yellow Cards', home: '1', away: '2', homeVal: 33 },
];

// ─── Video Player Shell ───────────────────────────────────────────────────────
function VideoPlayerShell({ match }: { match: Match }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [clock, setClock] = useState(67);
  const controlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Tick the clock every second when playing
  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => setClock(c => c < 90 ? c + 1 : c), 60000);
    return () => clearInterval(interval);
  }, [playing]);

  const handlePlayerClick = () => {
    setPlaying(p => !p);
    setShowControls(true);
    if (controlsTimer.current) clearTimeout(controlsTimer.current);
    controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  return (
    <div
      className="relative w-full bg-black overflow-hidden cursor-pointer select-none"
      style={{ aspectRatio: '16/9' }}
      onClick={handlePlayerClick}
      onMouseMove={() => {
        setShowControls(true);
        if (controlsTimer.current) clearTimeout(controlsTimer.current);
        controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
      }}
    >
      {/* ── Pitch background (placeholder until license is active) ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#0a1f0a] via-[#0f2d0f] to-[#0a1f0a]">
        {/* Pitch markings SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg">
          {/* Outer border */}
          <rect x="20" y="20" width="600" height="320" fill="none" stroke="#4ade80" strokeWidth="2"/>
          {/* Centre line */}
          <line x1="320" y1="20" x2="320" y2="340" stroke="#4ade80" strokeWidth="2"/>
          {/* Centre circle */}
          <circle cx="320" cy="180" r="60" fill="none" stroke="#4ade80" strokeWidth="2"/>
          <circle cx="320" cy="180" r="4" fill="#4ade80"/>
          {/* Left penalty box */}
          <rect x="20" y="100" width="100" height="160" fill="none" stroke="#4ade80" strokeWidth="2"/>
          <rect x="20" y="130" width="50" height="100" fill="none" stroke="#4ade80" strokeWidth="2"/>
          {/* Right penalty box */}
          <rect x="520" y="100" width="100" height="160" fill="none" stroke="#4ade80" strokeWidth="2"/>
          <rect x="570" y="130" width="50" height="100" fill="none" stroke="#4ade80" strokeWidth="2"/>
          {/* Goals */}
          <rect x="8" y="155" width="12" height="50" fill="none" stroke="#4ade80" strokeWidth="2"/>
          <rect x="620" y="155" width="12" height="50" fill="none" stroke="#4ade80" strokeWidth="2"/>
        </svg>

        {/* License placeholder message */}
        <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
          <div className="w-16 h-16 rounded-full bg-[#ef4444]/20 border border-[#ef4444]/40 flex items-center justify-center">
            <Tv2 className="w-8 h-8 text-[#ef4444]" />
          </div>
          <p className="text-white font-bold text-lg">Live Stream</p>
          <div className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full">
            <Lock className="w-3.5 h-3.5 text-[#71767b]" />
            <p className="text-xs text-[#71767b]">Broadcast license activation pending</p>
          </div>
          <p className="text-xs text-[#71767b] max-w-xs">
            Video stream will appear here once your broadcasting license is connected
          </p>
        </div>
      </div>

      {/* ── Live score overlay (top) ── */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 pt-2 pb-6 bg-gradient-to-b from-black/80 to-transparent z-20">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 bg-[#ef4444] text-white text-[10px] font-black px-2 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            LIVE
          </span>
          <span className="text-white text-xs font-bold">{clock}'</span>
        </div>
        {/* Score pill */}
        <div className="flex items-center gap-2 bg-black/70 backdrop-blur px-3 py-1 rounded-full border border-white/10">
          <span className="text-sm">{match.homeLogo}</span>
          <span className="text-white font-black text-sm">{match.homeScore}</span>
          <span className="text-[#71767b] text-xs">-</span>
          <span className="text-white font-black text-sm">{match.awayScore}</span>
          <span className="text-sm">{match.awayLogo}</span>
        </div>
        <div className="w-16" />
      </div>

      {/* ── Controls overlay (bottom) ── */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 left-0 right-0 px-3 pb-2 pt-8 bg-gradient-to-t from-black/90 to-transparent z-20"
          >
            {/* Progress bar */}
            <div className="w-full h-1 bg-white/20 rounded-full mb-3 relative">
              <div
                className="h-full bg-[#ef4444] rounded-full relative"
                style={{ width: `${(clock / 90) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
              </div>
            </div>
            {/* Buttons row */}
            <div className="flex items-center gap-3">
              <button
                onClick={e => { e.stopPropagation(); setPlaying(p => !p); }}
                className="w-8 h-8 flex items-center justify-center text-white hover:text-[#ef4444] transition-colors"
              >
                {playing ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>
              <button
                onClick={e => { e.stopPropagation(); setMuted(m => !m); }}
                className="w-8 h-8 flex items-center justify-center text-white hover:text-[#ef4444] transition-colors"
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <div className="flex-1" />
              <span className="text-white/60 text-xs">{clock}' / 90'</span>
              <button
                onClick={e => e.stopPropagation()}
                className="w-8 h-8 flex items-center justify-center text-white hover:text-[#ef4444] transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Centre play button */}
      <AnimatePresence>
        {!playing && showControls && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          >
            <div className="w-16 h-16 bg-black/60 border border-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Match Row ────────────────────────────────────────────────────────────────
function MatchRow({ match, onClick }: { match: Match; onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      whileTap={{ scale: 0.99 }}
      className="flex items-center px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-0"
    >
      <div className="w-12 shrink-0 text-center">
        {match.status === 'live' ? (
          <span className="text-xs font-bold text-[#ef4444] flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse inline-block" />
            {match.minute}
          </span>
        ) : match.status === 'finished' ? (
          <span className="text-xs text-[#71767b] font-medium">FT</span>
        ) : (
          <span className="text-xs text-[#71767b]">{match.time}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-base">{match.homeLogo}</span>
            <span className={cn("text-sm truncate", match.homeScore > match.awayScore && match.status !== 'upcoming' ? "font-bold text-white" : "text-[#e7e9ea]")}>
              {match.home}
            </span>
          </div>
          {match.status !== 'upcoming'
            ? <span className={cn("text-sm font-bold w-6 text-center shrink-0", match.homeScore > match.awayScore ? "text-white" : "text-[#71767b]")}>{match.homeScore}</span>
            : <span className="w-6" />}
        </div>
        <div className="flex items-center justify-between gap-2 mt-1">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-base">{match.awayLogo}</span>
            <span className={cn("text-sm truncate", match.awayScore > match.homeScore && match.status !== 'upcoming' ? "font-bold text-white" : "text-[#e7e9ea]")}>
              {match.away}
            </span>
          </div>
          {match.status !== 'upcoming'
            ? <span className={cn("text-sm font-bold w-6 text-center shrink-0", match.awayScore > match.homeScore ? "text-white" : "text-[#71767b]")}>{match.awayScore}</span>
            : <span className="w-6" />}
        </div>
      </div>
      <div className="w-8 shrink-0 flex justify-end">
        <Target className="w-4 h-4 text-[#71767b] hover:text-[#ef4444] transition-colors" />
      </div>
    </motion.div>
  );
}

// ─── League Section ───────────────────────────────────────────────────────────
function LeagueSection({ league, onMatchClick }: { league: League; onMatchClick: (m: Match, l: League) => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const liveCount = league.matches.filter(m => m.status === 'live').length;

  return (
    <div className="border-b border-white/5">
      <button onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors">
        <span className="text-lg">{league.flag}</span>
        <div className="flex-1 text-left">
          <span className="text-xs font-bold text-[#e7e9ea]">{league.name}</span>
          <span className="text-xs text-[#71767b] ml-2">{league.country}</span>
        </div>
        {liveCount > 0 && (
          <span className="text-[10px] bg-[#ef4444]/20 text-[#ef4444] px-2 py-0.5 rounded-full font-bold">
            {liveCount} LIVE
          </span>
        )}
        {collapsed ? <ChevronDown className="w-4 h-4 text-[#71767b]" /> : <ChevronUp className="w-4 h-4 text-[#71767b]" />}
      </button>
      <AnimatePresence>
        {!collapsed && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            {league.matches.map(match => (
              <MatchRow key={match.id} match={match} onClick={() => onMatchClick(match, league)} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Match Detail ─────────────────────────────────────────────────────────────
function MatchDetail({ match, league, onBack }: { match: Match; league: League; onBack: () => void }) {
  const [tab, setTab] = useState('Watch');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(liveComments);
  const matchTabs = ['Watch', 'Live Feed', 'Stats', 'Line-ups', 'H2H'];

  const sendComment = () => {
    if (!comment.trim()) return;
    setComments(prev => [{
      id: Date.now().toString(),
      user: users[0],
      text: comment,
      time: match.minute,
      likes: 0,
    }, ...prev]);
    setComment('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Score Header */}
      <div className="bg-gradient-to-b from-[#1a0505] to-black border-b border-white/10">
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <button onClick={onBack} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs text-[#71767b]">{league.flag} {league.name}</span>
          {match.status === 'live' && (
            <span className="ml-auto flex items-center gap-1 text-xs font-bold text-[#ef4444]">
              <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" /> LIVE
            </span>
          )}
        </div>
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex flex-col items-center gap-2 flex-1">
            <span className="text-4xl">{match.homeLogo}</span>
            <span className="text-sm font-bold text-center">{match.home}</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-4">
            {match.status !== 'upcoming' ? (
              <>
                <div className="text-4xl font-black tracking-tight">
                  {match.homeScore} <span className="text-[#71767b]">-</span> {match.awayScore}
                </div>
                <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full",
                  match.status === 'live' ? "bg-[#ef4444]/20 text-[#ef4444]" : "text-[#71767b]")}>
                  {match.status === 'live' ? match.minute : 'FT'}
                </span>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-[#71767b]">vs</div>
                <div className="flex items-center gap-1 text-xs text-[#71767b]">
                  <Clock className="w-3 h-3" /> {match.time}
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col items-center gap-2 flex-1">
            <span className="text-4xl">{match.awayLogo}</span>
            <span className="text-sm font-bold text-center">{match.away}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 sticky top-0 bg-black/95 backdrop-blur z-10 overflow-x-auto scrollbar-hide">
        {matchTabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn("flex-1 py-3 text-xs font-medium transition-colors relative whitespace-nowrap min-w-[64px]",
              tab === t ? "text-white" : "text-[#71767b] hover:text-white")}>
            {t === 'Watch' && <Tv2 className="w-3.5 h-3.5 inline mr-1" />}
            {t}
            {tab === t && <motion.div layoutId="matchTab" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#ef4444] rounded-full" />}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1">

        {/* ── WATCH TAB ── */}
        {tab === 'Watch' && (
          <div>
            <VideoPlayerShell match={match} />
            {/* Quick stats below player */}
            <div className="grid grid-cols-3 divide-x divide-white/5 border-b border-white/5">
              {[{ label: 'Possession', home: '58%', away: '42%' }, { label: 'Shots', home: '8', away: '5' }, { label: 'Corners', home: '4', away: '2' }].map(s => (
                <div key={s.label} className="flex flex-col items-center py-3 px-2">
                  <div className="flex justify-between w-full text-xs font-bold mb-1">
                    <span className="text-[#ef4444]">{s.home}</span>
                    <span>{s.away}</span>
                  </div>
                  <p className="text-[10px] text-[#71767b]">{s.label}</p>
                </div>
              ))}
            </div>
            {/* Latest events below player */}
            <div className="px-4 pt-3 pb-1">
              <p className="text-xs font-bold text-[#71767b] uppercase tracking-wider mb-2">Latest Events</p>
            </div>
            {matchEvents.slice(0, 3).map(event => (
              <div key={event.id} className={cn("flex items-center gap-3 px-4 py-2.5 border-b border-white/5",
                event.type === 'goal' && "bg-[#ef4444]/5")}>
                <span className="text-xs text-[#71767b] w-8 shrink-0 text-right">{event.minute}</span>
                <span className="text-lg">{event.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{event.player}</p>
                  <p className="text-xs text-[#71767b]">{event.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── LIVE FEED TAB ── */}
        {tab === 'Live Feed' && (
          <div className="flex flex-col">
            {/* Events */}
            <div className="border-b border-white/5">
              {matchEvents.map((event, i) => (
                <motion.div key={event.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className={cn("flex items-center gap-3 px-4 py-3 border-b border-white/5",
                    event.type === 'goal' && "bg-[#ef4444]/5",
                    event.type === 'info' && "justify-center bg-white/5")}>
                  {event.type === 'info' ? (
                    <span className="text-xs text-[#71767b] font-medium">{event.icon} {event.detail}</span>
                  ) : (
                    <>
                      <span className="text-xs text-[#71767b] w-8 shrink-0 text-right">{event.minute}</span>
                      <span className="text-xl">{event.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{event.player}</p>
                        <p className="text-xs text-[#71767b]">{event.detail}</p>
                      </div>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full shrink-0",
                        event.team === 'home' ? "bg-blue-500/20 text-blue-400" : "bg-red-500/20 text-red-400")}>
                        {event.team === 'home' ? match.homeAbbr : match.awayAbbr}
                      </span>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
            {/* Chat */}
            <div className="px-4 pt-3 pb-1">
              <p className="text-xs font-bold text-[#71767b] uppercase tracking-wider">Live Chat</p>
            </div>
            <div className="divide-y divide-white/5">
              {comments.map((c, i) => (
                <motion.div key={c.id} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="flex items-start gap-3 px-4 py-3">
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarImage src={c.user.avatar} />
                    <AvatarFallback className="bg-[#ef4444]/20 text-[#ef4444] text-xs">{c.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">{c.user.name}</span>
                      <span className="text-xs text-[#71767b]">{c.time}</span>
                    </div>
                    <p className="text-sm mt-0.5">{c.text}</p>
                  </div>
                  <span className="text-xs text-[#71767b] shrink-0">❤️ {c.likes}</span>
                </motion.div>
              ))}
            </div>
            {/* Comment Input */}
            <div className="sticky bottom-0 bg-black/95 border-t border-white/10 px-4 py-3 flex items-center gap-3">
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarImage src={users[0].avatar} />
                <AvatarFallback className="bg-[#ef4444]/20 text-[#ef4444] text-xs">{users[0].name[0]}</AvatarFallback>
              </Avatar>
              <input
                value={comment}
                onChange={e => setComment(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendComment()}
                placeholder="Comment on this match..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-[#71767b] outline-none focus:border-[#ef4444]/50"
              />
              <button onClick={sendComment} className="w-8 h-8 bg-[#ef4444] rounded-full flex items-center justify-center shrink-0 hover:bg-[#dc2626] transition-colors">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* ── STATS TAB ── */}
        {tab === 'Stats' && (
          <div className="p-4 space-y-4">
            <div className="flex justify-between text-xs font-bold text-[#71767b] px-2">
              <span>{match.home}</span><span>{match.away}</span>
            </div>
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-bold">{stat.home}</span>
                  <span className="text-xs text-[#71767b]">{stat.label}</span>
                  <span className="font-bold">{stat.away}</span>
                </div>
                <div className="flex gap-1 h-1.5 rounded-full overflow-hidden bg-white/5">
                  <div className="bg-[#ef4444] rounded-full" style={{ width: `${stat.homeVal}%` }} />
                  <div className="bg-white/30 rounded-full flex-1" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── LINE-UPS TAB ── */}
        {tab === 'Line-ups' && (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-[#71767b] mb-3 flex items-center gap-1"><Shirt className="w-3 h-3" /> {match.home}</p>
                {lineups.home.map((p, i) => (
                  <div key={p} className="flex items-center gap-2 py-2 border-b border-white/5">
                    <span className="text-xs text-[#71767b] w-5">{i + 1}</span>
                    <span className="text-sm">{p}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-[#71767b] mb-3 flex items-center gap-1"><Shirt className="w-3 h-3" /> {match.away}</p>
                {lineups.away.map((p, i) => (
                  <div key={p} className="flex items-center gap-2 py-2 border-b border-white/5">
                    <span className="text-xs text-[#71767b] w-5">{i + 1}</span>
                    <span className="text-sm">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── H2H TAB ── */}
        {tab === 'H2H' && (
          <div className="p-4">
            <p className="text-xs font-bold text-[#71767b] uppercase tracking-wider mb-3">Last 5 Meetings</p>
            {[
              { date: 'Feb 2024', home: 'Man City', away: 'Arsenal', score: '3-1' },
              { date: 'Sep 2023', home: 'Arsenal', away: 'Man City', score: '1-0' },
              { date: 'Apr 2023', home: 'Man City', away: 'Arsenal', score: '4-1' },
              { date: 'Jan 2023', home: 'Arsenal', away: 'Man City', score: '1-3' },
              { date: 'Aug 2022', home: 'Man City', away: 'Arsenal', score: '0-2' },
            ].map((h, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 text-sm">
                <span className="text-xs text-[#71767b] w-16">{h.date}</span>
                <span className="flex-1 text-right">{h.home}</span>
                <span className="font-bold px-3 text-[#ef4444]">{h.score}</span>
                <span className="flex-1">{h.away}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Live Page ───────────────────────────────────────────────────────────
export function LivePage() {
  const [activeDate, setActiveDate] = useState('Today');
  const [selectedMatch, setSelectedMatch] = useState<{ match: Match; league: League } | null>(null);
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming' | 'finished'>('all');

  const totalLive = leagues.reduce((acc, l) => acc + l.matches.filter(m => m.status === 'live').length, 0);

  const filteredLeagues = leagues.map(league => ({
    ...league,
    matches: filter === 'all' ? league.matches : league.matches.filter(m => m.status === filter),
  })).filter(l => l.matches.length > 0);

  if (selectedMatch) {
    return <MatchDetail match={selectedMatch.match} league={selectedMatch.league} onBack={() => setSelectedMatch(null)} />;
  }

  return (
    <div className="min-h-screen">
      <Header title="Live" />

      {/* Live bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#ef4444]/10 border-b border-[#ef4444]/20">
        <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
        <span className="text-xs font-bold text-[#ef4444]">{totalLive} matches live now</span>
        <span className="text-xs text-[#71767b] ml-auto">Tap a match to watch</span>
      </div>

      {/* Date Selector */}
      <div className="flex border-b border-white/10 overflow-x-auto scrollbar-hide">
        {dates.map(d => (
          <button key={d.label} onClick={() => setActiveDate(d.label)}
            className={cn("px-4 py-3 text-xs font-bold whitespace-nowrap transition-colors relative shrink-0 flex-1",
              activeDate === d.label ? "text-white" : "text-[#71767b] hover:text-white")}>
            {d.short}
            {activeDate === d.label && <motion.div layoutId="dateTab" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#ef4444] rounded-full" />}
          </button>
        ))}
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide border-b border-white/5">
        {(['all', 'live', 'upcoming', 'finished'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn("px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 capitalize",
              filter === f
                ? f === 'live' ? "bg-[#ef4444] text-white" : "bg-white text-black"
                : "bg-white/5 text-[#71767b] hover:bg-white/10")}>
            {f === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-white inline-block mr-1.5 animate-pulse" />}
            {f === 'all' ? 'All Matches' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Leagues */}
      <div>
        {filteredLeagues.map(league => (
          <LeagueSection key={league.id} league={league} onMatchClick={(m, l) => setSelectedMatch({ match: m, league: l })} />
        ))}
      </div>
    </div>
  );
}