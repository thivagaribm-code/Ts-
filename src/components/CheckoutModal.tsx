import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import {
  X,
  CreditCard,
  QrCode,
  Building,
  Store,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Phone,
  Mail,
  User,
  Truck
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount: number;
  discountCode: string;
  onOrderSuccess: (order: Order) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  discountAmount,
  discountCode,
  onOrderSuccess,
}: CheckoutModalProps) {
  if (!isOpen) return null;

  const [deliveryMethod, setDeliveryMethod] = useState<'pan_india_courier' | 'spencer_plaza_pickup'>('pan_india_courier');
  const [paymentMethod, setPaymentMethod] = useState<'razorpay_upi' | 'razorpay_card' | 'netbanking' | 'store_payment'>('razorpay_upi');
  
  // Customer details
  const [fullName, setFullName] = useState('Siva Kumar');
  const [email, setEmail] = useState('isrosiva00005@gmail.com');
  const [phone, setPhone] = useState('+91 98401 23456');
  const [address, setAddress] = useState('Flat 4B, Harrington Road, Chetpet');
  const [city, setCity] = useState('Chennai');
  const [pincode, setPincode] = useState('600031');

  // Payment simulated state
  const [upiId, setUpiId] = useState('sivakumar@okhdfcbank');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('742');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = deliveryMethod === 'spencer_plaza_pickup' || subtotal > 4999 ? 0 : 499;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderNumber = `TS-SP-${Math.floor(100000 + Math.random() * 900000)}`;
      const paymentId = `pay_rzp_${Math.random().toString(36).substring(2, 11)}`;

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        customerName: fullName,
        email,
        phone,
        shippingAddress: deliveryMethod === 'spencer_plaza_pickup' ? 'Store Pickup: Phase 2, Second Floor, Spencer Plaza, Chennai' : address,
        city,
        pincode,
        deliveryMethod,
        paymentMethod,
        items: [...items],
        subtotal,
        discount: discountAmount,
        shippingFee,
        total: grandTotal,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: deliveryMethod === 'spencer_plaza_pickup' ? 'Ready for Pickup / Dispatch' : 'Order Placed',
        paymentId,
      };

      setIsProcessing(false);
      setCompletedOrder(newOrder);
      onOrderSuccess(newOrder);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-fadeIn">
      <div className="fixed inset-0" onClick={isProcessing ? undefined : onClose} />

      <div className="relative bg-[#111111] border border-white/15 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 my-8">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-lg text-white">TS MENSWEAR</span>
            <span className="text-zinc-600">|</span>
            <span className="text-xs uppercase tracking-widest text-[#c5a059] font-mono">
              Razorpay Secure Checkout
            </span>
          </div>
          {!completedOrder && (
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {completedOrder ? (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
                Order Confirmed
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mt-1">
                Thank You, {completedOrder.customerName}
              </h3>
              <p className="text-xs text-zinc-400 mt-2">
                Order reference: <strong className="text-white font-mono">{completedOrder.orderNumber}</strong> · Razorpay ID: <span className="font-mono">{completedOrder.paymentId}</span>
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-zinc-950 p-6 rounded-xl border border-white/10 text-left max-w-lg mx-auto space-y-3 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">Fulfillment Mode</span>
                <span className="text-white font-medium">
                  {completedOrder.deliveryMethod === 'spencer_plaza_pickup'
                    ? 'Flagship Boutique Pickup (Spencer Plaza Phase 2)'
                    : 'Pan-India Express Doorstep Delivery'}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">Delivery Address / Destination</span>
                <span className="text-zinc-200 text-right truncate max-w-[220px]">
                  {completedOrder.shippingAddress}, {completedOrder.city}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">Total Paid (INR)</span>
                <span className="text-[#c5a059] font-mono font-bold text-sm">
                  ₹{completedOrder.total.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-[11px] text-zinc-400 pt-2 italic">
                A confirmation SMS & WhatsApp invoice has been routed to {completedOrder.phone}. Our master tailoring team at Spencer Plaza is now packaging your garments.
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-white text-black hover:bg-[#c5a059] font-semibold text-xs uppercase tracking-wider rounded-md transition-colors"
              >
                Back to Boutique
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleProcessPayment} className="p-6 md:p-8 space-y-6">
            {/* Delivery Option Toggle */}
            <div>
              <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium block mb-2">
                1. Select Fulfillment Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pan_india_courier')}
                  className={`p-3.5 rounded-lg border text-left transition-all flex items-start gap-3 ${
                    deliveryMethod === 'pan_india_courier'
                      ? 'border-[#c5a059] bg-[#c5a059]/10 text-white'
                      : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <Truck className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-white">Pan-India Express Courier</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">24-48 hrs delivery in Chennai, 3-4 days all-India</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('spencer_plaza_pickup')}
                  className={`p-3.5 rounded-lg border text-left transition-all flex items-start gap-3 ${
                    deliveryMethod === 'spencer_plaza_pickup'
                      ? 'border-[#c5a059] bg-[#c5a059]/10 text-white'
                      : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <Store className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-white">Pick Up at Spencer Plaza</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">Phase 2, Second Floor · Try on in VIP fitting room</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Customer Information */}
            <div>
              <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium block mb-2">
                2. Customer & Contact Information
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Mobile (+91 Phone)"
                    className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              {deliveryMethod === 'pan_india_courier' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street Address, Area"
                      className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="PIN Code"
                      className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method Selector (Razorpay Gateway Architecture) */}
            <div>
              <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium block mb-2">
                3. Payment Gateway (Razorpay Verified)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('razorpay_upi')}
                  className={`p-2.5 rounded border text-center text-xs font-medium transition-colors ${
                    paymentMethod === 'razorpay_upi'
                      ? 'border-[#c5a059] bg-[#c5a059]/15 text-white'
                      : 'border-white/10 bg-zinc-900 text-zinc-400'
                  }`}
                >
                  UPI (GPay / PhonePe)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('razorpay_card')}
                  className={`p-2.5 rounded border text-center text-xs font-medium transition-colors ${
                    paymentMethod === 'razorpay_card'
                      ? 'border-[#c5a059] bg-[#c5a059]/15 text-white'
                      : 'border-white/10 bg-zinc-900 text-zinc-400'
                  }`}
                >
                  Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-2.5 rounded border text-center text-xs font-medium transition-colors ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#c5a059] bg-[#c5a059]/15 text-white'
                      : 'border-white/10 bg-zinc-900 text-zinc-400'
                  }`}
                >
                  Net Banking
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('store_payment')}
                  className={`p-2.5 rounded border text-center text-xs font-medium transition-colors ${
                    paymentMethod === 'store_payment'
                      ? 'border-[#c5a059] bg-[#c5a059]/15 text-white'
                      : 'border-white/10 bg-zinc-900 text-zinc-400'
                  }`}
                >
                  Pay at Spencer Plaza
                </button>
              </div>

              {/* Sub-fields depending on payment choice */}
              {paymentMethod === 'razorpay_upi' && (
                <div className="p-4 bg-zinc-950 border border-white/10 rounded-lg space-y-3">
                  <div className="flex gap-2">
                    {(['gpay', 'phonepe', 'paytm'] as const).map((app) => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => setSelectedUpiApp(app)}
                        className={`px-3 py-1.5 text-xs rounded border uppercase font-medium ${
                          selectedUpiApp === app
                            ? 'border-[#c5a059] bg-[#c5a059]/20 text-white'
                            : 'border-white/10 text-zinc-400'
                        }`}
                      >
                        {app === 'gpay' ? 'Google Pay' : app === 'phonepe' ? 'PhonePe' : 'Paytm UPI'}
                      </button>
                    ))}
                  </div>
                  <div>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="Enter UPI ID (e.g. mobile@upi)"
                      className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'razorpay_card' && (
                <div className="p-4 bg-zinc-950 border border-white/10 rounded-lg space-y-3">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number"
                    className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="CVV"
                      className="bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="p-4 bg-zinc-950 border border-white/10 rounded-lg text-xs text-zinc-300">
                  <p className="mb-2 text-zinc-400">Popular Indian Banking Portals:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map((bank) => (
                      <div key={bank} className="p-2 bg-zinc-900 border border-white/5 rounded text-white flex items-center justify-between">
                        <span>{bank}</span>
                        <span className="text-[10px] text-emerald-400">Instant</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {paymentMethod === 'store_payment' && (
                <div className="p-4 bg-zinc-950 border border-white/10 rounded-lg text-xs text-zinc-300">
                  <p className="font-semibold text-white mb-1">Pay when you visit Spencer Plaza</p>
                  <p className="text-zinc-400">
                    We will reserve your selected sizes in our VIP fitting lounge on Phase 2, Second Floor. You can try them on and complete payment via Cash, Card, or UPI at our boutique counter.
                  </p>
                </div>
              )}
            </div>

            {/* Total and Submit */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 block">Total Payable</span>
                <span className="text-xl font-bold font-mono text-[#c5a059] tabular-nums">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-8 py-3.5 bg-white text-black hover:bg-[#c5a059] font-bold text-xs uppercase tracking-widest rounded-md transition-colors flex items-center gap-2 shadow-xl"
              >
                {isProcessing ? (
                  <span>Contacting Gateway...</span>
                ) : (
                  <>
                    <span>Pay ₹{grandTotal.toLocaleString('en-IN')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
