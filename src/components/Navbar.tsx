import React, { useState } from 'react';
import { ShoppingBag, Database, Scissors, Camera, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAppointment: () => void;
  onOpenStoreManager: () => void;
  onOpenFittingRoom: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenAppointment,
  onOpenStoreManager,
  onOpenFittingRoom,
  onNavigateSection,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (sectionId: string) => {
    onNavigateSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/90 backdrop-blur-md border-b border-white/10 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Wordmark (Zone 1) */}
        <button
          onClick={() => handleNav('hero')}
          className="flex flex-col text-left group cursor-pointer shrink-0"
        >
          <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-[#c5a059] transition-colors uppercase">
            TS MENSWEAR
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase opacity-90">
            SPENCER PLAZA · CHENNAI
          </span>
        </button>

        {/* Center Navigation Links (Spacious, Uncongested) */}
        <nav className="hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase text-zinc-300 font-medium">
          <button
            onClick={() => handleNav('ensembles')}
            className="hover:text-white transition-colors relative py-1 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c5a059] hover:after:w-full after:transition-all"
          >
            Style Editions
          </button>
          <button
            onClick={() => handleNav('curation')}
            className="hover:text-white transition-colors relative py-1 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c5a059] hover:after:w-full after:transition-all"
          >
            Editorial
          </button>
          <button
            onClick={() => handleNav('catalog')}
            className="hover:text-white transition-colors relative py-1 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c5a059] hover:after:w-full after:transition-all"
          >
            Wardrobe
          </button>
          <button
            onClick={() => handleNav('spencer-plaza')}
            className="hover:text-white transition-colors relative py-1 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c5a059] hover:after:w-full after:transition-all"
          >
            Spencer Flagship
          </button>
          <button
            onClick={onOpenFittingRoom}
            className="text-[#c5a059] hover:text-white transition-colors relative py-1 flex items-center gap-1.5 cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Virtual Mirror</span>
          </button>
        </nav>

        {/* Right Actions (Zone 3 - Refined & Balanced) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Tailor Appointment CTA */}
          <button
            onClick={onOpenAppointment}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-200 hover:text-white border border-white/15 hover:border-[#c5a059] rounded-md transition-all cursor-pointer whitespace-nowrap"
            title="Book a master tailoring consultation at Spencer Plaza"
          >
            <Scissors className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Book Tailor</span>
          </button>

          {/* Database & Inventory Console */}
          <button
            onClick={onOpenStoreManager}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-md transition-colors cursor-pointer"
            title="Open Store POS & Database Console"
          >
            <Database className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden md:inline">Database & POS</span>
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-[#c5a059] rounded-md transition-colors cursor-pointer shadow-md"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Bag</span>
            <span className="px-1.5 py-0.2 bg-black text-white text-[10px] rounded-full tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white rounded-md border border-white/10 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0c0e] border-b border-white/15 px-6 py-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3 text-sm text-zinc-300 font-medium">
            <button
              onClick={() => handleNav('ensembles')}
              className="text-left py-2 hover:text-white border-b border-white/5 cursor-pointer"
            >
              Style Editions & Motion
            </button>
            <button
              onClick={() => handleNav('curation')}
              className="text-left py-2 hover:text-white border-b border-white/5 cursor-pointer"
            >
              Editorial Curation
            </button>
            <button
              onClick={() => handleNav('catalog')}
              className="text-left py-2 hover:text-white border-b border-white/5 cursor-pointer"
            >
              The Wardrobe Catalog
            </button>
            <button
              onClick={() => handleNav('spencer-plaza')}
              className="text-left py-2 hover:text-white border-b border-white/5 cursor-pointer"
            >
              Spencer Plaza Flagship
            </button>
            <button
              onClick={() => {
                onOpenFittingRoom();
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#c5a059] flex items-center gap-2 border-b border-white/5 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Virtual Mirror Camera Fitting</span>
            </button>
            <button
              onClick={() => {
                onOpenAppointment();
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#c5a059] flex items-center gap-2 cursor-pointer"
            >
              <Scissors className="w-4 h-4" />
              <span>Book Master Tailor Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
