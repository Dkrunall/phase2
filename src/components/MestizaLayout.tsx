'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight, ArrowUp, Send, X, Play, Pause, Download, Volume2, Music, Disc, Menu } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Show {
  date: string;
  venue: string;
  city: string;
  country: string;
  image: string;
}

interface CarouselItem {
  type: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

const LookbookCard: React.FC<{ item: CarouselItem; index: number }> = ({ item, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const checkedRef = useRef(false);
  const blackCheckCountRef = useRef(0);

  const checkBlackFrame = (video: HTMLVideoElement): boolean => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      if (!ctx) return false;
      ctx.drawImage(video, 0, 0, 16, 16);
      const imgData = ctx.getImageData(0, 0, 16, 16).data;
      
      let isAllBlack = true;
      for (let i = 0; i < imgData.length; i += 4) {
        const r = imgData[i];
        const g = imgData[i + 1];
        const b = imgData[i + 2];
        if (r > 8 || g > 8 || b > 8) {
          isAllBlack = false;
          break;
        }
      }
      return isAllBlack;
    } catch (e) {
      console.warn("Canvas check failed:", e);
      return false;
    }
  };

  const handleTimeUpdate = () => {
    if (checkedRef.current || !videoRef.current || hasError) return;
    const video = videoRef.current;
    
    // Only check after playing for a bit
    if (video.currentTime > 1.2) {
      const isBlack = checkBlackFrame(video);
      if (!isBlack) {
        checkedRef.current = true;
      } else {
        blackCheckCountRef.current += 1;
        if (blackCheckCountRef.current >= 4) {
          console.error(`Black frame detected on ${item.src}. Triggering fallback.`);
          setHasError(true);
          checkedRef.current = true;
        }
      }
    }
  };

  const playVideo = () => {
    if (!videoRef.current || hasError) return;
    setIsPlaying(true);
    
    // Capture browser play promise to prevent AbortError interrupts
    playPromiseRef.current = videoRef.current.play();
    playPromiseRef.current
      .then(() => {
        // Play successfully started
      })
      .catch(err => {
        // AbortError happens when play is paused before it finishes loading. It's not a real codec/source error.
        if (err.name !== 'AbortError') {
          console.log("Video playback error:", err);
          setHasError(true);
        }
      });
  };

