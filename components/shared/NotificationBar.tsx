"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Info, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NotificationBar() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Rain Alert", message: "Heavy rain expected in Koramangala at 4:30 PM.", type: "warning" },
    { id: 2, title: "Payout Processed", message: "₹400 credited to your wallet for yesterday's shift.", type: "success" },
  ]);

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px] space-y-2">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              "p-4 rounded-2xl shadow-xl border backdrop-blur-md flex items-start gap-3",
              n.type === 'warning' ? "bg-amber-50/90 border-amber-200 text-amber-900" :
              n.type === 'success' ? "bg-emerald-50/90 border-emerald-200 text-emerald-900" :
              "bg-white/90 border-slate-200 text-slate-900"
            )}
          >
            <div className="mt-0.5">
              {n.type === 'warning' ? <AlertTriangle size={18} /> : 
               n.type === 'success' ? <CheckCircle2 size={18} /> : 
               <Info size={18} />}
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-bold uppercase tracking-widest mb-0.5">{n.title}</div>
              <div className="text-xs font-medium opacity-80 leading-relaxed">{n.message}</div>
            </div>
            <button onClick={() => removeNotification(n.id)} className="opacity-40 hover:opacity-100 transition-opacity">
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
