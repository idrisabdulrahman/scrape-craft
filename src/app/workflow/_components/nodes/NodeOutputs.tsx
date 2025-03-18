import { cn } from '@/lib/utils';
import { TaskParam } from '@/types/task';
import { Handle, Position } from '@xyflow/react';
import React from 'react';
import { ColorHandle } from './common';

type Props = {
  children: React.ReactNode;
};
export default function NodeOutputs({ children }: Props) {
  return <div className="flex flex-col divide-y gap- 2">{children}</div>;
}

export function NodeOutput({ output }: { output: TaskParam }) {
  return (
    <div className="flex justify-start p-3 bg-secondary w-full relative ">
      <p className="text-xs text-muted-foreground">{output.name}</p>
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={(cn('bg-primary! border-2! border-background! -right-2! w-4! h-4!'), ColorHandle[output.type])}
      />
    </div>
  );
}
