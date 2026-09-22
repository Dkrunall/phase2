'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: 'street' | 'studio' | 'mono' | 'leopard';
  categoryLabel: string;
  title: string;
  plate: string;
  span?: string; // For editorial asymmetry
}

export default function GallerySection() {
  // Curated images: 8 distinct, non-repeating looks from the photoshoot
  const allImages: GalleryItem[] = [
    {
      id: 'gal-01',
      src: '/images/gallery/street-jacket-02.jpg',
      alt: 'PHASE2 Futuristic sunglasses and silver bomber',
      category: 'street',
      categoryLabel: 'FUTURISTIC STREET',
      title: 'Cyber Edge Solo',
      plate: 'PLATE 01 // BERLIN NIGHTS',
      span: 'aspect-[3/4]'
    },
    {
      id: 'gal-02',
      src: '/images/gallery/dramatic-light-02.jpg',
      alt: 'PHASE2 Warm directional light solo portrait',
      category: 'studio',
      categoryLabel: 'STUDIO SPOTLIGHT',
      title: 'Directional Heat',
      plate: 'PLATE 02 // MADRID SESSION',
      span: 'aspect-[3/4]'
    },
    {
      id: 'gal-03',
      src: '/images/gallery/editorial-bw-02.jpg',
      alt: 'PHASE2 Black and white profile portrait',
      category: 'mono',
      categoryLabel: 'MONOCHROME NOIR',
      title: 'High Contrast Shadow',
      plate: 'PLATE 03 // DUO MONO',
      span: 'aspect-[3/4]'
    },
    {
      id: 'gal-04',
      src: '/images/gallery/leopard-duo-03.jpg',
      alt: 'PHASE2 Leopard print close embrace editorial',
      category: 'leopard',
      categoryLabel: 'LEOPARD EDITORIAL',
      title: 'Leopard Close Embrace',
      plate: 'PLATE 04 // HARMONIC GAZE',
      span: 'aspect-[3/4]'
    },
    {
      id: 'gal-05',
      src: '/images/gallery/street-jacket-03.jpg',
      alt: 'PHASE2 Silver bomber jacket direct gaze',
      category: 'street',
      categoryLabel: 'FUTURISTIC STREET',
      title: 'Chrome Direct Gaze',
      plate: 'PLATE 05 // TOKYO CHROME',
      span: 'aspect-[3/4]'
    },
    {
      id: 'gal-06',
      src: '/images/gallery/editorial-bw-03.jpg',
      alt: 'PHASE2 Monochrome glam close-up direct gaze',
      category: 'mono',
      categoryLabel: 'MONOCHROME NOIR',
      title: 'Pure Velvet Grain',
      plate: 'PLATE 06 // ARCHIVAL PRINT',
      span: 'aspect-[3/4]'
    },
    {
      id: 'gal-07',
      src: '/images/gallery/leopard-duo-06.jpg',
      alt: 'PHASE2 Leopard editorial direct gaze portrait',
      category: 'leopard',
      categoryLabel: 'LEOPARD EDITORIAL',
      title: 'Fierce Direct Statement',
      plate: 'PLATE 07 // DUAL STATEMENT',
      span: 'aspect-[3/4]'
    },
    {
      id: 'gal-08',
      src: '/images/gallery/street-jacket-05.jpg',
      alt: 'PHASE2 Streetwear bomber duo seated portrait',
      category: 'street',
      categoryLabel: 'FUTURISTIC STREET',
      title: 'Twin Street Edge',
      plate: 'PLATE 08 // STREET SYNERGY',
      span: 'aspect-[3/4]'
    }
  ];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = () => {
    setLightboxIndex(prev => (prev === null ? null : (prev - 1 + allImages.length) % allImages.length));
  };

  const showNext = () => {
    setLightboxIndex(prev => (prev === null ? null : (prev + 1) % allImages.length));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <section 
      id="gallery-section"
      className="w-full bg-black text-white py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 border-t border-b border-white/5 relative overflow-hidden font-sans select-none"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[700px] h-[500px] bg-gold/[0.025] rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[400px] bg-gold/[0.02] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10 sm:space-y-16">
        
        {/* Minimal Editorial Header */}
        <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-white/10">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <h3 className="font-serif text-xl sm:text-3xl md:text-4xl text-white uppercase tracking-wider font-light">
              Lookbook &bull; <span className="italic text-gold">Archive</span>
            </h3>
          </div>
          <span className="text-[8px] sm:text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
            8 PLATES
          </span>
        </div>

        {/* Asymmetric Magazine / Editorial Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[300px] xs:auto-rows-[340px] sm:auto-rows-[340px]"
        >
          <AnimatePresence mode="popLayout">
            {allImages.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, delay: (idx % 6) * 0.05 }}
                data-cursor="LOOK"
                className={`relative bg-neutral-950 border border-neutral-800/80 hover:border-gold/60 transition-all duration-500 group overflow-hidden cursor-pointer shadow-2xl ${
                  img.span ? img.span : 'aspect-[3/4]'
                }`}
                onClick={() => openLightbox(idx)}
              >
                {/* Luxury Hairline Inner Border & Corner Brackets */}
                <div className="absolute inset-0 border border-gold/10 pointer-events-none scale-[0.98] z-20 group-hover:border-gold/30 transition-colors" />
                <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-gold/60 z-20" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-gold/60 z-20" />
                <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-gold/60 z-20" />
                <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-gold/60 z-20" />

                {/* Top Right Subtle Zoom Indicator on Hover */}
                <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/75 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl backdrop-blur-sm">
                    <ZoomIn className="w-3.5 h-3.5 text-gold" />
                  </div>
                </div>

                {/* High-Resolution Crystal Clear Image */}
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover filter brightness-[0.98] contrast-[1.04] group-hover:scale-105 group-hover:brightness-105 transition-all duration-700 select-none"
                  priority={idx < 4}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Cinematic Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && allImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-8 select-none"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-900/80 border border-white/20 hover:border-gold text-white hover:text-gold flex items-center justify-center transition-colors cursor-pointer shadow-2xl"
              title="Close Gallery [ESC]"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Left Nav Button */}
            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-900/80 border border-white/20 hover:border-gold text-white hover:text-gold flex items-center justify-center transition-colors cursor-pointer shadow-2xl"
              title="Previous [Left Arrow]"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-900/80 border border-white/20 hover:border-gold text-white hover:text-gold flex items-center justify-center transition-colors cursor-pointer shadow-2xl"
              title="Next [Right Arrow]"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Main Modal Image Container */}
            <motion.div
              key={allImages[lightboxIndex].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[78vh] sm:max-h-[82vh] aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] border border-gold/30 bg-neutral-950 p-1.5 sm:p-3 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Luxury Corner Accents */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-gold z-20" />
              <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-gold z-20" />
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-gold z-20" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-gold z-20" />

              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={allImages[lightboxIndex].src}
                  alt={allImages[lightboxIndex].alt}
                  fill
                  sizes="95vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Bottom HUD inside modal */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 right-3 sm:left-6 sm:right-6 z-20 flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400 bg-black/80 backdrop-blur-md px-3 sm:px-4 py-2 border border-white/10">
                <span className="text-gold font-bold truncate">
                  {allImages[lightboxIndex].categoryLabel}
                </span>
                <span className="text-white flex-shrink-0 pl-2">
                  {String(lightboxIndex + 1).padStart(2, '0')} / {String(allImages.length).padStart(2, '0')}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
