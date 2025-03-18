import { Handle, Position, useEdges } from '@xyflow/react';
import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { TaskParam } from '@/types/task';
import NodeParamField from './NodeParamField';
import { ColorHandle } from './common';

type Props = {
  children: React.ReactNode;
};

export default function NodeInputs({ children }: Props) {
  return <div className="flex flex-col divide-y gap- 2">{children}</div>;
}

export function NodeInput({ input, nodeId }: { input: TaskParam; nodeId: string }) {
  const edges = useEdges();
  //* This is utilized below cause when the edegs is checked and the conditions appears to be true but the but the input is not being re-rendered for changes to apply
  const isConnected = useMemo(() => {
    return edges.some((edge) => edge.targetHandle === input.name && edge.target === nodeId);
  }, [edges, nodeId, input.name]);
  // const isConnected = edges.some((edge) => nodeId && edge.targetHandle === input.name);
  return (
    <div className="flex justify-start p-3 bg-secondary w-full relative">
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={(cn('bg-primary! border-2! border-background! -left-2! w-8! h-8!'), ColorHandle[input.type])}
        />
      )}
    </div>
  );
}
