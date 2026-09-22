'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Component imports
import MestizaLayout from '@/components/MestizaLayout';
import Preloader from '@/components/Preloader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Initialize GSAP
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  return (
    <>
      {/* High-Fashion Minimal & Interactive Preloader */}
      {loading && (
        <Preloader onComplete={() => setLoading(false)} />
      )}

      {/* Main Page Layout pre-buffered in background for instantaneous cinematic impact */}
      <MestizaLayout />
    </>
  );
}
