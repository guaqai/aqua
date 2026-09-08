'use client';

import React, { useState } from 'react';
import { B2B_FINGERLINGS } from '@/data/products';
import { Building2, Fish, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

export default function B2BEnquirySection() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    location: '',
    interest: 'Commercial Fingerlings (Catla / Rohu / Carp / Murrel)',
    quantity: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please provide your name and WhatsApp phone number.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/b2b-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to submit. Please contact directly on WhatsApp.');
      }
    } catch (err: any) {
      setError('Network error. You can directly message founder Shyam at +91 81232 88564.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="b2b" className="py-20 bg-zinc-950 border-t border-emerald-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-500/30 mb-3">
            <Building2 className="w-3.5 h-3.5" />
            Commercial Aquaculture & Hospitality Supply
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bulk Supply & Fish Fingerlings Portal
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            Are you a resort, luxury hotel, restaurant chain, or fish farmer? We provide commercial fingerling supplies with aquaculture advisory, plus contracted bulk cold-chain fish shipments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-5">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Fish className="w-5 h-5 text-emerald-400" />
                Commercial Fingerling Varieties
              </h3>
              <p className="text-xs text-zinc-400">
                Pathogen-screened nursery fingerlings with high survival rates and technical stocking guidance by founder Shyam Aiyappa.
              </p>

              <div className="space-y-3 pt-2">
                {B2B_FINGERLINGS.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.species}</h4>
                      <span className="text-[11px] text-zinc-400 block mt-0.5">{item.description}</span>
                      <span className="text-[10px] text-emerald-400/90 font-medium mt-1 inline-block">Min: {item.minOrder}</span>
                    </div>
                    <div className="text-right flex-shrink-0 pl-3">
                      <span className="text-base font-extrabold text-white">{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-zinc-300">
                ⚡ <strong className="text-white">Resort & Restaurant Contracts:</strong> We supply cleaned blast-frozen boneless fillets and colossal prawns in 10kg – 500kg weekly scheduled dispatches to Bangalore, Mysore, and Mangalore.
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/30 relative">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto">
                    A high-priority alert has been dispatched to founder <strong className="text-white">Shyam Aiyappa (+91 81232 88564)</strong>. We will contact you shortly via WhatsApp or phone with wholesale pricing and logistical scheduling.
                  </p>
                  <div className="pt-4">
                    <a
                      href="https://wa.me/918123288564"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-black font-bold text-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Chat with Shyam on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-zinc-800 pb-3">
                    <h3 className="text-lg font-bold text-white">Direct Bulk / B2B Inquiry</h3>
                    <p className="text-xs text-zinc-400">Alerts founder Shyam immediately for human-in-the-loop handoff</p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rohith Muthappa"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 text-white text-xs border border-zinc-700 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Business / Farm Name</label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Coorg Heritage Resort"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 text-white text-xs border border-zinc-700 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">WhatsApp Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 text-white text-xs border border-zinc-700 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">City / Location *</label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Bangalore / Madikeri / Mysore"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 text-white text-xs border border-zinc-700 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Primary Requirement</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 text-white text-xs border border-zinc-700 focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="Commercial Fingerlings (Catla / Rohu / Carp / Murrel)">Commercial Fingerlings (Catla / Rohu / Carp / Murrel)</option>
                      <option value="Bulk Tilapia Boneless Fillets (Restaurant/Hotel)">Bulk Tilapia Boneless Fillets (Restaurant/Hotel)</option>
                      <option value="Colossal Prawns Wholesale">Colossal Prawns Wholesale</option>
                      <option value="Artisan Preserves & Marmalades Wholesale">Artisan Preserves & Marmalades Wholesale</option>
                      <option value="Aquaculture Consultancy & Pond Setup">Aquaculture Consultancy & Pond Setup</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Estimated Quantity / Volume</label>
                    <input
                      type="text"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder="e.g. 5,000 fingerlings or 25kg/week fillets"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 text-white text-xs border border-zinc-700 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Additional Notes / Specifications</label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Share details about pond size, delivery schedule, or requirements..."
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 text-white text-xs border border-zinc-700 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black shadow-lg shadow-emerald-950/60 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending Alert to Founder...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit B2B Lead for Direct Founder Call</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
