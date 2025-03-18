'use client';

import { cn } from '@/lib/utils';
import { useReactFlow } from '@xyflow/react';
import React from 'react';

type Props = {
  nodeId: string;
  children: React.ReactNode;
  isSelected: boolean;
};

export default function NodeCard({ children, nodeId, isSelected }: Props) {
  const { getNode, setCenter } = useReactFlow();
  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;
        const { position, measured } = node;
        if (!position || !measured) return;
        const { width, height } = measured;
        const { x, y } = position;
        if (x + width! / 2 === undefined || y + height! / 2 === undefined) return;
        setCenter(x, y, {
          zoom: 1,
          duration: 500,
        });
      }}
      className={cn(
        'rounded-sm cursor-pointer bg-background border-2 border-separate w-[420px] text-xs flex flex-col gap-1',
        isSelected && 'border-primary',
      )}
    >
      {children}
    </div>
  );
}
