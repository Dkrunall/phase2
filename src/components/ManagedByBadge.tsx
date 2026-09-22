'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Mail, Phone, Check, Copy, X, Sparkles, ExternalLink } from 'lucide-react';

export default function ManagedByBadge() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = 'darshak@andfriends.in';
  const phone = '+91 95946 91939';

  const handleCopy = (text: string, type: 'email' | 'phone', e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none font-sans max-w-[calc(100vw-2rem)]">
      <AnimatePresence>
        {isExpanded ? (
          /* Expanded Executive Management Card */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-[calc(100vw-2rem)] sm:w-88 max-w-sm p-4 sm:p-5 bg-[#080808]/95 backdrop-blur-2xl border border-gold/40 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(212,175,55,0.15)] relative overflow-hidden"
          >
            {/* Corner accents */}
            <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-gold" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-gold" />
            <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-gold" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-gold" />

            {/* Header with Logo & Close */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="relative w-14 h-11 sm:w-16 sm:h-13 flex-shrink-0">
                  <Image
                    src="/images/andfriends-logo.png"
                    alt="&friends"
                    fill
                    className="object-contain filter brightness-110"
                  />
                </div>
                <div>
                  <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.25em] sm:tracking-[0.3em] text-gold uppercase block font-bold">
                    MANAGED BY
                  </span>
                  <h4 className="font-serif text-base sm:text-lg text-white tracking-wider font-semibold">
                    &friends
                  </h4>
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Contact Details */}
            <div className="pt-3 sm:pt-4 space-y-2 sm:space-y-2.5">
              <div className="text-[8px] sm:text-[9px] font-mono text-neutral-400 tracking-wider">
                DIRECT CONTACT: <strong className="text-white font-semibold">DARSHAK</strong>
              </div>

              {/* Email Button */}
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <a
                  href={`mailto:${email}`}
                  data-cursor="EMAIL"
                  className="flex-1 flex items-center space-x-2 px-2.5 sm:px-3 py-2 bg-neutral-950 border border-neutral-800 hover:border-gold/50 text-[9px] sm:text-[10px] font-mono tracking-wider text-neutral-200 hover:text-white transition-colors truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span className="truncate">{email}</span>
                </a>
                <button
                  onClick={(e) => handleCopy(email, 'email', e)}
                  data-cursor="COPY"
                  className="px-2 sm:px-2.5 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-gold text-neutral-400 hover:text-gold text-[7px] sm:text-[8px] font-mono tracking-widest transition-colors cursor-pointer flex-shrink-0"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              {/* Phone Button */}
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  data-cursor="CALL"
                  className="flex-1 flex items-center space-x-2 px-2.5 sm:px-3 py-2 bg-neutral-950 border border-neutral-800 hover:border-gold/50 text-[9px] sm:text-[10px] font-mono tracking-wider text-neutral-200 hover:text-white transition-colors truncate"
                >
                  <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span className="truncate">{phone}</span>
                </a>
                <button
                  onClick={(e) => handleCopy(phone, 'phone', e)}
                  data-cursor="COPY"
                  className="px-2 sm:px-2.5 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-gold text-neutral-400 hover:text-gold text-[7px] sm:text-[8px] font-mono tracking-widest transition-colors cursor-pointer flex-shrink-0"
                  title="Copy Phone"
                >
                  {copiedPhone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="pt-2.5 sm:pt-3 mt-2.5 sm:mt-3 border-t border-white/5 flex items-center justify-between text-[7px] sm:text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
              <span>WORLDWIDE BOOKINGS</span>
              <span className="text-gold font-bold">2026 ACTIVE</span>
            </div>
          </motion.div>
        ) : (
          /* Collapsed Floating Luxury Pill */
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setIsExpanded(true)}
            data-cursor="&FRIENDS"
            className="group flex items-center space-x-2.5 sm:space-x-3.5 px-3.5 py-2 sm:px-5 sm:py-3 bg-black/90 hover:bg-black backdrop-blur-2xl border border-white/20 hover:border-gold/70 rounded-full shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300 cursor-pointer"
          >
            <div className="relative w-10 h-8 sm:w-12 sm:h-10 flex-shrink-0">
              <Image
                src="/images/andfriends-logo.png"
                alt="&friends logo"
                fill
                className="object-contain filter brightness-125 group-hover:scale-110 transition-transform"
              />
            </div>
            
            <div className="text-left pr-1 hidden sm:block">
              <span className="text-[8px] font-mono tracking-[0.25em] text-neutral-400 uppercase block">
                MANAGED BY
              </span>
              <span className="text-xs font-serif font-bold text-white group-hover:text-gold transition-colors uppercase tracking-widest block leading-tight">
                &friends
              </span>
            </div>

            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-gold" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
