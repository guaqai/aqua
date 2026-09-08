'use client';

import React from 'react';
import { ArrowRight, Leaf, Waves, Droplet, ShieldCheck, Snowflake } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-20 overflow-hidden bg-coorg-green">
      {/* High-quality Western Ghats / Coorg misty landscape */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-coorg-green via-coorg-green/90 to-coorg-green/60 z-10 mix-blend-multiply" />
        <img 
          src="https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=2940&auto=format&fit=crop" 
          alt="Misty Western Ghats Coorg Hills" 
          className="w-full h-full object-cover opacity-75"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center gap-3">
              <span className="h-[1px] w-10 bg-warm-gold" />
              <span className="text-warm-gold font-medium tracking-[0.25em] uppercase text-xs">
                Siddapur, Kodagu · Est. 2014
              </span>
            </div>
            
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] leading-[1.08] text-misty-ivory tracking-tight">
              Pure Source.<br />
              <span className="italic text-warm-gold font-light">Pristine Harvest.</span>
            </h1>

            <p className="text-misty-ivory/85 text-base sm:text-lg font-light leading-relaxed max-w-xl">
              Flowing mountain spring-water Tilapia fillets, succulent prawns, wild Kaipuli citrus marmalade, and wood-fired artisanal Kachampuli. Harvested with generational Kodava stewardship.
            </p>

            {/* Cold chain reassurance */}
            <div className="flex items-center gap-4 py-3 px-4 rounded-sm bg-misty-ivory/10 border border-misty-ivory/15 max-w-lg backdrop-blur-md">
              <Snowflake className="w-5 h-5 text-warm-gold flex-shrink-0" />
              <div className="text-xs text-misty-ivory/90 font-light">
                <strong className="font-medium text-warm-gold">Sub-Zero Insulated Cold Chain:</strong> Direct refrigerated runs to Bangalore, Mysore, Mangalore & Coorg.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <a 
                href="#catalog" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-xs font-semibold tracking-widest uppercase text-coorg-green bg-warm-gold hover:bg-misty-ivory transition-all duration-300"
              >
                <span>Shop Fresh Catalog</span>
                <ArrowRight className="ml-2.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#tour" 
                className="px-6 py-4 text-misty-ivory hover:text-warm-gold uppercase tracking-widest text-xs font-semibold transition-colors border border-misty-ivory/30 hover:border-warm-gold"
              >
                Book Farm Tour & Tasting
              </a>
            </div>

            {/* Trust numbers */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-misty-ivory/15 max-w-lg">
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-misty-ivory font-light">10+ Yrs</div>
                <div className="text-[10px] uppercase tracking-wider text-misty-ivory/60 mt-0.5">Sustainable Heritage</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-warm-gold font-light">100%</div>
                <div className="text-[10px] uppercase tracking-wider text-misty-ivory/60 mt-0.5">Antibiotic-Free</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-misty-ivory font-light">-18°C</div>
                <div className="text-[10px] uppercase tracking-wider text-misty-ivory/60 mt-0.5">Certified Cold-Chain</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="bg-misty-ivory p-8 rounded-sm shadow-2xl border border-misty-ivory/20 relative">
                <div className="text-[10px] uppercase tracking-widest font-semibold text-earth-clay mb-2">
                  Estate Highlight
                </div>
                <h3 className="font-serif text-2xl text-coorg-green mb-1">
                  Fresh Tilapia Fillets
                </h3>
                <p className="text-xs text-ink-charcoal/70 font-light mb-4">
                  Raceway-harvested · Sweet, firm, zero muddy flavor
                </p>

                <div className="bg-coorg-green/5 p-4 rounded-sm border border-ink-charcoal/5 flex items-center justify-center my-4 min-h-[220px]">
                  <img 
                    src="/products/tilapia-fillet-1kg.png" 
                    alt="Just Meen Tilapia Fillet" 
                    className="max-h-44 object-contain mix-blend-multiply drop-shadow-md"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-ink-charcoal/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-ink-charcoal/50 block">Price / 1 kg Pack</span>
                    <span className="font-serif text-2xl text-coorg-green font-medium">₹600.00</span>
                  </div>
                  <a
                    href="#catalog"
                    className="px-4 py-2 bg-coorg-green hover:bg-earth-clay text-misty-ivory text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    View in Catalog
                  </a>
                </div>
              </div>

              {/* Floating aesthetic tags */}
              <div className="absolute -top-4 -left-6 bg-earth-clay text-misty-ivory px-4 py-2 text-[10px] uppercase tracking-widest font-semibold shadow-lg">
                Fresh Spring Water
              </div>
              <div className="absolute -bottom-4 -right-4 bg-coorg-green text-warm-gold border border-warm-gold/40 px-4 py-2 text-[10px] uppercase tracking-widest font-semibold shadow-lg">
                Authentic Kodava
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
