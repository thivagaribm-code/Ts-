import React, { useState } from 'react';
import { Scissors, Sparkles } from 'lucide-react';

interface FashionImageProps {
  src?: string;
  alt: string;
  className?: string;
  category?: string;
  accentColor?: string;
  productType?: 'suit' | 'blazer' | 'bandhgala' | 'streetwear' | 'linen' | 'trousers' | 'shoes' | 'accessories' | 'store';
}

export default function FashionImage({
  src,
  alt,
  className = '',
  category,
  accentColor = '#c5a059',
  productType = 'suit',
}: FashionImageProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Render high-definition bespoke tailoring artwork that never looks blank or dull
  const renderArtwork = () => {
    switch (productType) {
      case 'suit':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-gradient-to-b from-[#1c1c24] via-[#121217] to-[#09090c]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(197,160,89,0.22),transparent_70%)]" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/40 flex items-center justify-center mb-4 text-[#c5a059]">
                <Scissors className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059] mb-1">
                Bespoke Tailoring
              </span>
              <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-2">
                {alt}
              </h4>
              <p className="text-xs text-zinc-400 font-light max-w-[220px]">
                Super 140s Italian Merino Wool · Handcrafted Canvas
              </p>
            </div>
            <div className="absolute bottom-3 text-[10px] font-mono tracking-widest text-[#c5a059]/60 uppercase">
              TS MENSWEAR · SPENCER PLAZA
            </div>
          </div>
        );

      case 'blazer':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-gradient-to-b from-[#141d33] via-[#0d1424] to-[#070b14]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(197,160,89,0.2),transparent_70%)]" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/40 flex items-center justify-center mb-4 text-[#c5a059]">
                <Sparkles className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059] mb-1">
                Double-Breasted Atelier
              </span>
              <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-2">
                {alt}
              </h4>
              <p className="text-xs text-zinc-400 font-light max-w-[220px]">
                High-Twist Tropical Wool · Gold-Trimmed Buttons
              </p>
            </div>
          </div>
        );

      case 'bandhgala':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-gradient-to-b from-[#2d1f14] via-[#1a120c] to-[#0d0906]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.25),transparent_70%)]" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/50 flex items-center justify-center mb-4 text-[#c5a059]">
                <Sparkles className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059] mb-1">
                Spencer Heritage
              </span>
              <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-2">
                {alt}
              </h4>
              <p className="text-xs text-zinc-300 font-light max-w-[220px]">
                Handspun Raw Mulberry Silk · Antique Monogram Hardware
              </p>
            </div>
          </div>
        );

      case 'streetwear':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-gradient-to-b from-[#222228] via-[#151518] to-[#0a0a0c]">
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4 text-white">
                <Scissors className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059] mb-1">
                Luxury Streetwear
              </span>
              <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-2">
                {alt}
              </h4>
              <p className="text-xs text-zinc-400 font-light max-w-[220px]">
                460 GSM Heavyweight Organic Terry · Architectural Cut
              </p>
            </div>
          </div>
        );

      case 'linen':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-gradient-to-b from-[#332e29] via-[#1f1c19] to-[#0f0e0d]">
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center mb-4 text-[#c5a059]">
                <Sparkles className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059] mb-1">
                European Linen
              </span>
              <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-2">
                {alt}
              </h4>
              <p className="text-xs text-zinc-400 font-light max-w-[220px]">
                Pure Certified Flax · Mother-of-Pearl Fasteners
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-gradient-to-b from-[#1c1c20] via-[#111114] to-[#08080a]">
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center mb-4 text-[#c5a059]">
                <Scissors className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059] mb-1">
                Spencer Plaza Flagship
              </span>
              <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-2">
                {alt}
              </h4>
              <p className="text-xs text-zinc-400 font-light max-w-[220px]">
                Phase 2, Second Floor · Bespoke Craftsmanship
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden bg-zinc-950 ${className}`}>
      {/* 1. Base Layer: Rich, high-definition stylized atelier background so nothing is ever blank */}
      <div className="absolute inset-0 flex items-center justify-center">
        {renderArtwork()}
      </div>

      {/* 2. Primary Image: When loaded, smoothly displays over base */}
      {src && !imgError && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`relative z-10 w-full h-full object-cover transition-opacity duration-300 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />
      )}

      {/* Discreet Atelier Hallmark */}
      <div className="absolute bottom-2.5 right-2.5 pointer-events-none z-20 opacity-70">
        <span className="text-[9px] font-mono tracking-widest text-[#c5a059] bg-black/60 px-1.5 py-0.5 rounded border border-white/10 uppercase">
          TS · 1994
        </span>
      </div>
    </div>
  );
}
