"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: number;
  withText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, size = 40, withText = false }) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div 
        className="relative flex items-center justify-center rounded-2xl bg-slate-900 overflow-hidden shadow-2xl"
        style={{ width: size, height: size }}
      >
        {/* Modern Abstract Shield / Oracle Eye - high-fidelity representation */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black pointer-events-none" />
        
        {/* Animated Neural Pulse Background */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
        />
        
        {/* The Core Icon */}
        <div className="relative z-10 flex items-center justify-center">
           <svg viewBox="0 0 100 100" width={size * 0.6} height={size * 0.6} className="text-white">
              {/* Outer Shield Path */}
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
                d="M50 10 L15 25 V55 C15 75 50 90 50 90 C50 90 85 75 85 55 V25 L50 10Z" 
                fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" 
              />
              {/* Inner 'S' or Node structure */}
              <motion.circle 
                cx="50" cy="50" r="12" 
                className="fill-primary"
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Connection Lines (Oracle Net) */}
              <line x1="50" y1="50" x2="50" y2="28" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
              <line x1="50" y1="50" x2="30" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
              <line x1="50" y1="50" x2="70" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
           </svg>
        </div>
        
        {/* Glossy Shimmer Overlay */}
        <motion.div 
          animate={{ x: [-size, size*2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
        />
      </div>
      
      {withText && (
        <div className="flex flex-col -gap-1">
          <span className="text-lg font-black tracking-tight text-ink-primary">Earn<span className="text-primary italic">Sage</span></span>
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-ink-hint">Oracle Sync V10</span>
        </div>
      )}
    </div>
  );
};
