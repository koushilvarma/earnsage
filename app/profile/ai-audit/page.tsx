"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Shield, Zap, Activity, TrendingUp, AlertTriangle, CheckCircle2, Info, Brain, Gauge, Navigation, Watch } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { cn } from '@/lib/utils';

export default function AIAuditPage() {
  const router = useRouter();

  const metrics = [
    { label: "Braking G-Force", value: "0.42g", status: "Optimal", color: "text-emerald-500" },
    { label: "Cornering Lean", value: "24°", status: "Balanced", color: "text-emerald-500" },
    { label: "Predictive Intent", value: "88%", status: "High", color: "text-primary" },
  ];

  return (
    <MobileWrapper className="bg-surface-base flex flex-col min-h-screen px-6 pt-12 pb-12">
      <header className="flex items-center gap-4 mb-10">
         <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center text-ink-primary shadow-sm">
            <ChevronLeft size={20} />
         </button>
         <div>
            <h1 className="text-display-l text-2xl font-black">Neural Propensity</h1>
            <p className="text-[10px] font-bold text-ink-hint uppercase tracking-widest mt-1">Behavioral Risk Audit v1.0.4</p>
         </div>
      </header>

      <main className="flex-1 space-y-8">
         {/* Propensity Gauge Card */}
         <Card className="p-8 bg-slate-900 border-none rounded-[40px] relative overflow-hidden text-center space-y-6 shadow-2xl">
            <div className="relative z-10">
               <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-4">Risk Propensity Score</div>
               <div className="relative inline-block">
                  <svg viewBox="0 0 100 100" className="w-32 h-32 transform -rotate-90">
                     <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                     <motion.circle 
                       cx="50" cy="50" r="45" fill="none" stroke="#FF6B2B" strokeWidth="8" 
                       strokeDasharray="283"
                       initial={{ strokeDashoffset: 283 }}
                       animate={{ strokeDashoffset: 283 - (283 * 0.84) }}
                       transition={{ duration: 2, ease: "easeOut" }}
                     />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-mono-l text-4xl text-white">84</span>
                     <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Safe</span>
                  </div>
               </div>
               <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-[11px] text-white/60 leading-relaxed">
                     Your behavioral patterns indicate a **94th percentile** safety rating in the Koramangala sector.
                  </p>
               </div>
            </div>
            {/* Abstract Background */}
            <Brain className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-white/5" />
         </Card>

         {/* Behavioral Metrics Grid */}
         <div className="space-y-4">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-ink-hint px-2">Telemetric Insights</h3>
            <div className="grid grid-cols-1 gap-3">
               {metrics.map((m, i) => (
                 <div key={i} className="p-5 bg-white border border-border-light rounded-3xl flex justify-between items-center group hover:border-primary/30 transition-all">
                    <div className="flex gap-4 items-center">
                       <div className="w-10 h-10 rounded-2xl bg-surface-raised flex items-center justify-center text-ink-hint group-hover:text-primary transition-colors">
                          {i === 0 ? <Gauge size={20} /> : i === 1 ? <TrendingUp size={20} /> : <Brain size={20} />}
                       </div>
                       <div>
                          <div className="text-xs font-black text-ink-primary">{m.label}</div>
                          <div className="text-[9px] text-ink-hint uppercase font-bold tracking-widest">{m.status}</div>
                       </div>
                    </div>
                    <div className={cn("text-mono-l text-lg font-black", m.color)}>{m.value}</div>
                 </div>
               ))}
            </div>
         </div>

         {/* Optimization Suggestion */}
         <div className="p-6 bg-primary/5 border border-primary/10 rounded-[32px] flex gap-5 items-start">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg">
               <Zap size={24} />
            </div>
            <div className="space-y-2">
               <h4 className="text-xs font-black text-ink-primary uppercase tracking-widest">Neural Recommendation</h4>
               <p className="text-[11px] text-ink-muted leading-relaxed">
                  Based on your safety score, you qualify for **Tier-1 Premium Abatement**. Reduce your monthly cost by **₹120** while maintaining "The Wall" level protection.
               </p>
               <Button variant="link" className="p-0 h-auto text-[10px] font-black text-primary uppercase tracking-widest">Apply Optimization</Button>
            </div>
         </div>

         {/* Ingest Stream */}
         <div className="pt-4">
            <div className="flex justify-between items-center px-2 mb-4">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-ink-hint">Real-Time Sensor Mesh</h3>
               <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-bold text-emerald-500 uppercase">Streaming</span>
               </div>
            </div>
            <div className="p-4 bg-slate-900 rounded-3xl font-mono text-[9px] text-emerald-400/60 overflow-hidden h-24 relative">
               <div className="animate-pulse space-y-1">
                  <div>INGEST_HEX: 0x42_BEHAVIORAL_NODE_921</div>
                  <div>G_FORCE_X: 0.12 | G_FORCE_Y: -0.04 | L_FORCE_Z: 0.88</div>
                  <div>PREDICT_INTENT: DECELERATION_EXPECTED [0.94]</div>
                  <div>GEOLOC: 12.934, 77.611 [KRM_SEC_04]</div>
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
            </div>
         </div>
      </main>

      <footer className="mt-8">
         <Button 
           onClick={() => router.push('/dashboard')}
           className="w-full h-16 bg-white border-2 border-ink-primary text-primary hover:bg-ink-primary hover:text-white transition-all uppercase tracking-[0.2em] font-black rounded-2xl shadow-md"
         >
           Export Neural Report
         </Button>
      </footer>
    </MobileWrapper>
  );
}
