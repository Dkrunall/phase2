'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ArrowUp, 
  Download, 
  ArrowUpRight 
} from 'lucide-react';

interface FooterProps {
  onScrollToSection: (id: string) => void;
  onDownloadEPK: () => void;
}

// Brand Instagram SVG
const InstagramSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer({ onScrollToSection, onDownloadEPK }: FooterProps) {
  const [worldTimes, setWorldTimes] = useState({
    ibiza: '--:--:--',
    london: '--:--:--',
    dubai: '--:--:--',
    mumbai: '--:--:--'
  });

  // Real-time ticking world clocks for tour hubs
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setWorldTimes({
        ibiza: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        london: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        dubai: now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        mumbai: now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'HOME', number: '01', action: scrollToTop },
    { label: 'THE DUO', number: '02', action: () => onScrollToSection('statements') },
    { label: 'PAST EVENTS', number: '03', action: () => onScrollToSection('tour-section') },
    { label: 'LIVE REELS', number: '04', action: () => onScrollToSection('reels-section') },
    { label: 'LOOKBOOK', number: '05', action: () => onScrollToSection('gallery-section') },
    { label: 'RESERVATIONS', number: '06', action: () => onScrollToSection('booking-section') },
  ];

  return (
    <footer className="w-full relative bg-[#040404] text-white border-t border-white/10 overflow-hidden font-sans select-none">
      
      {/* Subtle Luxury Ambient Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-gradient-to-b from-gold/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-gradient-to-t from-gold/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Gold Top Accent Line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* 1. Real-Time Interactive World Tour Clocks */}
      <div className="w-full border-b border-white/[0.06] bg-black/40 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em]">
          
          <div className="flex items-center space-x-2.5 text-neutral-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="font-mono text-neutral-300 font-semibold">
              GLOBAL HUBS &bull; LIVE SYNC
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-[8px] sm:text-[9px] font-mono text-neutral-400">
            <div className="flex items-center space-x-1.5 hover:text-gold transition-colors">
              <span className="text-neutral-500">IBIZA</span>
              <span className="text-gold font-bold">{worldTimes.ibiza}</span>
            </div>
            <span className="text-neutral-800 hidden xs:inline">&bull;</span>
            <div className="flex items-center space-x-1.5 hover:text-gold transition-colors">
              <span className="text-neutral-500">LONDON</span>
              <span className="text-gold font-bold">{worldTimes.london}</span>
            </div>
            <span className="text-neutral-800 hidden sm:inline">&bull;</span>
            <div className="hidden sm:flex items-center space-x-1.5 hover:text-gold transition-colors">
              <span className="text-neutral-500">DUBAI</span>
              <span className="text-gold font-bold">{worldTimes.dubai}</span>
            </div>
            <span className="text-neutral-800 hidden md:inline">&bull;</span>
            <div className="hidden md:flex items-center space-x-1.5 hover:text-gold transition-colors">
              <span className="text-neutral-500">MUMBAI</span>
              <span className="text-gold font-bold">{worldTimes.mumbai}</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Minimal Editorial Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Brand Logo & Tagline (Span 5) */}
          <div className="md:col-span-5 space-y-4">
            <div 
              onClick={scrollToTop}
              data-cursor="TOP"
              className="inline-flex flex-col cursor-pointer group space-y-3"
            >
              <div className="relative w-24 h-22 sm:w-28 sm:h-26">
                <Image
                  src="/images/phase2-logo-white.png"
                  alt="PHASE 2"
                  width={110}
                  height={104}
                  className="w-auto h-16 sm:h-20 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.25)] group-hover:drop-shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all duration-300"
                />
              </div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-mono group-hover:text-gold transition-colors">
                RABIA &amp; MARIYA &bull; SISTER DUO
              </div>
              <p className="text-xs text-neutral-500 font-sans max-w-sm leading-relaxed tracking-wide pt-1">
                A transcendent electronic music project fusing melodic techno, afro house, and bolly-tech into an intoxicating sensory spectacle.
              </p>
            </div>
          </div>

          {/* Column 2: Minimal Navigation Index (Span 4) */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-gold font-bold block">
              // INDEX NAVIGATION
            </span>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-[10px] font-mono tracking-widest uppercase">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  data-cursor="NAV"
                  className="text-left text-neutral-400 hover:text-gold transition-colors duration-200 flex items-center space-x-2 group cursor-pointer"
                >
                  <span className="text-[8px] text-neutral-600 group-hover:text-gold transition-colors">
                    [{link.number}]
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    {link.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Exclusive Actions & Instagram (Span 3) */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-gold font-bold block">
              // PRESS &amp; INSTAGRAM
            </span>

            <div className="space-y-3">
              {/* Instagram Exclusive Link */}
              <a
                href="https://www.instagram.com/rabiaxmariya/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="INSTA"
                className="w-full flex items-center justify-between px-4 py-3 bg-neutral-950 hover:bg-gold border border-neutral-800 hover:border-gold text-white hover:text-black transition-all duration-300 text-[9px] font-mono tracking-widest uppercase font-bold group cursor-pointer shadow-lg"
              >
                <div className="flex items-center space-x-2.5">
                  <InstagramSvg className="w-4 h-4 text-gold group-hover:text-black transition-colors" />
                  <span>@RABIAXMARIYA</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Presskit & Tech Rider Download */}
              <button
                onClick={onDownloadEPK}
                data-cursor="PRESSKIT"
                className="w-full flex items-center justify-between px-4 py-3 bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-gold/50 text-neutral-300 hover:text-white transition-all duration-300 text-[9px] font-mono tracking-widest uppercase font-bold cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <Download className="w-3.5 h-3.5 text-gold" />
                  <span>OFFICIAL PRESSKIT &amp; RIDER</span>
                </div>
                <span className="text-[8px] text-neutral-500 font-mono">[PDF]</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Monumental Typographic Watermark */}
      <div 
        onClick={scrollToTop}
        data-cursor="TOP"
        className="w-full overflow-hidden border-t border-white/[0.04] py-6 sm:py-10 md:py-12 bg-black/60 flex items-center justify-center cursor-pointer group"
      >
        <div className="font-serif font-black tracking-[0.03em] sm:tracking-[0.05em] text-[16vw] lg:text-[200px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-neutral-800/40 via-neutral-900/20 to-transparent group-hover:from-gold/30 group-hover:via-gold/10 group-hover:to-transparent transition-all duration-700 flex items-center select-none">
          <span>PHASE</span>
          <span className="text-gold/30 group-hover:text-gold/60 ml-1 sm:ml-2">2</span>
        </div>
      </div>

      {/* 4. Bottom Minimal Bar & Return to Top */}
      <div className="w-full border-t border-neutral-900/80 bg-black px-4 sm:px-6 py-4 sm:py-5 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span>&copy; {new Date().getFullYear()} PHASE2</span>
            <span className="text-neutral-700 hidden xs:inline">&bull;</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <div className="text-neutral-600 tracking-[0.3em] hidden md:block">
            HOUSE &bull; TECH HOUSE &bull; AFRO HOUSE &bull; BOLLY TECH
          </div>

          <div>
            <button
              onClick={scrollToTop}
              data-cursor="TOP"
              className="flex items-center space-x-2 text-neutral-400 hover:text-gold transition-colors duration-300 cursor-pointer group py-1"
            >
              <span>BACK TO TOP</span>
              <div className="w-5 h-5 rounded-full border border-neutral-800 group-hover:border-gold flex items-center justify-center transition-colors">
                <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
}
