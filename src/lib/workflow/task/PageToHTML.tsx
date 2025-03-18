import { TaskParamType, TaskType } from '@/types/task';
import { CodeIcon, LucideProps } from 'lucide-react';

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: 'Page to html',
  icon: (props: LucideProps) => <CodeIcon className="stroke-orange-700" {...props} />,

  isEntryPoint: false,
  inputs: [
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],
  outputs: [
    {
      name: 'HTML',
      type: TaskParamType.STRING,
    },
    {
      name: 'Web Page',
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
};
