'use client';

import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Database, MessageSquare, AlertCircle, CheckCircle2, Shield, Lock, LogOut } from 'lucide-react';
import { KBData } from '@/lib/kb';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [kb, setKb] = useState<KBData | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newNote, setNewNote] = useState('');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    const saved = sessionStorage.getItem('aqua_admin_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    fetch('/api/kb')
      .then(res => res.json())
      .then(data => setKb(data))
      .catch(err => console.error(err));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === 'admin') {
      sessionStorage.setItem('aqua_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid credentials. Please enter admin / admin.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('aqua_admin_auth');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const handleSaveKB = async () => {
    if (!kb) return;
    setLoading(true);
    try {
      const res = await fetch('/api/kb', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Basic YWRtaW46YWRtaW4='
        },
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

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen pt-36 pb-24 bg-[#080d0b] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen pt-36 pb-24 bg-[#080d0b] text-zinc-200 flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-950">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Aqua Ventures Admin</h2>
            <p className="text-xs text-zinc-400">Please sign in to access the Knowledge Base & Concierge portal.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username (e.g. admin)"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (e.g. admin)"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                required
              />
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm rounded-xl transition-colors cursor-pointer shadow-lg shadow-emerald-950/60"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-36 pb-24 bg-[#080d0b] text-zinc-200">
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

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>

            <button
              onClick={handleSaveKB}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving...' : 'Save Knowledge Base'}</span>
            </button>
          </div>
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
