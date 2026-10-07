import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Scissors, Sparkles, MapPin, Film } from 'lucide-react';

interface HeroMotionProps {
  onExploreClick: () => void;
  onBookFittingClick: () => void;
}

export default function HeroMotion({ onExploreClick, onBookFittingClick }: HeroMotionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Smooth scroll progression calculation
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const scrolled = Math.min(1, Math.max(0, -rect.top / (windowHeight * 0.8)));
          setScrollProgress(scrolled);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Fluid scaling on scroll without layout shift
  const scaleValue = 0.96 + scrollProgress * 0.04;
  const borderRadius = Math.max(0, 16 - scrollProgress * 16);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-16 bg-[#080808]"
    >
      {/* Background Motion Video Container with Hardware-Accelerated Smooth Scaling */}
      <div
        className="absolute inset-0 z-0 overflow-hidden transition-transform duration-100 ease-out will-change-transform"
        style={{
          transform: `scale(${scaleValue})`,
          borderRadius: `${borderRadius}px`,
        }}
      >
        <div className="absolute inset-0 bg-black/65 z-10" />

        {/* High-Definition Fashion Motion Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center filter saturate-105 contrast-105"
        >
          <source src="/videos/hero_fashion_motion.mp4" type="video/mp4" />
        </video>

        {/* Rich Ambient Gradient Behind & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#18181c] via-[#0d0d0f] to-[#070708] -z-10 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-[#c5a059]/10 blur-[100px]" />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080808] via-black/40 to-black/35 pointer-events-none" />
      </div>

      {/* Floating Heritage Coordinate Meta */}
      <div className="absolute top-24 left-4 sm:left-8 md:left-12 z-20 flex items-center gap-2 text-[11px] tracking-wider uppercase text-zinc-400 font-mono">
        <span className="text-[#c5a059] font-semibold">EST. 1994</span>
        <span aria-hidden="true" className="text-zinc-600">·</span>
        <span>PHASE 2, SPENCER PLAZA</span>
        <span aria-hidden="true" className="text-zinc-600">·</span>
        <span>CHENNAI</span>
      </div>

      {/* Hero Typography & Core Brand Message (Refined, Well-Proportioned) */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a059] font-medium">
            Haute Tailoring & Contemporary Flagship
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-white uppercase text-balance max-w-3xl">
          TS <span className="text-outline">MENSWEAR</span>
        </h1>

        <div className="mt-2.5 text-base sm:text-xl md:text-2xl font-serif-luxury tracking-[0.2em] text-[#c5a059]">
          SPENCER PLAZA · ANNA SALAI
        </div>

        <p className="mt-5 text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl text-balance font-light leading-relaxed">
          Three decades of bespoke tailoring heritage. Hand-canvassed Italian wool suits, handspun raw silk bandhgalas, and curated silhouettes for the discerning gentleman.
        </p>

        {/* Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={onExploreClick}
            className="px-7 py-3 bg-white text-black hover:bg-[#c5a059] font-semibold text-xs uppercase tracking-wider rounded-md transition-all duration-200 shadow-xl cursor-pointer"
          >
            Explore Collections
          </button>
          <button
            onClick={onBookFittingClick}
            className="px-6 py-3 bg-black/70 hover:bg-black text-white border border-white/20 hover:border-[#c5a059] font-medium text-xs uppercase tracking-wider rounded-md transition-all duration-200 flex items-center gap-2 backdrop-blur-sm cursor-pointer"
          >
            <Scissors className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Book Spencer Fitting</span>
          </button>
        </div>

        {/* Video Interaction Bar */}
        <div className="mt-10 flex items-center gap-3 text-xs text-zinc-400 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            aria-label={isPlaying ? "Pause cinematic background" : "Play cinematic background"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#c5a059]" /> : <Play className="w-3.5 h-3.5 text-[#c5a059]" />}
            <span className="text-[11px]">{isPlaying ? 'Pause Motion' : 'Play Motion'}</span>
          </button>
          <span className="w-1 h-1 rounded-full bg-zinc-600" />
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#c5a059]" />}
            <span className="text-[11px]">{isMuted ? 'Unmute' : 'Mute'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
