import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck, ShoppingBag, MapPin } from 'lucide-react';
import FashionImage from './FashionImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: (appliedDiscount: number, discountCode: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal > 4999 || items.length === 0 ? 0 : 499;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'SPENCER1994') {
      setDiscountPercent(10);
      setPromoMessage({ text: '10% Spencer Heritage Privilege applied!' });
    } else if (code === 'CHENNAI' || code === 'TSMENS') {
      setDiscountPercent(15);
      setPromoMessage({ text: '15% VIP Opening discount applied!' });
    } else {
      setPromoMessage({ text: 'Invalid code. Try "SPENCER1994"', error: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#101010] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#c5a059]" />
              <h2 className="font-display text-lg font-bold text-white uppercase tracking-tight">
                Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Spencer Plaza Notice */}
          <div className="bg-zinc-950 px-6 py-2.5 border-b border-white/5 flex items-center gap-2 text-xs text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
            <span>Store pickup available at Phase 2, Spencer Plaza</span>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center text-zinc-500">
                <ShoppingBag className="w-12 h-12 mx-auto stroke-1 mb-3 text-zinc-600" />
                <p className="text-sm font-medium text-zinc-400">Your bag is currently empty.</p>
                <p className="text-xs text-zinc-600 mt-1">Explore our latest 2026 menswear drops.</p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded hover:bg-[#c5a059] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${index}`}
                  className="flex gap-4 p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 group"
                >
                  {/* Thumbnail with Resilient Fallback */}
                  <div className="w-20 h-24 rounded-lg bg-zinc-950 overflow-hidden shrink-0 border border-white/10">
                    <FashionImage
                      src={item.product.image}
                      alt={item.product.name}
                      productType={item.product.id === 'ts-01' ? 'suit' : item.product.id === 'ts-02' ? 'blazer' : item.product.id === 'ts-03' ? 'bandhgala' : 'streetwear'}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-white leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
                        <span>Size: <strong className="text-white">{item.selectedSize}</strong></span>
                        <span>·</span>
                        <span className="truncate max-w-[100px]">{item.selectedColor}</span>
                      </div>
                    </div>

                    {/* Quantity & Item Subtotal */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-white/10 rounded bg-zinc-950">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="p-1 text-zinc-400 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-medium text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="p-1 text-zinc-400 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs font-mono font-semibold text-[#c5a059] tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-zinc-950 space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon (e.g. SPENCER1994)"
                    className="w-full bg-zinc-900 border border-white/10 rounded pl-8 pr-2 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium uppercase tracking-wider rounded text-white transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p className={`text-[11px] ${promoMessage.error ? 'text-red-400' : 'text-emerald-400'}`}>
                  {promoMessage.text}
                </p>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-zinc-400 border-t border-white/5 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-zinc-200 tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Privilege Discount ({discountPercent}%)</span>
                    <span className="font-mono tabular-nums">
                      -₹{discountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Express Dispatch</span>
                  <span className="font-mono text-zinc-200 tabular-nums">
                    {shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `₹${shippingFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-white/10">
                  <span>Grand Total</span>
                  <span className="font-mono text-base text-[#c5a059] tabular-nums">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => onProceedToCheckout(discountAmount, promoCode)}
                className="w-full py-3.5 bg-white text-black hover:bg-[#c5a059] font-bold text-xs uppercase tracking-widest rounded-md transition-colors flex items-center justify-center gap-2 shadow-xl"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Encrypted 256-bit Indian Gateway Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
