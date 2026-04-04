"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Wallet, ArrowRight, ChevronLeft, Info, Landmark, Activity, User, CheckCircle2, CloudRain, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { cn } from '@/lib/utils';

const mockLedger = [
  { id: 1, riderId: "#8291", amount: "400.00", reason: "Critical Rainfall", sector: "Koramangala", time: "Just Now", status: "Settled" },
  { id: 2, riderId: "#0842", amount: "250.00", reason: "AQI Delta Breach", sector: "Bengaluru South", time: "3m ago", status: "Settled" },
  { id: 3, riderId: "#1104", amount: "400.00", reason: "Critical Rainfall", sector: "Koramangala", time: "12m ago", status: "Settled" },
  { id: 4, riderId: "#9921", amount: "150.00", reason: "Moderate Flood", sector: "Indiranagar", time: "25m ago", status: "Settled" },
  { id: 5, riderId: "#4402", amount: "400.00", reason: "AQI + Heatwave", sector: "Whitefield", time: "45m ago", status: "Settled" },
  { id: 6, riderId: "#1293", amount: "200.00", reason: "Civic Disruption", sector: "MG Road", time: "1h ago", status: "Settled" },
];

export default function PayoutsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'my' | 'community'>('my');

  return (
    <MobileWrapper withNav className="bg-surface-base px-6 pt-12 pb-32 overflow-y-auto">
      <header className="mb-8 flex justify-between items-center">
         <div>
            <h1 className="text-display-l leading-none">Earnings Shield</h1>
            <p className="text-[10px] font-bold text-ink-hint uppercase tracking-widest mt-2">Parametric Settlement Node</p>
         </div>
         <div className="w-12 h-12 rounded-2xl bg-white border border-border-light shadow-sm flex items-center justify-center">
            <Wallet size={24} className="text-primary" />
         </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
         <Card className="p-5 bg-ink-primary text-white border-none space-y-4">
            <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Your Balance</div>
            <div className="text-mono-l text-2xl">₹1,600</div>
            <div className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest">+₹400 today</div>
         </Card>
         <Card className="p-5 bg-white border border-border-light space-y-4">
            <div className="text-[9px] font-bold text-ink-hint uppercase tracking-widest">Community Pot</div>
            <div className="text-mono-l text-2xl">₹2.4M</div>
            <div className="text-[8px] text-primary font-bold uppercase tracking-widest">Solvency 210%</div>
         </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-raised p-1 rounded-2xl border border-border-light mb-8">
         <button 
           onClick={() => setTab('my')}
           className={cn(
             "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
             tab === 'my' ? "bg-white text-ink-primary shadow-sm" : "text-ink-hint"
           )}
         >
           My History
         </button>
         <button 
           onClick={() => setTab('community')}
           className={cn(
             "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2",
             tab === 'community' ? "bg-white text-ink-primary shadow-sm" : "text-ink-hint"
           )}
         >
           <Activity size={14} /> Public Ledger
         </button>
      </div>

      <AnimatePresence mode="wait">
         {tab === 'community' ? (
           <motion.div 
             key="community"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             className="space-y-4"
           >
              <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl flex gap-4 mb-6">
                 <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                 <p className="text-[11px] text-ink-muted leading-relaxed">
                   The public ledger is a non-rewritable log of all payouts. This ensures every rider's fund is used fairly and transparently.
                 </p>
              </div>

              <div className="space-y-3">
                 {mockLedger.map((item, i) => (
                   <motion.div 
                     key={item.id}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.05 }}
                     className="bg-white p-5 rounded-3xl border border-border-light flex items-center justify-between group hover:border-emerald-500/30 transition-colors"
                   >
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-surface-raised flex items-center justify-center text-ink-hint font-mono text-[9px] font-black group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            {item.riderId}
                         </div>
                         <div>
                            <div className="text-xs font-black text-ink-primary">₹{item.amount} <span className="text-[10px] text-ink-hint font-bold uppercase tracking-widest ml-1">Paid</span></div>
                            <div className="text-[9px] text-ink-muted mt-0.5">{item.reason} · {item.sector}</div>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="text-[9px] font-bold text-ink-hint flex items-center gap-1 justify-end">
                            <Clock size={10} /> {item.time}
                         </div>
                         <div className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Settled</div>
                      </div>
                   </motion.div>
                 ))}
              </div>
           </motion.div>
         ) : (
           <motion.div 
             key="my"
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: 20 }}
             className="space-y-4"
           >
              {/* My Payouts Content */}
              <div className="text-center py-12 space-y-4">
                 <div className="w-20 h-20 rounded-[32px] bg-surface-raised border border-border-light mx-auto flex items-center justify-center text-ink-hint">
                    <CloudRain size={32} />
                 </div>
                 <div>
                    <h3 className="text-lg font-black text-ink-primary">No Payouts Today</h3>
                    <p className="text-xs text-ink-muted max-w-[200px] mx-auto mt-2">Activate Safe Mode to start automated tracking for your session.</p>
                 </div>
                 <Button onClick={() => router.push('/rider-safe-mode')} className="h-14 bg-ink-primary text-white uppercase tracking-widest text-[10px] font-black rounded-2xl shadow-xl">
                    Enter Safe Mode
                 </Button>
              </div>
           </motion.div>
         )}
      </AnimatePresence>

      <div className="mt-12 p-8 bg-surface-raised border border-border-light rounded-[40px] text-center space-y-6">
         <div className="text-[10px] font-black text-ink-hint uppercase tracking-[0.4em]">Solvency Audit</div>
         <div className="flex justify-center gap-4">
            <div className="px-4 py-2 bg-white rounded-2xl border border-border-light text-[9px] font-black flex items-center gap-2">
               <Shield size={14} className="text-primary" /> IRDAI Sandboxed
            </div>
            <div className="px-4 py-2 bg-white rounded-2xl border border-border-light text-[9px] font-black flex items-center gap-2">
               <Landmark size={14} className="text-ink-primary" /> Swiss Re Treaty
            </div>
         </div>
      </div>
    </MobileWrapper>
  );
}
