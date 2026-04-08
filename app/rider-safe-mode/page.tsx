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
  const [reportingHazard, setReportingHazard] = useState<'flood' | 'pothole' | null>(null);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success'>('idle');
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
        }, 12000);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    } else {
      setAlertStage(0);
    }
  }, [isActive, alertStage]);

  const startScan = (type: 'flood' | 'pothole') => {
    setReportingHazard(type);
    setScanStatus('scanning');
    setTimeout(() => {
      setScanStatus('success');
      setLogs(prev => [...prev, { 
        time: new Date().toLocaleTimeString([], { hour12: false }), 
        event: `${type.toUpperCase()} HAZARD LOGGED`, 
        detail: `Co-ordinates: 12.97, 77.59. Accuracy: 96.4%` 
      }]);
      setTimeout(() => setReportingHazard(null), 2000);
    }, 4000);
  };

  const forceTrigger = () => {
    setAlertStage(2);
    setLogs(prev => [...prev, { time: 'NOW', event: 'HACKATHON DEMO OVERRIDE', detail: 'Triggering payout sequence...' }]);
  };

  return (
    <MobileWrapper className="bg-surface-base flex flex-col min-h-screen text-ink-primary overflow-hidden relative">
      <header className="px-6 pt-8 flex justify-between items-center relative z-20">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center text-ink-secondary hover:text-ink-primary shadow-sm transition-transform hover:scale-110">
          <X size={20} />
        </button>
        <div className="flex items-center gap-3">
           {isActive && (
             <button 
               onClick={() => setShowLog(!showLog)}
               className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm"
             >
               <List size={20} />
             </button>
           )}
           <div className="flex items-center gap-2 px-3 py-1 bg-white border border-border-light rounded-full shadow-sm">
              <div className={isActive ? "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" : "w-2 h-2 rounded-full bg-slate-200"} />
              <span className="text-[9px] font-black uppercase tracking-widest text-ink-hint">{isActive ? "Safe Mode Active" : "Systems Idle"}</span>
           </div>
        </div>
      </header>

      {/* Hazard Report Overlay */}
      <AnimatePresence>
         {reportingHazard && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 gap-8"
           >
              <div className="relative w-full aspect-square rounded-[48px] border-2 border-slate-900/5 bg-slate-50 overflow-hidden shadow-2xl">
                 <div className="absolute inset-0 flex items-center justify-center">
                    <AlertTriangle size={64} className="text-slate-900/5 animate-pulse" />
                 </div>
                 <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 w-full h-1 bg-primary shadow-[0_0_20px_#FF6B2B]" 
                 />
                 <div className="absolute bottom-6 left-6 right-6 p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-border-light text-center shadow-lg">
                    <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{scanStatus === 'scanning' ? 'Neural Processing...' : 'Hazard Authenticated'}</div>
                    <div className="text-base font-black italic text-ink-primary">{reportingHazard === 'flood' ? 'Flood Detection' : 'Structural Pothole'}</div>
                 </div>
              </div>
              <div className="text-center space-y-2">
                 <div className="text-xl font-black text-ink-primary italic">{scanStatus === 'scanning' ? 'Analyzing Visual Data...' : 'Broadcasted to Mesh'}</div>
                 <div className="text-[9px] text-ink-hint font-black uppercase tracking-[0.3em]">Neural Node: BGL-KRM-09</div>
              </div>
           </motion.div>
         )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
        <AnimatePresence mode="wait">
          {!isActive ? (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
              className="text-center space-y-12"
            >
               <div className="relative group">
                  <div className="w-48 h-48 rounded-[40px] bg-white border border-border-light flex items-center justify-center relative z-10 group-hover:border-primary/20 transition-all duration-500 shadow-xl">
                    <Shield className="text-slate-100 w-24 h-24 group-hover:text-primary/10 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Shield size={48} className="text-primary" />
                    </div>
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute inset-0 w-48 h-48 rounded-[40px] bg-primary/20 -z-0 blur-2xl"
                  />
               </div>
               <div className="space-y-4">
                  <h2 className="text-display-m text-3xl font-black italic text-ink-primary">Ready to Ride?</h2>
                  <p className="text-[11px] font-bold text-ink-hint uppercase tracking-widest leading-relaxed max-w-[240px] mx-auto text-balance">
                    Activate the <span className="text-primary italic">Neural Shield</span> to monitor localized triggers hands-free.
                  </p>
               </div>
               <Button 
                onClick={() => setIsActive(true)}
                className="w-full h-16 bg-slate-900 text-white font-black uppercase tracking-[0.2em] rounded-3xl shadow-2xl active:scale-95 transition-all hover:bg-slate-800 italic"
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
                  <div className="text-display-m text-3xl font-black text-rose-500 uppercase italic tracking-tight">Trigger Breach</div>
                  <div className="text-[10px] font-black text-ink-hint uppercase tracking-[0.2em]">Koramangala Block 4 · 52mm/hr</div>
               </div>

               <Card className="p-8 bg-white border border-border-light rounded-[40px] space-y-6 shadow-2xl">
                  <div className="flex items-center gap-3 justify-center">
                    <Radio className="text-primary animate-pulse" size={20} />
                    <span className="text-[10px] font-black text-ink-primary uppercase tracking-[0.2em]">Vocal Assist Active</span>
                  </div>
                  <p className="text-xs text-ink-secondary italic leading-relaxed font-bold">
                    "Heavy rain detected. Pull over safely. Payout process initiated automatically."
                  </p>
                  <div className="h-[1px] w-full bg-border-light" />
                  <div className="flex justify-between items-center px-2">
                     <span className="text-[10px] font-black text-ink-hint uppercase tracking-widest">Payout Est:</span>
                     <span className="text-2xl font-black italic text-emerald-600">₹400.00</span>
                  </div>
               </Card>

               <div className="flex gap-4">
                  <Button variant="secondary" className="flex-1 h-16 bg-slate-100 text-ink-primary border-none uppercase tracking-widest text-[10px] font-black rounded-3xl italic">
                    I'm Safe
                  </Button>
                  <Button className="flex-1 h-16 bg-rose-500 text-white border-none uppercase tracking-widest text-[10px] font-black rounded-3xl flex items-center justify-center gap-3 shadow-lg shadow-rose-500/20 italic">
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
                     <div className="w-48 h-48 rounded-full border border-border-light bg-white shadow-inner" />
                  </motion.div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                     <Mic className="text-primary animate-pulse" size={40} />
                     <div className="text-[10px] font-black text-ink-secondary uppercase tracking-[0.4em]">Listening</div>
                  </div>
                  
                  {/* Orbital Elements */}
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                    className="absolute inset-0"
                  >
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_#FF6B2B]" />
                  </motion.div>
               </div>
               
               <div className="space-y-6">
                  <div className="space-y-2">
                     <div className="text-display-m text-xl tracking-widest uppercase italic font-black text-ink-primary">Mesh Scanning</div>
                     <div className="text-[11px] text-primary font-black uppercase tracking-[0.1em] h-4 italic">
                       {alertStage === 1 ? "Anomalous cell detected..." : "Connected to localized IoT mesh"}
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <button onClick={() => startScan('flood')} className="group p-6 bg-white border border-border-light rounded-[32px] flex flex-col items-center gap-4 hover:border-blue-500/30 transition-all shadow-sm hover:shadow-md">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                           <CloudRain size={24} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-ink-primary group-hover:text-blue-600">Report Flood</span>
                     </button>
                     <button onClick={() => startScan('pothole')} className="group p-6 bg-white border border-border-light rounded-[32px] flex flex-col items-center gap-4 hover:border-amber-500/30 transition-all shadow-sm hover:shadow-md">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                           <AlertTriangle size={24} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-ink-primary group-hover:text-amber-600">Report Hazard</span>
                     </button>
                  </div>
               </div>

               <Button 
                variant="ghost" onClick={() => setIsActive(false)}
                className="text-ink-hint hover:text-ink-primary uppercase tracking-[0.2em] text-[11px] font-black italic"
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
            className="absolute inset-0 z-40 bg-white/95 backdrop-blur-xl p-8 pt-24"
          >
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-display-m text-2xl uppercase italic font-black text-ink-primary">Incident Log</h3>
                <button onClick={() => setShowLog(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-ink-hint"><X size={24} /></button>
             </div>
             <div className="space-y-6">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-6 items-start p-4 bg-white border border-border-light rounded-2xl shadow-sm">
                     <div className="text-mono font-black text-primary text-xs whitespace-nowrap bg-primary/5 px-2 py-1 rounded-lg">{log.time}</div>
                     <div className="space-y-1">
                        <div className="text-[10px] font-black text-ink-primary uppercase tracking-widest">{log.event}</div>
                        <div className="text-[10px] font-bold text-ink-hint uppercase tracking-tight">{log.detail}</div>
                     </div>
                  </div>
                ))}
             </div>
             
             {/* Device Info */}
             <div className="absolute bottom-12 left-8 right-8 p-6 rounded-[32px] bg-slate-900 shadow-2xl flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Radio size={20} className="text-primary" />
                   </div>
                   <div>
                      <div className="text-[8px] font-black text-white/40 uppercase tracking-widest">Network</div>
                      <div className="text-xs font-mono font-bold text-white tracking-widest">EARN-MESH-BGL</div>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <MapPin size={16} className="text-primary" />
                   <div className="text-[10px] font-mono text-white/60 font-bold">12.97, 77.59</div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 w-full h-[60%] pointer-events-none opacity-40 z-0">
         <div className={cn(
           "w-full h-full bg-gradient-to-t from-primary/5 via-transparent to-transparent transition-all duration-1000",
           alertStage === 2 && "from-rose-500/10"
         )} />
      </div>
    </MobileWrapper>
  );
}
