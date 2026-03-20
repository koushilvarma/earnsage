"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, CloudRain, ShieldCheck, ArrowRight, Smartphone, Banknote } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// --- Screen 0: Splash ---
const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,_#0A1628_0%,_#051020_100%)]">
      {/* Rain Particles */}
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="rain-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}%`,
            opacity: Math.random() * 0.5,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 1}s`,
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full" />
        <div className="relative w-20 h-20 bg-gradient-to-br from-primary to-[#FF8F5E] rounded-2xl flex items-center justify-center shadow-orange">
          <Shield className="text-white w-10 h-10" />
          <Zap className="absolute text-white w-5 h-5 bottom-4 right-4" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-display-xl text-white mb-2"
      >
        EARN SAGE
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-text-muted font-dm-sans text-sm tracking-wide"
      >
        Earn Every Day. Protected Always.
      </motion.p>

      {/* Loading Bar */}
      <div className="absolute bottom-20 w-48 h-[2px] bg-white/10 overflow-hidden rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, delay: 0.5, ease: 'easeInOut' }}
          className="h-full bg-primary"
        />
      </div>
    </div>
  );
};

// --- Screen 1: Onboarding ---
const onboardingSlides = [
  {
    id: 1,
    number: "4.2",
    unit: "disruption days per month",
    headline: "Rain stops you. Income shouldn't.",
    sub: "Every heavy rainfall, flood, or curfew costs you ₹500–₹1,200 in lost earnings.",
    icon: CloudRain,
    color: "primary"
  },
  {
    id: 2,
    icon: ShieldCheck,
    headline: "Zero claims. Zero paperwork.",
    sub: "Our AI watches weather, AQI and civic alerts in your zone 24/7.",
    steps: [
      { id: "📡", label: "AI Detects" },
      { id: "⚡", label: "Trigger Met" },
      { id: "💸", label: "Auto Payout" },
    ]
  },
  {
    id: 3,
    icon: Banknote,
    headline: "Less than ₹7/day for income protection.",
    sub: "Auto-deducted weekly. Cancel anytime.",
    stats: [
      { val: "₹49 / week", label: "Premium" },
      { val: "Up to ₹2,100", label: "Weekly Protection" },
      { val: "10,000+", label: "Partners Protected" },
    ]
  }
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="mobile-wrapper bg-secondary text-white font-dm-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="flex-1 flex flex-col p-6 pt-12"
        >
          <div className="flex justify-end mb-8">
            <button 
              onClick={() => router.push('/register')}
              className="text-text-muted text-sm hover:text-white transition-colors"
            >
              Skip
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {onboardingSlides[currentSlide].number ? (
              <div className="mb-8">
                <div className="text-[72px] font-space-mono text-primary leading-none mb-2">
                  {onboardingSlides[currentSlide].number}
                </div>
                <div className="text-text-muted uppercase tracking-[0.2em] font-space-mono text-sm">
                  {onboardingSlides[currentSlide].unit}
                </div>
              </div>
            ) : (
              <div className="mb-12 w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center">
                {React.createElement(onboardingSlides[currentSlide].icon, {
                  className: "text-primary w-10 h-10"
                })}
              </div>
            )}

            <h2 className="text-display-l mb-4 leading-tight">
              {onboardingSlides[currentSlide].headline}
            </h2>
            <p className="text-text-muted text-base mb-12 max-w-[90%]">
              {onboardingSlides[currentSlide].sub}
            </p>

            {onboardingSlides[currentSlide].steps && (
              <div className="flex items-center justify-between mb-12 bg-white/5 p-6 rounded-2xl border border-white/10">
                {onboardingSlides[currentSlide].steps.map((step, i) => (
                  <React.Fragment key={step.label}>
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-2xl">{step.id}</div>
                      <div className="text-[10px] uppercase font-bold text-text-muted">{step.label}</div>
                    </div>
                    {i < 2 && <ArrowRight className="text-white/20 w-4 h-4" />}
                  </React.Fragment>
                ))}
              </div>
            )}

            {onboardingSlides[currentSlide].stats && (
              <div className="space-y-4 mb-12">
                {onboardingSlides[currentSlide].stats.map((stat) => (
                  <div key={stat.label} className="bg-white/5 p-4 rounded-xl flex justify-between items-center">
                    <span className="text-base font-semibold">{stat.val}</span>
                    <span className="text-text-muted text-sm">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto space-y-8">
            <div className="flex justify-center gap-2">
              {onboardingSlides.map((_, i) => (
                <div 
                  key={i}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === currentSlide ? "w-8 bg-primary" : "w-2 bg-white/20"
                  )}
                />
              ))}
            </div>

            <Button 
              className="w-full" 
              size="xl"
              onClick={() => {
                if (currentSlide < onboardingSlides.length - 1) {
                  setCurrentSlide(prev => prev + 1);
                } else {
                  router.push('/register');
                }
              }}
            >
              {currentSlide === onboardingSlides.length - 1 ? "Get Protected Now" : "Continue"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <div className="text-center">
              <button 
                onClick={() => router.push('/register')}
                className="text-text-muted text-sm"
              >
                Already a partner? <span className="text-primary font-bold">Sign in</span>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
