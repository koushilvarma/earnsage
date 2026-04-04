"use client";
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Wind, CloudRain, AlertTriangle, ArrowRight, Bell, ChevronRight, Wallet, Map as MapIcon, MapPin, Info, HelpCircle, ShieldCheck, Sparkles, TrendingUp, Landmark, Activity, ArrowUpRight, UserCheck, Sliders, Smartphone, MoreHorizontal, Radio } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { useApp } from '@/components/shared/AppContext';
import { cn } from '@/lib/utils';

import { Logo } from '@/components/shared/Logo';
import { LiveMap } from '@/components/shared/LiveMap';

const chartData = [
  { day: 'Mon', risk: 20 },
  { day: 'Tue', risk: 45 },
  { day: 'Wed', risk: 30 },
  { day: 'Thu', risk: 80 },
  { day: 'Fri', risk: 65 },
  { day: 'Sat', risk: 40 },
  { day: 'Sun', risk: 25 },
];

const quickActions = [
  { id: 'kyc', label: 'Verify KYC', icon: UserCheck, path: '/kyc', color: 'bg-emerald-500/10 text-emerald-600' },
  { id: 'forecast', label: 'Simulator', icon: Activity, path: '/forecast', color: 'bg-primary/10 text-primary' },
  { id: 'reinsurance', label: 'Institutional', icon: Landmark, path: '/reinsurance', color: 'bg-blue-500/10 text-blue-600' },
  { id: 'calculator', label: 'Calculator', icon: Wallet, path: '/calculator', color: 'bg-purple-500/10 text-purple-600' },
  { id: 'customize', label: 'Custom Armor', icon: Sliders, path: '/customize', color: 'bg-amber-500/10 text-amber-600' },
];

