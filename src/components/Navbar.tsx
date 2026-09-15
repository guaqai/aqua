'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function Navbar() {
  const { totalItemCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-misty-ivory/95 backdrop-blur-md shadow-sm py-4' : 'bg-gradient-to-b from-coorg-green/90 via-coorg-green/40 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/aqua_logo.png" 
              alt="Aqua Ventures" 
              className="w-10 h-10 object-contain rounded-full bg-misty-ivory p-0.5 border border-warm-gold/40 shadow-sm transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className={`font-serif text-2xl md:text-3xl font-semibold tracking-wide transition-colors duration-300 ${
                scrolled ? 'text-coorg-green' : 'text-misty-ivory'
              }`}>
                Aqua Ventures
              </span>
              <span className={`text-[10px] uppercase tracking-[0.25em] font-medium mt-0.5 transition-colors duration-300 ${
                scrolled ? 'text-earth-clay' : 'text-warm-gold'
              }`}>
                Siddapur, Coorg
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {['Catalog', 'Cold-Chain', 'Tour', 'B2B', 'About'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-200 relative group ${
                  scrolled ? 'text-ink-charcoal/80 hover:text-earth-clay' : 'text-misty-ivory/90 hover:text-warm-gold'
                }`}
              >
                {item === 'Cold-chain' ? 'Delivery' : item}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                  scrolled ? 'bg-earth-clay' : 'bg-warm-gold'
                }`}></span>
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-6">
            
            <a
              href="https://wa.me/918123288564"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden lg:flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-colors group ${
                scrolled ? 'text-coorg-green hover:text-earth-clay' : 'text-warm-gold hover:text-misty-ivory'
              }`}
            >
              <span>Concierge</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 transition-colors flex items-center gap-2 cursor-pointer ${
                scrolled ? 'text-ink-charcoal hover:text-coorg-green' : 'text-misty-ivory hover:text-warm-gold'
              }`}
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" strokeWidth={1.5} />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-misty-ivory bg-earth-clay rounded-full">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 ${scrolled ? 'text-ink-charcoal' : 'text-misty-ivory'}`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col space-y-4 pt-4 pb-6 border-t border-misty-ivory/20 bg-coorg-green px-4 text-misty-ivory">
            {['Catalog', 'Cold-Chain', 'Tour', 'B2B', 'About'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest font-medium text-misty-ivory/90 hover:text-warm-gold"
              >
                {item}
              </a>
            ))}
            <div className="pt-4 mt-2 border-t border-misty-ivory/20">
              <a
                href="https://wa.me/918123288564"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between px-4 py-3 bg-warm-gold text-coorg-green text-xs uppercase tracking-widest font-semibold"
              >
                <span>WhatsApp Concierge</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
