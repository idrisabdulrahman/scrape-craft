import { TaskParamType, TaskType } from '@/types/task';
import { GlobeIcon, LucideProps } from 'lucide-react';

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: 'Launch Browser',
  icon: (props: LucideProps) => <GlobeIcon className="stroke-pink-700" {...props} />,

  isEntryPoint: true,
  inputs: [
    {
      name: 'site url',
      type: TaskParamType.STRING,
      helperText: 'eg: https://example.com',
      required: true,
      hideHandle: true,
    },
  ],
  outputs: [{ name: 'Web Page', type: TaskParamType.BROWSER_INSTANCE }],
};
