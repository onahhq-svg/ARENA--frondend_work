import { useState } from 'react';
import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { RightSidebar } from './RightSidebar';
import { MobileNav } from './MobileNav';

interface MainLayoutProps {
  children: ReactNode;
  onAuthRequired?: () => void;
  isGuest?: boolean;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarW = sidebarOpen ? 240 : 72;

  return (
    <div className="flex bg-black min-h-screen overflow-x-hidden">

      {/* Left Sidebar — desktop only */}
      <aside
        className="hidden md:flex flex-col fixed left-0 top-0 h-screen z-30 transition-all duration-200"
        style={{ width: sidebarW }}
      >
        <Sidebar onExpandChange={setSidebarOpen} />
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-x-hidden transition-all duration-200 pb-16 md:pb-0 lg:mr-[350px]">
        <style>{`@media (min-width: 768px) { .main-content { margin-left: ${sidebarW}px; } }`}</style>
        <div className="main-content">
          {children}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="hidden lg:block w-[350px] fixed right-0 top-0 h-screen border-l border-[#2f3336] z-30">
        <RightSidebar />
      </aside>

      {/* Mobile Nav */}
      <MobileNav />
    </div>
  );
}





