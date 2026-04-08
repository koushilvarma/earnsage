"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { BottomNav } from './BottomNav';
import { SessionHUD } from './SessionHUD';

interface MobileWrapperProps {
  children: React.ReactNode;
  className?: string;
  withNav?: boolean;
}

export const MobileWrapper: React.FC<MobileWrapperProps> = ({ 
  children, 
  className,
  withNav = false 
}) => {
  return (
    <div className="bg-[#CBD5E1] min-h-screen">
      <main className={cn(
        "mobile-wrapper shadow-2xl overflow-x-hidden",
        withNav && "pb-nav",
        className
      )}>
        {children}
        {withNav && (
            <>
                <SessionHUD />
                <BottomNav />
            </>
        )}
      </main>
    </div>
  );
};
