"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShieldCheck, ArrowRight, Share2, Sparkles, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// --- Confetti Component ---
const Confetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            top: -20, 
            left: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5,
            rotate: 0,
            opacity: 1
          }}
          animate={{ 
            top: '110%', 
            left: `${Math.random() * 100}%`,
            rotate: Math.random() * 720,
            opacity: 0
          }}
          transition={{ 
            duration: 3 + Math.random() * 2, 
            ease: "linear",
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute w-2 h-2 rounded-sm"
          style={{ 
            backgroundColor: ['#FF6B2B', '#00D4AA', '#3ECFFF', '#FFB830'][Math.floor(Math.random() * 4)] 
          }}
        />
      ))}
    </div>
  );
};

export default function ActivationSuccess() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mobile-wrapper bg-secondary text-white items-center justify-center p-6 text-center overflow-hidden">
      {showConfetti && <Confetti />}

      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Animated Shield */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
          <div className="relative w-32 h-32 bg-accent rounded-3xl flex items-center justify-center shadow-green rotate-12">
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Check className="text-white w-16 h-16 -rotate-12 stroke-[3]" />
            </motion.div>
          </div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: 'spring' }}
            className="absolute -top-4 -right-4 bg-primary p-3 rounded-2xl shadow-orange"
          >
            <Sparkles className="text-white w-6 h-6" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h1 className="text-display-xl mb-4 text-white">Cover Activated!</h1>
          <p className="text-text-muted text-base max-w-[280px] mx-auto leading-relaxed">
            Your <span className="text-white font-bold">Standard Pro</span> protection is now live for <span className="text-white font-bold">Bengaluru East</span>.
          </p>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="w-full mt-12 space-y-4"
        >
          <Card variant="dark" className="bg-white/5 border-white/10 p-5 flex items-center justify-between text-left">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <ShieldCheck className="text-accent w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Policy #ES-4928-VX</div>
                <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Digital Certificate Issued</div>
              </div>
            </div>
            <button className="text-primary touch-target">
              <Download size={20} />
            </button>
          </Card>

          <Card variant="dark" className="bg-white/5 border-white/10 p-5 flex items-center justify-between text-left">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Check className="text-primary w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">₹51.00 Paid</div>
                <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Transaction Successful</div>
              </div>
            </div>
            <div className="text-[10px] bg-white/10 px-2 py-1 rounded font-bold uppercase tracking-widest text-text-muted">UPI</div>
          </Card>
        </motion.div>
      </div>

      <div className="mt-auto space-y-4 pb-8">
        <Button 
          className="w-full text-lg font-bold group" 
          size="xl" 
          onClick={() => router.push('/dashboard')}
        >
          Go to Dashboard
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        <button 
          onClick={() => {}} 
          className="flex items-center justify-center gap-2 text-text-muted text-sm font-bold w-full py-4 tracking-widest uppercase"
        >
          <Share2 size={16} /> Share with Partners
        </button>
      </div>
    </div>
  );
}
