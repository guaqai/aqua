'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-coorg-green border-t border-coorg-green-light pt-20 pb-12 text-misty-ivory/80 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-misty-ivory/15">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <span className="font-serif text-3xl text-misty-ivory font-semibold block tracking-wide">
                Aqua Ventures
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-warm-gold font-medium mt-1 block">
                Just Meen · Est. 2014
              </span>
            </div>

            <p className="text-xs text-misty-ivory/75 font-light leading-relaxed max-w-sm">
              Integrated spring-water aquaculture, recirculating raceways, hydroponics, and traditional Kodava artisan preserves in Siddapur, Coorg. Founded by Shyam Aiyappa and Pattada Namitha.
            </p>

            <div className="text-[11px] text-misty-ivory/60 space-y-1 font-light pt-2">
              <div>FSSAI Registered · Eco-Agro Sustainable Sanctuary</div>
              <div>Sub-zero refrigerated runs to Bangalore, Mysore, Mangalore & Coorg</div>
            </div>
          </div>

          {/* Catalog Quicklinks */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-warm-gold">Offerings</h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li><a href="#catalog" className="hover:text-warm-gold transition-colors">Spring-Water Tilapia Fillets</a></li>
              <li><a href="#catalog" className="hover:text-warm-gold transition-colors">Cleaned & Deveined Prawns</a></li>
              <li><a href="#catalog" className="hover:text-warm-gold transition-colors">Wild Kaipuli Marmalade</a></li>
              <li><a href="#catalog" className="hover:text-warm-gold transition-colors">Wood-Fired Pure Kachampuli</a></li>
              <li><a href="#catalog" className="hover:text-warm-gold transition-colors">Handcrafted Fish Momos & Tikka</a></li>
              <li><a href="#catalog" className="hover:text-warm-gold transition-colors">Vinessence Sprouted Millets</a></li>
            </ul>
          </div>

          {/* Experiences & B2B */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-warm-gold">Experiences</h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li><a href="#tour" className="hover:text-warm-gold transition-colors">Farm Tour & Tasting (₹1,500)</a></li>
              <li><a href="#b2b" className="hover:text-warm-gold transition-colors">Commercial Fingerlings</a></li>
              <li><a href="#b2b" className="hover:text-warm-gold transition-colors">Resort Wholesale Supply</a></li>
              <li><a href="#about" className="hover:text-warm-gold transition-colors">Our Agro-Ecology Story</a></li>
              <li><Link href="/admin" className="text-warm-gold/80 hover:text-warm-gold transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-warm-gold">Estate Contact</h4>
            <div className="space-y-3 text-xs font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-warm-gold mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">Guyya Village, Siddapur, Kodagu (Coorg), Karnataka – 571253</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-warm-gold flex-shrink-0" />
                <a href="tel:+918123288564" className="hover:text-warm-gold transition-colors">+91 81232 88564 / 97317 84873</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-warm-gold flex-shrink-0" />
                <a href="mailto:aquaventures.coorg@gmail.com" className="hover:text-warm-gold transition-colors">aquaventures.coorg@gmail.com</a>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/918123288564"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-warm-gold text-coorg-green text-xs font-semibold tracking-wider uppercase hover:bg-misty-ivory transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-misty-ivory/50 gap-4 font-light">
          <div>
            © {new Date().getFullYear()} Aqua Ventures Coorg. All rights reserved. Just Meen is a registered trademark.
          </div>
          <div className="flex items-center gap-4">
            <a href="#cold-chain" className="hover:text-warm-gold">Cold-Chain Guarantee</a>
            <span>·</span>
            <a href="#tour" className="hover:text-warm-gold">Agritourism Guidelines</a>
            <span>·</span>
            <Link href="/admin" className="hover:text-warm-gold">Staff Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
