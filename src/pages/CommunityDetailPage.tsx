import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Globe, Lock, Users, Bell, BellOff, Pin, Image, MoreHorizontal, Heart, MessageCircle, Repeat2, Share } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { users, currentUser } from '@/lib/mockData';

const allCommunities = [
  { id: '1', name: 'Premier League Fans',  members: '124K', category: 'Football',    privacy: 'public',  emoji: '⚽', joined: false },
  { id: '2', name: 'NBA Talk',             members: '98K',  category: 'Basketball',  privacy: 'public',  emoji: '🏀', joined: true  },
  { id: '3', name: 'Champions League',     members: '210K', category: 'Football',    privacy: 'public',  emoji: '🏆', joined: false },
  { id: '4', name: 'Fantasy Football HQ',  members: '55K',  category: 'Fantasy',     privacy: 'private', emoji: '🎯', joined: true  },
  { id: '5', name: 'Tennis World',         members: '34K',  category: 'Tennis',      privacy: 'public',  emoji: '🎾', joined: false },
  { id: '6', name: 'Prediction Masters',   members: '18K',  category: 'Predictions', privacy: 'private', emoji: '🔮', joined: false },
];

const communityPosts = [
  { id: 'cp1', user: users[0], content: "What a game last night! The atmosphere was electric ⚡", timestamp: '2m',  likes: 234, replies: 18, retweets: 45, liked: false, pinned: true  },
  { id: 'cp2', user: users[1], content: "Match prediction thread 🧵 Who's taking the title this season?", timestamp: '15m', likes: 892, replies: 67, retweets: 123, liked: true, pinned: false },
  { id: 'cp3', user: users[2], content: "Just watched the highlights again for the 5th time... that goal was RIDICULOUS 🤯", timestamp: '1h', likes: 156, replies: 24, retweets: 31, liked: false, pinned: false },
  { id: 'cp4', user: users[3], content: "Transfer window heating up 🔥 Big deal happening before Thursday. Thoughts?", timestamp: '2h', likes: 445, replies: 89, retweets: 78, liked: false, pinned: false },
];

const tabs = ['Posts', 'Media', 'Members', 'Rules'];
const members = users.map((u, i) => ({ ...u, role: i === 0 ? 'Admin' : i === 1 ? 'Moderator' : 'Member' }));

