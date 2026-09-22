'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Download } from 'lucide-react';
import Header from './Header';
import Hero from './Hero';
import SonicIdentity from './SonicIdentity';
import TourSection from './TourSection';
import LiveReels from './LiveReels';
import GallerySection from './GallerySection';
import TypographicManifesto from './TypographicManifesto';
import InstagramSection from './InstagramSection';
import Footer from './Footer';
import InteractiveCursor from './InteractiveCursor';
import ManagedByBadge from './ManagedByBadge';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MestizaLayout() {
  const { scrollYProgress } = useScroll();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  
  // Mobile responsive states
  const [isMobile, setIsMobile] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

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

    // Check mobile status
    const handleResize = () => {
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
Managed By &friends
Darshak: darshak@andfriends.in
Phone / WhatsApp: +91 95946 91939`;

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
      {/* Global Interactive Luxury Cursor Follower */}
      <InteractiveCursor />

      {/* Hairline Luxury Scroll Progress Indicator */}
      <motion.div 
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/60 via-gold to-white z-[9998] pointer-events-none"
      />

      {/* 1. Redesigned Luxury Header & Navigation */}
      <Header 
        onScrollToSection={handleScrollToSection} 
        onDownloadEPK={handleDownloadEPK} 
      />

      {/* 2. Redesigned Cinematic Hero Section */}
      <Hero onScrollToSection={handleScrollToSection} />

      {/* 3. Redesigned Luxury Sonic Identity Section */}
      <SonicIdentity />

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

      {/* 4. Redesigned Luxury Global Performance Tour Section */}
      <TourSection 
        onScrollToSection={handleScrollToSection} 
        onDownloadEPK={handleDownloadEPK} 
      />

      {/* 5. Redesigned Autoplay Live Video Reels Section */}
      <LiveReels />

      {/* 6. Redesigned Curated High-Fashion Lookbook Archive */}
      <GallerySection />

      {/* 7. Redesigned Interactive Typographic Sound Manifesto */}
      <TypographicManifesto />

      {/* 8. Redesigned Luxury Instagram Portal & Live Diary */}
      <InstagramSection />

      {/* 11. Sleek Booking Inquiry Panel */}
      <section id="booking-section" className="w-full bg-black border-t border-white/5 py-18 sm:py-28 md:py-32 px-4 sm:px-6 relative font-sans">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          
          <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <span className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.45em] text-gold uppercase block font-semibold">Reservations</span>
            <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white uppercase tracking-wider">BOOKING PHASE2</h3>
            <div className="w-8 h-[1px] bg-gold/30 mx-auto my-3" />
            <p className="text-neutral-500 text-[11px] sm:text-xs uppercase tracking-widest leading-relaxed max-w-md mx-auto">
              For worldwide bookings, corporate inquiries, and festival slots. Fill out the request form below or contact management directly.
            </p>
            <div className="flex flex-col items-center justify-center pt-4 sm:pt-6 space-y-3">
              <div className="relative w-24 h-16 sm:w-36 sm:h-24">
                <Image
                  src="/images/andfriends-logo.png"
                  alt="&friends management"
                  fill
                  className="object-contain filter brightness-125"
                />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-center">
                <span className="text-neutral-400">MANAGED BY <strong className="text-gold">&friends</strong></span>
                <span className="text-neutral-700 hidden xs:inline">&bull;</span>
                <a href="mailto:darshak@andfriends.in" className="text-neutral-300 hover:text-gold transition-colors">
                  darshak@andfriends.in
                </a>
                <span className="text-neutral-700 hidden xs:inline">&bull;</span>
                <a href="tel:+919594691939" className="text-neutral-300 hover:text-gold transition-colors">
                  +91 95946 91939
                </a>
              </div>
            </div>
          </div>

          {formSubmitted ? (
            <div className="w-full p-6 sm:p-10 border border-gold/20 bg-neutral-950/60 backdrop-blur-md text-center space-y-4 sm:space-y-5 shadow-2xl">
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold block">Inquiry Received</span>
              <p className="text-neutral-400 text-[11px] sm:text-xs uppercase tracking-wider leading-relaxed">
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
            <form onSubmit={handleBookingSubmit} className="w-full space-y-6 sm:space-y-8 font-sans">
              <div className="space-y-4 sm:space-y-6">
                
                <div className="relative group">
                  <input 
                    type="text" 
                    required
                    placeholder="NAME / PROMOTER / AGENCY"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-neutral-800 focus:border-gold outline-none text-base sm:text-xs py-3 sm:py-4 uppercase tracking-wider sm:tracking-widest text-white rounded-none transition-colors duration-300"
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
                    className="w-full bg-transparent border-b border-neutral-800 focus:border-gold outline-none text-base sm:text-xs py-3 sm:py-4 uppercase tracking-wider sm:tracking-widest text-white rounded-none transition-colors duration-300"
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-focus-within:w-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="relative group">
                    <input 
                      type="text" 
                      required
                      placeholder="EVENT DATE (DD.MM.YYYY)"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-transparent border-b border-neutral-800 focus:border-gold outline-none text-base sm:text-xs py-3 sm:py-4 uppercase tracking-wider sm:tracking-widest text-white rounded-none transition-colors duration-300"
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
                      className="w-full bg-transparent border-b border-neutral-800 focus:border-gold outline-none text-base sm:text-xs py-3 sm:py-4 uppercase tracking-wider sm:tracking-widest text-white rounded-none transition-colors duration-300"
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
                    className="w-full bg-transparent border-b border-neutral-800 focus:border-gold outline-none text-base sm:text-xs py-3 sm:py-4 uppercase tracking-wider sm:tracking-widest text-white resize-none rounded-none transition-colors duration-300"
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-focus-within:w-full" />
                </div>

              </div>

              {/* Submit button */}
              <button 
                type="submit" 
                data-cursor="INQUIRE"
                className="w-full py-3.5 sm:py-4 bg-white text-black font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[9px] sm:text-[10px] hover:bg-black hover:text-white border border-transparent hover:border-gold transition-all duration-500 flex items-center justify-center space-x-3 cursor-pointer font-sans"
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
              data-cursor="DOWNLOAD"
              className="px-8 py-3 border border-neutral-800 text-neutral-400 hover:text-gold hover:border-gold hover:bg-gold/5 transition-all duration-500 uppercase tracking-widest text-[9px] font-bold font-sans cursor-pointer flex items-center justify-center space-x-2.5 mx-auto rounded-none"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD TECH RIDER & EPK</span>
            </button>
          </div>

        </div>
      </section>

      {/* Redesigned Luxury Editorial Footer */}
      <Footer 
        onScrollToSection={handleScrollToSection}
        onDownloadEPK={handleDownloadEPK}
      />

      {/* Floating &friends Management Sticky Badge */}
      <ManagedByBadge />

    </div>
  );
}
