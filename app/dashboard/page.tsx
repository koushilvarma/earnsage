"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Wind, CloudRain, AlertTriangle, ArrowRight, Bell, ChevronRight, Wallet, Map as MapIcon, Info, HelpCircle, ShieldCheck, Sparkles, TrendingUp, Landmark, Activity, ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { useApp } from '@/components/shared/AppContext';
import { cn } from '@/lib/utils';

const chartData = [
  { day: 'Mon', risk: 20 },
  { day: 'Tue', risk: 45 },
  { day: 'Wed', risk: 30 },
  { day: 'Thu', risk: 80 },
  { day: 'Fri', risk: 65 },
  { day: 'Sat', risk: 40 },
  { day: 'Sun', risk: 25 },
];

const activityLogs = [
  { id: 1, type: 'payout', title: 'Payout Processed', desc: '+₹300.00 for Rainfall event', time: '2h ago', icon: Wallet, color: 'text-status-success' },
  { id: 2, type: 'risk', title: 'Risk Alert', desc: 'High rainfall in Koramangala', time: '4h ago', icon: AlertTriangle, color: 'text-status-warning' },
  { id: 3, type: 'policy', title: 'Policy Renewed', desc: 'Standard Shield active', time: '1d ago', icon: ShieldCheck, color: 'text-ink-primary' },
];

