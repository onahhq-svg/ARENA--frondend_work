import { useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { RightSidebar } from './RightSidebar';
import { MobileNav } from './MobileNav';

interface MainLayoutProps {
  children: ReactNode;
}

// Pages that should NOT show the right sidebar
const NO_RIGHT_SIDEBAR = ['/explore', '/messages', '/notifications'];

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const sidebarW = sidebarOpen ? 240 : 72;
  const showRightSidebar = !NO_RIGHT_SIDEBAR.includes(location.pathname);

  return (
    <div className="flex bg-black min-h-screen overflow-x-hidden">

      {/* Left Sidebar — desktop only */}
      <aside
        className="hidden md:flex flex-col fixed left-0 top-0 h-screen z-30"
        style={{ width: sidebarW, transition: 'width 0.2s ease' }}>
        <Sidebar onExpandChange={setSidebarOpen} />
      </aside>

      {/* Main content — constrained width so right sidebar never overlaps */}
      <main
        className="flex-1 min-w-0 overflow-x-hidden pb-20 md:pb-0"
        style={{
          marginLeft: typeof window !== 'undefined' && window.innerWidth >= 768 ? sidebarW : 0,
          marginRight: showRightSidebar ? 350 : 0,
          transition: 'margin 0.2s ease',
          maxWidth: showRightSidebar
            ? `calc(100vw - ${sidebarW}px - 350px)`
            : `calc(100vw - ${sidebarW}px)`,
        }}>
        <style>{`
          @media (max-width: 1023px) {
            main { margin-right: 0 !important; max-width: calc(100vw - ${sidebarW}px) !important; }
          }
          @media (max-width: 767px) {
            main { margin-left: 0 !important; max-width: 100vw !important; }
          }
        `}</style>
        {children}
      </main>

      {/* Right Sidebar — desktop only, hidden on explore/messages/notifications */}
      {showRightSidebar && (
        <aside className="hidden lg:block w-[350px] fixed right-0 top-0 h-screen border-l border-[#2f3336] z-30">
          <RightSidebar />
        </aside>
      )}

      {/* Mobile Nav */}
      <MobileNav />
    </div>
  );
}