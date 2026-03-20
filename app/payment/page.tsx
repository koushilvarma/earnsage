"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight, ShieldCheck, CreditCard, Landmark, Smartphone, MoreHorizontal, Lock, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const upiApps = [
  { name: 'Google Pay', icon: 'GP' },
  { name: 'PhonePe', icon: 'PP' },
  { name: 'Paytm', icon: 'PT' },
  { name: 'Other UPI', icon: 'ID' },
];

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePay = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push('/activation-success');
    }, 2000);
  };

  return (
    <div className="mobile-wrapper bg-secondary text-white p-6 pb-24">
      <header className="flex items-center justify-between mb-8 pt-6">
        <button onClick={() => router.back()} className="touch-target -ml-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-heading">Payment</h1>
        <div className="w-10" />
      </header>

      {/* Order Summary */}
      <Card variant="dark" className="bg-white/5 border-white/10 p-6 mb-10">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-text-muted text-sm">Standard Pro (Weekly)</span>
            <span className="text-white font-bold">₹49.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted text-sm">Platform Fee</span>
            <span className="text-white font-bold">₹2.00</span>
          </div>
          <div className="border-t border-white/5 pt-4 flex justify-between items-center">
            <span className="text-lg font-bold">Total Payable</span>
            <span className="text-2xl font-space-mono font-bold text-primary">₹51.00</span>
          </div>
        </div>
      </Card>

      {/* Payment Options */}
      <section className="mb-10">
        <label className="text-caption text-text-muted uppercase tracking-wider font-semibold mb-6 block">
          Select Payment Method
        </label>
        
        <div className="space-y-4">
          {/* UPI Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm font-bold text-text-muted uppercase tracking-widest pl-2">
              <Smartphone size={16} /> UPI Payments
            </div>
            <div className="grid grid-cols-4 gap-3">
              {upiApps.map(app => (
                <button
                  key={app.name}
                  onClick={() => setSelectedMethod('upi-' + app.name)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-xl border-1.5 transition-all",
                    selectedMethod === 'upi-' + app.name ? "bg-primary/10 border-primary shadow-orange" : "bg-white/5 border-white/10"
                  )}
                >
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xs font-bold text-white">
                    {app.icon}
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-tighter text-text-muted truncate w-full text-center">{app.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Other Methods */}
          <div className="space-y-3 pt-6">
            <div className="flex items-center gap-3 text-sm font-bold text-text-muted uppercase tracking-widest pl-2">
              <MoreHorizontal size={16} /> Other Options
            </div>
            <button
              onClick={() => setSelectedMethod('card')}
              className={cn(
                "w-full flex items-center justify-between p-5 rounded-xl border-1.5 transition-all text-left",
                selectedMethod === 'card' ? "bg-primary/10 border-primary" : "bg-white/5 border-white/10"
              )}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <CreditCard className="text-text-muted" size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold">Credit / Debit Card</div>
                  <div className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Visa, Mastercard, RuPay</div>
                </div>
              </div>
              <div className={cn("w-5 h-5 rounded-full border-2", selectedMethod === 'card' ? "border-primary bg-primary" : "border-white/20")} />
            </button>

            <button
              onClick={() => setSelectedMethod('netbanking')}
              className={cn(
                "w-full flex items-center justify-between p-5 rounded-xl border-1.5 transition-all text-left",
                selectedMethod === 'netbanking' ? "bg-primary/10 border-primary" : "bg-white/5 border-white/10"
              )}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Landmark className="text-text-muted" size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold">Net Banking</div>
                  <div className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Select from top banks</div>
                </div>
              </div>
              <div className={cn("w-5 h-5 rounded-full border-2", selectedMethod === 'netbanking' ? "border-primary bg-primary" : "border-white/20")} />
            </button>
          </div>
        </div>
      </section>

      {/* Security Footer */}
      <div className="flex flex-col items-center gap-4 mb-10 py-6 border-y border-white/5">
        <div className="flex items-center gap-2 text-safe">
          <Lock size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">PCI-DSS Compliant Payments</span>
        </div>
        <div className="flex gap-4 opacity-40">
          {/* Mock Security Logos */}
          <div className="h-6 w-12 bg-white/20 rounded" />
          <div className="h-6 w-12 bg-white/20 rounded" />
          <div className="h-6 w-12 bg-white/20 rounded" />
        </div>
      </div>

      <Button 
        className="w-full h-16 text-lg font-bold group" 
        size="xl" 
        onClick={handlePay}
        isLoading={isLoading}
      >
        <span>Securely Pay ₹51.00</span>
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>

      <div className="text-center mt-6">
        <p className="text-[11px] text-text-muted">By continuing, you agree to automate future weekly payments.</p>
      </div>
    </div>
  );
}
