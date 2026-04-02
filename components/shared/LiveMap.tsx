"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, AlertTriangle, Layers, Navigation, Info, Search, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function LiveMap() {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const zones = [
    { id: '1', name: 'Koramangala', risk: 'high', coords: 'top-[30%] left-[20%]', color: 'bg-red-500' },
    { id: '2', name: 'Indiranagar', risk: 'medium', coords: 'top-[45%] left-[60%]', color: 'bg-amber-500' },
    { id: '3', name: 'Whitefield', risk: 'low', coords: 'top-[20%] left-[75%]', color: 'bg-emerald-500' },
    { id: '4', name: 'Electronic City', risk: 'medium', coords: 'top-[75%] left-[30%]', color: 'bg-amber-500' },
    { id: '5', name: 'HSR Layout', risk: 'high', coords: 'top-[60%] left-[25%]', color: 'bg-red-500' },
  ];

  return (
    <Card className="relative w-full h-[400px] bg-slate-100 rounded-3xl overflow-hidden border-border-light shadow-inner group">
      {/* Map Background Simulation */}
      <div className="absolute inset-0 bg-[#E5E7EB] opacity-50 overflow-hidden">
        <svg className="w-full h-full opacity-20" viewBox="0 0 400 400">
           <path d="M0,50 L400,350 M50,0 L350,400 M0,200 L400,200 M200,0 L200,400" stroke="#94a3b8" strokeWidth="2" fill="none" />
           <circle cx="150" cy="120" r="80" fill="#f87171" opacity="0.1" />
           <circle cx="300" cy="250" r="100" fill="#fbbf24" opacity="0.1" />
        </svg>
      </div>

      {/* Interactive Zones */}
      {zones.map((zone) => (
        <motion.div
          key={zone.id}
          whileHover={{ scale: 1.2 }}
          onClick={() => setActiveZone(zone.name)}
          className={cn(
            "absolute cursor-pointer p-2 rounded-full",
            zone.coords
          )}
        >
          <div className={cn("w-4 h-4 rounded-full shadow-lg border-2 border-white animate-pulse", zone.color)} />
          <div className="mt-1 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-lg text-[8px] font-bold shadow-sm whitespace-nowrap">
            {zone.name}
          </div>
        </motion.div>
      ))}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
         <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-slate-800 border border-slate-100">
            <Layers size={18} />
         </button>
         <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-slate-800 border border-slate-100">
            <Navigation size={18} />
         </button>
      </div>

      {/* Active Zone Detail Overlay */}
      <AnimatePresence>
        {activeZone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 flex justify-between items-center"
          >
             <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Zone Info</div>
                <div className="text-sm font-bold text-slate-800">{activeZone}</div>
             </div>
             <button onClick={() => setActiveZone(null)} className="p-2 hover:bg-slate-100 rounded-full">
                <Info size={18} className="text-primary" />
             </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-4 left-4 flex gap-2">
         <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-sm border border-white/50 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-800">Live GPS Active</span>
         </div>
      </div>
    </Card>
  );
}

import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
