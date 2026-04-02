"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Settings, 
  CreditCard, 
  Shield, 
  HelpCircle, 
  LogOut, 
  User, 
  Share2, 
  Award, 
  Wallet, 
  Info, 
  ArrowUpRight, 
  Copy, 
  Languages, 
  Bell,
  Palette,
  Edit
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { useApp } from '@/components/shared/AppContext';

const stats = [
  { label: 'Total Protected', value: '₹14,200', icon: Shield },
  { label: 'Payouts Sent', value: '32', icon: Wallet },
  { label: 'Rider Since', value: 'Jan 2025', icon: Award },
];

export default function PartnerProfile() {
  const router = useRouter();
  const { translations, setLanguage, language, theme, setTheme } = useApp();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <MobileWrapper withNav className="bg-surface-base px-6 pt-12 pb-24">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-display-l">My Profile</h1>
        <button className="w-10 h-10 rounded-xl bg-white border border-border-light flex items-center justify-center text-ink-primary shadow-sm group">
           <Settings size={18} className="group-hover:rotate-45 transition-transform" />
        </button>
      </header>

      <div className="space-y-8">
        {/* Profile Card */}
        <Card variant="dark" className="p-8 relative overflow-hidden group">
          <div className="flex flex-col items-center text-center space-y-4 relative z-10">
             <div className="relative group">
               <div className="w-24 h-24 rounded-full bg-ink-primary border-4 border-[#FF6B2B] flex items-center justify-center overflow-hidden shadow-lg transition-transform group-hover:scale-105 duration-300">
                  <span className="font-display font-bold text-3xl text-white">RK</span>
               </div>
               <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#FF6B2B] rounded-full border-2 border-ink-primary flex items-center justify-center text-white shadow-md">
                  <Edit3 size={14} />
               </button>
             </div>
             <div>
               <h2 className="text-display-l text-white text-xl">Ravi Kumar</h2>
               <div className="flex gap-2 justify-center mt-2">
                 <span className="px-3 py-0.5 rounded-full bg-white/10 text-white text-[9px] font-bold uppercase tracking-widest border border-white/5 italic">Zomato Gold</span>
                 <span className="px-3 py-0.5 rounded-full bg-white/10 text-white text-[9px] font-bold uppercase tracking-widest border border-white/5 italic">Zepto Hero</span>
               </div>
             </div>
          </div>
          
          <div className="absolute top-0 right-0 p-6">
             <div className="text-primary text-[10px] font-bold flex items-center gap-1.5 uppercase tracking-widest underline underline-offset-4 decoration-primary/20 cursor-pointer">
               Edit <ArrowUpRight size={14} />
             </div>
          </div>

          <Shield className="absolute right-[-30px] bottom-[-30px] w-48 h-48 text-white/5 -rotate-12" />
        </Card>

        {/* Stats Strip */}
        <section className="space-y-3 px-1">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted">Your Impact</h3>
           <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
              {stats.map((s, i) => (
                <Card key={i} className="min-w-[140px] p-5 bg-white border-border-light shadow-sm flex flex-col gap-3 group hover:border-border-mid transition-all">
                  <div className="w-9 h-9 rounded-lg bg-surface-raised border border-border-light flex items-center justify-center">
                    <s.icon className="text-ink-primary group-hover:scale-110 transition-transform" size={18} />
                  </div>
                  <div>
                    <div className="text-mono-l text-lg">{s.value}</div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-ink-hint mt-0.5">{s.label}</div>
                  </div>
                </Card>
              ))}
           </div>
        </section>

        {/* Section Groups */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Preferences</h3>
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
            {[
              { icon: Languages, label: 'App Language', sub: language === 'en' ? 'English (US)' : language === 'kn' ? 'ಕನ್ನಡ' : 'हिन्दी', action: 'lang' },
              { icon: Palette, label: 'App Theme', sub: theme === 'pure-white' ? 'Pure White' : theme === 'dark-pro' ? 'Dark Pro' : 'Vibrant Blue', action: 'theme' },
              { icon: Bell, label: 'Notifications', sub: 'Push, WhatsApp', action: 'notif' },
            ].map((item, i) => (
              <button 
                key={i} 
                onClick={() => {
                  if (item.action === 'lang') {
                    const next = language === 'en' ? 'kn' : language === 'kn' ? 'hi' : 'en';
                    setLanguage(next);
                  }
                  if (item.action === 'theme') {
                    const next = theme === 'pure-white' ? 'dark-pro' : theme === 'dark-pro' ? 'vibrant-blue' : 'pure-white';
                    setTheme(next);
                  }
                }}
                className={cn(
                  "w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors",
                  i !== 2 && "border-b border-slate-50"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <item.icon size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-slate-800">{item.label}</div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{item.sub}</div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
              </button>
            ))}
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-5 text-status-danger hover:bg-red-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center text-status-danger">
                  <LogOut size={20} />
                </div>
                <div className="text-sm font-bold">{translations.logout}</div>
              </div>
              <ChevronRight size={18} />
            </button>
          </div>
        </section>

        <section className="space-y-6">
           <div className="space-y-3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted px-1">Account Settings</h3>
              <div className="bg-white border border-border-light rounded-[24px] overflow-hidden shadow-card">
                 {[
                    { icon: CreditCard, label: 'Digital ID Card', sub: 'View verification QR', route: '/profile/id-card' },
                    { icon: Wallet, label: 'Payment Methods', sub: 'PhonePe, GPay' },
                    { icon: Shield, label: 'Document Vault', sub: 'Zomato ID, DL' },
                    { icon: CreditCard, label: 'Payout History', sub: '₹2,040 total' },
                 ].map((item, i) => (
                   <div key={i} className="group cursor-pointer">
                      <div 
                        className="flex items-center justify-between p-5 hover:bg-surface-raised transition-all"
                        onClick={() => item.route && router.push(item.route)}
                      >
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary group-hover:bg-white transition-all">
                              <item.icon size={18} />
                           </div>
                           <div>
                              <div className="text-xs font-bold text-ink-primary">{item.label}</div>
                              <div className="text-micro text-ink-hint mt-0.5">{item.sub}</div>
                           </div>
                        </div>
                        <ChevronRight className="text-ink-hint group-hover:translate-x-1 transition-transform" size={16} />
                      </div>
                      {i < 3 && <div className="mx-5 h-[1px] bg-surface-sunken opacity-50" />}
                   </div>
                 ))}
              </div>
           </div>

           {/* Referral Card */}
           <Card variant="dark" className="p-6 relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                 <div className="space-y-1">
                    <h3 className="text-heading text-white">Refer & Earn ₹50</h3>
                    <p className="text-caption text-white/50">Grow the safety net. Earn on every referral.</p>
                 </div>
                 
                 <div className="flex gap-2">
                    <div className="flex-1 h-12 bg-white/10 border border-white/20 rounded-xl px-4 flex items-center justify-between group/code hover:bg-white/20 cursor-copy active:scale-[0.98] transition-all">
                       <span className="font-mono text-primary font-bold text-lg tracking-wider">RAVI50</span>
                       <Copy className="text-white/40 group-hover/code:text-white transition-colors" size={16} />
                    </div>
                    <button className="h-12 w-12 bg-[#FF6B2B] rounded-xl flex items-center justify-center text-white shadow-cta hover:scale-105 active:scale-95 transition-all">
                       <Share2 size={20} />
                    </button>
                 </div>
                 
                 <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest pt-2">
                   3 friends referred · ₹150 earned
                 </div>
              </div>
              <Award className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-white/10 -rotate-12" />
           </Card>

           <div className="space-y-4 pb-8">
              <Button variant="secondary" className="w-full text-status-danger h-14 uppercase tracking-widest text-[11px] gap-2 border-status-danger/20 hover:bg-status-danger/5">
                 <LogOut size={16} /> Logout Partner
              </Button>
              <p className="text-center text-micro text-ink-hint font-bold uppercase tracking-[0.2em] px-12">
                 Earn Sage V3.0.0 (2025) · Secure Production Build
              </p>
           </div>
        </section>
      </div>
    </MobileWrapper>
  );
}

// Simple placeholder for Edit3
function Edit3({ size = 18, className = "" }) {
  return (
    <svg 
      width={size} height={size} viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}
