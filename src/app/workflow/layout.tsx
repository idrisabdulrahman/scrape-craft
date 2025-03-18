import BacktoWorkflow from '@/components/custom/BacktoWorkflow';
import Logo from '@/components/custom/Logo';
import { ModeToggle } from '@/components/custom/ModeToggle';
import { Separator } from '@/components/ui/separator';
import React from 'react';

type Props = {};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col w-full 
  h-screen"
    >
      {children}
      <Separator />
      <footer className="flex items-center justify-between p-2">
        <Logo iconSize={16} fontSize="text-xl" />

        <ModeToggle />
      </footer>
    </div>
  );
}