export default function Dashboard() {
  const { translations } = useApp();
  const [profile, setProfile] = useState<any>(null);
  const [meshData, setMeshData] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);
  const [actuary, setActuary] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    // Fetch initial profile & actuary
    fetch('/api/profile').then(res => res.json()).then(setProfile).catch(() => {});
    fetch('/api/actuary').then(res => res.json()).then(setActuary).catch(() => {});
    
    // Polling Mesh & Weather every 5 seconds
    const interval = setInterval(() => {
      fetch('/api/mesh').then(res => res.json()).then(setMeshData).catch(() => {});
      fetch('/api/weather').then(res => res.json()).then(setWeather).catch(() => {});
    }, 5000);
    
    // Initial weather fetch
    fetch('/api/weather').then(res => res.json()).then(setWeather).catch(() => {});
    
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  return (
    <MobileWrapper withNav className="bg-surface-base px-0 pt-8 pb-32">
      {/* Header & Neural Oracle */}
      <header className="px-6 pt-4 mb-4">
        <div className="flex justify-between items-center mb-10">
           <Logo withText size={42} />
           <div className="flex gap-2">
              <button onClick={() => router.push('/support')} className="w-11 h-11 rounded-2xl bg-white border border-border-light flex items-center justify-center shadow-sm">
                <HelpCircle size={20} className="text-ink-primary" />
              </button>
              <button className="relative w-11 h-11 rounded-2xl bg-white border border-border-light flex items-center justify-center shadow-sm">
                 <Bell size={20} className="text-ink-primary" />
                 <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white" />
              </button>
           </div>
        </div>

        <div className="flex items-center gap-5 px-1 mb-8">
          <div className="w-16 h-16 rounded-[24px] bg-slate-900 flex items-center justify-center text-white font-black text-2xl shadow-xl ring-4 ring-white">
            {profile?.name?.split(' ').map((n:any) => n[0]).join('') || 'RK'}
          </div>
          <div>
            <div className="text-display-m text-2xl font-black tracking-tight">{profile?.name || 'Ravi Kumar'}</div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                <MapPin size={10} className="fill-primary" /> {profile?.cityHub || 'Bengaluru East'}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-ink-hint uppercase tracking-widest">
                <ShieldCheck size={10} className={cn(profile?.activeShield ? "text-emerald-500" : "text-amber-500")} /> {profile?.protectionTier || 'Premium Shield'} · ₹{actuary?.total || '57.82'}/wk
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Risk & Weather Oracle */}
        <div className="grid grid-cols-2 gap-4 mb-6">
           <div className="p-5 bg-white border border-border-light rounded-[32px] shadow-sm relative overflow-hidden group">
              <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-3">
                    <CloudRain size={16} className="text-blue-500" />
                    <span className="text-[9px] font-black text-ink-hint uppercase tracking-widest">Neural Weather</span>
                 </div>
                 <div className="text-xl font-black text-ink-primary mb-1">
                    {weather?.condition || 'Cloudy'}
                 </div>
                 <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                    {weather?.forecast?.[1]?.condition || 'Rain'} at {weather?.forecast?.[1]?.time || '15:00'}
                 </div>
              </div>
              {weather?.isSurgeActive && (
                 <div className="absolute top-3 right-3 animate-pulse">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                 </div>
              )}
           </div>
           <div className="p-5 bg-white border border-border-light rounded-[32px] shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                 <Zap size={16} className="text-primary" />
                 <span className="text-[9px] font-black text-ink-hint uppercase tracking-widest">Surge Mode</span>
              </div>
              <div className="text-xl font-black text-ink-primary mb-1">
                 {actuary?.surgeMultiplier || '1.0'}x
              </div>
              <div className={cn("text-[10px] font-bold uppercase tracking-widest", weather?.isSurgeActive ? "text-primary" : "text-emerald-500")}>
                 {weather?.isSurgeActive ? 'Premium Surge Active' : 'Stable Rates'}
              </div>
           </div>
        </div>

        {/* Neural Hub Visualization */}
        <div className="p-6 bg-slate-900 rounded-[32px] overflow-hidden relative group">
           <div className="relative z-10 flex items-center gap-6">
              <div className="relative w-16 h-16 shrink-0">
                 <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
                    <motion.path 
                      d="M50 20 C30 20 20 40 20 55 C20 75 40 85 50 85 C60 85 80 75 80 55 C80 40 70 20 50 20 Z" 
                      fill="none" stroke="currentColor" strokeWidth="2"
                      animate={{ strokeWidth: [2, 4, 2], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.circle cx="50" cy="50" r="10" fill="currentColor" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
                    <circle cx="35" cy="45" r="3" fill="currentColor" opacity="0.4" />
                    <circle cx="65" cy="45" r="3" fill="currentColor" opacity="0.4" />
                    <circle cx="50" cy="70" r="3" fill="currentColor" opacity="0.4" />
                    {/* Connections */}
                    <line x1="50" y1="50" x2="35" y2="45" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                    <line x1="50" y1="50" x2="65" y2="45" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                    <line x1="50" y1="50" x2="50" y2="70" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                 </svg>
                 <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              </div>
              <div className="flex-1">
                 <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Neural Ingest Sink</span>
                    <span className="text-[9px] font-bold text-emerald-400 font-mono">Live</span>
                 </div>
                 <div className="text-xs font-black text-white">Aggregating 1,248 Node Packets</div>
                 <div className="flex items-center gap-2 mt-2">
                    <div className="px-1.5 py-0.5 bg-emerald-500/20 rounded border border-emerald-500/30 text-emerald-400 text-[8px] font-mono font-black uppercase tracking-wider">
                       524 Nodes Active
                    </div>
                    <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                       <motion.div animate={{ x: [-100, 200] }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} className="h-full w-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
                    </div>
                 </div>
              </div>
           </div>
           {/* Decorative background labels */}
           <div className="absolute top-2 right-4 text-[7px] font-mono text-white/10 uppercase">PREDICTING: {weather?.isSurgeActive ? 'Delivery_Outrage_Prob_0.84' : 'Flood_Prob_0.14'}</div>
           <div className="absolute bottom-2 right-4 text-[7px] font-mono text-white/10 uppercase">CLASSIFYING: {weather?.condition === 'Storm' ? 'Storm_Cell_01' : 'Rain_Cell_41'}</div>
        </div>
      </header>

      {/* Quick Action Carousel */}
      <section className="mb-8">
        <div className="px-6 flex justify-between items-center mb-4">
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-ink-hint">Active Modules</h3>
           <Sparkles size={14} className="text-primary" />
        </div>
        <div className="flex overflow-x-auto gap-4 px-6 no-scrollbar pb-2">
           {quickActions.map((action) => (
             <button 
               key={action.id}
               onClick={() => router.push(action.path)}
               className="flex-shrink-0 flex flex-col items-center gap-3"
             >
                <div className={cn("w-16 h-16 rounded-[24px] flex items-center justify-center shadow-sm border border-transparent hover:border-primary/20 hover:scale-105 transition-all text-sm", action.color)}>
                   <action.icon size={26} />
                </div>
                <span className="text-[10px] font-bold text-ink-secondary uppercase tracking-wider">{action.label}</span>
             </button>
           ))}
        </div>
      </section>

      {/* Main Stats Hub */}
      <main className="px-6 space-y-8">
        {/* Tactical Mesh Monitoring (THE MAP) */}
        <section className="space-y-4">
           <div className="flex justify-between items-center px-1">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-ink-hint">Neural Mesh Monitoring</h3>
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-primary uppercase tracking-widest">
                 <Radio size={12} className="animate-pulse" /> Live IoT Feed
              </div>
           </div>
           <Card className="h-[350px] w-full rounded-[48px] overflow-hidden border-border-light shadow-2xl relative group bg-slate-50">
              <LiveMap />
              <div className="absolute top-4 left-4 z-40 bg-ink-primary text-white text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full shadow-lg border border-white/10 animate-pulse">
                {meshData?.activeNodes || 5} Localized Rider Nodes
              </div>
           </Card>
        </section>

        {/* Hero Card: Coverage Status */}
        <Card variant="dark" className="p-8 bg-slate-900 border-none rounded-[40px] relative overflow-hidden group shadow-2xl">
           <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-8">
                 <div className="space-y-1">
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Surveillance Mode</div>
                    <div className="text-3xl font-black text-white">Active Armor</div>
                 </div>
                 <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Tier-1
                 </div>
              </div>

              <div className="mt-auto space-y-6">
                 <div className="flex justify-between items-end">
                    <div>
                       <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-1">Weekly Payout Cap</div>
                       <div className="text-mono-xl text-4xl text-white">₹2,100</div>
                    </div>
                    <div className="text-right">
                       <div className="text-[9px] font-bold text-primary uppercase tracking-widest mb-1">Efficiency</div>
                       <div className="text-xl font-bold text-white">94%</div>
                    </div>
                 </div>
                 
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase">
                       <span>7-Day Risk Entropy</span>
                       <span className="text-white">Low</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: '25%' }} className="h-full bg-white" />
                    </div>
                 </div>
              </div>
           </div>
           {/* Abstract Background Elements */}
           <Shield className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-white/5 -rotate-12 transition-transform group-hover:scale-110" />
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
        </Card>

        {/* Feature Grid: Forecast vs Reinsurance */}
        <div className="grid grid-cols-2 gap-4">
           <button 
             onClick={() => router.push('/forecast')}
             className="text-left bg-white border border-border-light p-6 rounded-[32px] shadow-sm hover:shadow-md transition-all group"
           >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                 <Activity size={20} />
              </div>
              <h3 className="text-sm font-black text-ink-primary mb-1">Forecast</h3>
              <p className="text-[10px] text-ink-hint leading-tight text-balance">Simulate triggers and payouts in real-time.</p>
           </button>
           <button 
             onClick={() => router.push('/reinsurance')}
             className="text-left bg-white border border-border-light p-6 rounded-[32px] shadow-sm hover:shadow-md transition-all group"
           >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                 <Landmark size={20} />
              </div>
              <h3 className="text-sm font-black text-ink-primary mb-1">Reinsurance</h3>
              <p className="text-[10px] text-ink-hint leading-tight text-balance">Institutional solvency & market health.</p>
           </button>
        </div>

        {/* Risk Telemetry Chart */}
        <section className="space-y-4">
           <div className="flex justify-between items-center px-1">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-ink-hint">Risk Telemetry</h3>
              <div className="flex items-center gap-2 text-[9px] font-bold text-status-success uppercase tracking-widest">
                 <div className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" /> Live Feed
              </div>
           </div>
           <Card className="p-8 bg-white border-border-light rounded-[40px] shadow-sm">
              <div className="h-48 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                       <defs>
                          <linearGradient id="colorRiskDash" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#FF6B2B" stopOpacity={0.2}/>
                             <stop offset="95%" stopColor="#FF6B2B" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={9} stroke="#94a3b8" tickMargin={10} />
                       <Area type="monotone" dataKey="risk" stroke="#FF6B2B" strokeWidth={3} fillOpacity={1} fill="url(#colorRiskDash)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </Card>
        </section>

        {/* Floating Action Button for Safe Mode (More prominent) */}
        <button 
           onClick={() => router.push('/rider-safe-mode')}
           className="w-full p-6 bg-ink-primary text-white rounded-[32px] flex items-center justify-between group shadow-xl hover:bg-slate-800 transition-all"
        >
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                 <Shield size={24} />
              </div>
              <div className="text-left">
                 <div className="text-lg font-black leading-none mb-1">Rider Safe Mode</div>
                 <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Autonomous Incident Log</div>
              </div>
           </div>
           <ArrowRight size={20} className="text-white/20 group-hover:text-white transition-colors" />
        </button>

        {/* Footer Info */}
        <div className="text-center py-8">
           <div className="text-[9px] font-bold text-ink-hint uppercase tracking-[0.4em] mb-4">Earn Sage Node V10.2.4</div>
           <div className="flex justify-center gap-6">
              <button className="text-[10px] font-bold text-ink-secondary uppercase tracking-widest border-b border-transparent hover:border-ink-secondary">Privacy</button>
              <button className="text-[10px] font-bold text-ink-secondary uppercase tracking-widest border-b border-transparent hover:border-ink-secondary">Legal</button>
              <button className="text-[10px] font-bold text-ink-secondary uppercase tracking-widest border-b border-transparent hover:border-ink-secondary">Nodes</button>
           </div>
        </div>
      </main>
    </MobileWrapper>
  );
}
