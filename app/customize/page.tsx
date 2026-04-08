"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Shield, Zap, Target, ArrowRight, Info, CheckCircle2, Sparkles, HelpCircle, Brain, ShieldCheck, Wind, Target as TargetIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { cn } from '@/lib/utils';

export default function PolicyCustomizer() {
  const router = useRouter();
  const [coverage, setCoverage] = useState(1500);
  const [sensitivity, setSensitivity] = useState(50); // 0: Robust, 100: Sensitive
  const [premium, setPremium] = useState(49);
  const [activeLoadout, setActiveLoadout] = useState<'defender' | 'pulse' | 'oracle'>('pulse');

  // Live Pricing Logic
  useEffect(() => {
    const base = 49;
    const coverageCost = (coverage - 500) / 10; // ₹0.1 per ₹1 extra coverage
    const sensitivityCost = (sensitivity / 10) * 2; // ₹2 per 10% sensitivity increase
    setPremium(Math.round(base + coverageCost + sensitivityCost));
  }, [coverage, sensitivity]);

  const stats = [
    { label: "Armor Density", val: (coverage / 5000) * 100, color: "bg-emerald-500" },
    { label: "Neural Edge", val: sensitivity, color: "bg-primary" },
    { label: "Economy Core", val: Math.max(0, 100 - (premium / 200) * 100), color: "bg-blue-500" }
  ];

  const applyLoadout = (type: 'defender' | 'pulse' | 'oracle') => {
    setActiveLoadout(type);
    if (type === 'defender') { setCoverage(5000); setSensitivity(20); }
    if (type === 'pulse') { setCoverage(2500); setSensitivity(60); }
    if (type === 'oracle') { setCoverage(800); setSensitivity(95); }
  };

  return (
    <MobileWrapper className="bg-surface-base px-6 pt-8 pb-40 min-h-screen overflow-x-hidden">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center text-ink-primary shadow-sm">
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-display-l text-2xl font-black italic">Dynamic Armor</h1>
          <div className="text-[9px] font-black text-ink-secondary uppercase tracking-[0.2em] flex items-center gap-2">
            <Shield size={10} className="text-primary" /> Equipping Protection Node
          </div>
        </div>
      </header>

      <main className="space-y-8">
         {/* Armor Presets / Loadouts */}
         <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-ink-secondary px-1">Select Loadout</h3>
            <div className="grid grid-cols-3 gap-3">
               {[
                 { id: 'defender', label: 'Defender', icon: ShieldCheck, detail: 'Max Cover' },
                 { id: 'pulse', label: 'Balanced', icon: Wind, detail: 'Optimum' },
                 { id: 'oracle', label: 'Oracle', icon: TargetIcon, detail: 'High Sens' }
               ].map((l) => (
                 <button 
                    key={l.id} 
                    onClick={() => applyLoadout(l.id as any)}
                    className={cn(
                      "flex flex-col items-center gap-3 p-4 rounded-3xl border transition-all",
                      activeLoadout === l.id ? "bg-slate-900 border-none shadow-xl scale-[1.05]" : "bg-white border-border-light hover:border-primary/40"
                    )}
                 >
                    <div className={cn(
                      "w-10 h-10 rounded-2xl flex items-center justify-center",
                      activeLoadout === l.id ? "bg-primary text-white" : "bg-slate-50 text-ink-secondary"
                    )}>
                       <l.icon size={20} />
                    </div>
                    <div className="text-center">
                       <div className={cn("text-[9px] font-black uppercase tracking-tight", activeLoadout === l.id ? "text-white" : "text-ink-primary")}>{l.label}</div>
                       <div className={cn("text-[7px] font-bold uppercase tracking-[0.1em]", activeLoadout === l.id ? "text-white/60" : "text-ink-secondary")}>{l.detail}</div>
                    </div>
                 </button>
               ))}
            </div>
         </section>

         {/* Neural Stats Dashboard */}
         <Card className="p-8 bg-white border-border-light rounded-[40px] shadow-sm space-y-6">
            <div className="flex justify-between items-center mb-2">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-ink-secondary">Neural Stats</h3>
               <div className="text-[9px] font-black text-primary italic bg-primary/5 px-2 py-0.5 rounded-full">v3.0 Secure</div>
            </div>
            <div className="space-y-4">
               {stats.map((s, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                       <span className="text-[9px] font-bold uppercase tracking-widest text-ink-primary">{s.label}</span>
                       <span className="text-[9px] font-black text-ink-primary">{Math.round(s.val)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${s.val}%` }}
                          className={cn("h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]", s.color)} 
                       />
                    </div>
                 </div>
               ))}
            </div>
         </Card>

        {/* Live Pricing Display */}
        <Card className="p-8 bg-slate-900 text-white border-none relative overflow-hidden shadow-2xl rounded-[40px]">
           <div className="relative z-10 flex flex-col items-center text-center space-y-2">
              <div className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em]">Weekly Payout Cap</div>
              <motion.div 
                key={premium}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-display-l text-5xl flex items-baseline gap-1 italic"
              >
                 <span className="text-2xl font-normal text-primary">₹</span>
                 {premium}
              </motion.div>
              <div className="px-4 py-1.5 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-widest mt-4 flex items-center gap-2 border border-white/10">
                 <Zap size={10} className="text-primary fill-primary" /> Instant Parametric
              </div>
           </div>
           
           {/* Animated Background Atoms */}
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
             className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10"
           >
              <div className="w-[300px] h-[300px] border border-white rounded-full" />
              <div className="w-[350px] h-[350px] border-2 border-dashed border-white rounded-full absolute" />
           </motion.div>
        </Card>

        {/* Customization Sliders */}
        <section className="space-y-8 py-4">
           {/* Coverage Slider */}
           <div className="space-y-4">
              <div className="flex justify-between items-end px-1">
                 <div className="space-y-1">
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-ink-primary flex items-center gap-2 italic">
                       <Shield size={14} className="text-primary" /> Coverage Shard
                    </h3>
                    <p className="text-[9px] text-ink-secondary font-bold uppercase tracking-widest">Max payout per incident</p>
                 </div>
                 <div className="text-right">
                    <div className="text-mono font-black text-xl italic text-ink-primary">₹{coverage}</div>
                 </div>
              </div>
              <input 
                type="range" min="500" max="5000" step="100" value={coverage} 
                onChange={(e) => { setCoverage(parseInt(e.target.value)); setActiveLoadout(null as any); }}
                className="w-full h-2 bg-slate-100 rounded-full appearance-none accent-primary cursor-pointer"
              />
           </div>

           {/* Risk Sensitivity Slider */}
           <div className="space-y-4">
              <div className="flex justify-between items-end px-1">
                 <div className="space-y-1">
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-ink-primary flex items-center gap-2 italic">
                       <Target size={14} className="text-primary" /> Neural Buffer
                    </h3>
                    <p className="text-[9px] text-ink-secondary font-bold uppercase tracking-widest">Trigger sensitivity threshold</p>
                 </div>
                 <div className="text-right">
                    <div className="text-[10px] font-black text-primary uppercase tracking-widest italic">
                       {sensitivity < 30 ? "Robust" : sensitivity < 70 ? "Balanced" : "Ultra-Sensitive"}
                    </div>
                 </div>
              </div>
              <input 
                type="range" min="0" max="100" step="1" value={sensitivity} 
                onChange={(e) => { setSensitivity(parseInt(e.target.value)); setActiveLoadout(null as any); }}
                className="w-full h-2 bg-slate-100 rounded-full appearance-none accent-primary cursor-pointer"
              />
           </div>
        </section>

        {/* AI Smart Optimizer */}
        <div className="p-8 bg-slate-900 border-none rounded-[40px] space-y-6 relative overflow-hidden group shadow-2xl">
           <div className="relative z-10 flex justify-between items-start">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-lg">
                    <Brain size={24} />
                 </div>
                 <div>
                    <h4 className="text-white text-sm font-black uppercase tracking-widest italic">Neural Auto-Tune</h4>
                    <p className="text-[9px] text-white/60 font-bold uppercase tracking-widest">Powered by Oracle v3.0</p>
                 </div>
              </div>
           </div>
           
           <div className="relative z-10 space-y-3">
              <p className="text-[10px] text-white/70 leading-relaxed font-bold uppercase tracking-widest">
                 The Neural engine recommends the <span className="text-primary italic font-black">Pulse Loadout</span> based on Sector_08 entropy.
              </p>
              <Button 
                onClick={() => applyLoadout('pulse')}
                className="w-full h-12 bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest hover:bg-white/10"
              >
                 Apply AI Recommendation
              </Button>
           </div>
           
           <Sparkles className="absolute right-[-10px] top-[-10px] w-24 h-24 text-white/5 rotate-12" />
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-6 pb-12 bg-gradient-to-t from-surface-base via-surface-base to-transparent flex flex-col items-center z-50">
         <Button 
           onClick={() => router.push('/dashboard')}
           className="w-full h-16 uppercase tracking-widest group shadow-2xl bg-primary hover:bg-primary/90 text-white border-none rounded-3xl font-black italic"
         >
            Initialize Armor Sync <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
         </Button>
      </footer>
    </MobileWrapper>
  );
}
