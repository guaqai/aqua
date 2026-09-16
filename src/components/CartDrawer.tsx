'use client';

import React, { useState, useEffect } from 'react';
import { X, Trash2, ArrowRight, Loader2, CheckCircle2, MessageSquare, AlertCircle, AlertTriangle } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, tourBooking, setTourBookingData, grandTotal, clearCart, selectedCity } = useCart();
  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{ paymentId: string; orderId: string; amount: number; summary: string; customerName?: string; customerPhone?: string } | null>(null);
  
  // Delivery & Customer Contact info
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentNotice, setPaymentNotice] = useState<string | null>(null);

  // Restore last completed order from session if user refreshed or navigated back
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('aqua_last_order');
      if (saved) {
        setCompletedOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to parse saved order:', e);
    }
  }, []);

  if (!isCartOpen) return null;

  const handleCheckout = async () => {
    // 0. Validate customer details
    if (!customerName.trim()) {
      setPaymentError('Please enter your full name for order tracking.');
      return;
    }
    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setPaymentError('Please enter a valid 10-digit mobile number for dispatch updates.');
      return;
    }
    if (items.length > 0 && !customerAddress.trim()) {
      setPaymentError('Please enter your delivery street address and city.');
      return;
    }

    setPaymentError(null);
    setPaymentNotice(null);
    setLoading(true);
    const amount = grandTotal;
    const summary = tourBooking
      ? `Farm Tour on ${tourBooking.date} (${tourBooking.slot}) for ${tourBooking.adults} Adults, ${tourBooking.children} Kids`
      : `${items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}`;

    try {
      // 1. Create order on server with customer metadata
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: grandTotal,
          customer: {
            name: customerName.trim(),
            phone: cleanPhone,
            address: customerAddress.trim(),
            city: selectedCity
          },
          items,
          tourBooking,
          city: selectedCity
        })
      });

      const data = await res.json();

      if (!res.ok || !data.orderId) {
        window.location.href = `/api/checkout?amount=${grandTotal}`;
        return;
      }

      // 2. Launch Razorpay modal if available
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        const options = {
          key: data.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
          amount: data.amount,
          currency: data.currency || 'INR',
          name: 'Aqua Ventures Coorg',
          description: 'Just Meen & Artisan Preserves',
          order_id: data.orderId,
          handler: function (response: any) {
            // A. Email dispatch via FormSubmit.co
            const fd = new FormData();
            fd.append('payment_id', response.razorpay_payment_id);
            fd.append('order_id', response.razorpay_order_id);
            fd.append('amount', `₹${amount.toLocaleString('en-IN')}`);
            fd.append('customer_name', customerName.trim());
            fd.append('customer_phone', cleanPhone);
            fd.append('delivery_address', customerAddress.trim() || 'Coorg / Direct Booking');
            fd.append('order_summary', summary);
            fd.append('_captcha', 'false');
            fd.append('_template', 'table');
            fd.append('_subject', `NEW PAID ORDER / TOUR: ₹${amount} (${response.razorpay_payment_id}) - ${customerName.trim()}`);

            try {
              fetch('https://formsubmit.co/ajax/aquaventures.coorg@gmail.com', {
                method: 'POST',
                body: fd,
                headers: { Accept: 'application/json' }
              });

              fetch('/api/order-notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  signature: response.razorpay_signature,
                  amount,
                  customer: {
                    name: customerName.trim(),
                    phone: cleanPhone,
                    address: customerAddress.trim()
                  },
                  items,
                  tourBooking,
                  city: selectedCity
                })
              });
            } catch (err) {
              console.error(err);
            }

            // B. Persist to session and display in-drawer completion screen
            const orderReceipt = {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              amount,
              summary,
              customerName: customerName.trim(),
              customerPhone: cleanPhone
            };
            try {
              sessionStorage.setItem('aqua_last_order', JSON.stringify(orderReceipt));
            } catch (e) {}

            setCompletedOrder(orderReceipt);
            clearCart();
            setPaymentError(null);
            setPaymentNotice(null);
          },
          prefill: {
            name: customerName.trim(),
            email: 'aquaventures.coorg@gmail.com',
            contact: cleanPhone
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
              setPaymentNotice('Payment was not completed. Your cart items are safely preserved. You can retry anytime.');
            },
            escape: true,
            backdropclose: false
          },
          theme: {
            color: '#1b3b2b'
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (resp: any) {
          setLoading(false);
          const failureReason = resp?.error?.description || resp?.error?.reason || 'Transaction could not be processed by your bank.';
          setPaymentError(`Payment failed: ${failureReason}. Your cart items are still saved.`);
        });
        rzp.open();
      } else {
        window.location.href = `/api/checkout?amount=${grandTotal}`;
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setPaymentError(err?.message || 'Unable to initialize checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-ink-charcoal/40 backdrop-blur-sm z-50 transition-opacity" 
        onClick={() => {
          setIsCartOpen(false);
          setCompletedOrder(null);
          try { sessionStorage.removeItem('aqua_last_order'); } catch (e) {}
        }}
      />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-misty-ivory shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        <div className="flex items-center justify-between p-6 bg-coorg-green border-b border-coorg-green-light">
          <h2 className="font-serif text-2xl text-misty-ivory">
            {completedOrder ? 'Order Confirmed' : 'Your Cart'}
          </h2>
          <button 
            onClick={() => {
              setIsCartOpen(false);
              setCompletedOrder(null);
              try { sessionStorage.removeItem('aqua_last_order'); } catch (e) {}
            }}
            className="p-2 text-misty-ivory/60 hover:text-misty-ivory transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {completedOrder ? (
          <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-coorg-green/10 rounded-full flex items-center justify-center mb-5">
              <CheckCircle2 className="w-8 h-8 text-coorg-green" />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-earth-clay mb-1">
              Payment Successful (Test Sandbox)
            </span>
            <h3 className="font-serif text-3xl text-coorg-green mb-3">Namaskara!</h3>
            <p className="text-sm font-light text-ink-charcoal/80 leading-relaxed mb-6">
              Your payment of <strong>₹{completedOrder.amount.toLocaleString('en-IN')}</strong> is verified.<br />
              Razorpay ID: <code className="bg-coorg-green/5 text-coorg-green px-2 py-0.5 rounded text-xs">{completedOrder.paymentId}</code>
            </p>

            <div className="p-4 bg-white border border-ink-charcoal/10 rounded-sm text-left text-xs w-full mb-6 font-light space-y-1.5">
              <div className="text-[10px] uppercase tracking-wider text-ink-charcoal/50 font-semibold mb-1">Order Summary:</div>
              <div className="text-ink-charcoal font-medium">{completedOrder.summary}</div>
              <div className="text-ink-charcoal/60 pt-1 text-[11px]">Notification dispatched to <strong>aquaventures.coorg@gmail.com</strong></div>
            </div>

            <a
              href={`https://wa.me/918123288564?text=${encodeURIComponent(`Namaskara Shyam! I have completed payment for my Aqua Ventures order.\nCustomer: ${completedOrder.customerName || 'Customer'} (${completedOrder.customerPhone || ''})\nAmount: ₹${completedOrder.amount}\nRazorpay ID: ${completedOrder.paymentId}\nOrder: ${completedOrder.summary}\nPlease confirm dispatch/booking details.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mb-3"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Receipt to Shyam on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setCompletedOrder(null);
                try { sessionStorage.removeItem('aqua_last_order'); } catch (e) {}
              }}
              className="text-xs uppercase tracking-widest font-semibold text-ink-charcoal/60 hover:text-coorg-green transition-colors mt-2"
            >
              Continue Browsing
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {items.length === 0 && !tourBooking ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                  <span className="font-serif text-2xl text-ink-charcoal mb-2">Your cart is empty</span>
                  <p className="text-sm font-light text-ink-charcoal">Explore our catalog to add items.</p>
                </div>
              ) : (
                <>
                  {items.length > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-[10px] uppercase tracking-widest font-bold text-ink-charcoal/50 border-b border-ink-charcoal/10 pb-2">Products</h3>
                      {items.map(item => (
                        <div key={item.product.id} className="flex gap-4 items-center">
                          <div className="w-20 h-20 bg-white border border-ink-charcoal/5 p-2 rounded-sm flex-shrink-0 flex items-center justify-center">
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-serif text-lg text-coorg-green leading-tight mb-1">{item.product.name}</h4>
                            <div className="text-xs font-light text-ink-charcoal/70 mb-2">₹{item.product.price} / {item.product.unit}</div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center border border-ink-charcoal/20">
                                <button onClick={() => updateQuantity(item.product.id, -1)} className="px-2 py-1 text-ink-charcoal hover:bg-earth-clay hover:text-misty-ivory transition-colors cursor-pointer">-</button>
                                <span className="px-3 text-sm font-medium">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.product.id, 1)} className="px-2 py-1 text-ink-charcoal hover:bg-earth-clay hover:text-misty-ivory transition-colors cursor-pointer">+</button>
                              </div>
                              <button onClick={() => removeFromCart(item.product.id)} className="text-ink-charcoal/40 hover:text-earth-clay transition-colors cursor-pointer p-2">
                                <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {tourBooking && (
                    <div className="space-y-6">
                      <h3 className="text-[10px] uppercase tracking-widest font-bold text-ink-charcoal/50 border-b border-ink-charcoal/10 pb-2">Experiences</h3>
                      <div className="bg-white border border-ink-charcoal/5 p-4 rounded-sm relative">
                        <button 
                          onClick={() => setTourBookingData(null)}
                          className="absolute top-4 right-4 text-ink-charcoal/40 hover:text-earth-clay transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                        <h4 className="font-serif text-lg text-coorg-green mb-1">Farm Tour & Tasting</h4>
                        <div className="text-xs font-light text-ink-charcoal/80 space-y-1 mb-3">
                          <div>Date: {tourBooking.date}</div>
                          <div>{tourBooking.slot}</div>
                          <div>{tourBooking.adults} Adults, {tourBooking.children} Kids</div>
                        </div>
                        <div className="font-medium text-ink-charcoal">₹{tourBooking.totalAmount.toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                  )}

                  {(items.length > 0 || tourBooking) && (
                    <div className="space-y-3 pt-2">
                      <h3 className="text-[10px] uppercase tracking-widest font-bold text-ink-charcoal/50 border-b border-ink-charcoal/10 pb-2">
                        {tourBooking ? 'Lead Guest & Booking Details' : 'Contact & Delivery Details'}
                      </h3>
                      <div className="space-y-2.5 text-xs">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-ink-charcoal/60 font-semibold mb-1">Full Name *</label>
                          <input
                            type="text"
                            placeholder="e.g. Ramesh Ponnappa"
                            value={customerName}
                            onChange={e => {
                              setCustomerName(e.target.value);
                              if (paymentError) setPaymentError(null);
                            }}
                            className="w-full bg-white border border-ink-charcoal/20 rounded-sm px-3 py-2 text-ink-charcoal placeholder:text-ink-charcoal/30 focus:outline-none focus:border-coorg-green"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-ink-charcoal/60 font-semibold mb-1">10-Digit Mobile / WhatsApp *</label>
                          <input
                            type="tel"
                            placeholder="e.g. 9845012345"
                            value={customerPhone}
                            onChange={e => {
                              setCustomerPhone(e.target.value);
                              if (paymentError) setPaymentError(null);
                            }}
                            className="w-full bg-white border border-ink-charcoal/20 rounded-sm px-3 py-2 text-ink-charcoal placeholder:text-ink-charcoal/30 focus:outline-none focus:border-coorg-green"
                          />
                        </div>
                        {items.length > 0 && (
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-ink-charcoal/60 font-semibold mb-1">Street Address & City *</label>
                            <input
                              type="text"
                              placeholder="e.g. #14 Plantation Road, Madikeri"
                              value={customerAddress}
                              onChange={e => {
                                setCustomerAddress(e.target.value);
                                if (paymentError) setPaymentError(null);
                              }}
                              className="w-full bg-white border border-ink-charcoal/20 rounded-sm px-3 py-2 text-ink-charcoal placeholder:text-ink-charcoal/30 focus:outline-none focus:border-coorg-green"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {grandTotal > 0 && (
              <div className="p-6 bg-white border-t border-ink-charcoal/5">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-ink-charcoal/60">Subtotal</span>
                  <span className="font-serif text-3xl text-coorg-green">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
                
                {paymentNotice && (
                  <div className="mb-3 p-3 bg-warm-gold/15 border border-warm-gold/40 rounded-sm text-xs text-ink-charcoal flex items-start gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-warm-gold flex-shrink-0 mt-0.5" />
                    <span>{paymentNotice}</span>
                  </div>
                )}

                {paymentError && (
                  <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-sm text-xs text-red-800 flex items-start gap-2 animate-in fade-in">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{paymentError}</span>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full py-4 bg-coorg-green text-misty-ivory text-xs uppercase tracking-widest font-semibold hover:bg-earth-clay transition-colors flex items-center justify-center gap-2 cursor-pointer mb-3 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Connecting Razorpay...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed to Razorpay Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center">
                  <a
                    href={`https://wa.me/918123288564?text=Hi!%20I%20have%20an%20order%20for%20₹${grandTotal}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-widest font-medium text-ink-charcoal/50 hover:text-earth-clay transition-colors"
                  >
                    Or order directly via WhatsApp
                  </a>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </>
  );
}
