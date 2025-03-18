'use client';

import { CoinsIcon, HomeIcon, Layers2Icon, MenuIcon, ShieldCheckIcon } from 'lucide-react';
import React, { useState } from 'react';
import Logo from './Logo';
import { Button, buttonVariants } from '../ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

type Props = {};

const routes = [
  {
    href: '',
    label: 'Home',
    icon: HomeIcon,
  },

  {
    href: 'workflows',
    label: 'workflows',
    icon: Layers2Icon,
  },
  {
    href: 'credentials',
    label: 'Credentials',
    icon: ShieldCheckIcon,
  },

  {
    href: 'billing',
    label: 'Billing',
    icon: CoinsIcon,
  },
];
export default function DesktopSidebar({}: Props) {
  const pathNames = usePathname();
  const [activeRoute, setActiveRoute] = React.useState(routes[0]);

  React.useEffect(() => {
    const currentRoute = routes.find((route) => route.href.length > 0 && pathNames.includes(route.href)) || routes[0];
    setActiveRoute(currentRoute);
  }, [pathNames]);
  return (
    <div className="hidden relative md:block min-w-[280px] h-screen overflow-hidden bg-primary/5 dark:bg-secondary/30 w-full dark:text-foreground text-muted-foreground border-r-2 border-separate max-w-[280px]">
      <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
        <Logo />
      </div>
      {/* <div className="p-2">CREDITS</div> */}
      <div className="flex flex-col p-5 mt-5 gap-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={buttonVariants({
              variant: activeRoute.href === route.href ? 'sidebarActiveItem' : 'sidebarItem',
            })}
          >
            <route.icon size={20} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const [isOpen, setOpen] = useState(false);
  const [activeRoute, setActiveRoute] = React.useState(routes[0]);
  const pathNames = usePathname();

  React.useEffect(() => {
    const currentRoute = routes.find((route) => route.href.length > 0 && pathNames.includes(route.href)) || routes[0];
    setActiveRoute(currentRoute);
  }, [pathNames]);

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px] space-y-4 " side={'left'}>
            <Logo />
            <div className="flex flex-col gap-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={buttonVariants({
                    variant: activeRoute.href === route.href ? 'sidebarActiveItem' : 'sidebarItem',
                  })}
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <route.icon size={20} />
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
