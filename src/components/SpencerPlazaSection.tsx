import React, { useState } from 'react';
import { MapPin, Clock, Phone, MessageSquare, Compass, Shield, Award, Sparkles, Navigation } from 'lucide-react';
import FashionImage from './FashionImage';

interface SpencerPlazaSectionProps {
  onBookFitting: () => void;
}

export default function SpencerPlazaSection({ onBookFitting }: SpencerPlazaSectionProps) {
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+91 44 2849 1994');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="spencer-plaza" className="py-28 px-6 md:px-12 bg-[#060606] border-t border-white/5 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (6 Cols): Story & Location Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>Phase 2, Second Floor, Spencer Plaza</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[0.95]">
              Experience The Craft in Person
            </h2>

            <p className="text-zinc-300 text-sm md:text-base font-light leading-relaxed">
              Situated in Chennai's legendary landmark on Anna Salai since 1994, the TS Menswear flagship boutique combines Savile Row precision with South Indian sartorial finesse. Step inside to feel handwoven mulberry silks, examine floating chest canvases, and experience personal fitting sessions.
            </p>

            {/* Key Boutique Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10">
                <Clock className="w-4 h-4 text-[#c5a059] mb-2" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Store Timings</h4>
                <p className="text-xs text-zinc-400 mt-1">Mon – Sun: 10:30 AM – 9:30 PM</p>
                <p className="text-[11px] text-zinc-500">Open 365 days including holidays</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10">
                <Compass className="w-4 h-4 text-[#c5a059] mb-2" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Flagship Coordinates</h4>
                <p className="text-xs text-zinc-400 mt-1">Shop No. 248, Phase 2, 2nd Floor</p>
                <p className="text-[11px] text-zinc-500">Opposite Central Atrium Escalator</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={onBookFitting}
                className="px-6 py-3 bg-white text-black hover:bg-[#c5a059] font-semibold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Book Personal Fitting
              </button>

              <button
                onClick={() => {
                  window.open('https://maps.google.com/?q=Spencer+Plaza+Chennai', '_blank');
                }}
                className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Google Maps Directions</span>
              </button>

              <button
                onClick={handleCopyPhone}
                className="px-4 py-3 text-xs text-zinc-400 hover:text-white border border-white/10 rounded transition-colors"
              >
                {copiedPhone ? 'Copied +91 44 2849 1994' : 'Call Concierge'}
              </button>
            </div>
          </div>

          {/* Right Column (6 Cols): Visual Architectural Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {/* Card 1: Tailoring Atelier Image */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-900 border border-white/10 group">
                <FashionImage
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
                  alt="Tailor cutting pattern in boutique"
                  productType="store"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-mono">
                    BESPOKE CUTTING TABLE
                  </span>
                  <p className="text-xs text-white font-medium mt-0.5">Savile Row Master Patterns</p>
                </div>
              </div>

              {/* Card 2: Micro heritage badge */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 flex items-center gap-4">
                <Award className="w-8 h-8 text-[#c5a059] shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-white">Serving Chennai Since 1994</div>
                  <div className="text-[11px] text-zinc-400">Over 45,000 bespoke garments created</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              {/* Card 3: Fabric Bolts Lounge */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 flex items-center gap-4">
                <Shield className="w-8 h-8 text-[#c5a059] shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-white">Lifetime Alterations</div>
                  <div className="text-[11px] text-zinc-400">Free fit tuning on all bespoke suits</div>
                </div>
              </div>

              {/* Card 4: Spencer Plaza Interior */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-900 border border-white/10 group">
                <FashionImage
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
                  alt="Spencer Plaza Store Ambience"
                  productType="store"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-mono">
                    FLAGSHIP SUITE
                  </span>
                  <p className="text-xs text-white font-medium mt-0.5">Private Dressing Lounge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
