'use client';
import TooltipWrapper from '@/components/custom/TooltipWrapper';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import SaveBtn from './SaveBtn';

type Props = {
  title: string;
  subtitle: string;
  workflowId: string;
};

export default function TopBar({ title, subtitle, workflowId }: Props) {
  const router = useRouter();
  return (
    <header className=" flex p-2 border-b-2 border-separate w-full sticky h-[60px] top-0 bg-background z-10 justify-between">
      <div className="flex gap-1 flex-1">
        <TooltipWrapper content="Back">
          <Button
            variant={'ghost'}
            size={'icon'}
            onClick={() => {
              router.back();
            }}
          >
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subtitle && <p className="text-xs text-muted-foreground truncate text-ellipsis">{subtitle}</p>}
        </div>
      </div>
      <div className="flex gap-1 flex-1 justify-end">
        <SaveBtn workflowId={workflowId} />
      </div>
    </header>
  );
}
