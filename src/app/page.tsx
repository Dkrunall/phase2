'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

// Component imports
import MestizaLayout from '@/components/MestizaLayout';

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Initialize GSAP
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Simulate preloader time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  // GSAP animations after loading completes
  useEffect(() => {
    if (loading) return;

    // Smooth reveal animations for sections
    const elements = document.querySelectorAll('.gsap-reveal');
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, [loading]);

  return (
    <>
      {/* Premium Loader Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center"
          >
            {/* Grid background overlay for loader */}
            <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

            <div className="relative flex flex-col items-center">
              {/* Circular gold glowing ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="w-24 h-24 rounded-full border-t-2 border-r-2 border-gold border-b border-l border-neutral-900 mb-8"
              />
              {/* PHASE2 Logo inside loader */}
              <div className="text-center">
                <motion.span
                  initial={{ opacity: 0, letterSpacing: '0.1em' }}
                  animate={{ opacity: 1, letterSpacing: '0.3em' }}
                  transition={{ duration: 1 }}
                  className="font-serif text-3xl font-bold text-white uppercase"
                >
                  PHASE
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="font-serif text-3xl font-bold text-gold"
                >
                  2
                </motion.span>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 mt-2"
                >
                  Rabia & Mariya
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Layout */}
      {!loading && (
        <MestizaLayout />
      )}
    </>
  );
}

