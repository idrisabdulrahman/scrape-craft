'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ParamProps } from '@/types/appNode';
import React, { useEffect, useId, useState } from 'react';

export default function StringParam({ param, value, updateNodeParamValue, disabled }: ParamProps) {
  const [internalValue, setInternalValue] = useState(value);
  const id = useId();
  useEffect(() => {
    setInternalValue(value);
  }, [value]);
  let Component: any = Input;
  if (param.variant === 'textarea') {
    Component = Textarea;
  }
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-500 px-2">*</p>}
      </Label>
      <Component
        id={id}
        placeholder="Enter a value"
        value={internalValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInternalValue(e.target.value);
        }}
        disabled={disabled}
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
          updateNodeParamValue(e.target.value);
        }}
        className="text-xs"
      />
      {param.helperText && <p className="px-2 text-muted-foreground">{param.helperText}</p>}
    </div>
  );
}
