"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ShieldCheck, CreditCard, Smartphone, Banknote, Shield, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const paymentMethods = [
  { id: 'phonepe', name: 'PhonePe', icon: Smartphone },
  { id: 'gpay', name: 'GPay', icon: Smartphone },
  { id: 'paytm', name: 'Paytm', icon: Smartphone },
  { id: 'upi', name: 'UPI ID', icon: Smartphone },
  { id: 'netbanking', name: 'Net Banking', icon: Banknote },
  { id: 'card', name: 'Debit Card', icon: CreditCard },
];

export default function Payment() {
  const [selected, setSelected] = useState('phonepe');
  const [loading, setLoading] = useState(false);
  const [actuary, setActuary] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/actuary').then(res => res.json()).then(setActuary).catch(() => {});
  }, []);

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/payment/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: actuary?.total || '57.82', method: selected })
      });
      const data = await res.json();
      if (data.success) {
        // Persist the shield state in the profile (Mocking the DB update)
        await fetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ activeShield: true, currentPremium: actuary?.total })
        });
        router.push('/activation-success');
      }
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileWrapper className="bg-surface-base flex flex-col min-h-screen">
      <header className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-display-l">Activate Coverage</h1>
        </div>
      </header>

      <main className="flex-1 px-6 pb-24 space-y-8">
        {/* Order Summary */}
        <Card className="bg-surface-raised border-[#E2E8F0] p-6 rounded-2xl">
          <div className="text-[10px] font-bold tracking-widest text-ink-hint uppercase mb-6">Order Summary</div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-body text-ink-secondary">Plan Selection</span>
              <span className="text-body font-bold text-ink-primary">{actuary?.tier || 'Premium Shield'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-body text-ink-secondary">Daily Premium</span>
              <span className="text-body font-bold text-ink-primary">₹{actuary?.baseRate?.toFixed(2) || '49.00'}</span>
            </div>
            {actuary?.isSurgeActive && (
                <div className="flex justify-between items-center text-primary font-bold">
                    <span className="text-caption italic underline">Surge Multiplier</span>
                    <span className="font-mono text-xs">{actuary?.surgeMultiplier}x</span>
                </div>
            )}
            <div className="flex justify-between items-center text-caption">
              <span>GST (18%)</span>
              <span className="font-mono">₹{actuary?.gst?.toFixed(2) || '8.82'}</span>
            </div>
            <div className="h-[1px] w-full bg-surface-sunken" />
            <div className="flex justify-between items-center pt-2">
              <span className="text-heading">Total Amount</span>
              <span className="text-mono-xl text-2xl">₹{actuary?.total || '57.82'}</span>
            </div>
          </div>
        </Card>

        {/* Payment Grid */}
        <section className="space-y-4">
          <h3 className="text-heading">Select Payment Method</h3>
          <div className="grid grid-cols-3 gap-3">
            {paymentMethods.map(method => (
              <button
                key={method.id}
                onClick={() => setSelected(method.id)}
                className={cn(
                  "p-4 rounded-xl border-1.5 transition-all text-center flex flex-col items-center gap-2",
                  selected === method.id 
                    ? "bg-surface-raised border-ink-primary" 
                    : "bg-white border-border-light hover:border-border-mid"
                )}
              >
                <method.icon size={20} className={selected === method.id ? "text-primary" : "text-ink-muted"} />
                <span className={cn("text-[9px] font-bold uppercase tracking-widest", selected === method.id ? "text-ink-primary" : "text-ink-muted")}>
                  {method.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* UPI Input (Mock) */}
        <AnimatePresence>
          {selected === 'upi' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="space-y-3"
            >
              <input 
                placeholder="Enter UPI ID (e.g. ravi@okaxis)"
                className="w-full h-14 bg-white border-1.5 border-border-light rounded-xl px-4 text-ink-primary font-body text-base focus:outline-none focus:border-ink-primary transition-all"
              />
              <div className="flex items-center gap-2 px-2 text-status-success">
                <CheckCircle2 size={14} />
                <span className="text-[11px] font-bold uppercase tracking-wide">Ravi Kumar · SBI</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auto Renewal Card */}
        <div className="bg-status-info/5 border border-status-info/10 p-5 rounded-2xl flex gap-4">
           <Shield className="text-status-info shrink-0" size={20} />
           <div className="space-y-1">
             <div className="text-xs font-bold text-ink-primary">Automatic Renewal Active</div>
             <p className="text-[11px] text-ink-secondary leading-normal">
               Your plan will auto-renew every Monday. You can cancel or pause anytime from "My Plan" settings.
             </p>
           </div>
        </div>

        {/* Trust Footer */}
        <div className="flex flex-col items-center gap-4 py-4 text-center">
           <div className="flex items-center gap-2 text-micro text-ink-hint">
              <Lock size={12} /> 256-bit Secure Encryption
           </div>
           <p className="text-[9px] text-ink-hint uppercase font-bold tracking-[0.2em] px-12">
             PCI DSS Compliant · Powered by Razorpay
           </p>
        </div>
      </main>

      <footer className="p-6 pb-12 fixed bottom-0 left-0 right-0 bg-surface-base/80 backdrop-blur-md">
        <Button 
          className="w-full h-14 uppercase tracking-widest shadow-cta group"
          loading={loading}
          onClick={handlePay}
        >
          Pay ₹{actuary?.total || '57.82'} & Activate <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </footer>
    </MobileWrapper>
  );
}
