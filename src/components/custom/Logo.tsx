import Link from 'next/link';
import React from 'react';
import { cn } from '../../lib/utils';
import { MousePointerSquareDashed } from 'lucide-react';

type Props = {
  fontSize?: string;
  iconSize?: number;
};

export default function Logo({ fontSize = 'text-2xl', iconSize = 20 }: Props) {
  return (
    <Link href="/" className={cn('text-2xl gap-2 flex items-center font-extrabold ', fontSize)}>
      <div className="from-purple-500 to-purple-600 rounded-xl bg-linear-to-r p-2">
        <MousePointerSquareDashed size={iconSize} className="stroke-white" />
      </div>
      <div>
        <span className="bg-linear-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">Scrape</span>

        <span className="text-stone-800 dark:text-stone-400">Craft</span>
      </div>
    </Link>
  );
}
