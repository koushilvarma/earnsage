"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, MapPin, Navigation, Info, ArrowRight, Lock, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

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
                    ? "bg-ink-primary border-ink-primary text-white" 
                    : "bg-surface-raised border-border-light text-ink-primary hover:border-border-mid"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </section>

        {/* Zone Map */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
             <label className="text-heading">Your Delivery Zone</label>
             <div className="text-primary text-xs font-bold flex items-center gap-1.5">
               <Navigation size={12} className="fill-primary" /> Bengaluru East
             </div>
          </div>
          
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border-light shadow-card group">
            {/* Mock Map Image (Mapbox Light Style) */}
            <div className="absolute inset-0 bg-[#F1F3F4] bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/77.6412,12.9716,13/400x300?access_token=pk.mock')] bg-cover">
               {/* Center Pin */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                 <MapPin className="text-primary w-8 h-8 fill-primary/20 drop-shadow-md" />
                 <div className="absolute inset-0 w-8 h-8 bg-primary/20 rounded-full animate-ping" />
               </div>
               
               {/* Zone Circle */}
               <div 
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dashed border-ink-primary bg-ink-primary/5 rounded-full transition-all duration-300 pointer-events-none flex items-center justify-center"
                 style={{ width: `${radius * 30}px`, height: `${radius * 30}px` }}
               >
                 <span className="text-[10px] font-bold text-ink-primary bg-white px-2 py-0.5 rounded border border-border-light">~{radius} km</span>
               </div>
            </div>
            
            <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center border border-border-light">
              <Navigation size={18} className="text-ink-primary" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-caption font-bold">
              <span>Coverage Radius</span>
              <span className="text-ink-primary font-mono">{radius} km</span>
            </div>
            <input 
              type="range" min="1" max="15" value={radius} 
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="w-full h-1.5 bg-surface-sunken rounded-full appearance-none accent-ink-primary cursor-pointer"
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
