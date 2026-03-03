import { useState } from 'react';
import { Header } from '@/layout/Header';
import { LiveScoreTicker } from '@/sections/LiveScoreTicker';
import { FeedPosts } from '@/sections/FeedPosts';

export function HomePage() {
  const [activeTab, setActiveTab] = useState('For You');

  return (
    <div>
      <Header 
        tabs={['For You', 'Following']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {/* Live Scores Section */}
      <LiveScoreTicker />
      
      {/* Feed Posts */}
      <FeedPosts />
    </div>
  );
}
