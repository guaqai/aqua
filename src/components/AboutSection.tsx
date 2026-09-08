'use client';

import React from 'react';
import { Waves, Leaf, Award, Heart, CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[#080d0b] border-t border-emerald-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5">
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold text-2xl shadow-lg border border-emerald-400/30">
                🌿
              </div>

              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Co-Founders</span>
                <h3 className="text-2xl font-bold text-white mt-1">Shyam Aiyappa & Pattada Namitha</h3>
                <p className="text-xs text-zinc-400 mt-1">Guyya Village, Siddapur, Kodagu (Coorg)</p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                "We set out in 2014 to prove that India can produce world-class freshwater seafood without destroying ecosystems, muddying flavors, or pumping antibiotics. By uniting modern recirculating aquaculture with heritage Kodava culinary traditions, Aqua Ventures is cultivating a cleaner, tastier food future."
              </p>

              <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Closed-loop bio-secure raceways fed by Cauvery headwaters</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero effluent pollution · 100% water recycled to orchards</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Empowering 50+ local Kodagu fish farmers with fingerlings</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              <Waves className="w-3.5 h-3.5" />
              The Aqua Ventures Philosophy
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Where Mountain Water Meets Generational Kodava Craft
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Nestled beside a clean mountain stream in Guyya Village, Siddapur, Aqua Ventures is not an industrial factory farm. It is a 10-acre living agro-ecology estate. Here, pure spring water cascades through concrete raceways aerated 24/7, where our Tilapia swim constantly against simulated currents. This keeps their meat firm, sweet, and exceptionally lean.
            </p>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Nutrient-rich water from the fish tanks is naturally channeled into automated hydroponic greenhouses to feed crisp butterhead lettuces and fragrant Genovese basil. Meanwhile, our heritage orchards yield wild Seville bitter limes for our famous <strong className="text-amber-300">Kaipuli Marmalade</strong> and rare forest fruits for <strong className="text-amber-300">Pure Kachampuli</strong> vinegar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <Leaf className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="text-sm font-bold text-white">Circular Farming</h4>
                <p className="text-xs text-zinc-400 mt-1">Fish waste fertilizes hydroponics and coffee plantations.</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <Award className="w-5 h-5 text-amber-400 mb-2" />
                <h4 className="text-sm font-bold text-white">Heritage Preserves</h4>
                <p className="text-xs text-zinc-400 mt-1">Authentic Kodava recipes simmered without preservatives.</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <Heart className="w-5 h-5 text-teal-400 mb-2" />
                <h4 className="text-sm font-bold text-white">Community First</h4>
                <p className="text-xs text-zinc-400 mt-1">Advising Coorg farmers and generating local rural employment.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
