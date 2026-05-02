"use client"

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, AlertCircle, Sparkles } from 'lucide-react';
import { mockGeminiChat } from '@/lib/gemini';

const SUGGESTIONS = [
  "Can I take my kid to the booth?",
  "Is my phone allowed?",
  "How to apply for Form 6?",
  "What is Rule 49-O?"
];

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'Namaste! I am the DeshKaVote AI Assistant. How can I help you navigate the election process today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text?: string) => {
    const messageToSend = text || input;
    if (!messageToSend.trim()) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: messageToSend }]);
    setIsLoading(true);

    try {
      const response = await mockGeminiChat(messageToSend);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I encountered an error connecting to the service. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-full shadow-2xl transition-all duration-300 z-50 flex items-center justify-center group hover:scale-110"
          aria-label="Open Chat Assistant"
        >
          <Bot size={24} className="group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full animate-bounce">
            <Sparkles size={12} />
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 z-40 sm:hidden backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 sm:left-auto sm:bottom-6 sm:right-6 w-full sm:w-[420px] h-[85vh] sm:h-[650px] bg-white border-t sm:border border-slate-200 rounded-t-3xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-full duration-300">
            
            {/* Header */}
            <div className="bg-slate-900 p-5 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3 text-white">
                <div className="bg-blue-500/20 p-2 rounded-xl">
                  <Bot size={20} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">DeshKaVote AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors bg-white/10 p-2 rounded-xl"
              >
                <X size={18} />
              </button>
            </div>

            {/* Disclaimer */}
            <div className="bg-slate-50 text-slate-500 text-[11px] px-5 py-3 flex items-start gap-2 border-b border-slate-100">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              <p>For critical legal information, always cross-verify with the <a href="https://voters.eci.gov.in" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">Official ECI Portal</a>.</p>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto bg-white flex flex-col gap-6 custom-scrollbar"
            >
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-slate-100 text-slate-600' : 'bg-blue-600 text-white'
                  }`}>
                    {msg.role === 'user' ? <span className="text-[10px] font-black uppercase">You</span> : <Bot size={16} />}
                  </div>
                  
                  <div className={`max-w-[85%] text-[14px] leading-relaxed p-4 rounded-2xl whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-slate-50 text-slate-900 rounded-tr-none' 
                      : 'bg-blue-50 text-slate-800 rounded-tl-none border border-blue-100'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 animate-pulse">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="bg-blue-50 p-4 rounded-2xl rounded-tl-none border border-blue-100 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-5 bg-white border-t border-slate-100">
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {SUGGESTIONS.map((text, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(text)}
                      className="text-[11px] font-semibold bg-slate-50 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all"
                    >
                      {text}
                    </button>
                  ))}
                </div>
              )}
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about registration, booths, or rights..."
                  className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 text-sm transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 text-blue-600 bg-white p-2.5 rounded-xl shadow-sm hover:scale-105 disabled:opacity-50 transition-all"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
