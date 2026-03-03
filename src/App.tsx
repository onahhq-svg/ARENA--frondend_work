import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layout/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { ExplorePage } from '@/pages/ExplorePage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { MessagesPage } from '@/pages/MessagesPage';
import { SportsPage } from '@/pages/SportsPage';
import { PredictionsPage } from '@/pages/PredictionsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { LivePage } from '@/pages/LivePage';
import { CommunitiesPage } from '@/pages/CommunitiesPage';
import { WalletPage } from '@/pages/WalletPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/sports/:sport" element={<SportsPage />} />
        <Route path="/predictions" element={<PredictionsPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
