import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Link as LinkIcon, MapPin, BadgeCheck, Mail, Trophy, Target, Flame, TrendingUp, Settings, ChevronRight, Crown } from 'lucide-react';
import { currentUser, posts } from '@/lib/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/PostCard';
import { EditProfileModal } from '@/components/EditProfileModal';
import { cn } from '@/lib/utils';

const tabs = ['Posts', 'Replies', 'Media', 'Likes', 'Sports', 'Predictions'];

const userStats = [
  { label: 'Predictions', value: '47', icon: Target },
  { label: 'Accuracy', value: '78%', icon: Trophy },
  { label: 'Streak', value: '5', icon: Flame },
];

export function ProfilePage() {
  const navigate = useNavigate();
  const isTipster = localStorage.getItem('arena_role') === 'tipster';
  const [activeTab, setActiveTab] = useState('Posts');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [, setProfileData] = useState({ name: currentUser.name, bio: currentUser.bio, location: currentUser.location, website: currentUser.website });
  const settingsRef = useRef<HTMLDivElement>(null);
  const userPosts = posts.filter(post => post.user.id === currentUser.id);

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-[#ef4444]/20">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <motion.button 
              className="p-2 -ml-2 rounded-full hover:bg-red-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <div>
              <h1 className="text-xl font-bold">{currentUser.name}</h1>
              <p className="text-[#71767b] text-sm">{posts.length} posts</p>
            </div>
          </div>

          {/* Profile Settings Gear */}
          <div className="relative" ref={settingsRef}>
            <motion.button
              className={`p-2 rounded-full transition-colors ${settingsOpen ? 'bg-red-500/20 text-[#ef4444]' : 'hover:bg-red-500/10 text-[#e7e9ea]'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSettingsOpen(!settingsOpen)}
            >
              <Settings className="w-5 h-5" />
            </motion.button>

            <AnimatePresence>
              {settingsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-72 bg-[#16181c] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="font-bold text-sm">Profile Preferences</p>
                    <p className="text-xs text-[#71767b]">Manage your profile settings</p>
                  </div>
                  <div className="py-2">
                    {[
                      { label: 'Show Prediction Stats', desc: 'Display accuracy on your profile', toggle: true },
                      { label: 'Show Follower Count', desc: 'Make followers visible publicly', toggle: true },
                      { label: 'Allow Direct Messages', desc: 'Let anyone message you', toggle: false },
                      { label: 'Private Account', desc: 'Only followers see your posts', toggle: false },
                    ].map(item => (
                      <div key={item.label} className="flex items-center justify-between px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors">
                        <div>
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-[#71767b]">{item.desc}</p>
                        </div>
                        <div className={`w-10 h-5 rounded-full relative flex-shrink-0 ${item.toggle ? 'bg-[#ef4444]' : 'bg-white/20'}`}>
                          <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.toggle ? 'translate-x-5' : 'translate-x-0.5'}`} />
                        </div>
                      </div>
                    ))}
                    <div className="my-2 border-t border-white/5" />
                    <a href="/settings" className="flex items-center justify-between px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors">
                      <p className="text-sm font-medium">Full Account Settings</p>
                      <ChevronRight className="w-4 h-4 text-[#71767b]" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-br from-[#ef4444] via-[#dc2626] to-[#b91c1c] relative">
        {currentUser.coverImage && (
          <img 
            src={currentUser.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover mix-blend-overlay opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4 border-b border-[#2f3336]">
        {/* Avatar & Actions */}
        <div className="flex justify-between items-start -mt-16 mb-4">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
          >
            <Avatar className="w-32 h-32 border-4 border-black ring-2 ring-red-500/50">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="text-4xl bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white">
                {currentUser.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#ef4444] rounded-full flex items-center justify-center">
              <BadgeCheck className="w-4 h-4 text-white" />
            </div>
          </motion.div>
          <div className="flex gap-2 mt-20">
            <Button 
              variant="outline" 
              size="icon"
              className="rounded-full border-[#ef4444]/50 hover:bg-red-500/10 hover:text-[#ef4444]"
            >
              <Mail className="w-4 h-4" />
            </Button>
            <Button className="rounded-full bg-gradient-to-r from-[#dc2626] to-[#ef4444] hover:from-[#b91c1c] hover:to-[#dc2626] text-white font-bold"
              onClick={() => setEditProfileOpen(true)}>
              Edit profile
            </Button>
            {isTipster && (
              <Button
                onClick={() => navigate(`/tipster/${currentUser.id}`)}
                className="rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold hover:from-yellow-400 hover:to-yellow-300 flex items-center gap-1.5">
                <Crown className="w-4 h-4" /> Tipster Page
              </Button>
            )}
          </div>
        </div>

        {/* Name & Handle */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{currentUser.name}</h2>
            <BadgeCheck className="w-5 h-5 text-[#ef4444] fill-[#ef4444]" />
            {isTipster && (
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <Crown className="w-3 h-3" /> Tipster
              </span>
            )}
          </div>
          <p className="text-[#71767b]">{currentUser.handle}</p>
        </div>

        {/* Become Tipster CTA — only for regular users */}
        {!isTipster && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              localStorage.setItem('arena_role', 'tipster');
              window.location.reload();
            }}
            className="w-full mb-4 flex items-center justify-between px-4 py-3 bg-gradient-to-r from-yellow-500/10 to-yellow-400/5 border border-yellow-500/30 rounded-xl hover:border-yellow-500/60 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Crown className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-yellow-400">Become a Tipster</p>
                <p className="text-xs text-[#71767b]">Share predictions, grow an audience, earn</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-yellow-400 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        )}

        {/* Bio */}
        <p className="text-[#e7e9ea] mb-4">{currentUser.bio}</p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-[#71767b] text-sm mb-4">
          {currentUser.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{currentUser.location}</span>
            </div>
          )}
          {currentUser.website && (
            <div className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4" />
              <a href="#" className="text-[#ef4444] hover:underline">{currentUser.website}</a>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Joined {currentUser.joinedDate}</span>
          </div>
        </div>

        {/* Following/Followers */}
        <div className="flex gap-4 mb-4">
          <button className="hover:underline">
            <span className="font-bold text-[#e7e9ea]">{currentUser.following}</span>
            <span className="text-[#71767b]"> Following</span>
          </button>
          <button className="hover:underline">
            <span className="font-bold text-[#e7e9ea]">{currentUser.followers}</span>
            <span className="text-[#71767b]"> Followers</span>
          </button>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-3 gap-2">
          {userStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass-card p-2 text-center border-red-500/20">
                <Icon className="w-4 h-4 text-[#ef4444] mx-auto mb-1" />
                <p className="font-bold text-[#ef4444]">{stat.value}</p>
                <p className="text-[10px] text-[#71767b]">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2f3336] overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={cn(
              "flex-1 min-w-[80px] py-4 text-center font-medium transition-colors relative whitespace-nowrap",
              activeTab === tab ? "text-[#e7e9ea]" : "text-[#71767b] hover:text-[#e7e9ea]"
            )}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-gradient-to-r from-[#ef4444] to-[#dc2626] rounded-full"
                layoutId="profileTab"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-[#ef4444]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">You haven&apos;t posted yet</h3>
            <p className="text-[#71767b]">When you post, it will show up here.</p>
          </div>
        )}
      </div>
      <EditProfileModal
        open={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        onSave={(data) => setProfileData(prev => ({ ...prev, ...data }))}
      />
    </div>
  );
}