"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Shield, Zap, CloudRain, AlertTriangle, ArrowRight, Mic, Volume2, X, PhoneCall } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { cn } from '@/lib/utils';

export default function RiderSafeMode() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [alertStage, setAlertStage] = useState(0); // 0: Idle, 1: Detection, 2: Alert

  useEffect(() => {
    if (isActive) {
      const timer1 = setTimeout(() => setAlertStage(1), 2000);
      const timer2 = setTimeout(() => setAlertStage(2), 6000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setAlertStage(0);
    }
  }, [isActive]);

  return (
    <MobileWrapper className="bg-ink-primary flex flex-col min-h-screen text-white overflow-hidden">
      <header className="px-6 pt-8 flex justify-between items-center relative z-10">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
          <X size={20} />
        </button>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
           <div className={isActive ? "w-2 h-2 rounded-full bg-status-success animate-pulse" : "w-2 h-2 rounded-full bg-white/30"} />
           <span className="text-[10px] font-bold uppercase tracking-widest">{isActive ? "Rider Safe Mode Active" : "Safe Mode Idle"}</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8 relative">
        <AnimatePresence mode="wait">
          {!isActive ? (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center space-y-12"
            >
               <div className="relative">
                  <div className="w-40 h-40 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <Shield className="text-white/20 w-16 h-16" />
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute inset-0 w-40 h-40 rounded-full bg-primary/20 -z-10"
                  />
               </div>
               <div className="space-y-4">
                  <h2 className="text-display-l text-2xl">Ready to Ride?</h2>
                  <p className="text-body text-white/60 max-w-[240px] mx-auto">
                    Activate Safe Mode for hands-free voice alerts and instant trigger detection.
                  </p>
               </div>
               <Button 
                onClick={() => setIsActive(true)}
                className="w-full h-16 bg-white text-ink-primary font-bold uppercase tracking-[0.2em] rounded-2xl shadow-xl active:scale-95 transition-all"
               >
                 Start Safe Mode
               </Button>
            </motion.div>
          ) : alertStage === 2 ? (
            <motion.div 
              key="alert"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full text-center space-y-8"
            >
               <div className="w-24 h-24 rounded-full bg-status-danger flex items-center justify-center mx-auto animate-bounce shadow-[0_0_40px_rgba(239,68,68,0.4)]">
                 <CloudRain size={40} className="text-white" />
               </div>
               
               <div className="space-y-2">
                  <div className="text-mono-xl text-3xl font-bold text-status-danger uppercase italic">Extreme Rain Detected</div>
                  <div className="text-heading text-lg text-white/90">Koramangala · 52mm/hr</div>
               </div>

               <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-xl rounded-3xl space-y-4">
                  <div className="flex items-center gap-3 justify-center mb-2">
                    <Volume2 className="text-primary animate-pulse" size={20} />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Voice Alert Active</span>
                  </div>
                  <p className="text-xs text-white/80 italic leading-relaxed">
                    "Heavy rain detected. Pull over immediately for safety. Payout process initiated automatically."
                  </p>
               </Card>

               <div className="flex gap-4">
                  <Button variant="secondary" className="flex-1 h-14 bg-white/10 text-white border-white/20 uppercase tracking-widest text-[9px] font-bold">
                    I'm Safe
                  </Button>
                  <Button className="flex-1 h-14 bg-status-danger text-white border-none uppercase tracking-widest text-[9px] font-bold flex items-center gap-2">
                    <PhoneCall size={14} /> SOS
                  </Button>
               </div>
            </motion.div>
          ) : (
            <motion.div 
              key="monitoring"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-12"
            >
               <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="w-48 h-48 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center"
                  >
                     <div className="w-40 h-40 rounded-full border border-white/10 bg-white/5" />
                  </motion.div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                     <Mic className="text-primary animate-pulse" size={32} />
                     <span className="text-[8px] font-bold text-white/40 uppercase tracking-[0.3em]">Listening</span>
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="text-mono-l text-xl">System Scanning</div>
                  <div className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] animate-pulse">
                    {alertStage === 1 ? "Anomalous Cloud Formation detected..." : "Localized IoT Mesh connected"}
                  </div>
               </div>
               <Button 
                variant="ghost" onClick={() => setIsActive(false)}
                className="text-white/40 hover:text-white uppercase tracking-[0.2em] text-[10px]"
               >
                 Deactivate
               </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Wave Background Effect */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 pointer-events-none opacity-20">
           <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="#FF6B2B" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
           </svg>
        </div>
      </main>
    </MobileWrapper>
  );
}
