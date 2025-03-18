import Logo from '@/components/custom/Logo';
import React, { ReactNode } from 'react';

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen items-center gap-4 justify-center   ">
      <Logo />
      {children}
    </div>
  );
}

export default layout;
