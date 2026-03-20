"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { BottomNav } from './BottomNav';

interface MobileWrapperProps {
  children: React.ReactNode;
  className?: string;
  withNav?: boolean;
}

export function MobileWrapper({ children, className, withNav = false }: MobileWrapperProps) {
  return (
    <div className={cn("mobile-wrapper", className, withNav && "pb-nav")}>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      {withNav && <BottomNav />}
    </div>
  );
}
