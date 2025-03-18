import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

type Props = {};

export default function BacktoWorkflow({}: Props) {
  return (
    <div className=" ">
      <Button variant={'ghost'} className="rounded-full" size={'icon'}>
        <Link href="/workflows">
          <ArrowLeftIcon size={20} />
        </Link>
      </Button>
    </div>
  );
}
