'use client';

import React, { useState } from 'react';
import { FARM_TOUR } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function TourBookingSection() {
  const { setTourBookingData } = useCart();
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [slot, setSlot] = useState('Morning Slot (10:00 AM - 1:30 PM)');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const totalAmount = adults * FARM_TOUR.pricePerAdult + children * FARM_TOUR.pricePerChild;

  const handleBookNow = () => {
    setTourBookingData({
      date,
      slot,
      adults,
      children,
      totalAmount
    });
  };

  return (
    <section id="tour" className="py-24 bg-coorg-green text-misty-ivory relative overflow-hidden">
      
      {/* High-quality stock background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-coorg-green/95 via-coorg-green/80 to-coorg-green/60 z-10 mix-blend-multiply" />
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop" 
          alt="Lush green agriculture estate" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Editorial Content */}
          <div className="space-y-10">
            <div>
              <span className="text-warm-gold tracking-[0.2em] uppercase text-[10px] font-semibold mb-4 block">
                The Heritage Experience
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-misty-ivory mb-6 leading-tight">
                Experience<br />The Source.
              </h2>
              <div className="w-16 h-[1px] bg-warm-gold mb-6"></div>
              <p className="text-misty-ivory/80 text-lg font-light leading-relaxed">
                Walk through sustainable aquaculture raceways, explore hydroponic greenhouses, and uncover the ancient secrets of Kodava agriculture. Conclude with a farm-to-fork meal served on the serene banks of the Cauvery tributary.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-warm-gold tracking-[0.2em] uppercase text-[10px] font-semibold block">
                Itinerary Highlights
              </span>
              <ul className="space-y-3 font-light text-misty-ivory/90">
                {FARM_TOUR.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-warm-gold mt-1">—</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:pl-10">
            <div className="bg-misty-ivory text-ink-charcoal p-8 sm:p-12 rounded-sm shadow-2xl relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-earth-clay/5 rounded-bl-full pointer-events-none" />
              
              <div className="mb-8">
                <h3 className="font-serif text-3xl mb-2">Reserve Your Visit</h3>
                <p className="text-sm font-light text-ink-charcoal/70">
                  Join us for a 3.5 hour immersive journey.
                </p>
              </div>

              <div className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-semibold text-ink-charcoal/60 mb-2 flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-transparent border-b border-ink-charcoal/20 pb-2 text-sm focus:outline-none focus:border-earth-clay transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-semibold text-ink-charcoal/60 mb-2 flex items-center gap-2">
                      <Clock className="w-3 h-3" /> Time
                    </label>
                    <select
                      value={slot}
                      onChange={(e) => setSlot(e.target.value)}
                      className="w-full bg-transparent border-b border-ink-charcoal/20 pb-2 text-sm focus:outline-none focus:border-earth-clay transition-colors"
                    >
                      <option value="Morning Slot (10:00 AM - 1:30 PM)">Morning</option>
                      <option value="Evening Slot (3:00 PM - 6:30 PM)">Evening</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-semibold text-ink-charcoal/60 mb-2">
                      Adults (₹{FARM_TOUR.pricePerAdult})
                    </label>
                    <div className="flex items-center justify-between border-b border-ink-charcoal/20 pb-2">
                      <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="text-xl px-2 hover:text-earth-clay cursor-pointer">-</button>
                      <span className="font-medium">{adults}</span>
                      <button type="button" onClick={() => setAdults(adults + 1)} className="text-xl px-2 hover:text-earth-clay cursor-pointer">+</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-semibold text-ink-charcoal/60 mb-2">
                      Kids (₹{FARM_TOUR.pricePerChild})
                    </label>
                    <div className="flex items-center justify-between border-b border-ink-charcoal/20 pb-2">
                      <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="text-xl px-2 hover:text-earth-clay cursor-pointer">-</button>
                      <span className="font-medium">{children}</span>
                      <button type="button" onClick={() => setChildren(children + 1)} className="text-xl px-2 hover:text-earth-clay cursor-pointer">+</button>
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-4 border-t border-ink-charcoal/10">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-ink-charcoal/60">Total</span>
                    <span className="font-serif text-3xl text-coorg-green">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleBookNow}
                    className="w-full py-4 bg-coorg-green text-misty-ivory text-xs uppercase tracking-widest font-semibold hover:bg-earth-clay transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
