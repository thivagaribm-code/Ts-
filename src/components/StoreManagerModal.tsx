import React, { useState } from 'react';
import { Product, Order, BespokeAppointment } from '../types';
import {
  X,
  Database,
  Layers,
  ShoppingBag,
  Scissors,
  Plus,
  RefreshCw,
  TrendingUp,
  MapPin,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface StoreManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  orders: Order[];
  appointments: BespokeAppointment[];
  onUpdateProductStock: (productId: string, inStock: boolean, spencerPlazaStock: string) => void;
  onAddNewProduct: (newProduct: Product) => void;
}

export default function StoreManagerModal({
  isOpen,
  onClose,
  products,
  orders,
  appointments,
  onUpdateProductStock,
  onAddNewProduct,
}: StoreManagerModalProps) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'appointments' | 'schema' | 'add_product'>('inventory');

  // Add Product form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'suits' | 'linen' | 'streetwear' | 'heritage' | 'accessories'>('suits');
  const [newProdPrice, setNewProdPrice] = useState(15999);
  const [newProdFabric, setNewProdFabric] = useState('Super 130s Merino Wool');
  const [newProdFit, setNewProdFit] = useState('Tailored Fit');
  const [newProdColor, setNewProdColor] = useState('Jet Black');
  const [newProdStockText, setNewProdStockText] = useState('Phase 2 Rack 05 · 4 units ready');

  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName) return;

    const newProd: Product = {
      id: `ts-${Date.now().toString().slice(-4)}`,
      name: newProdName,
      category: newProdCategory,
      categoryLabel:
        newProdCategory === 'suits'
          ? 'Bespoke Tailoring'
          : newProdCategory === 'linen'
          ? 'Linen Collection'
          : newProdCategory === 'heritage'
          ? 'Spencer Heritage'
          : newProdCategory === 'streetwear'
          ? 'Luxury Streetwear'
          : 'Accessories',
      price: Number(newProdPrice),
      description: `Bespoke crafted menswear piece made from ${newProdFabric}. Available at Spencer Plaza flagship.`,
      fabric: newProdFabric,
      fit: newProdFit,
      color: newProdColor,
      availableSizes: ['38R', '40R', '42R', '44R'],
      inStock: true,
      spencerPlazaStock: newProdStockText,
      image: 'https://images.unsplash.com/photo-1594932224010-70f90770633b?auto=format&fit=crop&w=1200&q=80',
      accentColor: '#1A1A1A',
      details: ['Hand-stitched construction', 'Complimentary fitting in Spencer Plaza'],
    };

    onAddNewProduct(newProd);
    setActiveTab('inventory');
    setNewProdName('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-[#0e0e0e] border border-white/15 rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl z-10 my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#c5a059]/10 border border-[#c5a059]/20 text-[#c5a059]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Spencer Plaza Atelier & Inventory Console
              </h3>
              <p className="text-xs text-zinc-400">
                PostgreSQL Database Simulator · Razorpay Order Stream · Flagship POS Sync
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-zinc-950/60 border-b border-white/5">
          <div className="p-3.5 bg-zinc-900/80 rounded-xl border border-white/5">
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">Live Catalog</span>
            <span className="text-xl font-bold font-mono text-white tabular-nums">{products.length} Items</span>
          </div>

          <div className="p-3.5 bg-zinc-900/80 rounded-xl border border-white/5">
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">Orders Processed</span>
            <span className="text-xl font-bold font-mono text-white tabular-nums">{orders.length} Orders</span>
          </div>

          <div className="p-3.5 bg-zinc-900/80 rounded-xl border border-white/5">
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">Gross Sales (INR)</span>
            <span className="text-xl font-bold font-mono text-[#c5a059] tabular-nums">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="p-3.5 bg-zinc-900/80 rounded-xl border border-white/5">
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">Tailor Bookings</span>
            <span className="text-xl font-bold font-mono text-white tabular-nums">{appointments.length} VIP Slots</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/10 bg-zinc-950 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 px-3 text-xs font-medium uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'inventory'
                ? 'border-[#c5a059] text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Products & Store Stock ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-3 text-xs font-medium uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-[#c5a059] text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Order Registry ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`pb-3 px-3 text-xs font-medium uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'appointments'
                ? 'border-[#c5a059] text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Bespoke Fittings ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`pb-3 px-3 text-xs font-medium uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'schema'
                ? 'border-[#c5a059] text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            SQL Schema & Architecture
          </button>
          <button
            onClick={() => setActiveTab('add_product')}
            className={`pb-3 px-3 text-xs font-medium uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'add_product'
                ? 'border-[#c5a059] text-white'
                : 'border-transparent text-[#c5a059] hover:text-[#e0c27e]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Garment</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-zinc-400 mb-2">
                <span>Manage physical inventory in Spencer Plaza Phase 2 and digital availability:</span>
                <span className="font-mono text-[11px] text-[#c5a059]">Auto-sync with store POS</span>
              </div>

              <div className="border border-white/10 rounded-xl overflow-hidden bg-zinc-950">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-900/90 text-zinc-400 uppercase tracking-wider font-mono text-[11px] border-b border-white/10">
                    <tr>
                      <th className="p-3">Garment / SKU</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price (INR)</th>
                      <th className="p-3">Spencer Plaza Rack Location</th>
                      <th className="p-3">Store Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-normal">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-zinc-900/40 transition-colors">
                        <td className="p-3">
                          <div className="font-medium text-white">{prod.name}</div>
                          <div className="text-[11px] text-zinc-500 font-mono">{prod.id} · {prod.fabric}</div>
                        </td>
                        <td className="p-3 text-zinc-300">{prod.categoryLabel}</td>
                        <td className="p-3 font-mono font-semibold text-white">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3 text-zinc-300 font-mono text-[11px]">
                          {prod.spencerPlazaStock}
                        </td>
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono ${
                              prod.inStock
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}
                          >
                            {prod.inStock ? 'In Stock' : 'Sold Out'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() =>
                              onUpdateProductStock(
                                prod.id,
                                !prod.inStock,
                                prod.inStock ? 'Sold out in store' : 'Phase 2 Rack · 5 units restocked'
                              )
                            }
                            className="px-2.5 py-1 text-[11px] font-mono rounded bg-zinc-900 border border-white/10 hover:border-[#c5a059] text-zinc-300 hover:text-white"
                          >
                            {prod.inStock ? 'Set Sold Out' : 'Restock 5 units'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="py-16 text-center text-zinc-500 bg-zinc-950 rounded-xl border border-white/5">
                  <ShoppingBag className="w-10 h-10 mx-auto stroke-1 mb-2 text-zinc-600" />
                  <p className="text-sm font-medium text-zinc-400">No orders recorded yet.</p>
                  <p className="text-xs text-zinc-600 mt-1">
                    Try adding items to your bag and completing the Razorpay checkout simulator!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 rounded-xl bg-zinc-950 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-white">
                            {order.orderNumber}
                          </span>
                          <span className="text-[10px] font-mono bg-zinc-900 px-2 py-0.5 rounded text-zinc-400 border border-white/10">
                            {order.paymentId}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {order.status}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-300 mt-1">
                          Customer: <strong className="text-white">{order.customerName}</strong> ({order.phone}) · {order.items.length} item(s)
                        </div>
                        <div className="text-[11px] text-zinc-500 mt-0.5 font-mono">
                          {order.date} · {order.deliveryMethod === 'spencer_plaza_pickup' ? 'Spencer Plaza Store Pickup' : 'Courier Dispatch'}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono text-base font-bold text-[#c5a059]">
                          ₹{order.total.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] text-zinc-400 capitalize">
                          {order.paymentMethod.replace('_', ' ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <div className="py-16 text-center text-zinc-500 bg-zinc-950 rounded-xl border border-white/5">
                  <Scissors className="w-10 h-10 mx-auto stroke-1 mb-2 text-zinc-600" />
                  <p className="text-sm font-medium text-zinc-400">No tailor appointments booked yet.</p>
                  <p className="text-xs text-zinc-600 mt-1">
                    Click "Book Tailor" in the navigation bar to test scheduling a fitting room session!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-4 rounded-xl bg-zinc-950 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{apt.customerName}</span>
                          <span className="text-[10px] font-mono bg-[#c5a059]/10 text-[#c5a059] px-2 py-0.5 rounded border border-[#c5a059]/20">
                            {apt.service}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-400 mt-1">
                          Phone: {apt.phone} · Notes: "{apt.notes}"
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm text-white font-semibold">
                          {apt.date} · {apt.timeSlot}
                        </div>
                        <div className="text-[11px] text-emerald-400 flex items-center justify-end gap-1 mt-0.5">
                          <CheckCircle className="w-3 h-3" />
                          <span>Phase 2 VIP Lounge Reserved</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="p-4 bg-zinc-950 rounded-xl border border-white/10 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto">
                <span className="text-[#c5a059] font-bold block mb-2">-- TS Menswear Spencer Plaza PostgreSQL Schema</span>
                <pre>{`-- Categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL
);

-- Products
CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    fabric VARCHAR(255),
    fit VARCHAR(100),
    spencer_plaza_stock TEXT,
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Variants
CREATE TABLE product_variants (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(50) REFERENCES products(id),
    size VARCHAR(20) NOT NULL,
    color VARCHAR(50) NOT NULL,
    stock_quantity INTEGER DEFAULT 5
);

-- Orders (Razorpay Integrated)
CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,
    order_number VARCHAR(100) UNIQUE,
    customer_name VARCHAR(255),
    customer_phone VARCHAR(50),
    total_amount DECIMAL(10, 2),
    fulfillment_method VARCHAR(50), -- 'pan_india_courier' | 'spencer_plaza_pickup'
    payment_method VARCHAR(50),
    razorpay_payment_id VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Order Placed'
);`}</pre>
              </div>
            </div>
          )}

          {activeTab === 'add_product' && (
            <form onSubmit={handleCreateProduct} className="space-y-4 max-w-xl mx-auto">
              <div className="text-xs text-zinc-400">
                Add a new bespoke garment or ready-to-wear piece to the Spencer Plaza collection:
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium block mb-1">
                  Garment Name
                </label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Royal Spencer Ivory Dinner Jacket"
                  className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium block mb-1">
                    Category
                  </label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="suits">Bespoke Suits & Blazers</option>
                    <option value="linen">European Linen</option>
                    <option value="heritage">Spencer Heritage</option>
                    <option value="streetwear">Luxury Streetwear</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium block mb-1">
                    Price in INR (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium block mb-1">
                    Fabric Composition
                  </label>
                  <input
                    type="text"
                    required
                    value={newProdFabric}
                    onChange={(e) => setNewProdFabric(e.target.value)}
                    placeholder="e.g. Super 140s Wool"
                    className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium block mb-1">
                    Cut / Silhouette
                  </label>
                  <input
                    type="text"
                    required
                    value={newProdFit}
                    onChange={(e) => setNewProdFit(e.target.value)}
                    placeholder="e.g. Structured European"
                    className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium block mb-1">
                  Spencer Plaza Boutique Rack Location
                </label>
                <input
                  type="text"
                  required
                  value={newProdStockText}
                  onChange={(e) => setNewProdStockText(e.target.value)}
                  placeholder="e.g. Phase 2 Rack 08 · 4 units"
                  className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white text-black hover:bg-[#c5a059] font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Insert Record into Store Database
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
