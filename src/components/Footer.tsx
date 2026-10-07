import React, { useState } from 'react';
import { ArrowUp, MapPin, Phone, Mail, Instagram, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenStoreManager: () => void;
  onOpenAppointment: () => void;
}

export default function Footer({
  onNavigateSection,
  onOpenStoreManager,
  onOpenAppointment,
}: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-zinc-400 border-t border-white/10 pt-20 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Spencer Plaza Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-display text-2xl font-bold tracking-tight text-white uppercase">
              TS MENSWEAR
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-[#c5a059] font-medium">
              Spencer Plaza Flagship · Est. 1994
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-light">
              Chennai’s historic destination for bespoke tailoring, European linen, and contemporary menswear. Located on the 2nd Floor of Phase 2, Spencer Plaza on Anna Salai.
            </p>
            <div className="pt-2 text-xs text-zinc-300 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span>Shop 248, Phase 2, 2nd Floor, Spencer Plaza, Anna Salai, Chennai - 600002</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span>+91 44 2849 1994 · Mon–Sun: 10:30 AM – 9:30 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Boutique Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('ensembles')}
                  className="hover:text-white transition-colors"
                >
                  Style Editions & Motion
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('curation')}
                  className="hover:text-white transition-colors"
                >
                  Editorial Curation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('catalog')}
                  className="hover:text-white transition-colors"
                >
                  All Menswear Collections
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAppointment}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Book Bespoke Fitting Room
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStoreManager}
                  className="hover:text-white transition-colors font-mono text-[11px]"
                >
                  Store Database & Inventory Console
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Bespoke Client Book (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              The Spencer Private Client Book
            </h4>
            <p className="text-xs text-zinc-400 font-light">
              Receive private invitations to seasonal trunk shows and new fabric drops from Biella, Italy and Belfast, Ireland.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a059]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-black hover:bg-[#c5a059] text-xs font-semibold uppercase tracking-wider rounded transition-colors whitespace-nowrap"
              >
                Join
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-400">Welcome to the TS Menswear client roster.</p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div className="flex items-center gap-3">
            <span>© 1994–2026 TS Menswear. Spencer Plaza, Chennai.</span>
            <span>·</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors text-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