  const pauseVideo = () => {
    if (!videoRef.current || hasError) return;
    setIsPlaying(false);
    
    if (playPromiseRef.current) {
      playPromiseRef.current
        .then(() => {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        })
        .catch(() => {});
    } else {
      videoRef.current.pause();
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleMouseEnter = () => {
    if (item.type === 'video') {
      playVideo();
    }
  };

  const handleMouseLeave = () => {
    if (item.type === 'video') {
      pauseVideo();
    }
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] select-none group relative bg-neutral-950 border border-neutral-900/60 p-3 shadow-2xl transition-all duration-500 hover:border-gold/30"
    >
      <div className="absolute inset-0 border border-gold/10 pointer-events-none scale-[0.96] z-10 group-hover:border-gold/20 transition-colors" />

      <div className="relative w-full aspect-[9/16] overflow-hidden bg-neutral-950">
        {item.type === 'image' ? (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 filter brightness-[0.8] saturate-[0.9] group-hover:brightness-[0.95] pointer-events-none select-none"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full relative cursor-pointer" onClick={togglePlay}>
            {hasError ? (
              <div className="w-full h-full relative flex flex-col items-center justify-center bg-neutral-950 p-6 text-center border border-neutral-900">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <Image
                    src="/images/phase2_yellow.jpg"
                    alt="Fallback background"
                    fill
                    sizes="320px"
                    className="object-cover filter grayscale"
                    draggable={false}
                  />
                </div>
                <div className="relative z-10 space-y-4 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold bg-black/60">
                    <span className="text-[10px] font-bold">▶</span>
                  </div>
                  <span className="text-[8px] tracking-[0.3em] text-neutral-400 uppercase block font-semibold">Live Performance</span>
                  <a 
                    href={item.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[9px] tracking-widest text-gold hover:text-white uppercase font-bold border border-gold/30 px-3 py-1 bg-gold/5 transition-all"
                  >
                    WATCH VIDEO
                  </a>
                </div>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={item.src}
                  loop
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  onError={() => setHasError(true)}
                  onWaiting={() => setIsBuffering(true)}
                  onPlaying={() => setIsBuffering(false)}
                  onSeeked={() => setIsBuffering(false)}
                  onCanPlay={() => setIsBuffering(false)}
                  onTimeUpdate={handleTimeUpdate}
                  className="w-full h-full object-cover filter brightness-[0.8] group-hover:brightness-[0.95] transition-all pointer-events-none select-none"
                  draggable={false}
                />
                
                {/* Play/Pause Center Indicator / Loading Spinner */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {isBuffering ? (
                    <div className="w-10 h-10 rounded-full border-2 border-gold/20 border-t-2 border-t-gold animate-spin" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-black/60 border border-gold/30 flex items-center justify-center text-gold backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform">
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current translate-x-0.5" />}
                    </div>
                  )}
                </div>

                {/* Mute Button Control Overlay */}
                <button
                  onClick={toggleMute}
                  className="absolute bottom-3 right-3 z-20 w-7 h-7 rounded-full bg-black/75 border border-white/10 flex items-center justify-center text-white hover:text-gold hover:border-gold/30 transition-colors cursor-pointer"
                >
                  {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                  )}
                </button>

                {/* Live Badge */}
                <div className="absolute top-3 left-3 z-20 bg-red-600/90 text-white font-mono text-[7px] tracking-widest font-extrabold px-1.5 py-0.5 uppercase flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>LIVE REEL</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Description Labels */}
      <div className="flex justify-between items-center mt-3 text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-sans px-1">
        <div>
          <span className="text-white font-serif tracking-widest block text-xs capitalize font-semibold">{item.title}</span>
          <span className="block mt-0.5 font-sans text-[8px] tracking-[0.2em]">{item.subtitle}</span>
        </div>
        <span className="font-mono text-neutral-600">[{String(index + 1).padStart(2, '0')}]</span>
      </div>
    </div>
  );
};


export default function MestizaLayout() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  
  // Mobile responsive states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Hover preview state
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverCardRef = useRef<HTMLDivElement>(null);

  const [dragWidth, setDragWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const carouselItems: CarouselItem[] = [
    { type: 'image', src: '/images/phase2_sofa.jpg', alt: 'PHASE2 Sofa Portrait', title: 'Twin Presence', subtitle: 'Rabia & Mariya' },
    { type: 'video', src: '/images/IMG_7661.MOV', alt: 'PHASE2 Backstage Energy', title: 'Backstage Live', subtitle: 'Tour Performance Reel' },
    { type: 'image', src: '/images/phase2_yellow.jpg', alt: 'PHASE2 Yellow Portrait', title: 'Spotlight Fusion', subtitle: 'Golden Hour Set' },
    { type: 'video', src: '/images/IMG_7664.MOV', alt: 'PHASE2 Live Club Decks', title: 'Ibiza Club Energy', subtitle: 'Pacha Ibiza Opening' },
    { type: 'image', src: '/images/IMG_4489.JPEG', alt: 'PHASE2 Editorial Look', title: 'Editorial Look', subtitle: 'Press Shoot 01' },
    { type: 'video', src: '/images/IMG_7666.MOV', alt: 'PHASE2 Crowd Connection', title: 'Peak Time Grooves', subtitle: 'Hï Ibiza Theatre' },
    { type: 'image', src: '/images/IMG_4507.JPEG', alt: 'PHASE2 Crowd Energy', title: 'Crowd Connection', subtitle: 'Live Experience' },
  ];

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroBlur = useTransform(scrollY, [0, 500], ['blur(0px)', 'blur(15px)']);
  const videoScale = useTransform(scrollY, [0, 1000], [1, 1.08]);
  const videoOpacity = useTransform(scrollY, [0, 600], [0.85, 0.15]);

  const shows: Show[] = [
    { date: '05.06', venue: 'Hï Ibiza (Theatre)', city: 'Ibiza', country: 'Spain', image: '/images/IMG_4489.JPEG' },
    { date: '12.06', venue: 'Pacha Club (Main)', city: 'Ibiza', country: 'Spain', image: '/images/IMG_4507.JPEG' },
    { date: '20.06', venue: 'Bolly-Tech Arena', city: 'Mumbai', country: 'India', image: '/images/IMG_4501.JPEG' },
    { date: '27.06', venue: 'Toy Room DXB', city: 'Dubai', country: 'UAE', image: '/images/IMG_4509.JPEG' },
    { date: '04.07', venue: 'Ministry of Sound', city: 'London', country: 'UK', image: '/images/IMG_4490.JPEG' },
  ];

  const instagramPosts = [
    { src: '/images/IMG_9344.JPG.jpeg', alt: 'PHASE2 backstage vibe' },
    { src: '/images/IMG_9346.JPG.jpeg', alt: 'Rabia on the decks' },
    { src: '/images/IMG_9349.JPG.jpeg', alt: 'Mariya mixing live' },
    { src: '/images/IMG_9351.JPG.jpeg', alt: 'Twin DJ energy' },
    { src: '/images/IMG_4504.JPEG', alt: 'Tech house set festival' },
    { src: '/images/IMG_4490.JPEG', alt: 'Ibiza mainstage' }
  ];

  useEffect(() => {
    // Parallax effect on banners
    gsap.to('.parallax-banner', {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-banner-container',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Measure carousel drag width & check mobile status
    const handleResize = () => {
      if (carouselRef.current) {
        setDragWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
      setIsMobile(window.innerWidth < 768);
    };
    
    const timer = setTimeout(handleResize, 150);
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // Mock EPK Download Functionality
  const handleDownloadEPK = () => {
    const epkText = `PHASE2 - ELECTRONIC PRESS KIT (EPK)

BIOGRAPHY:
PHASE2 is the dynamic sister duo of Rabia and Mariya, bringing together energy, versatility, and a deep connection to the dance floor. Combining global club influences with infectious rhythms and commercial appeal.

GENRES:
House, Tech House, Afro House, and Bolly Tech

STATS:
- 100+ Shows Performed (Rabia)
- 5+ Years Industry Experience (Mariya)

TECHNICAL RIDER:
- 3x Pioneer CDJ-3000 Decks
- 1x Pioneer DJM-A9 or DJM-V10 Mixer
- High-fidelity booth monitors
- Separate stage monitor volume controls

MANAGEMENT & BOOKINGS:
booking@phase2music.com`;

    const blob = new Blob([epkText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'PHASE2_Official_EPK.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // GSAP Mouse Tracking for Tour Venue Previews
  const handleMouseMove = (e: React.MouseEvent) => {
    if (hoverCardRef.current) {
      gsap.to(hoverCardRef.current, {
        x: e.clientX + 20,
        y: e.clientY + 20,
        duration: 0.15,
        ease: 'power1.out'
      });
    }
  };

  const handleMouseEnter = (img: string) => {
    setHoveredImage(img);
    if (hoverCardRef.current) {
      gsap.to(hoverCardRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = () => {
    if (hoverCardRef.current) {
      gsap.to(hoverCardRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      });
    }
  };

  const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );

  return (
    <div ref={containerRef} className="relative bg-black text-white min-h-screen flex flex-col font-sans select-none overflow-x-hidden">
      
      {/* Universal Gold Gradient definition for SVGs */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BF953F" />
            <stop offset="25%" stopColor="#FCF6BA" />
            <stop offset="50%" stopColor="#B38728" />
            <stop offset="75%" stopColor="#FBF5B7" />
            <stop offset="100%" stopColor="#AA771C" />
          </linearGradient>
        </defs>
      </svg>
      {/* GSAP Mouse Follower Image Hover Preview Container */}
      <div
        ref={hoverCardRef}
        className="fixed top-0 left-0 w-48 h-64 border border-gold/40 bg-neutral-950 p-2 pointer-events-none z-50 rounded-none shadow-2xl opacity-0 scale-0 origin-center overflow-hidden"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute inset-0 border border-gold/15 pointer-events-none scale-[0.95] z-10" />
        <div className="relative w-full h-full">
          {hoveredImage && (
            <Image
              src={hoveredImage}
              alt="Preview"
              fill
              sizes="180px"
              className="object-cover filter grayscale brightness-[0.7] contrast-[1.1]"
            />
          )}
        </div>
      </div>

      {/* 1. Header Navigation Menu */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/55 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="font-serif text-sm tracking-[0.3em] font-extrabold text-white cursor-pointer hover:text-gold transition-colors duration-500 flex items-center space-x-1"
        >
          <span>PHASE</span><span className="text-gold">2</span>
        </div>
        
        {/* Navigation Items */}
        <div className="hidden md:flex space-x-10 text-[10px] uppercase tracking-[0.35em] font-semibold text-neutral-400">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer relative group py-1">
            <span>HOME</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
          </button>
          <button onClick={() => handleScrollToSection('statements')} className="hover:text-white transition-colors cursor-pointer relative group py-1">
            <span>DUO</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
          </button>
          <button onClick={() => handleScrollToSection('tour-section')} className="hover:text-white transition-colors cursor-pointer relative group py-1">
            <span>TOUR</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
          </button>
          <button onClick={() => handleScrollToSection('booking-section')} className="hover:text-white transition-colors cursor-pointer relative group py-1">
            <span>BOOKING</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
          </button>
        </div>

        {/* Right Nav Menu items */}
        <div className="flex items-center space-x-6 text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-400 font-sans">
          <button 
            onClick={handleDownloadEPK} 
            className="hidden sm:flex hover:bg-gold hover:text-black items-center space-x-2 transition-all duration-300 cursor-pointer border border-gold/30 hover:border-gold px-4 py-1.5 font-bold text-[9px] text-gold rounded-none bg-gold/5"
          >
            <Download className="w-3.5 h-3.5 text-current animate-bounce" style={{ animationDuration: '3s' }} />
            <span>EPK</span>
          </button>
          
          <a 
            href="mailto:booking@phase2music.com" 
            className="hidden lg:block text-neutral-400 hover:text-white transition-colors tracking-widest text-[9px]"
          >
            booking@phase2music.com
          </a>

          {/* Hamburger Menu trigger for mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-[52px] bg-black/95 backdrop-blur-2xl border-b border-white/5 z-30 py-8 px-6 flex flex-col space-y-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-5 text-xs uppercase tracking-[0.3em] font-semibold text-neutral-400">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                className="hover:text-white transition-colors text-left py-2"
              >
                HOME
              </button>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleScrollToSection('statements');
                }} 
                className="hover:text-white transition-colors text-left py-2"
              >
                DUO
              </button>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleScrollToSection('tour-section');
                }} 
                className="hover:text-white transition-colors text-left py-2"
              >
                TOUR
              </button>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleScrollToSection('booking-section');
                }} 
                className="hover:text-white transition-colors text-left py-2"
              >
                BOOKING
              </button>
            </div>
            
            <div className="pt-4 border-t border-white/5 flex flex-col space-y-4">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleDownloadEPK();
                }} 
                className="w-full bg-gold hover:bg-white text-black hover:text-black font-bold uppercase tracking-[0.25em] text-[10px] py-3.5 transition-all text-center flex items-center justify-center space-x-2"
              >
                <Download className="w-3.5 h-3.5 text-current" />
                <span>DOWNLOAD EPK</span>
              </button>
              <a 
                href="mailto:booking@phase2music.com" 
                className="text-[9px] uppercase tracking-widest text-neutral-400 hover:text-white transition-colors text-center py-2"
              >
                booking@phase2music.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Hero Section (With background video loop) */}
      <section className="h-screen w-full flex flex-col items-center justify-center bg-black relative px-6 overflow-hidden">
        
        {/* Looping background video */}
        <motion.div 
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="absolute inset-0 z-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter grayscale-[20%] contrast-[1.05] brightness-[0.95]"
          >
            <source src="/images/IMG_7658.MP4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none z-1" />
        
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          style={{ y: heroY, opacity: heroOpacity, filter: heroBlur }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center relative z-10 w-full"
        >
          <div className="w-full max-w-[90vw] md:max-w-5xl px-4 select-none pointer-events-none">
            <svg viewBox="0 0 1000 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-center filter drop-shadow-[0_0_20px_rgba(255,255,255,0.06)]">
              <defs>
                <linearGradient id="silverMetallicText" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#A3A3A3" />
                  <stop offset="100%" stopColor="#383838" />
                </linearGradient>
                <linearGradient id="goldMetallicText" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#BF953F" />
                  <stop offset="25%" stopColor="#FCF6BA" />
                  <stop offset="50%" stopColor="#B38728" />
                  <stop offset="75%" stopColor="#FBF5B7" />
                  <stop offset="100%" stopColor="#AA771C" />
                </linearGradient>
              </defs>
              <text
                x="50%"
                y="55%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="url(#silverMetallicText)"
                className="font-serif font-bold text-[142px]"
                letterSpacing="-0.04em"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                PHASE<tspan fill="url(#goldMetallicText)">2</tspan>
              </text>
            </svg>
          </div>
          
          <div className="w-12 h-[1px] bg-gold/30 mt-6" />

          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.55em] text-gold/90 mt-6 font-semibold font-sans">
            RABIA & MARIYA &bull; SISTER DUO
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 flex flex-col items-center z-10">
          <span className="text-[9px] uppercase tracking-[0.35em] text-neutral-500 mb-3">Scroll Down</span>
          <div className="w-[1px] h-10 bg-neutral-800 animate-bounce" style={{ animationDuration: '2.5s' }} />
        </div>
      </section>

      {/* 3. Emblem 1: Geometric Wave Mandala */}
      <div className="w-full flex justify-center py-20 bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
          whileInView={{ opacity: 0.35, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-20 h-20"
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[1.2]">
            <circle cx="50" cy="50" r="45" stroke="url(#goldGradient)" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="35" stroke="url(#goldGradient)" />
            <circle cx="50" cy="50" r="25" stroke="url(#goldGradient)" />
            <path d="M50 5 L50 95" stroke="url(#goldGradient)" strokeDasharray="5 5" />
            <path d="M5 50 L95 50" stroke="url(#goldGradient)" strokeDasharray="5 5" />
            <rect x="35" y="35" width="30" height="30" stroke="url(#goldGradient)" strokeDasharray="1 1" />
          </svg>
        </motion.div>
      </div>

      {/* 4. Slogan Statements */}
      <section id="statements" className="w-full bg-black py-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-20 md:space-y-28">
          
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold block font-semibold">Sonic Identity</span>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-display font-black uppercase tracking-tight leading-[1.05] text-white">
              We are the<br />culture of<br /><span className="text-metallic">Bolly Tech</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-16 h-[1px] bg-neutral-800"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-display font-black uppercase tracking-wide leading-[1.1] text-neutral-400">
              Of electronic<br />music, creating<br />a <span className="font-serif italic font-normal text-white capitalize">bridge</span><br />between the<br /><span className="text-gold">ancestral</span> & the<br /><span className="text-white">futuristic</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="max-w-lg mx-auto space-y-6"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 leading-relaxed font-sans">
              Rabia bringing crowd-driven sets across 100+ festivals, Mariya shaping 5+ years of electronic music curation. Together, blending house, tech house, and bolly tech rhythms.
            </p>
            <div className="flex justify-center space-x-2 text-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
              <span className="text-[10px] uppercase tracking-widest font-bold font-sans">Syncing Decks &bull; 126 BPM</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 5. Emblem 2: Twin Sound Wave Crest */}
      <div className="w-full flex justify-center py-20 bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
          whileInView={{ opacity: 0.35, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-24 h-20"
        >
          <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[1.2]">
            <path d="M10 40 Q30 10 60 40 T110 40" stroke="url(#goldGradient)" />
            <path d="M10 40 Q30 70 60 40 T110 40" stroke="url(#goldGradient)" strokeDasharray="4 4" />
            <circle cx="60" cy="40" r="6" fill="url(#goldGradient)" />
            <line x1="60" y1="5" x2="60" y2="75" stroke="url(#goldGradient)" strokeDasharray="3 3" />
            <circle cx="20" cy="40" r="2" fill="url(#goldGradient)" />
            <circle cx="100" cy="40" r="2" fill="url(#goldGradient)" />
          </svg>
        </motion.div>
      </div>

      {/* 6. Parallax Widescreen video banner */}
      <section className="parallax-banner-container w-full h-[65vh] md:h-[80vh] overflow-hidden relative bg-black border-t border-b border-white/5">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="parallax-banner absolute -top-[10%] left-0 w-full h-[120%] object-cover banner-filter"
        >
          <source src="/images/IMG_7660.MP4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black z-10" />
        <div className="absolute bottom-6 right-6 md:right-12 z-20 text-[9px] uppercase tracking-[0.4em] text-neutral-500 font-sans">
          PHASE2 &bull; Live Tour Footage
        </div>
      </section>

      {/* 7. Emblem 3: Geometric Comb */}
      <div className="w-full flex justify-center py-20 bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
          whileInView={{ opacity: 0.35, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-20 h-20"
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[1.2]">
            <rect x="25" y="25" width="50" height="50" rx="2" stroke="url(#goldGradient)" />
            <line x1="35" y1="25" x2="35" y2="75" stroke="url(#goldGradient)" />
            <line x1="50" y1="25" x2="50" y2="75" stroke="url(#goldGradient)" strokeDasharray="3 3" />
            <line x1="65" y1="25" x2="65" y2="75" stroke="url(#goldGradient)" />
            <circle cx="50" cy="50" r="10" stroke="url(#goldGradient)" />
            <path d="M50 10 L50 25" stroke="url(#goldGradient)" />
            <path d="M50 75 L50 90" stroke="url(#goldGradient)" />
          </svg>
        </motion.div>
      </div>

      {/* 8. Widescreen Concert Tour Billboard with Mouse Hover Previews */}
      <motion.section 
        id="tour-section" 
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-black py-16 px-6"
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Dynamic Concert Strobe Card */}
          <div className="w-full min-h-[280px] sm:min-h-0 sm:aspect-[21/9] md:aspect-[3/1] bg-neutral-950 border border-neutral-900 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-black to-gold/5 z-0 group-hover:scale-105 transition-transform duration-[2.5s]" />
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-32 bg-red-600/10 blur-[90px] rounded-full z-0 pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-32 bg-gold/5 blur-[90px] rounded-full z-0 pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
            
            <div className="relative z-10 space-y-4">
              <span className="text-[10px] tracking-[0.45em] text-red-500 font-bold uppercase block font-sans">Global Performance Tour</span>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-wider text-white">
                EXPERIENCE THE SOUND
              </h3>
              <div className="flex justify-center pt-2">
                <button 
                  onClick={() => handleScrollToSection('tour-dates-list')} 
                  className="px-8 py-3 bg-white text-black font-semibold text-[10px] uppercase tracking-widest hover:bg-gold hover:text-black transition-all duration-300 cursor-pointer font-sans"
                >
                  VIEW TOUR DATES
                </button>
              </div>
            </div>
          </div>

          {/* Minimalist Tour Dates List with GSAP mouse hover triggers */}
          <div 
            id="tour-dates-list" 
            onMouseMove={handleMouseMove}
            className="w-full max-w-4xl mt-20 divide-y divide-white/5 border-t border-b border-white/5 font-sans"
          >
            {shows.map((show) => (
              <div 
                key={`${show.city}-${show.venue}`} 
                onMouseEnter={() => handleMouseEnter(show.image)}
                onMouseLeave={handleMouseLeave}
                className="py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-neutral-950/20 px-2 transition-colors duration-300 cursor-pointer"
              >
                <div className="flex items-center space-x-8">
                  <span className="font-mono text-neutral-500 text-xs tracking-widest font-semibold">{show.date}</span>
                  <h4 className="font-serif text-lg md:text-xl text-white group-hover:text-gold transition-all duration-300 ease-out transform group-hover:translate-x-3 uppercase tracking-wide">{show.venue}</h4>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-10">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">{show.city}, {show.country}</span>
                  <a 
                    href="#booking-section" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollToSection('booking-section');
                    }}
                    className="text-[9px] uppercase tracking-widest font-bold border border-gold/30 px-3 py-1 text-gold hover:text-black hover:bg-gold transition-all"
                  >
                    INQUIRE
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* 9. Visual Lookbook & Live Reels: Premium Horizontal Drag Carousel */}
      <motion.section 
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-black py-28 border-t border-b border-white/5 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.45em] text-gold uppercase block font-semibold">Visual Curation</span>
            <h3 className="font-serif text-3xl md:text-5xl text-white uppercase tracking-wider">LOOKBOOK & LIVE REELS</h3>
          </div>
          <div className="flex items-center space-x-4 text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-sans">
            <span className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
              <span>DRAG TO EXPLORE</span>
            </span>
            <span>&bull;</span>
            <span>HOVER TO PLAY VIDEOS</span>
          </div>
        </div>

        {/* Drag Scroll Track */}
        <div ref={carouselRef} className="w-full overflow-x-auto md:overflow-hidden no-scrollbar px-6 md:px-12 select-none relative">
          <motion.div 
            drag={isMobile ? false : "x"} 
            dragConstraints={carouselRef}
            dragElastic={0.2}
            className="flex space-x-8 pb-12 w-max cursor-grab active:cursor-grabbing"
          >
            {carouselItems.map((item, idx) => (
              <LookbookCard key={idx} item={item} index={idx} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 10. Bottom Stack Word Columns */}
      <section className="w-full bg-black py-32 relative overflow-hidden flex flex-col items-center">
        <div className="space-y-4 text-center">
          {['Groove', 'Energy', 'Synergy', 'Rhythm', 'Passion'].map((word, idx) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              whileInView={{ opacity: 0.8, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.1, duration: 1.2, ease: 'easeOut' }}
              className="font-serif text-5xl sm:text-7xl md:text-[7rem] tracking-[0.2em] uppercase text-white font-bold leading-none select-none hover:text-gold transition-colors duration-500"
            >
              {word}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 10.5 Instagram Grid (Photosheet showcasing lifestyle and tour) */}
      <motion.section 
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-black py-20 px-6 border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <InstagramIcon className="w-5 h-5 text-gold mx-auto" />
            <span className="text-[10px] tracking-[0.45em] text-neutral-500 uppercase block font-semibold">Lifestyle & Tour</span>
            <h3 className="font-serif text-2xl text-white uppercase tracking-wider">ON INSTAGRAM</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {instagramPosts.map((post, idx) => (
              <a
                key={idx}
                href="https://www.instagram.com/p/DYaCW9lDJoS/"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square relative bg-neutral-950 border border-neutral-900 overflow-hidden group block"
              >
                <div className="absolute inset-0 z-10 border border-gold/0 group-hover:border-gold/20 transition-all scale-[0.96] pointer-events-none" />
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 350px"
                  className="object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1s] brightness-[0.7] group-hover:brightness-[0.95]"
                />
                
                {/* Icon overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                  <InstagramIcon className="w-6 h-6 text-white scale-90 group-hover:scale-100 transition-transform duration-300" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 11. Sleek Booking Inquiry Panel & Footer */}
      {/* 11. Sleek Booking Inquiry Panel & Footer */}
      <section id="booking-section" className="w-full bg-black border-t border-white/5 py-32 px-6 relative font-sans">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] tracking-[0.45em] text-gold uppercase block font-semibold">Reservations</span>
            <h3 className="font-serif text-3xl md:text-5xl text-white uppercase tracking-wider">BOOKING PHASE2</h3>
            <div className="w-8 h-[1px] bg-gold/30 mx-auto my-3" />
            <p className="text-neutral-500 text-xs uppercase tracking-widest leading-relaxed max-w-md mx-auto">
              For worldwide bookings, corporate inquiries, and festival slots. Fill out the request form below or contact management directly.
            </p>
          </div>

          {formSubmitted ? (
            <div className="w-full p-10 border border-gold/20 bg-neutral-950/60 backdrop-blur-md text-center space-y-5 shadow-2xl">
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold block">Inquiry Received</span>
              <p className="text-neutral-400 text-xs uppercase tracking-wider leading-relaxed">
                Thank you for reaching out. Our management team will review your event details and respond within 24 hours.
              </p>
              <button 
                onClick={() => setFormSubmitted(false)} 
                className="text-[9px] uppercase tracking-widest text-neutral-400 hover:text-white border border-neutral-800 hover:border-gold/40 px-4 py-2 mt-4 cursor-pointer font-sans transition-all duration-300"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="w-full space-y-8 font-sans">
              <div className="space-y-6">
                
                <div className="relative group">
                  <input 
                    type="text" 
                    required
                    placeholder="NAME / PROMOTER / AGENCY"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-neutral-800 focus:border-gold outline-none text-xs py-4 uppercase tracking-widest text-white rounded-none transition-colors duration-300"
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-focus-within:w-full" />
                </div>

                <div className="relative group">
                  <input 
                    type="email" 
                    required
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-neutral-800 focus:border-gold outline-none text-xs py-4 uppercase tracking-widest text-white rounded-none transition-colors duration-300"
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-focus-within:w-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input 
                      type="text" 
                      required
                      placeholder="EVENT DATE (DD.MM.YYYY)"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-transparent border-b border-neutral-800 focus:border-gold outline-none text-xs py-4 uppercase tracking-widest text-white rounded-none transition-colors duration-300"
                    />
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-focus-within:w-full" />
                  </div>
                  <div className="relative group">
                    <input 
                      type="text" 
                      required
                      placeholder="LOCATION (CITY, COUNTRY)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-transparent border-b border-neutral-800 focus:border-gold outline-none text-xs py-4 uppercase tracking-widest text-white rounded-none transition-colors duration-300"
                    />
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-focus-within:w-full" />
                  </div>
                </div>

                <div className="relative group">
                  <textarea 
                    required
                    rows={2}
                    placeholder="EVENT DETAILS (CAPACITY, RIDER NOTES, MESSAGE)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent border-b border-neutral-800 focus:border-gold outline-none text-xs py-4 uppercase tracking-widest text-white resize-none rounded-none transition-colors duration-300"
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-focus-within:w-full" />
                </div>

              </div>

              {/* Submit button */}
              <button 
                type="submit" 
                className="w-full py-4 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-black hover:text-white border border-transparent hover:border-gold transition-all duration-500 flex items-center justify-center space-x-3.5 cursor-pointer font-sans"
              >
                <span>SEND INQUIRY</span>
                <Send className="w-3.5 h-3.5 text-current" />
              </button>
            </form>
          )}

          {/* Booking Button for EPK */}
          <div className="w-full mt-12 text-center">
            <button 
              onClick={handleDownloadEPK} 
              className="px-8 py-3 border border-neutral-800 text-neutral-400 hover:text-gold hover:border-gold hover:bg-gold/5 transition-all duration-500 uppercase tracking-widest text-[9px] font-bold font-sans cursor-pointer flex items-center justify-center space-x-2.5 mx-auto rounded-none"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD TECH RIDER & EPK</span>
            </button>
          </div>

          {/* Footer */}
          <div className="w-full mt-32 pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-6 text-[9px] uppercase tracking-widest text-neutral-600 font-sans">
            <div>
              &copy; {new Date().getFullYear()} PHASE2 Music &bull; All Rights Reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-8 text-neutral-500 font-bold">
              <a 
                href="https://www.instagram.com/phase2music" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gold transition-colors duration-300 flex items-center space-x-1.5"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-current" />
                <span>INSTAGRAM</span>
              </a>
              <a 
                href="https://soundcloud.com/phase2music" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gold transition-colors duration-300 flex items-center space-x-1.5"
              >
                <Music className="w-3.5 h-3.5 text-current" />
                <span>SOUNDCLOUD</span>
              </a>
              <a 
                href="https://spotify.com/artist/phase2music" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gold transition-colors duration-300 flex items-center space-x-1.5"
              >
                <Disc className="w-3.5 h-3.5 text-current animate-spin-slow" />
                <span>SPOTIFY</span>
              </a>
            </div>

            <div className="flex space-x-8">
              <a href="mailto:booking@phase2music.com" className="hover:text-gold transition-colors flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-neutral-600 group-hover:text-gold" />
                <span>booking@phase2music.com</span>
              </a>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-gold transition-colors flex items-center space-x-1.5 cursor-pointer">
                <span>TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>



    </div>
  );
}
