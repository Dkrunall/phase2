'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Disc, ArrowRight } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Variable-speed realistic luxury counter from 00 to 100 with automatic entrance
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Accelerating increment
      const increment = Math.floor(Math.random() * 7) + 3;
      current = Math.min(100, current + increment);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        // Automatic entrance: pause briefly so user sees 100% locked, then automatically open
        setTimeout(() => {
          triggerExit();
        }, 380);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Synthesize tactile sub-bass boom upon entering
  const playEnterSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // AudioContext restricted
    }
  };

  const triggerExit = () => {
    setIsExiting(true);
    playEnterSound();
    setTimeout(() => {
      onComplete();
    }, 650);
  };

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          onClick={triggerExit}
          data-cursor="ENTER"
          className="fixed inset-0 z-[100] bg-black text-white flex flex-col justify-between p-4 sm:p-8 md:p-12 select-none font-sans overflow-hidden cursor-pointer"
        >
          {/* 
            Cinematic High-Fashion Photoshoot Background 
            Subtle moody Ken-Burns slow zoom with dark vignette 
          */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              className="relative w-full h-full"
            >
              <Image
                src="/images/phase2_sofa.jpg"
                alt="PHASE2 Rabia & Mariya"
                fill
                priority
                className="object-cover filter contrast-[1.1] brightness-[0.5] saturate-[0.85]"
              />
            </motion.div>

            {/* Deep luxury vignettes so typography sits crisp & unobstructed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/75" />
            <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/90" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gold/[0.06] rounded-full blur-[180px]" />
          </div>

          {/* Top Editorial HUD */}
          <div className="relative z-10 flex items-center justify-between text-[8px] xs:text-[9px] font-mono tracking-[0.2em] sm:tracking-[0.3em] uppercase text-neutral-400 border-b border-white/15 pb-3 sm:pb-4">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold animate-ping flex-shrink-0" />
              <span className="text-white font-semibold truncate">
                STAGE RIG // SYSTEM
              </span>
            </div>

            <div className="hidden sm:flex items-center space-x-4 text-neutral-400">
              <span>IBIZA</span>
              <span className="text-neutral-700">&bull;</span>
              <span>LONDON</span>
              <span className="text-neutral-700">&bull;</span>
              <span>DUBAI</span>
              <span className="text-neutral-700">&bull;</span>
              <span>MUMBAI</span>
            </div>

            <div className="flex items-center space-x-1.5 sm:space-x-2 text-neutral-400 font-mono text-[8px] xs:text-[9px] uppercase tracking-widest flex-shrink-0">
              <span className="hidden xs:inline">AUTO LOAD</span>
              <span className="text-gold font-bold">{progress}%</span>
            </div>
          </div>

          {/* Center Stage: Monumental Typography & Real-Time Counter */}
          <div className="relative z-10 max-w-xl mx-auto w-full text-center space-y-4 sm:space-y-8 my-auto pointer-events-none px-2">
            
            {/* Monumental Brand Logo */}
            <div className="space-y-1 sm:space-y-2">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-5xl xs:text-6xl sm:text-8xl md:text-9xl font-black tracking-[0.04em] sm:tracking-[0.06em] uppercase text-white flex items-center justify-center leading-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              >
                <span>PHASE</span>
                <span className="text-gold ml-1 sm:ml-2 drop-shadow-[0_0_30px_rgba(212,175,55,0.9)]">2</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-[8px] xs:text-[9px] sm:text-[11px] font-mono uppercase tracking-[0.25em] sm:tracking-[0.45em] text-neutral-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              >
                RABIA &amp; MARIYA &bull; SISTER ARCHITECTS
              </motion.p>
            </div>

            {/* Hairline Progress Track */}
            <div className="space-y-2.5 sm:space-y-3 max-w-sm mx-auto w-full px-2 sm:px-0">
              <div className="w-full h-[1.5px] bg-white/20 relative overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold/60 via-gold to-white shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.04 }}
                />
              </div>

              {/* Monospace Counter & Status */}
              <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-widest">
                <span className="text-neutral-400 truncate">
                  {progress < 100 ? 'SYNCING FREQUENCIES' : 'ENTERING ARCHIVE...'}
                </span>
                <span className="text-gold font-bold text-xs pl-2">
                  {String(progress).padStart(3, '0')}%
                </span>
              </div>
            </div>

            {/* Live Audio Sync Pulse Indicators */}
            <div className="flex items-center justify-center space-x-1.5 h-4 pt-1 sm:pt-2">
              <span className="w-0.5 bg-gold rounded-full animate-pulse h-2.5" />
              <span className="w-0.5 bg-gold rounded-full animate-pulse h-4" style={{ animationDelay: '0.2s' }} />
              <span className="w-0.5 bg-gold rounded-full animate-pulse h-2" style={{ animationDelay: '0.4s' }} />
              <span className="w-0.5 bg-gold rounded-full animate-pulse h-3.5" style={{ animationDelay: '0.1s' }} />
              <span className="w-0.5 bg-gold rounded-full animate-pulse h-1.5" style={{ animationDelay: '0.3s' }} />
            </div>

          </div>

          {/* Bottom Deck & Key Signature */}
          <div className="relative z-10 flex items-center justify-between text-[8px] xs:text-[9px] font-mono tracking-[0.2em] sm:tracking-[0.25em] text-neutral-400 border-t border-white/15 pt-3 sm:pt-4">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <Disc className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold animate-spin-slow flex-shrink-0" />
              <span className="truncate">126 BPM &bull; STEREO</span>
            </div>

            <span className="text-neutral-500 hidden sm:inline">
              HOUSE &bull; TECH HOUSE &bull; AFRO HOUSE &bull; BOLLY TECH
            </span>

            <span className="text-gold font-bold flex-shrink-0">
              EST. 2026
            </span>
          </div>

        </motion.div>
      ) : (
        /* Cinematic Shutter Curtain Reveal Animation */
        <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="w-full h-1/2 bg-[#030303] border-b border-gold/40 shadow-2xl"
          />
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="w-full h-1/2 bg-[#030303] border-t border-gold/40 shadow-2xl"
          />
        </div>
      )}
    </AnimatePresence>
  );
}
