'use server';

import prisma from '@/lib/prisma';
import { createFlowNode } from '@/lib/workflow/createFlowNode';
import { createWorkFlowSchema, createWorkFlowSchemaType } from '@/schema/workflow';
import { AppNode } from '@/types/appNode';
import { TaskType } from '@/types/task';
import { WorkFlowStatus } from '@/types/workflow';
import { auth } from '@clerk/nextjs/server';
import { Edge } from '@xyflow/react';
import { redirect } from 'next/navigation';

export async function CreateWorkFlow(form: createWorkFlowSchemaType) {
  const { success, data } = createWorkFlowSchema.safeParse(form);
  if (!success) {
    throw new Error('Invalid form data');
  }
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };

  initialFlow.nodes.push(createFlowNode(TaskType.LAUNCH_BROWSER));
  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkFlowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      ...data,
    },
  });
  if (!result) {
    throw new Error('failed to create workflow');
  }
  return { success: true, workflowId: result.id };

  //* I removed the redirect() from the Server Action and i returned the workflow ID instead ,because of Race condition. server finishes first before the client
  //   redirect(`/workflow/editor/${result.id}`);
}
