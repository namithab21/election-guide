"use client"

import { useState } from 'react';
import { Bot, Send, X, AlertCircle } from 'lucide-react';
import { mockGeminiChat } from '@/lib/gemini';

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'Hello. I am the DeshKaVote AI. I can assist you with procedural questions regarding Form 6, EVMs, or polling requirements.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await mockGeminiChat(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I encountered an error connecting to the service.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Minimalist Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-[#0F172A] hover:bg-[#1E293B] text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center group hover:-translate-y-1"
          aria-label="Open Chat Assistant"
        >
          <Bot size={24} className="opacity-90 group-hover:opacity-100 transition-opacity" />
        </button>
      )}

      {/* Chat Window - Claude Style */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/10 z-40 sm:hidden animate-in fade-in backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 sm:left-auto sm:bottom-6 sm:right-6 w-full sm:w-[400px] h-[85vh] sm:h-[600px] bg-white sm:border border-[#E2E8F0] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-8 sm:fade-in duration-300">
            
            {/* Header */}
            <div className="bg-white border-b border-[#E2E8F0] p-4 flex justify-between items-center z-10 shrink-0">
              <div className="flex items-center gap-2 text-[#0F172A]">
                <Bot size={20} />
                <h3 className="font-semibold text-sm tracking-wide">Assistant</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#64748B] hover:text-[#0F172A] transition-colors p-1 rounded-md hover:bg-[#F1F5F9]"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Disclaimer */}
            <div className="bg-[#F8FAFC] text-[#475569] text-[11px] p-2.5 flex items-start gap-2 border-b border-[#E2E8F0] shrink-0">
              <AlertCircle size={14} className="mt-0.5 shrink-0 text-[#94A3B8]" />
              <p>AI assistant. For official, government-authenticated info, verify at <a href="https://voters.eci.gov.in" target="_blank" rel="noreferrer" className="underline hover:text-[#0F172A]">voters.eci.gov.in</a>.</p>
            </div>

            {/* Messages */}
            <div className="flex-1 p-5 overflow-y-auto bg-white flex flex-col gap-6">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#F1F5F9] text-[#475569]' : 'bg-[#0F172A] text-white'}`}>
                    {msg.role === 'user' ? <span className="text-xs font-bold">U</span> : <Bot size={16} />}
                  </div>
                  
                  {/* Bubble */}
                  <div className={`max-w-[80%] text-[14px] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'text-[#0F172A] pt-1' 
                      : 'text-[#334155] pt-1'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="pt-2 text-[#94A3B8] text-sm animate-pulse">
                    Typing...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-[#E2E8F0] z-10 shrink-0">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message Assistant..."
                  className="w-full pl-4 pr-12 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#CBD5E1] focus:ring-1 focus:ring-[#CBD5E1] text-sm transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 text-[#64748B] hover:text-[#0F172A] p-2 rounded-lg hover:bg-[#E2E8F0] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