export default function Dashboard() {
  const router = useRouter();
  const { translations, setTheme, theme, setLanguage, language } = useApp();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [hasAlert, setHasAlert] = useState(true);

  const handleLogout = () => {
    // Perform any cleanup here
    router.push('/login');
  };

  return (
    <MobileWrapper withNav className="bg-surface-base px-6 pt-8 pb-24">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-ink-primary text-white flex items-center justify-center font-display font-bold">
            RK
          </div>
          <div>
            <h1 className="text-subheading uppercase tracking-widest text-[10px] text-ink-muted">Welcome back</h1>
            <div className="text-heading">Hey, Ravi</div>
          </div>
        </div>
        <button className="relative w-11 h-11 rounded-full bg-surface-raised border border-border-light flex items-center justify-center group">
          <Bell className="w-5 h-5 text-ink-primary group-hover:scale-110 transition-transform" />
          <div className="absolute top-2.5 right-2.5 w-4 h-4 bg-status-danger rounded-full border-2 border-white flex items-center justify-center text-[8px] font-mono font-bold text-white">
            2
          </div>
        </button>
      </header>

      <div className="space-y-6">
        {/* Protection Score & Hero Grid */}
        <div className="grid grid-cols-2 gap-4">
           {/* Protection Score Gauge */}
           <Card className="p-5 flex flex-col items-center justify-center text-center border-border-light relative overflow-hidden group">
              <div className="text-[9px] font-bold text-ink-muted uppercase tracking-widest mb-4">Protection Score</div>
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="50%" cy="50%" r="40%" className="stroke-surface-sunken fill-none" strokeWidth="6" />
                  <motion.circle 
                    cx="50%" cy="50%" r="40%" className="stroke-ink-primary fill-none" strokeWidth="6"
                    strokeDasharray="251" initial={{ strokeDashoffset: 251 }} animate={{ strokeDashoffset: 251 - (251 * 0.85) }}
                    transition={{ duration: 1.5, ease: "easeOut" }} strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <div className="text-mono-l text-xl">85</div>
                  <div className="text-[8px] font-bold text-ink-hint uppercase">Safe</div>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold text-status-danger hover:bg-slate-50 transition-colors uppercase tracking-widest"
              >
                 <ArrowRight size={14} /> {translations.logout}
              </button>
           </Card>

           {/* Quick Stats Card */}
           <Card className="p-5 bg-ink-primary text-white border-none flex flex-col justify-between">
              <div className="flex justify-between items-start">
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                   <Zap size={16} className="text-primary fill-primary/20" />
                 </div>
                 <Info size={14} className="text-white/30" />
              </div>
              <div>
                <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">Total Protected</div>
                <div className="text-mono-l text-2xl">₹12,400</div>
              </div>
           </Card>
        </div>

        {/* Hero Coverage Card */}
        <Card variant="dark" className="p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <div className="text-[9px] font-bold text-white/50 uppercase tracking-[0.2em]">Your Coverage</div>
              <div className="text-mono-xl text-3xl text-white">₹2,100 <span className="text-[10px] font-body font-normal text-white/50 tracking-normal uppercase">/ week</span></div>
            </div>
            <div className="px-3 py-1 bg-status-success/20 text-status-success border border-status-success/30 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
              Active
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-[10px] font-bold text-white/50 uppercase tracking-widest">
              <span>5 of 7 days</span>
              <span className="text-white">71%</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '71%' }} className="h-full bg-white" />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-[10px] text-white/40 font-mono">RENEWS MAR 25 · ₹49</div>
            <button className="text-primary text-[11px] font-bold uppercase tracking-widest flex items-center gap-1">
              Manage <ChevronRight size={14} />
            </button>
          </div>
          
          <Shield className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-white/5 -rotate-12" />
        </Card>

        {/* Dynamic Weather Banner */}
        <AnimatePresence mode="wait">
          {hasAlert ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-status-warning/10 border border-status-warning/20 p-4 rounded-xl flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-status-warning/20 flex items-center justify-center text-status-warning">
                <CloudRain size={20} />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-ink-primary">Moderate rain detected</div>
                <div className="text-[11px] text-ink-muted">Koramangala · Trigger monitoring active</div>
              </div>
              <button onClick={() => router.push('/triggers')} className="text-[10px] font-bold uppercase tracking-widest text-ink-primary underline underline-offset-4">
                View
              </button>
            </motion.div>
          ) : (
            <div className="bg-status-success/10 border border-status-success/20 p-4 rounded-xl flex items-center gap-4">
               <ShieldCheck className="text-status-success" size={20} />
               <span className="text-xs font-bold text-ink-primary">Clear skies · Bengaluru East · Safe to ride</span>
            </div>
          )}
        </AnimatePresence>

        {/* Risk Telemetry Chart */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">Risk Telemetry</h3>
            <div className="text-[10px] text-status-success font-bold uppercase tracking-widest flex items-center gap-1">
              <Zap size={10} className="fill-status-success" /> Live Updated
            </div>
          </div>
          <Card className="p-6 bg-white shadow-card border-border-light relative overflow-hidden">
            <div className="flex justify-between items-end mb-8">
               <div className="space-y-1">
                 <div className="text-caption">Today's Risk Level</div>
                 <div className="text-mono-xl">4.2 <span className="text-xs text-ink-hint font-normal">/ 10</span></div>
               </div>
               <div className="text-right">
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Earnings Under Care</div>
                  <div className="text-mono-l">₹1,600</div>
               </div>
            </div>

            <div className="h-40 w-full -mx-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRiskV3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0F172A" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0F172A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                  <Area type="monotone" dataKey="risk" stroke="#0F172A" fill="url(#colorRiskV3)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* Activity Feed */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">Activity Feed</h3>
            <button className="text-[10px] font-bold uppercase tracking-widest text-ink-hint flex items-center gap-1">
              Clear <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
             {activityLogs.map((log) => (
               <div key={log.id} className="flex gap-4 p-4 rounded-2xl bg-surface-raised border border-border-light/50">
                  <div className={cn("w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm", log.color)}>
                    <log.icon size={18} />
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between items-start">
                        <div className="text-xs font-bold text-ink-primary">{log.title}</div>
                        <span className="text-[9px] font-mono text-ink-hint">{log.time}</span>
                     </div>
                     <p className="text-[10px] text-ink-muted mt-0.5">{log.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </section>

        {/* Live Triggers */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">Trigger Monitor</h3>
            <button onClick={() => router.push('/triggers')} className="text-[11px] font-bold text-ink-primary flex items-center gap-1">
              View Map <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
             <Card className="flex items-center justify-between p-4 border-[#E2E8F0] bg-white group hover:border-border-mid transition-all">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-surface-raised border border-border-light flex items-center justify-center">
                   <CloudRain className="text-ink-primary" size={18} />
                 </div>
                 <div>
                   <div className="text-xs font-bold text-ink-primary">Rainfall · Koramangala</div>
                   <div className="text-[10px] text-ink-muted uppercase font-bold tracking-widest mt-1">48mm/hr · Critical</div>
                 </div>
               </div>
               <div className="px-3 py-1 bg-status-warning/10 text-status-warning border border-status-warning/20 rounded-full text-[9px] font-bold uppercase">
                 Elevated
               </div>
             </Card>
             <Card className="flex items-center justify-between p-4 border-[#E2E8F0] bg-white opacity-60">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-surface-raised border border-border-light flex items-center justify-center">
                   <Wind className="text-ink-primary" size={18} />
                 </div>
                 <div>
                   <div className="text-xs font-bold text-ink-primary">AQI · Bengaluru South</div>
                   <div className="text-[10px] text-ink-muted uppercase font-bold tracking-widest mt-1">142 · Moderate</div>
                 </div>
               </div>
               <div className="px-3 py-1 bg-status-success/10 text-status-success border border-status-success/20 rounded-full text-[9px] font-bold uppercase">
                 Clear
               </div>
             </Card>
          </div>
        </section>

        {/* Protection ROI */}
        <Card 
           variant="dark" 
           className="p-8 bg-[#FF6B2B] text-white border-none shadow-[0_20px_40px_rgba(255,107,43,0.3)] relative overflow-hidden group"
         >
            <div className="relative z-10 space-y-6">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                     <Sparkles size={20} className="text-white" />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Protection Benefit</div>
               </div>
               
               <div>
                  <h3 className="text-display-m text-3xl mb-2">5.06x ROI</h3>
                  <p className="text-[11px] text-white/70 max-w-[200px] leading-relaxed">
                    You've protected **₹5,950** in earnings this quarter. View your full efficiency report.
                  </p>
               </div>

               <Button 
                onClick={() => router.push('/stats')}
                className="bg-white text-[#FF6B2B] h-12 px-6 text-[10px] uppercase font-bold tracking-widest border-none hover:bg-white/90 shadow-xl"
               >
                  View Stats
               </Button>
            </div>
            {/* Abstract Shield Pattern */}
            <div className="absolute right-[-20px] top-[-20px] w-48 h-48 bg-white opacity-5 rounded-full" />
            <div className="absolute right-[20px] bottom-[-20px] w-32 h-32 bg-white opacity-10 rounded-full" />
         </Card>

        {/* Referral Card */}
        <Card className="p-6 bg-gradient-to-br from-[#FF6B2B] to-[#E8571A] text-white border-none relative overflow-hidden group">
            <div className="relative z-10">
               <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-white/80" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Referral Reward</span>
               </div>
               <h3 className="text-heading text-lg mb-2">Invite a Fellow Rider</h3>
               <p className="text-[11px] text-white/80 mb-6 leading-relaxed max-w-[200px]">
                 Get 1 week of <span className="font-bold text-white">Free Premium Armor</span> for every friend who joins.
               </p>
               <Button className="bg-white text-ink-primary hover:bg-white/90 h-10 text-[10px] uppercase tracking-widest px-6 border-none">
                 Invite Now
               </Button>
            </div>
            <Shield className="absolute right-[-10px] top-[-10px] w-32 h-32 text-white/5 -rotate-12 transition-transform group-hover:scale-110" />
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
            <Button variant="secondary" className="gap-3 h-14 uppercase tracking-[0.15em] text-[10px]" onClick={() => router.push('/payouts')}>
              <Wallet size={16} /> My Payouts
            </Button>
            <Button variant="primary" className="gap-3 h-14 uppercase tracking-[0.15em] text-[10px] bg-primary text-white border-none shadow-cta" onClick={() => router.push('/calculator')}>
              <TrendingUp size={16} /> Earnings Shield
            </Button>
         </div>

         {/* Community Feed Ticker */}
         <div className="bg-surface-raised border border-border-light rounded-2xl p-4 overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full w-2 bg-primary" />
            <div className="flex justify-between items-center mb-1">
               <span className="text-[9px] font-bold text-ink-muted uppercase tracking-widest">Community Impact</span>
               <div className="text-[8px] font-mono text-status-success animate-pulse">LIVE FEED</div>
            </div>
            <div className="text-[11px] text-ink-primary font-medium flex items-center gap-2">
               <Activity size={12} className="text-primary" /> 
               <motion.span
                 animate={{ x: [300, -300] }}
                 transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                 className="whitespace-nowrap"
               >
                 ₹400 sent to Rider #1293 (Rainfall) • ₹250 sent to Rider #0842 (AQI) • Solvency Ratio: 210.4% • 682 Riders Protected Today 
               </motion.span>
            </div>
         </div>

         {/* Institutional Transparency Link */}
         <button 
           onClick={() => router.push('/reinsurance')}
           className="w-full flex items-center justify-between p-5 bg-white border border-border-light rounded-2xl group active:scale-[0.98] transition-all"
         >
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Landmark size={18} />
               </div>
               <div className="text-left">
                  <div className="text-[11px] font-bold text-ink-primary">Institutional Dashboard</div>
                  <div className="text-[9px] text-ink-hint uppercase tracking-widest mt-0.5">Solvency & Reinsurance Data</div>
               </div>
            </div>
            <ArrowUpRight size={16} className="text-ink-hint group-hover:text-primary transition-colors" />
         </button>
      </div>

      {/* Floating Safe Mode Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/rider-safe-mode')}
        className="fixed bottom-24 right-6 w-14 h-14 bg-ink-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50 border-2 border-white/20"
      >
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        <Shield size={24} className="relative z-10" />
      </motion.button>
    </MobileWrapper>
  );
}
