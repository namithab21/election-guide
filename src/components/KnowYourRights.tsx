"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, X, FileText, AlertTriangle, UserCheck } from 'lucide-react';

export function KnowYourRights() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        aria-label="Open Know Your Rights modal"
        className="hover:text-[#0F172A] transition-colors font-medium text-[#475569]"
      >
        Know Your Rights
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-white w-full max-w-3xl max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative z-10"
            >
              {/* Header */}
              <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] p-6 flex justify-between items-center text-[#0F172A]">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
                    <Scale size={24} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Legal Voter Rights</h2>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  aria-label="Close modal"
                  className="text-[#64748B] hover:text-[#0F172A] transition-colors bg-white border border-[#E2E8F0] p-2 rounded-lg hover:bg-[#F1F5F9]"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto bg-white flex-1 space-y-6 custom-scrollbar">
                
                <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0] hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-3 mb-2 text-blue-600">
                    <UserCheck size={20} />
                    <h3 className="text-lg font-semibold text-[#0F172A]">Right to Vote (Article 326)</h3>
                  </div>
                  <p className="text-[#475569] leading-relaxed text-sm">
                    Voting is a constitutional right for every Indian citizen aged 18 or above, regardless of religion, race, caste, or sex. You cannot be denied a vote as long as your name is on the Electoral Roll.
                  </p>
                </div>

                <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0] hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-3 mb-2 text-blue-600">
                    <AlertTriangle size={20} />
                    <h3 className="text-lg font-semibold text-[#0F172A]">NOTA (None of the Above)</h3>
                  </div>
                  <p className="text-[#475569] leading-relaxed text-sm">
                    Introduced by the Supreme Court, NOTA allows you to officially register a vote of rejection for all contesting candidates. It is the last button on the EVM. While it doesn&apos;t invalidate the election, it records voter dissatisfaction.
                  </p>
                </div>

                <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0] hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-3 mb-2 text-blue-600">
                    <FileText size={20} />
                    <h3 className="text-lg font-semibold text-[#0F172A]">Tendered Vote (Rule 42)</h3>
                  </div>
                  <p className="text-[#475569] leading-relaxed text-sm">
                    If someone has already cast a vote in your name (bogus voting), you still have the right to vote. The Presiding Officer will issue you a &quot;Tendered Ballot Paper&quot; to cast your vote manually, rather than on the EVM.
                  </p>
                </div>

                <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0] hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-3 mb-2 text-blue-600">
                    <AlertTriangle size={20} />
                    <h3 className="text-lg font-semibold text-[#0F172A]">Right NOT to Vote (Rule 49-O)</h3>
                  </div>
                  <p className="text-[#475569] leading-relaxed text-sm">
                    If you have signed the electoral register at the booth but decide not to cast your vote, you can invoke Rule 49-O. The polling officer will make a remark &quot;Refused to vote&quot; against your name.
                  </p>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
