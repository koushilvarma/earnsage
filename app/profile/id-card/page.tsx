"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ShieldCheck, QrCode, Download, Share2, Info, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { cn } from '@/lib/utils';

export default function DigitalIDCard() {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <MobileWrapper className="bg-surface-base flex flex-col min-h-screen">
      <header className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-display-l">Digital ID</h1>
        </div>
      </header>

      <main className="flex-1 px-6 pt-8 flex flex-col items-center">
        {/* Flippable Card Container */}
        <div 
          className="relative w-full max-w-[320px] aspect-[1.586/1] cursor-pointer perspective-1000"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <motion.div
            className="w-full h-full relative transition-all duration-700 preserve-3d"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
          >
            {/* Front Side */}
            <Card variant="dark" className="absolute inset-0 backface-hidden p-6 flex flex-col justify-between overflow-hidden shadow-2xl border-none">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
                    <ShieldCheck className="text-ink-primary" size={18} />
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Earn Sage</span>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-status-success text-white text-[8px] font-bold uppercase tracking-widest">Active</div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-[8px] font-bold text-white/40 uppercase tracking-widest mb-1">Policyholder</div>
                  <div className="text-mono-xl text-lg text-white">RAVI KUMAR</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="text-[8px] font-bold text-white/40 uppercase tracking-widest mb-1">Policy ID</div>
                    <div className="text-mono-l text-xs text-white">ES-2025-BLR-1293</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] font-bold text-white/40 uppercase tracking-widest mb-1">Valid Until</div>
                    <div className="text-mono-l text-xs text-white">25 MAR 2025</div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white/5 rounded-full blur-2xl" />
              <div className="absolute bottom-[-10px] left-[-10px] w-16 h-16 bg-primary/10 rounded-full blur-xl" />
            </Card>

            {/* Back Side */}
            <Card className="absolute inset-0 backface-hidden p-6 flex flex-col justify-between items-center rotate-y-180 bg-white border-2 border-border-light shadow-2xl overflow-hidden">
               <div className="w-full flex justify-between items-center mb-2">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-ink-muted">Policy Verification</span>
                  <div className="text-[8px] font-bold text-status-success">AUTHENTICATED</div>
               </div>
               
               <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="p-3 bg-surface-raised border border-border-light rounded-2xl mb-4">
                    <QrCode size={120} className="text-ink-primary" />
                  </div>
                  <p className="text-[9px] text-center text-ink-muted max-w-[200px] italic">
                    Scan this QR code at partner locations or hospitals to verify your Earn Sage coverage status.
                  </p>
               </div>

               <div className="w-full flex justify-center gap-1 text-[8px] text-ink-hint font-mono">
                  <span>IRDAI_SB_2019_168_ES</span>
               </div>

               {/* Watermark */}
               <ShieldCheck className="absolute inset-0 m-auto text-surface-sunken/10 w-40 h-40 -z-10" />
            </Card>
          </motion.div>
        </div>

        <p className="text-[10px] text-ink-hint mt-8 italic flex items-center gap-2">
          <Info size={12} /> Tap the card to flip and show verification QR
        </p>

        <section className="w-full mt-12 space-y-6">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted">Quick Actions</h3>
           <div className="grid grid-cols-2 gap-4">
              <Button variant="secondary" className="h-14 gap-3 uppercase tracking-widest text-[9px]">
                 <Download size={16} /> Save to Wallet
              </Button>
              <Button variant="secondary" className="h-14 gap-3 uppercase tracking-widest text-[9px]">
                 <Share2 size={16} /> Share PDF
              </Button>
           </div>
        </section>

        <section className="w-full mt-8 bg-surface-raised border border-border-light p-6 rounded-3xl">
           <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="text-status-success" size={20} />
              <div className="text-heading text-sm lowercase">Verified Coverage</div>
           </div>
           <ul className="space-y-3">
              {[
                "Automatic parametric payouts enabled",
                "Instant bank settlement (~2 hours)",
                "24/7 Priority support access"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-[10px] text-ink-secondary">
                  <div className="w-1 h-1 rounded-full bg-status-success" />
                  {item}
                </li>
              ))}
           </ul>
        </section>
      </main>

      <footer className="p-6 pb-12">
        <Button className="w-full h-14 uppercase tracking-widest flex items-center justify-center gap-2">
          Contact Support <ArrowRight size={18} />
        </Button>
      </footer>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </MobileWrapper>
  );
}
