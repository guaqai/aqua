'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Phone } from 'lucide-react';

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
      text: 'Namaskara! I am AquaBot, the AI concierge for Aqua Ventures Coorg & Just Meen. How can I help you today with our fresh spring-water fish, authentic Coorg preserves, cold-chain delivery, or farm tours?'
    }
  ]);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'Is your Tilapia muddy or smelly?',
    'How does delivery to Bangalore work?',
    'How do I use Kachampuli?',
    'Farm Tour details & timings',
    'I want commercial fish fingerlings'
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
        { role: 'assistant', text: data.reply || 'Sorry, I am having trouble connecting right now. Please reach out to founder Shyam on WhatsApp at +91 81232 88564.' }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: 'Network glitch. You can directly chat with founder Shyam Aiyappa on WhatsApp: +91 81232 88564.' }
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
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-bold shadow-2xl shadow-emerald-950/80 border border-emerald-300/40 flex items-center gap-2.5 transition-all duration-300 hover:scale-105 cursor-pointer glow-emerald"
          aria-label="Open AI Concierge"
        >
          <Bot className="w-5 h-5 text-black" />
          <span className="hidden sm:inline text-xs font-extrabold tracking-wide uppercase">Ask AquaBot</span>
          <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
        </button>
      )}

      {/* Slide-in Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md h-[550px] bg-[#0c1410] border border-emerald-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-black font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  AquaBot AI Concierge
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h3>
                <span className="text-[11px] text-zinc-400">Aqua Ventures · Siddapur, Coorg</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-md bg-emerald-900 text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-emerald-500 text-black font-medium rounded-tr-none'
                      : 'bg-zinc-900/90 text-zinc-200 border border-zinc-800 rounded-tl-none whitespace-pre-line'
                  }`}
                >
                  {m.text}
                </div>
                {m.role === 'user' && (
                  <div className="w-6 h-6 rounded-md bg-zinc-800 text-zinc-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
                <Bot className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>AquaBot is typing...</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-zinc-950/60 border-t border-zinc-900 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-full text-[11px] bg-zinc-900 hover:bg-emerald-950 text-zinc-300 hover:text-emerald-300 border border-zinc-800 whitespace-nowrap cursor-pointer transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-zinc-950 border-t border-zinc-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about fish, delivery, marmalade, tours..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-900 text-white text-xs border border-zinc-700 focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold disabled:opacity-40 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-2 text-center text-[10px] text-zinc-500">
              Founder Support: <a href="https://wa.me/918123288564" target="_blank" className="text-emerald-400 hover:underline">+91 81232 88564</a>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
