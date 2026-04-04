"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Info, Radio, Zap, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const hotspots = [
  { id: 'koramangala', name: 'Koramangala 4th Block', x: 45, y: 55, risk: 8.2, status: 'Critical', color: 'bg-status-danger' },
  { id: 'hsr', name: 'HSR Layout Sector 2', x: 65, y: 75, risk: 4.5, status: 'Moderate', color: 'bg-status-warning' },
  { id: 'indiranagar', name: 'Indiranagar 100ft Rd', x: 55, y: 25, risk: 2.1, status: 'Clear', color: 'bg-emerald-500' },
  { id: 'whitefield', name: 'Whitefield ITPL', x: 85, y: 45, risk: 3.8, status: 'Moderate', color: 'bg-status-warning' },
  { id: 'mgroad', name: 'MG Road Metro', x: 40, y: 35, risk: 6.7, status: 'Elevated', color: 'bg-status-danger' },
];

// Simulated Mesh Riders
const meshRiders = [...Array(12)].map((_, i) => ({
  id: i,
  x: 20 + Math.random() * 60,
  y: 20 + Math.random() * 60,
}));

export const LiveMap = () => {
  const [selected, setSelected] = useState(hotspots[0]);

  return (
    <div className="relative w-full h-full bg-[#F1F5F9] overflow-hidden group">
      {/* Abstract Map Background (SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,20 Q20,30 40,20 T80,30 T100,10" fill="none" stroke="#64748B" strokeWidth="0.5" />
        <path d="M0,50 Q30,60 50,40 T100,60" fill="none" stroke="#64748B" strokeWidth="0.5" />
        <path d="M20,0 Q30,40 10,60 T30,100" fill="none" stroke="#64748B" strokeWidth="0.5" />
        <path d="M70,0 Q80,50 60,80 T90,100" fill="none" stroke="#64748B" strokeWidth="0.5" />
        {/* Grids */}
        <line x1="20" y1="0" x2="20" y2="100" stroke="#CBD5E1" strokeWidth="0.1" />
        <line x1="40" y1="0" x2="40" y2="100" stroke="#CBD5E1" strokeWidth="0.1" />
        <line x1="60" y1="0" x2="60" y2="100" stroke="#CBD5E1" strokeWidth="0.1" />
        <line x1="80" y1="0" x2="80" y2="100" stroke="#CBD5E1" strokeWidth="0.1" />
      </svg>

      {/* Heatmap Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-status-danger/5 via-transparent to-emerald-500/5" />

      {/* Ghost Riders (Mesh Network) */}
      {meshRiders.map((rider) => (
        <motion.div
          key={rider.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
          style={{ left: `${rider.x}%`, top: `${rider.y}%` }}
          className="absolute w-2 h-2 bg-emerald-400 rounded-full blur-[2px] z-10 shadow-[0_0_8px_#34D399]"
        />
      ))}

      {/* Hotspots */}
      {hotspots.map((spot) => (
        <button
          key={spot.id}
          onClick={() => setSelected(spot)}
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer z-20"
        >
          <div className="relative">
             <div className={cn("w-4 h-4 rounded-full animate-ping opacity-20 absolute -inset-2", spot.color)} />
             <div className={cn("w-3 h-3 rounded-full shadow-lg border-2 border-white relative z-10", spot.color)} />
             
             {/* Label (Visible on hover or if selected) */}
             <AnimatePresence>
                {(selected.id === spot.id) && (
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.8, y: -10 }} 
                     animate={{ opacity: 1, scale: 1, y: -45 }}
                     exit={{ opacity: 0, scale: 0.8, y: -10 }}
                     className="absolute left-1/2 -translate-x-1/2 bg-ink-primary text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full whitespace-nowrap shadow-xl"
                   >
                     {spot.name}
                     <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-ink-primary rotate-45" />
                   </motion.div>
                )}
             </AnimatePresence>
          </div>
        </button>
      ))}

      {/* Selected Sector Card Overlay (Bottom) */}
      <div className="absolute bottom-6 left-6 right-6 z-30">
        <motion.div 
          key={selected.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/90 backdrop-blur-xl p-5 rounded-3xl border border-border-light shadow-2xl flex items-center justify-between"
        >
           <div className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner", selected.color + "/10")}>
                 <MapPin className={selected.color.replace('bg-', 'text-')} size={24} />
              </div>
              <div>
                 <div className="text-[10px] font-black text-ink-hint uppercase tracking-widest mb-1">Active Sector</div>
                 <div className="text-sm font-black text-ink-primary tracking-tight">{selected.name}</div>
              </div>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="h-10 w-[1px] bg-border-light" />
              <div className="text-right">
                 <div className="text-[10px] font-black text-ink-hint uppercase tracking-widest mb-1">Risk Score</div>
                 <div className={cn("text-lg font-mono font-black", selected.color.replace('bg-', 'text-'))}>
                    {selected.risk.toFixed(1)}
                 </div>
              </div>
              <div className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest", selected.color + "/10", selected.color.replace('bg-', 'text-'))}>
                 {selected.status}
              </div>
           </div>
        </motion.div>
      </div>

      {/* Map Control Buttons */}
      <div className="absolute top-6 right-6 flex flex-col gap-3 z-30">
         <button className="w-12 h-12 rounded-[20px] bg-white border border-border-light flex items-center justify-center shadow-lg group hover:bg-ink-primary hover:text-white transition-all">
            <Radio size={20} className="group-hover:scale-110 transition-transform" />
         </button>
         <button className="w-12 h-12 rounded-[20px] bg-white border border-border-light flex items-center justify-center shadow-lg group hover:bg-ink-primary hover:text-white transition-all">
            <Navigation size={20} className="group-hover:scale-110 transition-transform" />
         </button>
         <button className="w-12 h-12 rounded-[20px] bg-white border border-border-light flex items-center justify-center shadow-lg group hover:bg-ink-primary hover:text-white transition-all">
            <Zap size={20} className="group-hover:scale-110 transition-transform" />
         </button>
      </div>

      {/* Simulation Indicator */}
      <div className="absolute top-6 left-6 z-30 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
         <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
         <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">Oracle Mesh Monitoring</span>
      </div>
    </div>
  );
};
