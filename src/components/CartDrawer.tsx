'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, MapPin, MessageSquare, AlertCircle } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CartDrawer() {
  const {
    items,
    tourBooking,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    setTourBookingData,
    subtotal,
    selectedCity,
    setSelectedCity,
    deliveryFee,
    grandTotal
  } = useCart();

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<any | null>(null);

  if (!isCartOpen) return null;

  const handleRazorpayPayment = async () => {
    if (!customerInfo.name || !customerInfo.phone) {
      setError('Please provide your name and WhatsApp phone number.');
      return;
    }
    if (items.length > 0 && !customerInfo.address) {
      setError('Please provide your delivery address.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      // 1. Create order on backend
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: grandTotal,
          customer: customerInfo,
          city: selectedCity,
          items: items.map(i => ({
            id: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity
          })),
          tourBooking
        })
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.orderId) {
        throw new Error(orderData.error || 'Failed to initiate order.');
      }

      // 2. Open Razorpay modal
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay SDK loading... Please wait 2 seconds and try again.');
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: 'INR',
        name: 'Aqua Ventures Coorg',
        description: 'Just Meen & Farm Harvest Order',
        order_id: orderData.orderId,
        prefill: {
          name: customerInfo.name,
          contact: customerInfo.phone,
          email: 'order@aquaventures.coorg'
        },
        theme: {
          color: '#10b981'
        },
        handler: function (response: any) {
          setOrderSuccess({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id
          });
          clearCart();
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setError(err.message || 'Payment initiation failed. You can order directly on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppOrderText = () => {
    let text = `Hi Aqua Ventures! I want to confirm my order:\n\n`;
    if (items.length > 0) {
      text += `*ITEMS:*\n`;
      items.forEach(i => {
        text += `- ${i.product.name} (${i.product.unit}) x ${i.quantity} = ₹${i.product.price * i.quantity}\n`;
      });
      text += `\n*Delivery City:* ${selectedCity}\n`;
      text += `*Delivery Fee:* ₹${deliveryFee}\n`;
    }
    if (tourBooking) {
      text += `\n*FARM TOUR RESERVATION:*\n`;
      text += `- Date: ${tourBooking.date}\n`;
      text += `- Slot: ${tourBooking.slot}\n`;
      text += `- Guests: ${tourBooking.adults} Adults, ${tourBooking.children} Kids\n`;
      text += `- Tour Total: ₹${tourBooking.totalAmount}\n`;
    }
    text += `\n*GRAND TOTAL: ₹${grandTotal}*\n\n`;
    if (customerInfo.name) text += `*Name:* ${customerInfo.name}\n`;
    if (customerInfo.phone) text += `*Phone:* ${customerInfo.phone}\n`;
    if (customerInfo.address) text += `*Address:* ${customerInfo.address}\n`;
    return encodeURIComponent(text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0b120e] border-l border-emerald-950 flex flex-col shadow-2xl">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">Your Harvest Cart</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {orderSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white">Payment Successful!</h3>
                <p className="text-xs text-zinc-300 leading-relaxed max-w-xs mx-auto">
                  Thank you! Your order has been placed with Aqua Ventures. Payment ID: <code className="text-emerald-400">{orderSuccess.paymentId}</code>.
                  We are preparing your insulated cold-chain shipment.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setOrderSuccess(null);
                      setIsCartOpen(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : items.length === 0 && !tourBooking ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
                <p className="text-sm text-zinc-400">Your cart is currently empty.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2 rounded-xl bg-zinc-900 text-emerald-400 text-xs font-semibold border border-zinc-800"
                >
                  Explore Fresh Harvest
                </button>
              </div>
            ) : (
              <>
                {/* Product Items */}
                {items.map(item => (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-3.5"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 object-contain rounded-xl bg-zinc-950 p-1 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                      <span className="text-[11px] text-zinc-400 block">{item.product.unit} · ₹{item.product.price}</span>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center rounded-lg bg-zinc-950 border border-zinc-800 p-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="w-5 h-5 rounded text-zinc-400 hover:text-white flex items-center justify-center text-xs"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="w-5 h-5 rounded text-zinc-400 hover:text-white flex items-center justify-center text-xs"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs font-bold text-emerald-400 ml-auto">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-zinc-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Tour Booking Item (if added) */}
                {tourBooking && (
                  <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-amber-400">Experience Booking</span>
                        <h4 className="text-xs font-bold text-white">Integrated Farm Tour & Tasting</h4>
                      </div>
                      <button
                        onClick={() => setTourBookingData(null)}
                        className="text-zinc-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-zinc-300 space-y-0.5">
                      <div>Date: <strong className="text-white">{tourBooking.date}</strong></div>
                      <div>Slot: {tourBooking.slot}</div>
                      <div>Guests: {tourBooking.adults} Adults, {tourBooking.children} Kids</div>
                    </div>
                    <div className="pt-2 border-t border-amber-900/40 flex justify-between text-xs font-bold">
                      <span className="text-zinc-400">Tour Total:</span>
                      <span className="text-amber-300">₹{tourBooking.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                )}

                {/* City & Delivery Selector */}
                {items.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                    <label className="block text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      Select Delivery City (Cold Chain)
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 text-white text-xs border border-zinc-700 focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="Bangalore">Bangalore (Free &gt; ₹1,500 | Below: ₹150)</option>
                      <option value="Mysore">Mysore (Free &gt; ₹1,200 | Below: ₹100)</option>
                      <option value="Mangalore">Mangalore (Free &gt; ₹1,500 | Below: ₹180)</option>
                      <option value="Coorg">Coorg (Free &gt; ₹800 | Below: ₹60)</option>
                      <option value="Pan-India">Other India Pin Code (Dry Preserves/Honey only)</option>
                    </select>
                  </div>
                )}

                {/* Customer Checkout Info */}
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2.5">
                  <span className="text-xs font-semibold text-zinc-300 block">Contact & Delivery Address</span>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    placeholder="Full Name *"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 text-white text-xs border border-zinc-700 focus:border-emerald-500 focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="WhatsApp Phone Number *"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 text-white text-xs border border-zinc-700 focus:border-emerald-500 focus:outline-none"
                  />
                  {items.length > 0 && (
                    <textarea
                      rows={2}
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      placeholder="Delivery Street Address, Apartment, Area, Pincode *"
                      className="w-full px-3 py-1.5 rounded-xl bg-zinc-950 text-white text-xs border border-zinc-700 focus:border-emerald-500 focus:outline-none"
                    />
                  )}
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </>
            )}

          </div>

          {/* Drawer Footer with Checkout */}
          {!orderSuccess && (items.length > 0 || tourBooking) && (
            <div className="p-5 border-t border-zinc-800 bg-zinc-950 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-zinc-200">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {items.length > 0 && (
                  <div className="flex justify-between text-zinc-400">
                    <span>Cold-Chain Insulated Shipping</span>
                    <span className={deliveryFee === 0 ? 'text-emerald-400 font-semibold' : 'text-zinc-200'}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Grand Total</span>
                  <span className="text-emerald-400 text-lg">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Razorpay Online Checkout */}
              <button
                type="button"
                onClick={handleRazorpayPayment}
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black shadow-lg shadow-emerald-950/60 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Opening Secure Razorpay...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay Online via Razorpay (₹{grandTotal.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>

              {/* WhatsApp Checkout Fallback */}
              <a
                href={`https://wa.me/918123288564?text=${getWhatsAppOrderText()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm & Pay via WhatsApp</span>
              </a>

              <div className="text-[10px] text-zinc-500 text-center flex items-center justify-center gap-2">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>256-bit Encrypted Checkout · Razorpay UPI / Cards</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
