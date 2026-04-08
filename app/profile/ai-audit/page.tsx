"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Shield, Cpu, Activity, Zap, CheckCircle2, Terminal, AlertCircle, Brain, Search, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { Logo } from '@/components/shared/Logo';
import { cn } from '@/lib/utils';

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'INFO' | 'ACTION' | 'ALERT';
  message: string;
  code: string;
}

const mockLogs: LogEntry[] = [
  { id: '1', timestamp: '16:40:12', type: 'INFO', message: 'Ingesting Telemetry Node_441', code: 'NET_SYNC_OK' },
  { id: '2', timestamp: '16:40:15', type: 'ACTION', message: 'Recalculating Payout Coefficient', code: 'ACT_COEFF_ADJ' },
  { id: '3', timestamp: '16:40:18', type: 'ALERT', message: 'Low-Visibility Hazard Detected', code: 'HAZ_LEVEL_2' },
];

export default function AINeuralAudit() {
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);
  const [isScanning, setIsScanning] = useState(true);
  const logEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString([], { hour12: false }),
        type: Math.random() > 0.8 ? 'ACTION' : Math.random() > 0.9 ? 'ALERT' : 'INFO',
        message: [
          'Shard Synchronized with Guidewire Node',
          'Validating Biometric Identity Hash',
          'Mesh Signal Stability: 98.4%',
          'Threshold Check: Payout Trigger Active',
          'Adjusting Dynamic Premium for Sector_7',
          'Analyzing Risk Entropy Vector',
          'Oracle Prediction: High Outrage Probability'
        ][Math.floor(Math.random() * 7)],
        code: ['SYNC_01', 'AUTH_OK', 'MESH_STBL', 'TRG_ACTV', 'PRM_ADJ', 'ENT_ANAL', 'ORC_PRED'][Math.floor(Math.random() * 7)]
      };
      setLogs(prev => [...prev.slice(-15), newLog]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <MobileWrapper className="bg-surface-base flex flex-col min-h-screen px-6 pt-12 pb-32">
       <header className="flex justify-between items-center mb-10">
         <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center text-ink-primary shadow-sm hover:scale-110 transition-transform">
               <ChevronLeft size={20} />
            </button>
            <Logo size={40} />
         </div>
         <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-full text-[9px] font-black text-white uppercase tracking-widest border border-white/10 shadow-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Neural Audit Active
         </div>
      </header>

      <main className="space-y-8 flex-1">
         <div className="space-y-2">
            <h2 className="text-display-m text-3xl font-black text-ink-primary tracking-tight italic">Transparency Oracle</h2>
            <p className="text-[11px] font-bold text-ink-secondary uppercase tracking-widest leading-relaxed max-w-[280px]">
               Real-time visibility into the <span className="text-primary italic">actuarial decision logic</span> governing your protection.
            </p>
         </div>

         {/* Decision Core Visualization */}
         <Card className="p-8 bg-slate-900 border-none rounded-[40px] relative overflow-hidden shadow-2xl">
            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="relative">
                   <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-32 h-32 border-2 border-dashed border-white/10 rounded-full" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-primary/20 backdrop-blur-xl rounded-full border border-primary/30 flex items-center justify-center text-primary">
                         <Brain size={40} />
                      </div>
                   </div>
                   {/* Orbiting nodes */}
                   {[0, 120, 240].map((deg, i) => (
                     <motion.div 
                        key={i}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', marginLeft: '-50%', transform: `rotate(${deg}deg)` }}
                     >
                        <div className="w-3 h-3 bg-white rounded-full border-2 border-slate-900 -mt-1.5 ml-[95%] shadow-[0_0_10px_white]" />
                     </motion.div>
                   ))}
                </div>
                <div className="text-center space-y-1">
                   <div className="text-[10px] font-bold text-white/60 uppercase tracking-[0.3em]">Decision Engine</div>
                   <div className="text-xl font-black text-white italic">Oracle Stability 99.2%</div>
                </div>
            </div>
            {/* Background math/code snippets */}
            <div className="absolute inset-0 opacity-10 pointer-events-none p-4 text-[8px] font-mono text-white overflow-hidden leading-tight">
               if (hazard.sector == rider.sector) &#123; <br />
               &nbsp;&nbsp;mesh_sync(node_id); <br />
               &nbsp;&nbsp;actuary.coeff += 0.24; <br />
               &#125; <br />
               validate_node_trust(rider.reliability); <br />
               payout_trigger(threshold.storm_4);
            </div>
         </Card>

         {/* The Live Audit Log */}
         <section className="space-y-4">
            <div className="flex justify-between items-center px-1">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-ink-secondary flex items-center gap-2">
                 <Terminal size={14} className="text-primary" /> Actuarial Stream
               </h3>
               <button onClick={() => setLogs([])} className="text-[8px] font-bold text-ink-secondary hover:text-ink-primary uppercase tracking-widest border border-border-light px-2 py-1 rounded-md transition-all">Clear Stream</button>
            </div>
            
            <Card className="bg-slate-50 border-border-light rounded-[32px] overflow-hidden flex flex-col h-[380px] shadow-inner">
               <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
                  <AnimatePresence>
                     {logs.map((log) => (
                       <motion.div 
                          key={log.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start gap-4 p-3 bg-white border border-border-light rounded-2xl shadow-sm"
                       >
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                            log.type === 'INFO' ? "bg-slate-50 text-slate-400" : log.type === 'ACTION' ? "bg-primary/10 text-primary" : "bg-red-50 text-red-500"
                          )}>
                             {log.type === 'INFO' ? <Info size={14} /> : log.type === 'ACTION' ? <Zap size={14} /> : <AlertCircle size={14} />}
                          </div>
                          <div className="flex-1 space-y-1">
                             <div className="flex justify-between items-center">
                                <span className="text-[8px] font-black text-ink-secondary font-mono">{log.timestamp}</span>
                                <span className="text-[8px] font-bold text-ink-secondary uppercase tracking-widest px-1.5 py-0.5 border border-border-light rounded">{log.code}</span>
                             </div>
                             <div className="text-[10px] font-bold text-ink-primary leading-tight">{log.message}</div>
                          </div>
                       </motion.div>
                     ))}
                  </AnimatePresence>
                  <div ref={logEndRef} />
               </div>
               
               {/* Terminal Status Footer */}
               <div className="p-4 bg-white border-t border-border-light flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse" />
                     <span className="text-[8px] font-bold text-ink-secondary uppercase tracking-[0.2em]">Node-Link Active</span>
                  </div>
                  <div className="text-[9px] font-black text-slate-900 italic tracking-widest bg-slate-100 px-3 py-1 rounded-full uppercase">
                    Audit P2P Secure
                  </div>
               </div>
            </Card>
         </section>

         <div className="p-8 bg-white border border-border-light rounded-[40px] flex items-center gap-6 group shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
               <Shield size={24} />
            </div>
            <div className="space-y-1">
               <div className="text-xs font-black text-ink-primary italic uppercase tracking-wider">Transparent Protection</div>
               <p className="text-[10px] text-ink-secondary leading-relaxed font-bold">Your decisions are governed by open-source actuarial code. No hidden clauses.</p>
            </div>
         </div>
      </main>
    </MobileWrapper>
  );
}
