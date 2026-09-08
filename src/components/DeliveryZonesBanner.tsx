'use client';

import React from 'react';
import { Snowflake, Truck, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { DELIVERY_ZONES } from '@/data/products';

export default function DeliveryZonesBanner() {
  return (
    <section id="cold-chain" className="py-20 bg-misty-ivory border-b border-ink-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-earth-clay tracking-[0.2em] uppercase text-[10px] font-semibold mb-3 block">
            Sub-Zero Certified Logistics
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-coorg-green tracking-tight">
            Freshness Guaranteed to Your City
          </h2>
          <div className="w-12 h-[1px] bg-warm-gold mx-auto my-4" />
          <p className="text-sm sm:text-base text-ink-charcoal/70 font-light leading-relaxed">
            Our specialized insulated cold-chain with food-grade dry ice packs ensures our Tilapia fillets and prawns arrive rock-solid frozen (-18°C) at your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DELIVERY_ZONES.map((zone, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-ink-charcoal/10 rounded-sm hover:border-earth-clay transition-all duration-300 shadow-sm group"
            >
              <div className="flex items-center justify-between mb-4 border-b border-ink-charcoal/5 pb-3">
                <span className="font-serif text-xl text-coorg-green font-semibold">
                  {zone.city.split(' ')[0]}
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 bg-coorg-green/5 text-earth-clay border border-earth-clay/20">
                  Free &gt; {zone.freeAbove}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5 text-ink-charcoal/80 font-light">
                  <Clock className="w-3.5 h-3.5 text-earth-clay mt-0.5 flex-shrink-0" />
                  <span>{zone.leadTime}</span>
                </div>
                <div className="flex items-start gap-2.5 text-ink-charcoal/60 font-light">
                  <Truck className="w-3.5 h-3.5 text-coorg-green mt-0.5 flex-shrink-0" />
                  <span>{zone.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pan India Shelf Stable Courier Note */}
        <div className="mt-10 p-4 bg-coorg-green/5 border border-coorg-green/10 rounded-sm text-center text-xs text-ink-charcoal/80 font-light max-w-4xl mx-auto flex items-center justify-center gap-2">
          <span className="font-semibold text-coorg-green uppercase tracking-wider text-[10px]">Pan-India Express:</span>
          <span>Shelf-stable preserves (Kachampuli, Kaipuli Marmalade, Pickles, Sprouted Millet Mixes & Honey) ship across all India pin codes in 2–4 business days.</span>
        </div>

      </div>
    </section>
  );
}
