'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Volume2, VolumeX, Play, Pause, Maximize2, Heart } from 'lucide-react';

interface ReelItem {
  id: string;
  src: string;
  fallbackSrc: string;
  posterFallback: string;
  deckNumber: string;
  title: string;
  bpm: string;
}

const AutoplayReelCard: React.FC<{ reel: ReelItem; index: number }> = ({ reel, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showHeart, setShowHeart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const startPlayback = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            video.muted = true;
            video.play().catch(() => {});
          });
      }
    };

    startPlayback();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startPlayback();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      observer.disconnect();
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [reel.src]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowHeart(true);
    setIsLiked(true);
    setTimeout(() => setShowHeart(false), 800);
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    video.currentTime = newProgress * video.duration;
    setProgress(newProgress * 100);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      data-cursor={isPlaying ? "PAUSE" : "PLAY"}
      className="w-full max-w-[560px] lg:max-w-[580px] bg-neutral-950/80 backdrop-blur-xl border border-neutral-800/80 hover:border-gold/50 transition-all duration-700 p-2 sm:p-3 group shadow-2xl relative flex flex-col justify-between"
    >
      {/* Ambient background glow */}
      <div className="absolute -inset-1 bg-gradient-to-b from-gold/10 via-transparent to-gold/5 rounded-none blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Luxury Inner Border & Corner Accents */}
      <div className="absolute inset-0 border border-gold/15 pointer-events-none scale-[0.98] z-20 group-hover:border-gold/35 transition-colors" />
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gold/60 z-20" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-gold/60 z-20" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-gold/60 z-20" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-gold/60 z-20" />

      {/* Video Container */}
      <div 
        className="relative w-full aspect-[9/16] overflow-hidden bg-neutral-950 cursor-pointer shadow-inner"
        onClick={togglePlay}
        onDoubleClick={handleDoubleClick}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.06] group-hover:scale-[1.02] transition-transform duration-700 select-none"
        >
          <source src={reel.src} type="video/mp4" />
          <source src={reel.src} type="video/quicktime" />
          <source src={reel.fallbackSrc} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Double-Click Heart Burst Reaction */}
        <AnimatePresence>
          {showHeart && (
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
            >
              <div className="w-20 h-20 rounded-full bg-black/60 backdrop-blur-md border border-gold/50 flex items-center justify-center">
                <Heart className="w-10 h-10 text-gold fill-gold animate-ping" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top HUD with Live Status */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center space-x-2 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-white uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
            <span>{reel.deckNumber}</span>
          </div>

          <div className="flex items-center space-x-2 pointer-events-auto">
            <button
              onClick={handleFullscreen}
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black border border-white/20 hover:border-gold text-white flex items-center justify-center transition-all cursor-pointer"
              title="Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center Hover Play/Pause indicator */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-black/85 border border-gold/50 flex items-center justify-center text-gold backdrop-blur-md shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
          </div>
        </div>

        {/* Interactive Bottom HUD: Scrub Bar & Audio Controls */}
        <div className="absolute bottom-4 left-4 right-4 z-20 space-y-3 pointer-events-auto">
          {/* Interactive Scrubber Timeline */}
          <div 
            onClick={handleScrub}
            className="w-full h-1.5 bg-white/20 hover:h-2.5 rounded-full cursor-pointer transition-all duration-200 relative overflow-hidden group/bar"
          >
            <div 
              className="h-full bg-gold transition-all duration-100 relative"
              style={{ width: `${progress}%` }}
            >
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white opacity-0 group-hover/bar:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {!isMuted ? (
                <div className="flex items-end space-x-0.5 h-3 px-2 py-0.5 bg-black/70 backdrop-blur-md border border-white/10">
                  <span className="w-0.5 bg-gold rounded-full animate-pulse" style={{ height: '80%', animationDuration: '0.6s' }} />
                  <span className="w-0.5 bg-gold rounded-full animate-pulse" style={{ height: '100%', animationDuration: '0.4s' }} />
                  <span className="w-0.5 bg-gold rounded-full animate-pulse" style={{ height: '50%', animationDuration: '0.7s' }} />
                  <span className="w-0.5 bg-gold rounded-full animate-pulse" style={{ height: '90%', animationDuration: '0.5s' }} />
                  <span className="text-[8px] font-mono tracking-widest text-gold uppercase ml-1">AUDIO ON</span>
                </div>
              ) : (
                <span className="text-[9px] font-mono tracking-widest text-neutral-400 bg-black/60 px-2 py-0.5 border border-white/10">
                  MUTED
                </span>
              )}
            </div>

            {/* Sound Toggle Button */}
            <button
              onClick={toggleMute}
              className="w-9 h-9 rounded-full bg-black/85 hover:bg-black border border-white/25 hover:border-gold text-neutral-200 hover:text-gold flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl backdrop-blur-md"
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-gold animate-bounce" />}
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default function LiveReels() {
  const reels: ReelItem[] = [
    {
      id: 'reel-1',
      src: '/images/IMG_7661.MOV',
      fallbackSrc: '/images/IMG_7658.MP4',
      posterFallback: '/images/phase2_sofa.jpg',
      deckNumber: 'STAGE DECK 01',
      title: 'Backstage & Peak Drop',
      bpm: '126 BPM'
    },
    {
      id: 'reel-2',
      src: '/images/IMG_7664.MOV',
      fallbackSrc: '/images/IMG_7660.MP4',
      posterFallback: '/images/phase2_yellow.jpg',
      deckNumber: 'STAGE DECK 02',
      title: 'Deck Harmonics & Energy',
      bpm: '128 BPM'
    }
  ];

  return (
    <section id="reels-section" className="w-full relative bg-black text-white py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 border-t border-b border-white/5 overflow-hidden font-sans select-none">
      
      {/* Luxury Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/[0.03] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[400px] bg-gold/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8 sm:space-y-12">
        
        {/* Minimal Header */}
        <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-white/10">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <h3 className="font-serif text-xl sm:text-3xl md:text-4xl text-white uppercase tracking-wider font-light">
              Live &bull; <span className="italic text-gold">On Stage</span>
            </h3>
          </div>
          <span className="text-[8px] sm:text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
            AUTOPLAY &bull; 2 DECKS
          </span>
        </div>

        {/* 2-Card Symmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 justify-items-center max-w-6xl mx-auto">
          {reels.map((reel, idx) => (
            <AutoplayReelCard key={reel.id} reel={reel} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