export function CommunityDetailPage() {
  const navigate         = useNavigate();
  const { communityId }  = useParams();

  const community = allCommunities.find(c => c.id === communityId) || allCommunities[0];

  const [activeTab,  setActiveTab]  = useState('Posts');
  const [joined,     setJoined]     = useState(community.joined);
  const [notified,   setNotified]   = useState(false);
  const [postText,   setPostText]   = useState('');
  const [feedPosts,  setFeedPosts]  = useState(communityPosts);

  const submitPost = () => {
    if (!postText.trim()) return;
    setFeedPosts(prev => [{
      id: `cp${Date.now()}`, user: currentUser, content: postText,
      timestamp: 'now', likes: 0, replies: 0, retweets: 0, liked: false, pinned: false,
    }, ...prev]);
    setPostText('');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-white/10 flex items-center gap-3 px-4 py-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-2xl">{community.emoji}</span>
        <div className="flex-1 min-w-0">
          <h1 className="font-bold truncate">{community.name}</h1>
          <p className="text-xs text-[#71767b]">{community.members} members</p>
        </div>
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <MoreHorizontal className="w-5 h-5 text-[#71767b]" />
        </button>
      </div>

      {/* Banner */}
      <div className="h-28 bg-gradient-to-br from-[#ef4444]/30 via-[#dc2626]/20 to-black relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-20">{community.emoji}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Info */}
      <div className="px-4 pb-4 border-b border-white/10">
        <div className="flex items-start justify-between -mt-6 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ef4444]/30 to-[#dc2626]/20 border-2 border-black flex items-center justify-center text-3xl">
            {community.emoji}
          </div>
          <div className="flex items-center gap-2 mt-6">
            {joined && (
              <button onClick={() => setNotified(n => !n)}
                className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                {notified ? <Bell className="w-4 h-4 text-[#ef4444]" /> : <BellOff className="w-4 h-4 text-[#71767b]" />}
              </button>
            )}
            <button onClick={() => setJoined(j => !j)}
              className={cn('px-5 py-2 rounded-full text-sm font-bold transition-all',
                joined ? 'border border-white/20 text-white hover:border-red-500/50 hover:text-[#ef4444]'
                       : 'bg-gradient-to-r from-[#dc2626] to-[#ef4444] text-white shadow-lg shadow-red-500/20')}>
              {joined ? 'Joined' : 'Join'}
            </button>
          </div>
        </div>
        <h2 className="font-black text-lg">{community.name}</h2>
        <div className="flex items-center gap-3 text-xs text-[#71767b] mt-1">
          <span className="flex items-center gap-1">
            {community.privacy === 'private' ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
            {community.privacy === 'private' ? 'Private' : 'Public'} · {community.category}
          </span>
          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{community.members} members</span>
        </div>
        <div className="flex items-center gap-1 mt-3">
          <div className="flex -space-x-2">
            {members.slice(0, 4).map(m => (
              <Avatar key={m.id} className="w-6 h-6 border-2 border-black cursor-pointer" onClick={() => navigate(`/user/${m.id}`)}>
                <AvatarImage src={m.avatar} />
                <AvatarFallback className="text-xs">{m.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <p className="text-xs text-[#71767b] ml-2">Including {members[0].name} and {members[1].name}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 sticky top-[57px] bg-black z-30">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={cn('flex-1 py-3 text-sm font-medium transition-colors relative',
              activeTab === tab ? 'text-white' : 'text-[#71767b] hover:text-white')}>
            {tab}
            {activeTab === tab && <motion.div layoutId="commDetailTab" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#ef4444] rounded-full" />}
          </button>
        ))}
      </div>

      {/* POSTS */}
      {activeTab === 'Posts' && (
        <div>
          {joined && (
            <div className="px-4 py-3 border-b border-white/10 flex items-start gap-3">
              <Avatar className="w-9 h-9 shrink-0">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback className="bg-[#ef4444]/20 text-[#ef4444]">{currentUser.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <input value={postText} onChange={e => setPostText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && submitPost()}
                  placeholder={`Post in ${community.name}...`}
                  className="w-full bg-transparent text-white placeholder:text-[#555] text-sm outline-none py-1.5" />
                <div className="flex items-center justify-between mt-2">
                  <button className="p-1.5 rounded-full hover:bg-white/10"><Image className="w-4 h-4 text-[#71767b]" /></button>
                  <motion.button whileTap={{ scale: 0.95 }} onClick={submitPost} disabled={!postText.trim()}
                    className={cn('px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                      postText.trim() ? 'bg-gradient-to-r from-[#dc2626] to-[#ef4444] text-white' : 'bg-white/10 text-[#555] cursor-not-allowed')}>
                    Post
                  </motion.button>
                </div>
              </div>
            </div>
          )}
          <AnimatePresence>
            {feedPosts.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="px-4 py-3 border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer"
                onClick={() => navigate(`/post/${post.id}`)}>
                {post.pinned && (
                  <div className="flex items-center gap-1 text-xs text-[#71767b] mb-2 ml-11">
                    <Pin className="w-3 h-3" /> Pinned post
                  </div>
                )}
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10 shrink-0 cursor-pointer" onClick={e => { e.stopPropagation(); navigate(`/user/${post.user.id}`); }}>
                    <AvatarImage src={post.user.avatar} />
                    <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <button onClick={e => { e.stopPropagation(); navigate(`/user/${post.user.id}`); }} className="font-bold text-sm hover:underline">{post.user.name}</button>
                      <span className="text-[#71767b] text-xs">{post.user.handle} · {post.timestamp}</span>
                      <button onClick={e => e.stopPropagation()} className="ml-auto p-1 rounded-full hover:bg-white/10">
                        <MoreHorizontal className="w-3.5 h-3.5 text-[#71767b]" />
                      </button>
                    </div>
                    <p className="text-sm text-[#e7e9ea] mb-2 whitespace-pre-line">{post.content}</p>
                    <div className="flex items-center gap-5 text-[#71767b]">
                      <button onClick={e => { e.stopPropagation(); navigate(`/post/${post.id}`); }} className="flex items-center gap-1 text-xs hover:text-[#ef4444] transition-colors">
                        <MessageCircle className="w-4 h-4" /><span>{post.replies}</span>
                      </button>
                      <button onClick={e => e.stopPropagation()} className="flex items-center gap-1 text-xs hover:text-green-400 transition-colors">
                        <Repeat2 className="w-4 h-4" /><span>{post.retweets}</span>
                      </button>
                      <button onClick={e => { e.stopPropagation(); setFeedPosts(prev => prev.map(p => p.id === post.id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes-1 : p.likes+1 } : p)); }}
                        className={cn('flex items-center gap-1 text-xs transition-colors', post.liked ? 'text-[#ef4444]' : 'hover:text-[#ef4444]')}>
                        <Heart className={cn('w-4 h-4', post.liked && 'fill-current')} /><span>{post.likes}</span>
                      </button>
                      <button onClick={e => e.stopPropagation()} className="hover:text-[#ef4444] transition-colors">
                        <Share className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* MEMBERS */}
      {activeTab === 'Members' && (
        <div className="divide-y divide-white/5">
          {members.map((member, i) => (
            <motion.div key={member.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
              onClick={() => navigate(`/user/${member.id}`)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer">
              <Avatar className="w-10 h-10">
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{member.name}</p>
                <p className="text-xs text-[#71767b]">{member.handle}</p>
              </div>
              <span className={cn('text-xs px-2 py-0.5 rounded-full font-semibold',
                member.role === 'Admin' ? 'bg-[#ef4444]/20 text-[#ef4444]' :
                member.role === 'Moderator' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-[#71767b]')}>
                {member.role}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* MEDIA */}
      {activeTab === 'Media' && (
        <div className="p-4 grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="aspect-square bg-white/5 rounded-lg flex items-center justify-center">
              <Image className="w-6 h-6 text-white/20" />
            </div>
          ))}
        </div>
      )}

      {/* RULES */}
      {activeTab === 'Rules' && (
        <div className="p-4 space-y-3">
          {[
            { n: 1, title: 'Be respectful',           desc: 'Treat all members with respect. No harassment or hate speech.' },
            { n: 2, title: 'Stay on topic',            desc: "Keep posts relevant to sports and this community's focus." },
            { n: 3, title: 'No spam',                  desc: 'No promotional content or repetitive posts.' },
            { n: 4, title: 'Verified sources only',    desc: 'When sharing news or stats, link to credible sources.' },
            { n: 5, title: 'No spoilers without warning', desc: 'Tag spoilers clearly out of respect for other fans.' },
          ].map(rule => (
            <div key={rule.n} className="flex gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="w-7 h-7 rounded-full bg-[#ef4444]/20 text-[#ef4444] text-xs font-black flex items-center justify-center shrink-0">{rule.n}</div>
              <div>
                <p className="font-bold text-sm mb-0.5">{rule.title}</p>
                <p className="text-xs text-[#71767b]">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}