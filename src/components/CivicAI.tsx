"use client";

import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2, Info } from 'lucide-react';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const CivicAI = () => {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSimplify = async () => {
    if (!input.trim()) return;
    if (!API_KEY) {
      setError("AI Services currently unavailable. Please check configuration.");
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are a civic education expert. Simplify the following complex election text into a clear, 2-sentence summary suitable for a general citizen: "${input}"`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setSummary(response.text());
    } catch (err) {
      console.error(err);
      setError("Failed to process text. The Gemini service may be busy.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-800 text-white rounded-2xl shadow-lg shadow-blue-200">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-950">CivicAI Jargon Buster</h3>
          <p className="text-sm text-slate-500 font-medium">Simplify complex election laws with Gemini 1.5</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <textarea
            aria-label="Election text to simplify"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste complex election rules or terminology here..."
            className="w-full h-32 p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 placeholder:text-slate-400 font-medium resize-none text-sm"
          />
          <button
            onClick={handleSimplify}
            disabled={loading || !input.trim()}
            className="absolute bottom-3 right-3 p-3 bg-slate-950 text-white rounded-xl hover:bg-blue-800 disabled:bg-slate-300 transition-all shadow-xl shadow-slate-200"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {summary && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-blue-50 border border-blue-100 flex gap-4"
            >
              <Info className="w-5 h-5 text-blue-800 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-800 mb-1">AI Simplified Summary</p>
                <p className="text-sm text-blue-900 font-medium leading-relaxed">{summary}</p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-red-700 font-bold px-4"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
