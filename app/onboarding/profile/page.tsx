"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, MapPin, Navigation, Info, ArrowRight, Lock, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

import { LiveMap } from '@/components/shared/LiveMap';

const platforms = ["Zomato", "Zepto", "Swiggy", "Blinkit", "Dunzo", "Porter", "Other"];

export default function DeliveryProfile() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Zomato"]);
  const [radius, setRadius] = useState(5);
  const router = useRouter();

  const togglePlatform = (p: string) => {
    if (selectedPlatforms.includes(p)) {
      setSelectedPlatforms(selectedPlatforms.filter(item => item !== p));
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  return (
    <MobileWrapper className="bg-surface-base flex flex-col min-h-screen">
      <header className="px-6 pt-8 pb-4">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary">
            <ChevronLeft size={20} />
          </button>
          <div className="text-right">
            <div className="text-display-l text-ink-primary">Delivery Profile</div>
            <div className="text-caption font-bold text-primary">2 of 3</div>
          </div>
        </div>
        <div className="h-1 w-full bg-surface-sunken rounded-full overflow-hidden">
          <motion.div 
            animate={{ width: "66%" }} 
            className="h-full bg-ink-primary"
          />
        </div>
      </header>

      <main className="flex-1 px-6 pt-8 space-y-8 pb-12">
        {/* Platform Selector */}
        <section className="space-y-4">
          <label className="text-heading">Which platforms do you deliver for?</label>
          <div className="flex flex-wrap gap-2">
            {platforms.map(p => (
              <button
                key={p}
                onClick={() => togglePlatform(p)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-xs font-bold uppercase transition-all border-1.5",
                  selectedPlatforms.includes(p) 
                    ? "bg-ink-primary border-ink-primary text-white shadow-lg" 
                    : "bg-surface-raised border-border-light text-ink-primary hover:border-border-mid"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </section>

        {/* Zone Map Upgrade */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
             <label className="text-heading">Your Delivery Zone</label>
             <div className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
               <Navigation size={12} className="fill-primary animate-pulse" /> Bengaluru East
             </div>
          </div>
          
          <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden border border-border-light shadow-2xl group ring-4 ring-white">
             {/* Tactical Map with Mesh Integration */}
             <LiveMap />
             
             {/* Dynamic Coverage Radius Overlay */}
             <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ 
                    width: `${radius * 20 + 40}px`, 
                    height: `${radius * 20 + 40}px` 
                  }}
                  className="border-2 border-primary border-dashed bg-primary/10 rounded-full relative flex items-center justify-center transition-all duration-300"
                >
                   <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse" />
                   <div className="bg-ink-primary text-white text-[10px] font-black px-3 py-1 rounded-full shadow-xl border border-white/20 whitespace-nowrap">
                      ~{radius} km Scope
                   </div>
                </motion.div>
             </div>

             <div className="absolute top-4 left-4 z-40 bg-slate-900/80 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full border border-white/10">
                Oracle Mesh Active
             </div>
          </div>

          <div className="space-y-4 bg-white p-6 rounded-[32px] border border-border-light shadow-sm">
            <div className="flex justify-between items-center text-caption font-bold">
              <span className="uppercase tracking-widest text-ink-hint">Coverage Radius</span>
              <span className="text-primary font-mono text-lg">{radius}km</span>
            </div>
            <input 
              type="range" min="1" max="15" value={radius} 
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-full appearance-none accent-primary cursor-pointer"
            />
          </div>
        </section>

        {/* KYC Verification Mockup */}
        <section className="space-y-4">
           <div className="flex justify-between items-center">
              <label className="text-heading">KYC Verification</label>
              <div className="px-2.5 py-1 rounded-full bg-status-warning/10 text-status-warning border border-status-warning/20 text-[9px] font-bold uppercase tracking-widest">
                Pending
              </div>
           </div>
           <Card className="p-6 border-dashed border-2 border-border-light bg-surface-raised flex flex-col items-center justify-center text-center gap-4 group hover:border-ink-primary transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-white border border-border-light flex items-center justify-center text-ink-muted group-hover:scale-110 transition-transform">
                 <ShieldCheck size={24} />
              </div>
              <div className="space-y-1">
                 <div className="text-xs font-bold text-ink-primary italic">Verify Your Identity</div>
                 <p className="text-[10px] text-ink-muted max-w-[200px]">Aadhaar or PAN required for automated payouts</p>
              </div>
              <Button variant="ghost" className="h-8 text-[9px] uppercase tracking-widest text-primary font-bold">
                 Start Verification <ArrowRight size={12} className="ml-1" />
              </Button>
           </Card>
        </section>

        <section className="bg-surface-raised border border-border-light p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-3">
            <Lock size={18} className="text-ink-muted" />
            <h4 className="text-subheading underline underline-offset-4 decoration-primary decoration-2">Privacy Control</h4>
          </div>
          <p className="text-body text-ink-muted leading-relaxed">
            Your location data is only used for risk analysis within your selected radius. We never track you outside your working hours.
          </p>
        </section>
      </main>

      <footer className="p-6 pb-12 sticky bottom-0 bg-surface-base/80 backdrop-blur-md">
        <Button 
          className="w-full h-14 uppercase tracking-widest group"
          onClick={() => router.push('/risk-profile')}
        >
          Analyze My Risk <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </footer>
    </MobileWrapper>
  );
}
