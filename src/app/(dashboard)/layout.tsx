import BreadcrumbHeader from '@/components/custom/BreadcrumbHeader';
import { ModeToggle } from '@/components/custom/ModeToggle';
import DesktopSidebar, { MobileSidebar } from '@/components/custom/Sidebar';
import { Separator } from '@/components/ui/separator';
import { SignedIn, UserButton } from '@clerk/nextjs';
import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen ">
      <DesktopSidebar />
      <div className="flex-1 flex-col flex min-h-screen ">
        <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
          <BreadcrumbHeader />
          <div className="gap-1 flex items-center">
            <ModeToggle />
            <UserButton />
          </div>
        </header>
        <Separator />
        <div className="overflow-auto ">
          <div className="flex-1 container py-4 text-accent-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
}
export default Layout;
