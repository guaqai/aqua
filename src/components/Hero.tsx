'use client';

import React from 'react';
import { ShieldCheck, Snowflake, MapPin, Sparkles, ArrowRight, CheckCircle2, Waves } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[400px] bg-emerald-600/10 blur-[130px] -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-40 right-10 w-[350px] h-[350px] bg-teal-500/10 blur-[120px] -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-60 left-10 w-[300px] h-[300px] bg-amber-500/5 blur-[100px] -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Guyya Village, Siddapur, Coorg · Eco-Agro Aquaculture Sanctuary</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Pure Mountain Spring Water Harvest.{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                Delivered Cold-Chain to Your Door.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
              Experience the unmatched freshness of closed-loop, flowing spring-water Tilapia fillets, succulent colossal prawns, wild Coorg <strong className="text-amber-300 font-semibold">Kaipuli marmalade</strong>, wood-fired <strong className="text-amber-300 font-semibold">Kachampuli</strong> vinegar, and ancient sprouted superfoods.
            </p>

            {/* Delivery Alert Pill */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/80 border border-emerald-500/30 max-w-xl">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 flex-shrink-0">
                <Snowflake className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="text-white font-semibold block">Sub-Zero Insulated Cold Chain Active</span>
                <span className="text-zinc-400">Regular refrigerated runs to <strong className="text-emerald-300">Bangalore, Mysore, Mangalore & Coorg</strong></span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#catalog"
                className="px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black shadow-lg shadow-emerald-950/60 transition-all duration-200 flex items-center gap-2 group"
              >
                <span>Shop Fresh Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#tour"
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 transition-all duration-200 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Book Farm Tour (₹1,500)</span>
              </a>

              <a
                href="https://wa.me/918123288564"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl font-semibold text-xs text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Direct WhatsApp: +91 81232 88564</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-zinc-800/80">
              <div className="space-y-1">
                <div className="text-2xl font-black text-white">10+ Yrs</div>
                <div className="text-xs text-zinc-400">Sustainable Coorg Legacy</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-emerald-400">100%</div>
                <div className="text-xs text-zinc-400">Antibiotic & Chemical Free</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-amber-400">-18°C</div>
                <div className="text-xs text-zinc-400">Certified Frozen Cold-Chain</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-white">4.9 ★</div>
                <div className="text-xs text-zinc-400">Farm Tour Guest Rating</div>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Visual Feature Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-6 glass-card overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl -z-10" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  <Waves className="w-3.5 h-3.5" />
                  Farm Highlight
                </span>
                <span className="text-xs font-medium text-zinc-400">Guyya Estate, Coorg</span>
              </div>

              {/* Product Hero Snapshot */}
              <div className="rounded-2xl bg-zinc-950/80 border border-zinc-800/80 p-4 mb-5 flex items-center gap-4">
                <img
                  src="/products/tilapia-fillet-1kg.png"
                  alt="Just Meen Tilapia Fillet"
                  className="w-24 h-24 object-contain rounded-xl bg-zinc-900 p-1"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">Just Meen</span>
                    <span className="text-xs text-zinc-400">1 kg Pack</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">Boneless Tilapia Fillets</h3>
                  <div className="text-emerald-400 font-bold text-lg mt-0.5">₹600.00</div>
                  <span className="text-[11px] text-zinc-400 block mt-0.5">Zero muddy taste · Spring-water raised</span>
                </div>
              </div>

              {/* Quick checklist */}
              <div className="space-y-2.5 text-xs text-zinc-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Harvested from Cauvery tributary mountain stream raceways</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Instant flash-frozen at -40°C to lock natural sweetness</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Delivered sub-zero in insulated coolers to Blr/Mys/Mlr/Coorg</span>
                </div>
              </div>

              {/* Founders Note quote */}
              <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-800 flex items-center justify-center text-white font-bold text-xs">
                  SA
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Shyam Aiyappa & Namitha</div>
                  <div className="text-[11px] text-zinc-400">Co-Founders, Aqua Ventures Coorg</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
