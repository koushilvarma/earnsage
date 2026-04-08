"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Trophy, Medal, Star, TrendingUp, Users, Shield, Zap, Target, Activity, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { Logo } from '@/components/shared/Logo';
import { cn } from '@/lib/utils';

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  stability: number;
  miles: number;
  isCurrentUser?: boolean;
}

const leaderboardData: LeaderboardEntry[] = [
  { id: '1', rank: 1, name: 'Aditya S.', stability: 99.8, miles: 4210 },
  { id: '2', rank: 2, name: 'Priya M.', stability: 99.5, miles: 3850 },
  { id: '3', rank: 3, name: 'Vikram K.', stability: 99.2, miles: 3620 },
  { id: '4', rank: 4, name: 'Ravi Kumar', stability: 98.7, miles: 3102, isCurrentUser: true },
  { id: '5', rank: 5, name: 'Ankita R.', stability: 98.4, miles: 2980 },
  { id: '6', rank: 6, name: 'Suresh L.', stability: 97.9, miles: 2750 },
];

export default function MeshLeaderboard() {
  const router = useRouter();
  const [tab, setTab] = useState<'stability' | 'miles'>('stability');

  return (
    <MobileWrapper className="bg-surface-base flex flex-col min-h-screen px-6 pt-12 pb-32">
       <header className="flex justify-between items-center mb-10">
         <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center text-ink-primary shadow-sm hover:scale-110 transition-transform">
               <ChevronLeft size={20} />
            </button>
            <Logo size={40} />
         </div>
         <button className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-white shadow-lg">
            <Share2 size={18} />
         </button>
      </header>

      <main className="space-y-8 flex-1">
         <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 rounded-full text-[9px] font-black text-amber-600 uppercase tracking-widest border border-amber-200 shadow-sm mb-2">
               <Trophy size={12} className="fill-amber-500" /> Mesh Elite Tier
            </div>
            <h2 className="text-display-m text-3xl font-black text-ink-primary tracking-tight italic">Node Rankings</h2>
            <p className="text-[11px] font-bold text-ink-secondary uppercase tracking-widest px-8">The most reliable riders in the <span className="text-primary italic">Autonomous Oracle Network</span>.</p>
         </div>

         {/* Personal Percentile Stats */}
         <div className="grid grid-cols-2 gap-4">
             <Card className="p-6 bg-slate-900 border-none rounded-[32px] shadow-xl relative overflow-hidden group">
                <div className="relative z-10 space-y-2 text-center">
                   <div className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em]">Rank Percentile</div>
                   <div className="text-3xl font-black text-white italic">Top 4%</div>
                </div>
                <Users className="absolute -right-4 -bottom-4 w-16 h-16 text-white/5 -rotate-12" />
             </Card>
             <Card className="p-6 bg-white border-border-light rounded-[32px] shadow-sm relative overflow-hidden group">
                <div className="relative z-10 space-y-2 text-center">
                   <div className="text-[9px] font-black text-ink-secondary uppercase tracking-[0.2em]">Trust Score</div>
                   <div className="text-3xl font-black text-primary italic">A+</div>
                </div>
                <Shield className="absolute -right-4 -bottom-4 w-16 h-16 text-primary/5 -rotate-12" />
             </Card>
         </div>

         {/* Leaderboard Table Container */}
         <section className="space-y-4">
            <div className="flex p-1.5 bg-slate-100 rounded-2xl gap-2">
               <button 
                  onClick={() => setTab('stability')}
                  className={cn(
                    "flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    tab === 'stability' ? "bg-white text-slate-900 shadow-sm scale-[1.02]" : "text-ink-secondary hover:text-ink-secondary"
                  )}
               >
                  Node Stability
               </button>
               <button 
                  onClick={() => setTab('miles')}
                  className={cn(
                    "flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    tab === 'miles' ? "bg-white text-slate-900 shadow-sm scale-[1.02]" : "text-ink-secondary hover:text-ink-secondary"
                  )}
               >
                  Neural Miles
               </button>
            </div>

            <div className="space-y-3">
               <AnimatePresence mode="wait">
                  {leaderboardData.map((entry, idx) => (
                    <motion.div 
                      key={entry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={cn(
                        "p-5 rounded-[28px] flex items-center gap-5 transition-all border",
                        entry.isCurrentUser 
                         ? "bg-slate-900 border-none shadow-xl scale-[1.02]" 
                         : "bg-white border-border-light shadow-sm"
                      )}
                    >
                       <div className={cn(
                         "w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0",
                         entry.rank === 1 ? "bg-amber-100 text-amber-600" : entry.rank === 2 ? "bg-slate-100 text-slate-500" : entry.rank === 3 ? "bg-orange-100 text-orange-600" : "bg-slate-50 text-ink-secondary"
                       )}>
                          {entry.rank === 1 ? <Medal size={18} /> : entry.rank}
                       </div>
                       <div className="flex-1">
                          <div className={cn("text-xs font-black uppercase tracking-tight", entry.isCurrentUser ? "text-white" : "text-ink-primary")}>
                             {entry.name} {entry.isCurrentUser && <span className="ml-2 text-[8px] px-2 py-0.5 bg-primary rounded-full italic">YOU</span>}
                          </div>
                          <div className={cn("text-[8px] font-bold uppercase tracking-widest mt-1", entry.isCurrentUser ? "text-white/60" : "text-ink-secondary")}>
                             {tab === 'stability' ? `Mesh Pulse: ${entry.stability}%` : `Distance Trace: ${entry.miles}km`}
                          </div>
                       </div>
                       <div className={cn("text-right", entry.isCurrentUser ? "text-white" : "text-ink-primary")}>
                          <div className="text-sm font-black italic">
                             {tab === 'stability' ? entry.stability : entry.miles}
                          </div>
                          <div className="text-[7px] font-bold uppercase tracking-[0.2em] text-emerald-500">
                             {tab === 'stability' ? 'Stable' : 'Km'}
                          </div>
                       </div>
                    </motion.div>
                  ))}
               </AnimatePresence>
            </div>
         </section>

         <Card className="p-8 border-dashed border-2 border-border-light rounded-[40px] flex flex-col items-center justify-center text-center gap-4 group hover:border-primary transition-all cursor-pointer">
            <div className="w-14 h-14 rounded-full bg-slate-50 border border-border-light flex items-center justify-center text-ink-secondary group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all">
               <Target size={24} />
            </div>
            <div className="space-y-1">
               <div className="text-xs font-black text-ink-primary uppercase tracking-wider">Next Tier Milestone</div>
               <p className="text-[10px] text-ink-secondary leading-relaxed font-black uppercase tracking-widest">Earn 420 more stability points for <span className="text-primary italic">Node Sovereignty</span>.</p>
            </div>
         </Card>
      </main>
    </MobileWrapper>
  );
}
