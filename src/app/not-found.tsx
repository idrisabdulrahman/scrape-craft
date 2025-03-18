import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {};

export default function NotfoundPage({}: Props) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4
    "
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Take heart - everyone loses track of valuable information online sometimes.
        </p>
        <div className="flex justify-center gap-4 sm:flex-row flex-col">
          <Link
            href={'/'}
            className="flex items-center justify-center px-4 bg-primary rounded-md text-white hover:bg-primary/80 transition-colors "
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
      <footer className="text-sm mt-12 text-center text-muted-foreground">
        Please don&apos;t hesitate to connect with our support team if you believe there is an error.
      </footer>
    </div>
  );
}
