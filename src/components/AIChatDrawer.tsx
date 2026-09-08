'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User, Feather } from 'lucide-react';

interface Message {
  role: 'assistant' | 'user';
  text: string;
}

export default function AIChatDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Namaskara. I am the Aqua Concierge. How may I assist you today regarding our estate, fresh catch, preserves, or farm tours?'
    }
  ]);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'Bangalore Delivery',
    'What is Kachampuli?',
    'Farm Tour Timings',
    'Bulk Seafood Supply'
  ];

  const handleSend = async (userText: string) => {
    if (!userText.trim() || loading) return;

    const newMsgs: Message[] = [...messages, { role: 'user', text: userText }];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: newMsgs.slice(-6)
        })
      });

      const data = await res.json();
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: data.reply || 'I am currently unable to process your request. Please contact our founder on WhatsApp at +91 81232 88564.' }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: 'Connection lost. Please reach out to Shyam directly via WhatsApp at +91 81232 88564.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-misty-ivory text-coorg-green shadow-xl shadow-coorg-green/20 border border-ink-charcoal/10 flex items-center gap-3 transition-transform duration-300 hover:scale-105 hover:bg-warm-gold cursor-pointer"
          aria-label="Open Concierge"
        >
          <Feather className="w-5 h-5" strokeWidth={1.5} />
          <span className="hidden sm:inline text-xs font-semibold tracking-widest uppercase">Concierge</span>
        </button>
      )}

      {/* Slide-in Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm h-[550px] bg-misty-ivory border border-ink-charcoal/10 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 rounded-sm">
          
          {/* Header */}
          <div className="p-5 bg-coorg-green border-b border-coorg-green-light flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl text-misty-ivory mb-0.5">
                The Concierge
              </h3>
              <span className="text-[9px] uppercase tracking-widest text-warm-gold">Aqua Ventures · Coorg</span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-misty-ivory/60 hover:text-misty-ivory transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-misty-ivory/50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-4 max-w-[85%] text-sm font-light leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-earth-clay text-misty-ivory rounded-tl-xl rounded-bl-xl rounded-tr-xl'
                      : 'bg-white text-ink-charcoal border border-ink-charcoal/5 rounded-tr-xl rounded-br-xl rounded-tl-xl shadow-sm whitespace-pre-line'
                  }`}
                >
                  {m.text}
                </div>
                <span className={`text-[9px] uppercase tracking-widest text-ink-charcoal/40 mt-1 ${m.role === 'user' ? 'mr-1' : 'ml-1'}`}>
                  {m.role === 'user' ? 'You' : 'Concierge'}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-ink-charcoal/50 text-[10px] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-earth-clay rounded-full animate-bounce" />
                <span>Composing...</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-3 bg-white border-t border-ink-charcoal/5 overflow-x-auto flex gap-2 no-scrollbar">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-medium bg-misty-ivory text-ink-charcoal hover:bg-earth-clay hover:text-misty-ivory border border-ink-charcoal/10 whitespace-nowrap cursor-pointer transition-colors rounded-sm"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-ink-charcoal/5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Inquire here..."
                className="flex-1 bg-transparent border-b border-ink-charcoal/20 pb-2 text-sm focus:outline-none focus:border-earth-clay transition-colors font-light"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 text-earth-clay disabled:opacity-30 hover:text-coorg-green transition-colors cursor-pointer"
              >
                <Send className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}
