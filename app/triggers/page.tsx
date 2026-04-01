"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, MapPin, Navigation, Info, ArrowRight, CloudRain, Wind, Zap, LocateFixed, Search, Filter, Maximize2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const triggers = [
  { 
    id: 'rain', 
    name: 'Rainfall', 
    zone: 'Koramangala + Indiranagar', 
    current: '48.2 mm/hr', 
    target: '50 mm/hr', 
    percent: 96.4, 
    status: 'ELEVATED',
    color: '#D97706',
    icon: CloudRain
  },
  { 
    id: 'aqi', 
    name: 'AQI Level', 
    zone: 'Bengaluru South', 
    current: '142', 
    target: '250', 
    percent: 56.8, 
    status: 'MODERATE',
    color: '#D97706',
    icon: Wind
  },
  { 
    id: 'curfew', 
    name: 'Curfew Alert', 
    zone: 'All Zones', 
    current: 'No Alerts', 
    target: 'Active', 
    percent: 0, 
    status: 'CLEAR',
    color: '#059669',
    icon: ShieldCheck,
    analysis: 'Atmospheric stability persists. No civic or social disruptions reported by local authorities in the last 24 hours.'
  },
  {
    id: 'prediction',
    name: 'Prediction',
    zone: 'Southwest Bengaluru',
    current: 'High Probability',
    target: 'Next 6h',
    percent: 82,
    status: 'PREDICTIVE',
    color: '#7C3AED',
    icon: Zap,
    analysis: 'ML models detect localized convective cells forming over Ramanagara, moving towards city center. Expected impact at 18:30 IST.'
  }
];

export default function TriggerMonitor() {
  const router = useRouter();
  const [selectedTrigger, setSelectedTrigger] = useState(triggers[0]);

  return (
    <MobileWrapper withNav className="bg-surface-base flex flex-col min-h-screen pt-4">
      <header className="px-6 flex justify-between items-center mb-6">
        <h1 className="text-display-l">Disruption Monitor</h1>
        <div className="flex gap-2">
           <button className="w-10 h-10 rounded-xl bg-white border border-border-light flex items-center justify-center text-ink-primary shadow-sm hover:border-border-mid">
             <Search size={18} />
           </button>
           <button className="w-10 h-10 rounded-xl bg-white border border-border-light flex items-center justify-center text-ink-primary shadow-sm hover:border-border-mid">
             <Filter size={18} />
           </button>
        </div>
      </header>

      {/* Map Section */}
      <div className="flex-1 relative mx-6 mb-6 rounded-3xl overflow-hidden border border-border-light shadow-md bg-[#F1F3F4]">
        {/* Mock Mapbox Light style */}
        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/77.6412,12.9716,12/400x500?access_token=pk.mock')] bg-cover opacity-80" />
        
        {/* Heatmap Simulation */}
        <div className="absolute inset-0 bg-gradient-to-br from-status-danger/10 via-status-warning/10 to-transparent" />
        
        {/* UI Overlays */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
           <button className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur border border-border-light flex items-center justify-center shadow-md group">
             <LocateFixed size={18} className="text-primary group-hover:scale-110 transition-transform" />
           </button>
           <button className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur border border-border-light flex items-center justify-center shadow-md">
             <Maximize2 size={18} className="text-ink-primary" />
           </button>
           <div className="h-4" />
           <button 
             className={cn(
               "w-10 h-10 rounded-xl backdrop-blur border flex items-center justify-center shadow-md transition-all",
               "bg-ink-primary text-white border-ink-primary"
             )}
             title="Toggle Predictive Heatmap"
           >
             <Zap size={18} className="fill-current" />
           </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-3 rounded-2xl border border-border-light shadow-md">
           <div className="text-[9px] font-bold uppercase tracking-widest text-ink-muted mb-2">Heatmap Risk</div>
           <div className="flex items-center gap-1.5 px-1">
              <div className="h-1.5 w-12 rounded-full bg-gradient-to-r from-status-success via-status-warning to-status-danger" />
           </div>
        </div>
      </div>

      {/* Bottom Sheet UI - Static for V3 representation */}
      <div className="bg-white border-t border-border-light rounded-t-[32px] px-6 pt-6 pb-24 shadow-[0_-8px_32px_rgba(15,23,42,0.06)] space-y-6">
        <div className="w-8 h-1 bg-surface-sunken mx-auto rounded-full mb-2" />
        
        <div className="space-y-4">
           {triggers.map((t) => (
             <Card 
               key={t.id} 
               onClick={() => setSelectedTrigger(t)}
               className={cn(
                 "p-5 transition-all cursor-pointer",
                 selectedTrigger.id === t.id ? "border-ink-primary border-2 shadow-md bg-surface-base/50" : "border-border-light"
               )}
             >
               <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl bg-surface-raised border flex items-center justify-center",
                      selectedTrigger.id === t.id ? "border-ink-primary/20" : "border-border-light"
                    )}>
                      <t.icon className="text-ink-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="text-subheading underline underline-offset-4 decoration-primary/20">{t.name}</h4>
                      <div className="text-micro text-ink-muted">{t.zone}</div>
                    </div>
                 </div>
                 <div className={cn(
                   "px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest",
                   t.status === 'ELEVATED' ? "bg-status-warning/10 text-status-warning" : 
                   t.status === 'MODERATE' ? "bg-status-warning/5 text-status-warning/70" : "bg-status-success/10 text-status-success"
                 )}>
                   {t.status}
                 </div>
               </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                     <div className="text-mono-l text-lg">{t.current} <span className="text-[10px] text-ink-hint font-body uppercase">Live</span></div>
                     <div className="text-[10px] text-ink-muted font-bold uppercase tracking-widest">Target: {t.target}</div>
                  </div>
                  <div className="h-1.5 w-full bg-surface-sunken rounded-full overflow-hidden">
                    <motion.div 
                     initial={{ width: 0 }} 
                     animate={{ width: `${t.percent}%` }} 
                     className={cn(
                       "h-full rounded-full transition-all duration-1000",
                       t.percent > 90 ? "bg-status-danger animate-pulse" : t.percent > 50 ? "bg-status-warning" : "bg-status-success"
                     )} 
                    />
                  </div>
                </div>

                {selectedTrigger.id === t.id && t.analysis && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-2xl bg-surface-raised border-l-4 border-l-primary space-y-2"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-widest text-ink-primary flex items-center gap-2">
                      <Zap size={12} className="text-primary fill-primary/20" /> Expert ML Analysis
                    </div>
                    <p className="text-[10px] text-ink-muted leading-relaxed">
                      {t.analysis}
                    </p>
                  </motion.div>
                )}
             </Card>
           ))}
        </div>
        
        <Button variant="secondary" className="w-full text-[10px] uppercase tracking-widest h-12">
          Download PDF Report
        </Button>
      </div>
    </MobileWrapper>
  );
}

// Simple placeholder for ShieldCheck used in mapping
function ShieldCheck({ size = 20, className = "" }) {
  return (
    <svg 
      width={size} height={size} viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
