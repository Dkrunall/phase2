'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Radio, Activity } from 'lucide-react';

interface ManifestoWord {
  id: string;
  word: string;
  number: string;
  frequency: string;
  hertz: number;
}

export default function TypographicManifesto() {
  const [activeWordId, setActiveWordId] = useState<string | null>(null);
  const [pulseWordId, setPulseWordId] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const words: ManifestoWord[] = [
    { id: 'groove', word: 'GROOVE', number: '01', frequency: '48 HZ // SUB-BASS', hertz: 48 },
    { id: 'energy', word: 'ENERGY', number: '02', frequency: '126 BPM // PEAK DROP', hertz: 126 },
    { id: 'synergy', word: 'SYNERGY', number: '03', frequency: 'STEREO // DUAL PHASE', hertz: 90 },
    { id: 'rhythm', word: 'RHYTHM', number: '04', frequency: 'PERCUSSION // DHOLIC SYNC', hertz: 110 },
    { id: 'passion', word: 'PASSION', number: '05', frequency: 'RESONANCE // HARMONIC', hertz: 75 },
  ];

  // Synthesize tactile sub-bass tone on interaction
  const triggerAudioPulse = (hertz: number) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(hertz * 1.5, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // AudioContext unavailable
    }
  };

  const handleWordClick = (item: ManifestoWord) => {
    setPulseWordId(item.id);
    triggerAudioPulse(item.hertz);
    setTimeout(() => setPulseWordId(null), 400);
  };

  return (
    <section className="w-full bg-black text-white py-16 sm:py-24 md:py-32 relative overflow-hidden border-t border-b border-white/5 font-sans select-none">
      
      {/* Subtle Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/[0.02] rounded-full blur-[200px] pointer-events-none" />

      {/* Interactive Title Tag */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center space-x-2 text-gold text-[8px] xs:text-[9px] font-mono tracking-[0.3em] sm:tracking-[0.4em] uppercase">
          <Sparkles className="w-3 h-3" />
          <span>// 04. SOUND MANIFESTO</span>
        </div>
        <span className="text-[8px] xs:text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
          CLICK WORDS TO TRIGGER BEAT
        </span>
      </div>

      {/* Main Minimalist Big Text Column */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        {words.map((item, idx) => {
          const isHovered = activeWordId === item.id;
          const isPulsing = pulseWordId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: idx * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => {
                setActiveWordId(item.id);
                triggerAudioPulse(item.hertz * 0.8);
              }}
              onMouseLeave={() => setActiveWordId(null)}
              onClick={() => handleWordClick(item)}
              data-cursor="BEAT"
              className="w-full group relative py-4 xs:py-5 sm:py-8 border-b border-white/5 flex items-center justify-between cursor-pointer transition-all duration-500"
            >
              {/* Gold Flash Ripple when clicked */}
              <AnimatePresence>
                {isPulsing && (
                  <motion.div
                    initial={{ opacity: 0.8, scaleX: 0.3 }}
                    animate={{ opacity: 0, scaleX: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-gold/15 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Index & Frequency Monogram */}
              <div className="flex flex-col space-y-0.5 flex-shrink-0 w-8 sm:w-16">
                <span className="font-mono text-[10px] xs:text-xs sm:text-sm text-neutral-600 group-hover:text-gold transition-colors font-semibold tracking-widest">
                  [{item.number}]
                </span>
                <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                  {item.frequency}
                </span>
              </div>

              {/* The Massive Kinetic Word (Fluid responsive scaling) */}
              <div className="min-w-0 flex-1 px-2 overflow-hidden flex items-center justify-center">
                <h3 className={`font-serif text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[7.2rem] tracking-[0.06em] xs:tracking-[0.08em] sm:tracking-[0.14em] uppercase font-bold leading-none transition-all duration-500 truncate ${
                  isPulsing 
                    ? 'text-gold scale-105 drop-shadow-[0_0_30px_rgba(212,175,55,0.7)]' 
                    : isHovered 
                      ? 'text-gold sm:tracking-[0.17em]' 
                      : 'text-white/80'
                }`}>
                  {item.word}
                </h3>
              </div>

              {/* Interactive Dynamic Audio Frequency Bars */}
              <div className="flex items-end space-x-1 h-4 sm:h-5 flex-shrink-0">
                <span className={`w-0.5 bg-gold rounded-full transition-all duration-300 ${isHovered ? 'h-4 sm:h-5 animate-pulse' : 'h-1.5 bg-neutral-800'}`} />
                <span className={`w-0.5 bg-gold rounded-full transition-all duration-300 ${isHovered ? 'h-3 animate-pulse' : 'h-2 bg-neutral-800'}`} style={{ animationDelay: '0.2s' }} />
                <span className={`w-0.5 bg-gold rounded-full transition-all duration-300 ${isHovered ? 'h-5 sm:h-6 animate-pulse' : 'h-1 bg-neutral-800'}`} style={{ animationDelay: '0.4s' }} />
                <span className={`w-0.5 bg-gold rounded-full transition-all duration-300 ${isHovered ? 'h-3.5 sm:h-4 animate-pulse' : 'h-1.5 bg-neutral-800'}`} style={{ animationDelay: '0.1s' }} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Kinetic Marquee Ribbon */}
      <div className="w-full mt-16 pt-5 border-t border-white/5 overflow-hidden flex items-center bg-neutral-950/40 py-3.5">
        <div className="flex whitespace-nowrap animate-marquee select-none text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 space-x-8">
          <span>HOUSE</span>
          <span className="text-gold">&bull;</span>
          <span>TECH HOUSE</span>
          <span className="text-gold">&bull;</span>
          <span>AFRO HOUSE</span>
          <span className="text-gold">&bull;</span>
          <span>BOLLY TECH</span>
          <span className="text-gold">&bull;</span>
          <span>RABIA &amp; MARIYA</span>
          <span className="text-gold">&bull;</span>
          <span>PHASE2</span>
          <span className="text-gold">&bull;</span>
          <span>HOUSE</span>
          <span className="text-gold">&bull;</span>
          <span>TECH HOUSE</span>
          <span className="text-gold">&bull;</span>
          <span>AFRO HOUSE</span>
          <span className="text-gold">&bull;</span>
          <span>BOLLY TECH</span>
          <span className="text-gold">&bull;</span>
          <span>RABIA &amp; MARIYA</span>
          <span className="text-gold">&bull;</span>
          <span>PHASE2</span>
          <span className="text-gold">&bull;</span>
        </div>
      </div>

    </section>
  );
}
