"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// --- Sub-components ---
const StepIndicator = ({ step }: { step: number }) => (
  <div className="w-full flex flex-col gap-4 mb-8">
    <div className="flex justify-between items-center text-sm">
      <span className="text-text-muted">Step {step} of 3</span>
      <span className="text-primary font-bold">{Math.round((step / 3) * 100)}% Complete</span>
    </div>
    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${(step / 3) * 100}%` }}
        className="h-full bg-primary"
      />
    </div>
  </div>
);

const InputField = ({ label, placeholder, type = "text", prefix, error, success }: any) => (
  <div className="space-y-2 mb-6">
    <label className="text-caption text-text-muted uppercase tracking-wider font-semibold">
      {label}
    </label>
    <div className="relative">
      {prefix && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 px-2 py-1 rounded-md text-sm font-bold border border-white/10 text-white">
          {prefix}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          "w-full h-14 bg-white/5 border-1.5 border-white/10 rounded-xl px-4 text-base text-white placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all",
          prefix && "pl-16",
          error && "border-danger",
          success && "border-accent"
        )}
      />
      {success && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-accent w-5 h-5" />}
    </div>
  </div>
);

export default function Register() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '']);
  const router = useRouter();

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="mobile-wrapper bg-secondary text-white p-6">
      <header className="flex items-center justify-between mb-8 pt-6">
        <button onClick={() => step > 1 ? setStep(step - 1) : router.back()} className="touch-target -ml-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-heading">Create Account</h1>
        <div className="w-10" /> {/* Spacer */}
      </header>

      <StepIndicator step={step} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <h2 className="text-display-l mb-2">Basic Info</h2>
            <p className="text-text-muted text-sm mb-8">Enter your details exactly as per your Aadhaar/Driving License.</p>
            
            <InputField label="Full Name" placeholder="Your full name" />
            <InputField label="Mobile Number" placeholder="XXXXXXXXXX" prefix="+91" type="tel" success={true} />
            
            {/* OTP Section simulated inline after mobile */}
            <div className="space-y-4 mb-8">
              <label className="text-caption text-text-muted uppercase tracking-wider font-semibold">
                OTP Verification
              </label>
              <div className="flex justify-between gap-4">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="tel"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-full h-16 bg-white/5 border-1.5 border-accent/40 rounded-xl text-center text-2xl font-space-mono text-white focus:outline-none focus:border-accent"
                  />
                ))}
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-muted">Resend in 00:45</span>
                <button className="text-primary font-bold">Resend OTP</button>
              </div>
            </div>

            <Button className="w-full mt-auto mb-4" size="xl" onClick={() => setStep(2)}>
              Continue <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <h2 className="text-display-l mb-2">Age Verification</h2>
            <p className="text-text-muted text-sm mb-8">You must be 18+ to be eligible for income protection.</p>
            
            <div className="space-y-4 mb-12">
              <label className="text-caption text-text-muted uppercase tracking-wider font-semibold">
                Date of Birth
              </label>
              <div className="flex gap-4">
                <div className="flex-1 h-16 bg-white/5 border-1.5 border-white/10 rounded-xl flex items-center justify-center text-lg font-space-mono">DD</div>
                <div className="flex-1 h-16 bg-white/5 border-1.5 border-white/10 rounded-xl flex items-center justify-center text-lg font-space-mono">MM</div>
                <div className="flex-1 h-16 bg-white/5 border-1.5 border-white/10 rounded-xl flex items-center justify-center text-lg font-space-mono">YYYY</div>
              </div>
              <p className="text-[11px] text-text-muted italic">Click to open our simplified date selector</p>
            </div>

            <Button className="w-full mt-auto mb-4" size="xl" onClick={() => setStep(3)}>
              Verify Age <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <h2 className="text-display-l mb-2">Complete Profile</h2>
            <p className="text-text-muted text-sm mb-8">Almost there! We just need your delivery zone info next.</p>
            
            <div className="bg-accent/10 border border-accent/20 p-6 rounded-2xl mb-8 flex items-start gap-4">
              <CheckCircle2 className="text-accent w-6 h-6 shrink-0 mt-1" />
              <div className="space-y-1">
                <h4 className="font-bold text-white uppercase text-xs">KYC Verified</h4>
                <p className="text-xs text-text-muted leading-relaxed">Your basic details have been successfully mapped to our partner registry.</p>
              </div>
            </div>

            <Button className="w-full mt-auto mb-4" size="xl" onClick={() => router.push('/onboarding/profile')}>
              Setup Delivery Profile <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center pb-4">
        <p className="text-[11px] text-text-muted max-w-[80%] mx-auto leading-relaxed">
          By continuing, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
