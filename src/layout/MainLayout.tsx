import { useState } from 'react';
import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { RightSidebar } from './RightSidebar';
import { MobileNav } from './MobileNav';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black overflow-x-hidden">
      {/* Left Sidebar */}
      <aside
        className="hidden md:flex flex-col fixed left-0 top-0 h-screen z-30 transition-all duration-200 ease-in-out"
        style={{ width: sidebarOpen ? 240 : 72 }}
      >
        <Sidebar onExpandChange={setSidebarOpen} />
      </aside>

      {/* Main Content - shifts with sidebar */}
      <main
        className="flex-1 w-full min-w-0 min-h-screen pb-20 md:pb-0 overflow-x-hidden transition-all duration-200 ease-in-out lg:mr-[350px]"
        style={{ marginLeft: sidebarOpen ? 240 : 72 }}
      >
        {children}
      </main>

      {/* Right Sidebar */}
      <aside className="hidden lg:block w-[350px] fixed right-0 top-0 h-screen border-l border-[#2f3336] z-30">
        <RightSidebar />
      </aside>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}