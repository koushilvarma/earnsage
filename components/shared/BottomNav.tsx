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
    <nav className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="w-[calc(100%-32px)] max-w-[400px] h-[64px] bg-white/90 backdrop-blur-2xl border border-border-light shadow-[0_10px_40px_rgba(0,0,0,0.1)] px-8 flex items-center justify-between pointer-events-auto rounded-[32px]">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className="relative flex flex-col items-center justify-center gap-1 group py-1"
            >
              <item.icon 
                size={20} 
                className={cn(
                  "transition-all duration-300",
                  isActive ? "text-primary scale-110" : "text-ink-hint group-hover:text-ink-secondary"
                )}
              />
              <span className={cn(
                "text-[8px] font-black uppercase tracking-widest transition-colors duration-300",
                isActive ? "text-primary" : "text-ink-hint"
              )}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-2 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
