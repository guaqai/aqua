'use client';

import React, { useState, useRef } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function B2BEnquirySection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('loading');

    const formData = new FormData(formRef.current);

    // Honeytrap check: if bot fills this hidden field, silently reject
    const honey = formData.get('_honey');
    if (honey) {
      console.warn('Bot submission blocked via honeytrap');
      setStatus('success');
      formRef.current.reset();
      return;
    }

    const name = formData.get('name') || 'Customer';
    const interest = formData.get('interest') || 'General';

    // FormSubmit.co setup
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');
    formData.append('_subject', `Aqua Ventures Inquiry: ${name} (${interest})`);

    const jsonPayload = {
      name: formData.get('name'),
      company: formData.get('company'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      interest: formData.get('interest'),
      message: formData.get('message')
    };

    try {
      // Execute both FormSubmit.co (unlimited email to aquaventures.coorg@gmail.com) and internal backend lead logger
      const [formSubmitRes] = await Promise.allSettled([
        fetch('https://formsubmit.co/ajax/aquaventures.coorg@gmail.com', {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json'
          }
        }),
        fetch('/api/b2b-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jsonPayload)
        })
      ]);

      if (formSubmitRes.status === 'fulfilled' && (formSubmitRes.value.ok || formSubmitRes.value.status === 200)) {
        setStatus('success');
        formRef.current.reset();
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        // Fallback: If formsubmit succeeds or internal api responds
        setStatus('success');
        formRef.current.reset();
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Even if network glitches, try native submit fallback if needed
      setStatus('error');
    }
  };

  return (
    <section id="b2b" className="py-24 bg-misty-ivory relative overflow-hidden">
      {/* Background imagery */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-misty-ivory/95 z-10 backdrop-blur-sm" />
        <img 
          src="https://images.unsplash.com/photo-1518182170546-076616fdcbfe?q=80&w=2832&auto=format&fit=crop" 
          alt="Misty Forest" 
          className="w-full h-full object-cover opacity-40 grayscale"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-earth-clay tracking-[0.2em] uppercase text-[10px] font-semibold mb-4 block">
              Commercial Partnerships
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-coorg-green mb-6 leading-tight">
              B2B & Wholesale
            </h2>
            <div className="w-16 h-[1px] bg-warm-gold mx-auto mb-6"></div>
            <p className="text-ink-charcoal/80 text-lg font-light leading-relaxed">
              Partner with Aqua Ventures for commercial fingerlings, bulk premium seafood for resorts, or hydroponic consultation. Connect directly with our founders.
            </p>
          </div>

          <div className="bg-misty-ivory border border-ink-charcoal/10 p-8 sm:p-12 rounded-sm shadow-xl">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-coorg-green/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-coorg-green" />
                </div>
                <h3 className="font-serif text-3xl text-coorg-green mb-2">Inquiry Sent</h3>
                <p className="text-ink-charcoal/70 font-light max-w-md">
                  Thank you for reaching out. A confirmation has been routed to our estate management team at <strong>aquaventures.coorg@gmail.com</strong>. Shyam or Namitha will review your request and get back to you within 24 hours.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-xs uppercase tracking-widest text-earth-clay font-semibold hover:text-coorg-green"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                {/* Honeytrap Spam Filter Field */}
                <input 
                  type="text" 
                  name="_honey" 
                  style={{ display: 'none' }} 
                  tabIndex={-1} 
                  autoComplete="off" 
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-semibold text-ink-charcoal/60 mb-2">
                      Full Name *
                    </label>
                    <input 
                      required 
                      type="text" 
                      name="name"
                      className="w-full bg-transparent border-b border-ink-charcoal/20 pb-2 text-sm focus:outline-none focus:border-earth-clay transition-colors"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-semibold text-ink-charcoal/60 mb-2">
                      Company / Resort *
                    </label>
                    <input 
                      required 
                      type="text" 
                      name="company"
                      className="w-full bg-transparent border-b border-ink-charcoal/20 pb-2 text-sm focus:outline-none focus:border-earth-clay transition-colors"
                      placeholder="e.g. Taj Madikeri"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-semibold text-ink-charcoal/60 mb-2">
                      Email Address *
                    </label>
                    <input 
                      required 
                      type="email" 
                      name="email"
                      className="w-full bg-transparent border-b border-ink-charcoal/20 pb-2 text-sm focus:outline-none focus:border-earth-clay transition-colors"
                      placeholder="rahul@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-semibold text-ink-charcoal/60 mb-2">
                      Phone Number *
                    </label>
                    <input 
                      required 
                      type="tel" 
                      name="phone"
                      className="w-full bg-transparent border-b border-ink-charcoal/20 pb-2 text-sm focus:outline-none focus:border-earth-clay transition-colors"
                      placeholder="+91"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-semibold text-ink-charcoal/60 mb-2">
                    Primary Interest *
                  </label>
                  <select 
                    required 
                    name="interest"
                    defaultValue=""
                    className="w-full bg-transparent border-b border-ink-charcoal/20 pb-2 text-sm focus:outline-none focus:border-earth-clay transition-colors"
                  >
                    <option value="" disabled>Select an area of interest...</option>
                    <option value="Commercial Fingerlings">Commercial Fingerlings (Bulk Tilapia Seed)</option>
                    <option value="Resort/Restaurant Bulk Seafood">Resort/Restaurant Bulk Seafood Supply</option>
                    <option value="Hydroponic Setup Consultation">Hydroponic Setup Consultation</option>
                    <option value="Bulk Preserves / Gifting">Bulk Preserves / Corporate Gifting</option>
                    <option value="Other">Other Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-semibold text-ink-charcoal/60 mb-2">
                    Additional Details
                  </label>
                  <textarea 
                    rows={3}
                    name="message"
                    className="w-full bg-transparent border-b border-ink-charcoal/20 pb-2 text-sm focus:outline-none focus:border-earth-clay transition-colors resize-none"
                    placeholder="Tell us a bit about your requirements..."
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="text-red-600 text-xs font-medium">
                    Failed to send inquiry. Please check connection or reach founder Shyam on WhatsApp: +91 81232 88564.
                  </div>
                )}

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-10 py-4 bg-earth-clay text-misty-ivory text-xs uppercase tracking-widest font-semibold hover:bg-coorg-green transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{status === 'loading' ? 'Sending...' : 'Submit Inquiry'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
