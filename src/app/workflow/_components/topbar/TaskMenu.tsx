'use client';
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TaskType } from '@/types/task';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { Button } from '@/components/ui/button';
type Props = {};

export default function TaskMenu() {
  return (
    <aside className="w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-4  overflow-auto">
      <Accordion type="multiple" className="w-full" defaultValue={['extraction']}>
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">Data extraction</AccordionTrigger>
          <AccordionContent className="flex flex-1 gap-2 flex-col">
            <TaskMenuBtn taskType={TaskType.LAUNCH_BROWSER} />
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
            <TaskMenuBtn taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}

function TaskMenuBtn({ taskType }: { taskType: TaskType }) {
  const onDragStart = (event: React.DragEvent, type: TaskType) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };
  const task = TaskRegistry[taskType];
  return (
    <Button
      className="flex justify-between items-center gap-2 border w-full"
      variant={'secondary'}
      draggable
      onDragStart={(event) => onDragStart(event, taskType)}
    >
      <task.icon size={20} />
      {task.label}
    </Button>
  );
}
