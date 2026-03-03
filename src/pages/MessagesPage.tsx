import { motion } from 'framer-motion';
import { Search, Settings, MailPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { conversations } from '@/lib/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function MessagesPage() {
  return (
    <div className="h-[calc(100vh-80px)] md:h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2f3336]">
        <h1 className="text-xl font-bold">Messages</h1>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <MailPlus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-[#2f3336]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71767b]" />
          <Input 
            placeholder="Search Direct Messages"
            className="w-full h-11 pl-12 bg-[#16181c] border-none rounded-full text-[#e7e9ea] placeholder:text-[#71767b] focus:ring-2 focus:ring-[#1d9bf0]"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#16181c] flex items-center justify-center mb-4">
              <MailPlus className="w-8 h-8 text-[#71767b]" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Welcome to your inbox!</h2>
            <p className="text-[#71767b] mb-6">
              Drop a line, share posts and more with private conversations between you and others on SportX.
            </p>
            <Button className="bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white font-bold rounded-full px-6">
              Write a message
            </Button>
          </div>
        ) : (
          <div>
            {conversations.map((conversation, index) => (
              <motion.div 
                key={conversation.id}
                className="flex items-center gap-3 px-4 py-4 hover:bg-white/[0.02] cursor-pointer transition-colors border-b border-[#2f3336]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage src={conversation.user.avatar} />
                  <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#e7e9ea]">{conversation.user.name}</span>
                    <span className="text-[#71767b]">{conversation.user.handle}</span>
                    <span className="text-[#71767b]">·</span>
                    <span className="text-[#71767b] text-sm">{conversation.timestamp}</span>
                  </div>
                  <p className={cn(
                    "text-sm truncate",
                    conversation.unread > 0 ? "text-[#e7e9ea] font-medium" : "text-[#71767b]"
                  )}>
                    {conversation.lastMessage}
                  </p>
                </div>

                {conversation.unread > 0 && (
                  <span className="w-5 h-5 bg-[#1d9bf0] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {conversation.unread}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
