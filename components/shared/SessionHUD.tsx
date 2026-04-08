"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, CloudRain, Clock, Zap, Activity, Thermometer } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SessionHUD = () => {
  const [profile, setProfile] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);
  const [secondsWorked, setSecondsWorked] = useState(15740); // Starting at 4h 22m 20s
  const [liveBalance, setLiveBalance] = useState(1640.50);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Entrance animation
    const timer = setTimeout(() => setIsVisible(true), 800);

    // Initial fetch
    const fetchData = async () => {
      try {
        const [pRes, wRes] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/weather')
        ]);
        const pData = await pRes.json();
        const wData = await wRes.json();
        setProfile(pData);
        setWeather(wData);
        if (pData.walletBalance) setLiveBalance(pData.walletBalance);
      } catch (e) {
        console.error("HUD Sync Error", e);
      }
    };

    fetchData();

    // Session Timer: Ticks every second
    const timerInterval = setInterval(() => {
      setSecondsWorked(prev => prev + 1);
    }, 1000);

    // Parametric Accumulation: Ticks every 5 seconds (simulated)
    const accumulationInterval = setInterval(() => {
      setLiveBalance(prev => prev + (Math.random() * 0.05));
    }, 5000);

    // Mesh Refresh: Every 15 seconds
    const meshInterval = setInterval(fetchData, 15000);

    return () => {
      clearTimeout(timer);
      clearInterval(timerInterval);
      clearInterval(accumulationInterval);
      clearInterval(meshInterval);
    };
  }, []);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const NeuralPulse = ({ children, value }: { children: React.ReactNode, value: any }) => (
    <motion.div
      key={value}
      initial={{ scale: 1.1, filter: "brightness(1.5)" }}
      animate={{ scale: 1, filter: "brightness(1)" }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          className="fixed bottom-24 left-4 right-4 z-[60] flex justify-center pointer-events-none"
        >
          <div className="w-full max-w-[440px] bg-slate-900/90 backdrop-blur-3xl px-6 py-4 rounded-[32px] border border-white/10 shadow-[0_22px_60px_rgba(0,0,0,0.4)] pointer-events-auto flex items-center justify-between relative overflow-hidden group">
            
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            {/* Column 1: Payouts */}
            <div className="flex flex-col gap-1 relative z-10">
               <div className="flex items-center gap-1.5">
                  <Wallet size={12} className="text-primary" />
                  <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em]">Payouts</span>
               </div>
               <div className="text-sm font-mono font-black text-white flex items-baseline gap-0.5">
                  <span className="text-[10px] text-primary/60 font-normal">₹</span>
                  <NeuralPulse value={Math.floor(liveBalance)}>
                    {liveBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </NeuralPulse>
               </div>
            </div>

            <div className="h-8 w-[1px] bg-white/10" />

            {/* Column 2: Environmental */}
            <div className="flex flex-col gap-1 items-center relative z-10">
               <div className="flex items-center gap-1.5">
                  <Thermometer size={12} className="text-blue-400" />
                  <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em]">Grid Env</span>
               </div>
               <div className="text-sm font-black text-white flex items-center gap-2 italic">
                  <NeuralPulse value={weather?.temperature}>
                    {weather?.temperature || '28'}°C
                  </NeuralPulse>
                  <span className="text-white/20 font-light not-italic">/</span> 
                  <span className="text-xs text-white/80">{weather?.condition || 'Clear'}</span>
               </div>
            </div>

            <div className="h-8 w-[1px] bg-white/10" />

            {/* Column 3: Active Session */}
            <div className="flex flex-col gap-1 items-end relative z-10">
               <div className="flex items-center gap-1.5">
                  <Activity size={12} className="text-emerald-400 animate-pulse" />
                  <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em]">Time Worked</span>
               </div>
               <div className="text-sm font-mono font-black text-emerald-400 tracking-tight">
                  <NeuralPulse value={secondsWorked}>
                    {formatTime(secondsWorked)}
                  </NeuralPulse>
               </div>
            </div>

            {/* High-Fidelity Active Indicator */}
            <div className="absolute top-2 right-2">
               <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping opacity-40 absolute inset-0" />
               <div className="w-1.5 h-1.5 bg-primary rounded-full relative z-10 shadow-[0_0_8px_#FF6B2B]" />
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
