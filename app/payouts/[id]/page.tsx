"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, CloudRain, MapPin, Calendar, Clock, CheckCircle2, ShieldCheck, HelpCircle, ArrowRight, Download, ReceiptText } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const timelineSteps = [
  { status: 'Completed', label: 'Trigger Detected', time: '12 Apr, 04:30 PM', desc: 'Heavy rain (>15mm/hr) detected in Koramangala.', icon: CloudRain, color: 'text-primary' },
  { status: 'Completed', label: 'AI Verification', time: '12 Apr, 04:45 PM', desc: 'Zonal multi-sensor data confirmed the disruption.', icon: ShieldCheck, color: 'text-accent' },
  { status: 'Completed', label: 'Payout Scheduled', time: '12 Apr, 05:00 PM', desc: '₹800 assigned to your linked UPI ID.', icon: Clock, color: 'text-warning' },
  { status: 'Completed', label: 'Funds Disbursed', time: '15 Apr, 10:20 AM', desc: 'Successfully transferred to Paytm UPI.', icon: CheckCircle2, color: 'text-accent' },
];

export default function PayoutDetail() {
  const router = useRouter();
  const params = useParams();

  return (
    <MobileWrapper className="bg-secondary text-white pb-12">
      <header className="px-6 pt-8 pb-4 flex items-center justify-between mb-6">
        <button onClick={() => router.back()} className="touch-target -ml-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-heading">Payout Detail</h1>
        <button className="touch-target -mr-4">
          <Download size={20} className="text-primary" />
        </button>
      </header>

      <div className="px-6 space-y-8">
        {/* Main Payout Card */}
        <section className="text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-accent/20">
            <CheckCircle2 className="text-accent w-8 h-8" />
          </div>
          <h2 className="text-[40px] font-space-mono font-bold leading-none mb-1">₹800</h2>
          <div className="bg-accent/20 text-accent px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mx-auto border border-accent/20">
            Successfully Disbursed
          </div>
        </section>

        {/* Evidence Card */}
        <section>
          <label className="text-caption text-text-muted uppercase tracking-wider font-semibold mb-4 block">
            Evidence Captured
          </label>
          <Card variant="dark" className="p-0 border-white/5 overflow-hidden">
            <div className="h-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/77.5946,12.9716,13/400x200?access_token=pk.mock')] bg-cover relative">
              <div className="absolute inset-0 bg-primary/10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute inset-0" />
                <MapPin className="text-primary w-6 h-6 relative drop-shadow-lg" />
              </div>
              <div className="absolute bottom-3 left-3 bg-secondary/80 backdrop-blur-md px-2 py-1 rounded text-[9px] font-bold uppercase border border-white/10">
                Koramangala 4th Block
              </div>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-bold text-text-muted">Trigger Type</div>
                <div className="text-sm font-bold flex items-center gap-1.5">
                  <CloudRain size={14} className="text-primary" /> Heavy Rain
                </div>
              </div>
              <div className="space-y-1 text-right">
                <div className="text-[10px] uppercase font-bold text-text-muted">Intensity</div>
                <div className="text-sm font-bold text-white">18.4 mm/hr</div>
              </div>
            </div>
          </Card>
        </section>

        {/* Timeline */}
        <section>
          <label className="text-caption text-text-muted uppercase tracking-wider font-semibold mb-6 block">
            Payout Timeline
          </label>
          <div className="relative pl-8 space-y-10">
            {/* Vertical Line */}
            <div className="absolute left-[15px] top-2 bottom-8 w-[2px] bg-white/5" />
            
            {timelineSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="relative">
                  {/* Pin */}
                  <div className={cn(
                    "absolute -left-[32px] top-0 w-8 h-8 rounded-full bg-secondary border-2 border-white/10 flex items-center justify-center z-10",
                    i === 0 ? "border-primary" : i === timelineSteps.length - 1 ? "border-accent bg-accent/10" : "border-white/10"
                  )}>
                    <Icon size={14} className={cn(i === 0 ? "text-primary" : i === timelineSteps.length - 1 ? "text-accent" : "text-text-muted")} />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-white">{step.label}</h4>
                      <span className="text-[10px] font-space-mono text-text-muted">{step.time}</span>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed max-w-[90%]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Policy Info */}
        <Card variant="dark" className="bg-white/5 border-white/5 p-5">
          <div className="flex items-center gap-4 mb-4">
            <ReceiptText className="text-primary w-5 h-5" />
            <h4 className="text-sm font-bold uppercase tracking-widest text-text-muted">Protection Summary</h4>
          </div>
          <div className="grid grid-cols-2 gap-y-4 text-xs">
            <div className="text-text-muted uppercase font-bold tracking-[0.1em] text-[10px]">Policy ID</div>
            <div className="text-white font-space-mono text-right">ES-4928-VX</div>
            <div className="text-text-muted uppercase font-bold tracking-[0.1em] text-[10px]">Session ID</div>
            <div className="text-white font-space-mono text-right">SES-1204-KM</div>
            <div className="text-text-muted uppercase font-bold tracking-[0.1em] text-[10px]">Verified By</div>
            <div className="text-accent font-bold text-right uppercase tracking-widest text-[9px]">Earn Sage AI</div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <Button variant="ghost" className="flex-1" size="lg">
            <HelpCircle size={18} className="mr-2" /> Help
          </Button>
          <Button className="flex-1" size="lg">
            Share <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </MobileWrapper>
  );
}
