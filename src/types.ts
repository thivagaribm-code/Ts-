export type CategoryId = 'all' | 'suits' | 'linen' | 'streetwear' | 'heritage' | 'accessories';

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  description: string;
  fabric: string;
  fit: string;
  color: string;
  availableSizes: string[];
  inStock: boolean;
  spencerPlazaStock: string; // e.g. "Phase 2, Rack 04 (4 units available)"
  featured?: boolean;
  isNewArrival?: boolean;
  videoUrl?: string;
  videoTimestamp?: string;
  image: string;
  accentColor: string;
  details: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface BespokeAppointment {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  timeSlot: string;
  notes: string;
  status: 'Confirmed' | 'Pending';
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  pincode: string;
  deliveryMethod: 'pan_india_courier' | 'spencer_plaza_pickup';
  paymentMethod: 'razorpay_upi' | 'razorpay_card' | 'netbanking' | 'store_payment';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  date: string;
  status: 'Order Placed' | 'Bespoke Tailoring' | 'Ready for Pickup / Dispatch';
  paymentId: string;
}
