'use client';

import React, { useState } from 'react';
import { PRODUCTS, Product } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import { ShoppingBag, MessageSquare, Info, Check, Sparkles, X } from 'lucide-react';

export default function ProductCatalog() {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'just-meen', label: 'Just Meen Seafood' },
    { id: 'just-homemade', label: 'Preserves & Pantry' },
    { id: 'just-fresh', label: 'Hydroponic Greens' },
    { id: 'vinessence', label: 'Vinessence Superfoods' },
    { id: 'commercial', label: 'Agri & Aquaculture' },
  ];

  const filtered = activeTab === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeTab);

  const handleAdd = (product: Product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="catalog" className="py-20 bg-[#080d0b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-500/30 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Direct from Guyya Village, Coorg
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Farm-Fresh & Artisan Preserves Catalog
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
              Harvested clean from spring-fed waters, handcrafted in small batches, or grown soilless. Zero chemicals, zero compromise on authentic Kodava taste.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 bg-zinc-900/80 px-4 py-2 rounded-xl border border-zinc-800 self-start md:self-auto">
            <span>Showing <strong className="text-white">{filtered.length}</strong> items</span>
            <span>·</span>
            <span className="text-emerald-400 font-semibold">Sub-Zero Cold Chain Ready</span>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-900/40'
                  : 'bg-zinc-900/90 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <div
              key={product.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative p-5 bg-gradient-to-b from-zinc-900/90 to-transparent flex items-center justify-center min-h-[210px]">
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-black uppercase tracking-wider shadow">
                    {product.badge}
                  </span>
                )}
                
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="View Specs"
                >
                  <Info className="w-4 h-4" />
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-40 h-40 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-emerald-400 font-semibold uppercase tracking-wider mb-1">
                    <span>{product.categoryLabel}</span>
                    <span className="text-zinc-400 normal-case font-normal">{product.unit}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-800/80">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xl font-extrabold text-white">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAdd(product)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                        addedId === product.id
                          ? 'bg-emerald-400 text-black'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-md'
                      }`}
                    >
                      {addedId === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`https://wa.me/918123288564?text=Hi!%20I%20want%20to%20order%20${encodeURIComponent(product.name)}%20(₹${product.price})%20from%20Aqua%20Ventures.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl text-xs font-semibold bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 transition-colors flex items-center justify-center gap-1"
                      title="Order instantly on WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card max-w-lg w-full rounded-3xl p-6 relative border border-emerald-500/40">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-20 h-20 object-contain rounded-xl bg-zinc-900 p-2"
              />
              <div>
                <span className="text-xs text-emerald-400 font-semibold uppercase">{selectedProduct.categoryLabel}</span>
                <h3 className="text-lg font-bold text-white">{selectedProduct.name}</h3>
                <div className="text-lg font-extrabold text-white mt-0.5">
                  ₹{selectedProduct.price} <span className="text-xs text-zinc-400 font-normal">/ {selectedProduct.unit}</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
              {selectedProduct.description}
            </p>

            <div className="bg-zinc-900/90 rounded-xl p-3.5 mb-4 text-xs space-y-1.5 border border-zinc-800">
              <div className="flex justify-between">
                <span className="text-zinc-400">Packaging:</span>
                <span className="text-zinc-200 font-medium">{selectedProduct.specs.packaging}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Shelf Life:</span>
                <span className="text-zinc-200 font-medium">{selectedProduct.specs.shelfLife}</span>
              </div>
              {selectedProduct.specs.prepTime && (
                <div className="flex justify-between">
                  <span className="text-zinc-400">Preparation:</span>
                  <span className="text-zinc-200 font-medium">{selectedProduct.specs.prepTime}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-zinc-400">Origin:</span>
                <span className="text-zinc-200 font-medium">{selectedProduct.specs.origin}</span>
              </div>
            </div>

            <div className="mb-6 space-y-1">
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1">Quality Highlights:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProduct.highlights.map((h, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-500/20">
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  handleAdd(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart (₹{selectedProduct.price})
              </button>

              <a
                href={`https://wa.me/918123288564?text=Hi!%20I%20have%20a%20question%20about%20${encodeURIComponent(selectedProduct.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 rounded-xl text-xs font-semibold bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                Ask on WhatsApp
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
