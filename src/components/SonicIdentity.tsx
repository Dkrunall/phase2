'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Disc, Radio, Activity, Volume2, Sliders, Play, Pause } from 'lucide-react';

interface FrequencyTrack {
  id: string;
  number: string;
  name: string;
  bpm: number;
  keyNote: string;
  region: string;
}

export default function SonicIdentity() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);
  const [audioFeedbackEnabled, setAudioFeedbackEnabled] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const frequencies: FrequencyTrack[] = [
    {
      id: 'bolly-tech',
      number: '01',
      name: 'BOLLY TECH',
      bpm: 126,
      keyNote: 'F# MINOR',
      region: 'MUMBAI // LONDON',
    },
    {
      id: 'afro-house',
      number: '02',
      name: 'AFRO HOUSE',
      bpm: 124,
      keyNote: 'A MINOR',
      region: 'GLOBAL TRIBAL',
    },
    {
      id: 'tech-house',
      number: '03',
      name: 'TECH HOUSE',
      bpm: 128,
      keyNote: 'D MINOR',
      region: 'IBIZA CLUBLAND',
    },
    {
      id: 'melodic-deep',
      number: '04',
      name: 'MELODIC DEEP',
      bpm: 124,
      keyNote: 'C MINOR',
      region: 'AFTER-HOURS SUNRISE',
    }
  ];

  // Synthesize soft high-fashion audio tactile click / sub pulse
  const triggerTactileSound = (freqHz = 110, duration = 0.15) => {
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
      osc.frequency.setValueAtTime(freqHz, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext unavailable or restricted
    }
  };

  const handleSelectFrequency = (idx: number) => {
    setActiveTab(idx);
    if (audioFeedbackEnabled) {
      const frequenciesList = [120, 105, 130, 95];
      triggerTactileSound(frequenciesList[idx]);
    }
  };

  const toggleAudioSound = () => {
    const nextState = !audioFeedbackEnabled;
    setAudioFeedbackEnabled(nextState);
    if (nextState) {
      triggerTactileSound(130, 0.2);
    }
  };

  const currentTrack = frequencies[activeTab];

  return (
    <section 
      id="statements" 
      className="w-full relative bg-[#050505] text-white py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 border-t border-white/5 overflow-hidden font-sans select-none"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[500px] bg-gold/[0.025] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[500px] bg-gold/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12 sm:space-y-16 md:space-y-24">
        
        {/* Minimal Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2 text-gold text-[8px] sm:text-[9px] uppercase font-mono tracking-[0.3em] sm:tracking-[0.4em] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>// 02. SONIC IDENTITY</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-6xl text-white font-light tracking-wide uppercase leading-tight">
              The Sister <span className="italic text-gold font-normal">Duality</span>
            </h2>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={toggleAudioSound}
              data-cursor="HAPTIC"
              className={`flex items-center space-x-2 px-3 sm:px-3.5 py-1.5 rounded-full border text-[8px] sm:text-[9px] font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                audioFeedbackEnabled 
                  ? 'bg-gold/15 border-gold text-gold shadow-[0_0_12px_rgba(212,175,55,0.3)]' 
                  : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
              title="Toggle tactile sound feedback"
            >
              <Volume2 className="w-3 h-3" />
              <span>{audioFeedbackEnabled ? 'SOUND ON' : 'ENABLE SOUND'}</span>
            </button>
            <span className="text-[9px] sm:text-[10px] font-mono text-neutral-500 hidden sm:inline tracking-widest">
              [DUAL ARCHITECTS]
            </span>
          </div>
        </div>

        {/* 1. Twin Duo Interactive Cards & Hero Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* Left Column: Rabia Interactive Deck Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="RABIA"
            className="lg:col-span-4 p-5 sm:p-7 md:p-8 bg-neutral-950/80 border border-neutral-900/90 hover:border-gold/50 transition-all duration-500 relative group flex flex-col justify-between shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-gold/40" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-gold/40" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-gold/40" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-gold/40" />

            <div className="space-y-6">
              <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono tracking-[0.25em] sm:tracking-[0.3em] text-neutral-500 uppercase">
                <span>[DECK 01 // CDJ-3000]</span>
                <span className="text-gold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                  <span>MASTER</span>
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-4xl text-white uppercase tracking-wider font-semibold group-hover:text-gold transition-colors">
                  RABIA
                </h3>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-neutral-400 font-mono block mt-1">
                  ENERGY &bull; CROWD PSYCHOLOGY
                </span>
              </div>

              {/* Dynamic Interactive Metrics */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-[10px] font-mono border-b border-white/5 pb-2">
                  <span className="text-neutral-500">STAGE RIG</span>
                  <span className="text-white">PIONEER DJM-V10</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono border-b border-white/5 pb-2">
                  <span className="text-neutral-500">ROLE FOCUS</span>
                  <span className="text-gold">DROP TIMING & LIVE STALKS</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-neutral-500">REPERTOIRE</span>
                  <span className="text-white">100+ STAGES GLOBAL</span>
                </div>
              </div>
            </div>

            {/* Live Deck Status Simulation */}
            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">FREQ SPECTRUM</span>
              <div className="flex items-end space-x-1 h-3.5">
                <span className="w-1 bg-gold h-2.5 animate-pulse" />
                <span className="w-1 bg-gold h-3.5 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-1 bg-gold h-1.5 animate-pulse" style={{ animationDelay: '0.4s' }} />
                <span className="w-1 bg-gold h-3 animate-pulse" style={{ animationDelay: '0.1s' }} />
              </div>
            </div>
          </motion.div>

          {/* Center Column: High-Fashion Twin Portrait (Non-repeating: dramatic-light-03) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="PHASE2"
            className="lg:col-span-4 relative aspect-[4/5] lg:aspect-auto min-h-[380px] bg-neutral-950 border border-neutral-800 overflow-hidden group shadow-2xl"
          >
            <Image
              src="/images/gallery/dramatic-light-03.jpg"
              alt="PHASE2 Rabia and Mariya Studio Portrait"
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover filter contrast-[1.05] brightness-[0.98] group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
            
            {/* High Fashion HUD Overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[9px] font-mono tracking-widest text-white/70">
              <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 uppercase">
                PHOTO 03 // ARCHIVE
              </span>
              <span className="text-gold font-bold">126 BPM</span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[9px] font-mono tracking-widest uppercase bg-black/70 backdrop-blur-md p-3 border border-white/10">
              <span className="text-white font-semibold">PHASE2</span>
              <span className="text-gold">SISTER ARCHITECTS</span>
            </div>

            {/* Corner Crosshairs */}
            <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-gold/70" />
            <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-gold/70" />
            <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-gold/70" />
            <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-gold/70" />
          </motion.div>

          {/* Right Column: Mariya Interactive Deck Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="MARIYA"
            className="lg:col-span-4 p-5 sm:p-7 md:p-8 bg-neutral-950/80 border border-neutral-900/90 hover:border-gold/50 transition-all duration-500 relative group flex flex-col justify-between shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-gold/40" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-gold/40" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-gold/40" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-gold/40" />

            <div className="space-y-6">
              <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono tracking-[0.25em] sm:tracking-[0.3em] text-neutral-500 uppercase">
                <span>[DECK 02 // CDJ-3000]</span>
                <span className="text-gold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>SYNCED</span>
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-4xl text-white uppercase tracking-wider font-semibold group-hover:text-gold transition-colors">
                  MARIYA
                </h3>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-neutral-400 font-mono block mt-1">
                  HARMONICS &bull; SONIC ARCHITECTURE
                </span>
              </div>

              {/* Dynamic Interactive Metrics */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono border-b border-white/5 pb-2">
                  <span className="text-neutral-500">STAGE RIG</span>
                  <span className="text-white">PIONEER DJM-V10</span>
                </div>
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono border-b border-white/5 pb-2">
                  <span className="text-neutral-500">ROLE FOCUS</span>
                  <span className="text-gold">KEY HARMONICS & SAMPLING</span>
                </div>
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono">
                  <span className="text-neutral-500">CURATION</span>
                  <span className="text-white">5+ YEARS DISCOGRAPHY</span>
                </div>
              </div>
            </div>

            {/* Live Deck Status Simulation */}
            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-neutral-500 uppercase">FREQ SPECTRUM</span>
              <div className="flex items-end space-x-1 h-3.5">
                <span className="w-1 bg-gold h-3 animate-pulse" style={{ animationDelay: '0.3s' }} />
                <span className="w-1 bg-gold h-2 animate-pulse" style={{ animationDelay: '0.1s' }} />
                <span className="w-1 bg-gold h-3.5 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <span className="w-1 bg-gold h-2.5 animate-pulse" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </motion.div>

        </div>

        {/* 2. Interactive Sound Console / Frequency Selector */}
        <div className="bg-neutral-950 border border-white/10 p-4 sm:p-7 md:p-10 space-y-6 sm:space-y-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/[0.03] rounded-full blur-[140px] pointer-events-none" />

          {/* Console Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 sm:pb-6">
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <Sliders className="w-4 h-4 text-gold flex-shrink-0" />
              <h3 className="font-serif text-lg sm:text-2xl text-white uppercase tracking-wider">
                Sound Console &bull; <span className="text-gold italic font-normal">{currentTrack.name}</span>
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              <span>BPM: <strong className="text-gold">{currentTrack.bpm}</strong></span>
              <span>KEY: <strong className="text-white">{currentTrack.keyNote}</strong></span>
              <span className="hidden md:inline text-neutral-500">{currentTrack.region}</span>
            </div>
          </div>

          {/* 4 Interactive Frequency Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
            {frequencies.map((freq, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={freq.id}
                  onClick={() => handleSelectFrequency(idx)}
                  data-cursor="SELECT"
                  className={`p-3 sm:p-5 border text-left transition-all duration-300 relative group cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 border-gold shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                      : 'bg-neutral-950/80 border-neutral-900 hover:border-neutral-700 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono mb-1.5 sm:mb-2">
                    <span className={isSelected ? 'text-gold font-bold' : 'text-neutral-600'}>
                      [{freq.number}]
                    </span>
                    <span className="text-[8px] sm:text-[9px] tracking-wider text-neutral-400 font-mono">
                      {freq.bpm} BPM
                    </span>
                  </div>

                  <span className={`font-serif text-sm sm:text-lg uppercase tracking-wider block font-bold transition-colors ${
                    isSelected ? 'text-white' : 'text-neutral-300 group-hover:text-gold'
                  }`}>
                    {freq.name}
                  </span>

                  {/* Active bottom hairline indicator */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeFreqLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
