'use client';
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CreateWorkFlow } from '@/actions/workflows/createWorkflows';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { Deleteworkflow } from '@/actions/workflows/deleteWorkflowks';
import { toast } from 'sonner';

type DeleteDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
  workflowId: string;
};

export default function DeleteWorkFlowDialog({ open, setOpen, workflowName, workflowId }: DeleteDialogProps) {
  const [confirmText, setConfirmText] = useState('');

  const workFlowName = CreateWorkFlow;
  const deleteWorkflowMutation = useMutation({
    mutationFn: Deleteworkflow,
    onSuccess: () => {
      toast.success(`WorkFlow ${workflowName} Deleted successfully `, { id: workflowId });
    },
    onError: () => {
      toast.error(`Failed to delete workflow: ${workflowName}`, { id: workflowId });
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <p>
              This action cannot be undone and will permanently delete{' '}
              <b className=" font-extrabold text-destructive">{workflowName}</b>, you will not be able to retrieve it.
              (type in workflow name to delete.)
              <Input
                value={confirmText}
                className=" mt-5"
                onChange={(e) => {
                  setConfirmText(e.target.value);
                }}
              />
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={confirmText !== workflowName || deleteWorkflowMutation.isPending}
            onClick={(e) => {
              e.stopPropagation();
              toast.loading('Deleting workflow...', { id: workflowId });
              deleteWorkflowMutation.mutate(workflowId);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
