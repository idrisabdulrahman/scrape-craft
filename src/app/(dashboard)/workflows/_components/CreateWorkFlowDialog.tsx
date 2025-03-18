'use client';

import React, { useCallback, useMemo } from 'react';
import CustomDialogHeader from '@/components/custom/CustomDialogHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { createWorkFlowSchema, createWorkFlowSchemaType } from '@/schema/workflow';
import { LayersIcon, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { CreateWorkFlow } from '@/actions/workflows/createWorkflows';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function CreateWorkFlowDialog({ triggerText }: { triggerText: string }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const resolver = useMemo(() => zodResolver(createWorkFlowSchema), []);
  const form = useForm<createWorkFlowSchemaType>({
    resolver,
    defaultValues: {},
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkFlow,
    onSuccess: (data) => {
      toast.success('Workflow created', { id: 'create-workflow' });
      router.push(`/workflow/editor/${data.workflowId}`);
    },
    onError: () => {
      toast.error('Failed to create a workflow', { id: 'create-workflow' });
    },
  });

  const onSubmit = useCallback(
    (values: createWorkFlowSchemaType) => {
      toast.loading('creating workflow...', { id: 'create-workflow' });
      mutate(values);
    },
    [mutate],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset(), setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? 'New workflow'}</Button>
      </DialogTrigger>

      <DialogContent className="px-0">
        <CustomDialogHeader icon={LayersIcon} title="Design Workflow" subtitle="Design your custom workflow" />
        <div className="p-6 ">
          <Form {...form}>
            <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Add a descriptive and unique <strong className="font-bold">name</strong>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-muted-foreground">(optional)</p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      What does this workflow do? <br /> Optional but helps with workflow management{' '}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {!isPending && 'Proceed'} {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
