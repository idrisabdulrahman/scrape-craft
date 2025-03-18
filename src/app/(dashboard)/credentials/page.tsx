import React from 'react';

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Credentials</h1>
        </div>
      </div>
    </div>
  );
}
