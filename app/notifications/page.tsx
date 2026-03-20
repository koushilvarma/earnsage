"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Bell, Zap, CloudRain, ShieldCheck, Mail, Info, Trash2, CheckCircle2, AlertTriangle, MoreHorizontal, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const notifications = [
  { 
    id: '1', 
    group: 'Today', 
    title: 'Payout Disbursed', 
    desc: '₹800 has been sent to your Paytm UPI ID for the Koramangala trigger.',
    time: '12:04 PM',
    type: 'payout',
    read: false
  },
  { 
    id: '2', 
    group: 'Today', 
    title: 'High Risk Alert', 
    desc: 'Heavy rain detected in Bengaluru East. Your session protection is now active.',
    time: '09:20 AM',
    type: 'alert',
    read: false
  },
  { 
    id: '3', 
    group: 'Yesterday', 
    title: 'System Update', 
    desc: 'Blinkit zones have been updated in Indiranagar. Check your active coverage.',
    time: '06:15 PM',
    type: 'system',
    read: true
  },
  { 
    id: '4', 
    group: 'Yesterday', 
    title: 'KYC Verified', 
    desc: 'Your profile is now fully verified. You are eligible for the Standard Pro plan.',
    time: '11:45 AM',
    type: 'kyc',
    read: true
  }
];

export default function Notifications() {
  const router = useRouter();
  const [items, setItems] = useState(notifications);

  const deleteNotification = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const markAllRead = () => {
    setItems(items.map(item => ({ ...item, read: true })));
  };

  return (
    <MobileWrapper className="bg-secondary text-white pb-12">
      <header className="px-6 pt-8 pb-4 flex items-center justify-between mb-8">
        <button onClick={() => router.back()} className="touch-target -ml-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-heading">Notifications</h1>
        <button onClick={markAllRead} className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">
          Mark all read
        </button>
      </header>

      <div className="px-6 space-y-10">
        {['Today', 'Yesterday'].map(group => {
          const groupItems = items.filter(item => item.group === group);
          if (groupItems.length === 0) return null;
          
          return (
            <section key={group} className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">{group}</h3>
              <div className="space-y-3">
                <AnimatePresence>
                  {groupItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      layout
                    >
                      <Card variant="dark" className={cn(
                        "bg-white/5 border-white/5 p-5 relative overflow-hidden group",
                        !item.read && "border-l-4 border-l-primary"
                      )}>
                        {!item.read && <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />}
                        <div className="flex gap-4">
                          <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 shrink-0",
                            item.type === 'payout' && "bg-accent/10 text-accent",
                            item.type === 'alert' && "bg-primary/10 text-primary",
                            item.type === 'system' && "bg-safe/10 text-safe",
                            item.type === 'kyc' && "bg-yellow-500/10 text-yellow-500"
                          )}>
                            {item.type === 'payout' && <Zap size={20} />}
                            {item.type === 'alert' && <CloudRain size={20} />}
                            {item.type === 'system' && <Info size={20} />}
                            {item.type === 'kyc' && <ShieldCheck size={20} />}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between items-start">
                              <h4 className="text-sm font-bold text-white pr-6">{item.title}</h4>
                              <button onClick={() => deleteNotification(item.id)} className="text-text-muted hover:text-danger touch-target -mr-3 -mt-3">
                                <X size={16} />
                              </button>
                            </div>
                            <p className="text-xs text-text-muted leading-relaxed">
                              {item.desc}
                            </p>
                            <span className="text-[10px] font-space-mono text-text-muted mt-2 block">{item.time}</span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>
          );
        })}

        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
            <Bell size={64} className="mb-6" />
            <h3 className="text-lg font-bold">Inbox is empty</h3>
            <p className="text-sm">We'll alert you here when triggers occur.</p>
          </div>
        )}
      </div>
    </MobileWrapper>
  );
}
