"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ArrowRight, Check, Shield, Zap, Star, ShieldCheck, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const plans = [
  {
    id: 'basic',
    name: 'Basic Cover',
    price: 29,
    description: 'Perfect for light rain protection.',
    features: ['Moderate Rain', '₹400 per payout', 'Weekly Settlement'],
    color: 'border-white/10'
  },
  {
    id: 'standard',
    name: 'Standard Pro',
    price: 49,
    popular: true,
    description: 'Most chosen by top delivery partners.',
    features: ['Heavy Rain & Storms', 'AQI > 300 Alerts', '₹800 per payout', 'Priority Settlement', 'Live Trigger Map'],
    color: 'border-primary'
  },
  {
    id: 'premium',
    name: 'Ultra Shield',
    price: 89,
    description: 'Total income security 24/7.',
    features: ['All Triggers Included', 'Curfew & Flood Cover', '₹1,200 per payout', 'Instant Payout', 'Elite Support'],
    color: 'border-[#00D4AA]'
  }
];

export default function Plans() {
  const [billing, setBilling] = useState<'weekly' | 'monthly'>('weekly');
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const router = useRouter();

  const getPrice = (base: number) => billing === 'monthly' ? base * 4 * 0.9 : base;

  return (
    <div className="mobile-wrapper bg-secondary text-white p-6 pb-24">
      <header className="flex items-center justify-between mb-8 pt-6">
        <button onClick={() => router.back()} className="touch-target -ml-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-heading">Choose Protection</h1>
        <div className="w-10" />
      </header>

      {/* Switcher */}
      <div className="flex justify-center mb-10">
        <div className="bg-white/5 p-1 rounded-full flex relative border border-white/10">
          <motion.div 
            layoutId="active-bg"
            className="absolute inset-1 bg-primary rounded-full z-0"
            initial={false}
            animate={{ x: billing === 'weekly' ? 0 : 100 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{ width: '100px' }}
          />
          <button 
            onClick={() => setBilling('weekly')}
            className={cn("relative z-10 w-[100px] py-2 text-xs font-bold uppercase transition-colors", billing === 'weekly' ? 'text-white' : 'text-text-muted')}
          >
            Weekly
          </button>
          <button 
            onClick={() => setBilling('monthly')}
            className={cn("relative z-10 w-[100px] py-2 text-xs font-bold uppercase transition-colors", billing === 'monthly' ? 'text-white' : 'text-text-muted')}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Plan Stack */}
      <div className="space-y-4 mb-12">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedPlan(plan.id)}
            className={cn(
              "relative bg-white/5 border-1.5 p-6 rounded-2xl cursor-pointer transition-all",
              selectedPlan === plan.id ? plan.color : "border-transparent",
              plan.popular && "pt-10"
            )}
          >
            {plan.popular && (
              <div className="absolute top-0 right-6 bg-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-b-lg">
                Recommended
              </div>
            )}
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-xs text-text-muted">{plan.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-space-mono font-bold text-white">₹{getPrice(plan.price)}</div>
                <div className="text-[10px] text-text-muted uppercase font-bold">per {billing === 'weekly' ? 'week' : 'month'}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {plan.features.slice(0, 3).map(feat => (
                <div key={feat} className="flex items-center gap-2 text-sm text-text-secondary">
                  <Check size={14} className="text-accent shrink-0" />
                  {feat}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Badge */}
      <div className="flex items-center justify-center gap-6 mb-12 py-6 border-y border-white/5">
        <div className="flex flex-col items-center gap-1">
          <Star className="text-primary fill-primary w-5 h-5" />
          <span className="text-[10px] font-bold text-text-muted uppercase">4.9 Star Rating</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="text-accent w-5 h-5" />
          <span className="text-[10px] font-bold text-text-muted uppercase">ISO Certified</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <CheckCircle2 className="text-safe w-5 h-5" />
          <span className="text-[10px] font-bold text-text-muted uppercase">10k+ Partners</span>
        </div>
      </div>

      {/* Comparison Preview */}
      <div className="mb-12">
        <h4 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6">Quick Comparison</h4>
        <Card variant="dark" className="p-0 border-white/5 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-4 font-bold">Feature</th>
                <th className="p-4 font-bold text-primary text-center">Pro</th>
                <th className="p-4 font-bold text-text-muted text-center">Basic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="p-4 text-text-muted">Rain Payout</td>
                <td className="p-4 font-bold text-primary text-center">₹800</td>
                <td className="p-4 text-white text-center">₹400</td>
              </tr>
              <tr>
                <td className="p-4 text-text-muted">AQI Cover</td>
                <td className="p-4 text-center"><Check size={18} className="text-accent mx-auto" /></td>
                <td className="p-4 text-center">—</td>
              </tr>
              <tr>
                <td className="p-4 text-text-muted">Flood Cover</td>
                <td className="p-4 text-center"><Check size={18} className="text-accent mx-auto" /></td>
                <td className="p-4 text-center">—</td>
              </tr>
            </tbody>
          </table>
          <button className="w-full py-4 text-primary text-xs font-bold hover:bg-white/5 transition-colors uppercase tracking-widest">
            Show Full Comparison
          </button>
        </Card>
      </div>

      <Button className="w-full mb-6" size="xl" onClick={() => router.push('/payment')}>
        Activate {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} <ArrowRight className="ml-2 w-5 h-5" />
      </Button>

      <div className="text-center">
        <p className="text-[11px] text-text-muted leading-relaxed max-w-[80%] mx-auto">
          Charges will be auto-deducted from your linked account every Monday. Cancel any time before Sunday.
        </p>
      </div>
    </div>
  );
}
