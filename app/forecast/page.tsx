"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CloudRain, Wind, Zap, Info, Calendar, ArrowRight, TrendingUp, Gauge, AlertCircle, CheckCircle2, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { cn } from '@/lib/utils';

const weekForecast = [
  { day: 'Mon', date: 'Mar 24', prob: 20, type: 'Clear', color: 'text-status-success', confidence: 94 },
  { day: 'Tue', date: 'Mar 25', prob: 45, type: 'Cloudy', color: 'text-status-warning', confidence: 88 },
  { day: 'Wed', date: 'Mar 26', prob: 82, type: 'Rainfall', color: 'text-status-danger', confidence: 91 },
  { day: 'Thu', date: 'Mar 27', prob: 65, type: 'Shower', color: 'text-status-warning', confidence: 85 },
  { day: 'Fri', date: 'Mar 28', prob: 30, type: 'Clear', color: 'text-status-success', confidence: 96 },
  { day: 'Sat', date: 'Mar 29', prob: 15, type: 'Clear', color: 'text-status-success', confidence: 98 },
  { day: 'Sun', date: 'Mar 30', prob: 90, type: 'Heavy Rain', color: 'text-status-danger', confidence: 89 },
];

export default function PayoutForecast() {
  const router = useRouter();
  const [simulatedRain, setSimulatedRain] = useState(12);
  const threshold = 20;

  return (
    <MobileWrapper className="bg-surface-base px-6 pt-8 pb-40 min-h-screen">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary">
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-display-l">Oracle Hub</h1>
          <div className="text-[10px] font-bold text-ink-hint uppercase tracking-widest italic flex items-center gap-1.5">
            <TrendingUp size={10} className="text-primary" /> Predictive Intelligence
          </div>
        </div>
      </header>

      <main className="space-y-8">
        {/* ML Prediction Banner */}
        {/* Monte Carlo Simulator Hero */}
        <Card className="p-8 bg-slate-900 border-none rounded-[40px] text-center space-y-8 relative overflow-hidden shadow-2xl">
           <div className="relative z-10">
              <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-4">Monte Carlo Simulator</div>
              <div className="text-display-l text-white text-3xl mb-1">₹842.00</div>
              <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Expected Weekly Payout</div>
           </div>

           {/* Probabilistic Bell Curve (SVG) */}
           <div className="relative h-32 w-full group">
              <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
                 <defs>
                    <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="#FF6B2B" stopOpacity="0.4" />
                       <stop offset="100%" stopColor="#FF6B2B" stopOpacity="0" />
                    </linearGradient>
                 </defs>
                 <motion.path 
                   d="M0,90 Q50,90 80,40 T120,40 T200,90" 
                   fill="url(#curveGradient)" stroke="#FF6B2B" strokeWidth="2"
                   initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }}
                 />
                 <line x1="80" y1="20" x2="80" y2="95" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.2" />
                 <line x1="120" y1="20" x2="120" y2="95" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.2" />
                 <motion.line x1="100" y1="20" x2="100" y2="95" stroke="#FF6B2B" strokeWidth="1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
              </svg>
              <div className="absolute inset-0 flex justify-between items-end px-4 text-[7px] font-bold text-white/20 uppercase tracking-widest pb-2">
                 <span>95% CI (Min)</span>
                 <span>95% CI (Max)</span>
              </div>
           </div>

           <div className="flex justify-between items-center bg-white/5 border border-white/10 p-5 rounded-3xl relative z-10">
              <div className="text-left">
                 <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Confidence Interval</div>
                 <div className="text-sm font-black text-white">₹640 — ₹1240</div>
              </div>
              <div className="text-right">
                 <div className="text-[9px] font-bold text-primary uppercase tracking-widest">Reliability</div>
                 <div className="text-sm font-black text-white">High (82.7%)</div>
              </div>
           </div>
           
           <Shield className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-white/5 opacity-10" />
        </Card>

        {/* Oracle Simulator Tool */}
        <section className="space-y-4">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted px-1 flex items-center gap-2">
              <Gauge size={14} /> What-If Trigger Simulator
           </h3>
           <Card className="p-6 border-border-light shadow-lg bg-white overflow-hidden relative">
              <div className="space-y-6 relative z-10">
                 <div className="flex justify-between items-end">
                    <div>
                       <div className="text-[9px] font-bold text-ink-hint uppercase tracking-widest mb-1">Simulated Rain Intensity</div>
                       <div className="text-mono-xl text-3xl text-ink-primary">
                          {simulatedRain} <span className="text-sm font-normal text-ink-muted">mm/hr</span>
                       </div>
                    </div>
                    <AnimatePresence mode="wait">
                       {simulatedRain >= threshold ? (
                         <motion.div 
                           key="triggered"
                           initial={{ scale: 0.8, opacity: 0 }}
                           animate={{ scale: 1, opacity: 1 }}
                           exit={{ scale: 0.8, opacity: 0 }}
                           className="px-3 py-1 bg-status-danger/10 text-status-danger border border-status-danger/20 rounded-lg flex items-center gap-2"
                         >
                            <CheckCircle2 size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Trigger Hit</span>
                         </motion.div>
                       ) : (
                         <motion.div 
                            key="monitoring"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="px-3 py-1 bg-surface-sunken text-ink-hint border border-border-light rounded-lg flex items-center gap-2"
                         >
                            <AlertCircle size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">In Range</span>
                         </motion.div>
                       )}
                    </AnimatePresence>
                 </div>

                 <input 
                   type="range" min="0" max="100" step="1" value={simulatedRain} 
                   onChange={(e) => setSimulatedRain(parseInt(e.target.value))}
                   className="w-full h-2 bg-surface-sunken rounded-full appearance-none accent-primary cursor-pointer"
                 />
                 
                 <div className="flex justify-between items-center text-[9px] font-bold text-ink-hint uppercase tracking-widest">
                    <span>Clear Sky</span>
                    <div className="relative group">
                       <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 px-2 py-1 bg-ink-primary text-white text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity">Threshold: 20mm</div>
                       <div className="w-1 h-3 bg-status-danger/40 rounded-full" />
                    </div>
                    <span>Heavy Storm</span>
                 </div>

                 {simulatedRain >= threshold && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-status-danger/5 rounded-2xl border border-status-danger/10"
                    >
                       <div className="text-[10px] font-bold text-status-danger uppercase tracking-widest flex items-center gap-2 mb-1">
                          <Zap size={12} className="fill-current" /> Auto-Payout Active
                       </div>
                       <p className="text-[10px] text-ink-muted leading-relaxed">
                         Intensity exceeds 20mm/hr. If verified by oracle hardware, a **₹400 Payout** is triggered instantly.
                       </p>
                    </motion.div>
                 )}
              </div>
           </Card>
        </section>

        {/* Weekly List */}
        <section className="space-y-4">
           <div className="flex justify-between items-center px-1">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted flex items-center gap-2">
                 <Calendar size={14} /> 7-Day Risk Band
              </h3>
              <div className="text-[9px] font-bold text-ink-hint uppercase tracking-widest">ML Confidence: 91.2%</div>
           </div>
           <div className="space-y-3">
              {weekForecast.map((day, i) => (
                <Card 
                  key={i} 
                  className={cn(
                    "p-5 flex justify-between items-center transition-all group",
                    day.prob > 80 ? "border-status-danger bg-status-danger/5" : "border-border-light hover:border-primary/40"
                  )}
                >
                   <div className="flex items-center gap-4">
                      <div className="text-center w-10">
                         <div className="text-[10px] font-bold uppercase text-ink-hint">{day.day}</div>
                         <div className="text-xs font-mono font-bold text-ink-primary">{day.date.split(' ')[1]}</div>
                      </div>
                      <div className="h-8 w-[1px] bg-surface-sunken" />
                      <div>
                         <div className="text-xs font-bold text-ink-primary flex items-center gap-1.5">
                            {day.type}
                            {day.prob > 82 && <div className="w-1.5 h-1.5 bg-status-danger rounded-full animate-ping" />}
                         </div>
                         <div className={cn("text-[9px] font-bold uppercase tracking-widest", day.color)}>
                            {day.prob}% Prob
                         </div>
                      </div>
                   </div>
                   
                   <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1.5">
                         <div className="h-1 w-16 bg-surface-sunken rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} 
                              animate={{ width: `${day.prob}%` }} 
                              className={cn(
                                "h-full rounded-full",
                                day.prob > 80 ? "bg-status-danger" : day.prob > 40 ? "bg-status-warning" : "bg-status-success"
                              )}
                            />
                         </div>
                         <div className="text-[8px] font-mono text-ink-hint">{day.confidence}% </div>
                      </div>
                      {day.prob > 60 && <Zap size={10} className="text-primary fill-primary/20" />}
                   </div>
                </Card>
              ))}
           </div>
        </section>

        {/* Confidence Note */}
        <section className="p-6 bg-surface-raised border border-border-light rounded-[32px] space-y-3 relative overflow-hidden">
           <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                 <Info size={18} className="text-primary" />
                 <h4 className="text-caption font-bold text-ink-primary uppercase tracking-widest">Actuarial Convergence</h4>
              </div>
              <p className="text-[10px] text-ink-muted leading-relaxed">
                Predictions are generated by merging localized IoT mesh data with Guidewire historical claim variance. Accuracy increases as real-time monsoon fronts approach.
              </p>
           </div>
           <CloudRain className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-primary/5 -rotate-12" />
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-6 pb-12 bg-gradient-to-t from-surface-base via-surface-base to-transparent flex flex-col items-center">
         <Button className="w-full h-14 uppercase tracking-widest group shadow-cta bg-[#FF6B2B] hover:bg-[#E8571A] text-white border-none">
           Register For High-Risk Alerts <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
         </Button>
      </footer>
    </MobileWrapper>
  );
}
