"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, CloudRain, Clock, Zap, Activity, Thermometer } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SessionHUD = () => {
  const [profile, setProfile] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);
  const [sessionTime, setSessionTime] = useState("4h 22m"); // Mapped simulation
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after slight delay for premium entrance
    const timer = setTimeout(() => setIsVisible(true), 1000);

    // Initial fetch
    fetch('/api/profile').then(res => res.json()).then(setProfile).catch(() => {});
    fetch('/api/weather').then(res => res.json()).then(setWeather).catch(() => {});

    // Polling sync
    const interval = setInterval(() => {
      fetch('/api/profile').then(res => res.json()).then(setProfile).catch(() => {});
      fetch('/api/weather').then(res => res.json()).then(setWeather).catch(() => {});
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          className="fixed bottom-24 left-4 right-4 z-[60] flex justify-center pointer-events-none"
        >
          <div className="w-full max-w-[400px] bg-slate-900/90 backdrop-blur-2xl px-6 py-4 rounded-[32px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-auto flex items-center justify-between">
            
            {/* Column 1: Payouts */}
            <div className="flex flex-col gap-1">
               <div className="flex items-center gap-1.5">
                  <Wallet size={12} className="text-primary" />
                  <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Payouts</span>
               </div>
               <div className="text-sm font-mono font-black text-white">
                  ₹{profile?.walletBalance?.toFixed(2) || '1,600.00'}
               </div>
            </div>

            <div className="h-8 w-[1px] bg-white/10" />

            {/* Column 2: Environmental */}
            <div className="flex flex-col gap-1 items-center">
               <div className="flex items-center gap-1.5">
                  <Thermometer size={12} className="text-blue-400" />
                  <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Grid Env</span>
               </div>
               <div className="text-sm font-black text-white flex items-center gap-2">
                  32°C <span className="text-white/40 font-bold">/</span> {weather?.condition || 'Clear'}
               </div>
            </div>

            <div className="h-8 w-[1px] bg-white/10" />

            {/* Column 3: Active Session */}
            <div className="flex flex-col gap-1 items-end">
               <div className="flex items-center gap-1.5">
                  <Activity size={12} className="text-emerald-400 animate-pulse" />
                  <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Time Worked</span>
               </div>
               <div className="text-sm font-mono font-black text-emerald-400">
                  {sessionTime}
               </div>
            </div>

            {/* Active Indicator Pulse (Corner) */}
            <div className="absolute -top-1 -right-1">
               <div className="w-3 h-3 bg-primary rounded-full animate-ping opacity-20 absolute inset-0" />
               <div className="w-3 h-3 bg-primary rounded-full relative z-10 border-2 border-slate-900" />
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
