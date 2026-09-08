'use client';

import React from 'react';
import { Snowflake, Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { DELIVERY_ZONES } from '@/data/products';

export default function DeliveryZonesBanner() {
  return (
    <section id="cold-chain" className="py-14 bg-zinc-950/60 border-y border-emerald-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-500/30 mb-3">
            <Snowflake className="w-3.5 h-3.5" />
            Certified Cold-Chain Infrastructure
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How We Guarantee Zero-Melt Freshness to Your City
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            Seafood and frozen specialties require uncompromised sub-zero integrity. Our insulated thermocol packaging with dry ice packs guarantees items arrive rock-hard frozen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DELIVERY_ZONES.map((zone, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-200 relative group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  {zone.city.split(' ')[0]}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  Free &gt; {zone.freeAbove}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-zinc-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>{zone.leadTime}</span>
                </div>
                <div className="flex items-start gap-2 text-zinc-400">
                  <Truck className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <span>{zone.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pan India Shelf Stable Note */}
        <div className="mt-6 text-center text-xs text-zinc-400">
          📦 <strong className="text-zinc-300">Pan-India Courier Available:</strong> Shelf-stable items (Kachampuli, Kaipuli Marmalade, Pickles, Sprouted Millet Mixes & Honey) ship across all India pin codes via express courier in 2-4 business days.
        </div>

      </div>
    </section>
  );
}
