"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Zap, Sparkles, ChevronRight, Info, ArrowRight, Sliders } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const plans = [
  {
    name: "BASIC GUARD",
    price: "29",
    maxPayout: "₹1,200",
    features: ["Rainfall Protection", "AQI Monitoring", "Digital Onboarding", "Email Support"],
    variant: "base",
  },
  {
    name: "STANDARD SHIELD",
    price: "49",
    maxPayout: "₹2,100",
    features: ["Rainfall + Flood", "AQI + Wind", "Priority Payouts", "WhatsApp Alerts", "Zone Mapping"],
    variant: "elevated",
    recommended: true,
  },
  {
    name: "PREMIUM ARMOR",
    price: "79",
    maxPayout: "₹3,500",
    features: ["Full Civic Protection", "Curfew Coverage", "Express 1hr Payout", "Personal Account Manager", "Multi-zone Support"],
    variant: "dark",
  }
];

export default function PlanSelection() {
  const [billing, setBilling] = useState<'weekly' | 'monthly'>('weekly');
  const router = useRouter();

  return (
    <MobileWrapper className="bg-surface-base px-6 pt-12 pb-12 overflow-y-auto">
      <header className="mb-8">
        <h1 className="text-display-l mb-2">Choose Your Shield</h1>
        <p className="text-body text-ink-muted leading-relaxed">Select the protection level that fits your delivery routine.</p>
      </header>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-10">
        <div className="p-1.5 bg-surface-raised border border-border-light rounded-full flex gap-1 relative">
          <button 
            onClick={() => setBilling('weekly')}
            className={cn(
              "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all z-10",
              billing === 'weekly' ? "bg-ink-primary text-white" : "text-ink-muted"
            )}
          >
            Weekly
          </button>
          <button 
            onClick={() => setBilling('monthly')}
            className={cn(
              "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all z-10 flex items-center gap-2",
              billing === 'monthly' ? "bg-ink-primary text-white" : "text-ink-muted"
            )}
          >
            Monthly
            <span className={cn(
              "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase",
              billing === 'monthly' ? "bg-primary text-white" : "bg-status-success/10 text-status-success border border-status-success/20"
            )}>
              -15%
            </span>
          </button>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="space-y-6">
        {plans.map((plan) => (
          <Card 
            key={plan.name}
            variant={plan.variant as any}
            className={cn(
              "relative group p-8",
              plan.recommended && "border-2 border-ink-primary"
            )}
          >
            {plan.recommended && (
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-ink-primary text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border-4 border-surface-base">
                Recommended
              </div>
            )}

            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-heading mb-1">{plan.name}</h3>
                  <div className="text-caption">Maximum payout up to <span className="text-ink-primary font-bold">{plan.maxPayout}</span></div>
                </div>
                {plan.variant === 'dark' && <Shield className="text-primary w-6 h-6 fill-primary/10" />}
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-mono-xl text-[44px]">₹{plan.price}</span>
                <span className="text-body text-ink-hint">/ week</span>
              </div>

              <div className="h-[1px] w-full bg-surface-sunken opacity-50" />

              <ul className="space-y-3">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-body">
                    <div className="w-5 h-5 rounded-full bg-status-success/10 flex items-center justify-center border border-status-success/20">
                      <Check className="text-status-success" size={12} strokeWidth={3} />
                    </div>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.variant === 'dark' ? 'primary' : 'primary'} 
                className={cn(
                  "w-full h-14 uppercase tracking-widest",
                  plan.variant === 'dark' && "bg-[#FF6B2B] hover:bg-[#E8571A] border-none"
                )}
                onClick={() => router.push('/payment')}
              >
                Select Plan
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Button 
          variant="secondary" 
          className="w-full h-14 border-ink-primary border-2 text-ink-primary uppercase tracking-[0.2em] font-bold text-[10px] bg-white group hover:bg-ink-primary hover:text-white transition-all shadow-md"
          onClick={() => router.push('/customize')}
        >
          <Sliders className="mr-2 group-hover:rotate-180 transition-transform" size={16} />
          Customize my own shield
        </Button>
      </div>

      <div className="mt-12 space-y-6 pt-8 border-t border-surface-sunken">
        {/* Financial Transparency */}
        <Card className="p-6 bg-surface-raised border-border-light">
          <h4 className="text-[10px] font-bold tracking-widest uppercase mb-4 text-ink-primary">Financial Transparency</h4>
          <p className="text-[11px] text-ink-muted mb-6 leading-relaxed">
            Every ₹100 in premiums is distributed to ensure a sustainable safety net for all riders.
          </p>
          <div className="space-y-4">
            {[
              { label: "Payout Pool", value: 65, color: "bg-status-success", desc: "Reserved for rider claims" },
              { label: "Operations", value: 20, color: "bg-ink-primary", desc: "Tech & 24/7 support" },
              { label: "Reinsurance", value: 10, color: "bg-primary", desc: "Catastrophic coverage" },
              { label: "Platform", value: 5, color: "bg-surface-sunken", desc: "Profit margin" }
            ].map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between items-end">
                  <div className="text-[10px] font-bold uppercase tracking-wider">{item.label}</div>
                  <div className="text-mono-xl text-base">₹{item.value}</div>
                </div>
                <div className="h-1.5 w-full bg-surface-base rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.value}%` }} />
                </div>
                <div className="text-[9px] text-ink-hint italic">{item.desc}</div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex justify-between gap-4">
           {[
             { icon: Shield, label: "IRDAI Regulated" },
             { icon: Zap, label: "Payout <4 hrs" },
             { icon: Sparkles, label: "Cancel anytime" }
           ].map((t, i) => (
             <div key={i} className="flex-1 flex flex-col items-center gap-2 text-center text-[10px] text-ink-muted">
               <div className="w-8 h-8 rounded-full bg-surface-raised border border-border-light flex items-center justify-center">
                 <t.icon size={16} className="text-ink-primary" />
               </div>
               <span className="font-semibold uppercase tracking-widest">{t.label}</span>
             </div>
           ))}
        </div>
      </div>
    </MobileWrapper>
  );
}
