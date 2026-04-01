"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, CloudRain, Wind, Zap, Info, Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { cn } from '@/lib/utils';

const weekForecast = [
  { day: 'Mon', date: 'Mar 24', prob: 20, type: 'Clear', color: 'text-status-success' },
  { day: 'Tue', date: 'Mar 25', prob: 45, type: 'Cloudy', color: 'text-status-warning' },
  { day: 'Wed', date: 'Mar 26', prob: 82, type: 'Rainfall', color: 'text-status-danger' },
  { day: 'Thu', date: 'Mar 27', prob: 65, type: 'Shower', color: 'text-status-warning' },
  { day: 'Fri', date: 'Mar 28', prob: 30, type: 'Clear', color: 'text-status-success' },
  { day: 'Sat', date: 'Mar 29', prob: 15, type: 'Clear', color: 'text-status-success' },
  { day: 'Sun', date: 'Mar 30', prob: 90, type: 'Heavy Rain', color: 'text-status-danger' },
];

export default function PayoutForecast() {
  const router = useRouter();

  return (
    <MobileWrapper className="bg-surface-base px-6 pt-8 pb-32 min-h-screen">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary">
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-display-l">Forecast</h1>
          <div className="text-[10px] font-bold text-ink-hint uppercase tracking-widest italic">Predictive Income Security</div>
        </div>
      </header>

      <main className="space-y-8">
        {/* ML Prediction Banner */}
        <Card className="p-6 bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] text-white border-none relative overflow-hidden">
           <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                 <Zap size={18} className="fill-current text-white/80" />
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">AI Insight</span>
              </div>
              <h2 className="text-heading text-xl">High Payout Week</h2>
              <p className="text-[11px] text-white/70 max-w-[240px] leading-relaxed">
                Our ML models predict a <span className="text-white font-bold underline decoration-primary underline-offset-4">82% probability</span> of payout this Wednesday due to pre-monsoon convective cells.
              </p>
           </div>
           <TrendingUp className="absolute right-[-20px] bottom-[-20px] w-40 h-40 text-white/5 -rotate-12" />
        </Card>

        {/* Weekly List */}
        <section className="space-y-4">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted flex items-center gap-2">
              <Calendar size={14} /> Payout Probability Window
           </h3>
           <div className="space-y-3">
              {weekForecast.map((day, i) => (
                <Card 
                  key={i} 
                  className={cn(
                    "p-5 flex justify-between items-center transition-all",
                    day.prob > 80 ? "border-status-danger bg-status-danger/5" : "border-border-light"
                  )}
                >
                   <div className="flex items-center gap-4">
                      <div className="text-center w-10">
                         <div className="text-[10px] font-bold uppercase text-ink-hint">{day.day}</div>
                         <div className="text-xs font-mono font-bold text-ink-primary">{day.date.split(' ')[1]}</div>
                      </div>
                      <div className="h-8 w-[1px] bg-surface-sunken" />
                      <div>
                         <div className="text-xs font-bold text-ink-primary">{day.type}</div>
                         <div className={cn("text-[9px] font-bold uppercase tracking-widest", day.color)}>
                            {day.prob}% Prob
                         </div>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-16 bg-surface-sunken rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }} 
                           animate={{ width: `${day.prob}%` }} 
                           className={cn(
                             "h-full rounded-full",
                             day.prob > 80 ? "bg-status-danger" : day.prob > 40 ? "bg-status-warning" : "bg-status-success"
                           )}
                         />
                      </div>
                      {day.prob > 60 && <Zap size={12} className="text-primary fill-primary/20 animate-pulse" />}
                   </div>
                </Card>
              ))}
           </div>
        </section>

        {/* Confidence Note */}
        <section className="p-6 bg-surface-raised border border-border-light rounded-3xl space-y-3">
           <div className="flex items-center gap-3">
              <Info size={18} className="text-ink-muted" />
              <h4 className="text-caption font-bold text-ink-primary underline underline-offset-4 decoration-primary/20">Prediction Confidence</h4>
           </div>
           <p className="text-[10px] text-ink-muted leading-relaxed">
             Predictions are updated every 6 hours using global meteorological data and localized IoT sensors. Model accuracy for 48-hour windows: 89.2%.
           </p>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-6 pb-12 bg-gradient-to-t from-surface-base via-surface-base to-transparent flex flex-col items-center">
         <Button className="w-full h-14 uppercase tracking-widest group shadow-cta">
           Set Alerts for Wednesday <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
         </Button>
      </footer>
    </MobileWrapper>
  );
}
