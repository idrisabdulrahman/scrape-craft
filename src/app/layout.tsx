import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Toaster } from '@/components/ui/sonner';

const inter = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Scrape Craft',
  description: 'craft your ideas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      afterSignOutUrl={'/sign-in'}
      appearance={{
        elements: {
          headerTitle: 'text-primary font-semibold',
          formButtonPrimary: 'bg-primary shadow-none! hover:bg-primary/90  text-sm',
        },
        layout: {
          socialButtonsPlacement: 'bottom',
          socialButtonsVariant: 'iconButton',
        },
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <AppProviders>{children}</AppProviders>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
