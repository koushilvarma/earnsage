"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle2, CloudRain, AlertTriangle, ArrowRight, UserCheck, Smartphone, MapPin, Download, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { cn } from '@/lib/utils';

export default function ClaimVerification() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);

  const startVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(2);
    }, 3000);
  };

  return (
    <MobileWrapper className="bg-surface-base flex flex-col min-h-screen">
      <header className="px-6 pt-12 pb-6 text-center">
        <div className="w-16 h-16 rounded-full bg-status-danger/10 flex items-center justify-center mx-auto mb-6 border border-status-danger/20">
          <CloudRain className="text-status-danger animate-pulse" size={32} />
        </div>
        <h1 className="text-display-l text-2xl">Trigger Verification</h1>
        <p className="text-body text-ink-muted px-4">Our sensors detected 52mm/hr rainfall in your zone. Please verify your activity.</p>
      </header>

      <main className="flex-1 px-6 pt-8 space-y-12">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
               <div className="space-y-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-muted text-center italic">Required Action</div>
                  
                  <Card className="p-8 border-2 border-primary bg-primary/5 flex flex-col items-center gap-6 shadow-xl relative overflow-hidden group">
                     <div className="w-20 h-20 rounded-full bg-white border border-border-light flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        {isVerifying ? (
                           <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                              <Smartphone size={32} />
                           </motion.div>
                        ) : (
                           <UserCheck size={32} />
                        )}
                     </div>
                     <div className="text-center space-y-2">
                        <div className="text-heading text-lg">One-Tap Verification</div>
                        <p className="text-[10px] text-ink-muted max-w-[180px]">Holding your device for 3 seconds confirms you are active on the ground.</p>
                     </div>
                     
                     <Button 
                       disabled={isVerifying}
                       onClick={startVerification}
                       className="w-full h-16 bg-primary text-white border-none rounded-2xl shadow-cta relative overflow-hidden"
                     >
                        {isVerifying ? "Verifying Sensors..." : "Hold to Verify"}
                        {isVerifying && (
                           <motion.div 
                             initial={{ width: 0 }} 
                             animate={{ width: "100%" }} 
                             transition={{ duration: 3, ease: "linear" }}
                             className="absolute bottom-0 left-0 h-1.5 bg-white/30"
                           />
                        )}
                     </Button>
                  </Card>
               </div>

               <div className="grid grid-cols-2 gap-4 opacity-50 pointer-events-none">
                  <div className="flex flex-col items-center items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-surface-raised border flex items-center justify-center"><MapPin size={18} /></div>
                    <span className="text-[8px] font-bold uppercase">GPS Match</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-surface-raised border flex items-center justify-center"><Activity size={18} /></div>
                    <span className="text-[8px] font-bold uppercase">In-Motion</span>
                  </div>
               </div>
            </motion.div>
          ) : (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-10"
            >
               <div className="w-24 h-24 rounded-full bg-status-success flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(5,150,105,0.2)]">
                  <CheckCircle2 size={48} className="text-white" />
               </div>
               
               <div className="space-y-3">
                  <h2 className="text-display-l text-2xl">Claim Approved!</h2>
                  <p className="text-body text-ink-muted">Verification successful. ₹400 payout has been released to your primary wallet.</p>
               </div>

               <Card className="p-6 bg-surface-raised border border-border-light rounded-3xl space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-ink-muted">
                     <span>Reference ID</span>
                     <span className="text-ink-primary">PAY-8219-XQ</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-ink-muted">
                     <span>Time</span>
                     <span className="text-ink-primary">Just Now</span>
                  </div>
                  <div className="h-[1px] bg-border-light w-full" />
                  <div className="flex justify-between items-end">
                     <span className="text-[10px] font-bold uppercase text-ink-hint">Amount</span>
                     <span className="text-mono-xl text-3xl text-status-success">₹400.00</span>
                  </div>
               </Card>

               <div className="space-y-4">
                  <Button 
                    variant="secondary" className="w-full h-14 bg-white border-border-mid text-ink-primary uppercase tracking-widest text-[10px] gap-2"
                    onClick={() => router.push('/dashboard')}
                  >
                     <Download size={16} /> Download Tax Memo
                  </Button>
                  <Button 
                    className="w-full h-14 uppercase tracking-widest"
                    onClick={() => router.push('/dashboard')}
                  >
                     Back to Home
                  </Button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="p-6 pb-12 flex justify-center">
         <div className="flex items-center gap-2 text-ink-hint text-[10px] font-bold uppercase tracking-widest">
            <Shield size={12} /> Parametric Protection Active
         </div>
      </footer>
    </MobileWrapper>
  );
}

function Activity({ size = 18, className = "" }) {
  return (
    <svg 
      width={size} height={size} viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
