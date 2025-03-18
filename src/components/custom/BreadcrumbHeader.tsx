'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '../ui/breadcrumb';
import { MobileSidebar } from './Sidebar';

type Props = {};

export default function BreadcrumbHeader({}: Props) {
  const pathName = usePathname();
  const paths = pathName === '/' ? [''] : pathName?.split('/');
  return (
    <div className="flex items-center flex-start">
      <MobileSidebar />
      <Breadcrumb>
        <BreadcrumbList>
          {paths.map((path, idx) => (
            <React.Fragment key={idx}>
              <BreadcrumbItem>
                <BreadcrumbLink className="capitalize" href={`/${path}`}>
                  {path === '' ? '/' : path}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
