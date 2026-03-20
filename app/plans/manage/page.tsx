"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Shield, Zap, CreditCard, Sliders, Bell, AlertTriangle, CheckCircle2, Info, ChevronRight, Smartphone, Banknote, HelpCircle, LogOut, Settings, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const Switch = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
  <button 
    onClick={onToggle}
    className={cn(
      "w-12 h-6 rounded-full relative transition-colors duration-300",
      active ? "bg-primary" : "bg-white/10"
    )}
  >
    <motion.div 
      animate={{ x: active ? 24 : 4 }}
      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
    />
  </button>
);

export default function PlanManagement() {
  const router = useRouter();
  const [autoPay, setAutoPay] = useState(true);
  const [sensitivity, setSensitivity] = useState(2); // Mid
  const [zones, setZones] = useState([
    { name: 'Koramangala East', active: true },
    { name: 'Indiranagar', active: false },
  ]);

  const toggleZone = (index: number) => {
    const newZones = [...zones];
    newZones[index].active = !newZones[index].active;
    setZones(newZones);
  };

  return (
    <MobileWrapper className="bg-secondary text-white pb-12">
      <header className="px-6 pt-8 pb-4 flex items-center justify-between mb-8">
        <button onClick={() => router.back()} className="touch-target -ml-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-heading">Manage Plan</h1>
        <div className="w-10" />
      </header>

      <div className="px-6 space-y-8">
        {/* Current Plan Card */}
        <section>
          <label className="text-caption text-text-muted uppercase tracking-wider font-semibold mb-4 block">
            Current Subscription
          </label>
          <Card variant="dark" className="bg-primary/5 border-primary/20 p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/20 transition-all" />
            <div className="relative z-10 flex justify-between items-start mb-6">
              <div>
                <div className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Standard Pro</div>
                <h3 className="text-2xl font-bold">₹49.00 <span className="text-xs text-text-muted font-normal uppercase">/ week</span></h3>
              </div>
              <div className="bg-accent/20 text-accent px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-accent/20">
                Next: 15 Apr
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1 text-xs" size="sm">Modify</Button>
              <Button variant="ghost" className="flex-1 text-xs border-danger/20 text-danger" size="sm">Cancel</Button>
            </div>
          </Card>
        </section>

        {/* Coverage Zones */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <label className="text-caption text-text-muted uppercase tracking-wider font-semibold">Active Zones</label>
            <button className="text-primary text-xs font-bold uppercase tracking-widest">+ Add Zone</button>
          </div>
          <div className="space-y-3">
            {zones.map((zone, i) => (
              <Card key={zone.name} variant="dark" className="bg-white/5 border-white/5 p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", zone.active ? "bg-primary/10 text-primary" : "bg-white/5 text-text-muted")}>
                    <Shield size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold">{zone.name}</div>
                    <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest mt-1">
                      {zone.active ? 'Monitoring Active' : 'Coverage Inactive'}
                    </div>
                  </div>
                </div>
                <Switch active={zone.active} onToggle={() => toggleZone(i)} />
              </Card>
            ))}
          </div>
        </section>

        {/* Trigger Sensitivity */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <label className="text-caption text-text-muted uppercase tracking-wider font-semibold">Risk Sensitivity</label>
            <HelpCircle size={16} className="text-text-muted" />
          </div>
          <Card variant="dark" className="bg-white/5 border-white/5 p-6">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-6">
              <span className={cn(sensitivity === 1 ? "text-primary" : "text-text-muted")}>Low</span>
              <span className={cn(sensitivity === 2 ? "text-primary" : "text-text-muted")}>Medium</span>
              <span className={cn(sensitivity === 3 ? "text-primary" : "text-text-muted")}>High</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="3" 
              step="1"
              value={sensitivity}
              onChange={(e) => setSensitivity(parseInt(e.target.value))}
              className="w-full accent-primary h-1 bg-white/10 rounded-full mb-6"
            />
            <p className="text-xs text-text-muted leading-relaxed">
              <span className="text-white font-bold">Medium:</span> Standard threshold. Best balance between payout frequency and premium cost.
            </p>
          </Card>
        </section>

        {/* Payment Settings */}
        <section>
          <label className="text-caption text-text-muted uppercase tracking-wider font-semibold mb-4 block">Payment Settings</label>
          <Card variant="dark" className="bg-white/5 border-white/5 p-5 flex justify-between items-center mb-4">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                  <CreditCard className="text-primary" size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold">Auto-Pay Weekly</div>
                  <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest mt-1">Paytm UPI • **** 4928</div>
                </div>
             </div>
             <Switch active={autoPay} onToggle={() => setAutoPay(!autoPay)} />
          </Card>
          <button className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 pl-2">
            Update Payment Method <ChevronRight size={14} />
          </button>
        </section>
      </div>
    </MobileWrapper>
  );
}
