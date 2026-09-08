'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050806] border-t border-emerald-950/80 pt-16 pb-12 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-lg border border-emerald-400/30">
                AV
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-tight">AQUA VENTURES</span>
                <span className="text-xs text-emerald-400 uppercase tracking-widest font-semibold">Just Meen · Coorg</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Integrated aqua-farming, recirculating aquaculture systems, hydroponics, apiculture, and artisan Kodava culinary preserves in Siddapur, Coorg. Founded in 2014 by Shyam Aiyappa and Pattada Namitha.
            </p>

            <div className="text-xs text-zinc-500 space-y-1">
              <div>FSSAI Registered · Sustainable Agri-Tourism Facility</div>
              <div>Operating across Bangalore, Mysore, Mangalore & Coorg</div>
            </div>
          </div>

          {/* Catalog Quicklinks */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Product Catalog</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#catalog" className="hover:text-emerald-400 transition-colors">Just Meen Tilapia Fillets</a></li>
              <li><a href="#catalog" className="hover:text-emerald-400 transition-colors">Cleaned & Deveined Prawns (IQF)</a></li>
              <li><a href="#catalog" className="hover:text-emerald-400 transition-colors">Kaipuli Bitter Lime Marmalade</a></li>
              <li><a href="#catalog" className="hover:text-emerald-400 transition-colors">Authentic Coorg Kachampuli</a></li>
              <li><a href="#catalog" className="hover:text-emerald-400 transition-colors">Handcrafted Fish Momos & Tikka</a></li>
              <li><a href="#catalog" className="hover:text-emerald-400 transition-colors">Vinessence Sprouted Millet Pastas</a></li>
            </ul>
          </div>

          {/* Farm Tourism & B2B */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Experiences & B2B</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#tour" className="hover:text-emerald-400 transition-colors">Farm Tour & Tasting (₹1,500)</a></li>
              <li><a href="#b2b" className="hover:text-emerald-400 transition-colors">Commercial Fish Fingerlings</a></li>
              <li><a href="#b2b" className="hover:text-emerald-400 transition-colors">Resort & Restaurant Supply</a></li>
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">Founders & Agro-Ecology</a></li>
              <li><Link href="/admin" className="text-emerald-500/80 hover:text-emerald-400 transition-colors">Admin Knowledge Portal</Link></li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Farm Location & Contact</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Aqua Ventures, Guyya Village, Siddapur, Kodagu (Coorg), Karnataka – 571253</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="tel:+918123288564" className="hover:text-white transition-colors">+91 81232 88564 / 97317 84873</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="mailto:aquaventures.coorg@gmail.com" className="hover:text-white transition-colors">aquaventures.coorg@gmail.com</a>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/918123288564"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 text-xs font-semibold hover:bg-[#25D366]/30 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Shyam Directly</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div>
            © {new Date().getFullYear()} Aqua Ventures Coorg. All rights reserved. Just Meen is a registered brand.
          </div>
          <div className="flex items-center gap-4">
            <a href="#cold-chain" className="hover:text-zinc-400">Cold-Chain Guarantee</a>
            <span>·</span>
            <a href="#tour" className="hover:text-zinc-400">Agritourism Guidelines</a>
            <span>·</span>
            <Link href="/admin" className="hover:text-zinc-400">Staff & Admin</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
