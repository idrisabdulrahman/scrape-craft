import { NodeProps } from '@xyflow/react';
import { memo } from 'react';
import NodeCard from './NodeCard';
import NodeHeader from './NodeHeader';
import { AppNode } from '@/types/appNode';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import NodeInputs, { NodeInput } from './nodeInputs';
import { TaskParam, TaskType } from '@/types/task';
import NodeOutputs, { NodeOutput } from './NodeOutputs';

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNode;
  const task = nodeData.type ? TaskRegistry[nodeData.type as keyof typeof TaskRegistry] : null;
  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      {nodeData.type && <NodeHeader taskType={nodeData.type as TaskType} />}{' '}
      <NodeInputs>
        {task?.inputs.map((input: TaskParam) => (
          <NodeInput key={input.name} input={input} nodeId={props.id} />
        ))}
      </NodeInputs>
      <NodeOutputs>
        {task?.outputs.map((output: TaskParam) => (
          <NodeOutput key={output.name} output={output} />
        ))}
      </NodeOutputs>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = 'NodeComponent';
