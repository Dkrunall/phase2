'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VolumeX, Play, Pause, ChevronDown } from 'lucide-react';

interface HeroProps {
  onScrollToSection: (id: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Parallax subtle depth on scroll
  const { scrollY } = useScroll();
  const videoScale = useTransform(scrollY, [0, 800], [1, 1.06]);
  const bottomContentY = useTransform(scrollY, [0, 500], [0, 80]);
  const bottomContentOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  // Ensure video auto-plays seamlessly across all browsers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setVideoLoaded(true);
        })
        .catch((err) => {
          console.warn('Autoplay prevented by browser:', err);
        });
    }
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[650px] flex flex-col justify-end overflow-hidden bg-black select-none font-sans">
      
      {/* 
        1. Full-Bleed Cinematic Background Video 
        100% visible, crystal clear, unobstructed center stage
      */}
      <motion.div 
        style={{ scale: videoScale }}
        className="absolute inset-0 z-0 w-full h-full"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className="w-full h-full object-cover filter brightness-[1.03] contrast-[1.08] saturate-[1.05] transition-opacity duration-1000"
          style={{ opacity: videoLoaded ? 1 : 0.8 }}
        >
          <source src="/images/IMG_7658.MP4" type="video/mp4" />
        </video>

        {/* 
          Soft gradient overlay:
          Only deepens at the very bottom so the write-up is crisp, 
          leaving the center and upper screen completely clear and open!
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />
      </motion.div>

      {/* 2. Discreet Sound & Playback Controller (Top Right Corner) */}
      <div className="absolute top-20 sm:top-24 md:top-28 right-4 sm:right-8 md:right-12 z-20 flex items-center space-x-2 pointer-events-auto">
        <button
          onClick={toggleMute}
          className="group flex items-center space-x-1.5 sm:space-x-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/15 hover:border-gold/50 text-white transition-all duration-300 shadow-xl cursor-pointer"
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {!isMuted ? (
            <div className="flex items-center space-x-0.5 h-3">
              <span className="w-0.5 h-3 bg-gold rounded-full animate-pulse" style={{ animationDuration: '0.6s' }} />
              <span className="w-0.5 h-2 bg-gold rounded-full animate-pulse" style={{ animationDuration: '0.4s' }} />
              <span className="w-0.5 h-3.5 bg-gold rounded-full animate-pulse" style={{ animationDuration: '0.8s' }} />
              <span className="w-0.5 h-2 bg-gold rounded-full animate-pulse" style={{ animationDuration: '0.5s' }} />
            </div>
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-neutral-400 group-hover:text-gold transition-colors" />
          )}
          <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-neutral-300 group-hover:text-white uppercase">
            {isMuted ? "AUDIO OFF" : "LIVE AUDIO"}
          </span>
        </button>

        <button
          onClick={togglePlay}
          className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/15 hover:border-gold/50 flex items-center justify-center text-neutral-300 hover:text-gold transition-all duration-300 cursor-pointer shadow-xl"
          title={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current translate-x-0.5" />}
        </button>
      </div>

      {/* 
        3. Bottom Editorial Write-up:
        "PHASE2" and "HOUSE • TECH HOUSE • AFRO HOUSE • BOLLY TECH"
        Positioned at the bottom, leaving the entire video open and unobstructed!
      */}
      <motion.div
        style={{ y: bottomContentY, opacity: bottomContentOpacity }}
        className="relative z-10 w-full px-4 sm:px-8 md:px-12 pb-14 sm:pb-20 md:pb-28 text-center flex flex-col items-center pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2 sm:space-y-4 max-w-2xl mx-auto"
        >
          {/* Main Title: PHASE2 */}
          <h1 className="font-serif text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[130px] font-black tracking-[0.02em] leading-none uppercase text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] flex items-center justify-center">
            <span>PHASE</span>
            <span className="text-gold ml-1 sm:ml-2 drop-shadow-[0_0_25px_rgba(212,175,55,0.7)]">2</span>
          </h1>

          {/* Subgenre Write-up */}
          <p className="text-[8px] xs:text-[9px] sm:text-xs md:text-sm uppercase tracking-[0.2em] xs:tracking-[0.3em] sm:tracking-[0.55em] text-neutral-300 font-sans font-semibold drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] max-w-xl mx-auto leading-relaxed">
            HOUSE &bull; TECH HOUSE &bull; AFRO HOUSE &bull; BOLLY TECH
          </p>
        </motion.div>

        {/* Subtle scroll down cue */}
        <button
          onClick={() => onScrollToSection('statements')}
          className="mt-4 sm:mt-6 pointer-events-auto text-neutral-500 hover:text-gold transition-colors duration-300 cursor-pointer group flex flex-col items-center"
          title="Scroll down"
        >
          <ChevronDown className="w-5 h-5 animate-bounce" style={{ animationDuration: '2s' }} />
        </button>
      </motion.div>

    </section>
  );
}
