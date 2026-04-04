"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Wallet, ArrowRight, ChevronLeft, Info, Landmark, Activity, User, CheckCircle2, CloudRain, Clock, Radio, RefreshCcw } from 'lucide-react';
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
];

export default function PayoutsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'my' | 'community'>('my');
  const [profile, setProfile] = useState<any>(null);
  const [verifying, setVerifying] = useState(false);
  const [claimStatus, setClaimStatus] = useState<'idle' | 'processing' | 'done'>('idle');
  const [payoutResult, setPayoutResult] = useState<any>(null);

  useEffect(() => {
    fetch('/api/profile').then(res => res.json()).then(setProfile).catch(() => {});
  }, []);

  const handleManualClaim = async () => {
    setVerifying(true);
    setClaimStatus('processing');
    
    try {
      const res = await fetch('/api/payouts/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claimId: 'CLM-9128', type: 'WEATHER', location: 'Bengaluru East' })
      });
      const data = await res.json();
      
      if (data.success) {
        setPayoutResult(data);
        // functional credit
        await fetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletBalance: (profile?.walletBalance || 500) + data.amount })
        });
        // refresh profile
        fetch('/api/profile').then(res => res.json()).then(setProfile).catch(() => {});
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        setClaimStatus('done');
        setVerifying(false);
      }, 1000);
    }
  };

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
         <Card className="p-5 bg-ink-primary text-white border-none space-y-4 relative overflow-hidden">
            <div className="relative z-10">
                <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Your Balance</div>
                <div className="text-mono-l text-2xl">₹{profile?.walletBalance?.toFixed(2) || '500.00'}</div>
                <div className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest">Verified Payout Pot</div>
            </div>
            <Zap className="absolute right-[-10px] bottom-[-10px] w-20 h-20 text-white/5" />
         </Card>
         <Card className="p-5 bg-white border border-border-light space-y-4">
            <div className="text-[9px] font-bold text-ink-hint uppercase tracking-widest">Community Pot</div>
            <div className="text-mono-l text-2xl">₹2.4M</div>
            <div className="text-[8px] text-primary font-bold uppercase tracking-widest">Solvency 210%</div>
         </Card>
      </div>

      {/* Manual Claim Oracle (For Demo) */}
      <div className="mb-8 p-6 bg-slate-900 rounded-[32px] border border-white/10 shadow-2xl relative overflow-hidden">
         <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
               <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Neural Oracle Verification</div>
               <Radio size={14} className="text-emerald-400 animate-pulse" />
            </div>
            
            <AnimatePresence mode="wait">
               {claimStatus === 'idle' && (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                     <div className="text-xs text-white/60 leading-relaxed font-bold">
                        A critical rainfall outrage is detected in your sector via 1,248 active mesh nodes.
                     </div>
                     <Button 
                       onClick={handleManualClaim}
                       className="w-full h-12 bg-primary text-white uppercase font-black tracking-widest text-[10px] rounded-xl hover:bg-orange-600 transition-all"
                     >
                        Verify & Payout ₹400.00
                     </Button>
                  </motion.div>
               )}

               {claimStatus === 'processing' && (
                  <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-2 space-y-4 text-center">
                     <div className="flex justify-center">
                        <RefreshCcw className="text-primary animate-spin" size={32} />
                     </div>
                     <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest animate-pulse">
                        Cross-Referencing Mesh Telemetry...
                     </div>
                  </motion.div>
               )}

               {claimStatus === 'done' && (
                  <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                           <CheckCircle2 size={18} />
                        </div>
                        <div className="text-[10px] font-black text-white uppercase tracking-widest">VERIFIED SUCCESSFUL</div>
                     </div>
                     <div className="p-3 bg-white/5 rounded-xl border border-white/10 font-mono text-[9px] text-white/40 space-y-1">
                        <div>ID: {payoutResult?.payoutId}</div>
                        <div>SIGNAL STRENGTH: {payoutResult?.meshSnapshot?.signalStrength}</div>
                        <div>NODES_CONFIRMED: {payoutResult?.meshSnapshot?.nodesActive}</div>
                     </div>
                     <div className="text-center py-2 text-white font-black uppercase text-xs tracking-widest">
                        ₹{payoutResult?.amount?.toFixed(2)} Credited to Balance
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
         <div className="absolute top-0 right-0 p-4 opacity-5">
            <Activity className="w-32 h-32 text-white" />
         </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-raised p-1 rounded-2xl border border-border-light mb-8">
         <button onClick={() => setTab('my')} className={cn("flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all", tab === 'my' ? "bg-white text-ink-primary shadow-sm" : "text-ink-hint")}>My History</button>
         <button onClick={() => setTab('community')} className={cn("flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2", tab === 'community' ? "bg-white text-ink-primary shadow-sm" : "text-ink-hint")}><Activity size={14} /> Public Ledger</button>
      </div>

      <AnimatePresence mode="wait">
         {tab === 'community' ? (
            <motion.div key="community" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
               {mockLedger.map((item, i) => (
                 <div key={item.id} className="bg-white p-5 rounded-3xl border border-border-light flex items-center justify-between group hover:border-emerald-500/30 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-surface-raised flex items-center justify-center text-ink-hint font-mono text-[9px] font-black group-hover:bg-emerald-500 group-hover:text-white transition-colors">{item.riderId}</div>
                       <div>
                          <div className="text-xs font-black text-ink-primary">₹{item.amount} <span className="text-[10px] text-ink-hint font-bold uppercase tracking-widest ml-1">Paid</span></div>
                          <div className="text-[9px] text-ink-muted mt-0.5">{item.reason} · {item.sector}</div>
                       </div>
                    </div>
                 </div>
               ))}
            </motion.div>
         ) : (
            <motion.div key="my" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
               {payoutResult ? (
                  <div className="bg-white p-6 rounded-[32px] border border-emerald-500/30 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500"><CloudRain size={24} /></div>
                        <div>
                           <div className="font-black text-sm">₹{payoutResult.amount.toFixed(2)}</div>
                           <div className="text-[10px] font-bold text-ink-hint uppercase tracking-widest">Parametric Weather Claim</div>
                        </div>
                     </div>
                     <div className="text-[9px] font-black text-emerald-500 uppercase">Settled</div>
                  </div>
               ) : (
                  <div className="text-center py-12 space-y-4">
                     <div className="w-20 h-20 rounded-[32px] bg-surface-raised border border-border-light mx-auto flex items-center justify-center text-ink-hint"><CloudRain size={32} /></div>
                     <h3 className="text-lg font-black text-ink-primary">No Activity Logged</h3>
                     <p className="text-xs text-ink-muted max-w-[200px] mx-auto mt-2">Activate Safe Mode to start automated tracking for your session.</p>
                  </div>
               )}
            </motion.div>
         )}
      </AnimatePresence>
    </MobileWrapper>
  );
}
