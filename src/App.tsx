import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {MainLayout} from '@/layout/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { ExplorePage } from '@/pages/ExplorePage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { MessagesPage } from '@/pages/MessagesPage';
import { SportsPage } from '@/pages/SportsPage';
import { PredictionsHub as PredictionsPage } from '@/pages/PredictionsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { LivePage } from '@/pages/LivePage';
import { CommunitiesPage } from '@/pages/CommunitiesPage';
import { BookmarksPage } from '@/pages/BookmarksPage';
import { AuthFlow } from '@/pages/AuthPages';
import { GuestBanner } from '@/components/GuestBanner';
import { PostDetailPage } from '@/pages/PostDetailPage';
import { UserProfileView } from '@/pages/UserProfileView';
import { CommunityDetailPage } from '@/pages/CommunityDetailPage';
import { WalletPage } from './pages/WalletPage';
import { TipsterProfilePage } from './pages/TipsterProfilePage';

function App() {
  const [authed, setAuthed] = useState<boolean>(() => {
    return localStorage.getItem('arena_authed') === 'true';
  });
  const [showAuth, setShowAuth] = useState(false);
  const isTipster = localStorage.getItem('arena_role') === 'tipster';

  const handleAuthComplete = () => {
    localStorage.setItem('arena_authed', 'true');
    setAuthed(true);
    setShowAuth(false);
  };

  if (showAuth) {
    return <AuthFlow onComplete={handleAuthComplete} />;
  }

  return (
    <MainLayout>
      {!authed && <GuestBanner onSignIn={() => setShowAuth(true)} />}
      <Routes>
        {/* Main pages */}
        <Route path="/"                     element={<HomePage />} />
        <Route path="/live"                 element={<LivePage />} />
        <Route path="/explore"              element={<ExplorePage />} />
        <Route path="/communities"          element={<CommunitiesPage />} />
        <Route path="/sports"               element={<SportsPage />} />
        <Route path="/sports/:sport"        element={<SportsPage />} />
        <Route path="/predictions"          element={<PredictionsPage />} />
        <Route path="/leaderboard"          element={<LeaderboardPage />} />
        <Route path="/messages"             element={<MessagesPage />} />
        <Route path="/notifications"        element={<NotificationsPage />} />
        <Route path="/profile"              element={<ProfilePage />} />
        <Route path="/wallet"               element={<WalletPage />} />
        <Route path="/bookmarks"            element={<BookmarksPage />} />
        <Route path="/settings"             element={<SettingsPage />} />

        {/* Sub pages — accessible from anywhere */}
        <Route path="/post/:postId"               element={<PostDetailPage />} />
        <Route path="/user/:userId"               element={<UserProfileView />} />
        <Route path="/community/:communityId"     element={<CommunityDetailPage />} />
        {/* Tipster profile — only accessible if account type is tipster */}
        {isTipster && (
          <Route path="/tipster/:tipsterId" element={<TipsterProfilePage />} />
        )}
      </Routes>
    </MainLayout>
  );
}

export default App;
