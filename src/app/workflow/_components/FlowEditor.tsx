'use client';
import { createFlowNode } from '@/lib/workflow/createFlowNode';
import { TaskType } from '@/types/task';
import { Workflow } from '@prisma/client';
import {
  addEdge,
  Background,
  BackgroundVariant,
  ColorMode,
  Connection,
  Controls,
  Edge,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React, { useCallback, useEffect } from 'react';
import NodeComponent from './nodes/NodeComponent';
import { AppNode } from '@/types/appNode';
import DeletableEdges from './edges/DeletableEdges';
import { toast } from 'sonner';
import { TaskRegistry } from '@/lib/workflow/task/registry';

const nodeTypes = {
  ScrapeCraftNode: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdges,
};

const snapGrid: [number, number] = [20, 20];
const fitViewOptions = { padding: 1 };
function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  // const [colorMode, setColorMode] = React.useState<ColorMode>('dark');

  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

  // const onChangeColorMode: React.ChangeEventHandler<HTMLInputElement> = (event) => {
  //   setColorMode(event.target.value as ColorMode);
  // };
  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;

      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (error) {}
  }, [workflow.definition, setEdges, setNodes, setViewport]);

  const onDragOver = useCallback((ev: React.DragEvent) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (ev: React.DragEvent) => {
      ev.preventDefault();
      const taskType = ev.dataTransfer.getData('application/reactflow');
      if (typeof taskType === undefined || !taskType) return;
      const position = screenToFlowPosition({
        x: ev.clientX,
        y: ev.clientY,
      });

      const newNode = createFlowNode(taskType as TaskType, position);
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, screenToFlowPosition],
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
      if (!connection.targetHandle) return;

      // setNodes((nodes) =>
      //   nodes.map((node) => {
      //     if (node.id === connection.target) {
      //       return {
      //         ...node,
      //         data: {
      //           ...node.data,
      //           inputs: {
      //             ...node.data.inputs,
      //             [connection.targetHandle as string]: '',
      //           },
      //         },
      //       };
      //     }
      //     return node;
      //   }),
      // );
      const node = nodes.find((nds) => nds.id === connection.target);
      if (!node) return;
      const nodeInputs = node.data.inputs;
      if (nodeInputs[connection.targetHandle] === '') return; //  This checks if the update is already done
      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: '',
        },
      });
    },
    [nodes, updateNodeData, setEdges],
  );

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      //This should stop self-connections
      if (connection.source === connection.target) {
        return false;
      }
      // same TaskParam connections returns **TRUE**
      const source = nodes.find((node) => node.id === connection.source);
      const target = nodes.find((node) => node.id === connection.target);
      if (!source || !target) {
        toast.warning('Invalid connection: source or target node not found');
        console.error('Invalid connection: source or target node not found');
        return false;
      }
      const sourceType = TaskRegistry[source.data.type];
      const targetType = TaskRegistry[target.data.type];

      const output = sourceType.outputs.find((o) => o.name === connection.sourceHandle);
      const input = targetType.inputs.find((i) => i.name === connection.targetHandle);

      if (input?.type !== output?.type) {
        console.error('Invalid Connection: Type Mismatch');
        return false;
      }
      return true;
    },
    [nodes],
  );
  console.log('@NODES', nodes);

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid={true}
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
        isValidConnection={isValidConnection}
        // colorMode={colorMode}
        onConnect={onConnect}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <MiniMap position="top-right" bgColor="#1f2937" />
        <Background variant={BackgroundVariant.Dots} bgColor="#00000" gap={16} size={1} />
      </ReactFlow>
    </main>
  );
}

export default FlowEditor;
