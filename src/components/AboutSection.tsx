'use client';

import React from 'react';
import { Waves, Leaf, Award, Heart, CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-misty-ivory border-t border-ink-charcoal/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Founders Story Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-ink-charcoal/10 p-8 sm:p-10 rounded-sm shadow-xl relative">
              <div className="w-12 h-[2px] bg-warm-gold mb-6" />

              <div className="mb-6">
                <span className="text-[10px] font-semibold text-earth-clay uppercase tracking-widest block mb-1">Co-Founders</span>
                <h3 className="font-serif text-3xl text-coorg-green">Shyam Aiyappa & Pattada Namitha</h3>
                <p className="text-xs text-ink-charcoal/60 font-light mt-1">Guyya Village, Siddapur, Kodagu (Coorg)</p>
              </div>

              <blockquote className="font-serif italic text-base text-ink-charcoal/85 leading-relaxed mb-6 border-l-2 border-earth-clay/30 pl-4">
                "We set out in 2014 to prove that India can produce world-class freshwater seafood without destroying ecosystems, muddying flavors, or pumping antibiotics. By uniting modern recirculating aquaculture with heritage Kodava culinary traditions, Aqua Ventures is cultivating a cleaner, tastier food future."
              </blockquote>

              <div className="pt-6 border-t border-ink-charcoal/10 space-y-3 text-xs text-ink-charcoal/70 font-light">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-coorg-green flex-shrink-0" />
                  <span>Closed-loop raceways fed by Cauvery headwaters</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-coorg-green flex-shrink-0" />
                  <span>Zero effluent pollution · 100% water recycled to orchards</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-coorg-green flex-shrink-0" />
                  <span>Empowering 50+ local Kodagu fish farmers with fingerlings</span>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy & Practices */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-earth-clay tracking-[0.2em] uppercase text-[10px] font-semibold mb-3 block">
                The Aqua Ventures Philosophy
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-coorg-green tracking-tight leading-tight mb-4">
                Where Mountain Water Meets Generational Kodava Craft
              </h2>
              <div className="w-16 h-[1px] bg-warm-gold mb-6" />
            </div>

            <p className="text-base text-ink-charcoal/80 font-light leading-relaxed">
              Nestled beside a clean mountain stream in Guyya Village, Siddapur, Aqua Ventures is not an industrial factory farm. It is a 10-acre living agro-ecology estate. Here, pure spring water cascades through concrete raceways aerated 24/7, where our Tilapia swim constantly against simulated currents. This keeps their meat firm, sweet, and exceptionally lean.
            </p>

            <p className="text-base text-ink-charcoal/80 font-light leading-relaxed">
              Nutrient-rich water from the fish tanks is naturally channeled into automated hydroponic greenhouses to feed crisp butterhead lettuces and fragrant Genovese basil. Meanwhile, our heritage orchards yield wild Seville bitter limes for our famous <strong className="font-serif italic text-coorg-green font-semibold">Kaipuli Marmalade</strong> and rare forest fruits for <strong className="font-serif italic text-coorg-green font-semibold">Pure Kachampuli</strong> vinegar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="p-5 bg-white border border-ink-charcoal/10 rounded-sm">
                <Leaf className="w-5 h-5 text-coorg-green mb-3" />
                <h4 className="font-serif text-lg text-coorg-green font-semibold">Circular Farming</h4>
                <p className="text-xs text-ink-charcoal/60 font-light mt-1 leading-relaxed">Fish waste fertilizes hydroponics and coffee plantations.</p>
              </div>

              <div className="p-5 bg-white border border-ink-charcoal/10 rounded-sm">
                <Award className="w-5 h-5 text-earth-clay mb-3" />
                <h4 className="font-serif text-lg text-coorg-green font-semibold">Heritage Preserves</h4>
                <p className="text-xs text-ink-charcoal/60 font-light mt-1 leading-relaxed">Authentic Kodava recipes simmered without chemical preservatives.</p>
              </div>

              <div className="p-5 bg-white border border-ink-charcoal/10 rounded-sm">
                <Heart className="w-5 h-5 text-warm-gold mb-3" />
                <h4 className="font-serif text-lg text-coorg-green font-semibold">Community First</h4>
                <p className="text-xs text-ink-charcoal/60 font-light mt-1 leading-relaxed">Advising Coorg farmers and generating local rural employment.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
