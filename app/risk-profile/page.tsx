"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CloudRain, Wind, AlertTriangle, ArrowRight, CheckCircle2, Info, TrendingDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const analysisSteps = [
  "Fetching Zonal Weather History...",
  "Calculating AQI Volatility Index...",
  "Detecting Monsoon Patterns...",
  "Analyzing Payout Probability...",
  "Finalizing Risk Score..."
];

const riskData = [
  { name: 'Risk', value: 72, color: '#FF6B2B' },
  { name: 'Safe', value: 28, color: '#1E3A5F' },
];

export default function RiskProfile() {
  const [loadingStep, setLoadingStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (loadingStep < analysisSteps.length) {
      const timer = setTimeout(() => setLoadingStep(prev => prev + 1), 1200);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setIsAnalyzing(false), 800);
    }
  }, [loadingStep]);

  if (isAnalyzing) {
    return (
      <div className="mobile-wrapper bg-secondary flex flex-col items-center justify-center p-8 text-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-48 h-48 border-2 border-primary/20 rounded-full flex items-center justify-center mb-12 relative"
        >
          <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse-subtle" />
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-orange"
          >
            <Shield className="text-white w-8 h-8" />
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={loadingStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <h2 className="text-display-l text-white">Analyzing Data...</h2>
            <p className="text-text-muted font-space-mono text-sm uppercase tracking-widest min-h-[40px]">
              {analysisSteps[loadingStep] || "Finalizing Results"}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 w-full max-w-[200px] h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            animate={{ width: `${(loadingStep / analysisSteps.length) * 100}%` }}
            className="h-full bg-primary shadow-orange"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-wrapper bg-secondary text-white p-6 pb-24 overflow-y-auto">
      <header className="flex items-center justify-between mb-8 pt-6">
        <h1 className="text-heading">AI Risk Analysis</h1>
        <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
          Partner Registry: 4928-VX
        </div>
      </header>

      {/* Progress */}
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-12">
        <motion.div initial={{ width: '66%' }} animate={{ width: '100%' }} className="h-full bg-primary" />
      </div>

      {/* Risk Gauge */}
      <section className="flex flex-col items-center mb-12">
        <div className="w-64 h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={100}
                startAngle={180}
                endAngle={0}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
            <span className="text-[54px] font-space-mono font-bold leading-none">72</span>
            <span className="text-text-muted text-xs uppercase font-bold tracking-widest mt-1">Risk Score</span>
            <div className="mt-4 bg-danger/20 text-danger border border-danger/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest group">
              High Risk
            </div>
          </div>
        </div>
      </section>

      {/* Insight Card */}
      <Card variant="gradient" className="mb-8 relative group overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <TrendingDown className="text-primary w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold mb-1">Impact Warning</h4>
            <p className="text-sm text-text-muted leading-relaxed">
              Based on your zone and hours, you are estimated to lose <span className="text-white font-bold">₹12,400</span> annually due to weather disruptions.
            </p>
          </div>
        </div>
      </Card>

      {/* Breakdown */}
      <div className="grid grid-cols-3 gap-3 mb-12">
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center gap-3">
          <CloudRain className="text-primary w-6 h-6" />
          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-text-muted mb-1">Rain</div>
            <div className="text-sm font-bold text-danger">High</div>
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center gap-3">
          <AlertTriangle className="text-warning w-6 h-6" />
          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-text-muted mb-1">Floods</div>
            <div className="text-sm font-bold text-warning">Medium</div>
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center gap-3">
          <Wind className="text-accent w-6 h-6" />
          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-text-muted mb-1">AQI</div>
            <div className="text-sm font-bold text-accent">Low</div>
          </div>
        </div>
      </div>

      {/* Plan Recommendation */}
      <label className="text-caption text-text-muted uppercase tracking-wider font-semibold mb-4 block">
        Recommended Protection
      </label>
      <Card variant="dark" className="bg-primary/5 border-primary/20 mb-12 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Standard Plan</div>
            <h3 className="text-xl font-bold">Best Value for You</h3>
          </div>
          <CheckCircle2 className="text-primary w-6 h-6" />
        </div>
        <ul className="space-y-3 mb-6">
          <li className="flex items-center gap-3 text-sm text-text-secondary">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            Covers Moderate to Heavy Rainfall
          </li>
          <li className="flex items-center gap-3 text-sm text-text-secondary">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            Payout up to ₹800 per session
          </li>
          <li className="flex items-center gap-3 text-sm text-text-secondary">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            Daily AI Monitoring & Alerts
          </li>
        </ul>
        <Button className="w-full" size="xl" onClick={() => router.push('/plans')}>
          View All Plans <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </Card>
      
      <div className="text-center">
        <p className="text-xs text-text-muted">Not satisfied with your score? <span className="underline">Recalculate.</span></p>
      </div>
    </div>
  );
}
