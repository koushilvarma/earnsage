"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Shield, Wallet, TrendingUp, Info, ArrowRight, Zap, PieChart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { cn } from '@/lib/utils';

export default function EarningsCalculator() {
  const router = useRouter();
  const [dailyEarnings, setDailyEarnings] = useState(800);
  const [rainyDays, setRainyDays] = useState(4);
  const [protectedAmount, setProtectedAmount] = useState(0);

  useEffect(() => {
    // Logic: Each rainy day costs ~70% of daily earnings for a gig worker without protection.
    // Earn Sage covers ~80% of that lost income.
    const lossPerDay = dailyEarnings * 0.7;
    const coverage = lossPerDay * 0.8 * rainyDays;
    setProtectedAmount(Math.round(coverage));
  }, [dailyEarnings, rainyDays]);

  return (
    <MobileWrapper className="bg-surface-base flex flex-col min-h-screen">
      <header className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-display-l">Earnings Shield</h1>
        </div>
        <p className="text-body text-ink-muted">Calculate how much income you protect with Earn Sage.</p>
      </header>

      <main className="flex-1 px-6 pt-8 space-y-10 pb-24">
        {/* Input Section */}
        <section className="space-y-8">
           <div className="space-y-4">
              <div className="flex justify-between items-end">
                 <label className="text-heading text-sm">Avg. Daily Earnings</label>
                 <div className="text-mono-xl text-ink-primary text-xl">₹{dailyEarnings}</div>
              </div>
              <input 
                type="range" min="400" max="2500" step="50" value={dailyEarnings} 
                onChange={(e) => setDailyEarnings(parseInt(e.target.value))}
                className="w-full h-2 bg-surface-sunken rounded-full appearance-none accent-ink-primary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ink-hint font-bold uppercase tracking-widest">
                 <span>₹400</span>
                 <span>₹2,500</span>
              </div>
           </div>

           <div className="space-y-4">
              <div className="flex justify-between items-end">
                 <label className="text-heading text-sm">Rainy Days / Month</label>
                 <div className="text-mono-xl text-ink-primary text-xl">{rainyDays} Days</div>
              </div>
              <input 
                type="range" min="1" max="15" value={rainyDays} 
                onChange={(e) => setRainyDays(parseInt(e.target.value))}
                className="w-full h-2 bg-surface-sunken rounded-full appearance-none accent-ink-primary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ink-hint font-bold uppercase tracking-widest">
                 <span>1 Day</span>
                 <span>15 Days</span>
              </div>
           </div>
        </section>

        {/* Result Card */}
        <Card variant="dark" className="p-8 relative overflow-hidden bg-ink-primary border-none shadow-2xl">
           <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2">
                 <Shield className="text-primary" size={20} />
                 <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">Monthly Protection</span>
              </div>
              
              <div>
                 <motion.div 
                    key={protectedAmount}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-mono-xl text-[48px] text-white leading-none"
                 >
                    ₹{protectedAmount.toLocaleString()}
                 </motion.div>
                 <p className="text-[11px] text-white/40 mt-4 leading-relaxed">
                    Estimated income saved from weather disruptions based on your earnings profile.
                 </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                 <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest italic">ROI: ~12x Premium</div>
                 <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-ink-primary bg-surface-raised flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-primary/20 animate-pulse" />
                      </div>
                    ))}
                 </div>
              </div>
           </div>
           
           {/* Decorative Background */}
           <TrendingUp className="absolute right-[-20px] top-[-20px] w-40 h-40 text-white/5 -rotate-12" />
        </Card>

        {/* Benefits List */}
        <section className="space-y-4">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted px-2">Why Protect?</h3>
           <div className="space-y-3">
              {[
                { icon: Zap, label: "Zero-Deductible", desc: "No hidden costs for rainy day claims" },
                { icon: Wallet, label: "Instant Liquidity", desc: "Payouts hit your bank in under 2 hours" },
                { icon: PieChart, label: "Smart Budgeting", desc: "Stable income even during monsoon" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white border border-border-light shadow-sm">
                   <div className="w-10 h-10 rounded-xl bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary">
                      <item.icon size={18} />
                   </div>
                   <div>
                      <div className="text-xs font-bold text-ink-primary">{item.label}</div>
                      <p className="text-[10px] text-ink-hint mt-1">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        <Button 
          className="w-full h-14 bg-[#FF6B2B] hover:bg-[#E8571A] border-none uppercase tracking-widest font-bold shadow-cta"
          onClick={() => router.push('/onboarding/profile')}
        >
          Secure My Income Now <ArrowRight size={18} className="ml-2" />
        </Button>
      </main>
    </MobileWrapper>
  );
}
