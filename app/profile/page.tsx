"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Wallet, History, Settings, HelpCircle, LogOut, Star, Award, Smartphone, Globe, Moon, User, Camera, Bell, Shield, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

export default function Profile() {
  const router = useRouter();

  return (
    <MobileWrapper withNav className="bg-secondary text-white pb-32">
       <header className="px-6 pt-12 pb-8 flex flex-col items-center text-center">
        <div className="relative mb-6 group">
          <div className="w-24 h-24 rounded-[32px] bg-white/5 border-2 border-primary/20 p-1">
            <div className="w-full h-full rounded-[28px] bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center overflow-hidden">
              <User size={48} className="text-primary/40" />
            </div>
          </div>
          <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-2xl flex items-center justify-center border-4 border-secondary shadow-orange transition-transform active:scale-90">
            <Camera size={18} />
          </button>
        </div>
        
        <h1 className="text-2xl font-bold mb-1">Koushil Varma</h1>
        <div className="flex items-center gap-1.5 bg-accent/20 text-accent px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-accent/20">
          <ShieldCheck size={12} /> KYC Verified Partner
        </div>
      </header>

      <div className="px-6 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <Card variant="dark" className="bg-white/5 border-white/5 p-4 flex flex-col items-center gap-2">
            <Star className="text-primary w-5 h-5" />
            <div className="text-center">
              <div className="text-sm font-bold">4.9</div>
              <div className="text-[8px] uppercase font-bold text-text-muted tracking-widest">Rating</div>
            </div>
          </Card>
          <Card variant="dark" className="bg-white/5 border-white/5 p-4 flex flex-col items-center gap-2">
            <Award className="text-accent w-5 h-5" />
            <div className="text-center">
              <div className="text-sm font-bold">120</div>
              <div className="text-[8px] uppercase font-bold text-text-muted tracking-widest">Sessions</div>
            </div>
          </Card>
          <Card variant="dark" className="bg-white/5 border-white/5 p-4 flex flex-col items-center gap-2">
            <Wallet className="text-safe w-5 h-5" />
            <div className="text-center">
              <div className="text-sm font-bold">₹14.2k</div>
              <div className="text-[8px] uppercase font-bold text-text-muted tracking-widest">Saved</div>
            </div>
          </Card>
        </div>

        {/* Account Info */}
        <section>
          <label className="text-caption text-text-muted uppercase tracking-wider font-semibold mb-4 block">Account Details</label>
          <Card variant="dark" className="bg-white/5 border-white/5 p-0 divide-y divide-white/5">
            <div className="p-4 flex justify-between items-center group cursor-pointer">
              <div className="flex items-center gap-4">
                <Smartphone className="text-text-muted group-hover:text-primary transition-colors" size={20} />
                <div>
                  <div className="text-sm font-bold">Verified Mobile</div>
                  <div className="text-xs text-text-muted">+91 9428-XXXXXX</div>
                </div>
              </div>
              <button className="text-[10px] font-bold uppercase tracking-widest text-primary">Edit</button>
            </div>
            <div className="p-4 flex justify-between items-center group cursor-pointer">
              <div className="flex items-center gap-4">
                <Shield className="text-text-muted group-hover:text-primary transition-colors" size={20} />
                <div>
                  <div className="text-sm font-bold">Payout Target</div>
                  <div className="text-xs text-text-muted">Paytm UPI • active</div>
                </div>
              </div>
              <ChevronRight size={16} className="text-text-muted" />
            </div>
          </Card>
        </section>

        {/* App Settings */}
        <section>
          <label className="text-caption text-text-muted uppercase tracking-wider font-semibold mb-4 block">App & Security</label>
          <Card variant="dark" className="bg-white/5 border-white/5 p-0 divide-y divide-white/5">
            <div className="p-4 flex justify-between items-center group cursor-pointer" onClick={() => router.push('/notifications')}>
              <div className="flex items-center gap-4">
                <Bell className="text-text-muted group-hover:text-primary transition-colors" size={20} />
                <span className="text-sm font-bold">Notifications</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <ChevronRight size={16} className="text-text-muted" />
              </div>
            </div>
            <div className="p-4 flex justify-between items-center group cursor-pointer">
              <div className="flex items-center gap-4">
                <Globe className="text-text-muted group-hover:text-primary transition-colors" size={20} />
                <span className="text-sm font-bold">App Language</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-text-muted uppercase">English</span>
                <ChevronRight size={16} className="text-text-muted" />
              </div>
            </div>
            <div className="p-4 flex justify-between items-center group cursor-pointer">
              <div className="flex items-center gap-4">
                <Moon className="text-text-muted group-hover:text-primary transition-colors" size={20} />
                <span className="text-sm font-bold">Appearance</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-text-muted uppercase">Dark</span>
                <ChevronRight size={16} className="text-text-muted" />
              </div>
            </div>
          </Card>
        </section>

        {/* Support & Logout */}
        <section className="space-y-3">
          <button className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 group transition-all hover:bg-white/10">
            <div className="flex items-center gap-4">
              <HelpCircle className="text-text-muted group-hover:text-primary transition-colors" size={20} />
              <span className="text-sm font-bold">Help & Support</span>
            </div>
            <ChevronRight size={16} className="text-text-muted" />
          </button>
          
          <button className="w-full flex items-center justify-center gap-3 p-5 rounded-2xl bg-danger/5 border border-danger/10 text-danger font-bold uppercase tracking-[0.2em] text-xs hover:bg-danger/10 transition-all">
            <LogOut size={16} /> Logout Partner
          </button>
        </section>

        <div className="text-center py-6">
          <div className="text-[10px] text-text-muted uppercase font-bold tracking-[0.3em] mb-1">Earn Sage v2.0.4 r1</div>
          <div className="text-[10px] text-text-muted uppercase font-bold tracking-[0.1em]">© 2024 Parametric Guard Pvt Ltd</div>
        </div>
      </div>
    </MobileWrapper>
  );
}
