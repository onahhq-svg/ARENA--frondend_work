import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Repeat2, UserPlus, AtSign, Target, MoreHorizontal, BadgeCheck } from 'lucide-react';
import { Header } from '@/layout/Header';
import { notifications } from '@/lib/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const notificationIcons = { like: Heart, retweet: Repeat2, follow: UserPlus, mention: AtSign, prediction: Target };
const notificationColors = {
  like: 'text-[#f91880] bg-[#f91880]/10', retweet: 'text-[#00ba7c] bg-[#00ba7c]/10',
  follow: 'text-[#1d9bf0] bg-[#1d9bf0]/10', mention: 'text-[#ef4444] bg-[#ef4444]/10',
  prediction: 'text-[#8b5cf6] bg-[#8b5cf6]/10',
};

export function NotificationsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [read, setRead] = useState<Set<string>>(new Set());

  const filtered = notifications.filter(n => {
    if (activeTab === 'Mentions') return n.type === 'mention';
    if (activeTab === 'Verified') return n.user.verified;
    return true;
  });

  const handleTap = (notification: typeof notifications[0]) => {
    setRead(prev => new Set([...prev, notification.id]));
    if (notification.type === 'follow') {
      navigate(`/user/${notification.user.id}`);
    } else if (notification.post) {
      navigate(`/post/${notification.post.id}`);
    } else {
      navigate(`/user/${notification.user.id}`);
    }
  };

  return (
    <div>
      <Header title="Notifications" tabs={['All', 'Verified', 'Mentions']}
        activeTab={activeTab} onTabChange={setActiveTab}
        settingsOptions={[
          { label: 'Match Alerts', type: 'toggle', defaultValue: true },
          { label: 'Prediction Results', type: 'toggle', defaultValue: true },
          { label: 'Mentions', type: 'toggle', defaultValue: true },
          { label: 'New Followers', type: 'toggle', defaultValue: false },
          { type: 'divider', label: '' },
          { label: 'All Notification Settings', type: 'link', href: '/settings' },
        ]}
      />
      <div>
        {filtered.map((notification, index) => {
          const Icon = notificationIcons[notification.type];
          const colorClass = notificationColors[notification.type];
          const isRead = read.has(notification.id) || notification.read;
          return (
            <motion.div key={notification.id} onClick={() => handleTap(notification)}
              className={cn("flex gap-3 px-4 py-4 border-b border-[#2f3336] hover:bg-white/[0.03] cursor-pointer transition-colors",
                !isRead && "bg-[#ef4444]/5 border-l-2 border-l-[#ef4444]/30")}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", colorClass)}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Avatar className="w-8 h-8 cursor-pointer" onClick={e => { e.stopPropagation(); navigate(`/user/${notification.user.id}`); }}>
                      <AvatarImage src={notification.user.avatar} />
                      <AvatarFallback className="text-xs">{notification.user.name[0]}</AvatarFallback>
                    </Avatar>
                    {notification.user.verified && <BadgeCheck className="w-4 h-4 text-[#ef4444] fill-[#ef4444]" />}
                  </div>
                  <button onClick={e => e.stopPropagation()} className="p-1 rounded-full hover:bg-white/10 transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-[#71767b]" />
                  </button>
                </div>
                <p className="text-sm text-[#e7e9ea] leading-snug">
                  <button onClick={e => { e.stopPropagation(); navigate(`/user/${notification.user.id}`); }} className="font-bold hover:underline">
                    {notification.user.name}
                  </button>
                  {' '}{notification.content}
                </p>
                {notification.post && (
                  <p className="mt-1.5 text-[#71767b] text-xs line-clamp-2 bg-white/5 rounded-lg px-2 py-1.5">
                    {notification.post.content}
                  </p>
                )}
                <p className="mt-1.5 text-[#71767b] text-xs">{notification.timestamp}</p>
                {notification.type === 'follow' && (
                  <button onClick={e => { e.stopPropagation(); navigate(`/user/${notification.user.id}`); }}
                    className="mt-2 px-4 py-1.5 bg-white text-black text-xs font-bold rounded-full hover:bg-white/90 transition-colors">
                    Follow back
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
