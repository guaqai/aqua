'use client';

import React, { useState } from 'react';
import { FARM_TOUR } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import { Sparkles, Calendar, Users, Clock, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';

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
    <section id="tour" className="py-24 bg-gradient-to-b from-[#080d0b] via-zinc-950 to-[#080d0b] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Exclusive Agro-Tourism Experience in Siddapur
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Integrated Farm Tour & Riverbank Tasting
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 mt-4 leading-relaxed">
            Immerse yourself in sustainable aquaculture, hydroponic greenhouses, apiary bee tours, and a sumptuous farm-to-fork riverside lunch right on the banks of a serene Cauvery tributary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Tour Itinerary & Inclusions</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">3.5 Hours of guided interactive exploration</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-emerald-400">₹{FARM_TOUR.pricePerAdult}</span>
                  <span className="text-xs text-zinc-400 block">/ Adult (Kids ₹{FARM_TOUR.pricePerChild})</span>
                </div>
              </div>

              <div className="space-y-3">
                {FARM_TOUR.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-800 space-y-3">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">Program Breakdown:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {FARM_TOUR.schedule.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80 flex items-start gap-2.5">
                      <Clock className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-white block">{item.time}</span>
                        <span className="text-zinc-400 text-[11px]">{item.activity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 relative glow-emerald">
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Reserve Your Slot</h3>
                  <span className="text-xs text-emerald-400 font-medium">Instant Confirmation & Lunch Prep</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-900 text-emerald-300 border border-emerald-400/30">
                  Daily Slots
                </span>
              </div>

              <div className="space-y-4">
                
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    Select Visit Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 text-white border border-zinc-700 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    Preferred Time Slot
                  </label>
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 text-white border border-zinc-700 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm"
                  >
                    <option value="Morning Slot (10:00 AM - 1:30 PM)">Morning Slot (10:00 AM - 1:30 PM) · Includes Lunch</option>
                    <option value="Evening Slot (3:00 PM - 6:30 PM)">Evening Slot (3:00 PM - 6:30 PM) · Includes Riverside High Tea</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Adults (₹1,500)</label>
                    <div className="flex items-center rounded-xl bg-zinc-900 border border-zinc-700 p-1">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-300 font-bold hover:bg-zinc-700 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-sm text-white">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-300 font-bold hover:bg-zinc-700 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Kids 5-12 (₹800)</label>
                    <div className="flex items-center rounded-xl bg-zinc-900 border border-zinc-700 p-1">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-300 font-bold hover:bg-zinc-700 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-sm text-white">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(children + 1)}
                        className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-300 font-bold hover:bg-zinc-700 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 mt-4 space-y-1">
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>{adults} Adult(s) + {children} Child(ren)</span>
                    <span className="text-zinc-200">Date: {date}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-zinc-800">
                    <span className="text-sm font-bold text-white">Total Amount:</span>
                    <span className="text-2xl font-extrabold text-emerald-400">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleBookNow}
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black shadow-lg shadow-emerald-900/60 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Booking (₹{totalAmount.toLocaleString('en-IN')})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/918123288564?text=Hi%20Shyam!%20I%20want%20to%20reserve%20the%20Farm%20Tour%20for%20${adults}%20Adults%20and%20${children}%20Kids%20on%20${date}%20(${encodeURIComponent(slot)}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl text-xs font-semibold bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Reserve via WhatsApp Instead</span>
                </a>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
