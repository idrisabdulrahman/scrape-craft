import { Node } from '@xyflow/react';
import { TaskParam, TaskType } from './task';

export type AppNodeData = {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
};

export type AppNode = Node & {
  data: AppNodeData;
};

export type ParamProps = {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (value: string) => void;
  disabled?: boolean;
};
