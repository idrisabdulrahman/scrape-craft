'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { WorkFlowStatus } from '@/types/workflow';
import { Workflow } from '@prisma/client';
import { FileTextIcon, MoreVerticalIcon, PlayIcon, ShuffleIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip } from '@/components/ui/tooltip';
import TooltipWrapper from '@/components/custom/TooltipWrapper';
import DeleteWorkFlowDialog from './DeleteWorkFlowDialog';

type Props = {
  workflow: Workflow;
};

const statusColors = {
  [WorkFlowStatus.DRAFT]: 'bg-yellow text-yellow-600',
  [WorkFlowStatus.PUBLISHED]: 'bg-primary ',
};
export default function WorkflowCard({ workflow }: Props) {
  const isDraft = workflow.status === WorkFlowStatus.DRAFT;
  return (
    <Card className="border border-separate shadow-xs rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30">
      <CardContent className="p-4 flex items-center justify-between  h-[100px]">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              'w-10 rounded-full flex items-center justify-center ',
              statusColors[workflow.status as WorkFlowStatus],
            )}
          >
            {isDraft ? <FileTextIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5 text-white" />}
          </div>
          <div className="">
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              <Link href={`/workflow/editor/${workflow.id}`} className="items-center hover:underline">
                {workflow.name}
              </Link>
              {isDraft && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className="space-x-2 flex items-center ">
          {' '}
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'flex items-center gap-2',
            )}
          >
            <ShuffleIcon size={16} />
            {/* {workflow.name} */}
          </Link>
          <WorkflowActions workflowName={workflow.name} workflowId={workflow.id} />
        </div>
      </CardContent>
    </Card>
  );
}

function WorkflowActions({ workflowName, workflowId }: { workflowName: string; workflowId: string }) {
  const [ShowDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <>
      <DeleteWorkFlowDialog
        open={ShowDeleteDialog}
        setOpen={setShowDeleteDialog}
        workflowName={workflowName}
        workflowId={workflowId}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant={'outline'} className="focus-visible:ring-" size={'sm'}>
            <TooltipWrapper content={'More actions'}>
              <div className="flex items-center justify-center w-full h-full">
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive flex hover:bg-destructive-foreground bg-none items-center gap-2"
            onSelect={() => {
              setShowDeleteDialog((prev) => !prev);
            }}
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
