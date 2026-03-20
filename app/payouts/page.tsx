"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Filter, Download, Wallet, CloudRain, Wind, AlertTriangle, ChevronRight, Search, Calendar, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const payoutHistory = [
  { month: 'April 2024', total: '₹2,400', items: [
    { id: '1', type: 'Rain', zone: 'Koramangala', date: '12 Apr', amount: '₹800', status: 'Completed', color: 'text-accent' },
    { id: '2', type: 'AQI', zone: 'Whitefield', date: '08 Apr', amount: '₹800', status: 'Completed', color: 'text-accent' },
    { id: '3', type: 'Rain', zone: 'Indiranagar', date: '02 Apr', amount: '₹800', status: 'Completed', color: 'text-accent' },
  ]},
  { month: 'March 2024', total: '₹1,600', items: [
    { id: '4', type: 'Flood', zone: 'Bellandur', date: '28 Mar', amount: '₹800', status: 'Completed', color: 'text-accent' },
    { id: '5', type: 'Rain', zone: 'Koramangala', date: '15 Mar', amount: '₹800', status: 'Completed', color: 'text-accent' },
  ]}
];

export default function Payouts() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');

  return (
    <MobileWrapper withNav className="bg-secondary text-white pb-24">
      <header className="px-6 pt-8 pb-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-display-l">Payouts</h1>
          <button className="touch-target w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
            <Download size={20} className="text-primary" />
          </button>
        </div>

        {/* Balance Card */}
        <Card variant="gradient" className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] p-6 text-white border-0 shadow-raised mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">Lifetime Protection Earned</div>
              <div className="text-3xl font-space-mono font-bold">₹14,200</div>
            </div>
            <div className="bg-accent/20 text-accent px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-accent/20 flex items-center gap-1.5">
              <CheckCircle2 size={12} /> KYC Verified
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 h-12 bg-primary rounded-xl flex items-center justify-center gap-2 text-xs font-bold shadow-orange group transition-all">
              Withdraw Funds <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
              <Clock size={20} />
            </button>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6 mb-6">
          {['All', 'Completed', 'Scheduled', 'Pending'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shrink-0 border-1.5",
                activeTab === tab ? "bg-primary border-primary text-white shadow-orange" : "bg-white/5 border-white/10 text-text-muted"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <div className="px-6 space-y-8">
        {payoutHistory.map((group) => (
          <section key={group.month}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">{group.month}</h3>
              <span className="text-xs text-text-muted font-bold font-space-mono">{group.total}</span>
            </div>
            <div className="space-y-3">
              {group.items.map((item) => (
                <Card 
                  key={item.id} 
                  variant="dark" 
                  onClick={() => router.push(`/payouts/${item.id}`)}
                  className="bg-white/5 border-white/5 p-4 flex justify-between items-center group cursor-pointer active:scale-98 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-primary/5 transition-colors">
                      {item.type === 'Rain' && <CloudRain className="text-primary w-6 h-6" />}
                      {item.type === 'Flood' && <AlertTriangle className="text-warning w-6 h-6" />}
                      {item.type === 'AQI' && <Wind className="text-accent w-6 h-6" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold group-hover:text-primary transition-colors">{item.zone}</div>
                      <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest mt-1">
                        {item.date} • {item.type} Trigger
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-space-mono font-bold text-white mb-1">{item.amount}</div>
                    <div className={cn("text-[10px] font-bold uppercase tracking-widest", item.color)}>{item.status}</div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </MobileWrapper>
  );
}
