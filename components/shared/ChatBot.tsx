"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const INITIAL_MESSAGES = [
  { role: 'bot', text: "Namaste! I'm your Earn Sage assistant. How can I help you protect your earnings today?" }
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Mock bot response
    setTimeout(() => {
      let response = "I'm not sure about that. Try asking about your payouts or the risk map!";
      if (input.toLowerCase().includes("payout")) response = "Your last payout of ₹400 was processed on Mar 23. You can see details in the Payouts tab.";
      if (input.toLowerCase().includes("rain")) response = "I see a 70% chance of rain in your area today. Make sure your 'Safe Mode' is active!";
      if (input.toLowerCase().includes("hello")) response = "Hello Adnan! Ready for a safe shift today?";
      
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 1000);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50 border-2 border-white/20"
      >
        <MessageSquare size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 left-6 w-[calc(100%-48px)] max-w-[360px] h-[500px] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-[60] overflow-hidden flex flex-col border border-border-light"
          >
            {/* Header */}
            <div className="p-6 bg-ink-primary text-white flex justify-between items-center bg-gradient-to-r from-ink-primary to-slate-800">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-white/10">
                     <Sparkles size={18} className="text-primary" />
                  </div>
                  <div>
                     <div className="text-xs font-bold uppercase tracking-widest">Earn Sage Bot</div>
                     <div className="text-[9px] text-emerald-400 font-bold uppercase animate-pulse">Online</div>
                  </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={20} />
               </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
               {messages.map((m, i) => (
                 <div key={i} className={cn("flex w-full", m.role === 'user' ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[80%] p-4 rounded-2xl text-[13px] leading-relaxed",
                      m.role === 'user' ? "bg-primary text-white rounded-tr-none shadow-md" : "bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm"
                    )}>
                       {m.text}
                    </div>
                 </div>
               ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100 flex gap-2 items-center">
               <input 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                 placeholder="Ask me anything..."
                 className="flex-1 h-12 bg-slate-50 rounded-2xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
               />
               <button 
                 onClick={handleSend}
                 className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center active:scale-90 transition-transform shadow-cta"
               >
                  <Send size={18} />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
