"use client"

import { useState } from 'react';
import { Sparkles, HelpCircle, Loader2 } from 'lucide-react';
import { bustJargon } from '@/lib/gemini';

const COMMON_TERMS = [
  "Model Code of Conduct",
  "Anti-Defection Law",
  "First-Past-The-Post",
  "Electoral Bond",
  "Delimitation"
];

export default function JargonBuster() {
  const [selectedTerm, setSelectedTerm] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBust = async (term: string) => {
    setSelectedTerm(term);
    setIsLoading(true);
    setExplanation('');
    try {
      const result = await bustJargon(term);
      setExplanation(result);
    } catch (err) {
      setExplanation("Could not simplify this term.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-blue-600" size={20} />
        <h3 className="font-bold text-slate-900">AI Jargon Buster</h3>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {COMMON_TERMS.map(term => (
          <button
            key={term}
            onClick={() => handleBust(term)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              selectedTerm === term 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300'
            }`}
            aria-label={`Explain ${term}`}
          >
            {term}
          </button>
        ))}
      </div>

      <div className="min-h-[80px] bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-center text-center">
        {isLoading ? (
          <Loader2 className="animate-spin text-blue-600" size={24} />
        ) : explanation ? (
          <p className="text-sm text-slate-700 leading-relaxed italic">
            "{explanation}"
          </p>
        ) : (
          <div className="flex flex-col items-center gap-1 text-slate-400">
            <HelpCircle size={20} />
            <p className="text-[11px] font-medium uppercase tracking-wider">Select a term to simplify</p>
          </div>
        )}
      </div>
    </div>
  );
}
