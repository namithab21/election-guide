"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Fingerprint, Smartphone, LogOut } from 'lucide-react';

export function SignInModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'options' | 'loading' | 'success'>('options');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    setStep('loading');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        setIsSignedIn(true);
        setIsOpen(false);
        setStep('options');
      }, 1500);
    }, 2000);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  if (isSignedIn) {
    return (
      <div className="relative group cursor-pointer flex items-center gap-3 bg-[#F1F5F9] px-4 py-2 rounded-xl border border-[#E2E8F0]">
        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-[10px]">
          IN
        </div>
        <span className="text-sm font-semibold text-[#0F172A]">Citizen</span>
        <button 
          onClick={handleSignOut}
          className="ml-2 text-slate-400 hover:text-rose-500 transition-colors"
          title="Sign Out"
        >
          <LogOut size={16} />
        </button>
      </div>
    );
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-[#0F172A] text-white px-5 py-2 rounded-xl shadow-md hover:bg-[#1E293B] hover:shadow-lg transition-all text-xs font-semibold"
      >
        Sign In
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative z-10 p-8 text-center custom-scrollbar"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 p-2 rounded-full"
              >
                <X size={18} />
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Citizen Authentication</h2>
                <p className="text-slate-500 text-sm">Securely access your NVSP portal links and track your registration status.</p>
              </div>

              {step === 'options' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <button 
                    onClick={handleSignIn}
                    className="w-full flex items-center justify-center gap-3 border border-slate-200 p-4 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                  >
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600 group-hover:scale-110 transition-transform">
                      <Fingerprint size={20} />
                    </div>
                    <span className="font-semibold text-slate-700 group-hover:text-blue-700">Continue with Aadhaar OTP</span>
                  </button>

                  <button 
                    onClick={handleSignIn}
                    className="w-full flex items-center justify-center gap-3 border border-slate-200 p-4 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
                  >
                    <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600 group-hover:scale-110 transition-transform">
                      <Smartphone size={20} />
                    </div>
                    <span className="font-semibold text-slate-700 group-hover:text-emerald-700">EPIC / Voter Helpline Link</span>
                  </button>
                  
                  <p className="text-[10px] text-slate-400 mt-6">
                    This is a simulation for demonstration purposes. In production, this uses official e-Pramaan OAuth.
                  </p>
                </motion.div>
              )}

              {step === 'loading' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="flex flex-col items-center justify-center py-8"
                >
                  <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Verifying Identity...</h3>
                  <p className="text-sm text-slate-500">Connecting to secure authentication gateway</p>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="flex flex-col items-center justify-center py-8"
                >
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Authentication Successful</h3>
                  <p className="text-sm text-slate-500">Redirecting to dashboard...</p>
                </motion.div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
