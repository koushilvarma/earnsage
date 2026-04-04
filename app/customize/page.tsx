"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Shield, Zap, Target, ArrowRight, Info, CheckCircle2, Sparkles, HelpCircle, Brain } from 'lucide-react';
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

  // Live Pricing Logic
  useEffect(() => {
    const base = 49;
    const coverageCost = (coverage - 500) / 10; // ₹0.1 per ₹1 extra coverage
    const sensitivityCost = (sensitivity / 10) * 2; // ₹2 per 10% sensitivity increase
    setPremium(Math.round(base + coverageCost + sensitivityCost));
  }, [coverage, sensitivity]);

  return (
    <MobileWrapper className="bg-surface-base px-6 pt-8 pb-40 min-h-screen">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary">
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-display-l">Custom Armor</h1>
          <div className="text-[10px] font-bold text-ink-hint uppercase tracking-widest italic flex items-center gap-2">
            <Sparkles size={10} className="text-primary" /> Personalized Protection
          </div>
        </div>
      </header>

      <main className="space-y-8">
        {/* Live Pricing Display */}
        <Card className="p-8 bg-slate-900 text-white border-none relative overflow-hidden shadow-2xl">
           <div className="relative z-10 flex flex-col items-center text-center space-y-2">
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Estimated Premium</div>
              <motion.div 
                key={premium}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-mono-xl text-5xl flex items-baseline gap-1"
              >
                 <span className="text-2xl font-normal text-primary">₹</span>
                 {premium}
                 <span className="text-sm font-normal text-white/40 font-sans uppercase">/Week</span>
              </motion.div>
              <div className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-[8px] font-bold uppercase tracking-widest mt-2">
                 Best Value Plan
              </div>
           </div>
           
           {/* Animated Background Atoms */}
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
             className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20"
           >
              <div className="w-[300px] h-[300px] border border-white/5 rounded-full" />
              <div className="w-[350px] h-[350px] border border-white/5 rounded-full absolute" />
           </motion.div>
        </Card>

        {/* Customization Sliders */}
        <section className="space-y-8 py-4">
           {/* Coverage Slider */}
           <div className="space-y-4">
              <div className="flex justify-between items-end px-1">
                 <div className="space-y-1">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-ink-primary flex items-center gap-2">
                       <Shield size={14} className="text-primary" /> Coverage Cap
                    </h3>
                    <p className="text-[9px] text-ink-hint max-w-[180px]">The maximum payout amount for a single trigger event.</p>
                 </div>
                 <div className="text-right">
                    <div className="text-mono-l text-lg text-ink-primary">₹{coverage}</div>
                 </div>
              </div>
              <input 
                type="range" min="500" max="5000" step="100" value={coverage} 
                onChange={(e) => setCoverage(parseInt(e.target.value))}
                className="w-full h-2 bg-surface-sunken rounded-full appearance-none accent-[#FF6B2B] cursor-pointer"
              />
              <div className="flex justify-between text-[8px] font-bold text-ink-hint uppercase tracking-widest">
                 <span>₹500</span>
                 <span>₹5000</span>
              </div>
           </div>

           {/* Risk Sensitivity Slider */}
           <div className="space-y-4">
              <div className="flex justify-between items-end px-1">
                 <div className="space-y-1">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-ink-primary flex items-center gap-2">
                       <Target size={14} className="text-primary" /> Risk Sensitivity
                    </h3>
                    <p className="text-[9px] text-ink-hint max-w-[180px]">How sensitive the trigger is to light rainfall fluctuations.</p>
                 </div>
                 <div className="text-right">
                    <div className="text-[10px] font-bold text-primary uppercase tracking-widest">
                       {sensitivity < 30 ? "Robust" : sensitivity < 70 ? "Balanced" : "Ultra-Sensitive"}
                    </div>
                 </div>
              </div>
              <div className="relative flex items-center h-2">
                <input 
                  type="range" min="0" max="100" step="1" value={sensitivity} 
                  onChange={(e) => setSensitivity(parseInt(e.target.value))}
                  className="w-full h-2 bg-surface-sunken rounded-full appearance-none accent-[#FF6B2B] cursor-pointer relative z-10"
                />
                <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
                   {[0, 25, 50, 75, 100].map(v => <div key={v} className="w-0.5 h-1.5 bg-border-mid/50 rounded-full" />)}
                </div>
              </div>
              <div className="flex justify-between text-[8px] font-bold text-ink-hint uppercase tracking-widest">
                 <span>Min</span>
                 <span>Max</span>
              </div>
           </div>
        </section>

        {/* Features Preview */}
        <section className="space-y-4">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted px-1">Included Benefits</h3>
           <div className="grid grid-cols-1 gap-3">
              {[
                { title: "Parametric Instant Pay", icon: Zap, detail: "Blockchain verified within 12 seconds" },
                { title: "Oracle Verification", icon: CheckCircle2, detail: "Dual-mesh IoT sensor validation" },
                { title: "Rider Safe Mode", icon: Shield, detail: "Autonomous voice alerts included" }
              ].map((benefit, i) => (
                <Card key={i} className="p-4 border-border-light bg-white flex items-center gap-4 group hover:border-primary/40 transition-all">
                   <div className="w-10 h-10 rounded-2xl bg-surface-raised border border-border-light flex items-center justify-center text-ink-muted group-hover:text-primary transition-colors">
                      <benefit.icon size={18} />
                   </div>
                   <div>
                      <div className="text-xs font-bold text-ink-primary">{benefit.title}</div>
                      <div className="text-[9px] text-ink-hint uppercase font-bold tracking-widest">{benefit.detail}</div>
                   </div>
                </Card>
              ))}
           </div>
        </section>

        {/* AI Smart Optimizer */}
        <section className="bg-slate-900 border-none p-8 rounded-[40px] space-y-6 relative overflow-hidden group shadow-2xl">
           <div className="relative z-10 flex justify-between items-start">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-lg">
                    <Brain size={24} />
                 </div>
                 <div>
                    <h4 className="text-white text-sm font-black uppercase tracking-widest">Neural Auto-Tune</h4>
                    <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Powered by Oracle v2.1</p>
                 </div>
              </div>
              <div className="flex items-center h-6">
                 <button 
                   onClick={() => {
                     setCoverage(2500);
                     setSensitivity(70);
                   }}
                   className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/10 border border-white/20 transition-all hover:bg-white/20"
                 >
                    <span className="sr-only">Enable AI Optimizer</span>
                    <span className="inline-block h-4 w-4 transform rounded-full bg-primary transition-all translate-x-1" />
                 </button>
              </div>
           </div>
           
           <div className="relative z-10 space-y-3">
              <p className="text-[11px] text-white/70 leading-relaxed">
                 The Neural engine identifies a <span className="text-white font-bold underline decoration-primary underline-offset-4">88% correlation</span> between your Sector [KRM_04] and the upcoming Monsoon Front. 
              </p>
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-[9px] text-primary font-black uppercase tracking-widest text-center animate-pulse">
                 Recommend: ₹2500 Coverage @ 70% Sensitivity
              </div>
           </div>

           {/* Abstract Neural background */}
           <Sparkles className="absolute right-[-10px] top-[-10px] w-24 h-24 text-white/5 rotate-12" />
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-6 pb-12 bg-gradient-to-t from-surface-base via-surface-base to-transparent flex flex-col items-center">
         <Button className="w-full h-14 uppercase tracking-widest group shadow-cta bg-[#FF6B2B] hover:bg-[#E8571A] text-white border-none rounded-2xl">
            Confirm Policy Armor <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
         </Button>
      </footer>
    </MobileWrapper>
  );
}
