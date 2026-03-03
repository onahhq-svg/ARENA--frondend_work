import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Repeat2, UserPlus, AtSign, Target, MoreHorizontal, BadgeCheck } from 'lucide-react';
import { Header } from '@/layout/Header';
import { notifications } from '@/lib/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const notificationIcons = {
  like: Heart,
  retweet: Repeat2,
  follow: UserPlus,
  mention: AtSign,
  prediction: Target,
};

const notificationColors = {
  like: 'text-[#f91880] bg-[#f91880]/10',
  retweet: 'text-[#00ba7c] bg-[#00ba7c]/10',
  follow: 'text-[#1d9bf0] bg-[#1d9bf0]/10',
  mention: 'text-[#1d9bf0] bg-[#1d9bf0]/10',
  prediction: 'text-[#8b5cf6] bg-[#8b5cf6]/10',
};

export function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div>
      <Header 
        title="Notifications"
        tabs={['All', 'Verified', 'Mentions']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        settingsOptions={[
          { label: "Match Alerts", description: "Notify when matches go live", type: "toggle", defaultValue: true },
          { label: "Prediction Results", description: "Notify when predictions settle", type: "toggle", defaultValue: true },
          { label: "Mentions", description: "Notify when someone mentions you", type: "toggle", defaultValue: true },
          { label: "New Followers", description: "Notify when someone follows you", type: "toggle", defaultValue: false },
          { type: "divider", label: "" },
          { label: "All Notification Settings", type: "link", href: "/settings" },
        ]}
      />

      <div>
        {notifications.map((notification, index) => {
          const Icon = notificationIcons[notification.type];
          const colorClass = notificationColors[notification.type];

          return (
            <motion.div 
              key={notification.id}
              className={cn(
                "flex gap-3 px-4 py-4 border-b border-[#2f3336] hover:bg-white/[0.02] cursor-pointer transition-colors",
                !notification.read && "bg-[#1d9bf0]/5"
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Icon */}
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", colorClass)}>
                <Icon className="w-5 h-5" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={notification.user.avatar} />
                      <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                    </Avatar>
                    {notification.user.verified && (
                      <BadgeCheck className="w-4 h-4 text-[#1d9bf0] fill-[#1d9bf0]" />
                    )}
                  </div>
                  <button className="p-1 rounded-full hover:bg-white/10 transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-[#71767b]" />
                  </button>
                </div>

                <p className="mt-2 text-[#e7e9ea]">
                  <span className="font-bold">{notification.user.name}</span>
                  {' '}{notification.content}
                </p>

                {notification.post && (
                  <p className="mt-2 text-[#71767b] text-sm line-clamp-2">
                    {notification.post.content}
                  </p>
                )}

                <p className="mt-2 text-[#71767b] text-sm">{notification.timestamp}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}