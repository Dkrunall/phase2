'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface InstagramPost {
  id: string;
  src: string;
  alt: string;
  tag: string;
  url: string;
}

export default function InstagramSection() {
  const posts: InstagramPost[] = [
    {
      id: 'ig-1',
      src: '/images/IMG_9344.JPG.jpeg',
      alt: 'PHASE2 backstage vibe and tour diary',
      tag: 'BACKSTAGE DIARY',
      url: 'https://www.instagram.com/rabiaxmariya/'
    },
    {
      id: 'ig-2',
      src: '/images/IMG_9346.JPG.jpeg',
      alt: 'Rabia on the decks live performance',
      tag: 'LIVE SET // IBIZA',
      url: 'https://www.instagram.com/rabiaxmariya/'
    },
    {
      id: 'ig-3',
      src: '/images/IMG_9349.JPG.jpeg',
      alt: 'Mariya mixing live in the bullpen',
      tag: 'DECK RIG SYNERGY',
      url: 'https://www.instagram.com/rabiaxmariya/'
    },
    {
      id: 'ig-4',
      src: '/images/IMG_9351.JPG.jpeg',
      alt: 'Twin DJ energy and festival moment',
      tag: 'TWIN FREQUENCY',
      url: 'https://www.instagram.com/rabiaxmariya/'
    },
    {
      id: 'ig-5',
      src: '/images/IMG_4504.JPEG',
      alt: 'Tech house set festival crowd',
      tag: 'PEAK HOUR DROP',
      url: 'https://www.instagram.com/rabiaxmariya/'
    },
    {
      id: 'ig-6',
      src: '/images/IMG_4490.JPEG',
      alt: 'Ibiza mainstage festival atmosphere',
      tag: 'MAINSTAGE VIBES',
      url: 'https://www.instagram.com/rabiaxmariya/'
    }
  ];

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
    <section className="w-full bg-black text-white py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 border-t border-b border-white/5 relative overflow-hidden font-sans select-none">
      
      {/* Luxury Ambient Glows */}
      <div className="absolute top-1/3 right-1/4 w-[650px] h-[450px] bg-gold/[0.03] rounded-full blur-[190px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[650px] h-[450px] bg-gold/[0.025] rounded-full blur-[190px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10 sm:space-y-16">
        
        {/* Minimal Editorial Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-white/10">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <h3 className="font-serif text-xl sm:text-2xl md:text-4xl text-white uppercase tracking-wider font-light">
              Instagram &bull; <span className="italic text-gold">@rabiaxmariya</span>
            </h3>
          </div>

          <a
            href="https://www.instagram.com/rabiaxmariya/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-neutral-950 hover:bg-gold border border-gold/30 hover:border-gold text-white hover:text-black transition-all duration-300 uppercase font-mono tracking-widest text-[8px] sm:text-[9px] font-bold shadow-xl cursor-pointer w-fit"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>FOLLOW</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {/* 6-Card Clean High-Fashion Photo Grid (No Text Over Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {posts.map((post, idx) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="INSTA"
              className="aspect-square relative bg-neutral-950 border border-neutral-800/80 hover:border-gold/60 transition-all duration-500 overflow-hidden group block shadow-2xl cursor-pointer"
            >
              {/* Luxury Hairline Inner Border & Corner Brackets */}
              <div className="absolute inset-0 border border-gold/10 pointer-events-none scale-[0.97] z-20 group-hover:border-gold/30 transition-colors" />
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-gold/60 z-20" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-gold/60 z-20" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-gold/60 z-20" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-gold/60 z-20" />

              {/* Crystal Clear High-Resolution Photo */}
              <Image
                src={post.src}
                alt={post.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
                className="object-cover filter brightness-[0.98] contrast-[1.04] group-hover:scale-105 group-hover:brightness-105 transition-all duration-700 select-none"
              />

              {/* Subtle Hover Reveal Pill */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center p-4">
                <div className="px-4 py-2 bg-black/85 backdrop-blur-md border border-gold/40 flex items-center space-x-2 text-gold transform scale-90 group-hover:scale-100 transition-transform shadow-2xl">
                  <InstagramIcon className="w-4 h-4" />
                  <span className="text-[9px] font-mono tracking-widest font-bold uppercase">
                    @RABIAXMARIYA
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-gold" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
