import React, { useState } from 'react';
import { Product } from '../types';
import { X, Check, ShoppingBag, MapPin, Scissors, ShieldCheck, Truck, RefreshCw, Ruler, Camera } from 'lucide-react';
import SizeGuideModal from './SizeGuideModal';
import FashionImage from './FashionImage';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onInstantBuy: (product: Product, size: string, color: string) => void;
  onBookFitting: () => void;
  onOpenFittingRoom?: (product: Product) => void;
}

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  onInstantBuy,
  onBookFitting,
  onOpenFittingRoom,
}: ProductModalProps) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(
    product.availableSizes[0] || 'Standard'
  );
  const [selectedColor, setSelectedColor] = useState<string>(product.color);
  const [isAdded, setIsAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const getInitialCategory = (): 'suits' | 'shirts' | 'trousers' => {
    const nameLower = product.name.toLowerCase();
    if (product.category === 'linen' || nameLower.includes('shirt') || nameLower.includes('kurta') || nameLower.includes('bandhgala')) {
      return 'shirts';
    }
    if (nameLower.includes('trouser') || nameLower.includes('pant') || nameLower.includes('gurkha')) {
      return 'trousers';
    }
    return 'suits';
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    onInstantBuy(product, selectedSize, selectedColor);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-fadeIn">
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-[#111111] border border-white/15 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-zinc-300 hover:text-white border border-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Visual Presentation with Resilient Fallback */}
          <div className="relative aspect-[3/4] md:aspect-auto md:h-full min-h-[380px] bg-zinc-950 overflow-hidden">
            <FashionImage
              src={product.image}
              alt={product.name}
              category={product.categoryLabel}
              productType={
                product.category === 'heritage' ? 'bandhgala' :
                product.category === 'suits' ? (product.id === 'ts-02' ? 'blazer' : 'suit') :
                product.category === 'linen' ? 'linen' :
                product.category === 'streetwear' ? 'streetwear' :
                product.category === 'accessories' ? (product.id === 'ts-07' ? 'shoes' : 'accessories') : 'suit'
              }
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* In-Store Location Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-3 rounded-lg bg-black/85 backdrop-blur-md border border-white/15 text-xs">
              <div className="flex items-center gap-1.5 text-[#c5a059] font-medium mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Spencer Plaza Physical Flagship</span>
              </div>
              <p className="text-zinc-300 text-[11px]">{product.spencerPlazaStock}</p>
            </div>
          </div>

          {/* Right: Purchase Module & Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Badge */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5a059] mb-2 font-medium">
                <span>{product.categoryLabel}</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span>Chennai Atelier</span>
              </div>

              {/* Title */}
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-bold font-mono text-white tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-zinc-500 font-mono tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-[11px] text-[#c5a059] font-mono">
                  Inclusive of all taxes & free Chennai dispatch
                </span>
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Specifications Block */}
              <div className="space-y-2 mb-6 p-3 rounded-lg bg-zinc-900/60 border border-white/5 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Fabric</span>
                  <span className="text-white font-medium text-right">{product.fabric}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Silhouette</span>
                  <span className="text-white font-medium">{product.fit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Craftsmanship</span>
                  <span className="text-white font-medium">Handcrafted in Spencer Plaza</span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="text-zinc-300 font-medium uppercase tracking-wider">
                    Select Size
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1.5 text-xs text-[#c5a059] hover:text-[#e0c27e] font-medium transition-colors group cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                    <span>Size Guide & Tailoring Metrics</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-2 text-xs font-medium rounded transition-colors ${
                          isSelected
                            ? 'bg-[#c5a059] text-black font-semibold'
                            : 'bg-zinc-900 text-zinc-300 hover:text-white border border-white/10'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Highlights Checklist */}
              <div className="space-y-1.5 mb-8">
                {product.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs text-zinc-400">
                    <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Purchase CTAs */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  className={`py-3 px-4 rounded-md font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                    isAdded
                      ? 'bg-emerald-500 text-black'
                      : 'bg-white text-black hover:bg-[#c5a059]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3 px-4 bg-[#c5a059] text-black hover:bg-[#dfbf7a] rounded-md font-semibold text-xs uppercase tracking-wider transition-colors"
                >
                  Instant Checkout
                </button>
              </div>

              {/* Virtual Fitting Room AR Camera shortcut */}
              <button
                onClick={() => {
                  onClose();
                  if (onOpenFittingRoom) onOpenFittingRoom(product);
                }}
                className="w-full py-2.5 bg-zinc-900/80 hover:bg-zinc-800 text-[#c5a059] hover:text-white border border-[#c5a059]/40 hover:border-[#c5a059] rounded-md text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Try On in Virtual Mirror (Camera AR)</span>
              </button>

              {/* In-Store Bespoke Fitting consultation shortcut */}
              <button
                onClick={() => {
                  onClose();
                  onBookFitting();
                }}
                className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 rounded-md text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Scissors className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Reserve VIP Trial Room at Spencer Plaza</span>
              </button>

              <div className="flex items-center justify-around text-[10px] text-zinc-500 pt-2 font-mono">
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3" /> Same-day Chennai Dispatch
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" /> 7-Day Exchange
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> 100% Authentic TS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bespoke Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        initialCategory={getInitialCategory()}
        currentSelectedSize={selectedSize}
        onSelectSize={(newSize) => {
          // If the product has a matching size format, select it
          const matching = product.availableSizes.find(
            (s) => s.toLowerCase().startsWith(newSize.toLowerCase()) || newSize.toLowerCase().startsWith(s.toLowerCase())
          );
          if (matching) {
            setSelectedSize(matching);
          } else {
            setSelectedSize(newSize);
          }
        }}
      />
    </div>
  );
}
