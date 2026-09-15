'use client';

import React, { useState } from 'react';
import { PRODUCTS, Product } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import { ShoppingBag, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductCatalog() {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', label: 'All Brands', logo: null, sub: 'Curated D2C' },
    { id: 'just-meen', label: 'Just Meen', logo: '/just-meen_logo.png', sub: 'Seafood & Aquaculture' },
    { id: 'just-homemade', label: 'Just Homemade', logo: '/just-homemade-logo.png', sub: 'Artisan Preserves' },
    { id: 'just-fresh', label: 'Just Fresh', logo: '/just-fresh-logo.png', sub: 'Hydroponic Greens' },
    { id: 'just-grow', label: 'Just Grow', logo: '/just-grow-logo.png', sub: 'Circular Bio-Fertilizer' },
  ];

  const filtered = activeTab === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeTab);

  const activeCategoryObj = categories.find(c => c.id === activeTab);

  return (
    <section id="catalog" className="py-24 bg-misty-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-earth-clay tracking-[0.2em] uppercase text-[10px] font-semibold mb-4 block">
            Consumer D2C Showcase · Aqua Ventures Umbrella
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-coorg-green mb-6 leading-tight">
            Our Artisan Brands
          </h2>
          <div className="w-16 h-[1px] bg-warm-gold mb-6"></div>
          <p className="text-ink-charcoal/80 max-w-2xl text-lg font-light leading-relaxed">
            Aqua Ventures is the parent holding company powering four dedicated craft brands:
            from pristine spring-water aquaculture to zero-waste plant bio-nutrition.
          </p>
        </div>

        {/* Brand Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-sm border text-xs tracking-wider uppercase font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-coorg-green text-misty-ivory border-coorg-green shadow-md'
                  : 'bg-white/80 text-ink-charcoal/70 border-ink-charcoal/15 hover:border-earth-clay hover:text-earth-clay'
              }`}
            >
              {cat.logo && (
                <img 
                  src={cat.logo} 
                  alt={cat.label} 
                  className="w-5 h-5 object-contain rounded-full bg-white p-0.5 shadow-xs" 
                />
              )}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Brand Spotlight Banner */}
        {activeCategoryObj && activeCategoryObj.logo && (
          <div className="mb-12 p-5 bg-white border border-ink-charcoal/10 rounded-sm flex flex-col sm:flex-row items-center gap-5 max-w-3xl mx-auto shadow-xs">
            <img 
              src={activeCategoryObj.logo} 
              alt={activeCategoryObj.label} 
              className="w-14 h-14 object-contain rounded-full bg-misty-ivory p-1.5 border border-warm-gold/40 flex-shrink-0" 
            />
            <div className="text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-earth-clay block mb-0.5">
                {activeCategoryObj.sub} · Dedicated D2C Brand
              </span>
              <h3 className="font-serif text-2xl text-coorg-green">
                {activeCategoryObj.label}
              </h3>
            </div>
          </div>
        )}

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                key={product.id}
                className="group flex flex-col"
              >
                {/* Image Area */}
                <div className="relative aspect-square mb-6 overflow-hidden bg-coorg-green/5 rounded-sm">
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-misty-ivory text-earth-clay text-[9px] uppercase tracking-widest font-bold border border-earth-clay/20 shadow-sm">
                      {product.badge}
                    </div>
                  )}
                  
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-contain p-8 mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Hover Overlay Actions */}
                  <div className="absolute inset-0 bg-misty-ivory/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 backdrop-blur-[2px]">
                    <button
                      onClick={() => addToCart(product)}
                      className="px-6 py-3 bg-coorg-green text-misty-ivory text-xs uppercase tracking-widest font-semibold hover:bg-earth-clay transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-coorg-green text-[10px] uppercase tracking-widest font-bold border-b border-coorg-green pb-0.5 hover:text-earth-clay hover:border-earth-clay transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="text-center px-4">
                  <div className="text-[10px] uppercase tracking-widest text-earth-clay font-semibold mb-2">
                    {product.categoryLabel}
                  </div>
                  <h3 className="font-serif text-2xl text-coorg-green mb-2 group-hover:text-earth-clay transition-colors cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    {product.name}
                  </h3>
                  <div className="text-sm text-ink-charcoal/70 font-light mb-3">
                    {product.unit}
                  </div>
                  <div className="text-lg font-medium text-ink-charcoal">
                    ₹{product.price.toLocaleString('en-IN')}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Product Modal (Minimalist) */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-charcoal/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-misty-ivory max-w-2xl w-full rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 text-ink-charcoal/60 hover:text-ink-charcoal transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>

              <div className="md:w-1/2 bg-coorg-green/5 p-8 flex items-center justify-center relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-auto object-contain mix-blend-multiply drop-shadow-xl"
                />
              </div>
              
              <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                <span className="text-[10px] uppercase tracking-widest text-earth-clay font-bold mb-2 block">
                  {selectedProduct.categoryLabel}
                </span>
                <h3 className="font-serif text-3xl text-coorg-green mb-2 leading-tight">
                  {selectedProduct.name}
                </h3>
                <div className="text-xl font-medium text-ink-charcoal mb-6">
                  ₹{selectedProduct.price} <span className="text-sm font-light text-ink-charcoal/60">/ {selectedProduct.unit}</span>
                </div>
                
                <p className="text-sm text-ink-charcoal/80 font-light leading-relaxed mb-8">
                  {selectedProduct.description}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between border-b border-ink-charcoal/10 pb-2">
                    <span className="text-xs uppercase tracking-widest text-ink-charcoal/60">Origin</span>
                    <span className="text-xs font-medium text-ink-charcoal text-right pl-4">{selectedProduct.specs.origin}</span>
                  </div>
                  <div className="flex justify-between border-b border-ink-charcoal/10 pb-2">
                    <span className="text-xs uppercase tracking-widest text-ink-charcoal/60">Shelf Life</span>
                    <span className="text-xs font-medium text-ink-charcoal text-right pl-4">{selectedProduct.specs.shelfLife}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-4 bg-coorg-green text-misty-ivory text-xs uppercase tracking-widest font-semibold hover:bg-earth-clay transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart (₹{selectedProduct.price})
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
