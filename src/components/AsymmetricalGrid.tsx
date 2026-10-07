import React from 'react';
import { Product } from '../types';
import { ArrowRight, Sparkles, Scissors, Eye, ShoppingBag } from 'lucide-react';
import FashionImage from './FashionImage';

interface AsymmetricalGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export default function AsymmetricalGrid({
  products,
  onSelectProduct,
  onAddToCart,
}: AsymmetricalGridProps) {
  // Select 2 statement pieces: e.g. Tuxedo (Item 1, col-7) and Streetwear Overshirt / Bandhgala (Item 2, col-5)
  const itemPrimary = products.find((p) => p.id === 'ts-01') || products[0];
  const itemSecondary = products.find((p) => p.id === 'ts-04') || products[3];

  return (
    <section id="curation" className="py-28 px-6 md:px-12 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle */}
        <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a059] mb-2 font-medium">
              <span>Curated Editorial</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Asymmetric Architecture</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white uppercase">
              The Spencer Silhouette
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono">
              CURATION VOL. 32
            </span>
            <p className="text-xs text-zinc-400 mt-1">Anna Salai Flagship, Chennai</p>
          </div>
        </div>

        {/* 12-Column Asymmetrical Grid */}
        <div className="grid grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Primary Statement Garment (Col 7 - Larger) */}
          <div className="col-span-12 lg:col-span-7 group">
            <div
              onClick={() => onSelectProduct(itemPrimary)}
              className="relative overflow-hidden rounded-xl bg-zinc-950 aspect-[4/5] border border-white/10 cursor-pointer"
            >
              <FashionImage
                src={itemPrimary.image}
                alt={itemPrimary.name}
                productType="suit"
                category={itemPrimary.categoryLabel}
                className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              
              {/* Corner Tag */}
              <div className="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[11px] uppercase tracking-[0.2em] text-[#c5a059] border border-[#c5a059]/30">
                Atelier Masterpiece
              </div>

              {/* Bottom Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

              {/* Bottom Information Overlay */}
              <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#c5a059] block mb-1">
                    {itemPrimary.categoryLabel}
                  </span>
                  <h3 className="font-display text-2xl md:text-4xl font-bold text-white group-hover:text-[#c5a059] transition-colors">
                    {itemPrimary.name}
                  </h3>
                  <p className="text-xs text-zinc-300 mt-2 max-w-md line-clamp-2">
                    {itemPrimary.description}
                  </p>
                  <p className="text-sm font-mono text-white mt-2">
                    ₹{itemPrimary.price.toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(itemPrimary, itemPrimary.availableSizes[0]);
                    }}
                    className="px-4 py-2.5 bg-white text-black hover:bg-[#c5a059] text-xs uppercase tracking-wider font-semibold rounded transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </button>
                  <div className="w-10 h-10 rounded bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#c5a059] group-hover:text-black group-hover:border-[#c5a059] transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Caption Below Primary Card */}
            <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 font-light">
              <span>Fabric: {itemPrimary.fabric}</span>
              <span className="text-[#c5a059]">{itemPrimary.spencerPlazaStock}</span>
            </div>
          </div>

          {/* Secondary Statement Garment (Col 5 - Offset Lower) */}
          <div className="col-span-12 lg:col-span-5 lg:mt-24 group">
            <div
              onClick={() => onSelectProduct(itemSecondary)}
              className="relative overflow-hidden rounded-xl bg-zinc-950 aspect-[4/5] border border-white/10 cursor-pointer"
            >
              <FashionImage
                src={itemSecondary.image}
                alt={itemSecondary.name}
                productType="streetwear"
                category={itemSecondary.categoryLabel}
                className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />

              {/* Corner Tag */}
              <div className="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[11px] uppercase tracking-[0.2em] text-white border border-white/20">
                Luxe Streetwear
              </div>

              {/* Bottom Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

              {/* Bottom Information */}
              <div className="absolute bottom-8 left-8 right-8 z-10">
                <span className="text-xs uppercase tracking-[0.2em] text-[#c5a059] block mb-1">
                  Metropolitan Silhouette
                </span>
                <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#c5a059] transition-colors">
                  {itemSecondary.name}
                </h3>
                <p className="text-sm font-mono text-zinc-200 mt-2">
                  ₹{itemSecondary.price.toLocaleString('en-IN')}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(itemSecondary, itemSecondary.availableSizes[0]);
                    }}
                    className="flex-1 py-2.5 bg-white text-black hover:bg-[#c5a059] text-xs uppercase tracking-wider font-semibold rounded transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(itemSecondary);
                    }}
                    className="px-3.5 py-2.5 bg-black/60 border border-white/20 rounded hover:border-[#c5a059] text-zinc-300 hover:text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Editorial Quote Card below */}
            <div className="mt-8 p-6 rounded-xl bg-zinc-950/70 border border-white/10">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium block mb-2">
                Atelier Notes
              </span>
              <p className="text-xs md:text-sm text-zinc-300 italic leading-relaxed">
                "Our designs respect Chennai's tropical humidity while upholding international bespoke standards. We select high-twist open weaves that drape like liquid."
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <span>TS Master Cutter</span>
                <span>Spencer Plaza Phase 2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
