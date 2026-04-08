"use client";
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Shield, CheckCircle2, ArrowRight, UserCheck, Smartphone, Landmark, FileText, X, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { Logo } from '@/components/shared/Logo';
import { cn } from '@/lib/utils';

export default function KYCVerification() {
  const [status, setStatus] = useState<'idle' | 'processing' | 'verified'>('idle');
  const [activeFlow, setActiveFlow] = useState<'ekyc' | 'upload' | 'node' | null>(null);
  const [flowStep, setFlowStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/kyc').then(res => res.json()).then(data => {
      if (data.status === 'VERIFIED') setStatus('verified');
    });
  }, []);

  const handleSuccess = async () => {
    setActiveFlow(null);
    setFlowStep(0);
    setStatus('processing');
    try {
      const res = await fetch('/api/kyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'VERIFY' })
      });
      const data = await res.json();
      if (data.success) {
        setTimeout(() => setStatus('verified'), 1500);
      }
    } catch (err) {
      setStatus('idle');
    }
  };

  const startVerification = async () => {
    setActiveFlow('ekyc'); // Default to e-KYC for the primary button
    setFlowStep(1);
  };

  return (
    <MobileWrapper className="bg-surface-base flex flex-col min-h-screen px-6 pt-12 pb-12 overflow-hidden">
      {/* Simulation Overlays */}
      <AnimatePresence>
        {activeFlow === 'ekyc' && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-[100] bg-white p-8 flex flex-col justify-center gap-12"
          >
            <button onClick={() => setActiveFlow(null)} className="absolute top-12 right-8 text-ink-hint hover:text-ink-primary"><X size={24} /></button>
            <div className="space-y-4 text-center">
              <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-500 flex items-center justify-center mx-auto mb-8">
                <Smartphone size={32} />
              </div>
              <h2 className="text-2xl font-black text-ink-primary tracking-tight">e-KYC Instant</h2>
              <p className="text-[11px] font-bold text-ink-hint uppercase tracking-widest px-8">We've sent a 6-digit node sync code to your registered mobile.</p>
            </div>
            
            <div className="flex justify-center gap-2">
               {[1,2,3,4,5,6].map((i) => (
                 <div key={i} className="w-10 h-14 rounded-xl border-2 border-slate-200 bg-slate-50 relative overflow-hidden">
                    {flowStep > i && (
                      <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="absolute inset-0 flex items-center justify-center font-black text-xl italic text-primary">
                        {Math.floor(Math.random() * 9)}
                      </motion.div>
                    )}
                 </div>
               ))}
            </div>

            <Button 
               onClick={() => {
                 if (flowStep < 7) setFlowStep(flowStep + 1);
                 if (flowStep === 6) handleSuccess();
               }}
               className="h-16 bg-slate-900 text-white rounded-3xl uppercase tracking-widest font-black"
            >
              {flowStep < 6 ? "Enter Next Digit" : "Finalize Sync"}
            </Button>
          </motion.div>
        )}

        {activeFlow === 'upload' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[100] bg-slate-900 p-8 flex flex-col justify-center gap-8"
          >
            <button onClick={() => setActiveFlow(null)} className="absolute top-12 right-8 text-white/50"><X size={24} /></button>
            <div className="relative aspect-[3/4] rounded-[48px] border-2 border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center overflow-hidden">
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-1 bg-primary shadow-[0_0_20px_#FF6B2B]" 
                />
                <FileText size={48} className="text-white/20 mb-4" />
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Document Mesh Vision</div>
            </div>
            <div className="text-center space-y-2">
               <div className="text-lg font-black text-white italic">Scanning Identity Node...</div>
               <div className="text-[10px] text-white/30 tracking-widest uppercase">Encryption: AES-256 P2P</div>
            </div>
            <Button onClick={handleSuccess} className="h-16 bg-white text-slate-900 rounded-3xl uppercase tracking-widest font-black">
               Confirm Scan Output
            </Button>
          </motion.div>
        )}

        {activeFlow === 'node' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white p-8 flex flex-col justify-center items-center text-center gap-12"
          >
             <button onClick={() => setActiveFlow(null)} className="absolute top-12 right-8 text-ink-hint"><X size={24} /></button>
             <div className="relative w-40 h-40">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-dashed border-purple-100 rounded-full" 
                />
                <div className="absolute inset-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 shadow-inner">
                   <Landmark size={48} />
                </div>
             </div>
             <div className="space-y-4">
                <h2 className="text-2xl font-black text-ink-primary tracking-tight italic">Banking Node Sync</h2>
                <div className="space-y-2">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="flex items-center gap-3 text-[9px] font-bold tracking-widest uppercase text-left">
                        <CheckCircle2 size={12} className={flowStep >= i ? "text-emerald-500" : "text-slate-200"} />
                        <span className={flowStep >= i ? "text-ink-primary" : "text-ink-hint"}>
                          {i === 1 ? "Retrieving Aadhaar Hash" : i === 2 ? "Fetching UPI Virtual Address" : "Synchronizing Node Payouts"}
                        </span>
                     </div>
                   ))}
                </div>
             </div>
             <Button 
                onClick={() => {
                  if (flowStep < 3) setFlowStep(flowStep + 1);
                  else handleSuccess();
                }} 
                className="w-full h-16 bg-purple-600 text-white rounded-3xl uppercase tracking-widest font-black mt-8"
             >
                {flowStep < 3 ? "Process Next Node" : "Link Node & Finalize"}
             </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="flex justify-between items-center mb-12 relative z-10">
         <div className="flex items-center gap-4">
            <button onClick={() => router.push('/dashboard')} className="w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center text-ink-primary shadow-sm hover:scale-110 transition-transform">
               <ChevronLeft size={20} />
            </button>
            <Logo size={40} />
         </div>
         <div className={cn(
           "px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all duration-500",
           status === 'verified' 
            ? "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
            : status === 'processing'
            ? "bg-amber-50 text-amber-600 border-amber-100 animate-pulse"
            : "bg-slate-50 text-slate-400 border-slate-200"
         )}>
           {status === 'verified' ? "Node Verified" : status === 'processing' ? "Ingesting..." : "Pending"}
         </div>
      </header>

      <main className="flex-1 space-y-10 relative z-10">
         <Card className="p-10 border-none bg-white rounded-[48px] text-center space-y-8 shadow-2xl relative overflow-hidden group">
            <div className={cn(
               "absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 blur-[60px] opacity-20 transition-all duration-1000",
               status === 'verified' ? "bg-emerald-400" : status === 'processing' ? "bg-amber-400" : "bg-primary"
            )} />

            <div className="relative z-10 space-y-8">
               <div className="relative inline-block">
                  <div className={cn(
                    "w-24 h-24 rounded-full border border-border-light flex items-center justify-center transition-all duration-500 shadow-inner bg-slate-50",
                    status === 'verified' && "border-emerald-200 scale-110"
                  )}>
                     <AnimatePresence mode="wait">
                       {status === 'verified' ? (
                         <motion.div key="v" initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }}><Shield size={48} className="text-emerald-500 fill-emerald-50" /></motion.div>
                       ) : status === 'processing' ? (
                         <motion.div key="p" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}><UserCheck size={48} className="text-amber-500" /></motion.div>
                       ) : (
                         <motion.div key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><UserCheck size={48} className="text-slate-300" /></motion.div>
                       )}
                     </AnimatePresence>
                  </div>
                  {status === 'verified' && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                       <CheckCircle2 size={16} />
                    </motion.div>
                  )}
               </div>

               <div className="space-y-4">
                  <h2 className="text-2xl font-black text-ink-primary tracking-tight">Identity Oracle</h2>
                  <p className="text-[11px] font-bold text-ink-hint leading-relaxed px-6 uppercase tracking-widest">
                    Aadhaar or PAN required for <span className="text-emerald-600">Instant Automated Payouts</span> and Tier-1 status.
                  </p>
               </div>

               <Button 
                 onClick={startVerification}
                 disabled={status !== 'idle'}
                 className={cn(
                   "w-full h-16 transition-all uppercase tracking-[0.2em] font-black rounded-3xl shadow-xl",
                   status === 'verified' 
                    ? "bg-slate-100 text-slate-400 border-none" 
                    : "bg-slate-900 text-white border-none hover:bg-black hover:scale-[1.02]"
                 )}
               >
                 {status === 'idle' ? (
                   <>Commence Validation <ArrowRight size={18} className="ml-3 group-hover:translate-x-1" /></>
                 ) : status === 'processing' ? (
                   <span className="flex items-center gap-3">
                     <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity }}>SYNCING DATA...</motion.span>
                   </span>
                 ) : (
                   "Identity Validated"
                 )}
               </Button>
            </div>
         </Card>

         <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-ink-hint px-2">Secure Channels</h3>
            <div className="grid grid-cols-1 gap-4">
               {[
                 { id: 'ekyc', title: "e-KYC Instant", icon: Smartphone, detail: "OTP-Verified • Secure Channel", color: "text-blue-500 bg-blue-50" },
                 { id: 'upload', title: "Manual Upload", icon: FileText, detail: "Secure Document Vault", color: "text-amber-500 bg-amber-50" },
                 { id: 'node', title: "Node Connectivity", icon: Landmark, detail: "Unified Banking Hub", color: "text-purple-500 bg-purple-50" }
               ].map((m) => (
                 <motion.div 
                    key={m.id} 
                    whileHover={{ x: 8 }}
                    onClick={() => {
                      if (status === 'idle') {
                        setActiveFlow(m.id as any);
                        setFlowStep(1);
                      }
                    }}
                    className={cn(
                      "p-6 bg-white border border-border-light rounded-[32px] flex items-center gap-6 hover:border-primary/20 transition-all cursor-pointer shadow-sm relative overflow-hidden",
                      status === 'verified' && "opacity-50 cursor-not-allowed"
                    )}
                 >
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm", m.color)}>
                       <m.icon size={24} />
                    </div>
                    <div>
                       <div className="text-sm font-black text-ink-primary tracking-tight">{m.title}</div>
                       <div className="text-[9px] text-ink-hint font-bold uppercase tracking-widest mt-1">{m.detail}</div>
                    </div>
                    <ChevronRight size={16} className="ml-auto text-slate-300" />
                 </motion.div>
               ))}
            </div>
         </div>
         
         <div className="p-8 bg-slate-900 text-white rounded-[40px] flex gap-5 shadow-2xl relative overflow-hidden">
            <Info size={18} className="text-primary shrink-0 relative z-10" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed relative z-10 opacity-80">
               Documents are encrypted via AES-256 and shared only with Guidewire's automated claim node.
            </p>
            <Shield className="absolute -right-8 -bottom-8 w-24 h-24 text-white/5 -rotate-12" />
         </div>
      </main>

      <footer className="mt-12 text-center pb-8 relative z-10">
         <button 
           onClick={() => router.push('/dashboard')}
           className="text-ink-hint uppercase tracking-[0.3em] text-[9px] font-black border-b border-transparent hover:border-ink-hint transition-all"
         >
           Revise Decision Later
         </button>
      </footer>
    </MobileWrapper>
  );
}

function ChevronRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
