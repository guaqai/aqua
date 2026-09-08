'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface TourBookingItem {
  date: string;
  slot: string;
  adults: number;
  children: number;
  totalAmount: number;
}

interface CartContextType {
  items: CartItem[];
  tourBooking: TourBookingItem | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  setTourBookingData: (tour: TourBookingItem | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItemCount: number;
  subtotal: number;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  deliveryFee: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [tourBooking, setTourBooking] = useState<TourBookingItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Bangalore');

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aqua_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aqua_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems(prev =>
      prev
        .map(i => {
          if (i.product.id === productId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
    setTourBooking(null);
  };

  const setTourBookingData = (tour: TourBookingItem | null) => {
    setTourBooking(tour);
    if (tour) setIsCartOpen(true);
  };

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0) + (tourBooking ? 1 : 0);
  const productsSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tourTotal = tourBooking ? tourBooking.totalAmount : 0;
  const subtotal = productsSubtotal + tourTotal;

  // Delivery fee logic
  let deliveryFee = 0;
  if (items.length > 0) {
    if (selectedCity === 'Bangalore') {
      deliveryFee = productsSubtotal >= 1500 ? 0 : 150;
    } else if (selectedCity === 'Mysore') {
      deliveryFee = productsSubtotal >= 1200 ? 0 : 100;
    } else if (selectedCity === 'Mangalore') {
      deliveryFee = productsSubtotal >= 1500 ? 0 : 180;
    } else if (selectedCity === 'Coorg') {
      deliveryFee = productsSubtotal >= 800 ? 0 : 60;
    } else {
      deliveryFee = productsSubtotal >= 2000 ? 0 : 200;
    }
  }

  const grandTotal = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        tourBooking,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setTourBookingData,
        isCartOpen,
        setIsCartOpen,
        totalItemCount,
        subtotal,
        selectedCity,
        setSelectedCity,
        deliveryFee,
        grandTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
