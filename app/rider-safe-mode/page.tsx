"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Shield, Zap, CloudRain, AlertTriangle, ArrowRight, Mic, Volume2, X, PhoneCall, List, MapPin, Radio } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { cn } from '@/lib/utils';

export default function RiderSafeMode() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [alertStage, setAlertStage] = useState(0); // 0: Idle, 1: Scanning, 2: Triggered
  const [showLog, setShowLog] = useState(false);
  const [logs, setLogs] = useState([
    { time: '10:02', event: 'IoT Ambient Mesh Connected', detail: 'Local node ID: #BGL-KRM-09' },
    { time: '10:05', event: 'In-Flight Risk Scanned', detail: 'Rain probability < 5%' }
  ]);

  useEffect(() => {
    if (isActive) {
      if (alertStage === 0) {
        const timer1 = setTimeout(() => {
          setAlertStage(1);
          setLogs(prev => [...prev, { time: '10:08', event: 'Pre-Monsoon Cell Detected', detail: '1.2km North-West' }]);
        }, 3000);
        
        const timer2 = setTimeout(() => {
          setAlertStage(2);
          setLogs(prev => [...prev, { time: '10:12', event: 'Parametric Threshold Exceeded', detail: '52mm/hr Rainfall Intensity' }]);
        }, 10000);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    } else {
      setAlertStage(0);
    }
  }, [isActive, alertStage]);

  const forceTrigger = () => {
    setAlertStage(2);
    setLogs(prev => [...prev, { time: 'NOW', event: 'HACKATHON DEMO OVERRIDE', detail: 'Triggering payout sequence...' }]);
  };

  return (
    <MobileWrapper className="bg-slate-950 flex flex-col min-h-screen text-white overflow-hidden relative">
      <header className="px-6 pt-8 flex justify-between items-center relative z-20">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white">
          <X size={20} />
        </button>
        <div className="flex items-center gap-3">
           {isActive && (
             <button 
               onClick={() => setShowLog(!showLog)}
               className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary"
             >
               <List size={20} />
             </button>
           )}
           <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <div className={isActive ? "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" : "w-2 h-2 rounded-full bg-white/20"} />
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">{isActive ? "Safe Mode Active" : "Systems Idle"}</span>
           </div>
        </div>
      </header>

      {/* Secret Demo Trigger (Transparent Button) */}
      <button 
        onDoubleClick={forceTrigger}
        className="absolute top-2 right-1/2 translate-x-1/2 w-20 h-4 opacity-0 z-50 cursor-default"
        title="Double Click for Demo Trigger"
      />

      <main className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
        <AnimatePresence mode="wait">
          {!isActive ? (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
              className="text-center space-y-12"
            >
               <div className="relative group">
                  <div className="w-48 h-48 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center relative z-10 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500">
                    <Shield className="text-white/10 w-20 h-20 group-hover:text-primary transition-colors" />
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.05, 0.1] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute inset-0 w-48 h-48 rounded-full bg-primary/10 -z-0"
                  />
               </div>
               <div className="space-y-4">
                  <h2 className="text-display-l text-3xl">Ready to Ride?</h2>
                  <p className="text-body text-white/40 max-w-[260px] mx-auto leading-relaxed">
                    Activate the Shield to monitor localized triggers hands-free.
                  </p>
               </div>
               <Button 
                onClick={() => setIsActive(true)}
                className="w-full h-16 bg-white text-slate-950 font-bold uppercase tracking-[0.2em] rounded-2xl shadow-2xl active:scale-95 transition-all hover:bg-slate-100"
               >
                 Engage Shield
               </Button>
            </motion.div>
          ) : alertStage === 2 ? (
            <motion.div 
              key="alert"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full text-center space-y-8"
            >
               <div className="relative inline-block">
                  <div className="w-28 h-28 rounded-full bg-rose-500 flex items-center justify-center mx-auto animate-bounce shadow-[0_0_60px_rgba(244,63,94,0.4)]">
                    <CloudRain size={48} className="text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-full animate-ping bg-rose-500/20" />
               </div>
               
               <div className="space-y-2">
                  <div className="text-mono-xl text-3xl font-black text-rose-500 uppercase italic tracking-tight">Trigger Breach</div>
                  <div className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">Koramangala Block 4 · 52mm/hr</div>
               </div>

               <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-2xl rounded-[40px] space-y-6">
                  <div className="flex items-center gap-3 justify-center">
                    <Radio className="text-primary animate-pulse" size={20} />
                    <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Vocal Assist Active</span>
                  </div>
                  <p className="text-xs text-white/80 italic leading-relaxed font-medium">
                    "Heavy rain detected. Pull over safely. Payout process initiated automatically."
                  </p>
                  <div className="h-[1px] w-full bg-white/10" />
                  <div className="flex justify-between items-center px-2">
                     <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Payout Est:</span>
                     <span className="text-mono-l text-xl text-emerald-400">₹400.00</span>
                  </div>
               </Card>

               <div className="flex gap-4">
                  <Button variant="secondary" className="flex-1 h-16 bg-white/5 text-white border-white/10 uppercase tracking-widest text-[10px] font-bold rounded-2xl">
                    I'm Safe
                  </Button>
                  <Button className="flex-1 h-16 bg-rose-500 text-white border-none uppercase tracking-widest text-[10px] font-black rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-rose-500/20">
                    <PhoneCall size={18} /> SOS
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
                    transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                    className="w-56 h-56 rounded-full border-2 border-dashed border-primary/20 flex items-center justify-center"
                  >
                     <div className="w-48 h-48 rounded-full border border-white/5 bg-white/[0.01]" />
                  </motion.div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                     <Mic className="text-primary animate-pulse" size={40} />
                     <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Listening</div>
                  </div>
                  
                  {/* Orbital Elements */}
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                    className="absolute inset-0"
                  >
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary/40 rounded-full blur-md" />
                  </motion.div>
               </div>
               
               <div className="space-y-6">
                  <div className="space-y-2">
                     <div className="text-mono-l text-xl tracking-widest uppercase italic">Mesh Scanning</div>
                     <div className="text-[11px] text-primary/60 font-medium uppercase tracking-[0.1em] h-4">
                       {alertStage === 1 ? "Anomalous cell detected..." : "Connected to localized IoT mesh"}
                     </div>
                  </div>
                  <Button 
                    onClick={() => setAlertStage(2)}
                    className="bg-primary/20 border border-primary/40 text-primary h-12 px-6 rounded-full text-[10px] uppercase font-black tracking-widest hover:bg-primary hover:text-white transition-all animate-pulse"
                  >
                    Simulate Voice SOS 🎙️
                  </Button>
               </div>

               <Button 
                variant="ghost" onClick={() => setIsActive(false)}
                className="text-white/20 hover:text-white uppercase tracking-[0.2em] text-[11px] font-bold"
               >
                 End Session
               </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Incident Log Overlay */}
      <AnimatePresence>
        {showLog && (
          <motion.div 
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-40 bg-slate-950/95 backdrop-blur-xl p-8 pt-24"
          >
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-mono-l text-2xl uppercase italic">Incident Log</h3>
                <button onClick={() => setShowLog(false)} className="text-white/40"><X size={24} /></button>
             </div>
             <div className="space-y-6">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-6 items-start">
                     <div className="text-mono font-bold text-primary text-sm whitespace-nowrap">{log.time}</div>
                     <div className="space-y-1">
                        <div className="text-xs font-bold text-white uppercase tracking-widest">{log.event}</div>
                        <div className="text-[10px] text-white/40">{log.detail}</div>
                     </div>
                  </div>
                ))}
             </div>
             
             {/* Device Info */}
             <div className="absolute bottom-12 left-8 right-8 p-6 rounded-3xl bg-white/5 border border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <Radio size={20} className="text-primary" />
                   <div>
                      <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Network</div>
                      <div className="text-xs font-mono">EARN-MESH-BGL</div>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <MapPin size={16} className="text-primary" />
                   <div className="text-[10px] font-mono">12.97, 77.59</div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Aura Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[60%] pointer-events-none opacity-40 z-0">
         <div className={cn(
           "w-full h-full bg-gradient-to-t from-primary/20 via-transparent to-transparent transition-all duration-1000",
           alertStage === 2 && "from-rose-500/30"
         )} />
      </div>
    </MobileWrapper>
  );
}
