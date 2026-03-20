"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Search, Map as MapIcon, Layers, LocateFixed, CloudRain, AlertTriangle, Wind, Info, ChevronUp, ChevronDown, Filter, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const activeTriggers = [
  { id: 1, type: 'Rain', zone: 'Koramangala', intensity: 'High', status: 'Critical', color: 'text-primary' },
  { id: 2, type: 'Flood', zone: 'Bellandur', intensity: 'Moderate', status: 'Warning', color: 'text-warning' },
  { id: 3, type: 'AQI', zone: 'Whitefield', intensity: '342 Index', status: 'Critical', color: 'text-primary' },
  { id: 4, type: 'Wind', zone: 'Indiranagar', intensity: '40 km/h', status: 'Notice', color: 'text-safe' },
];

export default function TriggerMonitor() {
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <MobileWrapper withNav className="bg-secondary overflow-hidden">
      {/* Search Header */}
      <div className="absolute top-8 left-6 right-6 z-20 flex gap-3">
        <button 
          onClick={() => router.back()} 
          className="w-12 h-12 bg-secondary/80 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center text-white"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
          <input 
            placeholder="Search zones..." 
            className="w-full h-12 bg-secondary/80 backdrop-blur-md border border-white/10 rounded-2xl pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Floating Controls */}
      <div className="absolute top-24 right-6 z-20 flex flex-col gap-3">
        <button className="w-10 h-10 bg-secondary/80 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-white"><Layers size={18} /></button>
        <button className="w-10 h-10 bg-secondary/80 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-primary"><LocateFixed size={18} /></button>
      </div>

      {/* Map Simulation */}
      <div className="absolute inset-0 bg-[#0A1628] flex flex-col">
        {/* Mock Map Texture */}
        <div className="flex-1 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/77.5946,12.9716,11/600x600?access_token=pk.mock')] bg-cover opacity-60 relative">
          {/* Heatmap Blobs */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} 
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/3 left-1/4 w-48 h-48 bg-primary/40 rounded-full blur-[60px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} 
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-warning/30 rounded-full blur-[80px]" 
          />
          
          {/* Active Pins */}
          <div className="absolute top-1/3 left-1/3 group">
            <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute inset-0" />
            <div className="w-4 h-4 bg-primary rounded-full relative border-2 border-white/20 shadow-orange" />
          </div>
          <div className="absolute top-[45%] left-[55%] group">
            <div className="w-4 h-4 bg-warning rounded-full animate-ping absolute inset-0" />
            <div className="w-4 h-4 bg-warning rounded-full relative border-2 border-white/20 shadow-card" />
          </div>
        </div>
      </div>

      {/* Draggable Bottom Sheet */}
      <motion.div
        initial={{ y: '75%' }}
        animate={{ y: sheetOpen ? '10%' : '72%' }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="absolute inset-0 z-30 flex flex-col"
      >
        <div 
          onClick={() => setSheetOpen(!sheetOpen)}
          className="bg-secondary/95 backdrop-blur-xl rounded-t-[40px] border-t border-white/10 shadow-float h-full overflow-hidden"
        >
          {/* Handle */}
          <div className="flex flex-col items-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-white/10 rounded-full mb-1" />
          </div>

          <div className="px-6 py-4 flex-1 overflow-y-auto no-scrollbar pb-32">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Active Triggers</h2>
              <div className="flex gap-2">
                <button className="touch-target text-text-muted hover:text-white"><Filter size={20} /></button>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Live (4)
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {activeTriggers.map(trigger => (
                <Card key={trigger.id} variant="dark" className="bg-white/5 border-white/5 p-4 flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                      {trigger.type === 'Rain' && <CloudRain className="text-primary w-6 h-6" />}
                      {trigger.type === 'Flood' && <AlertTriangle className="text-warning w-6 h-6" />}
                      {trigger.type === 'AQI' && <Wind className="text-accent w-6 h-6" />}
                      {trigger.type === 'Wind' && <Info className="text-safe w-6 h-6" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold group-hover:text-primary transition-colors">{trigger.zone}</div>
                      <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest mt-1">
                        {trigger.type} ({trigger.intensity})
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn("text-[10px] font-bold uppercase tracking-widest mb-1", trigger.color)}>{trigger.status}</div>
                    <div className="text-xs font-bold text-white">~₹{trigger.type === 'Rain' ? '800' : '450'}</div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] uppercase font-bold text-text-muted">Critical</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <span className="text-[10px] uppercase font-bold text-text-muted">Moderate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-[10px] uppercase font-bold text-text-muted">Safe</span>
              </div>
            </div>
            
            <div className="mt-10 p-6 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col items-center gap-4 text-center">
              <Zap className="text-primary w-8 h-8" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold">Rain detected in your zone?</h4>
                <p className="text-xs text-text-muted">Triggers take up to 15 mins to sync after detection.</p>
              </div>
              <Button variant="ghost" className="w-full text-xs" size="sm">Report Issue</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </MobileWrapper>
  );
}
