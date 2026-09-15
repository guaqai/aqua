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
                <span className="text-[10px] font-semibold text-earth-clay uppercase tracking-widest block mb-1">Founding Team</span>
                <h3 className="font-serif text-2xl text-coorg-green">
                  Shyam Aiyappa · Pattada Namitha<br />
                  Mukul Appaiah · Naina Ballachanda
                </h3>
                <p className="text-xs text-ink-charcoal/60 font-light mt-1">Guyya Village, Siddapur, Kodagu (Coorg)</p>
              </div>

              <blockquote className="font-serif italic text-base text-ink-charcoal/85 leading-relaxed mb-6 border-l-2 border-earth-clay/30 pl-4">
                "Anchored in our 2022 transformation, we set out to build a modern, high-precision circular agro-ecology estate in Kodagu. By fusing closed-loop aquaculture with conscious culinary craft and zero-waste soil nutrition, Aqua Ventures delivers uncompromising purity from source to doorstep."
              </blockquote>

              <div className="pt-6 border-t border-ink-charcoal/10 space-y-3 text-xs text-ink-charcoal/70 font-light">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-coorg-green flex-shrink-0" />
                  <span>Closed-loop raceways fed by Cauvery headwaters</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-coorg-green flex-shrink-0" />
                  <span>Zero-waste circular economy · Fish by-product bio-nutrients</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-coorg-green flex-shrink-0" />
                  <span>Women-led artisan pantry & collaborative local farmer network</span>
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
                Modern Agro-Ecology Rooted in Kodagu Purity
              </h2>
              <div className="w-16 h-[1px] bg-warm-gold mb-6" />
            </div>

            <p className="text-base text-ink-charcoal/80 font-light leading-relaxed">
              Nestled beside a pristine stream in Guyya Village, Siddapur, Aqua Ventures is an innovative 10-acre circular agro-ecology sanctuary. Here, clean mountain runoff cascades through high-aeration raceways where Tilapia swim against simulated currents, yielding sweet, firm white meat with zero muddy taste and zero antibiotics.
            </p>

            <p className="text-base text-ink-charcoal/80 font-light leading-relaxed">
              Every drop of water and nutrient is cherished. Water nourishes automated hydroponic greenhouses for tender lettuce and spinach, while fish by-products are cold-hydrolyzed into <strong className="font-serif italic text-coorg-green font-semibold">Just Grow</strong> organic bio-fertilizer. Our pantry lines — including wood-fired <strong className="font-serif italic text-coorg-green font-semibold">Kachampuli</strong> and wild <strong className="font-serif italic text-coorg-green font-semibold">Kaipuli Marmalade</strong> — celebrate unadulterated botanical flavor.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="p-5 bg-white border border-ink-charcoal/10 rounded-sm">
                <Leaf className="w-5 h-5 text-coorg-green mb-3" />
                <h4 className="font-serif text-lg text-coorg-green font-semibold">Zero-Waste Circularity</h4>
                <p className="text-xs text-ink-charcoal/60 font-light mt-1 leading-relaxed">Fish biomass upcycled into high-potency liquid plant fertilizer.</p>
              </div>

              <div className="p-5 bg-white border border-ink-charcoal/10 rounded-sm">
                <Award className="w-5 h-5 text-earth-clay mb-3" />
                <h4 className="font-serif text-lg text-coorg-green font-semibold">Women-Led Craft</h4>
                <p className="text-xs text-ink-charcoal/60 font-light mt-1 leading-relaxed">Artisan preserves and farm delicacies made with zero artificial chemicals.</p>
              </div>

              <div className="p-5 bg-white border border-ink-charcoal/10 rounded-sm">
                <Heart className="w-5 h-5 text-warm-gold mb-3" />
                <h4 className="font-serif text-lg text-coorg-green font-semibold">Community Synergy</h4>
                <p className="text-xs text-ink-charcoal/60 font-light mt-1 leading-relaxed">Empowering local partner entrepreneurs and regional fish farmers.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
