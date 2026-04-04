"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Map as MapIcon, Wallet, Shield, User, HelpCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: MapIcon, label: 'Tactical', path: '/triggers' },
  { icon: Shield, label: 'Shield', path: '/plans/manage' },
  { icon: HelpCircle, label: 'Nexus', path: '/support' },
  { icon: User, label: 'Oracle', path: '/profile' },
];

export const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="w-full max-w-[430px] h-[72px] bg-white border-t border-[#E2E8F0] shadow-[0_-4px_20px_rgba(15,23,42,0.06)] px-6 flex items-center justify-between pointer-events-auto pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className="relative flex flex-col items-center justify-center gap-1 group py-2"
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -top-[22px] w-5 h-[3px] bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <item.icon 
                size={22} 
                className={cn(
                  "transition-colors duration-200",
                  isActive ? "text-primary fill-primary/10" : "text-ink-hint group-hover:text-ink-secondary"
                )}
              />
              <span className={cn(
                "text-[10px] font-body font-semibold tracking-wide transition-colors duration-200",
                isActive ? "text-primary" : "text-ink-hint"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
