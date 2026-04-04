"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CloudRain, Wind, AlertTriangle, ArrowRight, Info, Zap, ChevronRight, Loader2, Database, Radio, MapPin, Activity, Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const scanningSteps = [
  { text: "Ingesting Guidewire Cloud Stream...", node: "US-EAST-1" },
  { text: "Mapping Koramangala IoT Mesh...", node: "BGL-09" },
  { text: "Analyzing 10-year Precipitation delta...", node: "MET-IND" },
  { text: "Calculating Parametric Exposure...", node: "EARN-CORE" },
  { text: "Generating Risk Oracle Profile...", node: "AI-GEN" }
];

// Radar Chart Component (SVG)
const RadarChart = ({ data }: { data: Record<string, number> }) => {
  const points = Object.values(data);
  const labels = Object.keys(data);
  const size = 200;
  const center = size / 2;
  const radius = 80;

  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const polygonPoints = points.map((v, i) => {
    const { x, y } = getCoordinates(i, v);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Hexagons */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((r) => (
          <polygon
            key={r}
            points={labels.map((_, i) => {
              const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
              const dist = radius * r;
              return `${center + dist * Math.cos(angle)},${center + dist * Math.sin(angle)}`;
            }).join(' ')}
            className="fill-none stroke-white/5"
            strokeWidth="1"
          />
        ))}
        
        {/* Web Lines */}
        {labels.map((_, i) => {
          const { x, y } = getCoordinates(i, 100);
          return <line key={i} x1={center} y1={center} x2={x} y2={y} className="stroke-white/5" strokeWidth="1" />;
        })}

        {/* Data Polygon */}
        <motion.polygon
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          points={polygonPoints}
          className="fill-primary/20 stroke-primary"
          strokeWidth="2"
        />

        {/* Labels */}
        {labels.map((label, i) => {
          const { x, y } = getCoordinates(i, 115);
          return (
            <text 
              key={i} x={x} y={y} 
              className="text-[7px] font-bold fill-white/40 uppercase text-center" 
              textAnchor="middle" dominantBaseline="middle"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default function RiskAnalysis() {
  const [loading, setLoading] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      const stepTimer = setInterval(() => {
        setStepIndex(prev => (prev < scanningSteps.length - 1 ? prev + 1 : prev));
      }, 700);

      // Random Terminal Logs during loading
      const logInterval = setInterval(() => {
        const mockLogs = [
          `GET /api/v1/sensors/rainfall?node=${Math.floor(Math.random() * 100)}`,
          `INGESTING historical_delta_2023.parquet`,
          `AI_MODULE: weighting rainfall bias at 0.72`,
          `GUIDEWIRE: policy_sync_active=true`,
          `CALCULATING exposure_radius: 5.2km`
        ];
        setTerminalLogs(prev => [...prev, mockLogs[Math.floor(Math.random() * mockLogs.length)]].slice(-6));
      }, 300);

      const totalTimer = setTimeout(() => setLoading(false), 3500);
      return () => {
        clearInterval(stepTimer);
        clearInterval(logInterval);
        clearTimeout(totalTimer);
      };
    }
  }, [loading]);

  if (loading) {
    return (
      <MobileWrapper className="bg-surface-base flex flex-col items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        {/* Radar Scan Animation */}
        <div className="relative mb-16">
          <div className="w-64 h-64 rounded-full border border-border-light flex items-center justify-center relative overflow-hidden bg-white shadow-inner">
             {/* Sweeper */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent origin-center rounded-full"
               style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%)" }}
             />
             {/* Pulsing Rings */}
             <div className="absolute inset-4 rounded-full border border-border-light/50" />
             <div className="absolute inset-12 rounded-full border border-border-light/30" />
             
             {/* Active Nodes */}
             <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(255,107,43,0.5)] animate-pulse" />
             <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-primary/40" />
             <div className="absolute top-1/2 right-1/2 w-3 h-3 rounded-full border border-primary/40 animate-ping" />
             
             <div className="relative z-10 w-24 h-24 rounded-3xl bg-white border border-border-light shadow-lg flex items-center justify-center">
                <Database className="text-primary w-10 h-10 animate-bounce" />
             </div>
          </div>
        </div>

        <div className="w-full space-y-8 relative z-10">
          <div className="text-center space-y-4">
             <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-border-light text-[10px] font-black text-ink-primary uppercase tracking-widest shadow-sm">
               <ShieldCheck size={14} className="text-primary" />
               Model AUC: 0.847 • Trained on 618,310 points
             </div>
             <p className="text-[11px] font-bold text-ink-hint max-w-[280px] mx-auto leading-relaxed uppercase tracking-wider">
               Neural engines are analyzing multi-sensor telemetry for your specific sector.
             </p>
          </div>

          {/* Terminal Box */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl font-mono text-[9px] text-primary/80 space-y-2 h-[120px] overflow-hidden shadow-2xl">
             {terminalLogs.map((log, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-white/20 font-bold">[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                  <span className="font-bold tracking-tight">{log}</span>
                </div>
             ))}
          </div>
        </div>
      </MobileWrapper>
    );
  }
  return (
    <MobileWrapper className="bg-surface-base flex flex-col min-h-screen text-ink-primary px-6 pt-8 pb-32">
      <header className="flex justify-between items-center mb-10">
        <div>
          <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2">Validated Oracle</div>
          <h1 className="text-display-l text-4xl leading-none text-ink-primary font-black">Risk Profile</h1>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white border border-border-light flex items-center justify-center shadow-sm">
           <MapPin size={22} className="text-primary" />
        </div>
      </header>

      <main className="space-y-10">
        {/* Saturn Gauge Card */}
        <Card className="p-10 bg-white border-border-light rounded-[48px] text-center relative overflow-hidden group shadow-xl">
           <div className="relative z-10">
              <div className="text-[10px] font-black tracking-[0.4em] text-ink-hint uppercase mb-10">Disruption Probability</div>
              
              <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Outer Saturn Ring */}
                  <circle cx="50%" cy="50%" r="48%" className="stroke-slate-200 fill-none" strokeWidth="1" strokeDasharray="4 4" />
                  
                  {/* Progress Gauge */}
                  <circle cx="50%" cy="50%" r="42%" className="stroke-slate-100 fill-none" strokeWidth="14" />
                  <motion.circle
                    cx="50%" cy="50%" r="42%"
                    className="stroke-[#FF6B2B] fill-none"
                    strokeWidth="14"
                    strokeDasharray="264"
                    initial={{ strokeDashoffset: 264 }}
                    animate={{ strokeDashoffset: 264 - (264 * 0.64) }}
                    transition={{ duration: 2, delay: 0.5 }}
                    strokeLinecap="round"
                  />
                  
                  {/* Inner Orbit Circle */}
                  <circle cx="50%" cy="50%" r="30%" className="stroke-primary/10 fill-none" strokeWidth="1" />
                </svg>
                
                <div className="absolute flex flex-col items-center">
                  <div className="text-[10px] font-black text-ink-hint uppercase tracking-widest mb-1">Score</div>
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-mono-xl text-[72px] font-black leading-none text-ink-primary"
                  >
                    64
                  </motion.div>
                  <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mt-3 bg-primary/10 px-3 py-1 rounded-full">High Confidence</div>
                </div>
              </div>
           </div>

           {/* Aura Effect */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -z-0 opacity-40 group-hover:opacity-60 transition-opacity" />
        </Card>

        {/* Live Data Ingest Section */}
        <section className="space-y-4">
           <div className="flex justify-between items-center px-1">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-ink-hint flex items-center gap-2">
                 <Terminal size={14} className="text-primary" /> Live Ingest Feed
              </h3>
              <div className="text-[9px] font-mono text-emerald-500 font-bold flex items-center gap-1.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE STREAMING
              </div>
           </div>
           <div className="bg-white border border-border-light rounded-[32px] p-8 font-mono space-y-6 shadow-sm">
              <div className="grid grid-cols-2 gap-y-6">
                 {[
                   { label: "Humidity", val: "84%", icon: Activity },
                   { label: "IoT Mesh", val: "99.2%", icon: Radio },
                   { label: "Wind Gust", val: "12km/h", icon: Wind },
                   { label: "Pollen", val: "Low", icon: ShieldCheck }
                 ].map((stat, i) => (
                   <div key={i} className="flex flex-col gap-2">
                      <div className="text-[9px] text-ink-hint uppercase font-bold tracking-widest flex items-center gap-2">
                         <stat.icon size={12} className="text-primary" /> {stat.label}
                      </div>
                      <div className="text-sm text-ink-primary font-black">{stat.val}</div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Risk Radar Chart */}
        <Card className="p-10 bg-white border-border-light rounded-[48px] space-y-8 shadow-sm">
           <div className="text-center">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-primary mb-2">Exposure Decomposition</h3>
              <p className="text-[10px] text-ink-hint font-bold uppercase tracking-widest">Multi-dimensional risk factor analysis</p>
           </div>
           <RadarChart data={{
             "Rain": 85,
             "Wind": 42,
             "AQI": 65,
             "Traffic": 50,
             "Civic": 30
           }} />
           <div className="pt-6 border-t border-border-light text-[10px] text-ink-muted leading-relaxed text-center font-bold uppercase tracking-widest">
             Highest vulnerability identified in <br />
             <span className="text-primary font-black">Precipitation Intensity</span>
           </div>
        </Card>

        {/* Risk History Sparkline */}
        <section className="space-y-4">
           <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-ink-hint px-1">Risk Entropy (30D)</h3>
           <Card className="p-8 bg-surface-sunken border-border-light h-28 flex items-end gap-1.5 px-6 rounded-[32px]">
              {[40, 45, 30, 25, 50, 70, 85, 60, 40, 55, 64].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "flex-1 rounded-t-sm",
                    i === 10 ? "bg-primary shadow-[0_0_10px_rgba(255,107,43,0.3)]" : "bg-slate-300"
                  )}
                />
              ))}
           </Card>
        </section>

        {/* CTA Section */}
        <Card className="p-10 bg-slate-900 text-white border-none rounded-[48px] shadow-2xl relative overflow-hidden group">
           <div className="relative z-10 space-y-8 text-center">
              <div>
                 <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-3">Recommendation</div>
                 <h3 className="text-display-m text-3xl font-black">Standard Shield</h3>
                 <p className="text-[11px] text-white/60 mt-3 font-medium uppercase tracking-widest">Optimal 85% coverage for your dynamic profile.</p>
              </div>
              <Button 
                onClick={() => router.push('/dashboard')}
                className="w-full h-16 bg-white text-ink-primary uppercase font-black tracking-[0.2em] text-[11px] rounded-[20px] hover:bg-slate-100 transition-all shadow-xl"
              >
                Engage Protection <Zap size={16} className="ml-2 fill-primary" />
              </Button>
           </div>
           <ShieldCheck className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-white/5 -rotate-12 group-hover:scale-110 transition-transform" />
        </Card>

        <div className="text-center py-8">
           <div className="text-[9px] font-black text-ink-hint uppercase tracking-[0.4em]">Model Node: EARN-V7-OMEGA</div>
           <Button variant="ghost" onClick={() => router.push('/onboarding/profile')} className="text-ink-hint mt-4 text-[10px] uppercase tracking-widest font-black">
              Revise Zone Selection <ChevronRight size={14} className="ml-1" />
           </Button>
        </div>
      </main>

      {/* Floating Verification Badge */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 bg-white/80 backdrop-blur-md border border-border-light px-5 py-2.5 rounded-full flex items-center gap-3 shadow-lg">
         <Radio size={14} className="text-primary animate-pulse" />
         <span className="text-[9px] font-black uppercase tracking-widest text-ink-primary">Guidewire Cloud Verified</span>
      </div>
    </MobileWrapper>
  );
}
