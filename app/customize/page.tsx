"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Shield, Zap, Wind, CloudRain, Info, ArrowRight, Settings2, Sliders, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { cn } from '@/lib/utils';

export default function PolicyCustomizer() {
  const router = useRouter();
  const [basePremium, setBasePremium] = useState(49);
  const [riskAppetite, setRiskAppetite] = useState(2); // 1: Conservative, 2: Standard, 3: Aggressive
  const [selectedZones, setSelectedZones] = useState(['Central', 'East']);
  const [payoutMultiplier, setPayoutMultiplier] = useState(1.0);
  const [calculatedPremium, setCalculatedPremium] = useState(49);

  const zones = [
    { id: 'Central', risk: 1.2, name: 'Central Bengaluru' },
    { id: 'East', risk: 1.0, name: 'East / IT Corridors' },
    { id: 'South', risk: 0.8, name: 'South Bengaluru' },
    { id: 'West', risk: 1.1, name: 'West / Industrial' },
  ];

  useEffect(() => {
    let premium = basePremium;
    
    // Zone Multiplier
    const zoneMult = selectedZones.reduce((acc, zoneId) => {
      const zone = zones.find(z => z.id === zoneId);
      return acc + (zone ? zone.risk : 1);
    }, 0) / (selectedZones.length || 1);

    // Risk Appetite Multiplier
    const appetitMult = riskAppetite === 1 ? 0.8 : riskAppetite === 3 ? 1.4 : 1.0;

    // Payout Multiplier
    const payoutMult = payoutMultiplier;

    const final = basePremium * zoneMult * appetitMult * payoutMult;
    setCalculatedPremium(Math.round(final));
  }, [riskAppetite, selectedZones, payoutMultiplier, basePremium]);

  const toggleZone = (id: string) => {
    if (selectedZones.includes(id)) {
      setSelectedZones(selectedZones.filter(z => z !== id));
    } else {
      setSelectedZones([...selectedZones, id]);
    }
  };

  return (
    <MobileWrapper className="bg-surface-base flex flex-col min-h-screen">
      <header className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-display-l">Customize</h1>
        </div>
        <p className="text-body text-ink-muted">Fine-tune your protection based on your daily routes.</p>
      </header>

      <main className="flex-1 px-6 pt-8 space-y-10 pb-32">
        {/* Price Sticky Header Simulation */}
        <div className="sticky top-4 z-40 bg-ink-primary text-white p-6 rounded-[24px] shadow-2xl flex justify-between items-center overflow-hidden">
           <div>
              <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">Weekly Premium</div>
              <motion.div 
                key={calculatedPremium}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-mono-xl text-3xl"
              >
                ₹{calculatedPremium}
              </motion.div>
           </div>
           <Button className="bg-primary text-white border-none h-11 px-6 text-[10px] uppercase font-bold tracking-widest hover:bg-primary/90">
              Apply Plan
           </Button>
           <Shield className="absolute right-[-10px] top-[-10px] w-20 h-20 text-white/5 -rotate-12" />
        </div>

        {/* Risk Appetite */}
        <section className="space-y-4">
           <div className="flex justify-between items-end">
              <label className="text-heading text-sm">Risk Appetite</label>
              <div className="text-[10px] font-bold text-primary uppercase tracking-widest">
                 {riskAppetite === 1 ? 'Conservative' : riskAppetite === 2 ? 'Standard' : 'Aggressive'}
              </div>
           </div>
           <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((val) => (
                <button
                  key={val}
                  onClick={() => setRiskAppetite(val)}
                  className={cn(
                    "h-12 rounded-xl text-[10px] font-bold uppercase transition-all border-2",
                    riskAppetite === val ? "bg-ink-primary border-ink-primary text-white" : "bg-white border-border-light text-ink-muted"
                  )}
                >
                  {val === 1 ? 'Eco' : val === 2 ? 'Pro' : 'Elite'}
                </button>
              ))}
           </div>
           <p className="text-[10px] text-ink-hint italic">
              {riskAppetite === 3 ? "Elite mode covers minor drizzles and heatwaves (+₹12)" : "Standard mode covers medium to heavy disruptions."}
           </p>
        </section>

        {/* Zone Selector */}
        <section className="space-y-4">
           <label className="text-heading text-sm">Working Zones</label>
           <div className="space-y-2">
              {zones.map((zone) => (
                <Card 
                  key={zone.id} 
                  onClick={() => toggleZone(zone.id)}
                  className={cn(
                    "p-4 flex justify-between items-center cursor-pointer transition-all",
                    selectedZones.includes(zone.id) ? "border-primary bg-primary/5" : "border-border-light"
                  )}
                >
                   <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                        selectedZones.includes(zone.id) ? "bg-primary border-primary" : "border-border-mid"
                      )}>
                         {selectedZones.includes(zone.id) && <CheckCircle2 className="text-white" size={14} />}
                      </div>
                      <div className="text-xs font-bold text-ink-primary">{zone.name}</div>
                   </div>
                   <div className="text-[9px] font-mono text-ink-hint">
                      {zone.risk > 1 ? '+10% Risk' : zone.risk < 1 ? '-15% Risk' : 'Baseline'}
                   </div>
                </Card>
              ))}
           </div>
        </section>

        {/* Payout Adjustment */}
        <section className="space-y-4">
           <div className="flex justify-between items-end">
              <label className="text-heading text-sm">Payout Target</label>
              <div className="text-mono-l text-ink-primary">{Math.round(payoutMultiplier * 100)}%</div>
           </div>
           <input 
             type="range" min="0.5" max="2.0" step="0.1" value={payoutMultiplier} 
             onChange={(e) => setPayoutMultiplier(parseFloat(e.target.value))}
             className="w-full h-2 bg-surface-sunken rounded-full appearance-none accent-ink-primary cursor-pointer"
           />
           <div className="flex justify-between text-[9px] text-ink-hint uppercase font-bold tracking-widest">
              <span>₹150 / event</span>
              <span>₹600 / event</span>
           </div>
        </section>

        {/* Actuarial Summary Card */}
        <Card className="p-6 bg-surface-raised border border-border-light space-y-4">
           <div className="flex items-center gap-3">
              <Settings2 className="text-ink-primary" size={20} />
              <h4 className="text-subheading text-xs uppercase tracking-widest underline underline-offset-4 decoration-primary/20">Dynamic Pricing Logic</h4>
           </div>
           <div className="space-y-2">
              <div className="flex justify-between text-[10px]">
                 <span className="text-ink-muted">Base Underwriting</span>
                 <span className="text-ink-primary font-mono">₹49.00</span>
              </div>
              <div className="flex justify-between text-[10px]">
                 <span className="text-ink-muted">Zone Surcharge</span>
                 <span className={cn("font-mono", calculatedPremium > 49 ? "text-status-danger" : "text-status-success")}>
                   {calculatedPremium > 49 ? '+' : ''}₹{calculatedPremium - 49}.00
                 </span>
              </div>
              <div className="h-[1px] bg-border-light w-full" />
              <div className="flex justify-between text-[10px] font-bold">
                 <span className="text-ink-primary uppercase tracking-widest">Calculated Premium</span>
                 <span className="text-ink-primary font-mono text-xs">₹{calculatedPremium}.00</span>
              </div>
           </div>
        </Card>
      </main>

      <footer className="p-6 pb-12 sticky bottom-0 bg-surface-base/80 backdrop-blur-md border-t border-border-light">
         <Button className="w-full h-14 bg-[#FF6B2B] hover:bg-[#E8571A] text-white border-none uppercase tracking-widest font-bold shadow-cta">
           Save & Confirm Plan
         </Button>
      </footer>
    </MobileWrapper>
  );
}
