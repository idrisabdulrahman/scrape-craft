import { GetWorkFlowForUser } from '@/actions/workflows/getWorkflowsforUser';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, InboxIcon } from 'lucide-react';
import React, { Suspense } from 'react';
import CreateWorkFlowDialog from './_components/CreateWorkFlowDialog';
import WorkflowCard from './_components/WorkflowCard';

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
        <CreateWorkFlowDialog triggerText="New workflow" />
      </div>
      <div className="h-full  py-6">
        <Suspense fallback={<UserWorkFlowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
}

function UserWorkFlowsSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
}

async function UserWorkflows() {
  const workflows = GetWorkFlowForUser();
  if (!workflows) {
    <Alert variant={'destructive'}>
      <AlertCircle className="w-4 h-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong, Please try again later</AlertDescription>
    </Alert>;
  }

  if ((await workflows).length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent w-20 flex justify-center items-center">
          <InboxIcon className="stroke-primary" size={40} />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No workflow created yet.</p>
          <p className="text-sm text-muted-foreground">Click the button below to create your first workflow.</p>
        </div>
        <CreateWorkFlowDialog triggerText="Create your first workflow" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 gap-4 ">
      {(await workflows).map((workflow, idx) => (
        <WorkflowCard key={idx} workflow={workflow} />
      ))}
    </div>
  );
}
