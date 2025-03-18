import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import React from 'react';
import Editor from '../../_components/Editor';

type Props = {};

async function page({ params }: { params: { workflowId: string } }) {
  const { workflowId } = await params;
  const { userId } = await auth();

  if (!userId) return <div>Unauthenticated</div>;
  if (!workflowId) return notFound();

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) {
    return <div>Workflow not found</div>;
  }
  return <Editor workflow={workflow} />;
}
export default page;
