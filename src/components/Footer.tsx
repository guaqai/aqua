'use client';

import React from 'react';
import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-coorg-green border-t border-coorg-green-light pt-20 pb-12 text-misty-ivory/80 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-misty-ivory/15">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <img src="/aqua_logo.png" alt="Aqua Ventures" className="w-8 h-8 rounded-full bg-misty-ivory p-0.5" />
                <span className="font-serif text-2xl text-misty-ivory font-semibold block tracking-wide">
                  Aqua Ventures
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-warm-gold font-medium block">
                Parent Company · Guyya, Siddapur, Coorg
              </span>
            </div>

            <p className="text-xs text-misty-ivory/75 font-light leading-relaxed max-w-sm">
              Closed-loop recirculating aquaculture, hydroponics, and Kodagu artisan preserves. Founded by Shyam Aiyappa, Pattada Namitha, Mukul Appaiah, and Naina Ballachanda.
            </p>

            <div className="text-[11px] text-misty-ivory/60 space-y-1 font-light pt-1">
              <div>FSSAI Lic. No. 11223319000027 · Zero-Waste Circular Eco-Sanctuary</div>
              <div>Sub-zero cold-chain express & nationwide ambient dispatch</div>
            </div>
          </div>

          {/* Dedicated Brands & Quicklinks */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-warm-gold">Our D2C Brands</h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li><a href="#catalog" className="hover:text-warm-gold transition-colors"><strong>Just Meen:</strong> Tilapia Fillets & Prawns</a></li>
              <li><a href="#catalog" className="hover:text-warm-gold transition-colors"><strong>Just Homemade:</strong> Kachampuli & Preserves</a></li>
              <li><a href="#catalog" className="hover:text-warm-gold transition-colors"><strong>Just Fresh:</strong> Hydroponic Greens & Pesto</a></li>
              <li><a href="#catalog" className="hover:text-warm-gold transition-colors"><strong>Just Grow:</strong> Liquid Fish Fertilizer</a></li>
              <li><a href="#cold-chain" className="hover:text-warm-gold transition-colors">Sub-Zero Certified Logistics</a></li>
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
          </div>
        </div>

      </div>
    </footer>
  );
}
