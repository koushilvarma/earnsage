"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Wind, CloudRain, AlertTriangle, ArrowRight, Bell, ChevronRight, Wallet, Map as MapIcon, Info, HelpCircle, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const chartData = [
  { day: 'Mon', risk: 20 },
  { day: 'Tue', risk: 45 },
  { day: 'Wed', risk: 30 },
  { day: 'Thu', risk: 80 },
  { day: 'Fri', risk: 65 },
  { day: 'Sat', risk: 40 },
  { day: 'Sun', risk: 25 },
];

export default function Dashboard() {
  const router = useRouter();
  const [hasAlert, setHasAlert] = useState(true);

  return (
    <MobileWrapper withNav className="bg-secondary text-white pb-24">
      <header className="px-6 pt-8 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20">
            <Shield className="text-primary w-6 h-6" />
          </div>
          <div>
            <h1 className="text-heading">Earn Sage</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">AI Monitor Active</span>
            </div>
          </div>
        </div>
        <button className="relative touch-target -mr-3">
          <Bell className="w-6 h-6 text-text-muted" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-secondary" />
        </button>
      </header>

      <div className="px-6 space-y-6">
        {/* Context Hero */}
        <AnimatePresence mode="wait">
          {hasAlert ? (
            <motion.div
              key="alert"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative group"
            >
              <Card variant="gradient" className="bg-gradient-to-br from-[#FF6B2B] to-[#FF8F5E] p-6 text-white border-0 shadow-orange overflow-hidden">
                <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-1">
                    <div className="bg-white/20 text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded w-fit">Weather Alert</div>
                    <h2 className="text-2xl font-bold">Heavy Rain Imminent</h2>
                    <p className="text-white/80 text-sm">Bengaluru East • Expect disruption at 4:30 PM</p>
                  </div>
                  <CloudRain className="w-12 h-12 text-white/30" />
                </div>
                <div className="mt-6 flex gap-3 relative z-10">
                  <div className="flex-1 bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/20">
                    <div className="text-[10px] uppercase font-bold text-white/60 mb-1">Potential Payout</div>
                    <div className="text-lg font-space-mono font-bold">₹800</div>
                  </div>
                  <div className="flex-1 bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/20">
                    <div className="text-[10px] uppercase font-bold text-white/60 mb-1">Trigger Confidence</div>
                    <div className="text-lg font-space-mono font-bold">92%</div>
                  </div>
                </div>
                {/* Background Decor */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              </Card>
            </motion.div>
          ) : (
            <Card variant="dark" className="bg-accent/5 border-accent/20 p-6 flex flex-col items-center text-center">
              <ShieldCheck className="text-accent w-12 h-12 mb-4" />
              <h2 className="text-xl font-bold">Coverage Active</h2>
              <p className="text-text-muted text-sm px-4">Clear skies detected. Your income is protected against any sudden changes.</p>
            </Card>
          )}
        </AnimatePresence>

        {/* Live Trigger Monitor */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted">Live Trigger Monitor</h3>
            <button onClick={() => router.push('/triggers')} className="text-primary text-xs font-bold flex items-center gap-1 uppercase tracking-widest">
              Live Map <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
            <Card variant="dark" className="w-[200px] shrink-0 p-4 border-white/5 bg-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CloudRain className="text-primary w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-danger uppercase">Critical</span>
              </div>
              <div>
                <div className="text-sm font-bold">Bengaluru East</div>
                <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest mt-1">High Intensity</div>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div animate={{ width: '85%' }} className="h-full bg-primary shadow-orange" />
              </div>
            </Card>
            
            <Card variant="dark" className="w-[200px] shrink-0 p-4 border-white/5 bg-white/5 space-y-4 opacity-60">
              <div className="flex justify-between items-center">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Wind className="text-accent w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-accent uppercase">Stable</span>
              </div>
              <div>
                <div className="text-sm font-bold">Bengaluru South</div>
                <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest mt-1">AQI: 142 (Normal)</div>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div animate={{ width: '20%' }} className="h-full bg-accent" />
              </div>
            </Card>
          </div>
        </section>

        {/* Protection Stats */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4">Risk Telemetry</h3>
          <Card variant="dark" className="p-6 bg-white/5 border-white/5">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="text-xs text-text-muted uppercase font-bold tracking-widest mb-1">Today's Risk Level</div>
                <div className="text-3xl font-space-mono font-bold">4.2 <span className="text-sm text-text-muted font-normal uppercase">/ 10</span></div>
              </div>
              <div className="text-right">
                <div className="text-xs text-text-muted uppercase font-bold tracking-widest mb-1">Weekly Payouts</div>
                <div className="text-xl font-bold text-primary">₹1,600</div>
              </div>
            </div>
            
            <div className="h-48 w-full -mx-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B2B" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF6B2B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    stroke="#ffffff33" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#142240', border: 'none', borderRadius: '12px', fontSize: '12px' }}
                    itemStyle={{ color: '#FF6B2B' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="risk" 
                    stroke="#FF6B2B" 
                    fillOpacity={1} 
                    fill="url(#colorRisk)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4 pb-4">
            <button className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center gap-2 group transition-all hover:bg-white/10">
              <div className="p-3 bg-primary/10 rounded-full text-primary group-hover:scale-110 transition-transform">
                <Wallet size={20} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">Withdraw</span>
            </button>
            <button className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center gap-2 group transition-all hover:bg-white/10">
              <div className="p-3 bg-safe/10 rounded-full text-safe group-hover:scale-110 transition-transform">
                <MapIcon size={20} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">My Zone</span>
            </button>
          </div>
      </div>
    </MobileWrapper>
  );
}
