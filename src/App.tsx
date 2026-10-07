import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroMotion from './components/HeroMotion';
import StyleEnsembleStudio from './components/StyleEnsembleStudio';
import AsymmetricalGrid from './components/AsymmetricalGrid';
import ProductCatalog from './components/ProductCatalog';
import SpencerPlazaSection from './components/SpencerPlazaSection';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import BespokeAppointmentModal from './components/BespokeAppointmentModal';
import StoreManagerModal from './components/StoreManagerModal';
import VirtualFittingRoomModal from './components/VirtualFittingRoomModal';
import CustomCursor from './components/CustomCursor';
import { INITIAL_PRODUCTS } from './data/products';
import { Product, CartItem, Order, BespokeAppointment } from './types';

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0],
      selectedSize: '40R',
      selectedColor: 'Charcoal Obsidian',
      quantity: 1,
    },
  ]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isStoreManagerOpen, setIsStoreManagerOpen] = useState(false);
  const [isFittingRoomOpen, setIsFittingRoomOpen] = useState(false);
  const [fittingRoomProduct, setFittingRoomProduct] = useState<Product | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState('');

  // Initial orders & appointments to showcase the database simulator
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord-101',
      orderNumber: 'TS-SP-842194',
      customerName: 'Karthik Ramanathan',
      email: 'karthik.r@example.com',
      phone: '+91 98400 11223',
      shippingAddress: 'Phase 2, Second Floor, Spencer Plaza, Chennai',
      city: 'Chennai',
      pincode: '600002',
      deliveryMethod: 'spencer_plaza_pickup',
      paymentMethod: 'razorpay_upi',
      items: [
        {
          product: INITIAL_PRODUCTS[1],
          selectedSize: '42R',
          selectedColor: 'Deep Midnight Navy',
          quantity: 1,
        },
      ],
      subtotal: 18499,
      discount: 1849,
      shippingFee: 0,
      total: 16650,
      date: '06 Oct 2026, 11:30 AM',
      status: 'Ready for Pickup / Dispatch',
      paymentId: 'pay_rzp_99xka091',
    },
  ]);

  const [appointments, setAppointments] = useState<BespokeAppointment[]>([
    {
      id: 'apt-01',
      customerName: 'Dr. Arvind Swaminathan',
      phone: '+91 98410 77665',
      email: 'arvind.s@example.com',
      service: 'Bespoke Suit & Tuxedo Fitting',
      date: '2026-10-09',
      timeSlot: '04:30 PM',
      notes: 'Bespoke three-piece tuxedo for reception at Taj Coromandel.',
      status: 'Confirmed',
      createdAt: '10:15 AM',
    },
  ]);

  // Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add to cart
  const handleAddToCart = (product: Product, size: string, color?: string) => {
    const chosenColor = color || product.color;
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [...prev, { product, selectedSize: size, selectedColor: chosenColor, quantity: 1 }];
    });
    showToast(`Added ${product.name} (${size}) to your bag.`);
  };

  // Instant buy: adds to cart and immediately opens checkout
  const handleInstantBuy = (product: Product, size: string, color?: string) => {
    handleAddToCart(product, size, color);
    if (selectedProduct) setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Update quantity
  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prev) => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  // Remove item
  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Proceed from cart drawer to checkout
  const handleProceedToCheckout = (discount: number, code: string) => {
    setAppliedDiscount(discount);
    setDiscountCode(code);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Order success handler
  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    // Decrement stock in catalog
    newOrder.items.forEach((item) => {
      setProducts((currentProducts) =>
        currentProducts.map((p) => {
          if (p.id === item.product.id) {
            return {
              ...p,
              spencerPlazaStock: 'Stock reserved for recent order',
            };
          }
          return p;
        })
      );
    });
    // Clear cart
    setCart([]);
    showToast(`Order ${newOrder.orderNumber} successfully confirmed!`);
  };

  // Booking success handler
  const handleBookingSuccess = (newAppointment: BespokeAppointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
    showToast(`VIP Fitting Room booked for ${newAppointment.customerName}!`);
  };

  // Stock update from Store Manager
  const handleUpdateProductStock = (productId: string, inStock: boolean, stockNote: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, inStock, spencerPlazaStock: stockNote } : p
      )
    );
    showToast('Inventory updated in database.');
  };

  // Add new product from Store Manager
  const handleAddNewProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`New garment "${newProduct.name}" added to catalog.`);
  };

  // Navigation smoothly to element
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenFittingRoom = (product?: Product) => {
    setFittingRoomProduct(product || products[0]);
    setIsFittingRoomOpen(true);
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#080808] text-[#f4f4f5] flex flex-col relative selection:bg-[#c5a059] selection:text-black">
      {/* Luxury Custom Follower Cursor */}
      <CustomCursor />

      {/* Floating Action / Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-[#c5a059] text-black px-4 py-2.5 rounded-lg font-medium text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
        onOpenStoreManager={() => setIsStoreManagerOpen(true)}
        onOpenFittingRoom={() => handleOpenFittingRoom()}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* 1. Cinematic Video Scrubbed Hero */}
        <HeroMotion
          onExploreClick={() => handleNavigateSection('ensembles')}
          onBookFittingClick={() => setIsAppointmentOpen(true)}
        />

        {/* 2. Curated Style Editions & Motion Studio */}
        <StyleEnsembleStudio
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p, s) => handleAddToCart(p, s)}
          onBookFitting={() => setIsAppointmentOpen(true)}
        />

        {/* 3. Asymmetrical Editorial Layout */}
        <AsymmetricalGrid
          products={products}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p, s) => handleAddToCart(p, s)}
        />

        {/* 4. Complete Menswear Catalog */}
        <ProductCatalog
          products={products}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p, s) => handleAddToCart(p, s)}
        />

        {/* 5. Spencer Plaza Flagship Heritage & Concierge */}
        <SpencerPlazaSection onBookFitting={() => setIsAppointmentOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenStoreManager={() => setIsStoreManagerOpen(true)}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
      />

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, s, c) => handleAddToCart(p, s, c)}
        onInstantBuy={(p, s, c) => handleInstantBuy(p, s, c)}
        onBookFitting={() => setIsAppointmentOpen(true)}
        onOpenFittingRoom={(p) => handleOpenFittingRoom(p)}
      />

      <VirtualFittingRoomModal
        isOpen={isFittingRoomOpen}
        onClose={() => setIsFittingRoomOpen(false)}
        products={products}
        initialProduct={fittingRoomProduct}
        onAddToCart={(p, s) => handleAddToCart(p, s)}
        onBookFitting={() => {
          setIsFittingRoomOpen(false);
          setIsAppointmentOpen(true);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        discountAmount={appliedDiscount}
        discountCode={discountCode}
        onOrderSuccess={handleOrderSuccess}
      />

      <BespokeAppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        onBookingSuccess={handleBookingSuccess}
      />

      <StoreManagerModal
        isOpen={isStoreManagerOpen}
        onClose={() => setIsStoreManagerOpen(false)}
        products={products}
        orders={orders}
        appointments={appointments}
        onUpdateProductStock={handleUpdateProductStock}
        onAddNewProduct={handleAddNewProduct}
      />
    </div>
  );
}
