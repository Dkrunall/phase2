'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Calendar, MapPin, ArrowRight, Download, Ticket, ExternalLink } from 'lucide-react';

interface TourShow {
  id: string;
  date: string;
  day: string;
  month: string;
  year: string;
  venue: string;
  stage: string;
  city: string;
  country: string;
  region: 'europe' | 'middle-east' | 'asia' | 'all';
  timezone: string;
  status: 'Selling Fast' | 'Limited VIP' | 'Guestlist Only' | 'Headline Debut';
  image: string;
}

interface TourSectionProps {
  onScrollToSection: (id: string) => void;
  onDownloadEPK: () => void;
}

export default function TourSection({ onScrollToSection, onDownloadEPK }: TourSectionProps) {
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'europe' | 'middle-east' | 'asia'>('all');
  const [hoveredShow, setHoveredShow] = useState<TourShow | null>(null);

  // Floating image cursor physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 350, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 25 });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const shows: TourShow[] = [
    {
      id: 'show-1',
      date: '05.06',
      day: '05',
      month: 'JUN',
      year: '2026',
      venue: 'Hï Ibiza (Theatre)',
      stage: 'Club Theatre Mainstage',
      city: 'Ibiza',
      country: 'Spain',
      region: 'europe',
      timezone: 'CEST',
      status: 'Selling Fast',
      image: '/images/gallery/street-jacket-01.jpg'
    },
    {
      id: 'show-2',
      date: '12.06',
      day: '12',
      month: 'JUN',
      year: '2026',
      venue: 'Pacha Club (Main Room)',
      stage: 'Official Residency Night',
      city: 'Ibiza',
      country: 'Spain',
      region: 'europe',
      timezone: 'CEST',
      status: 'Limited VIP',
      image: '/images/gallery/dramatic-light-01.jpg'
    },
    {
      id: 'show-3',
      date: '20.06',
      day: '20',
      month: 'JUN',
      year: '2026',
      venue: 'Bolly-Tech Arena',
      stage: 'Headlining 15,000 Cap Arena',
      city: 'Mumbai',
      country: 'India',
      region: 'asia',
      timezone: 'IST',
      status: 'Headline Debut',
      image: '/images/gallery/leopard-duo-01.jpg'
    },
    {
      id: 'show-4',
      date: '27.06',
      day: '27',
      month: 'JUN',
      year: '2026',
      venue: 'Toy Room DXB',
      stage: 'Exclusive Rooftop Club Set',
      city: 'Dubai',
      country: 'UAE',
      region: 'middle-east',
      timezone: 'GST',
      status: 'Guestlist Only',
      image: '/images/gallery/street-jacket-04.jpg'
    },
    {
      id: 'show-5',
      date: '04.07',
      day: '04',
      month: 'JUL',
      year: '2026',
      venue: 'Ministry of Sound',
      stage: 'The Box & 103 Soundclash',
      city: 'London',
      country: 'UK',
      region: 'europe',
      timezone: 'BST',
      status: 'Selling Fast',
      image: '/images/gallery/editorial-bw-01.jpg'
    }
  ];

  const filteredShows = selectedRegion === 'all' 
    ? shows 
    : shows.filter(show => show.region === selectedRegion);

  const regionTabs = [
    { label: 'ALL DESTINATIONS', key: 'all' as const, count: shows.length },
    { label: 'EUROPE / IBIZA', key: 'europe' as const, count: shows.filter(s => s.region === 'europe').length },
    { label: 'MIDDLE EAST', key: 'middle-east' as const, count: shows.filter(s => s.region === 'middle-east').length },
    { label: 'ASIA / INDIA', key: 'asia' as const, count: shows.filter(s => s.region === 'asia').length }
  ];

  return (
    <section 
      ref={containerRef}
      id="tour-section" 
      onMouseMove={handleMouseMove}
      className="w-full relative bg-[#040404] text-white py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 border-t border-white/5 overflow-hidden font-sans select-none"
    >
      {/* Ambient background gold glow */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-gold/[0.03] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-gold/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10 sm:space-y-16">
        
        {/* Minimal Tour Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2 text-gold text-[8px] sm:text-[9px] uppercase font-mono tracking-[0.3em] sm:tracking-[0.4em] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>// 03. GLOBAL TOUR 2026</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-6xl text-white font-light tracking-wide uppercase leading-tight">
              World Tour &amp; <span className="font-serif italic text-gold font-normal">Residencies</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-neutral-950 border border-neutral-800 text-[8px] sm:text-[9px] font-mono tracking-widest text-neutral-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="uppercase font-semibold">TICKETS ACTIVE</span>
            </div>

            <button
              onClick={onDownloadEPK}
              data-cursor="DOWNLOAD"
              className="inline-flex items-center space-x-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-gold/10 hover:bg-gold text-gold hover:text-black border border-gold/40 hover:border-gold transition-all duration-300 text-[8px] sm:text-[9px] uppercase font-bold tracking-widest cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>TECH RIDER & EPK</span>
            </button>
          </div>
        </div>

        {/* Region Filter Pill Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {regionTabs.map((tab) => {
            const isSelected = selectedRegion === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedRegion(tab.key)}
                data-cursor="FILTER"
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[8px] sm:text-[9px] uppercase font-mono tracking-[0.2em] sm:tracking-[0.25em] transition-all duration-300 cursor-pointer flex items-center space-x-1.5 sm:space-x-2 ${
                  isSelected
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-900 hover:border-neutral-800'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[7px] sm:text-[8px] font-bold ${isSelected ? 'text-neutral-700' : 'text-neutral-600'}`}>
                  [{tab.count}]
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Tour Schedule Cards List */}
        <div 
          className="space-y-3"
          onMouseLeave={() => setHoveredShow(null)}
        >
          {filteredShows.map((show, idx) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onMouseEnter={() => setHoveredShow(show)}
              data-cursor="TOUR"
              className="group relative p-4 sm:p-6 md:p-7 bg-neutral-950/70 border border-neutral-900/90 hover:border-gold/60 transition-all duration-400 overflow-hidden cursor-pointer shadow-xl"
              onClick={() => onScrollToSection('booking-section')}
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
                
                {/* Left: Date Capsule & Venue Details */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-7">
                  
                  {/* High-Fashion Date Monogram */}
                  <div className="flex sm:flex-col items-center justify-center w-auto sm:w-16 sm:h-16 px-3 py-1.5 sm:p-0 bg-neutral-900/90 border border-neutral-800 group-hover:border-gold/50 flex-shrink-0 transition-colors">
                    <span className="font-serif text-xl sm:text-2xl font-black text-white group-hover:text-gold transition-colors leading-none">
                      {show.day}
                    </span>
                    <span className="text-[8px] font-mono tracking-[0.2em] sm:tracking-[0.25em] text-neutral-400 uppercase font-bold sm:mt-1 ml-2 sm:ml-0">
                      {show.month}
                    </span>
                  </div>

                  {/* Venue & Stage Info */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[7px] sm:text-[8px] font-mono tracking-widest text-gold uppercase px-2 py-0.5 bg-gold/10 border border-gold/30">
                        {show.status}
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
                        {show.stage}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white uppercase tracking-wider font-semibold group-hover:text-gold group-hover:translate-x-1 transition-all duration-300">
                      {show.venue}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 font-sans tracking-wide">
                      <span className="flex items-center space-x-1 text-white">
                        <MapPin className="w-3 h-3 text-gold flex-shrink-0" />
                        <span>{show.city}, {show.country}</span>
                      </span>
                      <span className="text-neutral-700 hidden xs:inline">&bull;</span>
                      <span className="font-mono text-[9px] text-neutral-500">[{show.timezone}]</span>
                    </div>
                  </div>

                </div>

                {/* Right: Action & Inquiry Button */}
                <div className="flex items-center space-x-4 sm:space-x-6 flex-shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/5 justify-between sm:justify-end w-full lg:w-auto">
                  <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase hidden md:inline">
                    OFFICIAL STOP
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onScrollToSection('booking-section');
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-5 py-2.5 bg-white group-hover:bg-gold text-black font-bold uppercase tracking-[0.25em] text-[9px] transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <span>INQUIRE PASSES</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* 
        AWWWARDS-LEVEL INTERACTION:
        Floating Hover Image Preview that follows the cursor seamlessly
      */}
      <AnimatePresence>
        {hoveredShow && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              x: springX,
              y: springY,
              translateX: '35px',
              translateY: '-50%',
            }}
            className="fixed pointer-events-none z-[80] hidden lg:block"
          >
            <div className="relative w-52 h-64 bg-neutral-950 border border-gold/40 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(212,175,55,0.2)]">
              {/* Corner Accents */}
              <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-gold z-20" />
              <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-gold z-20" />
              <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-gold z-20" />
              <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-gold z-20" />

              <Image
                src={hoveredShow.image}
                alt={hoveredShow.venue}
                fill
                sizes="220px"
                className="object-cover filter contrast-[1.05] brightness-[1.02]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Float Preview Card Overlay */}
              <div className="absolute bottom-2 left-2 right-2 p-2 bg-black/75 backdrop-blur-md border border-white/10 text-[8px] font-mono tracking-widest uppercase">
                <span className="text-gold font-bold block">{hoveredShow.city}</span>
                <span className="text-neutral-300 truncate block">{hoveredShow.venue}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
