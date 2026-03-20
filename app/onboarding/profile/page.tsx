"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight, MapPin, Clock, IndianRupee, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

const platforms = [
  { name: 'Zomato', color: 'bg-[#E23744]' },
  { name: 'Swiggy', color: 'bg-[#FC8019]' },
  { name: 'Zepto', color: 'bg-[#52298F]' },
  { name: 'Blinkit', color: 'bg-[#F7D24A]' },
  { name: 'Dunzo', color: 'bg-[#00D290]' },
  { name: 'Porter', color: 'bg-[#0052CC]' },
];

export default function ProfileSetup() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Zomato']);
  const [radius, setRadius] = useState(5);
  const router = useRouter();

  const togglePlatform = (name: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]
    );
  };

  return (
    <div className="mobile-wrapper bg-secondary text-white p-6 pb-24">
      <header className="flex items-center justify-between mb-8 pt-6">
        <button onClick={() => router.back()} className="touch-target -ml-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-heading">Delivery Profile</h1>
        <div className="w-10" />
      </header>

      {/* Progress */}
      <div className="w-full flex flex-col gap-4 mb-8">
        <div className="flex justify-between items-center text-sm">
          <span className="text-text-muted">Step 2 of 3</span>
          <span className="text-primary font-bold">66% Complete</span>
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: '66%' }} className="h-full bg-primary" />
        </div>
      </div>

      {/* Platform Selector */}
      <section className="mb-10">
        <label className="text-caption text-text-muted uppercase tracking-wider font-semibold mb-4 block">
          Select Your Platforms
        </label>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
          {platforms.map(platform => (
            <button
              key={platform.name}
              onClick={() => togglePlatform(platform.name)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-full border-1.5 transition-all shrink-0 font-bold text-sm",
                selectedPlatforms.includes(platform.name) 
                  ? "bg-primary border-primary text-white shadow-orange" 
                  : "bg-white/5 border-white/10 text-text-muted"
              )}
            >
              <div className={cn("w-2 h-2 rounded-full", platform.color)} />
              {platform.name}
            </button>
          ))}
        </div>
      </section>

      {/* Zone Selector */}
      <section className="mb-10">
        <label className="text-caption text-text-muted uppercase tracking-wider font-semibold mb-4 block">
          Primary Delivery Zone
        </label>
        <Card variant="dark" className="p-0 overflow-hidden relative mb-4">
          <div className="h-48 bg-white/10 flex items-center justify-center relative">
            {/* Mock Map Background */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/77.5946,12.9716,12/400x300?access_token=pk.mock')] bg-cover" />
            <div className="relative">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-8 bg-primary/20 rounded-full" 
              />
              <MapPin className="relative text-primary w-8 h-8 drop-shadow-lg" />
            </div>
            <div className="absolute bottom-4 left-4 bg-secondary/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-bold uppercase tracking-wider">
              Koramangala, Bengaluru
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted">Zone Radius</span>
              <span className="text-primary font-bold">{radius} km</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="15" 
              value={radius} 
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="w-full accent-primary h-1 bg-white/10 rounded-full"
            />
          </div>
        </Card>
        <button className="text-primary text-sm font-bold flex items-center gap-2">+ Add another zone (optional)</button>
      </section>

      {/* Working Hours */}
      <section className="mb-10">
        <label className="text-caption text-text-muted uppercase tracking-wider font-semibold mb-4 block">
          Typical Working Hours
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <Clock className="w-4 h-4 text-primary mb-2" />
            <div className="text-xs text-text-muted">Start Time</div>
            <div className="text-lg font-space-mono">07:00 AM</div>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <Clock className="w-4 h-4 text-primary mb-2" />
            <div className="text-xs text-text-muted">End Time</div>
            <div className="text-lg font-space-mono">11:00 PM</div>
          </div>
        </div>
      </section>

      {/* Average Earnings */}
      <section className="mb-12">
        <label className="text-caption text-text-muted uppercase tracking-wider font-semibold mb-4 block">
          Average Daily Earnings
        </label>
        <div className="grid grid-cols-2 gap-3">
          {['< ₹500', '₹500 - 800', '₹800 - 1200', '₹1200+'].map(tier => (
            <button
              key={tier}
              className={cn(
                "p-4 rounded-xl border-1.5 text-center transition-all",
                tier === '₹800 - 1200' ? "bg-primary/10 border-primary text-primary font-bold" : "bg-white/5 border-white/10 text-text-muted"
              )}
            >
              {tier}
            </button>
          ))}
        </div>
      </section>

      <div className="bg-safe/10 border border-safe/20 p-4 rounded-xl mb-10 flex items-start gap-3">
        <ShieldCheck className="text-safe w-5 h-5 shrink-0 mt-0.5" />
        <p className="text-[11px] text-text-muted leading-relaxed">
          Your location data is encrypted and only used to determine weather risks in your zone. It is never shared with third parties.
        </p>
      </div>

      <Button className="w-full" size="xl" onClick={() => router.push('/risk-profile')}>
        Analyze My Risk <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
}
