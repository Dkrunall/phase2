'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function InteractiveCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring for luxury fluid feel
  const springX = useSpring(mouseX, { stiffness: 450, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 28 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('button, a, input, textarea, [data-cursor], .cursor-pointer');
      if (interactiveEl) {
        setIsPointer(true);
        const customCursor = interactiveEl.getAttribute('data-cursor');
        setCursorText(customCursor || null);
      } else {
        setIsPointer(false);
        setCursorText(null);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      {/* Outer fluid trailing ring */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 1.9 : 1,
          borderColor: isPointer ? 'rgba(212, 175, 55, 0.85)' : 'rgba(255, 255, 255, 0.25)',
          backgroundColor: isPointer ? 'rgba(212, 175, 55, 0.08)' : 'rgba(255, 255, 255, 0.02)',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="w-9 h-9 rounded-full border border-white/30 backdrop-blur-[1px] flex items-center justify-center transition-colors"
      >
        {cursorText && (
          <span className="text-[7px] font-mono tracking-widest text-gold font-bold uppercase pointer-events-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center pinpoint dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 0.4 : 1,
          backgroundColor: isPointer ? 'rgba(212, 175, 55, 1)' : 'rgba(255, 255, 255, 0.9)',
        }}
        transition={{ duration: 0.12 }}
        className="w-1.5 h-1.5 rounded-full pointer-events-none shadow-[0_0_8px_rgba(212,175,55,0.8)]"
      />
    </div>
  );
}
