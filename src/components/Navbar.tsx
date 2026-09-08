'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, MessageSquare, Phone, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function Navbar() {
  const { totalItemCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-emerald-950/60 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-800 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform duration-200 border border-emerald-400/30">
              AV
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                AQUA VENTURES
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-500/30">
                  COORG
                </span>
              </span>
              <span className="text-[11px] font-medium text-emerald-400/80 tracking-widest uppercase">
                Just Meen · Est. 2014
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#catalog" className="text-sm font-medium text-zinc-300 hover:text-emerald-400 transition-colors">
              Product Catalog
            </a>
            <a href="#cold-chain" className="text-sm font-medium text-zinc-300 hover:text-emerald-400 transition-colors">
              Delivery Zones
            </a>
            <a href="#tour" className="text-sm font-medium text-zinc-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Farm Tour & Tasting
            </a>
            <a href="#b2b" className="text-sm font-medium text-zinc-300 hover:text-emerald-400 transition-colors">
              B2B & Fingerlings
            </a>
            <a href="#about" className="text-sm font-medium text-zinc-300 hover:text-emerald-400 transition-colors">
              Our Story
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* WhatsApp Quick Order Link */}
            <a
              href="https://wa.me/918123288564?text=Hi%20Aqua%20Ventures!%20I%20would%20like%20to%20place%20an%20order%20or%20inquire%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 border border-[#25D366]/30 transition-all duration-200"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>+91 81232 88564</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 transition-all duration-200 flex items-center gap-2"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <span className="hidden sm:inline text-xs font-semibold">Cart</span>
              {totalItemCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-black bg-emerald-400 rounded-full animate-pulse">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-900/60 border border-zinc-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-emerald-950/80 space-y-3">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-200 hover:bg-emerald-950/40 hover:text-emerald-400"
            >
              Product Catalog
            </a>
            <a
              href="#cold-chain"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-200 hover:bg-emerald-950/40 hover:text-emerald-400"
            >
              Delivery Zones (Blr / Mys / Mlr / Coorg)
            </a>
            <a
              href="#tour"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-200 hover:bg-emerald-950/40 hover:text-emerald-400"
            >
              Farm Tour & Tasting (₹1,500)
            </a>
            <a
              href="#b2b"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-200 hover:bg-emerald-950/40 hover:text-emerald-400"
            >
              B2B & Commercial Fingerlings
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-200 hover:bg-emerald-950/40 hover:text-emerald-400"
            >
              Our Story & Founders
            </a>
            <div className="pt-2">
              <a
                href="https://wa.me/918123288564"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-[#25D366] text-black font-bold"
              >
                <MessageSquare className="w-4 h-4" />
                Chat with Founder on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
