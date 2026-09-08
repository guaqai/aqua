'use client';

import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Database, MessageSquare, AlertCircle, CheckCircle2, Shield } from 'lucide-react';
import { KBData } from '@/lib/kb';

export default function AdminPage() {
  const [kb, setKb] = useState<KBData | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newNote, setNewNote] = useState('');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/kb')
      .then(res => res.json())
      .then(data => setKb(data))
      .catch(err => console.error(err));
  }, []);

  const handleSaveKB = async () => {
    if (!kb) return;
    setLoading(true);
    try {
      const res = await fetch('/api/kb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(kb)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSaveStatus('Knowledge Base updated successfully! AI Concierge & Bot live refreshed.');
      } else {
        setSaveStatus('Error saving KB: ' + data.error);
      }
    } catch (e: any) {
      setSaveStatus('Network error: ' + e.message);
    } finally {
      setLoading(false);
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  const handleAddFaq = () => {
    if (!newQuestion.trim() || !newAnswer.trim() || !kb) return;
    setKb({
      ...kb,
      faqs: [...kb.faqs, { question: newQuestion.trim(), answer: newAnswer.trim() }]
    });
    setNewQuestion('');
    setNewAnswer('');
  };

  const handleDeleteFaq = (index: number) => {
    if (!kb) return;
    setKb({
      ...kb,
      faqs: kb.faqs.filter((_, i) => i !== index)
    });
  };

  const handleAddNote = () => {
    if (!newNote.trim() || !kb) return;
    setKb({
      ...kb,
      customNotes: [...kb.customNotes, newNote.trim()]
    });
    setNewNote('');
  };

  const handleDeleteNote = (index: number) => {
    if (!kb) return;
    setKb({
      ...kb,
      customNotes: kb.customNotes.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="min-h-screen py-16 bg-[#080d0b] text-zinc-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-500/30 mb-2">
              <Shield className="w-3.5 h-3.5" />
              Aqua Ventures Internal Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Knowledge Base & AI Concierge Admin
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Changes made here immediately update AquaBot web concierge and WhatsApp qualification logic.
            </p>
          </div>

          <button
            onClick={handleSaveKB}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all cursor-pointer self-start sm:self-auto disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Save Knowledge Base'}</span>
          </button>
        </div>

        {saveStatus && (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{saveStatus}</span>
          </div>
        )}

        {/* WhatsApp Remote Command Guide */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp Admin Remote Commands (+91 81232 88564)</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Founder Shyam Aiyappa can also update the bot knowledge base on-the-fly directly from WhatsApp by messaging the bot:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded-lg bg-zinc-950 text-zinc-300 border border-zinc-800">
              <code>!kb add Q: ... A: ...</code>
              <span className="block text-[10px] text-zinc-500 mt-1 font-sans">Adds new FAQ pair</span>
            </div>
            <div className="p-2 rounded-lg bg-zinc-950 text-zinc-300 border border-zinc-800">
              <code>!stock tilapia 200kg</code>
              <span className="block text-[10px] text-zinc-500 mt-1 font-sans">Updates inventory notice</span>
            </div>
            <div className="p-2 rounded-lg bg-zinc-950 text-zinc-300 border border-zinc-800">
              <code>!price marmalade 240</code>
              <span className="block text-[10px] text-zinc-500 mt-1 font-sans">Overrides product price</span>
            </div>
          </div>
        </div>

        {/* FAQ Management */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              Active Knowledge Base FAQs ({kb?.faqs?.length || 0})
            </h2>
          </div>

          <div className="space-y-3">
            {kb?.faqs?.map((faq, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start justify-between gap-4"
              >
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-white block">Q: {faq.question}</span>
                  <p className="text-zinc-400 leading-relaxed">A: {faq.answer}</p>
                </div>
                <button
                  onClick={() => handleDeleteFaq(idx)}
                  className="p-1 text-zinc-500 hover:text-red-400 flex-shrink-0 cursor-pointer"
                  title="Remove FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add FAQ Form */}
          <div className="p-5 rounded-2xl bg-zinc-900/90 border border-emerald-500/30 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Add New FAQ / Grounding Knowledge</h3>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Question (e.g. Can I freeze the momos after opening?)"
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 text-white text-xs border border-zinc-700 focus:border-emerald-500 focus:outline-none"
            />
            <textarea
              rows={3}
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Answer (e.g. Yes, keep sealed in your freezer for up to 3 months...)"
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 text-white text-xs border border-zinc-700 focus:border-emerald-500 focus:outline-none"
            />
            <button
              onClick={handleAddFaq}
              className="px-4 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add FAQ to List</span>
            </button>
          </div>
        </div>

        {/* Operational Notes */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Special Operational Notices</h2>
          <div className="space-y-2">
            {kb?.customNotes?.map((note, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between text-xs text-zinc-300"
              >
                <span>• {note}</span>
                <button
                  onClick={() => handleDeleteNote(idx)}
                  className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add operational note (e.g. Farm tour bookings closed this Sunday for harvesting)..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-zinc-950 text-white text-xs border border-zinc-700 focus:border-emerald-500 focus:outline-none"
            />
            <button
              onClick={handleAddNote}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold border border-zinc-700 cursor-pointer"
            >
              Add Note
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
