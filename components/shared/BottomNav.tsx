"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Zap, Wallet, Shield, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', icon: Home, href: '/dashboard' },
  { label: 'Triggers', icon: Zap, href: '/triggers' },
  { label: 'Payouts', icon: Wallet, href: '/payouts' },
  { label: 'Plan', icon: Shield, href: '/plans' },
  { label: 'Profile', icon: User, href: '/profile' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-secondary border-t border-white/10 px-4 pb-safe pt-2 z-50">
      <div className="flex justify-between items-center px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-1 gap-1 transition-colors touch-target min-w-[64px]",
                isActive ? "text-primary" : "text-text-muted hover:text-white"
              )}
            >
              <Icon size={24} className={cn("transition-transform duration-300", isActive && "scale-110")} />
              <span className="text-[10px] font-medium uppercase tracking-widest">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
