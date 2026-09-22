'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Mail, Copy, Check, ExternalLink, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onScrollToSection: (id: string) => void;
  onDownloadEPK: () => void;
}

// Brand Instagram SVG icon
const InstagramSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Header({ onScrollToSection, onDownloadEPK }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Scroll listener for floating dock compression & active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      const sections = [
        { id: 'booking-section', name: 'booking' },
        { id: 'gallery-section', name: 'gallery' },
        { id: 'tour-section', name: 'tour' },
        { id: 'statements', name: 'duo' },
      ];

      let current = 'home';
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            current = sec.name;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const navItems = [
    { label: 'HOME', id: 'home', key: 'home', isScrollTop: true },
    { label: 'THE DUO', id: 'statements', key: 'duo' },
    { label: 'TOUR', id: 'tour-section', key: 'tour' },
    { label: 'GALLERY', id: 'gallery-section', key: 'gallery' },
    { label: 'RESERVATIONS', id: 'booking-section', key: 'booking' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false);
    if (item.isScrollTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onScrollToSection(item.id);
    }
  };

  return (
    <>
      {/* 
        Awwwards-Style Floating Navigation Island 
        Fixed at top with floating offset, centered, rounded pill capsule, 
        and high-end glassmorphism with specular reflections 
      */}
      <div className="fixed top-3 sm:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none font-sans select-none">
        
        <motion.nav
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full max-w-5xl flex items-center justify-between rounded-full transition-all duration-500 px-3 py-1.5 sm:px-6 sm:py-2.5 ${
            isScrolled
              ? 'bg-[#080808]/85 backdrop-blur-2xl border border-white/[0.14] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.12),inset_0_1px_0_0_rgba(255,255,255,0.15)] scale-[0.98]'
              : 'bg-black/65 backdrop-blur-xl border border-white/[0.1] shadow-[0_15px_40px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.1)]'
          }`}
        >
          {/* Left: Brand Monogram & Live Status */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              data-cursor="HOME"
              className="cursor-pointer group flex items-center space-x-1 sm:space-x-1.5 focus:outline-none"
            >
              <span className="font-serif text-base sm:text-xl font-black tracking-[0.2em] sm:tracking-[0.25em] text-white">
                PHASE
              </span>
              <span className="font-serif text-base sm:text-xl font-black text-gold group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all">
                2
              </span>
            </button>

            {/* Live Tour status pill (hidden on small screens) */}
            <div className="hidden md:flex items-center space-x-2 pl-3 border-l border-white/10 text-[8px] font-mono tracking-widest text-neutral-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
              </span>
              <span className="uppercase text-neutral-400">LIVE '26</span>
            </div>
          </div>

          {/* Center: Awwwards Floating Navigation Pill Links */}
          <div 
            onMouseLeave={() => setHoveredSection(null)}
            className="hidden lg:flex items-center space-x-1 bg-white/[0.03] border border-white/[0.06] rounded-full p-1"
          >
            {navItems.map((item) => {
              const isSelected = activeSection === item.key;
              const isHovered = hoveredSection === item.key;

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  onMouseEnter={() => setHoveredSection(item.key)}
                  data-cursor="NAV"
                  className={`relative px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.28em] transition-colors duration-300 cursor-pointer ${
                    isSelected ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {/* Sliding capsule indicator */}
                  {isSelected && (
                    <motion.div
                      layoutId="floatingActivePill"
                      className="absolute inset-0 rounded-full bg-white/[0.1] border border-gold/40 shadow-[0_0_12px_rgba(212,175,55,0.15)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}

                  {/* Hover capsule preview if not selected */}
                  {!isSelected && isHovered && (
                    <motion.div
                      layoutId="floatingHoverPill"
                      className="absolute inset-0 rounded-full bg-white/[0.05]"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}

                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Instagram Badge, EPK Pill & Mobile Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Exclusive Instagram Portal Pill */}
            <a
              href="https://www.instagram.com/rabiaxmariya/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="INSTA"
              className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-neutral-900/90 hover:bg-gold/15 border border-neutral-800 hover:border-gold/50 text-neutral-300 hover:text-gold transition-all duration-300 text-[8px] sm:text-[9px] font-sans tracking-widest group shadow-sm"
              title="Official Instagram: @rabiaxmariya"
            >
              <InstagramSvg className="w-3.5 h-3.5 text-current group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="hidden sm:inline font-mono">@rabiaxmariya</span>
            </a>

            {/* EPK Download Capsule Button */}
            <button
              onClick={onDownloadEPK}
              data-cursor="EPK"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-gold/15 hover:bg-gold text-gold hover:text-black border border-gold/40 hover:border-gold transition-all duration-300 cursor-pointer text-[9px] font-bold tracking-[0.2em] shadow-sm"
            >
              <Download className="w-3 h-3 text-current" />
              <span>EPK</span>
            </button>

            {/* Mobile Hamburger Pill Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-cursor="MENU"
              className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.06] hover:bg-gold/20 border border-white/10 hover:border-gold/50 flex items-center justify-center text-neutral-300 hover:text-gold transition-all duration-300 cursor-pointer focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <div className="w-4 h-3 flex flex-col justify-between items-center">
                <span
                  className={`h-[1.5px] w-4 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'translate-y-[5px] rotate-45 bg-gold' : ''
                  }`}
                />
                <span
                  className={`h-[1.5px] w-4 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`h-[1.5px] w-4 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? '-translate-y-[5px] -rotate-45 bg-gold' : ''
                  }`}
                />
              </div>
            </button>

          </div>

        </motion.nav>
      </div>

      {/* Awwwards Full-Screen High-Fashion Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-3xl lg:hidden flex flex-col justify-between pt-24 pb-8 px-4 sm:px-12 overflow-y-auto font-sans"
          >
            {/* Ambient gold glow in drawer */}
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-10 left-0 w-72 h-72 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Navigation Links with Editorial Index Numbers */}
            <div className="relative z-10 flex flex-col space-y-3 pt-2">
              <div className="text-[9px] font-mono tracking-[0.4em] text-neutral-500 uppercase pb-2 border-b border-white/10 flex items-center justify-between">
                <span>// AWWWARDS FLOATING INDEX</span>
                <span className="text-gold">RABIA &bull; MARIYA</span>
              </div>

              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index + 0.1, duration: 0.4 }}
                  onClick={() => handleNavClick(item)}
                  className="flex items-center justify-between text-left py-3.5 border-b border-white/[0.06] group cursor-pointer"
                >
                  <div className="flex items-baseline space-x-3.5">
                    <span className="text-[10px] font-mono text-neutral-600 group-hover:text-gold transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-2xl sm:text-3xl font-light tracking-widest text-neutral-200 group-hover:text-gold transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </motion.button>
              ))}
            </div>

            {/* Bottom Drawer Actions: Instagram Spotlight & EPK */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="relative z-10 pt-8 space-y-4 border-t border-white/10 mt-6"
            >
              {/* Instagram Official Banner */}
              <a
                href="https://www.instagram.com/rabiaxmariya/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-neutral-950 border border-neutral-800 hover:border-gold/50 rounded-2xl transition-colors"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-gold">
                    <InstagramSvg className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-gold block uppercase">
                      OFFICIAL INSTAGRAM
                    </span>
                    <span className="text-xs text-white font-serif tracking-wider">
                      @rabiaxmariya
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
              </a>

              {/* EPK Download Button */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onDownloadEPK();
                }}
                className="w-full py-4 rounded-full bg-white hover:bg-gold text-black font-bold uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
              >
                <Download className="w-3.5 h-3.5 text-black" />
                <span>DOWNLOAD EPK & RIDER</span>
              </button>

              {/* Management & Booking Desk copy button */}
              <div className="space-y-2">
                <button
                  onClick={() => handleCopyEmail('darshak@andfriends.in')}
                  className="w-full py-3 rounded-full bg-neutral-950 border border-neutral-900 text-neutral-400 hover:text-white text-[9px] font-mono tracking-widest flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Mail className="w-3 h-3 text-gold" />
                  <span>darshak@andfriends.in</span>
                  <span className="text-neutral-600 pl-1">
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-400 inline" /> : <Copy className="w-3 h-3 inline" />}
                  </span>
                </button>

                <div className="text-center text-[8px] font-mono uppercase tracking-[0.25em] text-neutral-500">
                  MANAGED BY <strong className="text-gold">&friends</strong> &bull; +91 95946 91939
                </div>
              </div>

              <div className="text-[8px] font-mono text-center tracking-[0.3em] text-neutral-600 pt-1">
                IBIZA &bull; DUBAI &bull; LONDON &bull; MUMBAI
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
