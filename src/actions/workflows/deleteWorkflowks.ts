'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function Deleteworkflow(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  await prisma.workflow.delete({
    where: {
      id,
      userId,
    },
  });

  //   if (!deleteById) {
  //     throw new Error('Workflow does not exists');
  //   }
  //   return { deleteWorkflow: deleteById };
  revalidatePath('/workflows');
}
