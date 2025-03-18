'use client';

import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath, useReactFlow } from '@xyflow/react';
import React from 'react';
import { Button } from '@/components/ui/button';

function DeletableEdges(props: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);
  const { setEdges } = useReactFlow();

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={props.markerEnd} markerStart={props.markerStart} style={props.style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: ` translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          <Button
            variant={'outline'}
            size={'icon'}
            className="w-5 h-5 border cursor-pointer rounded-full text-xs leading-none hover:bg-red-700 hover:text-white text-center"
            onClick={() => {
              setEdges((edges) => edges.filter((edge) => edge.id !== props.id));
            }}
          >
            x
          </Button>{' '}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default DeletableEdges;
