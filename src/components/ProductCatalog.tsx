import React, { useState, useMemo } from 'react';
import { Product, CategoryId } from '../types';
import { ShoppingBag, Eye, Search, SlidersHorizontal, Check, MapPin } from 'lucide-react';
import FashionImage from './FashionImage';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
}

const getProductType = (id: string, cat: string): any => {
  if (id === 'ts-01') return 'suit';
  if (id === 'ts-02') return 'blazer';
  if (id === 'ts-03') return 'bandhgala';
  if (id === 'ts-04') return 'streetwear';
  if (id === 'ts-05') return 'linen';
  if (id === 'ts-06') return 'trousers';
  if (id === 'ts-07') return 'shoes';
  if (id === 'ts-08') return 'accessories';
  if (cat === 'suits') return 'suit';
  if (cat === 'linen') return 'linen';
  if (cat === 'streetwear') return 'streetwear';
  if (cat === 'heritage') return 'bandhgala';
  if (cat === 'accessories') return 'accessories';
  return 'suit';
};

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'All Collections' },
  { id: 'suits', label: 'Bespoke Suits & Blazers' },
  { id: 'linen', label: 'European Linen' },
  { id: 'heritage', label: 'Spencer Heritage & Bandhgala' },
  { id: 'streetwear', label: 'Luxury Streetwear' },
  { id: 'accessories', label: 'Footwear & Accents' },
];

export default function ProductCatalog({
  products,
  onSelectProduct,
  onAddToCart,
}: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.fabric.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.availableSizes[0] || 'Standard';
    onAddToCart(product, defaultSize);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1500);
  };

  return (
    <section id="catalog" className="py-24 px-6 md:px-12 bg-[#090909] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a059] mb-2 font-medium">
              <span>Spencer Plaza Flagship Ready</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Available in Boutique & Online</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white uppercase">
              The Men's Wardrobe
            </h2>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wool, linen, tux..."
                className="w-full bg-zinc-900 border border-white/10 rounded-md pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a059] transition-colors"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-zinc-900 border border-white/10 rounded-md px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-[#c5a059] transition-colors"
            >
              <option value="featured">Sort: Curated Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filter Tabs (Interactive Segmented Controller) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-md whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5 hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-xl bg-zinc-950 border border-white/5">
            <p className="text-zinc-400 text-sm">No menswear pieces match your current criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#c5a059] text-black text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#c5a059]/90"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isJustAdded = addedProductId === product.id;
              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group bg-zinc-950 rounded-xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Image Container with Resilient Fallback */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
                    <FashionImage
                      src={product.image}
                      alt={product.name}
                      category={product.categoryLabel}
                      productType={getProductType(product.id, product.category)}
                      className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient scrim for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

                    {/* Quick Badge / Category Pill-less */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-zinc-300 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                      <span>{product.categoryLabel}</span>
                    </div>

                    {/* Quick Add overlay button */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`w-full py-2.5 rounded text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-lg ${
                          isJustAdded
                            ? 'bg-emerald-500 text-black'
                            : 'bg-white text-black hover:bg-[#c5a059]'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added to Bag</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Quick Add · {product.availableSizes[0]}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Metadata Content */}
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <div className="text-[11px] text-[#c5a059] uppercase tracking-wider font-mono mb-1">
                        {product.color}
                      </div>
                      <h3 className="font-medium text-sm text-white group-hover:text-[#c5a059] transition-colors truncate">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                        {product.fabric}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-semibold font-mono text-white tabular-nums">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[11px] line-through text-zinc-500 font-mono tabular-nums">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#c5a059]" />
                        <span>Phase 2</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
