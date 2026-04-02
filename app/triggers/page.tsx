"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Wind, 
  CloudRain, 
  AlertTriangle, 
  ArrowRight, 
  Bell, 
  ChevronRight, 
  Activity, 
  Map as MapIcon, 
  Info, 
  Layers, 
  Navigation, 
  LocateFixed, 
  Search, 
  Filter, 
  Maximize2, 
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { LiveMap } from '@/components/shared/LiveMap';
import { cn } from '@/lib/utils';

const triggers = [
  { 
    id: 1, 
    type: 'Rainfall', 
    location: 'Koramangala 4th Block', 
    intensity: '48mm/hr', 
    status: 'Critical', 
    risk: 'High',
    color: 'text-status-danger',
    bg: 'bg-status-danger/10',
    icon: CloudRain
  },
  { 
    id: 2, 
    type: 'AQI', 
    location: 'Bengaluru South', 
    intensity: '142 (PM2.5)', 
    status: 'Moderate', 
    risk: 'Medium',
    color: 'text-status-warning',
    bg: 'bg-status-warning/10',
    icon: Wind
  },
];

export default function TriggerMonitor() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');

  return (
    <MobileWrapper withNav className="bg-surface-base px-6 pt-8 pb-32">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
           <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center text-ink-primary shadow-sm hover:scale-105 transition-transform">
              <ChevronRight size={20} className="rotate-180" />
           </button>
           <h1 className="text-display-l">Trigger Monitor</h1>
        </div>
      </header>

      <div className="relative z-10">
        {/* Heatmap & Map Section */}
        <section className="relative h-[480px] rounded-[32px] overflow-hidden border border-border-light shadow-2xl mb-8">
           <div className="absolute inset-0 bg-gradient-to-br from-status-danger/10 via-status-warning/10 to-transparent" />
           <LiveMap />
           
           {/* UI Overlays */}
           <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur border border-border-light flex items-center justify-center shadow-md group">
                 <Layers size={18} className="text-ink-primary group-hover:scale-110 transition-transform" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur border border-border-light flex items-center justify-center shadow-md group">
                 <Navigation size={18} className="text-ink-primary group-hover:scale-110 transition-transform" />
              </button>
           </div>

           <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 backdrop-blur p-4 rounded-2xl border border-border-light shadow-lg flex items-center justify-between">
                 <div>
                    <div className="text-[10px] font-bold text-ink-hint uppercase tracking-widest leading-none mb-1">Active Sector</div>
                    <div className="text-sm font-bold text-ink-primary tracking-tight">Koramangala 4th Block</div>
                 </div>
                 <div className="h-8 w-[1px] bg-border-light mx-4" />
                 <div className="text-right">
                    <div className="text-[10px] font-bold text-status-danger uppercase tracking-widest leading-none mb-1">Risk Level</div>
                    <div className="text-sm font-mono font-bold text-status-danger">HIGH (8.2)</div>
                 </div>
              </div>
           </div>
        </section>

        {/* Global Risk Indicators */}
        <div className="grid grid-cols-2 gap-4 mb-8">
           {triggers.map((t) => (
             <Card key={t.id} className="p-5 space-y-4 group hover:border-primary/50 transition-all cursor-pointer">
                <div className="flex justify-between items-start">
                   <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border border-border-light", t.bg)}>
                      <t.icon className={t.color} size={20} />
                   </div>
                   <div className={cn("px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider", t.color, t.bg)}>
                      {t.status}
                   </div>
                </div>
                <div>
                   <div className="text-[10px] font-bold text-ink-hint uppercase tracking-widest leading-none mb-1">{t.type}</div>
                   <div className="text-xs font-bold text-ink-primary truncate">{t.location}</div>
                   <div className="text-mono-m mt-2">{t.intensity}</div>
                </div>
             </Card>
           ))}
        </div>

        {/* Predictive Impact */}
        <section className="space-y-4">
           <div className="flex justify-between items-center px-1">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted">Predictive Impact</h3>
              <div className="text-[9px] font-bold text-primary uppercase tracking-widest underline underline-offset-4">ML Insight</div>
           </div>
           <Card className="p-6 bg-slate-900 border-none text-white relative overflow-hidden">
              <div className="relative z-10 flex gap-6 items-center">
                 <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-primary border border-white/10">
                    <TrendingUp size={28} />
                 </div>
                 <div>
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Estimated Payout Window</div>
                    <div className="text-heading text-lg">₹400 / session</div>
                    <div className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest mt-1">Probability 88%</div>
                 </div>
              </div>
              <Activity className="absolute right-[-10px] top-[-10px] w-24 h-24 text-white/5" />
           </Card>
        </section>

        {/* Expert Analysis Sidenote */}
        <div className="mt-8 p-6 bg-surface-raised border border-border-light rounded-3xl space-y-3">
           <div className="flex items-center gap-3">
              <Info size={16} className="text-ink-hint" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-ink-primary">Expert Analysis</h4>
           </div>
           <p className="text-[11px] text-ink-muted leading-relaxed">
             Stagnant weather patterns over South Bengaluru suggest elevated parametric risk for the next 4 hours. Automated claims monitoring is currently at **Tier-1 sensitivity**.
           </p>
        </div>
      </div>
    </MobileWrapper>
  );
}
