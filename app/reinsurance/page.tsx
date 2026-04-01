"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BarChart3, LineChart, PieChart, Info, ChevronLeft, ArrowUpRight, Landmark, FileText, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { cn } from '@/lib/utils';

const lossRatioData = [
  { month: 'Oct', ratio: 62 },
  { month: 'Nov', ratio: 58 },
  { month: 'Dec', ratio: 74 },
  { month: 'Jan', ratio: 65 },
  { month: 'Feb', ratio: 69 },
  { month: 'Mar', ratio: 61 },
];

export default function ReinsuranceDashboard() {
  const router = useRouter();

  return (
    <MobileWrapper className="bg-surface-base px-6 pt-8 pb-24 min-h-screen">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary">
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-display-l">Reinsurance</h1>
          <div className="text-[10px] font-bold text-ink-hint uppercase tracking-widest">Institutional Transparency</div>
        </div>
      </header>

      <div className="space-y-6">
        {/* Solvency Card */}
        <Card variant="dark" className="p-8 relative overflow-hidden bg-ink-primary border-none text-white">
           <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                 <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Shield className="text-primary" size={24} />
                 </div>
                 <div className="px-3 py-1 bg-status-success/20 text-status-success border border-status-success/30 rounded-full text-[9px] font-bold uppercase tracking-widest">
                   Capital Adequate
                 </div>
              </div>
              
              <div>
                 <div className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-2">Solvency II Ratio</div>
                 <div className="text-mono-xl text-[40px] leading-none">210.4%</div>
                 <div className="h-1.5 w-full bg-white/10 rounded-full mt-6 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-primary" />
                 </div>
                 <div className="flex justify-between mt-2 text-[9px] font-mono text-white/40 uppercase">
                    <span>Target: 150%</span>
                    <span>Current: 210%</span>
                 </div>
              </div>
           </div>
           <Landmark className="absolute right-[-20px] top-[-20px] w-40 h-40 text-white/5 -rotate-12" />
        </Card>

        {/* Global Financial Metrics */}
        <div className="grid grid-cols-2 gap-4">
           <Card className="p-5 flex flex-col justify-between h-32">
              <div className="text-[9px] font-bold text-ink-muted uppercase tracking-widest">Net Loss Ratio</div>
              <div>
                 <div className="text-mono-l text-xl">64.2%</div>
                 <div className="text-[9px] text-status-success font-bold mt-1">▼ 2.1% MoM</div>
              </div>
           </Card>
           <Card className="p-5 flex flex-col justify-between h-32">
              <div className="text-[9px] font-bold text-ink-muted uppercase tracking-widest">Claims Paid (YT)</div>
              <div>
                 <div className="text-mono-l text-xl">₹4.2 Cr</div>
                 <div className="text-[9px] text-ink-hint font-bold mt-1">Parametric Settlement</div>
              </div>
           </Card>
        </div>

        {/* Loss Ratio Chart */}
        <section className="space-y-4">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted px-1">Performance Trend</h3>
           <Card className="p-6 h-64 border-border-light shadow-sm">
              <div className="flex justify-between items-center mb-6">
                 <div className="text-xs font-bold text-ink-primary">Monthly Loss Ratio (%)</div>
                 <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-ink-hint">
                       <div className="w-2 h-2 rounded-full bg-primary" /> Target
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-ink-hint">
                       <div className="w-2 h-2 rounded-full bg-ink-primary" /> Actual
                    </div>
                 </div>
              </div>
              <div className="h-40 w-full -ml-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={lossRatioData}>
                       <defs>
                          <linearGradient id="colorRatio" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#0F172A" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#0F172A" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="month" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                       <Area type="monotone" dataKey="ratio" stroke="#0F172A" strokeWidth={2} fill="url(#colorRatio)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </Card>
        </section>

        {/* Treaty Structure */}
        <section className="space-y-4">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted px-1">Treaty Structure</h3>
           <div className="space-y-3">
              {[
                { label: "Partner", value: "Swiss Re / Munich Re (Mock)", icon: Landmark },
                { label: "Type", value: "Excess of Loss (XOL)", icon: FileText },
                { label: "Retention", value: "₹50 Cr per Aggregate Event", icon: Activity },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white border border-border-light rounded-2xl shadow-sm">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary">
                         <item.icon size={18} />
                      </div>
                      <div className="text-[10px] font-bold text-ink-muted uppercase tracking-widest">{item.label}</div>
                   </div>
                   <div className="text-xs font-bold text-ink-primary">{item.value}</div>
                </div>
              ))}
           </div>
        </section>

        <section className="bg-surface-raised border border-border-light p-6 rounded-3xl space-y-4">
           <div className="flex items-center gap-3">
              <Info className="text-primary" size={20} />
              <h4 className="text-subheading text-xs">Actuarial Disclaimer</h4>
           </div>
           <p className="text-[10px] text-ink-muted leading-relaxed italic">
              Data presented here reflects the aggregate performance of the Earn Sage risk pool. Solvency ratios are calculated based on IRDAI parametric sandbox guidelines.
           </p>
           <Button variant="secondary" className="w-full text-[9px] uppercase tracking-widest h-10 border-border-mid">
              Download Investor PDF <ArrowUpRight size={14} className="ml-1" />
           </Button>
        </section>
      </div>
    </MobileWrapper>
  );
}
